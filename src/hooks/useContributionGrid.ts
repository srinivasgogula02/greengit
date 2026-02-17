import { useState, useEffect, useCallback } from 'react';

export interface CellData {
    date: Date;
    level: number;
}

export const useContributionGrid = (startDate: Date, endDate: Date) => {
    const [gridData, setGridData] = useState<CellData[]>([]);

    // Initialize Grid
    useEffect(() => {
        // Check localStorage first
        // TODO: We might need to invalidate cache if dates change significantly or store by range? 
        // For now, simpler to just regenerate if dates don't match or maybe just listen to props.
        // Actually, if we change dates, we probably want to keep "level" data if it overlaps? 
        // But for this first pass, let's just regenerate the grid structure.
        // Preserving data across date shifts is complex (map date -> level).

        // Let's try to preserve data by using a map
        const saved = localStorage.getItem('github-planner-grid');
        let savedMap = new Map<string, number>();

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                parsed.forEach((cell: any) => {
                    // Normalize date string to YYYY-MM-DD for key
                    const d = new Date(cell.date);
                    const key = d.toDateString();
                    savedMap.set(key, cell.level);
                });
            } catch (e) {
                console.error("Failed to load grid", e);
            }
        }

        const newGrid: CellData[] = [];
        const startDayOfWeek = startDate.getDay(); // 0 = Sunday

        // Calculate total days needed
        // We want to start from the week containing startDate
        // Actually GitHub charts usually start on Sunday.
        // If startDate is Wednesday, the grid usually shows the preceding Sunday (as empty/padding) or just starts.
        // Let's align to the previous Sunday for the grid start.

        const gridStartDate = new Date(startDate);
        gridStartDate.setDate(startDate.getDate() - startDayOfWeek);

        // We usually show 53 weeks or enough to cover endDate
        // Let's just loop week by week until we pass endDate

        let currentDate = new Date(gridStartDate);
        // Safety break to prevent infinite loops
        let weeks = 0;

        while ((currentDate <= endDate || weeks < 52) && weeks < 60) {
            for (let row = 0; row < 7; row++) {
                // Copy date to avoid reference issues
                const cellDate = new Date(currentDate);
                // Advance for next cell
                currentDate.setDate(currentDate.getDate() + 1);

                // Determine if this cell is within the requested range (startDate -> endDate)
                // If it is before startDate or after endDate, it might be padding (level -1 or just 0?)
                // GitHub usually just shows them. But maybe we want to hide them if they are strictly outside range?
                // The original code used -1 for "not in this year".

                const isValid = cellDate >= startDate && cellDate <= endDate;

                if (isValid) {
                    // Check if we have saved data
                    const key = cellDate.toDateString();
                    const level = savedMap.has(key) ? savedMap.get(key)! : 0;
                    newGrid.push({ date: cellDate, level });
                } else {
                    newGrid.push({ date: cellDate, level: -1 });
                }
            }
            weeks++;
        }

        setGridData(newGrid);
    }, [startDate, endDate]); // Re-run when dates change

    // Persistence side-effect
    useEffect(() => {
        if (gridData.length > 0) {
            // We should probably merge with existing storage to avoid losing data when switching views?
            // For now, let's just save the current view. 
            // IMPROVEMENT: Load all history, update current view, save back all history.
            // But 'saved' logic above reads from the same key. So if we overwrite here with partial data, we lose others.
            // Let's try to be smart: Read, Update, Write.

            const saved = localStorage.getItem('github-planner-grid');
            let fullHistory: any[] = [];
            if (saved) {
                try {
                    fullHistory = JSON.parse(saved);
                } catch (e) { }
            }

            // Create a map of current history
            const historyMap = new Map<string, any>();
            fullHistory.forEach((item: any) => historyMap.set(new Date(item.date).toDateString(), item));

            // Update with current grid data (only real cells)
            gridData.forEach(cell => {
                if (cell.level !== -1) {
                    historyMap.set(cell.date.toDateString(), cell);
                }
            });

            const toSave = Array.from(historyMap.values());
            localStorage.setItem('github-planner-grid', JSON.stringify(toSave));
        }
    }, [gridData]);

    const updateCell = useCallback((index: number, level: number) => {
        setGridData(prev => {
            const newData = [...prev];
            if (newData[index]) {
                newData[index].level = level;
            }
            return newData;
        });
    }, []);

    const resetGrid = useCallback(() => {
        if (confirm('Are you sure you want to clear your plan for this view?')) {
            setGridData(prev => prev.map(c => c.level === -1 ? c : { ...c, level: 0 }));
        }
    }, []);

    return { gridData, updateCell, setGridData, resetGrid };
};
