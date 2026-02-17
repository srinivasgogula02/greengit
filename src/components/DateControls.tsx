import React, { useEffect, useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateControlsProps {
    startDate: Date;
    endDate: Date;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
}

export const DateControls: React.FC<DateControlsProps> = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}) => {
    // Local state for the year dropdown to verify if we are in a standard year view
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [mode, setMode] = useState<'year' | 'custom'>('year');

    // Sync internal state with external props if needed
    useEffect(() => {
        // If the range matches a full year, set mode to 'year'
        const isJan1 = startDate.getMonth() === 0 && startDate.getDate() === 1;
        const isDec31 = endDate.getMonth() === 11 && endDate.getDate() === 31;
        const sameYear = startDate.getFullYear() === endDate.getFullYear();

        if (isJan1 && isDec31 && sameYear) {
            setMode('year');
            setSelectedYear(startDate.getFullYear());
        } else {
            setMode('custom');
        }
    }, [startDate, endDate]);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(e.target.value);
        setSelectedYear(year);
        setMode('year');

        // Set range to full year
        const newStart = new Date(year, 0, 1);
        const newEnd = new Date(year, 11, 31);
        setStartDate(newStart);
        setEndDate(newEnd);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        const date = new Date(e.target.value);
        if (isNaN(date.getTime())) return;

        setMode('custom');
        setStartDate(date);

        // Auto-adjust end date to maintain ~1 year window (365 days)
        // or just ensure it is valid. 
        // The requirement says: "shows form the starting date 365 days"
        const newEnd = new Date(date);
        newEnd.setDate(date.getDate() + 364); // +364 days (inclusive range = 365 days)
        setEndDate(newEnd);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        const date = new Date(e.target.value);
        if (isNaN(date.getTime())) return;

        setMode('custom');
        setEndDate(date);

        // Auto-adjust start date: "365days before last date"
        const newStart = new Date(date);
        newStart.setDate(date.getDate() - 364);
        setStartDate(newStart);
    };

    const formatDateInput = (date: Date) => {
        // YYYY-MM-DD for input type="date"
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Generate year options
    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

    return (
        <div className="date-controls" style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '20px',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '10px 20px',
            borderRadius: '8px',
            flexWrap: 'wrap'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} />
                <span style={{ fontWeight: 500 }}>Range:</span>
            </div>

            <div className="control-group">
                <select
                    value={mode === 'year' ? selectedYear : 'custom'}
                    onChange={handleYearChange}
                    style={{
                        background: 'transparent',
                        color: 'inherit',
                        border: '1px solid #30363d',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer'
                    }}
                >
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                    <option value="custom">Custom</option>
                </select>
            </div>

            {/* Custom Date Inputs - Visible always or only when custom? 
                Visible always lets users fine tune 
            */}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="date-input-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '10px', opacity: 0.7 }}>Start Date</label>
                    <input
                        type="date"
                        value={formatDateInput(startDate)}
                        onChange={handleStartDateChange}
                        style={{
                            background: '#0d1117',
                            border: '1px solid #30363d',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '4px',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                <span style={{ opacity: 0.5 }}>→</span>

                <div className="date-input-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '10px', opacity: 0.7 }}>End Date</label>
                    <input
                        type="date"
                        value={formatDateInput(endDate)}
                        onChange={handleEndDateChange}
                        style={{
                            background: '#0d1117',
                            border: '1px solid #30363d',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '4px',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>
            </div>

            {mode === 'custom' && (
                <div style={{ fontSize: '12px', opacity: 0.6, marginLeft: 'auto' }}>
                    (Auto-adjusts to ~1 year range)
                </div>
            )}
        </div>
    );
};
