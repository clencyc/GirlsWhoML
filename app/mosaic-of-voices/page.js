import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MosaicOfVoices() {
  return (
    <div className="relative w-[1440px] h-[3509px] bg-[#F5F3ED] mx-auto">
      {/* Header at top */}
      <div className="absolute w-[1440px] h-[156px] left-0 top-0">
        <Header />
      </div>

      {/* Mosaic of Voices Heading */}
      <h1 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+0.5px)] top-[296px] font-medium text-[72px] leading-[87px] text-center -tracking-[0.04em] text-black">
        Mosaic of Voices
      </h1>

      {/* Description */}
      <p className="absolute w-[1281px] h-[78px] left-[calc(50%-1281px/2+0.5px)] top-[445px] font-medium text-[32px] leading-[39px] text-center -tracking-[0.04em] text-black">
        Every 2×2 tile here was chosen by a visitor — a fragment of resonance, representing voices lifted from invisibility into shared reflection.
      </p>

      {/* Tiles - Row 1 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[623px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[623px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[623px] bg-black rounded-[20px]"></div>

      {/* Tiles - Row 2 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1073px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1073px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1073px] bg-black rounded-[20px]"></div>

      {/* Tiles - Row 3 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1523px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1523px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1523px] bg-black rounded-[20px]"></div>

      {/* Tiles - Row 4 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1973px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1973px] bg-black rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1973px] bg-black rounded-[20px]"></div>

      {/* View More Button */}
      <div className="absolute w-[157px] h-[82px] left-[calc(50%-157px/2+0.5px)] top-[2492px] flex flex-col items-center justify-center gap-3 opacity-50">
        <span className="w-[157px] h-[39px] font-medium text-[32px] leading-[39px] text-center -tracking-[0.02em] text-black">
          View more
        </span>
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
          <path d="M15.5 10V21M15.5 21L20.5 16M15.5 21L10.5 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Footer at specific position */}
      <div className="absolute w-[1440px] h-[781px] left-0 top-[2728px]">
        <Footer />
      </div>
    </div>
  );
}
