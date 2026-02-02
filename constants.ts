
import type { AccordionItem, Theme, TimelineEvent, SegregationTab } from './types';

export const googleSheetInstructions = `
**How to get your Google Sheets API Key and Sheet ID:**

1.  **Create a Google Sheet:**
    *   You have successfully converted your Excel file.
    *   **Current Working Sheet:** [https://docs.google.com/spreadsheets/d/1JW7YIvHNVF08jtswLR32gTnu7K_hEWmZXwctuUYJD-I/edit](https://docs.google.com/spreadsheets/d/1JW7YIvHNVF08jtswLR32gTnu7K_hEWmZXwctuUYJD-I/edit)
    *   **Sheet ID:** \`1JW7YIvHNVF08jtswLR32gTnu7K_hEWmZXwctuUYJD-I\`

2.  **Get the API Key:**
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Ensure the "Google Sheets API" is enabled.
    *   Use the API Key configured in services/googleSheetsService.ts

3.  **Share your Sheet:**
    *   Ensure the sheet is "Anyone with the link" can "Viewer".
`;


export const THEMES_DATA: Theme[] = [
    {
        title: 'Biocultural Diversity in Flux',
        imageUrl: '1.PNG',
    },
    {
        title: 'Ecological Transformation and Conservation',
        imageUrl: '2.PNG',
        sheetTitle: 'Ecological Conservation',
    },
    {
        title: 'Human Wildlife Interactions and Coexistence',
        imageUrl: '6.png',
        sheetTitle: 'Human Wildlife',
    },
    {
        title: 'Economies of the Hills',
        imageUrl: '3.PNG',
    },
    {
        title: 'Policy, Planning, Governance',
        imageUrl: '4.PNG',
    },
    {
        title: 'Languages and Community Cultural Expressions',
        imageUrl: '5.PNG',
        sheetTitle: 'Languages and Community Cultural Expressions',
    },
    {
        title: 'Sustainability and Revitalisation Pathways',
        imageUrl: '7.png',
        sheetTitle: 'Sustainability',
    },
];


export const ACCORDION_DATA: AccordionItem[] = [
    {
        title: 'Biocultural Diversity in Flux',
        content: 'The Nilgiris is home to a mosaic of communities whose lives are intertwined with the region’s forests, farms, and rivers. This section traces how trade, migration, colonial classifications, tourism, and settler patterns have reshaped local ecologies and cultural practices over time. Today, the Nilgiris Biosphere Reserve is a melting pot of people and practices—a dynamic space of negotiation, adaptation, and opportunity.',
        thumbnailUrl: '1.PNG',
        imageUrl: 'N1.png'
    },
    {
        title: 'Ecological Transformation and Conservation',
        content: 'Content about ecological transformation and conservation goes here. This section explores the delicate balance of the ecosystem and the ongoing efforts to preserve its unique biodiversity amidst various challenges.',
        thumbnailUrl: '2.PNG',
        imageUrl: 'N2.JPG'
    },
    {
        title: 'Human Wildlife Interactions and Coexistence',
        content: 'This section delves into the complex relationship between human populations and wildlife in the Nilgiris. It highlights stories of conflict, coexistence, and conservation strategies that aim to foster a harmonious environment for all inhabitants.',
        thumbnailUrl: '6.png',
        imageUrl: 'N5.JPG'
    },
    {
        title: 'Economies of the Hills',
        content: 'Exploring the diverse economic activities that sustain the communities of the Nilgiris, from traditional agriculture and pastoralism to modern tourism and industries. This section examines the economic shifts and their impact on the local landscape and livelihoods.',
        thumbnailUrl: '3.PNG',
        imageUrl: 'N3.JPG'
    },
    {
        title: 'Policy, Planning, Governance',
        content: 'This section analyzes the role of governance and policy-making in shaping the Nilgiris Biosphere Reserve. It covers historical and contemporary legal frameworks, community rights, and the politics of conservation and development.',
        thumbnailUrl: '4.PNG',
        imageUrl: 'N4.JPG'
    },
    {
        title: 'Languages and Community Cultural Expressions',
        content: 'A celebration of the rich linguistic and cultural tapestry of the Nilgiris. This section showcases the oral histories, traditional arts, music, and rituals of the various indigenous and local communities, highlighting efforts to preserve this intangible heritage.',
        thumbnailUrl: '5.PNG',
        imageUrl: 'N6.JPG'
    },
    {
        title: 'Sustainability and Revitalisation Pathways',
        content: 'Focusing on innovative approaches to sustainability and revitalization in the Nilgiris, this section presents case studies and initiatives that aim to restore ecological balance, promote sustainable livelihoods, and empower local communities for a resilient future.',
        thumbnailUrl: '7.png',
        imageUrl: 'N7.JPG'
    }
];


export const SEGREGATION_TABS: SegregationTab[] = [
       { 
        id: 1, 
        title: 'Navigating the Landscapes',
        line1: 'Navigating the',
        line2: 'Landscapes'
    },
    { 
        id: 2, 
        title: 'Tracing Change Through Time',
        line1: 'Tracing Change',
        line2: 'Through Time'
    },
    { 
        id: 3, 
        title: 'The Region as Archive',
        line1: 'The Region as',
        line2: 'Archive'
    },
]

