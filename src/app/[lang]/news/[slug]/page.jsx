import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { translations } from '../../../../i18n/translations'

async function getPost(slug) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      useCdn: false,
      apiVersion: '2025-03-21',
      perspective: 'published',
    })
    const builder = createImageUrlBuilder(client)
    const p = await client.fetch(
      `*[_type == "news" && slug.current == $slug][0] {
        "slug": slug.current, category, date, image,
        title_en, title_tr, description_en, description_tr,
        body_en, body_tr
      }`,
      { slug }
    )
    if (!p) return null
    return {
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
    }
  } catch (err) {
    console.error('News detail SSR fetch failed:', err)
    return null
  }
}

function formatDate(dateStr, lang) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function extractBlocks(blocks) {
  if (!blocks) return []
  if (typeof blocks[0] === 'string') return blocks
  return blocks
    .map((b) => b.children?.map((c) => c.text).join('') || '')
    .filter(Boolean)
}

export default async function NewsDetail({ params }) {
  const { lang, slug } = params
  const post = await getPost(slug)

  if (!post) notFound()

  const t = translations[lang] || translations.en
  const categoryLabel = t.newsPage.categories[post.category]
  const postTitle = post[`title_${lang}`] || post.title_en || ''
  const postDesc  = post[`description_${lang}`] || post.description_en || ''
  const postBody  = extractBlocks(post[`body_${lang}`] || post.body_en)
  const postImage = post.image || null

  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="bg-navy py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <Link
              href={`/${lang}/news`}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors duration-200 text-white/35 hover:text-gold"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {lang === 'tr' ? 'Haberlere Dön' : 'Back to News'}
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-gold text-[10px] font-bold tracking-widest uppercase">{categoryLabel}</span>
            <span className="text-white/20 text-[10px]">·</span>
            <span className="text-white/35 text-[10px] tracking-wider">{formatDate(post.date, lang)}</span>
          </div>

          <div className="w-8 h-px bg-gold mb-8" />
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">{postTitle}</h1>
          <p className="text-white/55 text-base leading-relaxed max-w-2xl">{postDesc}</p>
        </div>
      </div>

      {postImage && (
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-2">
          <img src={postImage} alt={postTitle} className="w-full h-auto block" decoding="async" loading="lazy" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-5">
          {postBody.map((para, i) => (
            <p key={i} className="text-gray-600 text-base leading-relaxed">{para}</p>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href={`/${lang}/news`} className="inline-flex items-center gap-2 text-navy/40 hover:text-gold text-[10px] font-bold tracking-widest uppercase transition-colors duration-200">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {lang === 'tr' ? 'Haberlere Dön' : 'Back to News'}
          </Link>
        </div>
      </div>
    </div>
  )
}
