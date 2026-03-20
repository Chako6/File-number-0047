'use client'

import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const cardIcons = {
  email: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  join: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  location: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bogaziciracing?igsh=MWkxbWV0bzU4Y2l5Zg%3D%3D&utm_source=qr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Bo%C4%9Fazi%C3%A7iRacing',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/buracing/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const { t } = useLanguage()
  const p = t.contactPage
  const f = p.form
  const [formState, setFormState] = useState({ name: '', email: '', message: '', type: 'general' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (res.ok) {
        setStatus('success')
        setFormState({ name: '', email: '', message: '', type: 'general' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-16">
      {/* Page banner */}
      <div className="bg-navy py-24 md:py-32 px-6 text-center">
        <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-5">{p.eyebrow}</p>
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">{p.title}</h1>
        <div className="w-10 h-px bg-gold mx-auto mb-10" />
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">{p.intro}</p>
      </div>

      {/* Contact cards */}
      <div className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {p.cards.map((card) => (
            <div
              key={card.id}
              className="border border-gray-100 hover:border-gold/40 p-8 md:p-10 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(201,168,76,0.08)] flex flex-col"
            >
              <div className="text-gold mb-6">{cardIcons[card.icon]}</div>
              <h2 className="text-navy text-base font-bold tracking-wider uppercase mb-4">
                {card.title}
              </h2>
              <div className="w-8 h-px bg-gold mb-5" />
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">{card.body}</p>
              <a
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block px-6 py-2.5 border border-navy text-navy text-xs font-bold tracking-widest uppercase hover:bg-navy hover:text-white transition-all duration-300 text-center"
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="py-24 md:py-32 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h2 className="text-navy text-2xl md:text-3xl font-bold mb-4">{f.title}</h2>
            <div className="w-8 h-px bg-gold" />
          </div>

          {status === 'success' ? (
            <p className="text-navy font-semibold py-8 text-center">{f.success}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-navy text-[11px] font-bold tracking-widest uppercase mb-2">{f.name}</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    className="w-full border border-gray-200 focus:border-navy px-4 py-3 text-sm text-navy outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-navy text-[11px] font-bold tracking-widest uppercase mb-2">{f.email}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    className="w-full border border-gray-200 focus:border-navy px-4 py-3 text-sm text-navy outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-navy text-[11px] font-bold tracking-widest uppercase mb-2">{f.typeLabel}</label>
                <div className="flex gap-0">
                  {Object.entries(f.types).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormState((s) => ({ ...s, type: key }))}
                      className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase border transition-colors duration-200 ${
                        formState.type === key
                          ? 'bg-navy text-white border-navy'
                          : 'border-navy/20 text-navy/55 hover:border-navy/50 hover:text-navy'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-navy text-[11px] font-bold tracking-widest uppercase mb-2">{f.message}</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full border border-gray-200 focus:border-navy px-4 py-3 text-sm text-navy outline-none transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">{f.error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3 bg-navy text-white text-xs font-bold tracking-widest uppercase hover:bg-navy/80 transition-colors duration-300 disabled:opacity-60"
              >
                {status === 'sending' ? f.sending : f.submit}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Follow us */}
      <div className="py-16 px-6 bg-white border-t border-gray-100 text-center">
        <p className="text-navy text-xs font-bold tracking-widest uppercase mb-6">{p.followTitle}</p>
        <div className="flex justify-center gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 border border-navy/20 flex items-center justify-center text-navy/50 hover:text-gold hover:border-gold transition-all duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
