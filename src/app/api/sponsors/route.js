import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return Response.json([])
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
  })

  const builder = createImageUrlBuilder(client)

  try {
    const data = await client.fetch(
      `*[_type == "sponsor"] | order(order asc) { name, logo, url, tier }`
    )
    const normalized = data.map((s) => ({
      name: s.name,
      logo: s.logo ? builder.image(s.logo).url() : null,
      url: s.url || '#',
      tier: s.tier,
    }))
    return Response.json(normalized)
  } catch (err) {
    console.error('Sanity sponsors fetch failed:', err)
    return Response.json([])
  }
}
