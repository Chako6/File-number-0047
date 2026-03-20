'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

const staticSponsors = [
  { name: 'BİAS Mühendislik', logo: '/images/sponsor-bias.jpg', url: '#' },
  { name: 'Hexagon Manufacturing Intelligence', logo: '/images/sponsor-hexagon.jpg', url: '#' },
]

// Teaser version — used on the Home page
export default function Sponsors() {
  const { t } = useLanguage()
  const s = t.sponsors
  const [sponsors, setSponsors] = useState(staticSponsors)

  useEffect(() => {
    fetch('/api/sponsors')
      .then((r) => r.json())
      .then((data) => { if (data?.length) setSponsors(data) })
      .catch(() => {})
  }, [])

  return (
    <section id="sponsors" className="py-32 md:py-40 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
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

        <div className="flex flex-wrap justify-center items-start gap-10 md:gap-14 mb-16">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="bg-white ring-1 ring-gray-200 rounded-sm w-48 h-24 flex items-center justify-center px-5">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'block'
                  }}
                />
                <span className="hidden text-navy font-bold text-sm text-center">{sponsor.name}</span>
              </div>
              <span className="text-gray-500 text-[11px] font-medium tracking-wider text-center w-48 leading-snug uppercase mt-1">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/sponsors"
            className="inline-block px-8 py-3 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {s.viewAll}
          </Link>
          <Link
            href="/sponsors"
            className="inline-block px-8 py-3 bg-gold text-navy text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
          >
            {s.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
