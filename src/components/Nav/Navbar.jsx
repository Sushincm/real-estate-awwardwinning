import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // ✅ Guard: only update state if value actually changed
      const next = window.scrollY > 20;
      setScrolled(prev => prev !== next ? next : prev);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', active: true },
    { label: 'About Us', active: false },
    { label: 'Property List', active: false },
    { label: 'Contact Us', active: false },
  ];

  return (
    <nav 
      id="navbar" 
      className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-5 lg:px-20 py-5 lg:py-10 transition-all duration-500 pointer-events-auto ${
        scrolled || isMenuOpen ? 'bg-black/80 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none border-b border-white/5 lg:border-none' : ''
      }`}
    >
      {/* Brand logo */}
      <div className="z-[110] pointer-events-auto group">
        <button className="text-[22px] lg:text-[28px] font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
            EverGreen
        </button>
      </div>
      
      {/* Centered nav pill - Desktop Only */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1.5 rounded-2xl pointer-events-auto border border-white/10 shadow-2xl transition-all duration-500 hover:bg-white/15">
        {navLinks.map((link) => (
          <button 
            key={link.label}
            className={`${
              link.active 
                ? 'bg-black text-white shadow-lg' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            } px-6 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 hover:scale-[1.05] active:scale-95`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right side controls - Desktop/Tablet */}
      <div className="hidden md:flex gap-4 lg:gap-6 items-center pointer-events-auto">
        <button className="flex items-center gap-2 text-white/90 text-sm font-semibold bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95">
          <Globe className="w-4 h-4 text-[#22C55E]" />
          <span>Eng</span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </button>
        <button className="bg-[#22C55E] text-white px-6 lg:px-8 h-[48px] lg:h-[54px] rounded-2xl text-[11px] lg:text-[12px] font-bold transition-all duration-500 hover:bg-white hover:text-black hover:scale-[1.05] active:scale-95 uppercase tracking-[0.2em] shadow-xl">
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden flex items-center gap-4 z-[110]">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-white transition-all duration-300 hover:bg-white/20 active:scale-90"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Full Screen List */}
      <div 
        className={`fixed inset-0 w-screen h-screen bg-[#0A0A0A] z-[100] lg:hidden flex flex-col pt-32 px-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8 w-full">
            <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em]">Navigation</span>
            <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                    <button 
                        key={link.label}
                        onClick={() => setIsMenuOpen(false)}
                        style={{ transitionDelay: `${i * 75}ms` }}
                        className={`text-4xl font-medium tracking-tighter text-left transition-all duration-700 ${
                            isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        } ${link.active ? 'text-[#22C55E]' : 'text-white hover:text-[#22C55E]'}`}
                    >
                        {link.label}
                        {link.active && <span className="ml-4 text-[13px] font-bold text-white/20 uppercase tracking-widest align-middle">Current</span>}
                    </button>
                ))}
            </div>
        </div>
        
        <div className={`mt-auto pb-12 flex flex-col gap-6 transition-all duration-700 delay-500 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            <div className="h-px w-full bg-white/10" />
            <div className="flex justify-between items-center">
                <button className="flex items-center gap-3 text-white font-medium">
                    <Globe className="w-5 h-5 text-[#22C55E]" />
                    <span>English (US)</span>
                </button>
                <ChevronDown className="w-5 h-5 text-white/30" />
            </div>
            <button className="w-full py-5 bg-[#22C55E] rounded-2xl text-white font-bold uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-transform">
                Sign Up Now
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

