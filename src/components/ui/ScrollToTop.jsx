import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-10 right-10 z-[9999] pointer-events-none">
            <button
                onClick={scrollToTop}
                className={`
                    w-11 h-11 bg-black text-white rounded-2xl 
                    flex items-center justify-center shadow-2xl 
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    pointer-events-auto hover:bg-[#22C55E] hover:scale-110 active:scale-90
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-1" />
            </button>
        </div>
    );
};

export default ScrollToTop;
