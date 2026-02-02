import React from 'react';

interface AccordionItemProps {
  index: number;
  title: string;
  isOpen: boolean;
  onToggle: (index: number) => void;
  children: React.ReactNode;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="36" height="36" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19" stroke="#5C544B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H19" stroke="#5C544B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const AccordionItem: React.FC<AccordionItemProps> = ({ index, title, isOpen, onToggle, children }) => {
  return (
    <div className={`border-b border-brand-brown transition-colors duration-300 ${isOpen ? 'bg-[#FFF5EF]' : 'bg-transparent'}`}>
      <button
        onClick={() => onToggle(index)}
        className={`w-full flex justify-between items-center py-6 text-left transition-all duration-300 ${isOpen ? 'px-5' : 'px-0'}`}
      >
        <h3 className="text-xl md:text-[32px] font-serif font-normal text-[#2C1200]">{title}</h3>
        <div className="relative w-9 h-9 flex-shrink-0">
          <PlusIcon className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        <div className={`transition-all duration-300 ${isOpen ? 'px-5 pb-6' : 'px-0'}`}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;