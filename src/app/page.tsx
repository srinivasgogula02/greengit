"use client";

import React, { useState } from 'react';
import { GraphContainer } from '@/components/GraphContainer';
import { Legend } from '@/components/Legend';
import { ProfileHeader } from '@/components/ProfileHeader';
import { Stats } from '@/components/Stats';
import { Toolbar } from '@/components/Toolbar';
import { DateControls } from '@/components/DateControls';
import { MarketingSection } from '@/components/MarketingSection';
import { useContributionGrid } from '@/hooks/useContributionGrid';

export default function Home() {
  const [isPastUnlocked, setIsPastUnlocked] = useState(true);
  const [isErasing, setIsErasing] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  // Date State - Default to 2026
  const [startDate, setStartDate] = useState<Date>(new Date(2026, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date(2026, 11, 31));

  const { gridData, updateCell, setGridData, resetGrid } = useContributionGrid(startDate, endDate);

  const togglePast = () => setIsPastUnlocked(!isPastUnlocked);
  const toggleEraser = () => setIsErasing(!isErasing);
  const toggleNumbers = () => setShowNumbers(!showNumbers);

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '60px',
      paddingBottom: '60px',
      minHeight: '100vh',
      maxWidth: '100vw',
      overflowX: 'hidden',
      position: 'relative'
    }}>

      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
        <h1 style={{ margin: 0, fontWeight: 600, fontSize: '1.5rem' }}>🌿 GreenGit Planner</h1>
      </div>

      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
        <a href="https://www.buymeacoffee.com/srinivasgogula" target="_blank" rel="noreferrer">
          <img
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=srinivasgogula&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
            alt="Buy me a coffee"
            style={{ height: '40px' }}
          />
        </a>
      </div>

      <ProfileHeader />



      <Stats gridData={gridData} />

      <DateControls
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <Toolbar
        gridData={gridData}
        setGridData={setGridData}
        resetGrid={resetGrid}
        isPastUnlocked={isPastUnlocked}
        togglePast={togglePast}
        isErasing={isErasing}
        toggleEraser={toggleEraser}
        showNumbers={showNumbers}
        toggleNumbers={toggleNumbers}
      />

      <div id="planner-canvas" style={{
        padding: '20px',
        backgroundColor: '#0d1117',
        borderRadius: '10px',
        maxWidth: '95vw',
        overflowX: 'auto',
      }}>
        <GraphContainer
          gridData={gridData}
          updateCell={updateCell}
          isErasing={isErasing}
          isPastUnlocked={isPastUnlocked}
          showNumbers={showNumbers}
          startDate={startDate}
          endDate={endDate}
        />
        <Legend />
      </div>

      <MarketingSection />

    </main>
  );
}
