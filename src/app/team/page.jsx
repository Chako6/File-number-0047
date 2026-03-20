'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'
import {
  SEASONS,
  CURRENT_SEASON,
  MEMBER_COUNT_DISPLAY,
  rosterBySeason,
  DEPT_ORDER,
  DEPT_LABELS,
} from '../../data/team'
import { client, urlFor } from '../../lib/sanity'

const SANITY_TEAM_QUERY = `*[_type == "teamMember" && season == $season] | order(order asc) {
  name, role_en, role_tr, dept, photo, linkedin
}`

// ── Department icons ─────────────────────────────────────────────────────────
const deptIcons = {
  cog: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  bolt: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  chart: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
}

// ── Department section content (bilingual) ────────────────────────────────────
const DEPT_BLOCKS = [
  {
    key: 'mechanical_design',
    iconKey: 'cog',
    monogram: 'MD',
    title: { en: 'Mechanical Design', tr: 'Mekanik Tasarım' },
    description: {
      en: 'Responsible for the full structural and mechanical engineering of the car — from suspension geometry and chassis fabrication to powertrain integration and aerodynamics.',
      tr: 'Aracın tüm yapısal ve mekanik mühendisliğinden sorumludur — süspansiyon geometrisinden şasi imalatına, aktarma organları ve aerodinamiğe kadar.',
    },
    areas: {
      en: ['Suspension geometry & dynamics', 'Chassis design & fabrication', 'Powertrain & drivetrain integration', 'Aerodynamics & bodywork', 'Weight optimisation'],
      tr: ['Süspansiyon geometrisi ve dinamiği', 'Şasi tasarımı ve imalatı', 'Motor ve güç aktarma entegrasyonu', 'Aerodinamik ve kaporta', 'Ağırlık optimizasyonu'],
    },
  },
  {
    key: 'electric_software',
    iconKey: 'bolt',
    monogram: 'ES',
    title: { en: 'Electric & Software', tr: 'Elektrik ve Yazılım' },
    description: {
      en: 'Develops all electrical architecture and software systems — from embedded firmware and PCB design to data-driven simulation, telemetry, and control logic.',
      tr: 'Gömülü yazılımdan PCB tasarımına, simülasyon ve telemetriye kadar tüm elektrik mimarisi ve yazılım sistemlerini geliştirir.',
    },
    areas: {
      en: ['Wiring harness & PCB design', 'ECU programming & calibration', 'Control systems & vehicle dynamics', 'Data acquisition & telemetry', 'Simulation & virtual testing'],
      tr: ['Kablo demeti ve PCB tasarımı', 'ECU programlama ve kalibrasyon', 'Kontrol sistemleri ve araç dinamiği', 'Veri toplama ve telemetri', 'Simülasyon ve sanal test'],
    },
  },
  {
    key: 'team_ops',
    iconKey: 'chart',
    monogram: 'TO',
    title: { en: 'Team Operations', tr: 'Takım Operasyonları' },
    description: {
      en: 'Keeps the team running at every level — managing sponsor relationships, financial planning, brand communications, and all logistics required to compete internationally.',
      tr: 'Takımı her seviyede işler tutar — sponsor ilişkileri, mali planlama, marka iletişimi ve uluslararası yarışma lojistiği dahil.',
    },
    areas: {
      en: ['Sponsorship development & management', 'Budget planning & financial control', 'Marketing & brand identity', 'Competition logistics & event management', 'Team strategy & coordination'],
      tr: ['Sponsorluk geliştirme ve yönetimi', 'Bütçe planlama ve finansal kontrol', 'Pazarlama ve marka kimliği', 'Yarışma lojistiği ve etkinlik yönetimi', 'Takım stratejisi ve koordinasyonu'],
    },
  },
]

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function getInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function RevealOnScroll({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  )
}

