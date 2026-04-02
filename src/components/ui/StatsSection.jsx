import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const StatItem = ({ endValue, label, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const target = { val: 0 };
                const parsedValue = parseInt(endValue.replace(/,/g, ''));
                
                gsap.to(target, {
                    val: parsedValue,
                    duration: 2.5,
                    ease: "power2.out",
                    onUpdate: () => {
                        setCount(Math.floor(target.val));
                    }
                });
                observer.disconnect();
            }
        }, { threshold: 0.1 }); // More lenient threshold for mobile
        
        if (countRef.current) observer.observe(countRef.current);
        
        return () => observer.disconnect();
    }, [endValue]);

    return (
        <div ref={countRef} className="flex flex-col items-center lg:items-start text-center lg:text-left group w-full">
            <div className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-black tracking-tighter leading-none mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-500">
                {count.toLocaleString()}{suffix}
            </div>
            <p className="text-gray-400 font-bold text-[9px] md:text-[11px] tracking-[0.2em] uppercase max-w-[120px] lg:max-w-none">
                {label}
            </p>
        </div>
    );
};

const StatsSection = () => {
    return (
        <section className="bg-white pt-10 pb-20 md:pb-32 px-6 md:px-16 lg:px-24 rounded-b-[2rem] lg:rounded-none">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-8">
                
                {/* Mobile Grid Wrapper - Only for Mobile/Tablet */}
                <div className="grid grid-cols-2 lg:flex lg:flex-row items-center lg:items-start justify-between w-full gap-x-6 gap-y-12 lg:gap-8">
                    
                    <div className="reveal-up w-full lg:w-auto" style={{ transitionDelay: '100ms' }}>
                        <StatItem endValue="100" suffix="%" label="Satisfactions Clients" />
                    </div>
                    
                    <div className="hidden lg:block w-px h-20 bg-black/5 mt-2" />
                    
                    <div className="reveal-up w-full lg:w-auto" style={{ transitionDelay: '200ms' }}>
                        <StatItem endValue="500" suffix="+" label="Property sells" />
                    </div>
                    
                    <div className="hidden lg:block w-px h-20 bg-black/5 mt-2" />
                    
                    <div className="reveal-up w-full lg:w-auto" style={{ transitionDelay: '300ms' }}>
                        <StatItem endValue="150" suffix="+" label="Countries & Cities" />
                    </div>
                    
                    <div className="hidden lg:block w-px h-20 bg-black/5 mt-2" />
                    
                    <div className="reveal-up w-full lg:w-auto" style={{ transitionDelay: '400ms' }}>
                        <StatItem endValue="2000" suffix="+" label="Positive reviews" />
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default StatsSection;
