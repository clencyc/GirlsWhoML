export default function Header() {
  return (
    <header className="absolute w-[1440px] h-[156px] left-[calc(50%-1440px/2)] top-0">
      <div className="absolute w-[808px] h-[88px] left-[calc(50%-808px/2)] top-[38px] flex items-center justify-between px-8 py-4 gap-[36px] bg-white/40 backdrop-blur-sm border border-black/10 rounded-[100px]">
        {/* Logo - Frame 155 */}
        <a href="/" className="flex items-center gap-2">
          {/* Favicon 32x32 */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
            <circle cx="16" cy="16" r="16" fill="#261033"/>
            <rect x="10" y="8" width="4" height="4" fill="#D89EFA"/>
            <rect x="10" y="12" width="4" height="4" fill="#D89EFA"/>
            <rect x="10" y="16" width="4" height="4" fill="#D89EFA"/>
            <rect x="14" y="16" width="4" height="4" fill="#D89EFA"/>
            <rect x="18" y="16" width="4" height="4" fill="#D89EFA"/>
            <rect x="10" y="20" width="4" height="4" fill="#D89EFA"/>
            <rect x="18" y="20" width="4" height="4" fill="#D89EFA"/>
            <rect x="14" y="12" width="4" height="4" fill="#D89EFA"/>
            <rect x="18" y="12" width="4" height="4" fill="#D89EFA"/>
          </svg>
          <span className="font-alata text-[40px] leading-5 -tracking-[0.05em] text-[#261033]">harangè</span>
        </a>

        {/* Navigation */}
        <nav className="flex items-center">
          {/* About Us */}
          <a href="/about-us" className="font-medium text-[20px] leading-6 -tracking-[0.02em] capitalize text-[#3A3A3A] hover:text-primary transition-colors mr-[80px]">
            About us
          </a>

          {/* Mosaic of Voices */}
          <a href="/mosaic-of-voices" className="font-medium text-[20px] leading-6 -tracking-[0.02em] capitalize text-[#3A3A3A] hover:text-primary transition-colors mr-[40px]">
            Mosaic of Voices
          </a>

          {/* Get Involved */}
          <a href="/contact" className="flex items-center justify-center gap-2 px-5 py-4 bg-white border border-black/10 rounded-[100px] hover:bg-gray-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="font-medium text-[20px] leading-6 -tracking-[0.02em] text-black">
              Get Involved
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
