import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import './aboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-page">
      <Header />

      {/* Content */}
      <main className="about-main">
        
        {/* Top Section */}
        <section className="about-top-section">
          <div className="about-container">
            
            {/* Title */}
            <h1 className="about-title">
              About us
            </h1>

            {/* Description */}
            <p className="about-description">
              Harangè is collective that is born out of the necessity to capture women's ambitions, dreams and aspirations of their AI-mediated futures. 
              Led by GirlsWhoML and supported by Women AI Collective and Oeuvre, it took shape as an interactive installation at the Mozilla Festival 2025 
              and has since taken a life of its own. Harangè — as the Korean word means to fly skyward — makes space for people to reflect, reframe and 
              reimagine our collective digital futures.
            </p>

            {/* Logos with X separators */}
            <div className="about-logos">
              
              {/* Harangè Logo */}
              <div className="logo-item">
                <img src="/images/about/logo1.png" alt="GirlsWhoML logo"/>
              </div>

              {/* X Separator */}
              <div className="logo-separator">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="8" y1="8" x2="32" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="32" y1="8" x2="8" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Oeuvre Logo */}
              <div className="logo-item">
                <img src="/images/about/logo2.png" alt="Oeuvre logo" />
              </div>

              {/* X Separator */}
              <div className="logo-separator">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="8" y1="8" x2="32" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="32" y1="8" x2="8" y2="32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* GirlsWhoML Logo */}
              <div className="logo-item">
                <img src="/images/about/logo3.jpeg" alt="GirlsWhoML logo" />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section (Quote) */}
        <section className="about-quote-section">
          {/* Quote */}
          <p className="about-quote">
            "If we don't get women and people of colour at the table – real technologists doing the real work – we will bias systems. Trying to reverse that a 
            decade or two from now will be so much more difficult, if not close to impossible."
          </p>

          {/* Attribution */}
          <p className="about-attribution">
            Melinda Gates, Co-chair Bill & Melinda Gates Foundation
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}