'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { client, urlFor } from '../../lib/sanity'

const SANITY_SPONSORS_QUERY = `*[_type == "sponsor"] | order(order asc) { name, logo, url, tier }`

const staticSponsors = [
  { name: 'BİAS Mühendislik', logo: '/images/sponsor-bias.jpg', url: '#' },
  { name: 'Hexagon Manufacturing Intelligence', logo: '/images/sponsor-hexagon.jpg', url: '#' },
]

function normalizeSponsors(data) {
  return data.map((s) => ({
    name: s.name,
    logo: s.logo ? urlFor(s.logo).url() : null,
    url: s.url || '#',
    tier: s.tier,
  }))
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

export default function SponsorsPage() {
  const { t } = useLanguage()
  const p = t.sponsorsPage
  const [sponsors, setSponsors] = useState(staticSponsors)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return
    client.fetch(SANITY_SPONSORS_QUERY)
      .then((data) => { if (data?.length) setSponsors(normalizeSponsors(data)) })
      .catch(() => {})
  }, [])

  return (
    <div className="pt-16">
      {/* Page banner */}
      <div className="bg-navy py-24 md:py-32 px-6 text-center">
        <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-5">{p.eyebrow}</p>
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">{p.title}</h1>
        <div className="w-10 h-px bg-gold mx-auto mb-10" />
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {p.intro}
        </p>
      </div>

      {/* CTA buttons */}
      <div className="bg-navy-dark border-t border-white/10 py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="mailto:sponsor@buracing.com"
            className="w-full sm:w-auto px-8 py-3 bg-gold text-navy text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-all duration-300 text-center"
          >
            {p.ctas.become}
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3 border border-white/30 text-white text-xs font-bold tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300 text-center"
          >
            {p.ctas.download}
          </a>
          <a
            href="mailto:contact@buracing.com"
            className="w-full sm:w-auto px-8 py-3 border border-white/30 text-white text-xs font-bold tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300 text-center"
          >
            {p.ctas.email}
          </a>
        </div>
      </div>

      {/* Why partner */}
      <div className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-navy text-3xl md:text-4xl font-bold mb-4">{p.whyTitle}</h2>
            <div className="w-10 h-px bg-gold mx-auto" />
          </div>
          <ul className="space-y-5">
            {p.whyItems.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <CheckIcon />
                <p className="text-gray-600 text-base leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Current partners */}
      <div className="py-24 md:py-32 px-6 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{p.currentPartners}</h2>
          <div className="w-10 h-px bg-gold mx-auto mb-6" />
          <p className="text-white/65 text-base mb-16">{p.partnersIntro}</p>

          <div className="flex flex-wrap justify-center items-start gap-10 md:gap-14">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 hover:scale-[1.03] transition-transform duration-300"
              >
                <div className="bg-white rounded-sm w-52 h-28 flex items-center justify-center px-6">
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
                <span className="text-white/60 text-[11px] font-medium tracking-wider text-center w-52 leading-snug uppercase">
                  {sponsor.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
