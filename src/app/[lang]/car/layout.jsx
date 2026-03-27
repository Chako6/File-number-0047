const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.com'

export function generateMetadata({ params }) {
  const { lang } = params
  return {
    title: 'Our Car',
    description:
      'Our formula-style race car is designed and built entirely by Boğaziçi University students for the Formula Student competition. Follow our development progress.',
    openGraph: {
      title: 'Our Car | Boğaziçi Racing',
      description:
        'Our formula-style race car is designed and built entirely by Boğaziçi University students for the Formula Student competition.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/car`,
      languages: {
        en: `${SITE_URL}/en/car`,
        tr: `${SITE_URL}/tr/car`,
        'x-default': `${SITE_URL}/en/car`,
      },
    },
  }
}

export default function CarLayout({ children }) {
  return children
}
