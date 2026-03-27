import Script from 'next/script'
import { Inter } from 'next/font/google'
import Providers from './Providers'
import '../index.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

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
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
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
