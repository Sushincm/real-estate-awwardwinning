import React from 'react';
import { ArrowRight, Bed, Bath, MapPin } from 'lucide-react';

const PropertyCard = ({ image, name, price, address, beds, baths }) => {
    return (
        <div className="flex flex-col gap-5 md:gap-6 group cursor-pointer will-change-transform">
            {/* Robust Image Container - Solving border-radius glitch with transform-gpu and mask-image */}
            <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] transform-gpu isolate backface-hidden"
                style={{ maskImage: 'radial-gradient(white, black)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
            >
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 will-change-transform transform-gpu" 
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <span className="bg-white/95 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black tracking-[0.1em] text-black shadow-md uppercase">FOR SALE</span>
                </div>
            </div>
            
            <div className="flex flex-col gap-3 md:gap-4 px-1 md:px-2">
                <div className="flex items-center gap-3 md:gap-4 text-gray-500 font-medium text-[12px] md:text-[13px] tracking-wide">
                    <div className="flex items-center gap-2">
                        <Bed className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.5]" />
                        <span>{beds} Bedrooms</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-2">
                        <Bath className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.5]" />
                        <span>{baths} Bathroom</span>
                    </div>
                </div>

                <h3 className="text-xl md:text-[28px] font-medium text-black leading-tight tracking-tight group-hover:text-[#22C55E] transition-colors line-clamp-1">{name}</h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-[14px] md:text-[15px] font-semibold text-black">
                    <span className="text-[#22C55E] sm:text-black">{price}</span>
                    <div className="hidden sm:block w-1.5 h-1.5 bg-black/10 rounded-full" />
                    <span className="text-gray-400 font-medium text-[13px] md:text-[14px] opacity-80">{address}</span>
                </div>
            </div>
        </div>
    );
};

const PropertyList = () => {
    const properties = [
        { image: '/showcase/main.png', name: 'The Pinnacle at Highland Park', price: '$3,567,980.00', address: '123 Maple Street, New York', beds: 5, baths: 2 },
        { image: '/showcase/thumb.png', name: 'The Pinnacle at Highland Park', price: '$2,490,899.99', address: '789 Forest Lane, Denver, CO', beds: 5, baths: 2 },
        { image: '/showcase/main.png', name: 'The Pinnacle at Highland Park', price: '$4,567,450.00', address: '123 Serenity Drive, Austin, TX', beds: 5, baths: 2 },
        { image: '/showcase/thumb.png', name: 'The Pinnacle at Highland Park', price: '$3,567,980.00', address: '123 Maple Street, New York', beds: 5, baths: 2 },
        { image: '/showcase/main.png', name: 'The Pinnacle at Highland Park', price: '$2,490,899.99', address: '789 Forest Lane, Denver, CO', beds: 5, baths: 2 },
        { image: '/showcase/thumb.png', name: 'The Pinnacle at Highland Park', price: '$4,567,450.00', address: '123 Serenity Drive, Austin, TX', beds: 5, baths: 2 },
    ];

    return (
        <section className="bg-white pt-10 pb-20 md:pb-32 px-6 md:px-16 lg:px-24 rounded-t-[2.5rem] lg:rounded-t-[3rem] relative z-30 -mt-16">
            <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-24">
                
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-10">
                    <div className="flex flex-col gap-5 md:gap-6 max-w-[700px]">
                        <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-black leading-[1.1] md:leading-[1.05] tracking-tight">
                            Explore our premier houses
                        </h2>
                        <p className="text-gray-500 font-medium text-[15px] md:text-[17px] leading-relaxed max-w-[600px]">
                            Each listing offers unique features, exceptional quality, and prime locations, ensuring an exclusive living experience.
                        </p>
                    </div>
                    
                    <button className="w-full md:w-auto h-[50px] md:h-[54px] px-8 md:px-10 bg-black text-white rounded-2xl font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all duration-500 hover:bg-[#22C55E] hover:scale-105 active:scale-95 group shadow-xl">
                        See All Properties
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-16 md:gap-y-20">
                    {properties.map((prop, index) => (
                        <div key={index} className="reveal-up" style={{ transitionDelay: `${index * 100}ms` }}>
                            <PropertyCard {...prop} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PropertyList;
