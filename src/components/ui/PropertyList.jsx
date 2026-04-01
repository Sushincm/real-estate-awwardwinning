import React from 'react';
import { ArrowRight, Bed, Bath, MapPin } from 'lucide-react';

const PropertyCard = ({ image, name, price, address, beds, baths }) => {
    return (
        <div className="flex flex-col gap-6 group cursor-pointer will-change-transform">
            {/* Robust Image Container - Solving border-radius glitch with transform-gpu and mask-image */}
            <div 
                className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] transform-gpu isolate backface-hidden"
                style={{ maskImage: 'radial-gradient(white, black)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
            >
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 will-change-transform transform-gpu" 
                />
                <div className="absolute top-6 left-6">
                    <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black tracking-[0.1em] text-black shadow-md uppercase">FOR SALE</span>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 px-2">
                <div className="flex items-center gap-4 text-gray-500 font-medium text-[13px] tracking-wide">
                    <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 stroke-[1.5]" />
                        <span>{beds} Bedrooms</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 stroke-[1.5]" />
                        <span>{baths} Bathroom</span>
                    </div>
                </div>

                <h3 className="text-[28px] font-medium text-black leading-tight tracking-tight group-hover:text-[#22C55E] transition-colors">{name}</h3>
                
                <div className="flex items-center gap-3 text-[15px] font-semibold text-black">
                    <span>{price}</span>
                    <div className="w-1.5 h-1.5 bg-black/10 rounded-full" />
                    <span className="text-gray-400 font-medium text-[14px]">{address}</span>
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
        <section className="bg-white pt-10 pb-32 px-12 lg:px-24 rounded-t-[5rem] lg:rounded-t-[7rem] relative z-30 -mt-20">
            <div className="max-w-7xl mx-auto flex flex-col gap-24">
                
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
                    <div className="flex flex-col gap-6 max-w-[700px]">
                        <h2 className="text-3xl lg:text-[3.5rem] font-medium text-black leading-[1.05] tracking-tight">
                            Explore our premier houses
                        </h2>
                        <p className="text-gray-500 font-medium text-[17px] leading-relaxed">
                            Each listing offers unique features, exceptional quality, and prime locations, ensuring an exclusive living experience.
                        </p>
                    </div>
                    
                    <button className="h-[54px] px-10 bg-black text-white rounded-full font-bold text-[12px] tracking-[0.2em] uppercase flex items-center gap-4 transition-all duration-500 hover:bg-[#22C55E] hover:scale-105 active:scale-95 group">
                        See All Properties
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                    {properties.map((prop, index) => (
                        <div key={index}>
                            <PropertyCard {...prop} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PropertyList;
