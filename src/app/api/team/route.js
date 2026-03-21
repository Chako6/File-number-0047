import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return Response.json([])
  }

  const { searchParams } = new URL(req.url)
  const season = searchParams.get('season') || ''

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
  })

  const builder = createImageUrlBuilder(client)

  try {
    const data = await client.fetch(
      `*[_type == "teamMember" && season == $season] | order(order asc) {
        name, role_en, role_tr, dept, photo, linkedin
      }`,
      { season }
    )
    const normalized = data.map((m) => ({
      name: m.name,
      role_en: m.role_en || '',
      role_tr: m.role_tr || m.role_en || '',
      dept: m.dept,
      photo: m.photo ? builder.image(m.photo).url() : null,
      linkedin: m.linkedin || null,
    }))
    return Response.json(normalized)
  } catch (err) {
    console.error('Sanity team fetch failed:', err)
    return Response.json([])
  }
}
