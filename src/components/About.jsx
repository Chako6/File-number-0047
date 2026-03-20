'use client'

import { useLanguage } from '../context/LanguageContext'

const icons = {
  cog: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  team: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  book: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
};

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="bg-white">
      {/* ── Header block — subtle dot-grid bg ── */}
      <div
        className="pt-24 md:pt-32 pb-14 md:pb-16 px-6"
        style={{ backgroundImage: 'radial-gradient(rgba(13,27,42,0.045) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-5">
            {a.eyebrow}
          </p>
          <h2 className="text-navy text-4xl md:text-5xl font-bold leading-tight mb-7">
            {a.title}
          </h2>
          <div className="w-10 h-px bg-gold mx-auto" />
        </div>
      </div>

      {/* ── Highlight statement ── */}
      <div className="px-6 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <blockquote className="border-l-4 border-gold pl-7 py-2">
            <p className="text-navy text-xl md:text-2xl font-semibold leading-snug italic">
              "{a.highlight}"
            </p>
          </blockquote>
        </div>
      </div>

      {/* ── Body paragraphs ── */}
      <div className="px-6 pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">{a.p1}</p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">{a.p2}</p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">{a.p3}</p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">{a.p4}</p>

          {/* Inset highlighted fact */}
          <div className="my-8 bg-navy/4 border border-navy/8 px-7 py-5">
            <p className="text-navy text-base md:text-lg leading-relaxed font-medium">{a.p5}</p>
          </div>
        </div>
      </div>

      {/* ── Value cards — dark engineering section ── */}
      <div className="bg-navy-dark px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">PROGRAMME PILLARS</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6">
            {a.values.map((v, i) => (
              <div
                key={v.title}
                className="group bg-navy-dark hover:bg-navy-light px-8 py-8 transition-all duration-300"
              >
                {/* Index */}
                <p className="font-mono text-[10px] text-gold/25 tracking-widest mb-5">[ 0{i + 1} ]</p>
                {/* Icon */}
                <div className="text-gold mb-5 group-hover:scale-105 transition-transform duration-200">
                  {icons[v.icon]}
                </div>
                {/* Title */}
                <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-3">
                  {v.title}
                </h3>
                {/* Body */}
                <p className="text-white/60 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="#team"
              className="inline-block px-8 py-3 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
            >
              {a.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
