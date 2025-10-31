import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import TestimonialSlider from './components/home/TestimonialSlider';

export default function Home() {
  return (
    <div className="relative w-[1440px] h-[8664px] bg-[#FFFFFF]">
      <Header />

      {/* topSection */}
      <section className="absolute w-[1441px] h-[1769px] left-[calc(50%-1441px/2+0.5px)] top-[156px]">
        {/* heroText */}
        <div className="flex flex-col items-center p-0 gap-[52px] absolute w-[881px] h-[368px] left-[281px] top-[120px]">
          {/* h1 */}
          <div className="flex flex-col items-center p-0 gap-[40px] w-[881px] h-[252px] flex-none order-0 self-stretch flex-grow-0">
            <h1 className="w-[881px] h-[174px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              An Ecosystem to enable gender parity in ML and AI
            </h1>
            <p className="w-[881px] h-[38px] font-['Inter'] text-[32px] leading-[39px] text-center tracking-[-0.04em] text-[#000000] flex-none order-1 self-stretch flex-grow-0" style={{fontWeight: 450}}>
              GirlsWhoML x Mozilla Festival 2025
            </p>
          </div>

          {/* cta1 */}
          <a
            href="/mosaic-of-voices"
            className="flex flex-row justify-center items-center p-[20px_28px] gap-[8px] w-[323px] h-[64px] bg-[#D89EFA] rounded-[100px] flex-none order-1 flex-grow-0"
          >
            <span className="w-[235px] h-[24px] font-['Inter'] font-bold text-[20px] leading-[24px] tracking-[-0.02em] text-[#000000] flex-none order-0 flex-grow-0" style={{fontWeight: 450}}>
              Explore Collective Gallery
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-none order-1 flex-grow-0">
              <path d="M3 12H21M21 12L14 5M21 12L14 19" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* liveBadge */}
        <div className="box-border flex flex-row justify-center items-center p-[8px_16px] gap-[8px] absolute w-[83px] h-[35px] left-[calc(50%-83px/2)] top-[618px] border border-[#DBDBDB] rounded-[100px]">
          <div className="w-[9px] h-[9px] bg-[#F06464] rounded-full flex-none order-0 flex-grow-0"></div>
          <span className="w-[34px] h-[19px] font-['Inter'] text-[16px] leading-[19px] tracking-[-0.02em] text-[#000000] flex-none order-1 flex-grow-0" style={{fontWeight: 600}}>LIVE</span>
        </div>

        {/* Rectangle 24 */}
        <div className="absolute w-[1056px] h-[608px] left-[192px] top-[681px] bg-[#000000] rounded-[20px]"></div>

        {/* description */}
        <div className="absolute w-[1440px] left-[calc(50%-1440px/2)] top-[1415px] text-[32px] leading-[39px] text-center text-[#000000]" style={{fontFamily: 'var(--font-inter)', fontWeight: 500, letterSpacing: '-4%'}}>
          <div className="whitespace-nowrap">On November 7th, 2025, GirlsWhoML and Oeuvre unveiled "Below the Surface",</div>
          <div className="whitespace-nowrap">an installation that transforms a quiet gesture into an act of visibility.</div>
          <div>&nbsp;</div>
          <div className="whitespace-nowrap">Visitors tap on our NFC chips, and each touch reveals faces and voices of real</div>
          <div className="whitespace-nowrap">women whose presence in technology is too often unseen, creating a shared act</div>
          <div className="whitespace-nowrap">of recognition and emergence.</div>
        </div>
      </section>

      {/* secondSection */}
      <section className="absolute w-[1441px] h-[3642px] left-[calc(50%-1441px/2+0.5px)] top-[1925px]">
        <h2 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+1px)] top-[179px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000]" style={{fontWeight: 500}}>
          The Change We're Making
        </h2>

        {/* change1 */}
        <div className="flex flex-row items-center p-0 gap-[75px] absolute w-[1069.29px] h-[563px] left-[187px] top-[571px]">
          {/* leftText */}
          <div className="flex flex-col items-start p-0 gap-[44px] w-[566px] h-[563px] flex-none order-0 flex-grow-0">
            <div className="w-[566px] h-[195px] font-['Inter'] text-[54px] leading-[65px] tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              <div className="whitespace-nowrap">Below the Surface —</div>
              <div className="whitespace-nowrap">Lifting Women in AI Out</div>
              <div className="whitespace-nowrap">of Invisibility</div>
            </div>
            <div className="w-[566px] h-[324px] font-['Inter'] text-[24px] leading-[36px] tracking-[-0.02em] text-[#000000] flex-none order-1 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              <div className="whitespace-nowrap">Millions of women perform the foundational work</div>
              <div className="whitespace-nowrap">of AI — labelling, tagging, and cleaning the data</div>
              <div className="whitespace-nowrap">that trains our models. Many earn only $2–4 an</div>
              <div className="whitespace-nowrap">hour for this invisible labour. We set out to speak</div>
              <div className="whitespace-nowrap">with these women, yet even we, in trying to make</div>
              <div className="whitespace-nowrap">them visible, found many beyond reach. Among the</div>
              <div className="whitespace-nowrap">submerged faces we could gather, we placed</div>
              <div className="whitespace-nowrap">empty frames — reminders that invisibility extends</div>
              <div className="whitespace-nowrap">deeper than we imagined.</div>
            </div>
          </div>
          {/* img */}
          <div className="w-[428px] h-[520px] flex-none order-1 flex-grow-0 flex items-center justify-center">
            <div className="w-[440px] h-[550px] flex-none order-1">
              <img src="/images/home/img1.png" alt="Below the Surface illustration" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* change2 */}
        <div className="flex flex-row items-start p-0 gap-[69px] absolute w-[1100px] h-[707px] left-[187px] top-[1444px]">
          {/* img */}
          <div className="w-[476px] h-[476px] flex-none order-0 flex-grow-0">
            <img src="/images/home/img2.png" alt="Tiles of reflection illustration" className="w-full h-full object-contain" />
          </div>

          {/* rightText */}
          <div className="flex flex-col items-start p-0 gap-[44px] w-[555px] h-[707px] flex-none order-1 flex-grow-0">
            <h3 className="w-[555px] h-[195px] font-['Inter'] text-[54px] leading-[65px] tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              Tiles of Reflection — Let Women's Voices Be Heard
            </h3>
            <p className="w-[555px] h-[360px] font-['Inter'] text-[24px] leading-[36px] tracking-[-0.02em] text-[#000000] flex-none order-1 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              Through our survey, we collected <span className="text-[#F06464]">[insert number]</span> reflections from women working across AI — their words revealing resilience, isolation, and hope. Each response became one of <span className="text-[#F06464]">[insert number]</span> digital tiles within the installation, glowing softly as visitors engaged. Guests were invited to select up to four tiles that resonated with them most — a simple act that amplified these women's voices. In doing so, the installation turned listening into participation, and participation into recognition.
            </p>
            <a
              href="/mosaic-of-voices"
              className="flex flex-row justify-center items-center p-[20px_28px] gap-[8px] w-[206px] h-[64px] bg-[#000000] rounded-[100px] flex-none order-2 flex-grow-0"
            >
              <span className="w-[150px] h-[24px] font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] text-[#F5F5F5] flex-none order-0 flex-grow-0" style={{fontWeight: 500}}>
                See their stories
              </span>
            </a>
          </div>
        </div>

        {/* change3 */}
        <div className="flex flex-row items-start p-0 gap-[53px] absolute w-[1079px] h-[851px] left-[187px] top-[2677px]">
          {/* leftText */}
          <div className="flex flex-col items-start p-0 gap-[44px] w-[521px] h-[851px] flex-none order-0 flex-grow-0">
            <h3 className="w-[521px] h-[195px] font-['Inter'] text-[54px] leading-[65px] tracking-[-0.04em] text-[#000000] flex-none order-0 self-stretch flex-grow-0" style={{fontWeight: 500}}>
              Two Reflective Questions — Your Reflections Matter
            </h3>
            <div className="w-[514px] h-[612px] font-['Inter'] text-[24px] leading-[36px] tracking-[-0.02em] text-[#000000] flex-none order-1 flex-grow-0" style={{fontWeight: 500}}>
              <p className="mb-[24px]">At the end of the experience, visitors encountered two open questions:</p>
              <p className="mb-[24px]">1. What word best describes how you feel after exploring this installation?</p>
              <p className="mb-[36px]">2. What is one insight or reflection you'll take away with you?</p>
              <p>We expect to engage around <span className="text-[#F06464]">[insert number]</span> visitors and have already received <span className="text-[#F06464]">[insert number]</span> reflections. Together, these responses form a living archive of empathy and awareness — the first of its kind to document how people feel when confronted with the gendered invisibility embedded in AI. It is both a mirror and a measure of change, reminding us that visibility is not given — it is created, collectively.</p>
            </div>
          </div>

          {/* img */}
          <div className="w-[505px] h-[639px] flex-none order-1 flex-grow-0">
            <img src="/images/home/img3.png" alt="Reflection questions interface" className="w-full h-full object-cover rounded-[20px]" />
          </div>
        </div>
      </section>

      {/* thirdSection */}
      <section className="absolute w-[1441px] h-[985px] left-[calc(50%-1441px/2+0.5px)] top-[5567px]">
        <div className="flex flex-col items-center p-[100px_0px] gap-[10px] w-[1441px] h-[985px]">
          {/* ctaCard */}
          <div className="flex flex-col justify-center items-center p-[120px_98px] gap-[95px] w-[1262px] h-[785px] bg-[#F6D55C] rounded-[50px] flex-none order-0 flex-grow-0">
            <h2 className="w-[989px] h-[174px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] flex-none order-0 flex-grow-0" style={{fontWeight: 500}}>
              Support the Next Generation<br />of Women in AI
            </h2>
            <p className="w-[1066px] h-[117px] font-['Inter'] text-[32px] leading-[39px] text-center tracking-[-0.02em] text-[#000000] flex-none order-1 flex-grow-0" style={{fontWeight: 500}}>
              Your donation helps us reach our goal of introducing 100,000 women and non-binary individuals to machine learning through free education, mentorship, and real-world opportunities.
            </p>
            {/* ctaButton */}
            <a
              href="/contact"
              className="flex flex-row justify-center items-center p-[20px_28px] gap-[8px] w-[230px] h-[64px] bg-[#000000] rounded-[100px] flex-none order-2 flex-grow-0"
            >
              <span className="w-[174px] h-[24px] font-['Inter'] text-[20px] leading-[24px] tracking-[-0.02em] text-[#F5F5F5] flex-none order-0 flex-grow-0" style={{fontWeight: 500}}>
                Support the Future
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* forthSection */}
      <section className="absolute w-[1441px] h-[1331px] left-[calc(50%-1441px/2+0.5px)] top-[6552px] bg-[#F5F3ED]">
        <h2 className="absolute w-[919px] h-[87px] left-[calc(50%-919px/2+2px)] top-[242px] font-['Inter'] text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000]" style={{fontWeight: 500}}>
          Voices & Reflections: Women Shaping AI
        </h2>

        <TestimonialSlider />
      </section>

      {/* footer */}
      <div className="absolute w-[1441px] h-[781px] left-[-1px] top-[7883px]">
        <Footer />
      </div>
    </div>
  );
}
