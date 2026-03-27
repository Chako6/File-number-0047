const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.com'

export function generateMetadata({ params }) {
  const { lang } = params
  return {
    title: 'Meet the Team',
    description:
      'Meet the students behind Boğaziçi Racing — mechanical, software, and operations engineers working together to build and race a Formula Student car.',
    openGraph: {
      title: 'Meet the Team | Boğaziçi Racing',
      description:
        'Meet the students behind Boğaziçi Racing — mechanical, software, and operations engineers working together to build and race a Formula Student car.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/team`,
      languages: {
        en: `${SITE_URL}/en/team`,
        tr: `${SITE_URL}/tr/team`,
        'x-default': `${SITE_URL}/en/team`,
      },
    },
  }
}

export default function TeamLayout({ children }) {
  return children
}
