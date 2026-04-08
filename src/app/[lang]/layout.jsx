import { notFound } from 'next/navigation'
import Providers from '../Providers'

const LOCALES = ['en', 'tr']
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.com'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

const descriptions = {
  en: 'Boğaziçi Racing — Formula Student Team of Boğaziçi University. We design, build, and race a formula-style car from the ground up.',
  tr: 'Boğaziçi Racing — Boğaziçi Üniversitesi Formula Student Takımı. Sıfırdan tasarlayıp ürettiğimiz yarış aracıyla uluslararası rekabete hazırlanıyoruz.',
}

export function generateMetadata({ params }) {
  const { lang } = params
  return {
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        en: `${SITE_URL}/en`,
        tr: `${SITE_URL}/tr`,
        'x-default': `${SITE_URL}/en`,
      },
    },
  }
}

export default function LangLayout({ children, params }) {
  const { lang } = params
  if (!LOCALES.includes(lang)) notFound()
  return <Providers lang={lang}>{children}</Providers>
}
