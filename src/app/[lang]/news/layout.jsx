const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.vercel.app'

export function generateMetadata({ params }) {
  const { lang } = params
  return {
    title: 'News',
    description:
      'Latest news and updates from Boğaziçi Racing — sponsorships, team milestones, development progress, and competition results.',
    openGraph: {
      title: 'News | Boğaziçi Racing',
      description:
        'Latest news and updates from Boğaziçi Racing — sponsorships, team milestones, development progress, and competition results.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/news`,
      languages: {
        en: `${SITE_URL}/en/news`,
        tr: `${SITE_URL}/tr/news`,
        'x-default': `${SITE_URL}/en/news`,
      },
    },
  }
}

export default function NewsLayout({ children }) {
  return children
}
