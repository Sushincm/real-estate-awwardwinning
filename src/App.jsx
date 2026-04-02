import HeroSection from './components/Hero/HeroSection';
import SearchBar from './components/Search/SearchBar';
import PropertyShowcase from './components/Hero/PropertyShowcase';
import StatsSection from './components/ui/StatsSection';
import MapSection from './components/ui/MapSection';
import PropertyList from './components/ui/PropertyList';
import FAQSection from './components/ui/FAQSection';
import TestimonialV2 from './components/ui/testimonial-v2';
import CTASection from './components/ui/CTASection';
import Footer from './components/ui/Footer';
import VideoModal from './components/ui/VideoModal';
import ScrollToTop from './components/ui/ScrollToTop';
import SmoothScroll from './components/ui/SmoothScroll';
import { useEffect, useState } from 'react';

function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Global Image Preloading and Reveal System
  useEffect(() => {
    const imagesToPreload = [
      '/showcase/main.webp',
      '/showcase/thumb.webp'
    ];

    imagesToPreload.forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
    });

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-mask');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <SmoothScroll>
      <main className="w-full bg-white min-h-screen">
        {/* SECTION 01: Hero Foundation (Cards Base) */}
        <div id="hero-reveal-container" className="relative">
          <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
            <HeroSection />
          </div>
          
          {/* Virtual Scroll Distance for scrub */}
          <div className="h-[300vh] pointer-events-none" />

          {/* THE CONTENT BODY */}
          <div id="content-body" className="relative z-30 bg-white shadow-[-20px_0_100px_rgba(0,0,0,0.3)] rounded-t-[2.5rem] lg:rounded-t-[3rem]">
            
            {/* SECTION 02: Search Card */}
            <section id="search-section" className="py-20 md:py-32 lg:py-40 px-6 md:px-20 reveal-up">
                <div className="max-w-7xl mx-auto">
                    <SearchBar />
                </div>
            </section>

            {/* SECTION 03: Property Showcase Carousel */}
            <div className="reveal-up bg-white">
                <PropertyShowcase onPlayVideo={() => setIsVideoOpen(true)} />
            </div>

            {/* SECTION 04: Key Metrics */}
            <div className="reveal-up bg-white">
               <StatsSection />
            </div>

            {/* SECTION 05: Map Explorer */}
            <div className="reveal-up">
               <MapSection />
            </div>

            {/* SECTION 06: Premier Properties Grid */}
            <div className="reveal-up bg-white">
               <PropertyList />
            </div>

            {/* SECTION 07: Frequently Asked Questions */}
            <div className="reveal-up bg-white">
               <FAQSection />
            </div>

            {/* SECTION 08: Scrolling Testimonials (Dark Section Reveal) */}
            <div className="reveal-up relative z-40">
               <TestimonialV2 />
            </div>

            {/* SECTION 09: Call To Action (Background Parallax Reveal) */}
            <div className="reveal-up">
               <CTASection />
            </div>

            {/* SECTION 10: Footer */}
            <Footer />

            {/* Global UI Overlays */}
            <ScrollToTop />
            <VideoModal 
                isOpen={isVideoOpen} 
                onClose={() => setIsVideoOpen(false)} 
                videoUrl="https://www.youtube.com/embed/bL_vL_W0Y-k"
            />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
