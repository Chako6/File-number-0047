'use client'

import { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import NewsCard from '../../components/NewsCard'
import { NEWS_CATEGORIES } from '../../data/news'

function normalizePost(post, lang) {
  return {
    id: post.slug,
    slug: post.slug,
    category: post.category,
    date: post.date,
    image: post.image || null,
    title: post[`title_${lang}`] || post.title_en || '',
    description: post[`description_${lang}`] || post.description_en || '',
    body: [],
  }
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 w-full mb-4" style={{ aspectRatio: '16/10' }} />
      <div className="space-y-2">
        <div className="bg-gray-200 h-3 w-1/4 rounded" />
        <div className="bg-gray-200 h-5 w-5/6 rounded" />
        <div className="bg-gray-200 h-3 w-full rounded" />
        <div className="bg-gray-200 h-3 w-4/5 rounded" />
      </div>
    </div>
  )
}

export default function News() {
  const { t, lang } = useLanguage()
  const n = t.newsPage
  const [rawPosts, setRawPosts] = useState(null) // null = loading
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => setRawPosts(Array.isArray(data) ? data : []))
      .catch(() => setRawPosts([]))
  }, [])

  const allPosts = useMemo(() => {
    if (rawPosts === null) return null
    return rawPosts.map((p) => normalizePost(p, lang))
  }, [rawPosts, lang])

  const filteredPosts = allPosts === null
    ? null
    : activeCategory === 'all'
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory)

  const filterBtnClass = (isActive) =>
    `px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 border ${
      isActive
        ? 'bg-navy text-white border-navy'
        : 'border-navy/20 text-navy/55 hover:border-navy/50 hover:text-navy'
    }`

  return (
    <div className="pt-16">
      <div className="bg-navy py-24 md:py-32 px-6 text-center">
        <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-5">{n.eyebrow}</p>
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">{n.title}</h1>
        <div className="w-10 h-px bg-gold mx-auto mb-10" />
        <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          {n.intro}
        </p>
      </div>

      <div className="py-16 md:py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button onClick={() => setActiveCategory('all')} className={filterBtnClass(activeCategory === 'all')}>
              {n.all}
            </button>
            {NEWS_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={filterBtnClass(activeCategory === cat)}>
                {n.categories[cat]}
              </button>
            ))}
          </div>

          {filteredPosts === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              <p className="text-navy/35 text-xs tracking-wider text-center mb-8">
                {filteredPosts.length} {filteredPosts.length === 1 ? n.post : n.posts}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <NewsCard key={post.id} post={post} href={`/news/${post.slug}`} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-navy/40 text-sm py-20">{n.noItems}</p>
          )}
        </div>
      </div>
    </div>
  )
}
