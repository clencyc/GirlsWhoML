import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function MosaicOfVoices() {
  return (
    <div className="relative w-[1440px] h-[3509px] bg-[#F5F3ED]">
      <Header />

      {/* Mosaic of Voices heading - exact Figma specs */}
      <h1 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+0.5px)] top-[296px] font-['Inter'] font-medium text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] order-0">
        Mosaic of Voices
      </h1>

      {/* Description - exact Figma specs */}
      <p className="absolute w-[1281px] h-[78px] left-[calc(50%-1281px/2+0.5px)] top-[445px] font-['Inter'] font-medium text-[32px] leading-[39px] text-center tracking-[-0.04em] text-[#000000] order-1">
        Every 2×2 tile here was chosen by a visitor — a fragment of resonance, representing voices lifted from invisibility into shared reflection.
      </p>

      {/* tiles - Row 1 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[623px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[623px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[623px] bg-[#000000] rounded-[20px]"></div>

      {/* tiles - Row 2 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1073px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1073px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1073px] bg-[#000000] rounded-[20px]"></div>

      {/* tiles - Row 3 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1523px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1523px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1523px] bg-[#000000] rounded-[20px]"></div>

      {/* tiles - Row 4 */}
      <div className="absolute w-[400px] h-[400px] left-[80px] top-[1973px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[521px] top-[1973px] bg-[#000000] rounded-[20px]"></div>
      <div className="absolute w-[400px] h-[400px] left-[961px] top-[1973px] bg-[#000000] rounded-[20px]"></div>

      {/* viewMoreButton - exact Figma specs */}
      <div className="flex flex-col items-center p-0 gap-[12px] absolute w-[157px] h-[82px] left-[calc(50%-157px/2+0.5px)] top-[2492px] opacity-50">
        <span className="w-[157px] h-[39px] font-['Inter'] font-medium text-[32px] leading-[39px] text-center tracking-[-0.02em] text-[#000000] order-0">
          View more
        </span>
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" className="order-1">
          <path d="M15.5 10V21M15.5 21L20.5 16M15.5 21L10.5 16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* footer */}
      <div className="absolute w-[1441px] h-[781px] left-[-1px] top-[2728px]">
        <Footer />
      </div>
    </div>
  );
}
