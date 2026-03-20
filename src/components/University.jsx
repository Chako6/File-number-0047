'use client'

import { useLanguage } from '../context/LanguageContext'

export default function University() {
  const { t } = useLanguage();
  const u = t.university;

  return (
    <section
      id="university"
      className="py-32 md:py-40 px-6 bg-white"
      style={{ backgroundImage: 'radial-gradient(rgba(13,27,42,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section marker */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-px bg-navy/12" />
          <span className="font-mono text-[9px] text-navy/25 tracking-widest uppercase">EST. 1863 · BEBEK, İSTANBUL</span>
          <div className="w-8 h-px bg-navy/12" />
        </div>

        <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-6">{u.eyebrow}</p>
        <h2 className="text-navy text-4xl md:text-5xl font-bold leading-tight mb-8">{u.title}</h2>
        <div className="w-10 h-px bg-gold mx-auto mb-10" />
        <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6">{u.p1}</p>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-14">{u.p2}</p>
        <a
          href="https://www.boun.edu.tr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 border border-navy text-navy text-xs font-bold tracking-widest uppercase hover:bg-navy hover:text-white transition-all duration-300"
        >
          {u.cta}
        </a>
      </div>
    </section>
  );
}
