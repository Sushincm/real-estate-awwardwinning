import React from 'react';
import { ArrowRight, MapPin, Home as HomeIcon } from 'lucide-react';

const MapSection = () => {
    return (
        <section className="bg-[#F2F2F2] pt-10 pb-20 md:pb-32 px-6 md:px-16 lg:px-24 rounded-t-[2.5rem] lg:rounded-t-[3rem] relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 lg:gap-32 items-center">
                
                {/* Left side: Integrated Google Map */}
                <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl group border border-black/5 bg-gray-200 reveal-up">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                        className="w-full h-full grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-700" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Property Locations"
                    />
                </div>

                {/* Right side: Content */}
                <div className="flex flex-col gap-6 md:gap-8 reveal-up" style={{ transitionDelay: '200ms' }}>
                    <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-black leading-[1.1] md:leading-[1.05] tracking-tight">
                        Discover Properties with the Best Value
                    </h2>
                    <p className="text-gray-500 font-medium text-[15px] md:text-[17px] leading-relaxed max-w-[500px]">
                        From minimalist interiors to compact solutions, small spaces inspire big ideas, proving that you don't need much room to create your sanctuary.
                    </p>
                    <div className="pt-2 md:pt-4 lg:pt-6">
                        <button className="w-full sm:w-auto bg-black text-white h-[50px] md:h-[54px] px-10 rounded-2xl font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all duration-500 hover:bg-[#22C55E] hover:scale-105 active:scale-95 group shadow-xl">
                            Find Nearest Properties
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MapSection;
