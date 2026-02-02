
import React, { useState, useEffect, useMemo } from 'react';
import { fetchTimelineEvents } from '../services/googleSheetsService';
import { THEMES_DATA } from '../constants';
import type { TimelineEvent } from '../types';

interface MaterialWiseViewProps {
    selectedTheme: string;
}

const Card: React.FC<{ event: TimelineEvent; themeImageUrl: string }> = ({ event, themeImageUrl }) => {
    // Simple logic: Get the Sl No. (stored in event.location) and look for [number].jpg
    const itemId = event.location ? event.location.toString().trim() : null;
    const imageSrc = itemId ? `/archive_images/${itemId}.jpg` : null;

return (
        <div className="border border-brand-brown/20 flex flex-col bg-white transition-all duration-300 hover:shadow-xl group w-full h-full">
            
            {/* Top Image Area */}
            <div className="h-40 bg-[#E5E5E5] relative group-hover:bg-[#dcdcdc] transition-colors shrink-0 overflow-hidden">
                {imageSrc ? (
                    <img 
                        src={imageSrc}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const img = e.currentTarget;
                            if (img.src.endsWith('.jpg')) {
                                img.src = img.src.replace('.jpg', '.png');
                            } else {
                                img.style.display = 'none';
                            }
                        }}
                    />
                ) : null}
            </div>

            <div className="p-8 pt-10 flex flex-col flex-grow relative">
                <h3 className="text-[28px] font-serif text-[#2C1200] leading-tight mb-2">
                    {event.title}
                </h3>

                <p className="text-base font-regular uppercase text-[#937B6A] mb-4 tracking-wider">
                    {event.authors || 'Unknown Publisher'}
                </p>

                <p className="text-sm text-brand-brown/80 leading-relaxed mb-8 break-words">
                    {event.description}
                </p>

                <div className="flex justify-between items-end mt-auto pt-4 border-t border-brand-brown/5">
                    {event.link && (
                        <a
                            href={event.link}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#3B7D7D] text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-[#3a6161] transition-colors shadow-sm"
                        >
                           View Media Item
                        </a>
                    )}

                    <img
                        src={themeImageUrl}
                        alt="Theme Thumbnail"
                        className="w-[80px] h-[80px] object-contain"
                        onError={(e) =>
                            ((e.target as HTMLImageElement).src = 'https://placehold.co/54x53')
                        }
                    />
                </div>
            </div>
        </div>
    );
};

const SidebarItem: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({
    label,
    isActive,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                relative w-[237px] h-[97px] flex flex-col justify-center items-left px-5 flex-shrink-0 transition-all duration-300
                border border-[#937B6A]
                ${isActive ? 'bg-[#3B7D7D] text-white' : 'text-brand-brown hover:opacity-90'}
            `}
            style={!isActive ? { backgroundImage: "url('/bg_mat.png')", backgroundSize: 'cover' } : {}}
        >
            <div className="flex items-center w-full mb-3 opacity-80">
                <div className={`w-[5px] h-[5px] rounded-full ${isActive ? 'bg-white' : 'bg-[#937B6A]'}`} />
                <div className={`h-px flex-grow ${isActive ? 'bg-white' : 'bg-[#937B6A]'}`} />
                <div className={`w-[5px] h-[5px] rounded-full ${isActive ? 'bg-white' : 'bg-[#937B6A]'}`} />
            </div>

            <span className="font-bold uppercase text-[17px] tracking-wider leading-none text-left">
                {label || 'Uncategorized'}
            </span>
        </button>
    );
};

const MaterialWiseView: React.FC<MaterialWiseViewProps> = ({ selectedTheme }) => {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMediaType, setActiveMediaType] = useState<string>('All');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const currentThemeImage = useMemo(() => {
        const theme = THEMES_DATA.find(t => t.title === selectedTheme);
        return theme ? theme.imageUrl : 'https://placehold.co/54x53';
    }, [selectedTheme]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setErrorMsg(null);

            try {
                const { events: allEvents, error } = await fetchTimelineEvents();
                if (error) setErrorMsg(error);

                const themeObj = THEMES_DATA.find(t => t.title === selectedTheme);
                const effectiveThemeTitle = themeObj?.sheetTitle || selectedTheme;
                const targetTheme = effectiveThemeTitle.toLowerCase().trim();

                const filtered = allEvents.filter(e => {
                    const rowTheme = e.mainTheme?.toLowerCase().trim() || '';
                    return (
                        rowTheme === targetTheme ||
                        rowTheme.includes(targetTheme) ||
                        targetTheme.includes(rowTheme)
                    );
                });

                setEvents(filtered);
                setActiveMediaType('All');
            } catch (err) {
                console.error('Failed to load events', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [selectedTheme]);

    const mediaTypes = useMemo(() => {
        const types = new Set(
            events.map(e => {
                const type = e.mediaType?.trim();
                return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Other';
            })
        );

        return ['All', ...Array.from(types).sort()];
    }, [events]);

    const displayedEvents = events.filter(e => {
        if (activeMediaType === 'All') return true;
        const type = e.mediaType?.trim() || 'Other';
        return type.charAt(0).toUpperCase() + type.slice(1) === activeMediaType;
    });

    if (loading) {
        return (
            <div className="p-12 text-center text-brand-brown animate-pulse bg-white border border-brand-brown/30">
                Loading Material Archives...
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-[800px] border-b border-brand-brown/30 bg-transparent">
            {/* Sidebar width adjusted to 419px to align with category cards */}
            <div className="w-full md:w-[419px] flex-shrink-0 bg-[#FDFBF7] flex flex-col items-start pt-8 gap-4">
                <div className="flex flex-col gap-4">
                    {mediaTypes.map((type, idx) => (
                        <SidebarItem
                            key={idx}
                            label={type}
                            isActive={activeMediaType === type}
                            onClick={() => setActiveMediaType(type)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-grow flex flex-col">
                {/* Increased left padding to shift cards right to align with theme stamps */}
                <div className="pt-8 pb-8 pl-16 pr-0 flex-grow">
                    {displayedEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {displayedEvents.map((event, index) => (
                                <Card
                                    key={`${event.title}-${index}`}
                                    event={event}
                                    themeImageUrl={currentThemeImage}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-brand-brown/50">
                            <p className="text-lg italic">No items found for this category.</p>
                            <button
                                onClick={() => setActiveMediaType('All')}
                                className="mt-4 text-sm font-bold text-brand-teal hover:underline"
                            >
                                View All Items
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaterialWiseView;
