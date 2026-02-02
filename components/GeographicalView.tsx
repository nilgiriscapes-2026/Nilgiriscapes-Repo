
import React, { useState, useEffect, useMemo } from 'react';
import { fetchTimelineEvents } from '../services/googleSheetsService';
import { THEMES_DATA } from '../constants';
import type { TimelineEvent } from '../types';

interface GeographicalViewProps {
    selectedTheme: string;
}

const MAP_IMAGE_URL = "/nilgiris_map.png";
const BACKGROUND_IMAGE_URL = "/geo_bg.png";

const LOCATION_COORDINATES: { [key: string]: { top: number; left: number } } = {
    '6': { top: 46, left: 60 }, '7': { top: 31, left: 38 }, '5': { top: 42, left: 87 },
    '13': { top: 62, left: 52 }, '3': { top: 64, left: 34 }, '9': { top: 27, left: 21 },
    '12': { top: 35, left: 18 }, '2': { top: 54, left: 50 }, '10': { top: 14, left: 13 },
    '11': { top: 50, left: 76 }, '15': { top: 54, left: 59 }, '8': { top: 41, left: 28 },
    '4': { top: 60, left: 62 }, '1': { top: 76, left: 53 }, '14': { top: 67, left: 62 },
    '16': { top: 50, left: 77 }, '20': { top: 55, left: 50 }, '18': { top: 56, left: 42 },
    '19': { top: 61, left: 54 }, '17': { top: 63, left: 63 }, '21': { top: 55, left: 78 },
    '22': { top: 54, left: 71 }, '23': { top: 50, left: 47 }, '24': { top: 47, left: 60 },
    '31': { top: 62, left: 65 }, '32': { top: 79, left: 64 }, '33': { top: 50, left: 79 },
    '34': { top: 55, left: 76 }, '35': { top: 52, left: 54 }, '36': { top: 66, left: 58 },
    '41': { top: 36, left: 21 }, '42': { top: 30, left: 17 }, '46': { top: 46, left: 54 },
    '47': { top: 32, left: 17 }, '48': { top: 74, left: 50 }, '49': { top: 62, left: 28 },
    '50': { top: 59, left: 57 }, '51': { top: 74, left: 61 }, '52': { top: 80, left: 62 },
    '61': { top: 52, left: 75 }, '62': { top: 59, left: 55 }, '63': { top: 47, left: 53 },
    '64': { top: 47, left: 64 }, '65': { top: 76, left: 60 }, '66': { top: 51, left: 58 },
    '67': { top: 44, left: 85 }, '68': { top: 32, left: 38 }, '71': { top: 29, left: 79 },
    '72': { top: 66, left: 57 }, '73': { top: 27, left: 42 }, '74': { top: 30, left: 88 },
    '75': { top: 64, left: 62 }, '76': { top: 50, left: 70 }, '77': { top: 50, left: 27 },
    '78': { top: 65, left: 62 }, '79': { top: 46, left: 21 }, '80': { top: 55, left: 50 },
    '81': { top: 55, left: 22 }, '82': { top: 52, left: 77 }, '83': { top: 47, left: 37 },
    '84': { top: 54, left: 35 }, '85': { top: 59, left: 57 }, '86': { top: 32, left: 18 },
    '87': { top: 28, left: 7 }, '88': { top: 43, left: 87 }, '89': { top: 36, left: 33 },
    '90': { top: 77, left: 62 }, '91': { top: 64, left: 49 }, '92': { top: 64, left: 61 },
    '93': { top: 69, left: 56 }, '94': { top: 47, left: 56 }, '95': { top: 50, left: 70 },
    '96': { top: 52, left: 64 }, '97': { top: 42, left: 86 }, '98': { top: 47, left: 64 },
    '99': { top: 13, left: 10 }, '100': { top: 27, left: 7 }, '101': { top: 53, left: 74 },
    '102': { top: 48, left: 77 }, '103': { top: 54, left: 50 }, '104': { top: 35, left: 18 },
};

const MapDot: React.FC<{
    event: TimelineEvent;
    onClick: () => void;
    isActive: boolean;
    coords: { top: number, left: number }
}> = ({ event, onClick, isActive, coords }) => (
    <button
        onClick={onClick}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none"
        style={{ top: `${coords.top}%`, left: `${coords.left}%` }}
    >
        {isActive && (
            <>
                <div className="absolute inset-0 rounded-full bg-brand-purple opacity-20 animate-ping"></div>
                <div className="absolute -inset-2 rounded-full border border-brand-purple opacity-40 animate-pulse"></div>
            </>
        )}
        <div className={`rounded-full transition-all duration-300 ease-out shadow-lg relative ${isActive ? 'w-5 h-5 bg-brand-purple ring-4 ring-white ring-opacity-50 scale-110' : 'w-3 h-3 bg-brand-purple hover:scale-150 hover:bg-brand-purple ring-2 ring-white'}`} />
    </button>
);

