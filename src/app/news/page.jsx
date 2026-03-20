'use client'

import { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import NewsCard from '../../components/NewsCard'
import { newsPosts, NEWS_CATEGORIES } from '../../data/news'
import { client, urlFor } from '../../lib/sanity'

const SANITY_QUERY = `*[_type == "news"] | order(date desc) {
  "slug": slug.current, category, date, image,
  title_en, title_tr, description_en, description_tr
}`

function normalizePost(post, lang) {
  if (post.title) return post // already static format
  return {
    id: post.slug,
    slug: post.slug,
    category: post.category,
    date: post.date,
    image: post.image ? urlFor(post.image).url() : null,
    title: post[`title_${lang}`] || post.title_en || '',
    description: post[`description_${lang}`] || post.description_en || '',
    body: [],
  }
}

const staticSorted = [...newsPosts].sort((a, b) => new Date(b.date) - new Date(a.date))

export default function News() {
  const { t, lang } = useLanguage()
  const n = t.newsPage
  const [rawSanity, setRawSanity] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return
    client.fetch(SANITY_QUERY)
      .then((data) => { if (data?.length) setRawSanity(data) })
      .catch(() => {})
  }, [])

  const allPosts = useMemo(() => {
    if (!rawSanity) return staticSorted
    return rawSanity.map((p) => normalizePost(p, lang))
  }, [rawSanity, lang])

  const filteredPosts =
    activeCategory === 'all'
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

          <p className="text-navy/35 text-xs tracking-wider text-center mb-8">
            {filteredPosts.length} {filteredPosts.length === 1 ? n.post : n.posts}
          </p>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <NewsCard key={post.id} post={post} href={`/news/${post.slug}`} />
              ))}
            </div>
          ) : (
            <p className="text-center text-navy/40 text-sm py-20">{n.noItems}</p>
          )}
        </div>
      </div>
    </div>
  )
}
