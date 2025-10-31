'use client';

import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "\"It was a transformative experience collaborating with women from over 20+ countries, amplifying their stories and experiences with AI and ML, and creating much-needed representation in the emerging tech space.\"",
    name: "Samina",
    location: "India"
  },
  {
    quote: "\"The project was an enriching journey - from crowdfunding the installation to connecting with brilliant minds and leading workshops. It deepened my understanding of the gaps and misrepresentation in tech and reinforced how essential inclusivity is when designing AI systems\"",
    name: "Fatima",
    location: "Pakistan"
  },
  {
    quote: "\"Eye-opening\" is the word. It's my first time working with such a big, diverse team! I still remember thinking, \"Wow, I'm really part of something global,\" when seeing BSTs, EATs, and ISTs on our tech meeting times. It's eye-opening too to realize that behind AI's dazzling front are women often least recognized in the system. We hope Harang can help change that.",
    name: "Yanni",
    location: "China"
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <>
      {/* reflectionSlider */}
      <div
        ref={sliderRef}
        className={`flex flex-row items-center p-0 gap-[40px] absolute w-[1637px] h-[465px] left-[80px] top-[514px] overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {visibleTestimonials.map((testimonial, idx) => (
          <div
            key={`${testimonial.name}-${idx}`}
            className="flex flex-col justify-between items-start p-[40px_32px] w-[519px] h-[465px] bg-[#FFFFFF] rounded-[20px] flex-none transition-all duration-700 ease-out hover:shadow-xl hover:scale-105 hover:-translate-y-2 cursor-pointer group"
            style={{animationDelay: `${idx * 200}ms`}}
          >
            <p className="font-['Inter'] italic text-[24px] leading-[32px] tracking-[-0.02em] text-[#000000] transition-all duration-300 ease-out group-hover:text-[#261033]" style={{fontWeight: 500}}>
              {testimonial.quote}
            </p>
            <p className="font-['Inter'] text-[28px] leading-[34px] tracking-[-0.02em] text-[#000000] w-full transition-all duration-300 ease-out group-hover:text-[#261033]">
              <span className="italic transition-all duration-300 ease-out group-hover:text-[#D89EFA]" style={{fontWeight: 700}}>{testimonial.name}</span>
              <span className="italic" style={{fontWeight: 500}}>, {testimonial.location}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div
        className={`flex flex-row items-center gap-[16px] absolute left-[80px] top-[1043px] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{animationDelay: '600ms'}}
      >
        {/* Left arrow */}
        <button
          onClick={goToPrevious}
          className="w-[64px] h-[64px] rounded-full border border-[#666666] flex items-center justify-center bg-[#FFFFFF] hover:bg-[#D89EFA] hover:border-[#D89EFA] transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg active:scale-95 cursor-pointer group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-300 ease-out group-hover:-translate-x-1">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-all duration-300 ease-out"/>
          </svg>
        </button>
        {/* Right arrow */}
        <button
          onClick={goToNext}
          className="w-[64px] h-[64px] rounded-full border border-[#000000] flex items-center justify-center bg-[#FFFFFF] hover:bg-[#D89EFA] hover:border-[#D89EFA] transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg active:scale-95 cursor-pointer group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-300 ease-out group-hover:translate-x-1">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-all duration-300 ease-out"/>
          </svg>
        </button>

        {/* Progress indicators */}
        <div className="flex gap-[8px] ml-[32px]">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-[12px] h-[12px] rounded-full transition-all duration-300 ease-out hover:scale-125 ${
                index === currentIndex
                  ? 'bg-[#D89EFA] shadow-lg'
                  : 'bg-[#CCCCCC] hover:bg-[#999999]'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
