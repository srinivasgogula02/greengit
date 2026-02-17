import { useState, useEffect, useCallback } from 'react';

export interface CellData {
    date: Date;
    level: number;
}

const YEAR = 2026;
// Keeping "TODAY" logic from previous implementation
const TODAY = new Date(2026, 1, 17);

export const useContributionGrid = () => {
    const [gridData, setGridData] = useState<CellData[]>([]);

    // Initialize Grid
    useEffect(() => {
        // Check localStorage first
        const saved = localStorage.getItem('github-planner-grid');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Hydrate dates
                const hydrated = parsed.map((cell: any) => ({
                    ...cell,
                    date: new Date(cell.date)
                }));
                setGridData(hydrated);
                return;
            } catch (e) {
                console.error("Failed to load grid", e);
            }
        }

        const startOfYear = new Date(YEAR, 0, 1);
        const startDayOfWeek = startOfYear.getDay();
        const newGrid: CellData[] = [];

        for (let col = 0; col < 53; col++) {
            for (let row = 0; row < 7; row++) {
                const gridIndex = (col * 7) + row;
                const dateIndex = gridIndex - startDayOfWeek;

                let date: Date | null = null;
                if (dateIndex >= 0) {
                    date = new Date(YEAR, 0, 1 + dateIndex);
                }

                if (date && date.getFullYear() === YEAR) {
                    newGrid.push({ date, level: 0 });
                } else {
                    newGrid.push({ date: new Date(0), level: -1 });
                }
            }
        }
        setGridData(newGrid);
    }, []);

    // Persistence side-effect
    useEffect(() => {
        if (gridData.length > 0) {
            localStorage.setItem('github-planner-grid', JSON.stringify(gridData));
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
        if (confirm('Are you sure you want to clear your plan?')) {
            setGridData(prev => prev.map(c => c.level === -1 ? c : { ...c, level: 0 }));
        }
    }, []);

    return { gridData, updateCell, setGridData, resetGrid };
};
