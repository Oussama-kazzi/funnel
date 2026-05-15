import { useState } from 'react'

const cases = [
  {
    num: '01',
    name: 'Meridian AI',
    industry: 'AI SaaS',
    result: '+280%',
    resultLabel: 'trial activation rate',
    stack: 'Next.js',
    tags: [
      { label: 'Product Design', color: '#7C3AED', bg: 'rgba(124,58,237,0.15)' },
      { label: 'AI SaaS',        color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #0F0A2E 0%, #1A0B4B 40%, #2D1B69 100%)',
      accent: '#7C3AED',
      accentAlt: '#A78BFA',
      ui: 'dashboard',
    },
    href: '#',
  },
  {
    num: '02',
    name: 'Vault Finance',
    industry: 'Fintech',
    result: '3.1×',
    resultLabel: 'onboarding completion',
    stack: 'React',
    tags: [
      { label: 'UX Overhaul',    color: '#059669', bg: 'rgba(5,150,105,0.15)' },
      { label: 'Fintech',        color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #020F0A 0%, #041F14 40%, #073520 100%)',
      accent: '#059669',
      accentAlt: '#34D399',
      ui: 'finance',
    },
    href: '#',
  },
  {
    num: '03',
    name: 'Forma Studio',
    industry: 'Design Tools',
    result: '4.6×',
    resultLabel: 'daily active usage',
    stack: 'Custom',
    tags: [
      { label: 'Design System',  color: '#EA580C', bg: 'rgba(234,88,12,0.15)' },
      { label: 'Design Tools',   color: '#FB923C', bg: 'rgba(251,146,60,0.12)' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #1A0A00 0%, #2D1200 40%, #3D1F00 100%)',
      accent: '#EA580C',
      accentAlt: '#FB923C',
      ui: 'editor',
    },
    href: '#',
  },
  {
    num: '04',
    name: 'Pulse Analytics',
    industry: 'B2B SaaS',
    result: '$2.4M',
    resultLabel: 'raised post-design',
    stack: 'Next.js',
    tags: [
      { label: 'Pitch Design',   color: '#0EA5E9', bg: 'rgba(14,165,233,0.15)' },
      { label: 'B2B SaaS',       color: '#38BDF8', bg: 'rgba(56,189,248,0.12)' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #00080F 0%, #001829 40%, #00203B 100%)',
      accent: '#0EA5E9',
      accentAlt: '#38BDF8',
      ui: 'analytics',
    },
    href: '#',
  },
]

/* ── mini SVG mockup previews ── */
function PreviewMockup({ preview }) {
  const { bg, accent, accentAlt, ui } = preview

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: bg,
      overflow: 'hidden',
    }}>
      {/* Browser chrome */}
      <div style={{
        position: 'absolute', top: 16, left: 16, right: 16,
        height: 28,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 6,
        display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
      }}>
        {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
        <div style={{
          marginLeft: 8, flex: 1, height: 10,
          background: 'rgba(255,255,255,0.08)', borderRadius: 4,
        }} />
      </div>

      {/* Navbar line */}
      <div style={{
        position: 'absolute', top: 56, left: 16, right: 16, height: 24,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 40, height: 8, background: accent, borderRadius: 4, opacity: 0.9 }} />
        {[70, 55, 62, 50].map((w, i) => (
          <div key={i} style={{ width: w, height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 3 }} />
        ))}
        <div style={{ marginLeft: 'auto', width: 52, height: 18, background: accent, borderRadius: 5, opacity: 0.85 }} />
      </div>

      {/* Hero text block */}
      <div style={{ position: 'absolute', top: 96, left: 16, right: '45%' }}>
        <div style={{ width: '80%', height: 14, background: 'rgba(255,255,255,0.75)', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ width: '60%', height: 14, background: 'rgba(255,255,255,0.75)', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ width: '45%', height: 14, background: accent, borderRadius: 3, marginBottom: 14 }} />
        <div style={{ width: '85%', height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 4 }} />
        <div style={{ width: '70%', height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 16 }} />
        <div style={{ width: 80, height: 22, background: accent, borderRadius: 5 }} />
      </div>

      {/* Right visual panel — unique per ui type */}
      {ui === 'dashboard' && (
        <div style={{ position: 'absolute', top: 90, right: 8, width: '40%', bottom: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8, height: '100%' }}>
            {[60, 85, 50, 70, 90, 40].map((h, i) => (
              <div key={i} style={{ display: 'inline-block', width: 10, height: h * 0.6, background: i % 2 === 0 ? accent : accentAlt, borderRadius: 2, marginRight: 3, opacity: 0.85, verticalAlign: 'bottom' }} />
            ))}
            <div style={{ marginTop: 8, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 4 }} />
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 2, width: '70%' }} />
          </div>
        </div>
      )}
      {ui === 'finance' && (
        <div style={{ position: 'absolute', top: 90, right: 8, width: '40%', bottom: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 10, height: '100%' }}>
            <div style={{ fontSize: 0 }}>
              {[30, 55, 40, 70, 65, 80, 60].map((h, i) => (
                <div key={i} style={{ display: 'inline-block', width: 9, height: h * 0.55, background: `rgba(52,211,153,${0.3 + i * 0.08})`, borderRadius: '2px 2px 0 0', marginRight: 2, verticalAlign: 'bottom' }} />
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              {[100, 75].map((w, i) => (
                <div key={i} style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 3, width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
      {ui === 'editor' && (
        <div style={{ position: 'absolute', top: 90, right: 8, width: '40%', bottom: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8, height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[100, 80, 95, 65, 90, 75].map((w, i) => (
              <div key={i} style={{ height: 6, background: i === 2 ? `${accent}99` : 'rgba(255,255,255,0.1)', borderRadius: 2, width: `${w}%` }} />
            ))}
            <div style={{ marginTop: 4, width: 40, height: 16, background: accent, borderRadius: 3, opacity: 0.8 }} />
          </div>
        </div>
      )}
      {ui === 'analytics' && (
        <div style={{ position: 'absolute', top: 90, right: 8, width: '40%', bottom: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8, height: '100%' }}>
            <svg width="100%" height="60" viewBox="0 0 100 60" preserveAspectRatio="none">
              <polyline points="0,55 15,40 30,45 45,20 60,30 75,10 90,18 100,8" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
              <polyline points="0,55 15,40 30,45 45,20 60,30 75,10 90,18 100,8 100,60 0,60" fill={accent} opacity="0.1"/>
            </svg>
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: -20, left: '30%',
        width: '50%', height: '50%',
        background: `radial-gradient(ellipse at center, ${accent}30 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </div>
  )
}

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
      <div style={{ position: 'relative', height: 220, flexShrink: 0 }}>
        <PreviewMockup preview={item.preview} />
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
          View Case Study
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="work" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 32, marginBottom: 64,
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

        {/* 2×2 card grid + 1 wide card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {cases.map((item, i) => (
            <CaseCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cs-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          #work > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
