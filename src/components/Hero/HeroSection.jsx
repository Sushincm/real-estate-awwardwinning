import React from 'react';
import FrameCanvas from './FrameCanvas';
import HeroOverlay from './HeroOverlay';
import { useFramePreloader } from '../../hooks/useFramePreloader';
import { useScrollCanvas } from '../../hooks/useScrollCanvas';

const HeroSection = () => {
  const { frames, isReady, loadProgress } = useFramePreloader();
  const { canvasRef, overlayVisible, activeContentIndex } = useScrollCanvas(frames, isReady);

  return (
    <section id="hero-section" className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-end">
      {/* Phase 1: Preloader reveals once all frames are ready */}
      {!isReady && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            <h2 className="text-white text-3xl lg:text-5xl font-serif tracking-[0.2em] mb-12 uppercase animate-pulse">EverGreen</h2>
            <div className="w-64 h-[1px] bg-white/20 relative overflow-hidden">
                <div 
                    className="absolute left-0 top-0 h-full bg-[#22C55E] transition-all duration-300 ease-out shadow-[0_0_10px_#22C55E]" 
                    style={{ width: `${loadProgress}%` }}
                />
            </div>
            <p className="text-white/30 text-[10px] mt-4 font-mono tracking-[0.3em] font-medium uppercase">
                Synchronizing Experience {loadProgress}%
            </p>
        </div>
      )}

      {/* Phase 2: Canvas pinned scrub - The core engine */}
      <FrameCanvas ref={canvasRef} />

      {/* Phase 3: UI reveal overlay - Controlled by ScrollTrigger progress */}
      <HeroOverlay isRevealed={overlayVisible} activeContentIndex={activeContentIndex} />
      
      {/* Static interaction indicator */}
      <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-700 font-medium text-[10px] tracking-widest text-white/40 uppercase pointer-events-none flex flex-col items-center gap-4 ${overlayVisible ? 'opacity-0' : 'opacity-100'}`}>
          SCROLL TO EXPLORE
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
      </div>

      {/* Dark overlay wipe after hero - Phase 4 transition */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent pointer-events-none z-[15]" />
    </section>
  );
};

export default HeroSection;
