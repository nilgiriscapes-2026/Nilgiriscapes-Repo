
import React, { useState, useRef } from 'react';
import { SEGREGATION_TABS, THEMES_DATA } from '../constants';
import GeographicalView from './GeographicalView';
import TimelineView from './TimelineView';
import MaterialWiseView from './MaterialWiseView';
import type { SegregationTab } from '../types';

interface TracingChangeProps {
    selectedTheme: string;
    setSelectedTheme: (theme: string) => void;
}

const ArrowButton: React.FC<{ direction: 'left' | 'right', onClick: () => void }> = ({ direction, onClick }) => {
  const isLeft = direction === 'left';
  return (
    <button onClick={onClick} className="p-2 hover:opacity-70 transition-opacity disabled:opacity-50 focus:outline-none">
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

const SegregationCard: React.FC<{
    tab: SegregationTab;
    index: number;
    isActive: boolean;
    onClick: () => void;
}> = ({ tab, index, isActive, onClick }) => {

    return (
        <button
            onClick={onClick}
            className={`
                relative flex-shrink-0 flex flex-col items-start text-left p-8
                w-[419px] h-[242px]
                transition-all duration-300 group
                ${isActive ? 'bg-[#FFF5EF]' : 'bg-white border border-[#937B6A] hover:shadow-md'}
            `}
        >
            <p className="font-serif font-light text-[20px] text-brand-brown/80">{`0${index + 1}`}</p>
            <h3 className="text-[40px] font-serif mt-4 font-light leading-tight text-brand-brown">
                {tab.line1} <br /> {tab.line2}

            </h3>

            <div className="absolute bottom-0 left-0 w-full">
                <img
                    src={isActive ? "/maskgroup2.png" : "/maskgroup1.png"}
                    alt=""
                    className="w-full h-[21px] object-cover block"
                />
            </div>
        </button>
    );
};

const ThemeThumbnailStrip: React.FC<{ selectedTheme: string; onSelect: (theme: string) => void }> = ({ selectedTheme, onSelect }) => {
    return (
        <div className="flex gap-0.5 mb-2 items-center justify-end">
            {THEMES_DATA.map((theme, idx) => {
                const isSelected = selectedTheme === theme.title;
                return (
                    <button
                        key={idx}
                        onClick={() => onSelect(theme.title)}
                        title={theme.title}
                        style={{ width: '81.43px', height: '79.86px' }}
                        className={`
    relative flex-shrink-0
    transition-all duration-300
    ${isSelected ? 'scale-110 z-10' : 'hover:scale-105'}
`}
                    >
                        {isSelected && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4F7F78]" />
                        )}

                        <img
                            src={theme.imageUrl}
                            alt={theme.title}
                            className="w-full h-full object-cover"
                        />
                    </button>
                );
            })}
        </div>
    );
};

const TracingChange: React.FC<TracingChangeProps> = ({ selectedTheme, setSelectedTheme }) => {
    const [activeTab, setActiveTab] = useState(SEGREGATION_TABS[0].id);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const renderContent = () => {
        return (
            <div className="flex flex-col">
                <div className="w-full">
                    <ThemeThumbnailStrip selectedTheme={selectedTheme} onSelect={setSelectedTheme} />
                </div>
                {activeTab === 1 && <GeographicalView selectedTheme={selectedTheme} />}
                {activeTab === 2 && <TimelineView selectedTheme={selectedTheme} />}
                {activeTab === 3 && <MaterialWiseView selectedTheme={selectedTheme} />}
            </div>
        );
    };

    return (
        <section id="segregation" className="pt-8 pb-16 md:pt-12 md:pb-24 bg-brand-offwhite">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-10">
                    {/* Header with Arrows */}
                    <div className="flex justify-end items-center">
                        <div className="flex flex-shrink-0">
                            <ArrowButton direction="left" onClick={() => scroll('left')} />
                            <ArrowButton direction="right" onClick={() => scroll('right')} />
                        </div>
                    </div>

                    {/* Scrollable Tabs Container */}
                    <div className="w-full overflow-x-auto hide-scrollbar" ref={scrollContainerRef}>
                        <div className="flex gap-6 min-w-min">
                            {SEGREGATION_TABS.map((tab, index) => (
                                <SegregationCard
                                    key={tab.id}
                                    tab={tab}
                                    index={index}
                                    isActive={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full mt-14">
                        {renderContent()}
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

export default TracingChange;
