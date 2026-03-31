'use client'

import { useEffect } from 'react'

const GA_ID = 'G-7KVELH67VC'

function loadGA() {
  if (typeof window === 'undefined' || window.__gaLoaded) return
  window.__gaLoaded = true

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

function readAnalyticsConsent() {
  if (typeof document === 'undefined') return false
  const match = document.cookie.match(/(?:^|; )buracing_consent=([^;]*)/)
  if (!match) return false
  try { return JSON.parse(decodeURIComponent(match[1]))?.analytics === true } catch { return false }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (readAnalyticsConsent()) loadGA()

    const handler = (e) => {
      if (e.detail?.analytics) loadGA()
    }
    window.addEventListener('consentUpdated', handler)
    return () => window.removeEventListener('consentUpdated', handler)
  }, [])

  return null
}
