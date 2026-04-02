import React from 'react';

const Footer = () => {
    const leftLinks = ['Home', 'About', 'Properties', 'Services'];
    const rightLinks = ['Gallery', 'FAQ', 'Pricing', 'Contact'];

    return (
        <footer className="bg-[#F8F8F8] pt-20 pb-12 md:pt-32 md:pb-16 px-6 md:px-16 lg:px-24 -mt-16 relative z-50 overflow-hidden border-t border-black/10">
            <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-24">
                
                {/* Top Section: Heading and Contact Info */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:items-center reveal-up">
                    <h2 className="text-3xl md:text-5xl lg:text-[4.5rem] font-medium text-black leading-[1.1] md:leading-[1.05] tracking-tight max-w-[800px]">
                        Discover Nature's <span className="text-gray-400 font-light">Wonders</span><br className="hidden md:block" />With Expert Guidance
                    </h2>
                    
                    <div className="flex flex-col gap-4 text-left lg:text-right items-start lg:items-end reveal-up stagger-delay-1">
                        <p className="text-neutral-600 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-[240px]">
                            789 Luxe Boulevard, Diamond Heights, New York 10012.
                        </p>
                        <p className="text-black text-xl md:text-2xl font-bold tracking-tight">
                            (+1) 234-567-8901
                        </p>
                    </div>
                </div>

                {/* Middle Section: Navigation Bar (Enhanced Border Visibility) */}
                <div className="py-10 md:py-12 border-y border-black/20 flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-12 reveal-up stagger-delay-2">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-10">
                        {leftLinks.map((link) => (
                            <a 
                                key={link} 
                                href="#" 
                                className="text-[11px] md:text-[13px] font-bold tracking-[0.1em] text-neutral-600 uppercase hover:text-black transition-all duration-300 relative group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="text-xl md:text-2xl font-black tracking-tighter text-black uppercase order-first lg:order-none">
                        EverGreen
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-10">
                        {rightLinks.map((link) => (
                            <a 
                                key={link} 
                                href="#" 
                                className="text-[11px] md:text-[13px] font-bold tracking-[0.1em] text-neutral-600 uppercase hover:text-black transition-all duration-300 relative group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Copyright and Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 reveal-up stagger-delay-3">
                    <p className="text-neutral-400 text-[12px] md:text-[13px] font-medium text-center md:text-left">
                        © 2026 EverGreen. All rights reserved.
                    </p>
                    
                    <div className="flex gap-6 md:gap-8">
                        <a href="#" className="text-neutral-400 text-[12px] md:text-[13px] font-medium hover:text-black transition-colors">Terms & Conditions</a>
                        <span className="text-neutral-200">|</span>
                        <a href="#" className="text-neutral-400 text-[12px] md:text-[13px] font-medium hover:text-black transition-colors">Privacy Policy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
