const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.com'

export function generateMetadata({ params }) {
  const { lang } = params
  return {
    title: 'Contact',
    description:
      'Get in touch with Boğaziçi Racing for sponsorship enquiries, general questions, or joining the team.',
    openGraph: {
      title: 'Contact | Boğaziçi Racing',
      description:
        'Get in touch with Boğaziçi Racing for sponsorship enquiries, general questions, or joining the team.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        tr: `${SITE_URL}/tr/contact`,
        'x-default': `${SITE_URL}/en/contact`,
      },
    },
  }
}

export default function ContactLayout({ children }) {
  return children
}
