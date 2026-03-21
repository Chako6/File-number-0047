import Script from 'next/script'
import Providers from './Providers'
import '../index.css'

const GA_ID = 'G-7KVELH67VC'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.vercel.app'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Boğaziçi Racing',
    template: '%s | Boğaziçi Racing',
  },
  description:
    'Boğaziçi Racing — Formula Student Team of Boğaziçi University. We design, build, and race a formula-style car from the ground up.',
  keywords: ['Formula Student', 'Boğaziçi University', 'Racing', 'Engineering', 'FSAE'],
  openGraph: {
    siteName: 'Boğaziçi Racing',
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    title: 'Boğaziçi Racing',
    description:
      'Boğaziçi Racing — Formula Student Team of Boğaziçi University. We design, build, and race a formula-style car from the ground up.',
    images: [{ url: '/images/logo.jpg', width: 1200, height: 630, alt: 'Boğaziçi Racing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boğaziçi Racing',
    description: 'Formula Student Team of Boğaziçi University.',
    images: ['/images/logo.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="icon" type="image/jpeg" href="/images/logo.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
