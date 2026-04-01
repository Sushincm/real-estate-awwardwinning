import { useState, useEffect } from 'react';
import { TOTAL_FRAMES, FRAME_PATH, FRAME_EXTENSION } from '../constants/frames';

export const useFramePreloader = () => {
  const [frames, setFrames] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const frameArray = [];

    const preloadFrames = async () => {
      const promises = [];
      
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const index = (i + 1).toString().padStart(3, '0');
        const img = new Image();
        
        const promise = new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Frame ${index} failed to load at ${FRAME_PATH}${index}${FRAME_EXTENSION}. Using fallback.`);
            // Create a placeholder if frame fails (e.g. while user is setting up assets)
            const canvas = document.createElement('canvas');
            canvas.width = 1920;
            canvas.height = 1080;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = `hsl(${i * 4}, 70%, 40%)`;
            ctx.fillRect(0, 0, 1920, 1080);
            ctx.fillStyle = 'white';
            ctx.font = '48px serif';
            ctx.fillText(`Frame ${index} (Placeholder)`, 100, 100);
            img.src = canvas.toDataURL();
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve();
          };
          
          // NOTE: For Vite, assets in public/ are served from root.
          // If the user puts frames in public/frames/, this path will work.
          img.src = `${FRAME_PATH}${index}${FRAME_EXTENSION}`;
          frameArray[i] = img;
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setFrames(frameArray);
      // Small delay to ensure smooth transition from loader
      setTimeout(() => setIsReady(true), 500);
    };

    preloadFrames();
  }, []);

  return { frames, isReady, loadProgress };
};
