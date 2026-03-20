import Providers from './Providers'
import '../index.css'

export const metadata = {
  title: 'Boğaziçi Racing',
  description:
    'Boğaziçi Racing — Formula Student Team of Boğaziçi University. We design, build, and race a formula-style car from the ground up.',
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
      </body>
    </html>
  )
}
