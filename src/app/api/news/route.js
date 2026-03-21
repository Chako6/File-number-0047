import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return Response.json([])
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion: '2025-03-21',
    perspective: 'published',
  })

  const builder = createImageUrlBuilder(client)

  try {
    const data = await client.fetch(
      `*[_type == "news"] | order(date desc) {
        "slug": slug.current, category, date, image,
        title_en, title_tr, description_en, description_tr
      }`,
      {},
      { cache: 'no-store' }
    )
    const normalized = data.map((p) => ({
      slug: p.slug,
      category: p.category,
      date: p.date,
      image: p.image ? builder.image(p.image).url() : null,
      title_en: p.title_en || '',
      title_tr: p.title_tr || p.title_en || '',
      description_en: p.description_en || '',
      description_tr: p.description_tr || p.description_en || '',
    }))
    return new Response(JSON.stringify(normalized), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (err) {
    console.error('Sanity news fetch failed:', err)
    return Response.json([])
  }
}
