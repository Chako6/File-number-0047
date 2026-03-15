import { Link, useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { newsPosts } from '../data/news';

const formatDate = (dateStr, lang) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const BackLink = () => (
  <Link
    to="/news"
    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors duration-200 text-white/35 hover:text-gold"
  >
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Back to News
  </Link>
);

export default function NewsDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const post = newsPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/news" replace />;

  const categoryLabel = t.newsPage.categories[post.category];

  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Article header — dark band */}
      <div className="bg-navy py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <BackLink />
          </div>

          {/* Category · Date */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-gold text-[10px] font-bold tracking-widest uppercase">
              {categoryLabel}
            </span>
            <span className="text-white/20 text-[10px]">·</span>
            <span className="text-white/35 text-[10px] tracking-wider">
              {formatDate(post.date, lang)}
            </span>
          </div>

          <div className="w-8 h-px bg-gold mb-8" />

          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-white/55 text-base leading-relaxed max-w-2xl">
            {post.description}
          </p>
        </div>
      </div>

      {/* Article image — natural size, no crop */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-2">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto block"
          />
        </div>
      )}

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-5">
          {post.body.map((para, i) => (
            <p key={i} className="text-gray-600 text-base leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-navy/40 hover:text-gold text-[10px] font-bold tracking-widest uppercase transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>
        </div>
      </div>
    </div>
  );
}
