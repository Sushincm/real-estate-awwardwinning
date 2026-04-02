import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "EverGreen helped us find our dream home in Manhattan. The process was seamless and the cinematic tours they provided were a complete game changer for us.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Manhattan Homeowner",
  },
  {
    text: "As an international investor, I appreciate the deep market insights and the curated selection of premium properties. They made cross-border buying effortless.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "Global Property Investor",
  },
  {
    text: "The attention to detail in their listings is unmatched. We found a villa in Austin that exceeded all our expectations, thanks to their expert guidance.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Austin Homeowner",
  },
  {
    text: "Their team understands luxury. From the first consultation to the final closing, every step was handled with the utmost professionalism and care.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "Portfolio Manager",
  },
  {
    text: "Finding a modern sanctuary in a busy city is tough, but EverGreen made it look easy. We are absolutely in love with our new urban apartment.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Tech Executive",
  },
  {
    text: "The smooth implementation of our property search exceeded expectations. They understood our lifestyle needs and found the perfect match in weeks.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Business Owner",
  },
  {
    text: "Our family's living experience improved significantly after moving into the house EverGreen recommended. Truly a five-star service.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Creative Director",
  },
  {
    text: "They delivered a residential solution that exceeded expectations. They truly understand what 'Quiet Luxury' means in today's market.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Interior Designer",
  },
  {
    text: "Using their platform, our property search was focused and efficient. We secured a prime location listing before it even hit the public market.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Real Estate Attorney",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <ul
        style={{
          animation: `vertical-scroll-${props.duration} ${props.duration}s linear infinite`,
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0 transform-gpu"
      >
        <style>
          {`
            @keyframes vertical-scroll-${props.duration} {
              from { transform: translateY(0); }
              to { transform: translateY(-50%); }
            }
          `}
        </style>
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-6 md:p-10 rounded-2xl border border-white/5 shadow-2xl max-w-xs w-full bg-neutral-900/50 backdrop-blur-md transition-all duration-300 cursor-default select-none focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-neutral-400 leading-relaxed font-medium m-0 transition-colors duration-300">
                      "{text}"
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-[#22C55E]/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-neutral-500 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </ul>
    </div>
  );
};

const TestimonialV2 = () => {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-black py-20 md:py-32 lg:py-40 relative overflow-hidden rounded-t-[2.2rem] lg:rounded-t-[3rem] -mt-16 z-40"
    >
      {/* Background Mesh Gradient for Dark Mode Premium Feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-[#22C55E]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[140px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-6 md:px-12 lg:px-24 z-10 mx-auto relative"
      >
        <div className="flex flex-col items-center justify-center max-w-[700px] mx-auto mb-12 md:mb-20">
          <h2 id="testimonials-heading" className="text-3xl md:text-[4rem] font-medium tracking-tight text-center text-white leading-tight">
            What our homeowners<br className="hidden md:block" />have to say
          </h2>
          <p className="text-center mt-6 md:mt-8 text-neutral-400 text-[15px] md:text-lg leading-relaxed max-w-lg transition-colors font-medium">
            Discover why thousands of homeowners trust EverGreen to find their perfect sanctuary and investment properties.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[800px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialV2;
