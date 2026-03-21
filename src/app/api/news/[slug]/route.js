import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const dynamic = 'force-dynamic'

export async function GET(req, { params }) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return Response.json(null)
  }

  const { slug } = params
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
    const p = await client.fetch(
      `*[_type == "news" && slug.current == $slug][0] {
        "slug": slug.current, category, date, image,
        title_en, title_tr, description_en, description_tr,
        body_en, body_tr
      }`,
      { slug },
      { cache: 'no-store' }
    )
    if (!p) {
      return Response.json(null)
    }
    return new Response(JSON.stringify({
      slug: p.slug,
      category: p.category,
      date: p.date,
      image: p.image ? builder.image(p.image).url() : null,
      title_en: p.title_en || '',
      title_tr: p.title_tr || p.title_en || '',
      description_en: p.description_en || '',
      description_tr: p.description_tr || p.description_en || '',
      body_en: p.body_en || [],
      body_tr: p.body_tr || p.body_en || [],
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (err) {
    console.error('Sanity news detail fetch failed:', err)
    return Response.json(null)
  }
}
