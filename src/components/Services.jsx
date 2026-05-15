import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  { num: '01', title: 'Product Strategy', desc: 'We define what to build and why before a pixel is drawn. Market positioning, user flows, feature architecture, and growth frameworks aligned to your business model.', tag: 'Strategy' },
  { num: '02', title: 'UI/UX Design', desc: 'Interfaces that feel inevitable. Every screen, every interaction, every state is designed with intent — balancing aesthetics, usability, and conversion in equal measure.', tag: 'Design' },
  { num: '03', title: 'Brand Identity', desc: 'Visual identity systems built to scale — from logo and typography to motion language and design tokens that your team can evolve with as the product grows.', tag: 'Brand' },
  { num: '04', title: 'Web Development', desc: 'Production-ready code in React, Next.js, and TypeScript. Clean architecture, fast performance, and systems your engineering team can own and maintain.', tag: 'Development' },
  { num: '05', title: 'Design Systems', desc: 'Shared component libraries and design tokens that let your team ship faster and more consistently — at any team size, at any stage of growth.', tag: 'Systems' },
  { num: '06', title: 'Scalable Architecture', desc: 'Infrastructure and API design that grows from 10 users to 10 million without a rewrite. We build for where your product is going, not just where it is today.', tag: 'Architecture' },
]

function Icon({ tag }) {
  const shared = { width: 22, height: 22, fill: 'none', stroke: '#00FF87', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (tag) {
    case 'Strategy':
      return <svg viewBox="0 0 24 24" {...shared}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>
    case 'Design':
      return <svg viewBox="0 0 24 24" {...shared}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>
    case 'Brand':
      return <svg viewBox="0 0 24 24" {...shared}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'Development':
      return <svg viewBox="0 0 24 24" {...shared}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    case 'Systems':
      return <svg viewBox="0 0 24 24" {...shared}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
    case 'Architecture':
      return <svg viewBox="0 0 24 24" {...shared}><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
    default: return null
  }
}

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FF87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/>
      <polyline points="7 7 17 7 17 17"/>
    </svg>
  )
}

const headerVariants = {
  offscreen: { y: 24, opacity: 0 },
  onscreen: {
    y: 0, opacity: 1,
    transition: { type: 'spring', bounce: 0.15, duration: 0.9 },
  },
}

// Each card has its own whileInView — fires independently as you scroll, matching the reference pattern
const cardVariants = {
  offscreen: { y: 60, opacity: 0 },
  onscreen: {
    y: 0, opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 0.85 },
  },
}

function ServiceCard({ num, title, desc, tag }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.45 }}
      variants={cardVariants}
      // Neobrutalist hover: translate into the shadow, collapsing it
      whileHover={{ x: 6, y: 6, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(0,255,135,0.04)' : '#0A0A0A',
        border: `2px solid ${hovered ? 'rgba(0,255,135,0.3)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8,
        padding: '36px 32px',
        position: 'relative',
        // Offset shadow collapses on hover — the core neobrutalist interaction
        boxShadow: hovered ? 'none' : '6px 6px 0px 0px rgba(0,255,135,0.22)',
        transition: 'background 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
      }}
    >
      {/* Number + tag row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)' }}>
          {num}
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#00FF87', background: 'rgba(0,255,135,0.08)',
          border: '1px solid rgba(0,255,135,0.18)',
          padding: '3px 10px', borderRadius: 100,
        }}>
          {tag}
        </span>
      </div>

      {/* Icon — neobrutalist circle from the reference */}
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'rgba(0,255,135,0.07)',
        border: '2px solid rgba(0,255,135,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
        boxShadow: hovered ? '3px 3px 0px 0px rgba(0,255,135,0.28)' : 'none',
        transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <Icon tag={tag} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 20, fontWeight: 800,
        color: '#FFFFFF', letterSpacing: '-0.01em',
        marginBottom: 12, lineHeight: 1.2,
        textTransform: 'uppercase',
      }}>
        {title}
      </h3>

      {/* Desc */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
        {desc}
      </p>

      {/* Arrow reveal on hover — from the reference */}
      <div style={{
        position: 'absolute', top: 18, right: 18,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translate(0,0)' : 'translate(-4px,4px)',
        transition: 'opacity 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <ArrowUpRight />
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 32, marginBottom: 72,
          }}
        >
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#00FF87', marginBottom: 16 }}>
              What we do
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1.05, margin: 0, maxWidth: 560 }}>
              End-to-end product design and development.
            </h2>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 380, lineHeight: 1.65 }}>
            Not a template shop. Not a freelancer. A senior studio that designs, builds, and ships scalable digital products from the ground up.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>

      </div>
    </section>
  )
}
