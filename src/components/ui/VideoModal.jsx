import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ" }) => {
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

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef} 
      className="fixed inset-0 z-[100] hidden items-center justify-center p-4 lg:p-10"
    >
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      />

      {/* Content Container - Expanded to full view width as requested */}
      <div 
        ref={contentRef}
        className="relative w-[95vw] lg:w-[90vw] max-w-[1400px] aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20 group"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
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
