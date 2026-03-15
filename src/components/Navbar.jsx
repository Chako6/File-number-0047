import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logoSrc from '../assets/images/logo.jpg';

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    setScrolled(window.scrollY > 80);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Solid when: not on home page, OR scrolled past hero
  const solid = !isHome || scrolled;

  const handleNavLink = (path) => (e) => {
    setMenuOpen(false);
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass =
    'text-white/75 hover:text-gold transition-colors duration-200 text-xs font-semibold tracking-widest uppercase';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        solid
          ? 'bg-navy shadow-[0_1px_0_0_rgba(201,168,76,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3.5 group">
          <img
            src={logoSrc}
            alt="BU Racing"
            className="h-10 w-10 object-cover rounded-sm ring-1 ring-white/10 group-hover:ring-gold/40 transition-all duration-300"
          />
          <span className="w-px h-5 bg-white/15" />
          <span className="text-white font-bold text-[11px] sm:text-sm tracking-wider sm:tracking-widest group-hover:text-gold transition-colors duration-200">
            Boğaziçi Racing
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <Link to="/" onClick={handleNavLink('/')} className={linkClass}>{t.nav.home}</Link>
          <Link to="/team" onClick={handleNavLink('/team')} className={linkClass}>{t.nav.team}</Link>
          <Link to="/car" onClick={handleNavLink('/car')} className={linkClass}>{t.nav.car}</Link>
          <Link to="/news" onClick={handleNavLink('/news')} className={linkClass}>{t.nav.news}</Link>
          <Link to="/sponsors" onClick={handleNavLink('/sponsors')} className={linkClass}>{t.nav.sponsors}</Link>
          <Link to="/contact" onClick={handleNavLink('/contact')} className={linkClass}>{t.nav.contact}</Link>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-xs font-bold tracking-widest border border-white/20 hover:border-gold/60 transition-all duration-200 px-3 py-1.5"
            aria-label="Toggle language"
          >
            <span className={lang === 'en' ? 'text-gold' : 'text-white/40'}>EN</span>
            <span className="text-white/25 mx-0.5">|</span>
            <span className={lang === 'tr' ? 'text-gold' : 'text-white/40'}>TR</span>
          </button>

          <Link
            to="/contact"
            onClick={handleNavLink('/contact')}
            className="px-5 py-2 border border-gold text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {t.nav.joinUs}
          </Link>
        </div>

        {/* Mobile right controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-xs font-bold border border-white/20 px-2.5 py-1"
          >
            <span className={lang === 'en' ? 'text-gold' : 'text-white/40'}>EN</span>
            <span className="text-white/25">|</span>
            <span className={lang === 'tr' ? 'text-gold' : 'text-white/40'}>TR</span>
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-navy ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          <Link to="/" onClick={handleNavLink('/')} className={`${linkClass} text-left`}>
            {t.nav.home}
          </Link>
          <Link to="/team" onClick={handleNavLink('/team')} className={linkClass}>
            {t.nav.team}
          </Link>
          <Link to="/car" onClick={handleNavLink('/car')} className={linkClass}>
            {t.nav.car}
          </Link>
          <Link to="/news" onClick={handleNavLink('/news')} className={linkClass}>
            {t.nav.news}
          </Link>
          <Link to="/sponsors" onClick={handleNavLink('/sponsors')} className={linkClass}>
            {t.nav.sponsors}
          </Link>
          <Link to="/contact" onClick={handleNavLink('/contact')} className={linkClass}>
            {t.nav.contact}
          </Link>
          <Link
            to="/contact"
            onClick={handleNavLink('/contact')}
            className="mt-2 px-5 py-3 border border-gold text-gold text-xs font-bold tracking-widest uppercase text-center hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {t.nav.joinUs}
          </Link>
        </div>
      </div>
    </nav>
  );
}
