'use client'

import { LanguageProvider } from '../context/LanguageContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import LangSync from '../components/LangSync'
import CookieConsent from '../components/CookieConsent'
import GoogleAnalytics from '../components/GoogleAnalytics'

export default function Providers({ lang, children }) {
  return (
    <LanguageProvider lang={lang}>
      <LangSync />
      <ScrollToTop />
      <GoogleAnalytics />
      <Navbar />
      <div className="font-sans">{children}</div>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  )
}
