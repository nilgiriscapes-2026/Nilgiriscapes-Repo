
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
      style={{
        backgroundImage: "url('/Group8.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent'
      }}
    >
      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="font-serif text-6xl md:text-[128px] font-normal mb-6 leading-tight text-[#FFF3EB]">Nilgiriscapes</h1>
        <p className="max-w-3xl mx-auto text-[24px] leading-[1.3] font-sans font-normal text-[#FFF3EB] px-4">
          The Nilgiris Biosphere Reserve is a unique ecological and cultural landscape shaped over centuries by its inhabitants and environments. This visual essay explores how people, policies and ecosystems interact across geographically distinct regions and through different time periods. Through stories, data and multimedia, we trace shifts in land, lifeways and livelihoods in the NBR, offering an entry point into a living and evolving repository.
        </p>

      </div>
    </section>
  );
};

export default Hero;
