'use client';

import { useState } from 'react';

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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
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
      <div className="flex flex-row items-center p-0 gap-[40px] absolute w-[1637px] h-[465px] left-[80px] top-[514px] overflow-hidden">
        {visibleTestimonials.map((testimonial, idx) => (
          <div
            key={`${testimonial.name}-${idx}`}
            className="flex flex-col justify-between items-start p-[40px_32px] w-[519px] h-[465px] bg-[#FFFFFF] rounded-[20px] flex-none transition-all duration-500"
          >
            <p className="font-['Inter'] italic text-[24px] leading-[32px] tracking-[-0.02em] text-[#000000]" style={{fontWeight: 500}}>
              {testimonial.quote}
            </p>
            <p className="font-['Inter'] text-[28px] leading-[34px] tracking-[-0.02em] text-[#000000] w-full">
              <span className="italic" style={{fontWeight: 700}}>{testimonial.name}</span>
              <span className="italic" style={{fontWeight: 500}}>, {testimonial.location}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex flex-row items-center gap-[16px] absolute left-[80px] top-[1043px]">
        {/* Left arrow */}
        <button
          onClick={goToPrevious}
          className="w-[64px] h-[64px] rounded-full border border-[#666666] flex items-center justify-center bg-[#FFFFFF] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* Right arrow */}
        <button
          onClick={goToNext}
          className="w-[64px] h-[64px] rounded-full border border-[#000000] flex items-center justify-center bg-[#FFFFFF] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
}
