export default function Footer() {
  return (
    <footer className="w-[1441px] h-[781px] bg-[#393939] order-4">
      {/* Empowering women in ML and AI - exact Figma specs */}
      <h2 className="absolute w-[706px] h-[174px] left-[calc(50%-706px/2-288.5px)] top-[102px] font-['Inter'] font-medium text-[72px] leading-[87px] tracking-[-0.04em] text-[#FFFFFF]">
        Empowering women in ML and AI
      </h2>

      {/* cta - exact Figma specs */}
      <a
        href="/mosaic-of-voices"
        className="flex flex-row justify-center items-center p-[20px_28px] gap-[8px] absolute w-[257px] h-[64px] left-[calc(50%-257px/2-513px)] top-[327px] bg-[#D89EFA] rounded-[100px]"
      >
        <span className="w-[169px] h-[24px] font-['Inter'] font-medium text-[20px] leading-[24px] tracking-[-0.02em] text-[#000000] order-0">
          See the live action
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="order-1">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* divider */}
      <div className="absolute w-[1275px] h-0 left-[calc(50%-1275px/2-4px)] top-[456px] border border-[#8A8A8A]"></div>

      {/* harangè logo */}
      <span className="absolute w-[275px] h-[24px] left-[79px] top-[521px] font-alata font-normal text-[56px] leading-[20px] tracking-[-0.05em] text-[#FFFFFF]">
        harangè
      </span>

      {/* socialMedia - exact Figma specs */}
      <div className="flex flex-row items-center p-0 gap-[16px] absolute w-[218px] h-[62px] left-[77px] top-[614px]">
        {/* Frame 109 - Instagram */}
        <a
          href="https://www.instagram.com/girlswhoml/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[62px] h-[62px] bg-[#575757] rounded-[100px] flex items-center justify-center hover:bg-[#6A6A6A] transition-colors order-0"
          aria-label="Instagram"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="3.5" y="3.5" width="25" height="25" rx="6" stroke="#FFFFFF" strokeWidth="2.5" fill="none"/>
            <circle cx="16" cy="16" r="6.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none"/>
            <circle cx="23" cy="9" r="1.8" fill="#FFFFFF"/>
          </svg>
        </a>

        {/* Frame 110 - LinkedIn */}
        <a
          href="https://www.linkedin.com/company/girlswhoml/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[62px] h-[62px] bg-[#575757] rounded-[100px] flex items-center justify-center hover:bg-[#6A6A6A] transition-colors order-1"
          aria-label="LinkedIn"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M27.263 27.269h-4.739v-7.425c0-1.771-.036-4.049-2.469-4.049-2.471 0-2.848 1.927-2.848 3.919v7.555h-4.739V12h4.552v2.081h.061c.636-1.2 2.183-2.467 4.493-2.467 4.801 0 5.689 3.16 5.689 7.273v8.382zM7.116 9.911c-1.525 0-2.751-1.235-2.751-2.753 0-1.517 1.227-2.751 2.751-2.751 1.52 0 2.752 1.233 2.752 2.751 0 1.519-1.233 2.753-2.752 2.753zm2.376 17.358H4.74V12h4.752v15.269zM29.633 0H2.362C1.056 0 0 1.032 0 2.305v27.39C0 30.968 1.056 32 2.362 32h27.271C30.933 32 32 30.968 32 29.695V2.305C32 1.032 30.933 0 29.629 0h.003z" fill="#FFFFFF"/>
          </svg>
        </a>

        {/* Frame 111 - X/Twitter */}
        <a
          href="https://x.com/girlswhoml"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[62px] h-[62px] bg-[#575757] rounded-[100px] flex items-center justify-center hover:bg-[#6A6A6A] transition-colors order-2"
          aria-label="X"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M24.325 3h4.411l-9.636 11.013L30.67 29h-8.878l-6.952-9.089L6.653 29H2.24l10.307-11.78L2.005 3h9.107l6.284 8.308L24.325 3zm-1.548 23.36h2.444L10.779 5.5H8.183l14.594 20.86z" fill="#FFFFFF"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
