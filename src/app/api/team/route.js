import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return Response.json([])
  }

  const { searchParams } = new URL(req.url)
  const season = searchParams.get('season') || ''

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

  console.log('[api/team] projectId:', projectId, 'dataset:', dataset, 'season:', season)

  try {
    const data = await client.fetch(
      `*[_type == "teamMember" && season == $season] | order(order asc) {
        name, role_en, role_tr, dept, photo, linkedin
      }`,
      { season },
      { cache: 'no-store' }
    )
    console.log('[api/team] raw Sanity response:', JSON.stringify(data))
    const normalized = data.map((m) => ({
      name: m.name,
      role_en: m.role_en || '',
      role_tr: m.role_tr || m.role_en || '',
      dept: m.dept,
      photo: m.photo ? builder.image(m.photo).url() : null,
      linkedin: m.linkedin || null,
    }))
    return new Response(JSON.stringify(normalized), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (err) {
    console.error('Sanity team fetch failed:', err)
    return Response.json([])
  }
}
