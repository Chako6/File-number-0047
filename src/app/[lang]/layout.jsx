import { notFound } from 'next/navigation'
import Providers from '../Providers'

const LOCALES = ['en', 'tr']
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.vercel.app'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export function generateMetadata({ params }) {
  const { lang } = params
  return {
    alternates: {
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
