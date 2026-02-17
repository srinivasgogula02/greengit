"use client";

import React, { useState } from 'react';
import { GraphContainer } from '@/components/GraphContainer';
import { Legend } from '@/components/Legend';
import { ProfileHeader } from '@/components/ProfileHeader';
import { Stats } from '@/components/Stats';
import { Toolbar } from '@/components/Toolbar';
<h1 style={{ marginBottom: '20px', fontWeight: 600 }}>🌿 GreenGit 2026</h1>
import { MarketingSection } from '@/components/MarketingSection';
import { useContributionGrid } from '@/hooks/useContributionGrid';

export default function Home() {
  const [isPastUnlocked, setIsPastUnlocked] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  const { gridData, updateCell, setGridData, resetGrid } = useContributionGrid();

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
        />
        <Legend />
      </div>

      <MarketingSection />

    </main>
  );
}
