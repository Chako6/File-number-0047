'use client'

import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import NewsCard from './NewsCard'
import { newsPosts } from '../data/news'

const latestPosts = [...newsPosts]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)

export default function LatestNews() {
  const { t } = useLanguage()
  const n = t.latestNews

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
          {latestPosts.map((post) => (
            <NewsCard key={post.id} post={post} href={`/news/${post.slug}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
