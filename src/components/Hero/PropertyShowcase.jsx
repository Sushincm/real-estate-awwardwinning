import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Play, ExternalLink } from 'lucide-react';
import VideoModal from '../ui/VideoModal';

// Import Swiper styles
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/navigation.css';
import '../../../node_modules/swiper/modules/pagination.css';
import '../../../node_modules/swiper/modules/effect-fade.css';

const PropertyShowcase = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    
    return (
        <section className="bg-white pt-0 pb-20 px-10 lg:px-20 overflow-hidden font-sans relative">
            {/* Section Identifier */}
            {/* SECTION 03: SHOWCASE */}

            {/* Header Row (Refined for better baseline alignment) */}
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">

                <h2 className="text-3xl lg:text-[3.5rem] font-medium text-black leading-[1.05] tracking-tight max-w-[800px]">
                    Your primary home might begin to feel left out.
                </h2>
                
                {/* Right Video Content */}
                <div className="flex flex-col gap-6 lg:items-end">
                    <div 
                        onClick={() => setIsVideoOpen(true)}
                        className="relative w-40 h-24 rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer transition-transform hover:scale-105 active:scale-95 isolate transform-gpu backface-hidden"
                        style={{ maskImage: 'radial-gradient(white, black)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                    >
                        <img src="/showcase/thumb.png" alt="thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-black text-black ml-1" />
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-400 text-[17px] font-medium leading-relaxed max-w-[280px] lg:text-right border-r-2 border-[#22C55E]/20 pr-6">
                        Watch our cinematic tour of premium listings across Manhattan and Brooklyn.
                    </p>
                </div>
            </div>

            {/* Swiper JS Carousel Container */}
            <div className="relative group">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    speed={1000}
                    spaceBetween={30}
                    slidesPerView={1.1}
                    breakpoints={{
                        1024: { slidesPerView: 1.15, spaceBetween: 60 }
                    }}
                    navigation={{
                        nextEl: '.swiper-btn-next',
                        prevEl: '.swiper-btn-prev',
                    }}
                    className="rounded-[5rem] !overflow-visible"
                >

                    {[1, 2].map((slideIndex) => (
                        <SwiperSlide key={slideIndex}>
                            <div className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
                                {/* Left: Internal Image Carousel */}
                                <div className="col-span-12 lg:col-span-7">
                                    <div className="relative aspect-[16/10] rounded-[5rem] overflow-hidden shadow-2xl group/img border border-black/5 bg-gray-50">
                                        <Swiper
                                            modules={[Pagination, EffectFade]}
                                            effect="fade"
                                            pagination={{ clickable: true, el: `.pagination-${slideIndex}` }}
                                            className="w-full h-full"
                                        >
                                            {[1, 2, 3].map((imgIndex) => (
                                                <SwiperSlide key={imgIndex}>
                                                    <div className="w-full h-full overflow-hidden reveal-mask">
                                                        <img 
                                                            src={`/showcase/main.png`} 
                                                            alt={`Property ${imgIndex}`} 
                                                            className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover/img:scale-110 image-reveal-scale" 
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        
                                        {/* Minimalist Pagination (Absolute Bottom) */}
                                        <div className={`pagination-${slideIndex} absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10 transition-opacity opacity-0 group-hover/img:opacity-100`} />

                                        {/* Overlay Labels */}
                                        <div className="absolute top-10 left-10 flex gap-3 z-10">
                                            <span className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.1em] text-black shadow-lg uppercase">NEW LISTING</span>
                                        </div>

                                        {/* Explore Features Button - Now inside the image */}
                                        <div className="absolute bottom-10 right-10 z-20">
                                            <button className="bg-[#22C55E] text-white h-[54px] px-8 rounded-full text-[11px] font-bold tracking-[0.2em] flex items-center gap-3 transition-all duration-700 hover:bg-black hover:scale-105 active:scale-95 group/btn whitespace-nowrap uppercase">
                                                EXPLORE FEATURES
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content Column */}
                                <div className="col-span-12 lg:col-span-5 flex flex-col gap-10">
                                    {/* Feature Text Card */}
                                    {/* Sidebar Text Column (Leaner) */}
                                    <div className="flex-1 bg-[#F9F9F9] rounded-[5rem] p-12 lg:p-14 flex flex-col justify-between items-start shadow-sm border border-black/[0.03]">
                                        <div className="flex flex-col gap-8">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
                                                <ExternalLink className="w-6 h-6 text-black" />
                                            </div>
                                            <div className="flex flex-col gap-5">
                                                <h3 className="text-[38px] lg:text-[42px] font-medium text-gray-900 leading-[1.05] tracking-tight">
                                                    Big things can happen in small spaces.
                                                </h3>
                                                <p className="text-gray-500 font-medium text-[17px] leading-relaxed max-w-[380px]">
                                                    With thoughtful design and smart organization, you can maximize every inch of your urban sanctuary.
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-black text-[11px] font-bold tracking-[0.3em] uppercase border-b-2 border-black/10 pb-1.5 hover:border-[#22C55E] hover:text-[#22C55E] transition-all hover:translate-x-1 duration-500">
                                            VIEW DETAILS
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Buttons (Footer Aligned) */}
                <div className="flex justify-between items-center mt-12 px-4">
                    <div className="flex items-center gap-8">
                        <div className="flex gap-4">
                            <button className="swiper-btn-prev w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#22C55E] hover:text-white hover:border-[#22C55E] transition-all active:scale-90">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button className="swiper-btn-next w-14 h-14 rounded-full border border-[#22C55E]/50 flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-white transition-all active:scale-90 shadow-lg">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-400 font-medium text-[14px] hidden lg:block">
                            Drag to navigate or use buttons to explore listings.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <span className="text-black/20 text-[11px] font-bold tracking-widest">GALLERY // 01-08</span>
                        <div className="w-40 h-px bg-black/10 hidden lg:block" />
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <VideoModal 
                isOpen={isVideoOpen} 
                onClose={() => setIsVideoOpen(false)} 
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            />
        </section>
    );
};

export default PropertyShowcase;


// Trigger re-render to resolve swiper import
