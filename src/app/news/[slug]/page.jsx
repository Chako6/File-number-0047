'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useLanguage } from '../../../context/LanguageContext'

const formatDate = (dateStr, lang) => {
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

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/news/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setPost(data)
        } else {
          router.replace('/news')
        }
        setLoading(false)
      })
      .catch(() => { router.replace('/news') })
  }, [slug, router])

  // Full-height skeleton — keeps viewport filled so scroll position stays at 0
  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-navy animate-pulse">
        <div className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="h-3 w-16 bg-white/10 rounded mb-10" />
            <div className="h-3 w-24 bg-white/10 rounded mb-5" />
            <div className="w-8 h-px bg-gold/30 mb-8" />
            <div className="h-8 w-4/5 bg-white/10 rounded mb-3" />
            <div className="h-8 w-2/3 bg-white/10 rounded mb-6" />
            <div className="h-4 w-full bg-white/10 rounded mb-2" />
            <div className="h-4 w-5/6 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) return null

  const categoryLabel = t.newsPage.categories[post.category]
  const postTitle = post[`title_${lang}`] || post.title_en || ''
  const postDesc  = post[`description_${lang}`] || post.description_en || ''
  const postBody  = extractBlocks(post[`body_${lang}`] || post.body_en)
  const postImage = post.image || null

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
