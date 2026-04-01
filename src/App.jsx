import HeroSection from './components/Hero/HeroSection';
import SearchBar from './components/Search/SearchBar';
import PropertyShowcase from './components/Hero/PropertyShowcase';
import StatsSection from './components/ui/StatsSection';
import MapSection from './components/ui/MapSection';
import PropertyList from './components/ui/PropertyList';
import FAQSection from './components/ui/FAQSection';
import ScrollToTop from './components/ui/ScrollToTop';
import SmoothScroll from './components/ui/SmoothScroll';
import { useEffect } from 'react';

function App() {
  // Global Image Preloading System
  useEffect(() => {
    const imagesToPreload = [
      '/showcase/main.png',
      '/showcase/thumb.png'
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
        {/* We use a large trigger wrapper to provide the scrub distance */}
        <div id="hero-reveal-container" className="relative">
          {/* The Sticky Base - This stays fixed while scrub completes */}
          <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
            <HeroSection />
          </div>
          
          {/* Virtual Scroll Distance (Matches useScrollCanvas scrub distance) */}
          <div className="h-[300vh] pointer-events-none" />

          {/* THE CONTENT BODY - This entire block slides over the Hero AFTER frames complete */}
          <div className="relative z-30 bg-white shadow-[-20px_0_100px_rgba(0,0,0,0.3)] rounded-t-[5rem] lg:rounded-t-[7rem]">
            
            {/* SECTION 02: Search Card (Starts stacking AFTER hero scrub) */}
            <section id="search-section" className="py-40 px-8 lg:px-20 reveal-up">
                <div className="max-w-7xl mx-auto">
                    <SearchBar />
                </div>
            </section>

            {/* SECTION 03: Property Showcase Carousel (Already has white bg) */}
            <div className="reveal-up bg-white">
                <PropertyShowcase />
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

            {/* Global UI Overlays */}
            <ScrollToTop />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
