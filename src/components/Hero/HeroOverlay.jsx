import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TagPill from '../ui/TagPill';
import Navbar from '../Nav/Navbar';
import { FRAME_CONTENT } from '../../constants/frames';

const HeroOverlay = ({ isRevealed, activeContentIndex }) => {
  const [content, setContent] = useState(FRAME_CONTENT[0]);
  const contentRef = useRef(null);

  // Content is now updated instantly when activeContentIndex changes.
  // The actual fade in/out is perfectly synced to the scroll position directly via DOM manipulation in useScrollCanvas.
  useEffect(() => {
      setContent(FRAME_CONTENT[activeContentIndex] || FRAME_CONTENT[0]);
  }, [activeContentIndex]);

  // Reveal final UI elements (tint) when reaching threshold
  useEffect(() => {
    if (isRevealed) {
        gsap.to('#black-tint', { opacity: 0.5, duration: 2, ease: "power3.out" });
    } else {
        gsap.set('#black-tint', { opacity: 0.2 }); // Initial subtle tint for visibility
    }
  }, [isRevealed]);

  return (
    <div className="hero-overlay fixed inset-0 z-20 w-screen h-screen flex flex-col justify-between pointer-events-none p-6 md:p-12 lg:p-16 overflow-hidden">
      
      {/* Cinematic Black Tint Overlay */}
      <div id="black-tint" className="absolute inset-0 bg-black/40 pointer-events-none opacity-[0.2]" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

      <Navbar />

      <div className="flex flex-col h-full justify-end relative z-10 pb-8 md:pb-0" >
        
        {/* Dynamic Content Container */}
        <div id="hero-dynamic-content" ref={contentRef} className="w-full grid grid-cols-12 gap-6 lg:gap-8 items-end mb-4 lg:mb-6 will-change-transform will-change-opacity">
            <div className="col-span-12 lg:col-span-9 relative">
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 lg:mb-6 pointer-events-auto">
                    {content.tags.map((tag, i) => (
                        <TagPill key={i}>{tag}</TagPill>
                    ))}
                </div>

                {/* Light-weight Dynamic Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-[6vw] font-light text-white leading-[1.1] lg:leading-[1.05] tracking-tight drop-shadow-2xl max-w-[600px] lg:max-w-none">
                    {content.headline}
                </h1>
            </div>

            {/* Dynamic Subtext */}
            <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-end pb-2 lg:pb-4">
                <p className="text-white/80 text-[13px] md:text-[14px] font-normal max-w-[320px] lg:max-w-[280px] leading-relaxed drop-shadow-lg text-left">
                    {content.subtext}
                </p>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default HeroOverlay;
