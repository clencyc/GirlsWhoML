import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <div className="relative w-full h-[2937px] bg-white">
      <Header />

      {/* Frame 124 - Main Content */}
      <div className="absolute w-[1441px] h-[2937px] left-[calc(50%-1441px/2+0.5px)] top-[156px]">

        {/* Top Section */}
        <section className="w-full h-[1023px] relative">
          <div className="absolute w-[1065px] h-[732px] left-[188px] top-[146px] flex flex-col items-center gap-[93px]">
            {/* About us heading */}
            <h1 className="w-[915px] h-[87px] font-medium text-[72px] leading-[87px] text-center -tracking-[0.04em] text-black">
              About us
            </h1>

            {/* Description */}
            <p className="w-[1065px] h-[273px] font-medium text-[32px] leading-[39px] text-center -tracking-[0.04em] text-black">
              Harangè is collective that is born out of the necessity to capture women's ambitions, dreams and aspirations of their AI-mediated futures. Led by GirlsWhoML and supported by Women AI Collective and Oeuvre, it took shape as an interactive installation at the Mozilla Festival 2025 and has since taken a life of its own. Harangè - as the Korean word means to fly skyward - makes space for people to reflect, reframe and reimagine our collective digital futures.
            </p>

            {/* Logos */}
            <div className="flex items-center gap-[60px] w-[863px] h-[186px]">
              {/* Harangè Logo */}
              <div className="flex items-center gap-3 w-[189px] h-[128px]">
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" className="flex-shrink-0">
                  <circle cx="64" cy="64" r="64" fill="#261033"/>
                  <rect x="40" y="32" width="16" height="16" fill="#D89EFA"/>
                  <rect x="40" y="48" width="16" height="16" fill="#D89EFA"/>
                  <rect x="40" y="64" width="16" height="16" fill="#D89EFA"/>
                  <rect x="56" y="64" width="16" height="16" fill="#D89EFA"/>
                  <rect x="72" y="64" width="16" height="16" fill="#D89EFA"/>
                  <rect x="40" y="80" width="16" height="16" fill="#D89EFA"/>
                  <rect x="72" y="80" width="16" height="16" fill="#D89EFA"/>
                  <rect x="56" y="48" width="16" height="16" fill="#D89EFA"/>
                  <rect x="72" y="48" width="16" height="16" fill="#D89EFA"/>
                </svg>
                <span className="font-alata text-[60px] leading-[20px] -tracking-[0.05em] text-[#261033]">harangè</span>
              </div>

              {/* X separator */}
              <span className="w-[32px] h-[32px] font-medium text-[32px] leading-[32px] text-black">×</span>

              {/* Oeuvre logo placeholder */}
              <div className="w-[196px] h-[186px] bg-[#D9D9D9] rounded-[20px]"></div>

              {/* X separator */}
              <span className="w-[32px] h-[32px] font-medium text-[32px] leading-[32px] text-black">×</span>

              {/* Partner logo placeholder */}
              <div className="w-[174px] h-[174px] bg-[#D9D9D9] rounded-[20px]"></div>
            </div>
          </div>
        </section>

        {/* Bottom Section - Quote */}
        <section className="absolute w-full h-[977px] left-0 top-[1179px] bg-[#F5F3ED] flex flex-col items-center justify-center gap-20 py-[200px]">
          <p className="w-[1077px] h-[420px] font-medium text-[58px] leading-[70px] text-center -tracking-[0.04em] text-black">
            "If we don't get women and people of colour at the table – real technologists doing the real work – we will bias systems. Trying to reverse that a decade or two from now will be so much more difficult, if not close to impossible."
          </p>
          <p className="w-[529px] h-[77px] font-medium text-[28px] leading-[34px] text-center -tracking-[0.04em] text-black opacity-50">
            Melinda Gates, Co-chair Bill & Melinda Gates Foundation
          </p>
        </section>

        {/* Footer */}
        <div className="absolute w-full top-[2156px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
