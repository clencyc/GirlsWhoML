import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function AboutUs() {
  return (
  <div className="relative w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
    
      <div className="sticky top-0 z-50 bg-white w-full flex justify-center">
        
        <Header />
        
      </div>

      {/* Content */}
      <main className="flex-grow flex flex-col items-center overflow-x-hidden ">
        
        {/* Top Section */}
        <section className="w-full flex flex-col items-center justify-center mt-[156px] px-6 sm:px-12 lg:px-20 ">
          <div className="flex flex-col items-center gap-[93px] max-w-[1065px] text-center ">
            
            
            <h1
              className="font-['Inter'] text-[72px] leading-[87px] tracking-[-0.04em] text-[#000000]
              mt-[120px]"
              style={{ fontWeight: 500 }}
            >
              About us
            </h1>

            {/* Description */}
            <p
              className="font-['Inter'] text-[32px] leading-[39px] tracking-[-0.04em] text-[#000000]"
              style={{ fontWeight: 500 }}
            >
              Harangè is collective that is born out of the necessity to capture women's ambitions, dreams and aspirations of their AI-mediated futures. 
              Led by GirlsWhoML and supported by Women AI Collective and Oeuvre, it took shape as an interactive installation at the Mozilla Festival 2025 
              and has since taken a life of its own. Harangè — as the Korean word means to fly skyward — makes space for people to reflect, reframe and 
              reimagine our collective digital futures.
            </p>

            {/* Logos with X separators */}
            <div className="flex flex-wrap justify-center items-center gap-[40px] sm:gap-[60px] mt-8">
              
              {/* Harangè Logo */}
              <div className="flex flex-col items-center w-[189px] h-auto">
                <img src="/images/about/logo1.png" alt="Harangè logo" className="w-full h-auto object-contain" />
              </div>

              {/* X Separator */}
              <div className="flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="8" y1="8" x2="32" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="32" y1="8" x2="8" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Oeuvre Logo */}
              <div className="w-[196px] h-auto">
                <img src="/images/about/logo2.png" alt="Oeuvre logo" className="w-full h-auto object-contain" />
              </div>

              {/* X Separator */}
              <div className="flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="8" y1="8" x2="32" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="32" y1="8" x2="8" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* GirlsWhoML Logo */}
              <div className="w-[174px] h-auto">
                <img src="/images/about/logo3.jpeg" alt="GirlsWhoML logo" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section (Quote) */}
        <section className="w-full bg-[#F5F3ED] flex flex-col items-center justify-center py-[200px] px-6 md:px-12 mt-[200px] gap-[80px] text-center">
          {/* Quote */}
          <p className="w-[70%] font-['Inter'] text-[58px] leading-[70px] tracking-[-0.04em] text-[#000000]" style={{ fontWeight: 500 }}>

            "If we don't get women and people of colour at the table – real technologists doing the real work – we will bias systems. Trying to reverse that a 
            decade or two from now will be so much more difficult, if not close to impossible."
          </p>

          {/* Attribution */}
          <p
            className="max-w-[529px] font-['Inter'] text-[28px] leading-[34px] tracking-[-0.04em] text-[#000000] opacity-50"
            style={{ fontWeight: 500 }}
          >
            Melinda Gates, Co-chair Bill & Melinda Gates Foundation
          </p>
        </section>
      </main>

      {/* Footer (fully visible) */}
      <Footer />
    </div> 
  );
}
