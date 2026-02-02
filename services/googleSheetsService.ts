
import { TimelineEvent } from '../types';
import { TIMELINE_EVENTS, MOCK_GOOGLE_SHEET_ROWS } from '../constants';

// Environment variables (with fallbacks to your specific keys for immediate functionality)
const API_KEY = (import.meta as any).env?.VITE_GOOGLE_SHEETS_API_KEY || 'AIzaSyANCtmlsxEItX8oriw4K24KkHS6oqDRJNg';
const SHEET_ID = (import.meta as any).env?.VITE_GOOGLE_SHEETS_SHEET_ID || '1JW7YIvHNVF08jtswLR32gTnu7K_hEWmZXwctuUYJD-I';
const RANGE = (import.meta as any).env?.VITE_GOOGLE_SHEETS_RANGE || "'media mapping'!A1:Z"; // Changed to A1 to ensure we get headers

// --- HELPER: Column Detection ---
interface ColumnMapping {
    mainSectionIdx: number;
    titleIdx: number;
    dateIdx: number;
    descIdx: number;
    thumbIdx: number;
    tagsIdx: number;
    authorIdx: number;
    linkIdx: number;
    geoIdx: number;       
    mediaTypeIdx: number; 
}

const getColumnIndices = (headerRow: string[]): ColumnMapping => {
    const lowerHeaders = headerRow.map(h => h.toLowerCase().trim());
    
    const findIdx = (keywords: string[]) => 
        lowerHeaders.findIndex(h => keywords.some(k => h.includes(k)));

    return {
        mainSectionIdx: findIdx(['main section', 'theme']),
        titleIdx: findIdx(['title', 'media item']),
        dateIdx: findIdx(['date', 'creation', 'year']),
        descIdx: findIdx(['description', 'desc']),
        thumbIdx: findIdx(['thumbnail', 'image']),
        tagsIdx: findIdx(['keyword', 'tag']),
        authorIdx: findIdx(['publisher', 'author', 'originator']),
        linkIdx: findIdx(['location (url', 'url', 'drive', 'link']), // Specific check to avoid confusing "Geographical Location" with "Location URL"
        // Updated geoIdx to catch 'Sl No.', 'Sl No', 'Serial', 'ID', 'Slot'
        geoIdx: findIdx(['sl no', 'sl.no', 'sl.', 'serial no', 'geographical', 'geo location', 'place', 'id', 'serial', 's.no', 'slot', 'no.']),
        mediaTypeIdx: findIdx(['media type', 'format', 'type'])
    };
};

