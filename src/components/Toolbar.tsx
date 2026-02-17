
import React from 'react';
import { Download, Terminal, Palette, Trash2, Unlock } from 'lucide-react';
import { toPng } from 'html-to-image';
import { CellData } from '@/hooks/useContributionGrid';

interface ToolbarProps {
    gridData: CellData[];
    setGridData: React.Dispatch<React.SetStateAction<CellData[]>>;
    resetGrid: () => void;
    isPastUnlocked: boolean;
    togglePast: () => void;
    isErasing: boolean;
    toggleEraser: () => void;
    showNumbers: boolean;
    toggleNumbers: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
    gridData,
    setGridData,
    resetGrid,
    isPastUnlocked,
    togglePast,
    isErasing,
    toggleEraser,
    showNumbers,
    toggleNumbers
}) => {

    const handleDownloadImage = async () => {
        const node = document.getElementById('planner-canvas');
        if (node) {
            try {
                const dataUrl = await toPng(node, { cacheBust: true, backgroundColor: '#0d1117' });
                const link = document.createElement('a');
                link.download = 'github-2026-plan.png';
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('Failed to download image', err);
            }
        }
    };

    const handleGenerateScript = () => {
        // Generate shell script logic
        // This is a simplified version. authentic git commits need dates.
        // We have dates in gridData.
        let script = `#!/bin/bash\n# GitHub 2026 Contribution Plan Generator\n\n`;
        script += `mkdir github-2026-plan\ncd github-2026-plan\ngit init\n\n`;

        gridData.forEach(cell => {
            if (cell.level > 0) {
                // We need N commits for this day
                // Level 1=1, 2=4, 3=7, 4=10 commits (as per original levels array roughly)
                // Original LEVELS = [0, 1, 4, 7, 10]
                const count = [0, 1, 4, 7, 10][cell.level];
                const dateStr = cell.date.toISOString();

                for (let i = 0; i < count; i++) {
                    script += `GIT_AUTHOR_DATE="${dateStr}" GIT_COMMITTER_DATE="${dateStr}" git commit --allow-empty -m "Contribution"\n`;
                }
            }
        });

        const blob = new Blob([script], { type: 'text/x-sh' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'plan.sh';
        link.href = url;
        link.click();
    };

    const applyTemplate = (type: 'hello' | 'checker' | 'random') => {
        // Basic template logic
        setGridData(prev => prev.map((cell, idx) => {
            if (cell.level === -1) return cell;

            let newLevel = 0;
            if (type === 'random') {
                newLevel = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
            } else if (type === 'checker') {
                newLevel = idx % 2 === 0 ? 3 : 0;
            }
            return { ...cell, level: newLevel };
        }));
    };

    return (
        <div className="toolbar">
            <div className="toolbar-group">
                <button className={`btn ${isPastUnlocked ? 'active-unlock' : ''}`} onClick={togglePast} title={isPastUnlocked ? "Lock Past" : "Unlock Past"}>
                    <Unlock size={14} /> <span>{isPastUnlocked ? "Lock" : "Unlock"}</span>
                </button>
                <button className={`btn ${isErasing ? 'active-erase' : ''}`} onClick={toggleEraser} title="Eraser">
                    <Trash2 size={14} /> <span>Eraser</span>
                </button>
                <label className="toggle-wrapper" style={{ border: 'none', paddingLeft: 0 }}>
                    <input type="checkbox" checked={showNumbers} onChange={toggleNumbers} />
                    <div className="switch" style={{ transform: 'scale(0.8)' }}></div>
                    <span style={{ fontSize: '12px' }}>Nums</span>
                </label>
            </div>

            <div className="toolbar-divider"></div>

            <div className="toolbar-group">
                <button className="btn" onClick={() => applyTemplate('random')}>
                    <Palette size={14} /> <span>Random</span>
                </button>
                <button className="btn" onClick={() => applyTemplate('checker')}>
                    <Palette size={14} /> <span>Checker</span>
                </button>
            </div>

            <div className="toolbar-divider"></div>

            <div className="toolbar-group">
                <button className="btn primary-action" onClick={handleDownloadImage}>
                    <Download size={14} /> <span>Image</span>
                </button>
                <button className="btn primary-action" onClick={handleGenerateScript}>
                    <Terminal size={14} /> <span>Script</span>
                </button>
            </div>

            <div className="toolbar-group" style={{ marginLeft: 'auto' }}>
                <button className="btn danger" onClick={resetGrid}>
                    Clear
                </button>
            </div>
        </div>
    );
};
