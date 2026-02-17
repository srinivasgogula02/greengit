
import React, { useRef, useEffect } from 'react';
import { CellData } from '@/hooks/useContributionGrid';

// Configuration
const LEVELS = [0, 1, 4, 7, 10];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TODAY = new Date(2026, 1, 17);

interface GraphContainerProps {
    gridData: CellData[];
    updateCell: (index: number, level: number) => void;
    isErasing: boolean;
    isPastUnlocked: boolean;
    showNumbers: boolean;
}

export const GraphContainer: React.FC<GraphContainerProps> = ({
    gridData,
    updateCell,
    isErasing,
    isPastUnlocked,
    showNumbers,
}) => {
    const isMouseDown = useRef(false);
    const lastPaintedIndex = useRef<number | null>(null);

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

        if (!isPastUnlocked && cell.date < TODAY) return;

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

        for (let w = 0; w < 53; w++) {
            // Approximate month position logic
            const date = new Date(2026, 0, 1 + (w * 7));
            const month = date.getMonth();

            if (month !== lastMonth) {
                months.push(<div key={w}>{MONTH_NAMES[month]}</div>);
                lastMonth = month;
            } else {
                months.push(<div key={w}></div>);
            }
        }
        return months;
    };

    return (
        <div className={`graph-container ${isErasing ? 'erasing-mode' : ''} ${isPastUnlocked ? 'past-unlocked' : ''} ${showNumbers ? 'show-nums' : ''}`}>
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
                        if (cell.level === -1) {
                            return <div key={idx} style={{ visibility: 'hidden' }} className="cell" />;
                        }

                        const isPast = cell.date < TODAY;
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
