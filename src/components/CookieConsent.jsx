'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

const COOKIE_NAME = 'buracing_consent'
const MAX_AGE = 60 * 60 * 24 * 365

function readConsent() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|; )buracing_consent=([^;]*)/)
  if (!match) return null
  try { return JSON.parse(decodeURIComponent(match[1])) } catch { return null }
}

function writeConsent(prefs) {
  const value = encodeURIComponent(JSON.stringify({ essential: true, ...prefs }))
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${MAX_AGE}; path=/; SameSite=Lax`
  window.dispatchEvent(new CustomEvent('consentUpdated', { detail: { essential: true, ...prefs } }))
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`w-9 h-5 rounded-full relative flex items-center px-0.5 transition-colors duration-200 shrink-0 ${
        checked ? 'bg-gold' : 'bg-white/20'
      }`}
    >
      <span
        className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? 'translate-x-4' : ''
        }`}
      />
    </button>
  )
}

export default function CookieConsent() {
  const { lang, t } = useLanguage()
  const c = t.cookieBanner
  const [visible, setVisible] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!readConsent()) setVisible(true)
  }, [])

  const save = (prefs) => {
    writeConsent(prefs)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-navy border-t-2 border-gold/30 shadow-[0_-4px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">

          {/* Left: text + toggles */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm tracking-wider mb-1">{c.title}</p>
            <p className="text-white/60 text-xs leading-relaxed mb-5">
              {c.body}{' '}
              <Link href={`/${lang}/privacy`} className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">
                {c.policyLinkText}
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Essential — always on */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-5 rounded-full bg-gold/40 flex items-center px-0.5 shrink-0 mt-0.5">
                  <span className="w-4 h-4 bg-gold rounded-full ml-auto shadow" />
                </div>
                <div className="text-xs">
                  <span className="text-white font-semibold">{c.essential.label}</span>
                  <span className="text-white/45"> — {c.essential.desc}</span>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-3">
                <Toggle checked={analytics} onChange={() => setAnalytics((v) => !v)} />
                <div className="text-xs mt-0.5">
                  <span className="text-white font-semibold">{c.analytics.label}</span>
                  <span className="text-white/45"> — {c.analytics.desc}</span>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start gap-3">
                <Toggle checked={marketing} onChange={() => setMarketing((v) => !v)} />
                <div className="text-xs mt-0.5">
                  <span className="text-white font-semibold">{c.marketing.label}</span>
                  <span className="text-white/45"> — {c.marketing.desc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex flex-row lg:flex-col gap-2 shrink-0 lg:w-44">
            <button
              onClick={() => save({ analytics: true, marketing: true })}
              className="flex-1 lg:flex-none px-4 py-2.5 bg-gold text-navy text-[11px] font-bold tracking-widest uppercase hover:bg-gold/90 transition-colors"
            >
              {c.acceptAll}
            </button>
            <button
              onClick={() => save({ analytics, marketing })}
              className="flex-1 lg:flex-none px-4 py-2.5 border border-gold/50 text-gold text-[11px] font-bold tracking-widest uppercase hover:border-gold transition-colors"
            >
              {c.acceptSelected}
            </button>
            <button
              onClick={() => save({ analytics: false, marketing: false })}
              className="flex-1 lg:flex-none px-4 py-2.5 border border-white/15 text-white/50 text-[11px] font-bold tracking-widest uppercase hover:border-white/30 hover:text-white/70 transition-colors"
            >
              {c.rejectAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
