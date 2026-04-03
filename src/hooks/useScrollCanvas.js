import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TOTAL_FRAMES, FRAME_CONTENT } from '../constants/frames';
import { ANIM_CONFIG } from '../constants/animation';

export const useScrollCanvas = (frames, isReady) => {
  const canvasRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  
  // Start with 0 to ensure initial draw happens
  const frameIndexRef = useRef(0);
  const overlayVisibleRef = useRef(false);
  const framesRef = useRef(frames);
  const drawFrameRef = useRef(null);

  // Keep framesRef in sync
  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);

  useEffect(() => {
    if (!isReady || !frames || frames.length === 0) return;

    // Use GSAP context for better cleanup
    let ctx_gsap = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false }); // Performance optimization

      const drawFrame = (index) => {
        const currentFrames = framesRef.current;
        if (!currentFrames || currentFrames.length === 0) return;

        const safeIndex = Math.max(0, Math.min(index, TOTAL_FRAMES - 1));
        const img = currentFrames[safeIndex];
        
        if (!img) return;

        if (!img.complete) {
           img.onload = () => {
             if (safeIndex === frameIndexRef.current) {
                 drawFrame(safeIndex);
             }
           };
           return;
        }

        const cw = canvas.width;
        const ch = canvas.height;
        if (cw === 0 || ch === 0) return;

        const iw = img.naturalWidth || 1920;
        const ih = img.naturalHeight || 1080;

        const scale = Math.max(cw / iw, ch / ih);
        const sw = iw * scale;
        const sh = ih * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;

        ctx.drawImage(img, sx, sy, sw, sh);
      };

      drawFrameRef.current = drawFrame;

      const handleResize = () => {
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        drawFrame(frameIndexRef.current);
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      const st = ScrollTrigger.create({
        trigger: '#hero-reveal-container',
        start: 'top top',
        end: () => "+=" + (window.innerHeight * 3),
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentFrame = Math.floor(progress * (TOTAL_FRAMES - 1));
          
          // Content Fading Logic
          const contentEl = document.getElementById('hero-dynamic-content');
          if (contentEl) {
            const block = FRAME_CONTENT.find(c => currentFrame >= c.startFrame && currentFrame <= c.endFrame);
            const isLastBlock = block && block.endFrame === FRAME_CONTENT[FRAME_CONTENT.length - 1].endFrame;
            
            if (block) {
              const fadeFrames = 8;
              let opacity = 1;
              let y = 0;

              if (currentFrame > block.endFrame - fadeFrames && !isLastBlock) {
                const localProgress = (currentFrame - (block.endFrame - fadeFrames)) / fadeFrames;
                opacity = 1 - localProgress;
                y = 20 * localProgress;
              } 
              else if (currentFrame < block.startFrame + fadeFrames) {
                const localProgress = (currentFrame - block.startFrame) / fadeFrames;
                opacity = localProgress;
                y = -20 * (1 - localProgress);
              }

              contentEl.style.opacity = Math.max(0, Math.min(1, opacity));
              contentEl.style.transform = `translateY(${y}px)`;
            }
          }

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

          const isPastThreshold = progress >= ANIM_CONFIG.revealThreshold;
          if (overlayVisibleRef.current !== isPastThreshold) {
            overlayVisibleRef.current = isPastThreshold;
            setOverlayVisible(isPastThreshold);
          }
        }
      });

      // Recalculate everything after a small tick to ensure DOM is settled
      ScrollTrigger.refresh();
      
      // Force initial update to sync state with scroll position
      st.update();
    });

    return () => {
      ctx_gsap.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [isReady]);

  // Fallback redraw handler
  useEffect(() => {
    if (drawFrameRef.current) {
      drawFrameRef.current(frameIndexRef.current);
    }
  }, [frames]);

  return { canvasRef, overlayVisible, activeContentIndex };
};
