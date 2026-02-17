
import React, { useRef, useEffect } from 'react';
import { CellData } from '@/hooks/useContributionGrid';

// Configuration
const LEVELS = [0, 1, 4, 7, 10];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface GraphContainerProps {
    gridData: CellData[];
    updateCell: (index: number, level: number) => void;
    isErasing: boolean;
    isPastUnlocked: boolean;
    showNumbers: boolean;
    startDate: Date;
    endDate: Date;
}

export const GraphContainer: React.FC<GraphContainerProps> = ({
    gridData,
    updateCell,
    isErasing,
    isPastUnlocked,
    showNumbers,
    startDate,
    endDate
}) => {
    const isMouseDown = useRef(false);
    const lastPaintedIndex = useRef<number | null>(null);
    const today = new Date();
    // Reset time part for comparison
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        const handleMouseUp = () => {
            isMouseDown.current = false;
            lastPaintedIndex.current = null;
        };
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const interactWithCell = (index: number) => {
        const cell = gridData[index];
        if (!cell || cell.level === -1) return;

        // "Past" logic: if cell date < today and not unlocked, prevent edit
        // We need to compare dates properly
        const cellDate = new Date(cell.date);
        cellDate.setHours(0, 0, 0, 0);

        if (!isPastUnlocked && cellDate < today) return;

        let newLevel = cell.level;
        if (isErasing) {
            newLevel = 0;
        } else {
            // Cycle: 0->1->2->3->4->1 (Skip 0 to prevent accidental clearing)
            newLevel = cell.level >= 4 ? 1 : cell.level + 1;
        }

        updateCell(index, newLevel);
        lastPaintedIndex.current = index;
    };

    const handleMouseDown = (index: number) => {
        isMouseDown.current = true;
        interactWithCell(index);
    };

    const handleMouseEnter = (index: number) => {
        if (isMouseDown.current && lastPaintedIndex.current !== index) {
            interactWithCell(index);
        }
    };

    // Render Months Logic
    const renderMonths = () => {
        const months = [];
        let lastMonth = -1;

        // We need to iterate through the columns (weeks)
        // gridData is flat array. 
        // We know there are 7 rows per column.
        // Total columns = gridData.length / 7
        const totalWeeks = Math.ceil(gridData.length / 7);

        for (let w = 0; w < totalWeeks; w++) {
            // Get the date of the first cell in this column
            // index = w * 7
            const cellIndex = w * 7;
            if (cellIndex >= gridData.length) break;

            const cell = gridData[cellIndex];
            const date = new Date(cell.date);
            const month = date.getMonth();

            if (month !== lastMonth) {
                // Determine if we should show the month label
                // Usually we show it if the first day of the week is near the start of the month
                // or just simply change of month.
                // GitHub logic is a bit complex, but simple "change of month" works okayish 
                // but might result in labels being too close if a month starts at end of week vs start.
                // Let's stick to simple change detection for now.

                months.push(<div key={w} style={{ gridColumn: w + 1 }}>{MONTH_NAMES[month]}</div>);
                lastMonth = month;
            } else {
                // Empty placeholder to maintain grid alignment if using grid (but here we are using flex/absolute/calc?)
                // The original CSS for .months likely uses flex or grid?
                // Let's check original implementation... it pushed <div> for EVERY week.
                months.push(<div key={w}></div>);
            }
        }
        return months;
    };

    return (
        <div className={`graph-container ${isErasing ? 'erasing-mode' : ''} ${isPastUnlocked ? 'past-unlocked' : ''} ${showNumbers ? 'show-nums' : ''}`}>
            {/* We need to ensure months align with the grid. 
                 Original used 'display: flex' probably? 
                 Let's assume the CSS handles children of .months as weeks. 
             */}
            <div className="months">
                {renderMonths()}
            </div>
            <div className="graph-body">
                <div className="days">
                    <div className="day-label"></div>
                    <div className="day-label">Mon</div>
                    <div className="day-label"></div>
                    <div className="day-label">Wed</div>
                    <div className="day-label"></div>
                    <div className="day-label">Fri</div>
                    <div className="day-label"></div>
                </div>
                <div className="grid">
                    {gridData.map((cell, idx) => {
                        if (!cell) return null; // Safety

                        if (cell.level === -1) {
                            return <div key={idx} style={{ visibility: 'hidden' }} className="cell" />;
                        }

                        const cellDate = new Date(cell.date);
                        cellDate.setHours(0, 0, 0, 0);
                        const isPast = cellDate < today;
                        const classes = `cell ${isPast ? 'past' : ''}`;

                        return (
                            <div
                                key={idx}
                                className={classes}
                                data-level={cell.level}
                                title={`${cell.date.toDateString()}${isPast ? ' (Past)' : ''}`}
                                onMouseDown={() => handleMouseDown(idx)}
                                onMouseEnter={() => handleMouseEnter(idx)}
                            >
                                {/* Text for commmit count */}
                                {LEVELS[cell.level]}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
