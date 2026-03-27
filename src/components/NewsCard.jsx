'use client'

import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

const formatDate = (dateStr, lang) => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function NewsCard({ post, href }) {
  const { lang, t } = useLanguage()
  const categoryLabel = t.newsPage.categories[post.category]

  const Wrapper = href ? Link : 'div'
  const wrapperProps = href ? { href } : {}

  const imageSrc = post.image
    ? (typeof post.image === 'object' && post.image.src ? post.image.src : post.image)
    : null

  return (
    <Wrapper
      {...wrapperProps}
      className="flex flex-col border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-[0_4px_24px_rgba(201,168,76,0.08)] group"
    >
      {imageSrc ? (
        <div className="h-48 overflow-hidden flex-shrink-0">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-48 bg-navy flex-shrink-0 flex items-center justify-center">
          <span className="text-white/15 text-xs font-bold tracking-widest uppercase">
            {categoryLabel}
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gold text-[10px] font-bold tracking-widest uppercase">
            {categoryLabel}
          </span>
          <span className="text-navy/35 text-[10px] tracking-wider">
            {formatDate(post.date, lang)}
          </span>
        </div>

        <div className="w-6 h-px bg-gold mb-4" />

        <h3 className="text-navy text-sm font-bold leading-snug mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.description}
        </p>

        {href && (
          <span className="mt-auto text-[10px] font-bold tracking-widest uppercase text-gold/70 group-hover:text-gold transition-colors duration-200">
            Read More →
          </span>
        )}
      </div>
    </Wrapper>
  )
}
