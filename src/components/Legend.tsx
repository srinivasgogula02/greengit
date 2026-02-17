
import React from 'react';

export const Legend: React.FC = () => {
    return (
        <div className="legend">
            <span>Less</span>
            <div className="legend-box" style={{ background: 'var(--l0)' }}></div>
            <div className="legend-box" style={{ background: 'var(--l1)' }}></div>
            <div className="legend-box" style={{ background: 'var(--l2)' }}></div>
            <div className="legend-box" style={{ background: 'var(--l3)' }}></div>
            <div className="legend-box" style={{ background: 'var(--l4)' }}></div>
            <span>More</span>
        </div>
    );
};
