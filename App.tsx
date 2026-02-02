
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SharedGrounds from './components/SharedGrounds';
import ExploreThemes from './components/ExploreThemes';
import TracingChange from './components/TracingChange';
import ContributeFooter from './components/ContributeFooter';
import { THEMES_DATA } from './constants';

const App: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>(THEMES_DATA[0].title);

  return (
    <div className="bg-brand-offwhite font-sans text-brand-brown">
      <Header />
      <main>
        <Hero />
        <SharedGrounds />
        <ExploreThemes selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        <TracingChange selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
      </main>
      <ContributeFooter />
    </div>
  );
};

export default App;
