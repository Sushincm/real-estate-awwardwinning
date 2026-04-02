import { useState, useEffect } from 'react';
import { TOTAL_FRAMES, FRAME_PATH, FRAME_EXTENSION } from '../constants/frames';

const CRITICAL_THRESHOLD = 30; // Just enough for the first 1 second of animation (Felt as 'Instant' start)

export const useFramePreloader = () => {
  const [frames, setFrames] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frameArray = new Array(TOTAL_FRAMES).fill(null);
    let criticalLoadedCount = 0;
    let readyTriggered = false;

    // Helper to start loading the rest of the frames in the background
    const startBackgroundLoading = () => {
      for (let i = CRITICAL_THRESHOLD; i < TOTAL_FRAMES; i++) {
        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
        frameArray[i] = img;
      }
    };

    const preloadPhaseOne = () => {
      for (let i = 0; i < CRITICAL_THRESHOLD; i++) {
        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        
        img.onload = () => {
          criticalLoadedCount++;
          // High-precision progress for the first batch
          setLoadProgress(Math.round((criticalLoadedCount / CRITICAL_THRESHOLD) * 100));

          if (criticalLoadedCount === CRITICAL_THRESHOLD && !readyTriggered) {
            readyTriggered = true;
            // Site is ready! Reveal now.
            setTimeout(() => {
              setIsReady(true);
              // Start the heavy background load ONLY AFTER the site is visible
              startBackgroundLoading();
            }, 200);
          }
        };

        img.onerror = () => {
          console.warn(`Critical frame ${index} failed.`);
          criticalLoadedCount++;
        };
        
        img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
        frameArray[i] = img;
      }
      
      setFrames(frameArray);
    };

    preloadPhaseOne();

    return () => {};
  }, []);

  return { frames, isReady, loadProgress };
};
