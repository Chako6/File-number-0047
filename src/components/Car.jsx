import { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Car({ fullPage = false }) {
  const { t } = useLanguage();
  const c = t.car;
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section entered viewport — restart and play from the beginning.
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          // Section left viewport — pause so it holds the last frame quietly.
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video.closest('section'));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative w-full overflow-hidden${fullPage ? ' min-h-screen' : ''}`}>
      {/* Background video — plays once, holds last frame */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      >
        <source src="/images/Video%20Project%20Car%20Bogazici%20Racing%20under%20Development.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay — keeps text readable */}
      <div className="absolute inset-0 bg-navy/80" />

      {/* Content */}
      <div className="relative z-10 py-32 md:py-40 px-6 text-center">
        <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-6">{c.eyebrow}</p>

        <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">{c.title}</h2>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs font-bold tracking-widest uppercase">{c.badge}</span>
        </div>

        <div className="w-10 h-px bg-gold/40 mx-auto mb-10" />

        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-14">
          {c.body}
        </p>

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
  );
}
