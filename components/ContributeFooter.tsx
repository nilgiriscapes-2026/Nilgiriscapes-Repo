import React from 'react';

const ContributeFooter: React.FC = () => {
  return (
    <footer
      id="call-to-action"
      className="relative text-[#FFF3EB] pt-24 pb-12 md:pt-32"
      style={{
        backgroundImage: "url('/Group1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-6 relative text-left z-10">
        <h2 className="text-3xl font-serif font-light md:text-4xl font-serif mb-4 tracking-wide">
          Contribute to the <br /> NBR Knowledge Commons and Living Archives
        </h2>
        <p className="text-xl leading-7 mb-8 font-light">
          This collection is only the beginning. If you know research, recordings, memories or materials that belong <br/> here, we welcome your contribution. We invite materials, stories, scholarship and community insights.<br/> Your contributions help strengthen shared understanding and stewardship.<br/> Write to us at nilgiriscapes@gmail.com to share, collaborate or connect.
        </p>
        <a href="mailto:nilgiriscapes@gmail.com">
          <button className="bg-[#FFF5EF] text-black px-8 py-2 rounded-full font-light hover:bg-gray-200 transition-colors">
            Talk to us
          </button>
        </a>
      </div>

      <div className="mt-20 relative z-10">
        <div className="container mx-auto px-6">
          {/* Top horizontal line */}
          <div className="w-full h-px bg-[#FFF3EB] mb-6 relative">
            <span className="absolute left-0 -top-[3px] w-2 h-2 bg-[#FFF3EB] rounded-full" />
            <span className="absolute right-0 -top-[3px] w-2 h-2 bg-[#FFF3EB] rounded-full" />
          </div>

          {/* Bottom row */}
          <div className="flex justify-between items-end">
            <span className="font-serif text-[36px] font-light">
              Nilgiriscapes
            </span>

            {/* Right Column: URL and Credit stacked vertically */}
            <div className="flex flex-col items-end gap-4">
              <a
                href="https://www.nilgiriscapes.com/"
                target="_blank"
                rel="noreferrer"
                className="text-base font-bold hover:underline"
              >
                https://www.nilgiriscapes.com/
              </a>
              
              <div className="text-sm font-light opacity-90">
                {/* Designed & Developed by Wonder Yonder */}
                <a 
                  href="https://www.wonder-yonder.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Designed & Developed by Wonder Yonder
                </a>
              </div>
            </div>
          </div>
        </div> {/* Closes container div */}
      </div> {/* Closes mt-20 div */}
    </footer>
  );
};

export default ContributeFooter;