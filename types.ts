
export interface Theme {
  title: string;
  imageUrl: string;
  sheetTitle?: string;
}

export interface AccordionItem {
  title: string;
  content: string;
  thumbnailUrl: string;
  imageUrl: string;
}

export interface SegregationTab {
  id: number;
  title: string;
  line1: string;
  line2: string;
}

export interface TimelineEvent {
  year: string;
  month?: string; // Added for "Nov" display
  day?: string;   // Added for "18" display
  title: string;
  authors: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  mainTheme: string;
  link?: string; // Added for the URL column
  location?: string; // Added for Geographical Segregation
  mediaType?: string; // Added for context
}

export interface GeographicalItem {
  id: number;
  title: string;
  author: string;
  thumbnailUrl: string;
  description: string;
  mainTheme: string;
  subTheme: string;
  mediaType: string;
  position: { top: string; left: string };
}