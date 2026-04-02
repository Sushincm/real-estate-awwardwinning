import { useState, useEffect } from 'react';
import { TOTAL_FRAMES, FRAME_PATH, FRAME_EXTENSION } from '../constants/frames';

const CRITICAL_THRESHOLD = 5; 

export const useFramePreloader = () => {
  const [frames, setFrames] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frameArray = new Array(TOTAL_FRAMES).fill(null);
    let criticalLoadedCount = 0;
    let readyTriggered = false;

    const startBackgroundLoading = () => {
      for (let i = CRITICAL_THRESHOLD; i < TOTAL_FRAMES; i++) {
        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
        frameArray[i] = img;
      }
      // One final refresh after background loading starts
      setFrames([...frameArray]);
    };

    const preloadInitialBatch = () => {
      for (let i = 0; i < CRITICAL_THRESHOLD; i++) {
        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        
        img.onload = () => {
          criticalLoadedCount++;
          setLoadProgress(Math.round((criticalLoadedCount / CRITICAL_THRESHOLD) * 100));

          if (criticalLoadedCount === CRITICAL_THRESHOLD && !readyTriggered) {
            readyTriggered = true;
            // SET THE FRAMES HERE - Use spread operator to force React to see the change
            setFrames([...frameArray]);
            
            setTimeout(() => {
              setIsReady(true);
              startBackgroundLoading();
            }, 600);
          }
        };

        img.onerror = () => {
          criticalLoadedCount++;
          if (criticalLoadedCount === CRITICAL_THRESHOLD && !readyTriggered) {
            readyTriggered = true;
            setFrames([...frameArray]);
            setIsReady(true);
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
