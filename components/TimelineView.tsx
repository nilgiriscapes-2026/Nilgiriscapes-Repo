
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { fetchTimelineEvents } from '../services/googleSheetsService';
import { THEMES_DATA } from '../constants';
import type { TimelineEvent } from '../types';

interface TimelineViewProps {
    selectedTheme: string;
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
  );
};

const TimelineView: React.FC<TimelineViewProps> = ({ selectedTheme }) => {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [activeYear, setActiveYear] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [availableThemes, setAvailableThemes] = useState<string[]>([]);
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Debug state
    const [debugHeaders, setDebugHeaders] = useState<string[]>([]);
    const [debugMapping, setDebugMapping] = useState<any>(null);

    // Get the theme image for fallback
    const themeImageUrl = useMemo(() => {
        const theme = THEMES_DATA.find(t => t.title === selectedTheme);
        return theme?.imageUrl || 'https://placehold.co/150';
    }, [selectedTheme]);

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            setErrorMsg(null);
            try {
                const { events: data, error, debugThemes, detectedHeaders, columnMapping } = await fetchTimelineEvents();

                if (error) setErrorMsg(error);
                if (debugThemes) setAvailableThemes(debugThemes);
                if (detectedHeaders) setDebugHeaders(detectedHeaders);
                if (columnMapping) setDebugMapping(columnMapping);

                // NORMALIZATION
                const themeObj = THEMES_DATA.find(t => t.title === selectedTheme);
                const effectiveThemeTitle = themeObj?.sheetTitle || selectedTheme;
                const targetTheme = effectiveThemeTitle.toLowerCase().trim();

                const themeEvents = data.filter(event => {
                    if (!event.mainTheme) return false;
                    const rowTheme = event.mainTheme.toLowerCase().trim();
                    return rowTheme === targetTheme || rowTheme.includes(targetTheme) || targetTheme.includes(rowTheme);
                });

                // Sort by year
                themeEvents.sort((a, b) => {
                    const yearA = parseInt(a.year) || 9999;
                    const yearB = parseInt(b.year) || 9999;
                    return yearA - yearB;
                });

                setEvents(themeEvents);
                if (themeEvents.length > 0) {
                    setActiveYear(themeEvents[0].year);
                    setActiveIndex(0);
                } else {
                    setActiveYear(null);
                }
            } catch (e) {
                console.error("Error in TimelineView:", e);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [selectedTheme]);

    const handleEventClick = (year: string, index: number) => {
        setActiveYear(year);
        setActiveIndex(index);
    };

    const scrollTimeline = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const activeEvent = events[activeIndex];

    if (loading) {
        return <div className="p-12 text-center text-brand-brown animate-pulse">Fetching data from Archives...</div>;
    }

    return (
        <div
            className="relative w-full flex flex-col min-h-[700px] border-l border-r border-[#937B6A] overflow-hidden"
            style={{
                backgroundImage: "url('/timebg.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Error Banner */}
            {errorMsg && (
                <div className="bg-brand-red/10 border-b border-brand-red/20 p-4 text-xs text-brand-red flex justify-between items-center">
                    <span><strong>Connection Error:</strong> {errorMsg} (Showing backup data)</span>
                    <button onClick={() => setErrorMsg(null)} className="hover:underline">Dismiss</button>
                </div>
            )}

            {events.length === 0 ? (
                <div className="p-8 min-h-[400px] flex flex-col items-center justify-center text-center flex-grow">
                    <div className="bg-[#FDFBF7]/90 p-8 rounded-lg shadow-sm">
                        <p className="text-brand-brown/60 text-lg font-semibold mb-2">No timeline data found for <br /><span className="text-brand-teal">'{selectedTheme}'</span></p>
                        <p className="text-sm text-gray-500 mb-6">Looking for sheet value: <strong>{THEMES_DATA.find(t => t.title === selectedTheme)?.sheetTitle || selectedTheme}</strong></p>
                    </div>
                </div>
            ) : (
                <>
                    {/* 1. Timeline Ruler */}
                    <div className="relative w-full pt-8 pb-10">
                        {/* Ruler horizontal line */}
                        <div className="absolute top-16 left-0 w-full h-[1px] bg-brand-brown/20 z-0 transform -translate-y-1/2"></div>
                        
                        {/* Scrollable dates container */}
                        <div 
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto hide-scrollbar px-16 space-x-12 relative z-20"
                        >
                            {events.map((event, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={`${event.year}-${idx}`}
                                        onClick={() => handleEventClick(event.year, idx)}
                                        className="flex flex-col items-center group flex-shrink-0 focus:outline-none"
                                    >
                                        <span className={`text-[14px] font-medium tracking-wider mb-2 h-4 block transition-colors ${isActive ? 'text-[#3B7D7D] font-bold' : 'text-brand-brown/60 group-hover:text-brand-brown'}`}>
                                            {event.year === '0000' ? '?' : event.year}
                                        </span>
                                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors relative z-10 ${isActive ? 'bg-[#3B7D7D] border-[#3B7D7D]' : 'bg-[#FDFBF7] border-brand-brown/40 group-hover:border-brand-brown'}`}></div>
                                        <span className={`mt-2 text-[12px] uppercase tracking-widest ${isActive ? 'text-[#3B7D7D]' : 'text-brand-brown/40'}`}>
                                            {event.day ? `${event.day} ` : ''}{event.month || '-'}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Navigation Buttons placed BELOW sides of the ruler line area */}
                        <div className="absolute bottom-[-8px] left-4 z-30">
                            <ArrowButton direction="left" onClick={() => scrollTimeline('left')} />
                        </div>
                        <div className="absolute bottom-[-8px] right-4 z-30">
                            <ArrowButton direction="right" onClick={() => scrollTimeline('right')} />
                        </div>
                    </div>

                    {/* 2. Main Content Area */}
                    {activeEvent && (
                        <div className="flex-grow flex flex-col">
                            {/* Top Section: Year, Image, and Description */}
                            <div className="p-8 md:p-12 grid md:grid-cols-12 gap-12 items-start">
                                {/* Left Column: Big Year + Image */}
                                <div className="md:col-span-4 flex flex-col items-start">
                                    <h2 className="text-[8rem] leading-none font-serif text-[#937B6A] font-normal">
                                        {activeEvent.year === '0000' ? '—' : activeEvent.year}
                                    </h2>
                                    <img
                                        src={themeImageUrl}
                                        alt={`${selectedTheme} logo`}
                                        width={111}
                                        height={109}
                                        className="mt-8 block"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/111x109/EEE/31343C?text=No+Logo';
                                        }}
                                    />
                                </div>

                                {/* Right Column: Title and Description */}
                                <div className="md:col-span-8 pt-4">
                                    <h3 className="text-4xl font-serif text-brand-brown leading-tight mb-3">
                                        {activeEvent.title}
                                    </h3>
                                    <p className="text-sm uppercase tracking-widest text-brand-brown/60 mb-6">
                                        {activeEvent.authors}
                                    </p>
                                    <div className="prose prose-brown max-w-none mb-8">
                                        <p className="text-brand-brown/90 leading-relaxed text-lg font-light">
                                            {activeEvent.description}
                                        </p>
                                    </div>
                                    {activeEvent.link && (
                                        <a
                                            href={activeEvent.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-[#3B7D7D] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm"
                                        >
                                            View Media Item
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* 3. Bottom Metadata Line */}
                            <div className="px-8 md:px-12 pb-12 mt-auto">
                                <div className="grid md:grid-cols-12 gap-12 border-t border-[#937B6A]/20 pt-8">
                                    <div className="md:col-span-4">
                                        <span className="text-[14px] uppercase tracking-[0.2em] text-[#937B6A]">
                                            {activeEvent.mainTheme || selectedTheme}
                                        </span>
                                    </div>
                                    <div className="md:col-span-8 flex flex-row items-center justify-end gap-x-12 text-[#937B6A]">
                                        <span className="text-[14px] uppercase tracking-[0.2em]">
                                            {activeEvent.day ? `${activeEvent.day} ` : ''}{activeEvent.month} {activeEvent.year}
                                        </span>
                                        <span className="text-[14px] text-[#937B6A] uppercase tracking-[0.2em]">
                                            {activeEvent.mediaType || 'Media'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* 4. Decorative Pattern Footer */}
            <div className="w-full mt-4 overflow-hidden">
                <img src="/lowerstrip.png" alt="" className="w-full block" />
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default TimelineView;
