'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function MosaicOfVoices() {
  // Color palette for tiles
  const colorPalette = [
    '#D89EFA', // Purple
    '#F6D55C', // Yellow
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Light Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Gold
    '#BB8FCE', // Lavender
    '#85C1E9', // Light Blue
    '#F8C471', // Orange
    '#82E0AA', // Light Green
    '#F1948A', // Salmon
    '#D2B4DE', // Light Purple
    '#AED6F1', // Sky Blue
    '#A9DFBF', // Pale Green
    '#F9E79F', // Cream
    '#FADBD8', // Pink
    '#000000', // Black
    '#2C3E50', // Dark Blue
    '#8E44AD', // Deep Purple
    '#E74C3C'  // Deep Red
  ];

  const generateRandomColors = () => {
    const colors = [];
    for (let i = 0; i < 24; i++) { // 24 tiles total (initial 12 + additional 12)
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors.push(randomColor);
    }
    return colors;
  };

  const [showMore, setShowMore] = useState(false);
  const [tileColors, setTileColors] = useState([]); // Start with empty array
  const [isClient, setIsClient] = useState(false);
  const [visibleTiles, setVisibleTiles] = useState(new Set());
  const [hoveredTile, setHoveredTile] = useState(null);
  const tileRefs = useRef({});

  // Generate colors only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setTileColors(generateRandomColors());
  }, []);

  // Intersection observer for tile animations
  useEffect(() => {
    const observers = new Map();

    const observerCallback = (entries, tileId) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleTiles(prev => new Set([...prev, tileId]));
        }
      });
    };

    // Create observers for each tile
    for (let i = 0; i < 24; i++) {
      const element = tileRefs.current[`tile-${i}`];
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => observerCallback(entries, `tile-${i}`),
          { threshold: 0.3, rootMargin: '50px' }
        );
        observer.observe(element);
        observers.set(`tile-${i}`, observer);
      }
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isClient]);

  const getTileClass = (tileId, baseClass = '') => {
    const isVisible = visibleTiles.has(tileId);
    return `${baseClass} transition-all duration-700 ease-out transform cursor-pointer ${
      isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95'
    } hover:scale-110 hover:shadow-2xl hover:z-10 active:scale-105`;
  };

  const handleViewMore = () => {
    setShowMore(true);
    // Trigger animations for new tiles immediately
    setTimeout(() => {
      for (let i = 12; i < 24; i++) {
        setVisibleTiles(prev => new Set([...prev, `tile-${i}`]));
      }
    }, 100);
  };

  return (
    <div className={`relative w-[1440px] bg-[#F5F3ED] ${showMore ? 'h-[5359px]' : 'h-[3509px]'}`}>
      <Header />

      {/* Mosaic of Voices heading - exact Figma specs */}
      <h1 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+0.5px)] top-[296px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] order-0" style={{fontWeight: 500}}>
        Mosaic of Voices
      </h1>

      {/* Description - exact Figma specs */}
      <p className="absolute w-[1281px] h-[78px] left-[calc(50%-1281px/2+0.5px)] top-[445px] font-['Inter'] text-[32px] leading-[39px] text-center tracking-[-0.04em] text-[#000000] order-1" style={{fontWeight: 500}}>
        Every 2×2 tile here was chosen by a visitor — a fragment of resonance, representing voices lifted from invisibility into shared reflection.
      </p>

      {/* tiles - Row 1 */}
      <div
        ref={el => tileRefs.current['tile-0'] = el}
        className={getTileClass('tile-0', "absolute w-[400px] h-[400px] left-[80px] top-[623px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[0] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-0')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-1'] = el}
        className={getTileClass('tile-1', "absolute w-[400px] h-[400px] left-[521px] top-[623px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[1] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-1')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-2'] = el}
        className={getTileClass('tile-2', "absolute w-[400px] h-[400px] left-[961px] top-[623px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[2] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-2')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>

      {/* tiles - Row 2 */}
      <div
        ref={el => tileRefs.current['tile-3'] = el}
        className={getTileClass('tile-3', "absolute w-[400px] h-[400px] left-[80px] top-[1073px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[3] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-3')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-4'] = el}
        className={getTileClass('tile-4', "absolute w-[400px] h-[400px] left-[521px] top-[1073px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[4] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-4')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-5'] = el}
        className={getTileClass('tile-5', "absolute w-[400px] h-[400px] left-[961px] top-[1073px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[5] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-5')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>

      {/* tiles - Row 3 */}
      <div
        ref={el => tileRefs.current['tile-6'] = el}
        className={getTileClass('tile-6', "absolute w-[400px] h-[400px] left-[80px] top-[1523px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[6] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-6')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-7'] = el}
        className={getTileClass('tile-7', "absolute w-[400px] h-[400px] left-[521px] top-[1523px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[7] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-7')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-8'] = el}
        className={getTileClass('tile-8', "absolute w-[400px] h-[400px] left-[961px] top-[1523px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[8] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-8')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>

      {/* tiles - Row 4 */}
      <div
        ref={el => tileRefs.current['tile-9'] = el}
        className={getTileClass('tile-9', "absolute w-[400px] h-[400px] left-[80px] top-[1973px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[9] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-9')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-10'] = el}
        className={getTileClass('tile-10', "absolute w-[400px] h-[400px] left-[521px] top-[1973px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[10] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-10')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>
      <div
        ref={el => tileRefs.current['tile-11'] = el}
        className={getTileClass('tile-11', "absolute w-[400px] h-[400px] left-[961px] top-[1973px] rounded-[20px]")}
        style={{backgroundColor: isClient ? tileColors[11] : '#D3D3D3'}}
        onMouseEnter={() => setHoveredTile('tile-11')}
        onMouseLeave={() => setHoveredTile(null)}
      ></div>

      {/* Additional tiles - shown when "View more" is clicked */}
      {showMore && (
        <>
          {/* tiles - Row 5 */}
          <div
            ref={el => tileRefs.current['tile-12'] = el}
            className={getTileClass('tile-12', "absolute w-[400px] h-[400px] left-[80px] top-[2423px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[12] : '#D3D3D3', animationDelay: '0ms'}}
            onMouseEnter={() => setHoveredTile('tile-12')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-13'] = el}
            className={getTileClass('tile-13', "absolute w-[400px] h-[400px] left-[521px] top-[2423px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[13] : '#D3D3D3', animationDelay: '100ms'}}
            onMouseEnter={() => setHoveredTile('tile-13')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-14'] = el}
            className={getTileClass('tile-14', "absolute w-[400px] h-[400px] left-[961px] top-[2423px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[14] : '#D3D3D3', animationDelay: '200ms'}}
            onMouseEnter={() => setHoveredTile('tile-14')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>

          {/* tiles - Row 6 */}
          <div
            ref={el => tileRefs.current['tile-15'] = el}
            className={getTileClass('tile-15', "absolute w-[400px] h-[400px] left-[80px] top-[2873px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[15] : '#D3D3D3', animationDelay: '300ms'}}
            onMouseEnter={() => setHoveredTile('tile-15')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-16'] = el}
            className={getTileClass('tile-16', "absolute w-[400px] h-[400px] left-[521px] top-[2873px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[16] : '#D3D3D3', animationDelay: '400ms'}}
            onMouseEnter={() => setHoveredTile('tile-16')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-17'] = el}
            className={getTileClass('tile-17', "absolute w-[400px] h-[400px] left-[961px] top-[2873px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[17] : '#D3D3D3', animationDelay: '500ms'}}
            onMouseEnter={() => setHoveredTile('tile-17')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>

          {/* tiles - Row 7 */}
          <div
            ref={el => tileRefs.current['tile-18'] = el}
            className={getTileClass('tile-18', "absolute w-[400px] h-[400px] left-[80px] top-[3323px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[18] : '#D3D3D3', animationDelay: '600ms'}}
            onMouseEnter={() => setHoveredTile('tile-18')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-19'] = el}
            className={getTileClass('tile-19', "absolute w-[400px] h-[400px] left-[521px] top-[3323px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[19] : '#D3D3D3', animationDelay: '700ms'}}
            onMouseEnter={() => setHoveredTile('tile-19')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-20'] = el}
            className={getTileClass('tile-20', "absolute w-[400px] h-[400px] left-[961px] top-[3323px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[20] : '#D3D3D3', animationDelay: '800ms'}}
            onMouseEnter={() => setHoveredTile('tile-20')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>

          {/* tiles - Row 8 */}
          <div
            ref={el => tileRefs.current['tile-21'] = el}
            className={getTileClass('tile-21', "absolute w-[400px] h-[400px] left-[80px] top-[3773px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[21] : '#D3D3D3', animationDelay: '900ms'}}
            onMouseEnter={() => setHoveredTile('tile-21')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-22'] = el}
            className={getTileClass('tile-22', "absolute w-[400px] h-[400px] left-[521px] top-[3773px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[22] : '#D3D3D3', animationDelay: '1000ms'}}
            onMouseEnter={() => setHoveredTile('tile-22')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
          <div
            ref={el => tileRefs.current['tile-23'] = el}
            className={getTileClass('tile-23', "absolute w-[400px] h-[400px] left-[961px] top-[3773px] rounded-[20px]")}
            style={{backgroundColor: isClient ? tileColors[23] : '#D3D3D3', animationDelay: '1100ms'}}
            onMouseEnter={() => setHoveredTile('tile-23')}
            onMouseLeave={() => setHoveredTile(null)}
          ></div>
        </>
      )}

      {/* viewMoreButton - exact Figma specs */}
      {!showMore && (
        <button
          onClick={handleViewMore}
          className="flex flex-col items-center p-0 gap-[4px] absolute w-[157px] h-[82px] left-[calc(50%-157px/2+0.5px)] top-[2492px] opacity-50 hover:opacity-75 transition-all duration-300 ease-out cursor-pointer border-none outline-none bg-transparent hover:scale-110 hover:translate-y-2"
        >
          <span className="w-[157px] h-[39px] font-['Inter'] text-[32px] leading-[39px] text-center tracking-[-0.02em] text-[#000000] order-0" style={{fontWeight: 500}}>
            View more
          </span>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="order-1">
            <path d="M10 15L20 25L30 15" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* footer */}
      <div className={`absolute w-[1441px] h-[781px] left-[-1px] ${showMore ? 'top-[4473px]' : 'top-[2728px]'}`}>
        <Footer />
      </div>
    </div>
  );
}
