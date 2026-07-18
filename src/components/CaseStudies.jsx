import { useState } from 'react'
import { motion } from 'framer-motion'

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
    resultLabel: 'de réservations',
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
    resultLabel: 'utilisateurs projetés',
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
    resultLabel: 'de portée organique',
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
    resultLabel: 'de conversion',
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
    resultLabel: 'de réservations camp',
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
    resultLabel: 'de réservations directes',
    tags: [
      { label: 'Webflow',     color: '#EAB308', bg: 'rgba(234,179,8,0.15)' },
      { label: 'Hospitality', color: '#1A1526', bg: 'rgba(204,243,6,0.22)' },
    ],
    preview: { accent: '#EAB308', image: img6 },
    href: 'https://darsurfanamorocco.com/',
  },
  {
    num: '07',
    name: 'Salt House Morocco',
    buildType: 'Webflow',
    result: '+290%',
    resultLabel: 'de demandes en ligne',
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
    resultLabel: 'de réservations de tours',
    tags: [
      { label: 'WordPress', color: '#1A1526', bg: 'rgba(204,243,6,0.22)' },
      { label: 'Travel',    color: '#1A1526', bg: 'rgba(204,243,6,0.22)' },
    ],
    preview: { accent: '#CCF306', image: img8 },
    href: 'https://souk2surf.com/',
  },
  {
    num: '09',
    name: 'Surfana Tours',
    buildType: 'WordPress',
    result: '+250%',
    resultLabel: 'de trafic organique',
    tags: [
      { label: 'WordPress', color: '#1A1526', bg: 'rgba(204,243,6,0.22)' },
      { label: 'Tourism',   color: '#A5B4FC', bg: 'rgba(165,180,252,0.12)' },
    ],
    preview: { accent: '#CCF306', image: img9 },
    href: 'https://surfanatours.com/',
  },
  {
    num: '10',
    name: 'Adsolution',
    buildType: 'Custom Code',
    result: '$1.2M',
    resultLabel: 'de revenus publicitaires suivis',
    tags: [
      { label: 'Custom Code', color: '#1A1526', bg: 'rgba(204,243,6,0.22)' },
      { label: 'Marketing',   color: '#B45309', bg: 'rgba(204,243,6,0.16)' },
    ],
    preview: { accent: '#CCF306', image: img10 },
    href: 'https://adsolution.ma/',
  },
]

const FILTERS = ['Tous', 'Webflow', 'WordPress', 'Custom Code']

function CaseCard({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(26,21,38,0.05)' : 'rgba(26,21,38,0.05)',
        border: `1px solid ${hovered ? 'rgba(26,21,38,0.14)' : 'rgba(26,21,38,0.09)'}`,
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
        {/* Number */}
        <div style={{
          position: 'absolute', bottom: 12, left: 14,
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 11, fontWeight: 700, color: 'rgba(26,21,38,0.40)',
          letterSpacing: '0.06em',
        }}>{item.num}</div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>

        {/* Name + tags row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Mona Sans Variable', sans-serif",
            fontSize: 17, fontWeight: 700, color: '#1A1526',
            letterSpacing: '-0.02em',
          }}>{item.name}</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {item.tags.map((tag, i) => (
              <span key={i} style={{
                fontFamily: "'Mona Sans Variable', sans-serif",
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
        <div style={{ height: 1, background: 'rgba(26,21,38,0.09)' }} />

        {/* CTA button */}
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 0',
            border: `1px solid ${hovered ? 'rgba(26,21,38,0.14)' : 'rgba(26,21,38,0.09)'}`,
            borderRadius: 8,
            fontFamily: "'Mona Sans Variable', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: hovered ? '#FFFFFF' : 'rgba(26,21,38,0.72)',
            textDecoration: 'none',
            background: hovered ? 'rgba(26,21,38,0.05)' : 'transparent',
            transition: 'color 0.25s ease, border-color 0.25s ease, background 0.25s ease',
          }}
        >
          Visiter le site
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const [filter, setFilter] = useState('Tous')

  const visible = filter === 'Tous' ? cases : cases.filter(c => c.buildType === filter)

  return (
    <section id="work" className="cs-section" style={{ padding: '104px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 32, marginBottom: 44,
          }}>
          <div>
            <p style={{
              fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              color: '#1A1526', marginBottom: 16,
            }}>Réalisations récentes</p>
            <h2 style={{
              fontFamily: "'Mona Sans Variable', sans-serif",
              fontSize: 'clamp(28px, 6.5vw, 54px)', fontWeight: 800,
              letterSpacing: '-0.04em', color: '#1A1526',
              lineHeight: 1.05, margin: 0,
            }}>
              Des projets dont<br />nous sommes fiers.
            </h2>
          </div>
          <p style={{
            fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 16,
            color: 'rgba(26,21,38,0.55)', maxWidth: 380, lineHeight: 1.7,
          }}>
            Des entreprises qui nous ont fait confiance et ont lancé un site qui performe.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="cs-filters" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "'Mona Sans Variable', sans-serif",
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '7px 16px',
                borderRadius: 100,
                border: `1px solid ${filter === f ? '#CCF306' : 'rgba(26,21,38,0.14)'}`,
                background: filter === f ? 'rgba(204,243,6,0.1)' : 'rgba(26,21,38,0.05)',
                color: filter === f ? '#CCF306' : 'rgba(26,21,38,0.72)',
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
          border-color: rgba(26,21,38,0.40) !important;
          color: rgba(26,21,38,0.92) !important;
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
