const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.vercel.app'

export function generateMetadata({ params }) {
  const { lang } = params
  return {
    title: 'Our Sponsors',
    description:
      'Meet the partners and sponsors who support Boğaziçi Racing. Interested in sponsoring a Formula Student team from Boğaziçi University? Get in touch.',
    openGraph: {
      title: 'Our Sponsors | Boğaziçi Racing',
      description:
        'Meet the partners and sponsors who support Boğaziçi Racing. Interested in sponsoring? Get in touch.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/sponsors`,
      languages: {
        en: `${SITE_URL}/en/sponsors`,
        tr: `${SITE_URL}/tr/sponsors`,
        'x-default': `${SITE_URL}/en/sponsors`,
      },
    },
  }
}

export default function SponsorsLayout({ children }) {
  return children
}