const GeographicalView: React.FC<GeographicalViewProps> = ({ selectedTheme }) => {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
    const [loading, setLoading] = useState(true);

    const themeImageUrl = useMemo(() => THEMES_DATA.find(t => t.title === selectedTheme)?.imageUrl || 'https://placehold.co/150', [selectedTheme]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const { events: allEvents } = await fetchTimelineEvents();
            const themeObj = THEMES_DATA.find(t => t.title === selectedTheme);
            const target = (themeObj?.sheetTitle || selectedTheme).toLowerCase().trim();
            const filtered = allEvents.filter(e => {
                const rowT = e.mainTheme?.toLowerCase().trim() || '';
                return (rowT === target || rowT.includes(target) || target.includes(rowT)) && e.location;
            });
            setEvents(filtered);
            setSelectedEvent(filtered[0] || null);
            setLoading(false);
        };
        loadData();
    }, [selectedTheme]);

    const archiveImageSrc = useMemo(() => {
        if (!selectedEvent?.location) return null;
        return `/archive_images/${selectedEvent.location.toString().trim()}.jpg`;
    }, [selectedEvent]);

    if (loading) return <div className="p-12 text-center text-brand-brown animate-pulse">Loading Map Data...</div>;



    return (
    <div className="relative w-full overflow-hidden flex flex-col border-l border-r border-[#937B6A] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}>
        
        {/* UNIFIED TOP LINE: This sits on top of EVERYTHING to ensure equal width */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#937B6A] z-[100]"></div>

        <div className="grid md:grid-cols-2 items-stretch min-h-[600px] relative">
            {/* Left side: Map with padding */}
            <div className="p-8 relative">
                <div className="relative w-full aspect-[466.15/554.71] rounded-lg overflow-hidden">
                    <img src={MAP_IMAGE_URL} alt="Map" className="absolute inset-0 w-full h-full object-contain z-10" />
                    <div className="absolute inset-0 z-30">
                        {events.map((evt, idx) => (
                            <MapDot 
                                key={idx} 
                                event={evt} 
                                coords={LOCATION_COORDINATES[evt.location?.toString().trim() || ''] || { top: 50, left: 50 }} 
                                isActive={selectedEvent === evt} 
                                onClick={() => setSelectedEvent(evt)} 
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side: White background content */}
            {selectedEvent ? (
                /* Removed 'relative' to ensure the z-100 top line stays above this white box */
                <div className="flex flex-col h-full animate-fadeIn p-12 text-left bg-white">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow pr-4">
                            <h3 className="text-[32px] font-serif text-brand-brown leading-tight">{selectedEvent.title}</h3>
                            <p className="text-base uppercase tracking-wider text-[#937B6A] mt-2">{selectedEvent.authors || 'Unknown'}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <img src={selectedEvent.thumbnailUrl && !selectedEvent.thumbnailUrl.includes('placehold.co') ? selectedEvent.thumbnailUrl : themeImageUrl} className="w-[90px] h-auto object-contain" alt="stamp" />
                        </div>
                    </div>
                    <div className="w-full h-px bg-brand-brown/20 my-6" />

                    <div className="flex-grow">
                        <p className="text-lg text-brand-brown mb-8 leading-relaxed font-light">{selectedEvent.description}</p>
                        <div className="mb-8">
                            {selectedEvent.link && (
                                <a href={selectedEvent.link} target="_blank" rel="noreferrer" className="inline-block bg-[#3B7D7D] text-white text-sm font-medium px-8 py-2 rounded-full hover:bg-[#3a6161] transition-colors shadow-sm mb-10">View Media Item</a>
                            )}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] uppercase tracking-wider text-[#937B6A]">
                                <span>{selectedEvent.mainTheme || selectedTheme}</span>
                                <span className="opacity-50">•</span>
                                <span>{selectedEvent.day ? `${selectedEvent.day} ` : ''}{selectedEvent.month} {selectedEvent.year}</span>
                                <span className="opacity-50">•</span>
                                <span>{selectedEvent.mediaType || 'Media'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-brand-brown italic bg-white">No items found.</div>
            )}
        </div>
        
        {/* LOWER STRIP - Container ensures it covers the white background edge */}
        <div className="w-full relative z-50 bg-white border-t border-[#937B6A]">
            <img src="/lowerstrip.png" alt="" className="w-full block" />
        </div>
    </div>
);};

export default GeographicalView;