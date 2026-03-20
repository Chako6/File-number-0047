import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : null

const builder = client ? imageUrlBuilder(client) : null
export const urlFor = (source) => builder ? builder.image(source) : { url: () => null }
