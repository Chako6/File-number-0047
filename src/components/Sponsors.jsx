import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import biasSrc from '../assets/images/sponsor-bias.jpg';
import hexagonSrc from '../assets/images/sponsor-hexagon.jpg';

const sponsors = [
  { name: 'BİAS Mühendislik',                   logo: biasSrc,    url: '#' },
  { name: 'Hexagon Manufacturing Intelligence', logo: hexagonSrc, url: '#' },
];

// Teaser version — used on the Home page
export default function Sponsors() {
  const { t } = useLanguage();
  const s = t.sponsors;

  return (
    <section id="sponsors" className="py-32 md:py-40 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[9px] text-navy/30 tracking-widest uppercase">TECHNICAL PROGRAMME</span>
          <div className="flex-1 h-px bg-navy/10" />
        </div>

        <div className="text-center mb-16">
          <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-6">{s.eyebrow}</p>
          <h2 className="text-navy text-4xl md:text-5xl font-bold leading-tight mb-8">{s.title}</h2>
          <div className="w-10 h-px bg-gold mx-auto mb-8" />
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {s.body}
          </p>
        </div>

        {/* Sponsor grid */}
        <div className="flex flex-wrap justify-center items-start gap-10 md:gap-14 mb-16">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 hover:scale-[1.03] transition-transform duration-300"
            >
              {/* Fixed-size logo chip */}
              <div className="bg-white ring-1 ring-gray-200 rounded-sm w-48 h-24 flex items-center justify-center px-5">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden text-navy font-bold text-sm text-center">{sponsor.name}</span>
              </div>
              {/* Sponsor name */}
              <span className="text-gray-500 text-[11px] font-medium tracking-wider text-center w-48 leading-snug uppercase mt-1">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/sponsors"
            className="inline-block px-8 py-3 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {s.viewAll}
          </Link>
          <Link
            to="/sponsors"
            className="inline-block px-8 py-3 bg-gold text-navy text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
          >
            {s.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
