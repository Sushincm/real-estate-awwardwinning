import { useState, useEffect } from 'react';
import { TOTAL_FRAMES, FRAME_PATH, FRAME_EXTENSION } from '../constants/frames';

const CRITICAL_THRESHOLD = 60; // Load only first 60 frames before showing site (faster mobile starts)

export const useFramePreloader = () => {
  const [frames, setFrames] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    let criticalLoadedCount = 0;
    const frameArray = [];
    let readyTriggered = false;

    const preloadFrames = () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        
        // Critical frames logic
        const isCritical = i < CRITICAL_THRESHOLD;

        img.onload = () => {
          loadedCount++;
          if (isCritical) {
            criticalLoadedCount++;
            // Update progress based on critical frames (0-100%)
            const progress = Math.min(100, Math.round((criticalLoadedCount / CRITICAL_THRESHOLD) * 100));
            setLoadProgress(progress);

            // Once first 60 frames are in, let's open the curtain!
            if (criticalLoadedCount === CRITICAL_THRESHOLD && !readyTriggered) {
              readyTriggered = true;
              setTimeout(() => setIsReady(true), 300);
            }
          }
        };

        img.onerror = () => {
          console.warn(`Frame ${index} failed at ${FRAME_PATH}${index}${FRAME_EXTENSION}.`);
          if (isCritical) criticalLoadedCount++;
          loadedCount++;
        };
        
        img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
        frameArray[i] = img;
      }
      
      // Set frames immediately so they are available in the hook even if still loading
      setFrames(frameArray);
    };

    preloadFrames();

    return () => {
      // Memory cleanup: nullify refs if needed, though browser handles Image GC well
    };
  }, []);

  return { frames, isReady, loadProgress };
};
