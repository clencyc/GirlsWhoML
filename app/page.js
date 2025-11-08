'use client';
import { useState, useEffect, useRef } from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import TestimonialSlider from './components/home/TestimonialSlider';
import './Home.css';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = new Map();

    const observerCallback = (entries, sectionId) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, sectionId]));
        }
      });
    };

    ['hero', 'live-badge', 'description', 'change1', 'change2', 'change3', 'cta', 'testimonials'].forEach(sectionId => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => observerCallback(entries, sectionId),
          { threshold: 0.1, rootMargin: '50px' }
        );
        observer.observe(element);
        observers.set(sectionId, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionClass = (sectionId) => {
    const isVisible = visibleSections.has(sectionId);
    return isVisible ? 'visible' : '';
  };

  return (
    <div className="home-page">
      <Header />

      {/* Hero Section */}
      <section className="home-hero-section">
        <div 
          ref={el => sectionRefs.current['hero'] = el} 
          className={`hero-content ${getSectionClass('hero')}`}
        >
          {/* Heading */}
          <div className="hero-text">
            <h1 className="hero-title">
              An Ecosystem to enable gender parity in ML and AI
            </h1>
            <p className="hero-subtitle">
              GirlsWhoML x Mozilla Festival 2025
            </p>
          </div>

          {/* CTA Button */}
          <a href="./mosaic-of-voices" className="hero-cta-button">
            <span>Explore Collective Gallery</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M21 12L14 5M21 12L14 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Live Badge */}
          <div 
            ref={el => sectionRefs.current['live-badge'] = el}
            className={`live-badge ${getSectionClass('live-badge')}`}
          >
            <div className="live-indicator"></div>
            <span>LIVE</span>
          </div>

          {/* Image Rectangle */}
          <div 
            className="hero-image"
            style={{ transform: `translateY(${scrollY * -0.02}px)` }}
          ></div>

          {/* Description */}
          <div 
            ref={el => sectionRefs.current['description'] = el}
            className={`hero-description ${getSectionClass('description')}`}
          >
            <div className="description-paragraph">
              On November 7th, 2025, GirlsWhoML and Oeuvre unveiled "Below the Surface",
              an installation that transforms a quiet gesture into an act of visibility.
            </div>
            <div className="description-paragraph">
              Visitors tap on our NFC chips, and each touch reveals faces and voices of real 
              women whose presence in technology is too often unseen, creating a shared act 
              of recognition and emergence.
            </div>
          </div>
        </div>
      </section>

      {/* Change Section */}
      <section className="home-change-section">
        <h2 className="change-section-title">
          The Change We're Making
        </h2>

        {/* Change 1 */}
        <div 
          ref={el => sectionRefs.current['change1'] = el}
          className={`change-item change-1 ${getSectionClass('change1')}`}
        >
          <div className="change-text">
            <h3 className="change-title">
              Below the Surface —<br />
              Lifting Women in AI Out<br />
              of Invisibility
            </h3>
            <p className="change-description">
              Millions of women perform the foundational work of AI — labelling, tagging, and cleaning the data
              that trains our models. Many earn only $2–4 an hour for this invisible labour. We set out to speak
              with these women, yet even we, in trying to make them visible, found many beyond reach. Among the
              submerged faces we could gather, we placed empty frames — reminders that invisibility extends
              deeper than we imagined.
            </p>
          </div>
          <div className="change-image">
            <img src="/images/home/img1.png" alt="Below the Surface illustration" />
          </div>
        </div>

        {/* Change 2 */}
        <div 
          ref={el => sectionRefs.current['change2'] = el}
          className={`change-item change-2 ${getSectionClass('change2')}`}
        >
          <div className="change-image">
            <img src="/images/home/img2.png" alt="Tiles of reflection illustration" />
          </div>
          <div className="change-text">
            <h3 className="change-title">
              Tiles of Reflection — Let Women's Voices Be Heard
            </h3>
            <p className="change-description">
              Through our survey, we collected more than 200 reflections from women working across AI — their words revealing resilience, isolation, and hope. Each response became one of 24 digital tiles within the installation, glowing softly as visitors engaged. Guests were invited to select up to four tiles that resonated with them most — a simple act that amplified these women's voices. In doing so, the installation turned listening into participation, and participation into recognition.
            </p>
            <a href="/mosaic-of-voices" className="change-button">
              <span>See their stories</span>
            </a>
          </div>
        </div>

        {/* Change 3 */}
        <div 
          ref={el => sectionRefs.current['change3'] = el}
          className={`change-item change-3 ${getSectionClass('change3')}`}
        >
          <div className="change-text">
            <h3 className="change-title">
              Two Reflective Questions — Your Reflections Matter
            </h3>
            <div className="change-description">
              <p>
                At the end of the experience, visitors encountered two open questions:
              </p>
              <ol>
                <li>What word best describes how you feel after exploring this installation?</li>
                <li>What is one insight or reflection you'll take away with you?</li>
              </ol>
              <p>
                We expect to engage around more than 1,000 visitors and receive 100+ reflections. Together, these responses form a living archive of empathy and awareness — the first of its kind to document how people feel when confronted with the gendered invisibility embedded in AI.
              </p>
              <p>
                It is both a mirror and a measure of change, reminding us that visibility is not given — it is created, collectively.
              </p>
            </div>
          </div>

          {/* Reflection Form */}
          <div className="reflection-form">
            <div className="reflection-question q1">
              <span>Q1. What word best describe...</span>
            </div>
            <div className="reflection-question q2">
              <span>Q2. What is one insight or...</span>
            </div>
            <div className="reflection-textarea-container">
              <textarea 
                className="reflection-textarea"
                placeholder="This experience gave me the confidence to pursue AI, something I never imagined possible..."
              />
            </div>
            <div className="reflection-submit">
              <button className="submit-button">
                <span>Send your reflection</span>
              </button>
              <div className="cursor-arrow">
                <svg width="51" height="58" viewBox="0 0 66 58" fill="none">
                  <path d="M1.06783 5.71928C0.456195 2.30615 4.18041 -0.215276 7.12227 1.62023L48.1239 27.2018C51.0939 29.0549 50.4188 33.5601 47.036 34.4612L30.3342 38.9098C29.0279 39.2579 27.8771 40.0369 27.0689 41.1206L16.7363 54.975C14.6434 57.7813 10.2097 56.7349 9.59207 53.2891L1.06783 5.71928Z" fill="#D89EFA" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div 
          ref={el => sectionRefs.current['cta'] = el}
          className={`cta-card ${getSectionClass('cta')}`}
        >
          <h2 className="cta-title">
            Support the Next Generation<br />of Women in AI
          </h2>
          <p className="cta-description">
            Your donation helps us reach our goal of introducing 100,000 women and non-binary individuals to machine learning through free education, mentorship, and real-world opportunities.
          </p>
          <a href="/contact" className="cta-button">
            <span>Support the Future</span>
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={el => sectionRefs.current['testimonials'] = el}
        className={`home-testimonials-section ${getSectionClass('testimonials')}`}
      >
        <h2 className="testimonials-title">
          Voices & Reflections: Women Shaping AI
        </h2>
        <div className="testimonials-slider">
          <TestimonialSlider />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}