import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TagPill from '../ui/TagPill';
import Navbar from '../Nav/Navbar';
import { FRAME_CONTENT } from '../../constants/frames';

const HeroOverlay = ({ isRevealed, activeContentIndex }) => {
  const [content, setContent] = useState(FRAME_CONTENT[0]);
  const contentRef = useRef(null);

  // Crossfade content dynamically when activeContentIndex changes during scroll
  useEffect(() => {
    const newContent = FRAME_CONTENT[activeContentIndex] || FRAME_CONTENT[0];
    if (content.headline === newContent.headline) return;

    gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
            setContent(newContent);
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }
    });
  }, [activeContentIndex, content.headline]);

  // Reveal final UI elements (tint) when reaching threshold
  useEffect(() => {
    if (isRevealed) {
        gsap.to('#black-tint', { opacity: 0.5, duration: 2, ease: "power3.out" });
    } else {
        gsap.set('#black-tint', { opacity: 0.2 }); // Initial subtle tint for visibility
    }
  }, [isRevealed]);

  return (
    <div className="hero-overlay fixed inset-0 z-20 w-screen h-screen flex flex-col justify-between pointer-events-none p-8 lg:p-16 overflow-hidden">
      
      {/* Cinematic Black Tint Overlay */}
      <div id="black-tint" className="absolute inset-0 bg-black/40 pointer-events-none opacity-[0.2]" />

      <Navbar />

      <div className="flex flex-col h-full justify-end relative z-10" >
        
        {/* Dynamic Content Container */}
        <div ref={contentRef} className="w-full grid grid-cols-12 gap-8 items-end mb-6">
            <div className="col-span-12 lg:col-span-9 relative">
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
                    {content.tags.map((tag, i) => (
                        <TagPill key={i}>{tag}</TagPill>
                    ))}
                </div>

                {/* Light-weight Dynamic Headline */}
                <h1 className="text-[5.5vw] lg:text-[6vw] font-light text-white leading-[1.05] tracking-tight drop-shadow-2xl">
                    {content.headline}
                </h1>
            </div>

            {/* Dynamic Subtext */}
            <div className="col-span-12 lg:col-span-3 flex justify-end pb-4">
                <p className="text-white/80 text-[13px] lg:text-[14px] font-normal max-w-[280px] leading-relaxed drop-shadow-lg text-right lg:text-left">
                    {content.subtext}
                </p>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default HeroOverlay;
