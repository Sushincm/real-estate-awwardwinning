import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TOTAL_FRAMES, FRAME_CONTENT } from '../constants/frames';
import { ANIM_CONFIG } from '../constants/animation';

export const useScrollCanvas = (frames, isReady) => {
  const canvasRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const frameIndexRef = useRef(-1);

  useEffect(() => {
    if (!isReady || frames.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const drawFrame = (index) => {
      const img = frames[index];
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      // Object-fit: cover equivalent logic
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
    };

    // Initial draw
    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      // Ensure we draw frame 0 even if frameIndexRef is set to -1 for the scroll listener initialization bounds
      drawFrame(Math.max(0, frameIndexRef.current));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const st = ScrollTrigger.create({
      trigger: '#hero-reveal-container',
      start: 'top top',
      end: '+=300%', // Bound specifically to the virtual 300vh scroll zone, not the whole page!
      scrub: 1, // Smoothness
      onUpdate: (self) => {
        const progress = self.progress;
        const currentFrame = Math.floor(progress * (TOTAL_FRAMES - 1));
        
        // --- High-Performance Scroll-Synced Content Fading ---
        const contentEl = document.getElementById('hero-dynamic-content');
        if (contentEl) {
          const block = FRAME_CONTENT.find(c => currentFrame >= c.startFrame && currentFrame <= c.endFrame);
          if (block) {
            const fadeFrames = 12; // Adjusted threshold for a smooth fade transition
            let opacity = 1;
            let y = 0;

            if (currentFrame > block.endFrame - fadeFrames) {
              // Fade Out at the end of a block
              const localProgress = (currentFrame - (block.endFrame - fadeFrames)) / fadeFrames;
              opacity = 1 - localProgress;
              y = 20 * localProgress; // Moves down as it fades out
            } 
            else if (currentFrame < block.startFrame + fadeFrames) {
              // Fade In at the start of a block
              const localProgress = (currentFrame - block.startFrame) / fadeFrames;
              opacity = localProgress;
              y = -20 * (1 - localProgress); // Moves up as it fades in
            }

            // Direct DOM style mutation avoiding React render cycles for 60fps scrub
            contentEl.style.opacity = Math.max(0, Math.min(1, opacity));
            contentEl.style.transform = `translateY(${y}px)`;
          }
        }
        // -----------------------------------------------------

        if (currentFrame !== frameIndexRef.current) {
          frameIndexRef.current = currentFrame;
          requestAnimationFrame(() => drawFrame(currentFrame));

          const newActiveIndex = FRAME_CONTENT.findIndex(
            (c) => currentFrame >= c.startFrame && currentFrame <= c.endFrame
          );
          if (newActiveIndex !== -1) {
             setActiveContentIndex(prev => prev !== newActiveIndex ? newActiveIndex : prev);
          }
        }

        // Reveal UI near the end (phase 3)
        const isPastThreshold = progress >= ANIM_CONFIG.revealThreshold;
        setOverlayVisible((prev) => {
          if (prev !== isPastThreshold) return isPastThreshold;
          return prev;
        });
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isReady, frames]); // Added overlayVisible to deps? No, we use local state inside.

  return { canvasRef, overlayVisible, activeContentIndex };
};
