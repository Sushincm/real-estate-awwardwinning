import { useState, useEffect, useCallback } from 'react';
import { TOTAL_FRAMES, FRAME_PATH, FRAME_EXTENSION } from '../constants/frames';

const CRITICAL_THRESHOLD = 5; 

export const useFramePreloader = () => {
  const [frames, setFrames] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize array with nulls once
    const frameArray = new Array(TOTAL_FRAMES).fill(null);
    let criticalLoadedCount = 0;
    let readyTriggered = false;

    const startBackgroundLoading = () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        // Skip already created objects from initial batch
        if (frameArray[i]) continue;

        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
        frameArray[i] = img;
      }
      setFrames([...frameArray]);
    };

    const preloadInitialBatch = () => {
      for (let i = 0; i < CRITICAL_THRESHOLD; i++) {
        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => {
          criticalLoadedCount++;
          const progress = Math.round((criticalLoadedCount / CRITICAL_THRESHOLD) * 100);
          setLoadProgress(progress);

          if (criticalLoadedCount === CRITICAL_THRESHOLD && !readyTriggered) {
            readyTriggered = true;
            // Immediate state update for critical frames
            setFrames([...frameArray]);
            
            // Minimal delay to ensure React commits the frame update before setting isReady
            requestAnimationFrame(() => {
                setIsReady(true);
                startBackgroundLoading();
            });
          }
        };

        img.onerror = () => {
          console.error(`Failed to load critical frame: ${index}`);
          criticalLoadedCount++;
          if (criticalLoadedCount === CRITICAL_THRESHOLD && !readyTriggered) {
            readyTriggered = true;
            setFrames([...frameArray]);
            setIsReady(true);
            startBackgroundLoading();
          }
        };
        
        img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
        frameArray[i] = img;
      }
    };

    preloadInitialBatch();

    return () => {};
  }, []);

  return { frames, isReady, loadProgress };
};
