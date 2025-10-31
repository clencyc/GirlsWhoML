'use client';
import { useState, useEffect } from 'react';
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

  // Generate colors only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setTileColors(generateRandomColors());
  }, []);

  const handleViewMore = () => {
    setShowMore(true);
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
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[623px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[0] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[623px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[1] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[623px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[2] : '#D3D3D3'}}></div>

      {/* tiles - Row 2 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1073px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[3] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1073px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[4] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1073px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[5] : '#D3D3D3'}}></div>

      {/* tiles - Row 3 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1523px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[6] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1523px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[7] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1523px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[8] : '#D3D3D3'}}></div>

      {/* tiles - Row 4 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1973px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[9] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1973px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[10] : '#D3D3D3'}}></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1973px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[11] : '#D3D3D3'}}></div>

      {/* Additional tiles - shown when "View more" is clicked */}
      {showMore && (
        <>
          {/* tiles - Row 5 */}
          <div className="absolute w-[400px] h-[400px] left-[80px] top-[2423px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[12] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[521px] top-[2423px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[13] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[961px] top-[2423px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[14] : '#D3D3D3'}}></div>

          {/* tiles - Row 6 */}
          <div className="absolute w-[400px] h-[400px] left-[80px] top-[2873px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[15] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[521px] top-[2873px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[16] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[961px] top-[2873px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[17] : '#D3D3D3'}}></div>

          {/* tiles - Row 7 */}
          <div className="absolute w-[400px] h-[400px] left-[80px] top-[3323px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[18] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[521px] top-[3323px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[19] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[961px] top-[3323px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[20] : '#D3D3D3'}}></div>

          {/* tiles - Row 8 */}
          <div className="absolute w-[400px] h-[400px] left-[80px] top-[3773px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[21] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[521px] top-[3773px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[22] : '#D3D3D3'}}></div>
          <div className="absolute w-[400px] h-[400px] left-[961px] top-[3773px] rounded-[20px]" style={{backgroundColor: isClient ? tileColors[23] : '#D3D3D3'}}></div>
        </>
      )}

      {/* viewMoreButton - exact Figma specs */}
      {!showMore && (
        <button
          onClick={handleViewMore}
          className="flex flex-col items-center p-0 gap-[4px] absolute w-[157px] h-[82px] left-[calc(50%-157px/2+0.5px)] top-[2492px] opacity-50 hover:opacity-75 transition-opacity cursor-pointer border-none outline-none bg-transparent"
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
