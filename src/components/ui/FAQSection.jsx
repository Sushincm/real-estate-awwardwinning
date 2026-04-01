import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const FAQItem = ({ question, answer, image, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                gsap.to(contentRef.current, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    onStart: () => setIsAnimating(true),
                    onComplete: () => setIsAnimating(false)
                });
            } else {
                gsap.to(contentRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.inOut',
                    onStart: () => setIsAnimating(true),
                    onComplete: () => setIsAnimating(false)
                });
            }
        }
    }, [isOpen]);

    return (
        <div className={`border border-gray-300 rounded-2xl overflow-hidden transition-all duration-700 ${isOpen ? 'bg-[#FAFAFA] border-gray-400 shadow-sm' : 'bg-white hover:bg-gray-50'}`}>
            <button 
                onClick={onClick}
                className="w-full px-6 lg:px-10 py-6 flex justify-between items-center text-left transition-colors duration-300 group"
            >
                <h3 className="text-[17px] lg:text-[19px] font-medium text-black tracking-tight leading-snug pr-8">
                    {question}
                </h3>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-black text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
                    <ChevronDown className="w-5 h-5 stroke-[1.5]" />
                </div>
            </button>
            <div 
                ref={contentRef} 
                className="overflow-hidden" 
                style={{ height: 0, opacity: 0 }}
            >
                <div className="px-6 lg:px-10 pb-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    <div className="flex-1">
                        <p className="text-gray-500 text-[17px] leading-relaxed font-medium">
                            {answer}
                        </p>
                    </div>
                    {image && (
                        <div className="w-full lg:w-[350px] shrink-0">
                            <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                                <img 
                                    src={image} 
                                    alt={question} 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: "What types of properties do you sell?",
            answer: "We specialize in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer's needs and preferences. We connect you with trusted lenders offering competitive mortgage options and financial advice. We arrange private showings for you to visit and evaluate properties before making a decision. Properties range across different price points, catering to various budgets and investment goals.",
            image: "/showcase/main.png"
        },
        {
            question: "How do I know if a property is a good investment?",
            answer: "Our experts guide you in making informed investment decisions based on market insights. We offer residential, commercial, and luxury properties tailored to different preferences and budgets. We analyze historical appreciation, rental yields, and neighborhood growth potential to ensure your investment has strong long-term value.",
            image: "/showcase/thumb.png"
        },
        {
            question: "Do I need to hire a real estate agent?",
            answer: "While not mandatory, having a professional agent can simplify the process significantly. Our team handles everything from market analysis and property searching to contract negotiations and closing paperwork, ensuring you get the best deal with minimal stress.",
            image: "/showcase/main.png"
        },
        {
            question: "What's the process for buying a property?",
            answer: "The process begins with getting pre-approved for financing, followed by identifying your criteria and searching for properties. Once you find a match, we'll help you make an offer, conduct inspections, and finalize the paperwork. We're here to guide you through every milestone until you have the keys in hand.",
            image: "/showcase/thumb.png"
        },
        {
            question: "Can I tour a property before purchasing?",
            answer: "Absolutely. We encourage private showings for all our clients. You can schedule on-site visits through our website or by contacting one of our agents. We also offer high-quality virtual tours for international buyers or those unable to visit in person.",
            image: "/showcase/main.png"
        }
    ];

    return (
        <section className="bg-white pt-20 pb-40 px-12 lg:px-24 reveal-up">
            <div className="max-w-7xl mx-auto flex flex-col gap-20">
                
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <h2 className="text-3xl lg:text-[3.5rem] font-medium text-black leading-[1.05] tracking-tight max-w-[550px]">
                        Frequently asked<br />questions
                    </h2>
                    <p className="text-gray-500 font-medium text-[17px] leading-relaxed max-w-[480px] lg:-mb-1">
                        Our experts guide you in making informed investment decisions based on market insights. We offer residential, commercial, and luxury properties tailored to different preferences and budgets.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-6">
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index} 
                            {...faq} 
                            isOpen={activeIndex === index}
                            onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
