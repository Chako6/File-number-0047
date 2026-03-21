'use client'

import Car from '../../components/Car'
import { useLanguage } from '../../context/LanguageContext'

export default function CarPage() {
  const { t } = useLanguage()
  const s = t.carStory

  return (
    <div className="pt-16 bg-navy-dark min-h-screen">
      <Car fullPage />

      <section className="py-24 md:py-32 px-6 bg-navy">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-6">{s.eyebrow}</p>
          <div className="w-10 h-px bg-gold mb-10" />
          <div className="space-y-6">
            {s.paragraphs.map((para, i) => (
              <p key={i} className="text-white/65 text-base md:text-lg leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
