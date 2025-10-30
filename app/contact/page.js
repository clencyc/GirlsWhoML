import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function Contact() {
  return (
    <div className="relative w-[1440px] h-[1831px] bg-[#FFFFFF]">
      <Header />

      {/* Get Involved heading - exact Figma specs */}
      <h1 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+0.5px)] top-[296px] font-['Inter'] font-medium text-[72px] leading-[87px] text-center tracking-[-0.04em] text-[#000000] order-0">
        Get Involved
      </h1>

      {/* Description - exact Figma specs */}
      <p className="absolute w-[1281px] h-[78px] left-[calc(50%-1281px/2+0.5px)] top-[445px] font-['Inter'] font-medium text-[32px] leading-[39px] text-center tracking-[-0.04em] text-[#000000] order-1">
        Your voice and generosity drive our mission forward. Contact us to collaborate or donate to help us make lasting change.
      </p>

      {/* contactCards - exact Figma specs */}
      <div className="flex flex-row items-center p-0 gap-[39px] absolute w-[1077px] h-[325px] left-[calc(50%-1077px/2+0.5px)] top-[585px]">

        {/* Frame 167 - Help Card */}
        <div className="flex flex-col items-center p-[40px_32px] gap-[40px] w-[519px] h-[325px] bg-[#FFFFFF] border border-[#E3E3E3] rounded-[20px] order-0">
          {/* helpIcon */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="order-0">
            <path d="M32 53.33C43.78 53.33 53.33 43.78 53.33 32C53.33 20.22 43.78 10.67 32 10.67C20.22 10.67 10.67 20.22 10.67 32C10.67 43.78 20.22 53.33 32 53.33Z" stroke="#000000" strokeWidth="2"/>
          </svg>

          {/* helpTitle */}
          <h3 className="w-[455px] h-[34px] font-['Inter'] font-bold text-[28px] leading-[34px] text-center tracking-[-0.02em] text-[#000000] order-1">
            Need help or have feedback?
          </h3>

          {/* helpEmail */}
          <p className="w-[455px] h-[29px] font-['Inter'] font-medium text-[24px] leading-[29px] text-center tracking-[-0.02em] text-[#B1B1B1] order-2">
            Email us at team.harange@gmail.com
          </p>
        </div>

        {/* Frame 168 - Support Card */}
        <div className="flex flex-col items-center p-[40px_32px] gap-[40px] w-[519px] h-[325px] bg-[#FFFFFF] border border-[#E3E3E3] rounded-[20px] order-1">
          {/* supportIcon */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="order-0">
            <circle cx="32" cy="32" r="21.33" stroke="#000000" strokeWidth="2"/>
            <path d="M32 21.33V32M32 32H42.67M32 32V42.67M32 32H21.33" stroke="#000000" strokeWidth="2"/>
          </svg>

          {/* supportTitle */}
          <h3 className="w-[455px] h-[34px] font-['Inter'] font-bold text-[28px] leading-[34px] text-center tracking-[-0.02em] text-[#000000] order-1">
            Want to support us?
          </h3>

          {/* supportEmail */}
          <p className="w-[455px] h-[29px] font-['Inter'] font-medium text-[24px] leading-[29px] text-center tracking-[-0.02em] text-[#B1B1B1] order-2">
            Email us at megha@girlswhoml.com
          </p>
        </div>
      </div>

      {/* footer */}
      <div className="absolute w-[1441px] h-[781px] left-[-1px] top-[1050px]">
        <Footer />
      </div>
    </div>
  );
}
