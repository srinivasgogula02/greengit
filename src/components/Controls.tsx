
import React from 'react';

interface ControlsProps {
    isPastUnlocked: boolean;
    togglePast: () => void;
    isErasing: boolean;
    toggleEraser: () => void;
    showNumbers: boolean;
    toggleNumbers: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
    isPastUnlocked,
    togglePast,
    isErasing,
    toggleEraser,
    showNumbers,
    toggleNumbers,
}) => {
    return (
        <div className="controls-top">
            <button
                className={`btn unlock ${isPastUnlocked ? 'active' : ''}`}
                onClick={togglePast}
            >
                {isPastUnlocked ? '🔒 Lock Past' : '🔓 Unlock Past'}
            </button>

            <button
                className={`btn eraser ${isErasing ? 'active' : ''}`}
                onClick={toggleEraser}
            >
                🗑️ Eraser
            </button>

            <label className="toggle-wrapper">
                <input
                    type="checkbox"
                    checked={showNumbers}
                    onChange={toggleNumbers}
                />
                <div className="switch"></div>
                <span>Show Numbers</span>
            </label>
        </div>
    );
};
