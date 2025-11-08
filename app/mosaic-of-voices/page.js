'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import './mosaicOfVoices.css';

export default function MosaicOfVoices() {
  // Color palette for tiles
  const colorPalette = [
    '#D89EFA', '#F6D55C', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#D2B4DE', '#AED6F1', '#A9DFBF',
    '#F9E79F', '#FADBD8', '#000000', '#2C3E50', '#8E44AD', '#E74C3C'
  ];

  const generateRandomColors = () => {
    const colors = [];
    for (let i = 0; i < 12; i++) {
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors.push(randomColor);
    }
    return colors;
  };

  const [tileColors, setTileColors] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [visibleTiles, setVisibleTiles] = useState(new Set());
  const [hoveredTile, setHoveredTile] = useState(null);
  const tileRefs = useRef({});

  // Generate colors only on client side
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
    for (let i = 0; i < 12; i++) {
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

  const getTileClass = (tileId) => {
    const isVisible = visibleTiles.has(tileId);
    return `mosaic-tile ${isVisible ? 'visible' : ''}`;
  };

  // Grid positions for tiles (3 columns × 4 rows)
  const tilePositions = [
    // Row 1
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    // Row 2
    { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
    // Row 3
    { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
    // Row 4
    { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 }
  ];

  return (
    <div className="mosaic-page">
      <Header />

      <div className="mosaic-content">
        {/* Title */}
        <h1 className="mosaic-title">
          Mosaic of Voices
        </h1>

        {/* Description */}
        <p className="mosaic-description">
          Every 2×2 tile here was chosen by a visitor — a fragment of resonance, representing
          voices lifted from invisibility into shared reflection.
        </p>

        {/* Tiles Grid */}
        <div className="mosaic-grid">
          {tilePositions.map((pos, index) => (
            <div
            key={`tile-${index}`}
            ref={(el) => (tileRefs.current[`tile-${index}`] = el)}
            className={getTileClass(`tile-${index}`)}
            style={{
              backgroundColor: isClient ? tileColors[index] : '#D3D3D3',
            }}
            onMouseEnter={() => setHoveredTile(`tile-${index}`)}
            onMouseLeave={() => setHoveredTile(null)}
          />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}