import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <nav id="navbar" className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 lg:px-20 py-10 pointer-events-auto">
      {/* Brand logo as button */}
      <div className="pointer-events-auto group">
        <button className="text-[28px] font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
            EverGreen
        </button>
      </div>
      
      {/* Centered nav pill */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1.5 rounded-full pointer-events-auto border border-white/10 shadow-2xl">
        <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-300 hover:bg-[#22C55E] hover:scale-[1.05] active:scale-95 shadow-lg">Home</button>
        <button className="text-white/80 px-6 py-2 rounded-full text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95">About Us</button>
        <button className="text-white/80 px-6 py-2 rounded-full text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95">Property List</button>
        <button className="text-white/80 px-6 py-2 rounded-full text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95">Contact Us</button>
      </div>

      {/* Right side controls */}
      <div className="flex gap-6 items-center pointer-events-auto">
        <button className="flex items-center gap-2 text-white/90 text-sm font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95">
          <Globe className="w-4 h-4" />
          <span>Eng</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="bg-[#22C55E] text-white px-8 h-[54px] rounded-full text-[12px] font-bold transition-all duration-500 hover:bg-black hover:scale-[1.05] active:scale-95 uppercase tracking-[0.2em]">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
