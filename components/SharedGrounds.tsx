import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import { ACCORDION_DATA } from '../constants';

const SharedGrounds: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // <section className="py-16 md:py-24 bg-brand-offwhite">
        <section id="shared-grounds" className="pt-16 md:pt-24 pb-4 bg-brand-offwhite">

      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-[50px] font-serif font-normal leading-tight text-[#2C1200] mb-12">
          Shared Grounds, Shared Futures : <br />
          Learning from the Biosphere
        </h2>
        <div>
          {ACCORDION_DATA.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              title={item.title}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            >
              {/* <div className="grid md:grid-cols-2 gap-8 items-start py-4"> */}
              <div className="grid md:grid-cols-2 gap-y-8 md:gap-x-24 items-start py-4">

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-start gap-2">
                    <img src={item.thumbnailUrl} alt={item.title} className="w-[95px] h-[93px] object-cover flex-shrink-0 -ml-1" />
                    <span className="font-bold text-4xl text-[#937B6A] tracking-widest">...</span>
                  </div>
                  <p className="text-[18px] text-brand-brown font-light">{item.content}</p>
                </div>
                <div>
                  {/* <img src={item.imageUrl} alt={item.title} className="w-full h-auto object-cover rounded-none" /> */}
                  <img src={item.imageUrl} alt={item.title} className="w-full md:w-[634px] h-auto md:h-[357px] rounded-none object-cover" />
                </div>
              </div>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharedGrounds;