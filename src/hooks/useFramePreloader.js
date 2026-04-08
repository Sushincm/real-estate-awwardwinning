import { useState, useEffect } from 'react';
import { TOTAL_FRAMES, FRAME_PATH, FRAME_EXTENSION } from '../constants/frames';

const CRITICAL_THRESHOLD = 5; 

export const useFramePreloader = () => {
  const [frames, setFrames] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const frameArray = new Array(TOTAL_FRAMES).fill(null);
    let criticalLoadedCount = 0;
    let readyTriggered = false;

    const startBackgroundLoading = () => {
      if (isCancelled) return;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
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
        
        const handleComplete = () => {
          if (isCancelled) return;
          criticalLoadedCount++;
          const progress = Math.round((criticalLoadedCount / CRITICAL_THRESHOLD) * 100);
          setLoadProgress(progress);

          if (criticalLoadedCount >= CRITICAL_THRESHOLD && !readyTriggered) {
            readyTriggered = true;
            setFrames([...frameArray]);
            
            requestAnimationFrame(() => {
                if (isCancelled) return;
                setIsReady(true);
                startBackgroundLoading();
            });
          }
        };

        img.onload = handleComplete;
        img.onerror = () => {
          console.error(`Failed to load critical frame: ${index}`);
          handleComplete(); // Continue even on error to prevent freezing
        };
        
        img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
        frameArray[i] = img;
      }
    };

    preloadInitialBatch();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { frames, isReady, loadProgress };
};
