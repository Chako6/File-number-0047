'use client'

import { useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const VIDEO_SRC = '/images/Video%20Project%20Car%20Bogazici%20Racing%20under%20Development.mp4'

export default function Car({ fullPage = false }) {
  const { t } = useLanguage();
  const c = t.car;
  const videoRef    = useRef(null);
  const hasPlayedRef = useRef(false);
  const wrapperRef  = useRef(null);

  useEffect(() => {
    const video   = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const onEnded = () => { hasPlayedRef.current = true; };
    video.addEventListener('ended', onEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasPlayedRef.current) video.play().catch(() => {});
        } else {
          if (!hasPlayedRef.current) video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">

      {/* ── MOBILE LAYOUT (hidden on md+) ─────────────────────────────────── */}
      <div className="md:hidden">
        {/* Video at natural 16:9 aspect ratio — eyebrow + title overlaid */}
        <div className="relative w-full aspect-video overflow-hidden bg-navy-dark">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-navy/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 text-center px-6">
            <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-4">{c.eyebrow}</p>
            <h2 className="text-white text-3xl font-bold leading-tight">{c.title}</h2>
          </div>
        </div>

        {/* Badge + description + CTA below the video */}
        <div className="bg-navy px-6 pt-10 pb-14 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-bold tracking-widest uppercase">{c.badge}</span>
          </div>
          <div className="w-10 h-px bg-gold/40 mx-auto mb-8" />
          <p className="text-white/60 text-base leading-relaxed max-w-sm mx-auto mb-10">{c.body}</p>
          <a
            href="https://www.instagram.com/bogaziciracing?igsh=MWkxbWV0bzU4Y2l5Zg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-gold text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {c.cta}
          </a>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (hidden below md) ──────────────────────────────── */}
      <section className={`hidden md:block relative w-full overflow-hidden${fullPage ? ' md:min-h-screen' : ' md:min-h-[60vh]'}`}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          autoPlay
          onEnded={(e) => { hasPlayedRef.current = true; e.target.pause(); }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-navy/80" />
        <div className={`relative z-10 py-40 px-6 text-center flex flex-col items-center justify-center${fullPage ? ' min-h-screen' : ' min-h-[60vh]'}`}>
          <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-6">{c.eyebrow}</p>
          <h2 className="text-white text-5xl font-bold leading-tight mb-6">{c.title}</h2>
          <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-bold tracking-widest uppercase">{c.badge}</span>
          </div>
          <div className="w-10 h-px bg-gold/40 mx-auto mb-10" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-14">{c.body}</p>
          <a
            href="https://www.instagram.com/bogaziciracing?igsh=MWkxbWV0bzU4Y2l5Zg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-gold text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {c.cta}
          </a>
        </div>
      </section>

    </div>
  );
}
