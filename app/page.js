import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative w-full h-[8664px] bg-white">
      <Header />

      {/* Frame 124 - Main Content */}
      <div className="absolute w-[1441px] h-[8681px] left-[calc(50%-1441px/2+0.5px)] top-[156px] flex flex-col items-center">

        {/* Top Section */}
        <section className="w-full h-[1769px] relative">
          {/* Hero Text */}
          <div className="absolute w-[881px] h-[368px] left-[281px] top-[120px] flex flex-col items-center gap-[52px]">
            {/* H1 */}
            <div className="flex flex-col items-center gap-10 w-[881px] h-[252px]">
              <h1 className="w-[881px] h-[174px] font-medium text-[72px] leading-[87px] text-center -tracking-[0.04em] text-black">
                An Ecosystem to enable gender parity in ML and AI
              </h1>
              <p className="w-[881px] h-[38px] font-medium text-[32px] leading-[39px] text-center -tracking-[0.04em] text-black">
                GirlsWhoML x Mozilla Festival 2025
              </p>
            </div>

            {/* CTA1 Button */}
            <a
              href="/mosaic-of-voices"
              className="flex items-center justify-center gap-2 px-7 py-5 w-[323px] h-[64px] bg-[#D89EFA] rounded-[100px]"
            >
              <span className="w-[235px] h-[24px] font-medium text-[20px] leading-[24px] -tracking-[0.02em] text-black">
                Explore Collective Gallery
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Live Badge */}
          <div className="absolute w-[83px] h-[35px] left-[calc(50%-83px/2)] top-[618px] flex items-center justify-center gap-2 px-4 py-2 border border-[#DBDBDB] rounded-[100px]">
            <div className="w-[9px] h-[9px] bg-[#F06464] rounded-full"></div>
            <span className="w-[34px] h-[19px] font-semibold text-[16px] leading-[19px] -tracking-[0.02em] text-black">LIVE</span>
          </div>

          {/* Video Rectangle */}
          <div className="absolute w-[1056px] h-[608px] left-[192px] top-[681px] bg-black rounded-[20px]"></div>

          {/* Description */}
          <p className="absolute w-[1139px] h-[234px] left-[calc(50%-1139px/2+1px)] top-[1415px] font-medium text-[32px] leading-[39px] text-center -tracking-[0.04em] text-black">
            On November 7th, 2025, GirlsWhoML and Oeuvre unveiled "Below the Surface", an installation that transforms a quiet gesture into an act of visibility. Visitors tap on our NFC chips, and each touch reveals faces and voices of real women whose presence in technology is too often unseen, creating a shared act of recognition and emergence.
          </p>
        </section>

        {/* Second Section - The Change We're Making */}
        <section className="w-full h-[3642px] relative">
          <h2 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+1px)] top-[179px] font-medium text-[72px] leading-[87px] text-center -tracking-[0.04em] text-black">
            The Change We're Making
          </h2>

          {/* Change 1 */}
          <div className="absolute w-[1069.29px] h-[563px] left-[187px] top-[571px] flex items-center gap-[75px]">
            {/* Left Text */}
            <div className="flex flex-col gap-11 w-[566px] h-[563px]">
              <h3 className="w-[566px] h-[195px] font-medium text-[54px] leading-[65px] -tracking-[0.04em] text-black">
                Below the Surface — Lifting Women in AI Out of Invisibility
              </h3>
              <p className="w-[566px] h-[324px] font-medium text-[24px] leading-[36px] -tracking-[0.02em] text-black">
                Millions of women perform the foundational work of AI — labelling, tagging, and cleaning the data that trains our models. Many earn only $2–4 an hour for this invisible labour. We set out to speak with these women, yet even we, in trying to make them visible, found many beyond reach. Among the submerged faces we could gather, we placed empty frames — reminders that invisibility extends deeper than we imagined.
              </p>
            </div>

            {/* Image */}
            <div className="w-[384.55px] h-[477.18px] bg-[#493157] rounded-[20px]" style={{transform: 'rotate(5.47deg)'}}></div>
          </div>

          {/* Change 2 */}
          <div className="absolute w-[1100px] h-[707px] left-[187px] top-[1444px] flex gap-[69px]">
            {/* Tile Visual */}
            <div className="relative w-[476px] h-[476px]">
              {/* Grid tiles matching Figma */}
              <div className="absolute w-[148px] h-[148px] left-[164px] top-0 bg-[#D89EFA] rounded-[20px]">
                <div className="grid grid-cols-5 gap-1 p-3">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className={`w-[23px] h-[23px] rounded-md ${
                      i % 5 === 0 ? 'bg-[#E1AEFF]' :
                      i % 5 === 2 ? 'bg-[#F6D55C]' :
                      i % 5 === 3 ? 'bg-[#5A8E4D]' :
                      i === 8 ? 'bg-black' : 'bg-[#E1AEFF]'
                    }`}></div>
                  ))}
                </div>
              </div>
              <div className="absolute w-[148px] h-[148px] left-[164px] top-[164px] bg-[#EAEAEA] rounded-[20px] flex items-center justify-center">
                <div className="w-[121.62px] h-[121.62px] bg-[#493157] rounded" style={{transform: 'rotate(-45deg)'}}></div>
              </div>
              <div className="absolute w-[148px] h-[148px] left-[328px] top-[164px] bg-[#383838] rounded-[20px]"></div>
              <div className="absolute w-[148px] h-[148px] left-0 top-[164px] bg-[#493157] rounded-[20px]"></div>
              <div className="absolute w-[148px] h-[148px] left-[164px] top-[328px] bg-[#D89EFA] rounded-[20px] flex items-center justify-center">
                <div className="w-[146.65px] h-[146.65px] bg-[#F6D55C] rounded-[20px]" style={{transform: 'rotate(-45deg)'}}></div>
              </div>
              <div className="absolute w-[148px] h-[148px] left-0 top-[328px] bg-[#FFE175] rounded-[20px]"></div>
              <div className="absolute w-[148px] h-[148px] left-[328px] top-[328px] bg-[#D89EFA] rounded-[20px]"></div>
            </div>

            {/* Right Text */}
            <div className="flex flex-col gap-11 w-[555px] h-[707px]">
              <h3 className="w-[555px] h-[195px] font-medium text-[54px] leading-[65px] -tracking-[0.04em] text-black">
                Tiles of Reflection — Let Women's Voices Be Heard
              </h3>
              <p className="w-[555px] h-[360px] font-medium text-[24px] leading-[36px] -tracking-[0.02em] text-black">
                Through our survey, we collected reflections from women working across AI — their words revealing resilience, isolation, and hope. Each response became one of digital tiles within the installation, glowing softly as visitors engaged. Guests were invited to select up to four tiles that resonated with them most — a simple act that amplified these women's voices. In doing so, the installation turned listening into participation, and participation into recognition.
              </p>
              <a
                href="/mosaic-of-voices"
                className="flex items-center justify-center gap-2 px-7 py-5 w-[206px] h-[64px] bg-black rounded-[100px]"
              >
                <span className="w-[150px] h-[24px] font-medium text-[20px] leading-[24px] -tracking-[0.02em] text-[#F5F5F5]">
                  See their stories
                </span>
              </a>
            </div>
          </div>

          {/* Change 3 */}
          <div className="absolute w-[1079px] h-[851px] left-[187px] top-[2677px] flex gap-[53px]">
            {/* Left Text */}
            <div className="flex flex-col gap-11 w-[521px] h-[851px]">
              <h3 className="w-[521px] h-[195px] font-medium text-[54px] leading-[65px] -tracking-[0.04em] text-black">
                Two Reflexive Questions — Your Reflections Matter
              </h3>
              <p className="w-[514px] h-[612px] font-medium text-[24px] leading-[36px] -tracking-[0.02em] text-black">
                At the end of the experience, visitors encountered two open questions: What word best describes how you feel after exploring this installation? What is one insight or reflection you'll take away with you? Together, these responses form a living archive of empathy and awareness — the first of its kind to document how people feel when confronted with the gendered invisibility embedded in AI.
              </p>
            </div>

            {/* Right Visual */}
            <div className="relative w-[505px] h-[639px] bg-[#575757] rounded-[20px]">
              <div className="absolute w-[424px] h-[80px] left-[50.91px] top-[57.61px] bg-[#D89EFA] rounded-[20px]" style={{transform: 'rotate(-3.13deg)'}}>
                <span className="absolute w-[316px] h-[52px] left-[31.37px] top-[16.39px] font-medium text-[24px] leading-[52px] -tracking-[0.05em] text-black" style={{transform: 'rotate(-3.13deg)'}}>
                  Q1. What word best describe...
                </span>
              </div>
              <div className="absolute w-[424px] h-[80px] left-[48px] top-[167px] bg-[#D89EFA] rounded-[20px]" style={{transform: 'rotate(2.08deg)'}}>
                <span className="absolute w-[280px] h-[52px] left-[34.28px] top-[15px] font-medium text-[24px] leading-[52px] -tracking-[0.05em] text-black" style={{transform: 'rotate(2.08deg)'}}>
                  Q2. What is one insight or...
                </span>
              </div>
              <div className="absolute w-[409px] h-[167px] left-[48px] top-[306px] bg-[#383838] border border-[#C3C3C3] rounded-[10px] flex items-start p-7">
                <p className="w-[352px] h-[72px] font-medium text-[20px] leading-[24px] -tracking-[0.02em] text-white">
                  This experience gave me the confidence to pursue AI, something I never imagined possible...
                </p>
              </div>
              <button className="absolute w-[242px] h-[64px] left-[48px] top-[501px] flex items-center justify-center gap-2 px-7 py-5 bg-[#F1F1F1] rounded-[100px]">
                <span className="w-[186px] h-[24px] font-medium text-[20px] leading-[24px] -tracking-[0.02em] text-black">Send your reflection</span>
              </button>
              <div className="absolute w-[57.72px] h-[65px] left-[222px] top-[533px] bg-[#D89EFA] border-2 border-white rounded-[5px]" style={{transform: 'rotate(-34.1deg)'}}></div>
            </div>
          </div>
        </section>

        {/* Third Section - Yellow CTA */}
        <section className="w-[1441px] h-[985px] flex flex-col items-center py-[100px] gap-[10px]">
          <div className="w-[1262px] h-[785px] bg-[#F6D55C] rounded-[50px] flex flex-col items-center justify-center gap-[95px] px-[98px] py-[120px]">
            <h2 className="w-[989px] h-[174px] font-medium text-[72px] leading-[87px] text-center -tracking-[0.04em] text-black">
              Support the Next Generation of Women in AI
            </h2>
            <p className="w-[1066px] h-[117px] font-medium text-[32px] leading-[39px] text-center -tracking-[0.02em] text-black">
              Your donation helps us reach our goal of introducing 100,000 women and non-binary individuals to machine learning through free education, mentorship, and real-world opportunities.
            </p>
            <a
              href="/contact"
              className="flex items-center justify-center px-7 py-5 w-[230px] h-[64px] bg-black rounded-[100px]"
            >
              <span className="w-[174px] h-[24px] font-medium text-[20px] leading-[24px] -tracking-[0.02em] text-[#F5F5F5]">
                Support the Future
              </span>
            </a>
          </div>
        </section>

        {/* Fourth Section - Testimonials */}
        <section className="w-[1441px] h-[1331px] bg-[#F5F3ED] relative">
          <h2 className="absolute w-[919px] h-[87px] left-[calc(50%-919px/2+2px)] top-[242px] font-medium text-[72px] leading-[87px] text-center -tracking-[0.04em] text-black">
            Voices & Reflections: Women Shaping AI
          </h2>

          <div className="absolute w-[1637px] h-[465px] left-[80px] top-[514px] flex gap-10">
            {/* Card 1 */}
            <div className="w-[519px] h-[465px] bg-white rounded-[20px] flex flex-col justify-between p-10">
              <p className="w-[455px] h-[224px] font-medium italic text-[24px] leading-[32px] -tracking-[0.02em] text-black">
                "It was a transformative experience collaborating with women from over 20+ countries, amplifying their stories and experiences with AI and ML, and creating much-needed representation in the emerging tech space."
              </p>
              <p className="w-[455px] h-[34px] font-bold italic text-[28px] leading-[34px] -tracking-[0.02em] text-black">
                Samina, India
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-[519px] h-[465px] bg-white rounded-[20px] flex flex-col justify-between p-10">
              <p className="w-[455px] h-[256px] font-medium italic text-[24px] leading-[32px] -tracking-[0.02em] text-black">
                "The project was an enriching journey - from crowdfunding the installation to connecting with brilliant minds and leading workshops. It deepened my understanding of the gaps and misrepresentation in tech."
              </p>
              <p className="w-[455px] h-[34px] font-bold italic text-[28px] leading-[34px] -tracking-[0.02em] text-black">
                Fatima, Pakistan
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-[519px] h-[465px] bg-white rounded-[20px] flex flex-col justify-between p-10">
              <p className="w-[455px] h-[320px] font-medium italic text-[24px] leading-[32px] -tracking-[0.02em] text-black">
                "Eye-opening is the word. It's my first time working with such a big, diverse team! It's eye-opening too to realize that behind AI's dazzling front are women often least recognized in the system."
              </p>
              <p className="w-[455px] h-[34px] font-bold italic text-[28px] leading-[34px] -tracking-[0.02em] text-black">
                Yanni, China
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
