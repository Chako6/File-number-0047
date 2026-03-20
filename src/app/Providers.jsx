'use client'

import { LanguageProvider } from '../context/LanguageContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Navbar />
      <div className="font-sans">{children}</div>
      <Footer />
    </LanguageProvider>
  )
}
