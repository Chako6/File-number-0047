'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useLanguage } from '../../../context/LanguageContext'
import { newsPosts } from '../../../data/news'

const formatDate = (dateStr, lang) => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// Extract plain text from Sanity block content
function extractBlocks(blocks) {
  if (!blocks) return []
  if (typeof blocks[0] === 'string') return blocks // static format
  return blocks
    .map((b) => b.children?.map((c) => c.text).join('') || '')
    .filter(Boolean)
}

const BackLink = () => (
  <Link
    href="/news"
    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors duration-200 text-white/35 hover:text-gold"
  >
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Back to News
  </Link>
)

export default function NewsDetail() {
  const { slug } = useParams()
  const router = useRouter()
  const { lang, t } = useLanguage()

  const staticPost = newsPosts.find((p) => p.slug === slug)
  const [post, setPost] = useState(staticPost || null)
  const [loading, setLoading] = useState(!staticPost)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    fetch(`/api/news/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setPost({
            slug: data.slug,
            category: data.category,
            date: data.date,
            image: data.image || null,
            title: data[`title_${lang}`] || data.title_en || '',
            description: data[`description_${lang}`] || data.description_en || '',
            body: extractBlocks(data[`body_${lang}`] || data.body_en),
          })
        } else if (!staticPost) {
          router.replace('/news')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug, lang, staticPost, router])

  if (loading) return null
  if (!post) return null

  const categoryLabel = t.newsPage.categories[post.category]
  const postTitle = post.title_en ? (post[`title_${lang}`] || post.title_en) : post.title
  const postDesc  = post.description_en ? (post[`description_${lang}`] || post.description_en) : post.description
  const postBody  = post.body_en ? extractBlocks(post[`body_${lang}`] || post.body_en) : (post.body || [])
  const postImage = post.image && typeof post.image === 'object' && !post.image._type
    ? (post.image.src || post.image)
    : post.image

  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="bg-navy py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10"><BackLink /></div>

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
          <img src={postImage} alt={postTitle} className="w-full h-auto block" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-5">
          {postBody.map((para, i) => (
            <p key={i} className="text-gray-600 text-base leading-relaxed">{para}</p>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/news" className="inline-flex items-center gap-2 text-navy/40 hover:text-gold text-[10px] font-bold tracking-widest uppercase transition-colors duration-200">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>
        </div>
      </div>
    </div>
  )
}
