'use client';

import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerOpacity = 0.4 + Math.min(scrollY * 0.001, 0.3);
  const headerShadow = scrollY > 50 ? '0 10px 25px rgba(0,0,0,0.1)' : 'none';

  return (
    <>
      <header className="header-container">
        <div 
          className={`header-content ${isVisible ? 'visible' : ''}`}
          style={{
            backgroundColor: `rgba(255,255,255,${headerOpacity})`,
            boxShadow: headerShadow
          }}
        >
          {/* Logo */}
          <a href="/" className="logo-link">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="32" fill="#261033"/>
                <path d="M20 24L20 16L24 20L28 24L20 24Z" fill="#D89EFA"/>
                <rect width="8" height="8" transform="translate(20 24)" fill="#D89EFA"/>
                <rect width="8" height="8" transform="translate(20 32)" fill="#D89EFA"/>
                <rect width="8" height="8" transform="translate(28 32)" fill="#D89EFA"/>
                <path d="M36 40L36 32L40 36L44 40L36 40Z" fill="#D89EFA"/>
                <rect width="8" height="8" transform="translate(20 40)" fill="#D89EFA"/>
                <rect width="8" height="8" transform="translate(36 40)" fill="#D89EFA"/>
                <path d="M28 32L28 24L32 28L36 32L28 32Z" fill="#D89EFA"/>
                <rect width="8" height="8" transform="translate(36 24)" fill="#D89EFA"/>
              </svg>
            </div>
            <span className="logo-text">harangè</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <a href="/about-us" className="nav-link">
              About Us
            </a>
            <a href="/mosaic-of-voices" className="nav-link">
              Mosaic Of Voices
            </a>
            <a href="/contact" className="header-nav-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
              </svg>
              <span>Get Involved</span>
            </a>
          </nav>

          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <a 
              href="/about-us" 
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </a>
            <a 
              href="/mosaic-of-voices" 
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Mosaic of Voices
            </a>
            <a 
              href="/contact" 
              className="mobile-link-button"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
              </svg>
              Get Involved
            </a>
          </nav>
        </div>
      )}
    </>
  );
}