const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.vercel.app'

export function generateMetadata({ params }) {
  const { lang, slug } = params
  return {
    title: 'News',
    description: 'Read the latest news and updates from Boğaziçi Racing.',
    openGraph: {
      title: 'News | Boğaziçi Racing',
      description: 'Read the latest news and updates from Boğaziçi Racing.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/news/${slug}`,
      languages: {
        en: `${SITE_URL}/en/news/${slug}`,
        tr: `${SITE_URL}/tr/news/${slug}`,
        'x-default': `${SITE_URL}/en/news/${slug}`,
      },
    },
  }
}

export default function NewsDetailLayout({ children }) {
  return children
}
