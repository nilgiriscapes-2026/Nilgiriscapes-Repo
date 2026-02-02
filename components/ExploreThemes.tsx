
import React, { useRef } from 'react';
import { THEMES_DATA } from '../constants';
import type { Theme } from '../types';

interface ExploreThemesProps {
  selectedTheme: string;
  setSelectedTheme: (themeTitle: string) => void;
}

const ThemeCard: React.FC<{ theme: Theme; isSelected: boolean; onSelect: () => void }> = ({ theme, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`
        flex-shrink-0 relative flex flex-col items-center pt-[25px]
        w-[237px] h-[308px] 
        transition-colors duration-300 text-left
        ${isSelected ? 'bg-[#FFF5EF]' : 'bg-[#FFFBF8]'}
        border border-[#937B6A]
        shadow-sm hover:shadow-md
    `}
  >
    {/* Image Container 192x188 */}
    <img
      src={theme.imageUrl}
      alt={theme.title}
      className="w-[192px] h-[188px] object-cover mb-3"
    />

    {/* Decorative Separator (Line with Dots) */}
    <div className="w-[192px] flex justify-center mb-3">
      <svg width="100%" height="8" viewBox="0 0 192 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="4" x2="188" y2="4" stroke="#937B6A" strokeWidth="1" />
        <circle cx="4" cy="4" r="3.5" fill="#937B6A" />
        <circle cx="188" cy="4" r="3.5" fill="#937B6A" />
      </svg>
    </div>

    {/* Title Container - aligned with image width */}
    <div className="w-[192px] text-left">
        <p className={`text-[14px] font-sans leading-snug ${isSelected ? 'font-bold text-brand-brown tracking-tight' : 'font-normal text-brand-brown'}`}>
        {theme.title}
      </p>
    </div>

    {/* Bottom Strip */}
    <div className="absolute bottom-0 left-0 w-full h-[12px]">
      <img
        src={isSelected ? "/Mash_group.png" : "/1445.png"}
        alt=""
        className="w-full h-full object-cover block"
      />
    </div>
  </button>
);

const ArrowButton: React.FC<{ direction: 'left' | 'right', onClick: () => void }> = ({ direction, onClick }) => {
  const isLeft = direction === 'left';
  return (
    <button onClick={onClick} className="p-2 hover:opacity-70 transition-opacity disabled:opacity-50">
      {isLeft ? (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#937B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#937B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )
}

const ExploreThemes: React.FC<ExploreThemesProps> = ({ selectedTheme, setSelectedTheme }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  return (
    // <section id="themes" className="py-16 md:py-24">
          <section id="themes" className="pt-16 md:pt-24 pb-0">

      <div className="container mx-auto px-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mt-1">
            <p className="text-[22px] text-[#937B6A] uppercase leading-tight tracking-wide">Explore the seven themes through three different ways of looking at the <br/> Nilgiris: by geography, by historical time periods, and by types of materials.</p>

            <div className="flex flex-shrink-0 ml-4">
              <ArrowButton direction="left" onClick={() => scroll('left')} />
              <ArrowButton direction="right" onClick={() => scroll('right')} />
            </div>
          </div>
        </div>
        <div className="relative">
          <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-8 hide-scrollbar">
            {THEMES_DATA.map((theme, index) => (
              <ThemeCard
                key={index}
                theme={theme}
                isSelected={selectedTheme === theme.title}
                onSelect={() => setSelectedTheme(theme.title)}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ExploreThemes;
