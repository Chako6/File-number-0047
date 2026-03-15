import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ShaderBackground from './ShaderBackground';

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-navy-dark">
      <ShaderBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/50 to-navy/80" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pb-36 md:pb-0">
        {/* Eyebrow */}
        <p className="text-gold text-xs font-semibold tracking-widest2 uppercase opacity-90 mb-5">
          {h.eyebrow}
        </p>

        {/* Headline */}
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide uppercase leading-none">
          {h.line1}
        </h1>
        <h1 className="text-gold text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide uppercase leading-none mb-10">
          {h.line2}
        </h1>

        <div className="w-12 h-px bg-gold mb-10 opacity-50" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/contact"
            className="px-10 py-3 bg-gold text-navy text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.35)]"
          >
            {h.cta1}
          </Link>
          <Link
            to="/car"
            className="px-10 py-3 border border-white/20 text-white/65 text-xs font-bold tracking-widest uppercase hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            {h.cta2}
          </Link>
        </div>
      </div>

      {/* Down arrow */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 hover:text-gold transition-colors duration-300 animate-bounce"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
