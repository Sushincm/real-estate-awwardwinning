import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, videoUrl = "https://www.youtube.com/embed/bL_vL_W0Y-k" }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Entry animation
      const tl = gsap.timeline();
      tl.set(modalRef.current, { display: 'flex' })
        .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo(contentRef.current, 
          { scale: 0.8, opacity: 0, y: 50 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 
          '-=0.3'
        );
    } else {
      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
        }
      });
      tl.to(contentRef.current, { scale: 0.8, opacity: 0, y: 50, duration: 0.4, ease: 'power2.in' })
        .to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
    }
  }, [isOpen]);

  // ✅ Always render so GSAP can animate both entry AND exit correctly.
  // GSAP uses display:'flex'/'none' internally — the `hidden` class is the default
  // resting state before the first open animation runs.
  return (
    <div 
      ref={modalRef} 
      className="fixed inset-0 z-[9999] hidden items-center justify-center p-8 lg:p-20"
    >
      {/* Backdrop - 100% Fit Screen Cinema Tint */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Content Container - Centered with more space around it */}
      <div 
        ref={contentRef}
        className="relative w-[85vw] max-w-[1100px] aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.15)] z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20 group"
        >
          <X className="w-8 h-8 group-hover:rotate-90 transition-transform" />
        </button>

        <iframe 
          className="w-full h-full"
          src={videoUrl}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;
