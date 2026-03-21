'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import NewsCard from './NewsCard'

function SkeletonCard() {
  return (
    <div className="animate-pulse border border-white/10 bg-white/5">
      <div className="h-48 bg-white/10" />
      <div className="p-6 space-y-3">
        <div className="h-2.5 w-1/4 bg-white/10 rounded" />
        <div className="h-4 w-5/6 bg-white/10 rounded" />
        <div className="h-3 w-full bg-white/10 rounded" />
        <div className="h-3 w-4/5 bg-white/10 rounded" />
      </div>
    </div>
  )
}

export default function LatestNews() {
  const { t, lang } = useLanguage()
  const n = t.latestNews
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) { setPosts([]); return }
        const latest = [...data]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3)
          .map((p) => ({
            id: p.slug,
            slug: p.slug,
            category: p.category,
            date: p.date,
            image: p.image || null,
            title: p[`title_${lang}`] || p.title_en || '',
            description: p[`description_${lang}`] || p.description_en || '',
          }))
        setPosts(latest)
      })
      .catch(() => setPosts([]))
  }, [lang])

  return (
    <section className="py-24 md:py-32 px-6 bg-navy">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">{n.eyebrow}</p>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">{n.title}</h2>
            <div className="w-10 h-px bg-gold mt-6" />
          </div>

          <Link
            href="/news"
            className="self-start md:self-auto inline-block px-8 py-3 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {n.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts === null
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post) => (
                <NewsCard key={post.id} post={post} href={`/news/${post.slug}`} />
              ))
          }
        </div>
      </div>
    </section>
  )
}
