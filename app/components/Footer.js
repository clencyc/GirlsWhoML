export default function Footer() {
  return (
    <footer className="w-full h-[781px] bg-[#393939] relative">
      {/* Empowering women in ML and AI */}
      <h2 className="absolute w-[706px] h-[174px] left-[calc(50%-706px/2-288.5px)] top-[102px] font-medium text-[72px] leading-[87px] -tracking-[0.04em] text-[#FFFFFF]">
        Empowering women in ML and AI
      </h2>

      {/* CTA Button */}
      <a
        href="/mosaic-of-voices"
        className="absolute w-[257px] h-[64px] left-[calc(50%-257px/2-513px)] top-[327px] flex items-center justify-center gap-2 px-7 py-5 bg-[#D89EFA] rounded-[100px]"
      >
        <span className="w-[169px] h-[24px] font-medium text-[20px] leading-[24px] -tracking-[0.02em] text-[#000000]">
          See the live action
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* Divider */}
      <div className="absolute w-[1275px] h-0 left-[calc(50%-1275px/2-4px)] top-[456px] border-t border-[#8A8A8A]"></div>

      {/* harangè logo */}
      <span className="absolute w-[275px] h-[24px] left-[79px] top-[521px] font-alata text-[56px] leading-[20px] -tracking-[0.05em] text-[#FFFFFF]">
        harangè
      </span>

      {/* Social Media */}
      <div className="absolute w-[218px] h-[62px] left-[77px] top-[614px] flex items-center gap-[16px]">
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[62px] h-[62px] bg-[#575757] rounded-full flex items-center justify-center hover:bg-[#6A6A6A] transition-colors"
          aria-label="Instagram"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[62px] h-[62px] bg-[#575757] rounded-full flex items-center justify-center hover:bg-[#6A6A6A] transition-colors"
          aria-label="LinkedIn"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M27.263 27.269h-4.739v-7.425c0-1.771-.036-4.049-2.469-4.049-2.471 0-2.848 1.927-2.848 3.919v7.555h-4.739V12h4.552v2.081h.061c.636-1.2 2.183-2.467 4.493-2.467 4.801 0 5.689 3.16 5.689 7.273v8.382zM7.116 9.911c-1.525 0-2.751-1.235-2.751-2.753 0-1.517 1.227-2.751 2.751-2.751 1.52 0 2.752 1.233 2.752 2.751 0 1.519-1.233 2.753-2.752 2.753zm2.376 17.358H4.74V12h4.752v15.269zM29.633 0H2.362C1.056 0 0 1.032 0 2.305v27.39C0 30.968 1.056 32 2.362 32h27.271C30.933 32 32 30.968 32 29.695V2.305C32 1.032 30.933 0 29.629 0h.003z" fill="white"/>
          </svg>
        </a>

        {/* X/Twitter */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[62px] h-[62px] bg-[#575757] rounded-full flex items-center justify-center hover:bg-[#6A6A6A] transition-colors"
          aria-label="X"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M24.325 3h4.411l-9.636 11.013L30.67 29h-8.878l-6.952-9.089L6.653 29H2.24l10.307-11.78L2.005 3h9.107l6.284 8.308L24.325 3zm-1.548 23.36h2.444L10.779 5.5H8.183l14.594 20.86z" fill="white"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
