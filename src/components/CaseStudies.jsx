import { useState } from 'react'

import img1  from '../assets/projet-3-webflow.png'
import img2  from '../assets/projet-2-webflow.png'
import img3  from '../assets/projet-1-webflow.png'
import img4  from '../assets/projet-4-webflow.png'
import img5  from '../assets/projet-5-webflow.png'
import img6  from '../assets/projet-6-webflow.png'
import img7  from '../assets/projet-7-webflow.png'
import img8  from '../assets/projet-1-wordpress.png'
import img9  from '../assets/projet-2-wordpress.png'
import img10 from '../assets/projet-1-code.png'

const cases = [
  {
    num: '01',
    name: 'Montagna',
    buildType: 'Webflow',
    result: '+180%',
    resultLabel: 'booking rate',
    tags: [
      { label: 'Webflow', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
      { label: 'Outdoor', color: '#6EE7B7', bg: 'rgba(110,231,183,0.12)' },
    ],
    preview: { accent: '#10B981', image: img3 },
    href: 'https://montagna.webflow.io/',
  },
  {
    num: '02',
    name: 'Payplus',
    buildType: 'Webflow',
    result: '10M+',
    resultLabel: 'projected users',
    tags: [
      { label: 'Webflow', color: '#EC4899', bg: 'rgba(236,72,153,0.15)' },
      { label: 'Fintech',  color: '#F9A8D4', bg: 'rgba(249,168,212,0.12)' },
    ],
    preview: { accent: '#EC4899', image: img2 },
    href: 'https://payplus.webflow.io/',
  },
  {
    num: '03',
    name: 'Slava Logistics',
    buildType: 'Webflow',
    result: '+240%',
    resultLabel: 'organic reach',
    tags: [
      { label: 'Webflow',   color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
      { label: 'Logistics', color: '#FCD34D', bg: 'rgba(252,211,77,0.12)' },
    ],
    preview: { accent: '#F59E0B', image: img1 },
    href: 'https://slavalogistics.webflow.io/',
  },
  {
    num: '04',
    name: 'Midlane',
    buildType: 'Webflow',
    result: '3.2×',
    resultLabel: 'conversion rate',
    tags: [
      { label: 'Webflow', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' },
      { label: 'Brand',   color: '#67E8F9', bg: 'rgba(103,232,249,0.12)' },
    ],
    preview: { accent: '#06B6D4', image: img4 },
    href: 'https://www.midlane.com/',
  },
  {
    num: '05',
    name: 'Sunsurf Maroc',
    buildType: 'Webflow',
    result: '+320%',
    resultLabel: 'camp bookings',
    tags: [
      { label: 'Webflow', color: '#F97316', bg: 'rgba(249,115,22,0.15)' },
      { label: 'Travel',  color: '#FDBA74', bg: 'rgba(253,186,116,0.12)' },
    ],
    preview: { accent: '#F97316', image: img5 },
    href: 'https://sunsurfmaroc.com/',
  },
  {
    num: '06',
    name: 'Dar Surfana Morocco',
    buildType: 'Webflow',
    result: '4.1×',
    resultLabel: 'direct reservations',
    tags: [
      { label: 'Webflow',     color: '#EAB308', bg: 'rgba(234,179,8,0.15)' },
      { label: 'Hospitality', color: '#FDE047', bg: 'rgba(253,224,71,0.12)' },
    ],
    preview: { accent: '#EAB308', image: img6 },
    href: 'https://darsurfanamorocco.com/',
  },
  {
    num: '07',
    name: 'Salt House Morocco',
    buildType: 'Webflow',
    result: '+290%',
    resultLabel: 'online inquiries',
    tags: [
      { label: 'Webflow',     color: '#14B8A6', bg: 'rgba(20,184,166,0.15)' },
      { label: 'Hospitality', color: '#5EEAD4', bg: 'rgba(94,234,212,0.12)' },
    ],
    preview: { accent: '#14B8A6', image: img7 },
    href: 'https://salthousemorocco.com/',
  },
  {
    num: '08',
    name: 'Souk2Surf',
    buildType: 'WordPress',
    result: '2.8×',
    resultLabel: 'tour bookings',
    tags: [
      { label: 'WordPress', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
      { label: 'Travel',    color: '#C4B5FD', bg: 'rgba(196,181,253,0.12)' },
    ],
    preview: { accent: '#8B5CF6', image: img8 },
    href: 'https://souk2surf.com/',
  },
  {
    num: '09',
    name: 'Surfana Tours',
    buildType: 'WordPress',
    result: '+250%',
    resultLabel: 'organic traffic',
    tags: [
      { label: 'WordPress', color: '#6366F1', bg: 'rgba(99,102,241,0.15)' },
      { label: 'Tourism',   color: '#A5B4FC', bg: 'rgba(165,180,252,0.12)' },
    ],
    preview: { accent: '#6366F1', image: img9 },
    href: 'https://surfanatours.com/',
  },
  {
    num: '10',
    name: 'Adsolution',
    buildType: 'Custom Code',
    result: '$1.2M',
    resultLabel: 'ad revenue tracked',
    tags: [
      { label: 'Custom Code', color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
      { label: 'Marketing',   color: '#D8B4FE', bg: 'rgba(216,180,254,0.12)' },
    ],
    preview: { accent: '#A855F7', image: img10 },
    href: 'https://adsolution.ma/',
  },
]

const FILTERS = ['All', 'Webflow', 'WordPress', 'Custom Code']

function CaseCard({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${item.preview.accent}22`
          : '0 4px 16px rgba(0,0,0,0.2)',
        opacity: 0,
        animation: `cs-fadein 0.6s ease forwards ${index * 0.12 + 0.2}s`,
      }}
    >
      {/* Preview area */}
      <div style={{ position: 'relative', height: 220, flexShrink: 0, background: '#0a0912', overflow: 'hidden' }}>
        <img
          src={item.preview.image}
          alt={item.name}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', bottom: -20, left: '30%',
          width: '50%', height: '50%',
          background: `radial-gradient(ellipse at center, ${item.preview.accent}30 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        {/* Result badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8, padding: '6px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 18, fontWeight: 800, color: item.preview.accent,
            letterSpacing: '-0.03em', lineHeight: 1,
          }}>{item.result}</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9, color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.04em', marginTop: 2,
          }}>{item.resultLabel}</span>
        </div>
        {/* Number */}
        <div style={{
          position: 'absolute', bottom: 12, left: 14,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.06em',
        }}>{item.num}</div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>

        {/* Name + tags row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 17, fontWeight: 700, color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}>{item.name}</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {item.tags.map((tag, i) => (
              <span key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10, fontWeight: 600,
                color: tag.color,
                background: tag.bg,
                border: `1px solid ${tag.color}30`,
                padding: '4px 10px',
                borderRadius: 100,
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
              }}>{tag.label}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* CTA button */}
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 0',
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.09)'}`,
            borderRadius: 8,
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            background: hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
            transition: 'color 0.25s ease, border-color 0.25s ease, background 0.25s ease',
          }}
        >
          Visit Site
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const [filter, setFilter] = useState('All')

  const visible = filter === 'All' ? cases : cases.filter(c => c.buildType === filter)

  return (
    <section id="work" className="cs-section" style={{ padding: '80px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 32, marginBottom: 44,
        }}>
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              color: '#C7F751', marginBottom: 16,
            }}>Selected work</p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800,
              letterSpacing: '-0.04em', color: '#FFFFFF',
              lineHeight: 1.05, margin: 0,
            }}>
              Products that ship<br />and scale.
            </h2>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 16,
            color: 'rgba(255,255,255,0.4)', maxWidth: 380, lineHeight: 1.7,
          }}>
            Five teams that came to FUTURA with a vision and launched with a product that performs.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="cs-filters" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '7px 16px',
                borderRadius: 100,
                border: `1px solid ${filter === f ? '#C7F751' : 'rgba(255,255,255,0.12)'}`,
                background: filter === f ? 'rgba(199,247,81,0.1)' : 'rgba(255,255,255,0.03)',
                color: filter === f ? '#C7F751' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {visible.map((item, i) => (
            <CaseCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cs-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-filters button:hover {
          border-color: rgba(255,255,255,0.22) !important;
          color: rgba(255,255,255,0.7) !important;
        }
        @media (max-width: 768px) {
          .cs-section { padding: 56px 20px 48px !important; }
          .cs-section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          .cs-section > div > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
            margin-bottom: 36px !important;
          }
          .cs-filters {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding-bottom: 4px !important;
          }
          .cs-filters::-webkit-scrollbar { display: none; }
        }
        @media (max-width: 480px) {
          .cs-section { padding: 48px 16px 40px !important; }
        }
      `}</style>
    </section>
  )
}
