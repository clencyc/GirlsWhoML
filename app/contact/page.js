import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="relative w-[1440px] h-[1831px] bg-white mx-auto">
      {/* Header */}
      <div className="absolute w-[1440px] h-[156px] left-[calc(50%-1440px/2)] top-0">
        <Header />
      </div>

      {/* Get Involved Heading */}
      <h1 className="absolute w-[915px] h-[87px] left-[calc(50%-915px/2+0.5px)] top-[296px] font-medium text-[72px] leading-[87px] text-center -tracking-[0.04em] text-black">
        Get Involved
      </h1>

      {/* Description */}
      <p className="absolute w-[1281px] h-[78px] left-[calc(50%-1281px/2+0.5px)] top-[445px] font-medium text-[32px] leading-[39px] text-center -tracking-[0.04em] text-black">
        Your voice and generosity drive our mission forward. Contact us to collaborate or donate to help us make lasting change.
      </p>

      {/* Contact Cards */}
      <div className="absolute w-[1077px] h-[325px] left-[calc(50%-1077px/2+0.5px)] top-[585px] flex items-center gap-[39px]">
        {/* Help Card */}
        <div className="w-[519px] h-[325px] bg-white border border-[#E3E3E3] rounded-[20px] flex flex-col items-center justify-center gap-10 px-8 py-10">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 53.33C43.78 53.33 53.33 43.78 53.33 32C53.33 20.22 43.78 10.67 32 10.67C20.22 10.67 10.67 20.22 10.67 32C10.67 43.78 20.22 53.33 32 53.33Z" stroke="black" strokeWidth="2"/>
          </svg>

          <h3 className="w-[455px] h-[34px] font-bold text-[28px] leading-[34px] text-center -tracking-[0.02em] text-black">
            Need help or have feedback?
          </h3>

          <p className="w-[455px] h-[29px] font-medium text-[24px] leading-[29px] text-center -tracking-[0.02em] text-[#B1B1B1]">
            Email us at team.harange@gmail.com
          </p>
        </div>

        {/* Support Card */}
        <div className="w-[519px] h-[325px] bg-white border border-[#E3E3E3] rounded-[20px] flex flex-col items-center justify-center gap-10 px-8 py-10">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="21.33" stroke="black" strokeWidth="2"/>
            <path d="M32 21.33V32M32 32H42.67M32 32V42.67M32 32H21.33" stroke="black" strokeWidth="2"/>
          </svg>

          <h3 className="w-[455px] h-[34px] font-bold text-[28px] leading-[34px] text-center -tracking-[0.02em] text-black">
            Want to support us?
          </h3>

          <p className="w-[455px] h-[29px] font-medium text-[24px] leading-[29px] text-center -tracking-[0.02em] text-[#B1B1B1]">
            Email us at megha@girlswhoml.com
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute w-[1441px] h-[781px] left-[calc(50%-1441px/2+0.5px)] top-[1050px]">
        <Footer />
      </div>
    </div>
  );
}
