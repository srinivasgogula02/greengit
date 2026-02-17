
import React from 'react';
import { CellData } from '@/hooks/useContributionGrid';

// Config
const LEVELS = [0, 1, 4, 7, 10];

interface StatsProps {
    gridData: CellData[];
}

export const Stats: React.FC<StatsProps> = ({ gridData }) => {
    // Calculate Totals
    const totalCommits = gridData.reduce((acc, cell) => {
        return acc + (cell.level >= 0 ? LEVELS[cell.level] : 0);
    }, 0);

    // Calculate Max Streak
    let maxStreak = 0;
    let currentStreak = 0;

    gridData.forEach(cell => {
        if (cell.level === -1) return; // Skip invalid
        if (cell.level > 0) {
            currentStreak++;
        } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 0;
        }
    });
    maxStreak = Math.max(maxStreak, currentStreak); // Final check

    // Calculate "Current" Streak (streak ending at today/last active day)
    // Simply finding the streak at the end of the list or up to TODAY would be complex 
    // without sorting, but gridData is sorted by date.
    // ...Simpler approach: just show Max Streak and Total for now.

    return (
        <div className="stats-cards">
            <div className="stat-card">
                <span className="stat-label">Total Contributions (Est)</span>
                <span className="stat-value">{totalCommits}</span>
            </div>
            <div className="stat-card">
                <span className="stat-label">Max Planned Streak</span>
                <span className="stat-value">{maxStreak} days</span>
            </div>
            <div className="stat-card">
                <span className="stat-label">Year</span>
                <span className="stat-value">2026</span>
            </div>
        </div>
    );
};