// THIS MOCKS THE EXACT STRUCTURE OF YOUR EXCEL SHEET
// It acts as a fallback if the Google Sheet connection fails.
export const MOCK_GOOGLE_SHEET_ROWS = [
    // Row 0: Header
    [
        "Main Section",
        "THUMBNAILS",
        "Title of Media Item",
        "Description",
        "Geographical Location", // EXPECTED TO BE NUMBERS (e.g., 1, 11, 21)
        "Media Type",
        "Date of Creation",
        "Keywords",
        "Publisher/ Author/ Originator",
        "Location (URL/Filepath on G.Drive)"
    ],
    // Row 1: Theme 1 Item (Mapped to Map ID '1')
    [
        "Biocultural Diversity in Flux",
        "https://picsum.photos/seed/unesco/200/200",
        "Nilgiris - Man and Biosphere (UNESCO)",
        "In 1986, India declared 5,670 square kilometers of intersecting land in parts of Tamil Nadu, Kerala and Karnataka as the Nilgiri Biosphere Reserve (NBR). This status was conferred by the United Nations Educational, Scientific and Cultural Organization (UNESCO) under its Man and Biosphere Program (MAB). The NBR thus became the first of its kind for India.",
        "1", // Map Slot 1
        "Article",
        "Nov-86",
        "Protected Areas",
        "UNESCO",
        "https://www.unesco.org/en/mab/nilgiri/"
    ],
    // Row 2: Theme 2 Item (Mapped to Map ID '11')
    [
        "Ecological Transformation and Conservation",
        "https://picsum.photos/seed/restoration/200/200",
        "Restoring the Sholas: A Decade of Action",
        "A comprehensive report detailing the efforts to remove invasive species and replant native Shola forest species in the upper Nilgiris.",
        "11", // Map Slot 11
        "Report",
        "18-Dec-24",
        "Restoration, Shola, Invasive Species",
        "Keystone Foundation",
        "https://example.com/report"
    ],
    // Row 3: Theme 3 Item (Mapped to Map ID '21')
    [
        "Economies of the Hills",
        "https://picsum.photos/seed/coffee/200/200",
        "The Changing Coffee Landscape",
        "An analysis of how climate change is affecting coffee yields and the economic stability of small growers in Coonoor.",
        "21", // Map Slot 21
        "Journal Paper",
        "February 2022",
        "Economy, Agriculture, Coffee",
        "Coffee Board of India",
        "https://example.com/coffee"
    ],
    // Row 4: Theme 1 Item (Mapped to Map ID '2')
    [
        "Biocultural Diversity in Flux",
        "https://picsum.photos/seed/toda/200/200",
        "Toda Embroidery: Threads of Tradition",
        "A visual documentation of the intricate embroidery patterns of the Toda community and their cultural meanings.",
        "2", // Map Slot 2
        "Photo Essay",
        "31-May-16",
        "Culture, Art, Toda",
        "Nilgiri Arts Council",
        "https://example.com/toda"
    ]
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
    {
        year: '2013',
        title: 'The Nilgiris Biosphere Reserve: An Unrealized Vision for Conservation',
        authors: 'JEAN-PHILIPPE PUYRAVAUD, PRIYA DAVIDAR',
        description: 'This article explores the implications of excluding a transition zone in the design of the Nilgiris Biosphere Reserve (NBR), despite the original UNESCO Man and Biosphere (MAB) framework recommending one to support sustainable development. With case studies including the India-based Neutrino Observatory, elephant corridor disputes, and local tourism dynamics, the article highlights how the lack of a transition zone has contributed to ecological fragmentation, human-wildlife conflict, and unsustainable development. It argued that tools like landscape ecology and environmental ethics offer pathways to better environmental governance—if political will can match technical feasibility.',
        thumbnailUrl: 'https://picsum.photos/seed/timeline1/100/100',
        tags: ['LOREM IPSUM DOLOR', 'JOURNAL PAPER'],
        mainTheme: 'Policy, Planning, Governance'
    },
    {
        year: '2015',
        title: 'A New Approach to Conservation in the Nilgiris',
        authors: 'AUTHOR 1, AUTHOR 2',
        description: 'A follow-up study examining the socio-economic impacts of new conservation policies implemented in 2014. The findings suggest a mixed outcome, with improved biodiversity metrics but increased challenges for local livelihoods, pointing to a need for more inclusive strategies.',
        thumbnailUrl: 'https://picsum.photos/seed/timeline2/100/100',
        tags: ['CONSERVATION', 'POLICY ANALYSIS'],
        mainTheme: 'Ecological Transformation and Conservation'
    },
    {
        year: '2018',
        title: 'Community-Led Ecotourism Initiatives',
        authors: 'LOCAL COMMUNITY FORUM',
        description: 'This report documents the rise of community-managed ecotourism projects as a sustainable alternative to large-scale commercial tourism. It highlights success stories in preserving local culture and environment while generating economic benefits.',
        thumbnailUrl: 'https://picsum.photos/seed/timeline3/100/100',
        tags: ['ECOTOURISM', 'COMMUNITY REPORT'],
        mainTheme: 'Economies of the Hills'
    },
    {
        year: '2020',
        title: 'Oral Histories of the Kurumba People',
        authors: 'NILGIRI CULTURAL SOCIETY',
        description: 'A collection of recorded oral histories from elders of the Kurumba community, detailing their traditions, connection to the land, and the changes they have witnessed over the last century.',
        thumbnailUrl: 'https://picsum.photos/seed/timeline4/100/100',
        tags: ['ORAL HISTORY', 'INDIGENOUS KNOWLEDGE'],
        mainTheme: 'Biocultural Diversity in Flux'
    }
];
