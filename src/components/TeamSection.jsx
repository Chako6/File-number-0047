'use client'

import { useLanguage } from '../context/LanguageContext'

export default function TeamSection() {
  const { t } = useLanguage();
  const tm = t.team;

  return (
    <section id="team" className="w-full bg-white">
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src="/images/team.jpg"
          alt="Boğaziçi Racing Team"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{tm.eyebrow}</p>
            <p className="text-white text-lg md:text-xl font-semibold tracking-wide">{tm.caption}</p>
          </div>
          <p className="text-white/60 text-sm tracking-wide">{tm.location}</p>
        </div>
      </div>

      <div className="bg-navy py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x divide-white/10">
          {tm.stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center px-6 py-2 text-center">
              <span className="text-gold text-3xl md:text-4xl font-bold mb-1">{value}</span>
              <span className="text-white/40 text-xs tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
