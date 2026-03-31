const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.com'

export function generateMetadata({ params }) {
  const { lang } = params
  const isEN = lang === 'en'
  return {
    title: isEN ? 'Privacy Policy' : 'Gizlilik Politikası & KVKK',
    description: isEN
      ? 'Privacy Policy and Cookie Policy for Boğaziçi Racing.'
      : 'Boğaziçi Racing Gizlilik Politikası ve KVKK Aydınlatma Metni.',
    alternates: {
      canonical: `${SITE_URL}/${lang}/privacy`,
      languages: {
        en: `${SITE_URL}/en/privacy`,
        tr: `${SITE_URL}/tr/privacy`,
        'x-default': `${SITE_URL}/en/privacy`,
      },
    },
  }
}

export default function PrivacyLayout({ children }) {
  return children
}
