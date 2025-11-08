'use client';

import { useState, useEffect, useRef } from 'react';
import './TestimonialSlider.css';

const testimonials = [
  {
    quote: "\"It was a transformative experience collaborating with women from over 20+ countries, amplifying their stories and experiences with AI and ML, and creating much-needed representation in the emerging tech space.\"",
    name: "Samina",
    location: "India"
  },
  {
    quote: "\"The project was an enriching journey - from crowdfunding the installation to connecting with brilliant minds and leading workshops. It deepened my understanding of the gaps and misrepresentation in tech and reinforced how essential inclusivity is when designing AI systems.\"",
    name: "Fatima",
    location: "Pakistan"
  },
  {
    quote: "\"\"Eye-opening\" is the word. It's my first time working with such a big, diverse team! I still remember thinking, \"Wow, I'm really part of something global,\" when seeing BSTs, EATs, and ISTs on our tech meeting times. It's eye-opening too to realize that behind AI's dazzling front are women often least recognized in the system. We hope Harange can help change that.\"",
    name: "Yanni",
    location: "China"
  },
  {
    quote: "\"It highlighted the persistent gaps and misrepresentations in technology, emphasising the critical role of inclusive design in AI systems.\"",
    name: "Chae",
    location: "South Korea"
  },
  {
    quote: "\"It underscored the ongoing disparities and inaccuracies within technological development, stressing the essential importance of equity and inclusivity in AI design.\"",
    name: "Megha",
    location: "India"
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const sliderRef = useRef(null);

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

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, testimonials.length - visibleCount)
    );
  };

  const getVisibleTestimonials = () => {
    return testimonials.slice(currentIndex, currentIndex + visibleCount);
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="testimonial-slider-wrapper">
      <div
        ref={sliderRef}
        className={`testimonial-slider ${isVisible ? 'visible' : ''}`}
      >
        {visibleTestimonials.map((testimonial, idx) => (
          <div
            key={`${testimonial.name}-${idx}`}
            className="testimonial-card"
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <p className="testimonial-quote">
              {testimonial.quote}
            </p>
            <p className="testimonial-author">
              <span className="author-name">{testimonial.name}</span>
              <span className="author-location">, {testimonial.location}</span>
            </p>
          </div>
        ))}
      </div>

      <div className={`testimonial-navigation ${isVisible ? 'visible' : ''}`}>
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`nav-button ${currentIndex === 0 ? 'disabled' : ''}`}
          aria-label="Previous testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L11 6M5 12L11 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex >= testimonials.length - visibleCount}
          className={`nav-button ${currentIndex >= testimonials.length - visibleCount ? 'disabled' : ''}`}
          aria-label="Next testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}