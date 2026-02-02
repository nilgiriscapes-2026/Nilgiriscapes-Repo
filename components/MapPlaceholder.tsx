
import React from 'react';

const MapPlaceholder: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <svg width="100%" height="100%" viewBox="0 0 350 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8">
                        <path d="M-2 10 l12 -12 M0 8 l8 -8 M6 10 l4 -4" stroke="#78A57A" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <path d="M104.91 1C57.73 23.33 34.09 60.1 29.91 101.3C21.09 188.5 76.91 223.7 93.91 268.5C110.91 313.3 98.91 386.5 125.41 426.3C151.91 466.1 228.41 448.9 261.41 421.7C294.41 394.5 306.91 346.5 301.41 306.5C295.91 266.5 315.41 213.7 296.41 172.9C277.41 132.1 238.91 123.7 217.91 85.3001C196.91 46.9001 220.91 1 104.91 1Z" fill="url(#hatch)" stroke="#78A57A" strokeWidth="2" />
                <path d="M104.91 1C57.73 23.33 34.09 60.1 29.91 101.3C21.09 188.5 76.91 223.7 93.91 268.5C110.91 313.3 98.91 386.5 125.41 426.3C151.91 466.1 228.41 448.9 261.41 421.7C294.41 394.5 306.91 346.5 301.41 306.5C295.91 266.5 315.41 213.7 296.41 172.9C277.41 132.1 238.91 123.7 217.91 85.3001C196.91 46.9001 220.91 1 104.91 1Z" fill="#D4EDD5" opacity="0.5" stroke="#78A57A" strokeWidth="1" />
            </svg>
        </div>
    );
};

export default MapPlaceholder;
