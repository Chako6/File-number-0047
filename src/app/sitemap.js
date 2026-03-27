import { createClient } from '@sanity/client'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.vercel.app'
const LOCALES = ['en', 'tr']

const staticPages = [
  { path: '',         priority: 1.0, changeFrequency: 'monthly' },
  { path: '/team',    priority: 0.8, changeFrequency: 'monthly' },
  { path: '/car',     priority: 0.8, changeFrequency: 'monthly' },
  { path: '/news',    priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/sponsors',priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly'  },
]

const staticRoutes = LOCALES.flatMap((lang) =>
  staticPages.map((p) => ({
    url: `${SITE_URL}/${lang}${p.path}`,
    priority: p.priority,
    changeFrequency: p.changeFrequency,
  }))
)

export default async function sitemap() {
  let newsRoutes = []

  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      useCdn: false,
      apiVersion: '2025-03-22',
    })

    const posts = await client.fetch(
      `*[_type == "news"] | order(date desc) { "slug": slug.current, date }`,
      {},
      { cache: 'no-store' }
    )

    newsRoutes = LOCALES.flatMap((lang) =>
      posts.map((p) => ({
        url: `${SITE_URL}/${lang}/news/${p.slug}`,
        lastModified: p.date ? new Date(p.date) : new Date(),
        priority: 0.7,
        changeFrequency: 'monthly',
      }))
    )
  } catch {
    // Sitemap generation continues without news if Sanity is unavailable
  }

  return [
    ...staticRoutes.map((r) => ({ ...r, lastModified: new Date() })),
    ...newsRoutes,
  ]
}
