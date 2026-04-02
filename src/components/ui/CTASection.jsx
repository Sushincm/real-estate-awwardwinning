import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    return (
        <section 
            className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden rounded-t-[2.2rem] lg:rounded-t-[3rem] -mt-16 z-50 flex items-center justify-center text-center px-6 md:px-8"
        >
            {/* Native Parallax Background */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
                style={{ 
                    backgroundImage: 'url(/showcase/main.webp)',
                }}
            >
                {/* REFINED READABILITY TINT (REDUCED OPACITY) */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-10">
                <div className="flex flex-col gap-5 md:gap-6 reveal-up text-center items-center">
                    <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                        Ready to Make Your<br className="hidden md:block" />Dream Property a Reality?
                    </h2>
                    <p className="text-white/80 text-[15px] md:text-[17px] font-medium max-w-[280px] md:max-w-lg mx-auto leading-relaxed drop-shadow-md">
                        Explore a curated selection of properties that align with your vision and goals.
                    </p>
                </div>

                <div className="reveal-up stagger-delay-2">
                    <button className="bg-white text-black h-[54px] px-10 rounded-2xl font-bold text-[12px] tracking-[0.2em] uppercase flex items-center gap-4 transition-all duration-500 hover:bg-[#22C55E] hover:text-white hover:scale-105 active:scale-95 group shadow-2xl">
                        Get Started
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
