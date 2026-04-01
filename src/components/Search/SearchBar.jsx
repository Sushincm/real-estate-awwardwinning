import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, DollarSign, Home, BedDouble } from 'lucide-react';
import { SEARCH_OPTIONS, FILTERS } from '../../constants/data';

const SearchBar = () => {
  const [activeFilter, setActiveFilter] = useState('House');
  const [openDropdown, setOpenDropdown] = useState(null); // null, 'price', 'location', 'rooms'
  const [selections, setSelections] = useState({
    price: 'Price Range',
    location: 'Location',
    rooms: 'Number of rooms'
  });

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (name, value) => {
    setSelections(prev => ({ ...prev, [name]: value }));
    setOpenDropdown(null);
  };

  return (
    <div id="search-bar" ref={dropdownRef} className="bg-white rounded-[2.5rem] shadow-[0_45px_100px_-15px_rgba(0,0,0,0.1)] p-10 lg:p-14 flex flex-col gap-10">
      {/* Title */}
      <h2 className="text-3xl lg:text-[3.5rem] font-medium text-black leading-[1.05] tracking-tight">Find the best place</h2>
      
      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Looking for - Real Input */}
        <div className="flex flex-col gap-3 group px-1">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] group-focus-within:text-black transition-colors">Looking for</label>
          <div className="bg-[#F3F4F6] px-6 py-[1.125rem] rounded-2xl flex items-center border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all duration-300">
            <input 
                type="text" 
                placeholder="Enter type" 
                className="bg-transparent border-none outline-none text-black text-[14.5px] font-medium w-full placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Custom Dropdowns */}
        {[
          { id: 'price', label: 'Price', value: selections.price, icon: DollarSign, options: SEARCH_OPTIONS.prices },
          { id: 'location', label: 'Locations', value: selections.location, icon: MapPin, options: SEARCH_OPTIONS.locations },
          { id: 'rooms', label: 'Number of rooms', value: selections.rooms, icon: BedDouble, options: SEARCH_OPTIONS.rooms },
        ].map((field) => (
          <div key={field.id} className="flex flex-col gap-3 relative">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">{field.label}</label>
            <button 
                onClick={() => toggleDropdown(field.id)}
                className={`bg-[#F3F4F6] px-6 py-5 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-all duration-300 active:scale-[0.98] outline-none hover:shadow-sm ${openDropdown === field.id ? 'ring-2 ring-black/5 bg-white' : ''}`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-black text-[14.5px] font-medium">{field.value}</span>
                </div>
                <ChevronDown className={`w-4 h-4 stroke-[2.5] text-gray-400 transition-transform ${openDropdown === field.id ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === field.id && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {field.options.map((opt) => (
                    <button 
                        key={opt}
                        onClick={() => handleSelect(field.id, opt)}
                        className="w-full text-left px-6 py-3 text-[14px] font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                        {opt}
                    </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Row: Filters and CTA */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-2 gap-6">
        <div className="flex items-center gap-5">
          <span className="text-[11px] font-bold text-black uppercase tracking-[0.2em]">Filter:</span>
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 border rounded-full text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-300 active:scale-[0.95] ${
                    activeFilter === f 
                    ? 'bg-black text-white border-black shadow-lg shadow-black/10' 
                    : 'border-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full md:w-auto h-[54px] bg-[#22C55E] text-white px-10 rounded-full font-bold text-[12px] tracking-[0.2em] uppercase hover:bg-black hover:scale-[1.05] transition-all duration-500 active:scale-[0.97]">
          Search Properties
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