function MemberCard({ member }) {
  const initials = getInitials(member.name)

  return (
    <div className="group relative overflow-hidden aspect-[3/4]">
      {member.photo ? (
        <img
          src={typeof member.photo === 'object' ? member.photo.src : member.photo}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-navy-light flex items-center justify-center">
          <span className="text-white/10 text-4xl font-bold tracking-widest select-none">
            {initials}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-navy/88 via-navy/35 to-transparent
                      opacity-0 group-hover:opacity-100
                      [@media(hover:none)]:opacity-100
                      transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4
                      flex items-end justify-between
                      opacity-0 translate-y-1.5
                      group-hover:opacity-100 group-hover:translate-y-0
                      [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0
                      transition-[opacity,transform] duration-300">
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-white text-sm font-bold leading-snug">{member.name}</p>
          <p className="text-white/70 text-[11px] leading-snug mt-0.5">{member.role}</p>
        </div>
        <a
          href={member.linkedin || 'https://linkedin.com'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 text-white hover:text-gold transition-colors duration-200"
          aria-label={`${member.name} on LinkedIn`}
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  )
}

export default function Team() {
  const { t, lang } = useLanguage()
  const p = t.teamPage
  const imgRef = useRef(null)
  const [selectedSeason, setSelectedSeason] = useState(CURRENT_SEASON)
  const [rawSanityBySeason, setRawSanityBySeason] = useState({})

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return
    client.fetch(SANITY_TEAM_QUERY, { season: selectedSeason })
      .then((data) => {
        if (data?.length) {
          setRawSanityBySeason((prev) => ({ ...prev, [selectedSeason]: data }))
        }
      })
      .catch(() => {})
  }, [selectedSeason])

  const activeRoster = useMemo(() => {
    const raw = rawSanityBySeason[selectedSeason]
    if (raw) {
      return raw.map((m) => ({
        name: m.name,
        role: m[`role_${lang}`] || m.role_en || '',
        dept: m.dept,
        photo: m.photo ? urlFor(m.photo).url() : null,
        linkedin: m.linkedin || null,
      }))
    }
    return rosterBySeason[selectedSeason] ?? []
  }, [rawSanityBySeason, selectedSeason, lang])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        if (window.innerWidth >= 768) {
          img.style.transform = `translateY(${window.scrollY * 0.2}px)`
        } else {
          img.style.transform = 'none'
        }
        rafId = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="pt-16">
      {/* Hero banner */}
      <div className="relative bg-navy md:overflow-hidden md:min-h-screen">
        <div className="relative overflow-hidden md:absolute md:inset-0">
          <img
            ref={imgRef}
            src="/images/Team%20Foto%20Bogazici%20Racing.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto md:h-full md:w-full md:object-cover md:object-top will-change-transform"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(10,20,35,0.45), rgba(10,20,35,0.65), rgba(10,20,35,0.92))' }}
          />
        </div>

        <div className="relative md:absolute md:inset-0 md:z-10 md:flex md:flex-col md:items-center md:justify-center px-6 pt-6 pb-10 md:py-24 text-center">
          <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-5">{p.eyebrow}</p>
          <h1 className="text-white text-3xl md:text-6xl font-bold mb-6">{p.title}</h1>
          <div className="w-10 h-px bg-gold mx-auto mb-8" />
          <p className="text-white/75 text-sm md:text-lg leading-relaxed max-w-xl md:max-w-2xl mx-auto">{p.intro}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-navy-dark py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x divide-white/10">
          {[
            { value: '2025', label: p.statFounded },
            { value: MEMBER_COUNT_DISPLAY, label: p.statMembers },
            { value: '3', label: p.statDepts },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center px-6 py-2 text-center">
              <span className="text-gold text-3xl md:text-4xl font-bold mb-1">{value}</span>
              <span className="text-white/55 text-xs tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="py-24 md:py-32 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-4">{p.eyebrow}</p>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{p.deptTitle}</h2>
            <div className="w-10 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {DEPT_BLOCKS.map((dept, i) => (
              <RevealOnScroll key={dept.key} delay={i * 120}>
                <div className="border-t border-gold/30 pt-8">
                  <div className="flex items-start gap-3 mb-5">
                    <span className="text-gold flex-shrink-0 mt-0.5">
                      {deptIcons[dept.iconKey]}
                    </span>
                    <h3 className="text-white text-base font-bold leading-snug">
                      {dept.title[lang] ?? dept.title.en}
                    </h3>
                  </div>

                  <p className="text-white/65 text-sm leading-relaxed mb-6">
                    {dept.description[lang] ?? dept.description.en}
                  </p>

                  <ul className="space-y-2.5">
                    {(dept.areas[lang] ?? dept.areas.en).map((area) => (
                      <li key={area} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-gold/60 rotate-45 flex-shrink-0" aria-hidden="true" />
                        <span className="text-white/55 text-xs leading-snug">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Roster */}
      <div className="py-24 md:py-32 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-4">{p.membersTitle}</p>
            <h2 className="text-navy text-3xl md:text-4xl font-bold">
              {selectedSeason} {p.rosterTitle}
            </h2>
            <div className="w-10 h-px bg-gold mt-5" />
          </div>

          {SEASONS.length > 1 && (
            <div className="mb-14 inline-flex border border-navy/12 overflow-hidden">
              {SEASONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeason(s)}
                  className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
                    selectedSeason === s
                      ? 'bg-navy text-white'
                      : 'text-navy/40 hover:text-navy hover:bg-navy/5'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {activeRoster.length > 0 ? (
            DEPT_ORDER.map((dept) => {
              const members = activeRoster.filter((m) => m.dept === dept)
              if (!members.length) return null
              const label = DEPT_LABELS[lang]?.[dept] ?? DEPT_LABELS.en[dept]
              return (
                <div key={dept} className="mb-14 last:mb-0">
                  <div className="flex items-center gap-3 mb-7">
                    <span className="w-2 h-2 bg-gold rotate-45 flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-navy text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                      {label}
                    </h3>
                    <div className="flex-1 h-px bg-navy/10" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {members.map((m) => (
                      <MemberCard key={m.name} member={m} />
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="py-20 flex flex-col items-center text-center">
              <span className="font-mono text-[9px] text-navy/25 tracking-widest uppercase mb-6">
                {selectedSeason} · Season Roster
              </span>
              <div className="w-8 h-px bg-gold/35 mb-6" />
              <p className="text-navy text-base font-semibold mb-2">Roster Announcement Pending</p>
              <p className="text-navy/60 text-sm leading-relaxed max-w-xs">
                The {selectedSeason} season roster will be revealed when recruitment opens.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Join CTA */}
      <div className="py-24 px-6 bg-navy text-center">
        <p className="text-gold text-xs font-bold tracking-widest2 uppercase mb-5">Join Us</p>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">{p.joinTitle}</h2>
        <div className="w-10 h-px bg-gold mx-auto mb-8" />
        <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">{p.joinBody}</p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 border border-gold text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
        >
          {p.joinCta}
        </Link>
      </div>
    </div>
  )
}
