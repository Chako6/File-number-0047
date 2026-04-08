import { createClient } from '@sanity/client'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bogaziciracing.com'

async function getPostMeta(slug) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      useCdn: false,
      apiVersion: '2025-03-21',
      perspective: 'published',
    })
    return await client.fetch(
      `*[_type == "news" && slug.current == $slug][0] {
        title_en, title_tr, description_en, description_tr,
        "imageUrl": image.asset->url
      }`,
      { slug }
    )
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const { lang, slug } = params
  const post = await getPostMeta(slug)

  const title = post?.[`title_${lang}`] || post?.title_en || 'News'
  const description =
    post?.[`description_${lang}`] || post?.description_en ||
    'Read the latest news and updates from Boğaziçi Racing.'
  const imageUrl = post?.imageUrl || null

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Boğaziçi Racing`,
      description,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/news/${slug}`,
      languages: {
        en: `${SITE_URL}/en/news/${slug}`,
        tr: `${SITE_URL}/tr/news/${slug}`,
        'x-default': `${SITE_URL}/en/news/${slug}`,
      },
    },
  }
}

export default function NewsDetailLayout({ children }) {
  return children
}
