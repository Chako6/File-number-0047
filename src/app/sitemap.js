import { createClient } from '@sanity/client'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.vercel.app'

const staticRoutes = [
  { url: `${SITE_URL}/`,         priority: 1.0,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/team`,     priority: 0.8,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/car`,      priority: 0.8,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/news`,     priority: 0.9,  changeFrequency: 'weekly'  },
  { url: `${SITE_URL}/sponsors`, priority: 0.7,  changeFrequency: 'monthly' },
  { url: `${SITE_URL}/contact`,  priority: 0.6,  changeFrequency: 'yearly'  },
]

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

    newsRoutes = posts.map((p) => ({
      url: `${SITE_URL}/news/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      priority: 0.7,
      changeFrequency: 'monthly',
    }))
  } catch {
    // Sitemap generation continues without news if Sanity is unavailable
  }

  return [
    ...staticRoutes.map((r) => ({ ...r, lastModified: new Date() })),
    ...newsRoutes,
  ]
}