// --- HELPER: Date Parsing ---
const parseDateInfo = (dateStr: string): { year: string, month: string, day: string } => {
    if (!dateStr) return { year: '0000', month: '', day: '' };
    const str = dateStr.trim();

    // Map for month names to short codes
    const months: { [key: string]: string } = {
        'jan': 'JAN', 'feb': 'FEB', 'mar': 'MAR', 'apr': 'APR', 'may': 'MAY', 'jun': 'JUN',
        'jul': 'JUL', 'aug': 'AUG', 'sep': 'SEP', 'oct': 'OCT', 'nov': 'NOV', 'dec': 'DEC',
        'january': 'JAN', 'february': 'FEB', 'march': 'MAR', 'april': 'APR', 'june': 'JUN',
        'july': 'JUL', 'august': 'AUG', 'september': 'SEP', 'october': 'OCT', 'november': 'NOV', 'december': 'DEC'
    };

    let year = '';
    let month = '';
    let day = '';

    // 1. Extract Month
    const lowerStr = str.toLowerCase();
    for (const [key, val] of Object.entries(months)) {
        if (lowerStr.includes(key)) {
            month = val;
            break;
        }
    }

    // 2. Extract Year
    // Check for 4-digit year
    const yearMatch = str.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
        year = yearMatch[0];
    } else {
        // Check for 2-digit year suffix (e.g., -86, /24, -16) at the end of string
        const twoDigitMatch = str.match(/[-/\s'](\d{2})$/);
        if (twoDigitMatch) {
            const yy = parseInt(twoDigitMatch[1], 10);
            year = (yy > 40 ? 1900 + yy : 2000 + yy).toString();
        }
    }

    // 3. Extract Day
    let tempStr = str;
    if (year) tempStr = tempStr.replace(year, ''); // Remove year
    if (month) {
        // Remove the month name from tempStr
        const monthNameRegex = new RegExp(Object.keys(months).join('|'), 'gi');
        tempStr = tempStr.replace(monthNameRegex, '');
    }
    
    // Find any remaining 1-2 digit number
    const dayMatch = tempStr.match(/\b([0-2]?[0-9]|3[01])\b/);
    if (dayMatch) {
        day = dayMatch[0];
    }

    // Fallback: If logic failed but JS Date can parse it
    if (!year) {
        const ts = Date.parse(str);
        if (!isNaN(ts)) {
            const d = new Date(ts);
            year = d.getFullYear().toString();
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            month = monthNames[d.getMonth()];
            day = d.getDate().toString();
        }
    }

    return { year: year || '0000', month, day };
};

// --- HELPER: Row Mapper ---
const mapRowsToEvents = (rows: any[], mapping: ColumnMapping): TimelineEvent[] => {
    let lastMainSection = '';

    // We skip the first row (headers) when calling this, or filter it out
    return rows
    .map((row: string[]): TimelineEvent | null => {
        
        // Helper to safely get column data
        const getCol = (i: number) => (i >= 0 && row[i] ? row[i].trim() : '');

        const rawMainSection = getCol(mapping.mainSectionIdx);
        const title = getCol(mapping.titleIdx);

        // 1. CAPTURE CONTEXT (Fill Down Logic)
        if (rawMainSection) {
            lastMainSection = rawMainSection;
        }

        // 2. STRICT VALIDATION
        if (!title) return null;

        // 3. ASSIGN THEME
        const effectiveMainSection = rawMainSection || lastMainSection;

        // 4. PARSE REST OF DATA
        const rawDate = getCol(mapping.dateIdx);
        const { year, month, day } = parseDateInfo(rawDate);

        return {
            mainTheme: effectiveMainSection, 
            thumbnailUrl: getCol(mapping.thumbIdx) || 'https://placehold.co/150', 
            title: title,
            description: getCol(mapping.descIdx), 
            year: year, 
            month: month,
            day: day,
            tags: getCol(mapping.tagsIdx) ? getCol(mapping.tagsIdx).split(',').map(t => t.trim()) : [], 
            authors: getCol(mapping.authorIdx), 
            link: getCol(mapping.linkIdx),
            location: getCol(mapping.geoIdx),         // New
            mediaType: getCol(mapping.mediaTypeIdx)   // New
        };
    })
    .filter((e): e is TimelineEvent => e !== null);
}

// --- REAL FETCHING LOGIC ---

export interface FetchResult {
    events: TimelineEvent[];
    error?: string;
    debugThemes?: string[];
    detectedHeaders?: string[];
    columnMapping?: any;
}

export const fetchTimelineEvents = async (): Promise<FetchResult> => {
    
    let rows = [];
    let errorMessage = "";

    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || response.statusText);
        }

        const data = await response.json();
        rows = data.values;

        if (!rows || rows.length === 0) {
            return { events: [] };
        }

    } catch (error: any) {
        console.error("❌ FETCH FAILED:", error);
        // Fallback to mock data if fetch fails
        const headerRow = MOCK_GOOGLE_SHEET_ROWS[0];
        const mapping = getColumnIndices(headerRow);
        return { 
            events: mapRowsToEvents(MOCK_GOOGLE_SHEET_ROWS.slice(1), mapping),
            error: error.message || "Unknown Error"
        };
    }

    // 1. Detect Columns from Header Row (Row 0)
    const headerRow = rows[0];
    const mapping = getColumnIndices(headerRow);

    // 2. Map Data (skipping header row)
    const dataRows = rows.slice(1);
    const processedEvents = mapRowsToEvents(dataRows, mapping);
    
    // DEBUGGING HELP: Log unique themes found
    const uniqueThemes = Array.from(new Set(processedEvents.map(e => e.mainTheme))).filter(Boolean);
    
    return { 
        events: processedEvents,
        debugThemes: uniqueThemes,
        detectedHeaders: headerRow,
        columnMapping: mapping
    };
};
