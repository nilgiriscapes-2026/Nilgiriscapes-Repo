import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 py-6 md:pt-10" style={{ backgroundColor: 'transparent' }}>
      <div className="w-full flex items-center gap-2 md:gap-4 px-2 md:px-0">

        {/* Left Decorative Line */}
        <div className="flex items-center flex-shrink-0 w-8 md:w-12 lg:w-24">
          <div className="h-px bg-[#FFF3EB] w-full"></div>
          <div className="w-[4px] h-[4px] md:w-[7px] md:h-[7px] bg-[#FFF3EB] rounded-full flex-shrink-0"></div>
        </div>

        {/* Home Link */}
        <a href="#shared-grounds" className="text-sm md:text-[20px] font-medium tracking-wider text-[#FFF3EB] hover:text-white transition-colors mx-2">
          Home
        </a>

        {/* Middle Connecting Line */}
        <div className="flex items-center flex-grow mx-2">
          <div className="w-[4px] h-[4px] md:w-[7px] md:h-[7px] bg-[#FFF3EB] rounded-full flex-shrink-0"></div>
          <div className="h-px bg-[#FFF3EB] w-full mx-0"></div>
          <div className="w-[4px] h-[4px] md:w-[7px] md:h-[7px] bg-[#FFF3EB] rounded-full flex-shrink-0"></div>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4 md:space-x-8 text-xs md:text-[20px] font-medium tracking-wide text-[#FFF3EB]">
            <li><a href="#themes" className="hover:text-white transition-colors">Themes</a></li>
            <li><a href="#segregation" className="hover:text-white transition-colors">Segregations</a></li>

            <li><a href="#call-to-action" className="hover:text-white transition-colors whitespace-nowrap">Call to Action</a></li>
          </ul>
        </nav>

        {/* Right Decorative Line */}
        <div className="flex items-center flex-shrink-0 w-8 md:w-12 lg:w-24">
          <div className="w-[4px] h-[4px] md:w-[7px] md:h-[7px] bg-[#FFF3EB] rounded-full flex-shrink-0"></div>
          <div className="h-px bg-[#FFF3EB] w-full"></div>
        </div>

      </div>
    </header>
  );
};

export default Header;