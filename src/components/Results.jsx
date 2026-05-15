import { useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { num: '50+', label: 'Products shipped', desc: 'for startups, SaaS companies, and AI teams across 12 countries' },
  { num: '3.4×', label: 'Avg. activation lift', desc: 'measured within the first 60 days post-launch across all engagements' },
  { num: '6 wk', label: 'Average delivery', desc: 'from strategy kickoff to production-ready product, consistently' },
  { num: '96%', label: 'Client retention rate', desc: 'of studios return to FUTURA for their next build or evolution' },
]

const headerVariants = {
  offscreen: { y: 24, opacity: 0 },
  onscreen: {
    y: 0, opacity: 1,
    transition: { type: 'spring', bounce: 0.15, duration: 0.9 },
  },
}

const cardVariants = {
  offscreen: { y: 60, opacity: 0 },
  onscreen: {
    y: 0, opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 0.85 },
  },
}

function StatCard({ num, label, desc }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.45 }}
      variants={cardVariants}
      whileHover={{ x: 6, y: 6, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(199,247,81,0.04)' : '#0A0A0A',
        border: `2px solid ${hovered ? 'rgba(199,247,81,0.3)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8,
        padding: '44px 36px',
        position: 'relative',
        boxShadow: hovered ? 'none' : '6px 6px 0px 0px rgba(199,247,81,0.22)',
        transition: 'background 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
      }}
    >
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(36px, 4vw, 56px)',
        fontWeight: 800,
        color: '#C7F751',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: 14,
      }}>
        {num}
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 15, fontWeight: 700,
        color: '#FFFFFF', marginBottom: 8,
        textTransform: 'uppercase', letterSpacing: '-0.01em',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13, color: 'rgba(255,255,255,0.4)',
        lineHeight: 1.6,
      }}>
        {desc}
      </div>

      {/* Corner accent — appears on hover */}
      <div style={{
        position: 'absolute', bottom: 16, right: 16,
        width: 8, height: 8, borderRadius: '50%',
        background: '#C7F751',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(0)',
        transition: 'opacity 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
    </motion.div>
  )
}

export default function Results() {
  return (
    <section style={{ padding: '100px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#C7F751', marginBottom: 16 }}>
            Studio impact
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 54px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#FFFFFF', lineHeight: 1.1, margin: 0,
          }}>
            Built on outcomes, not aesthetics.
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

      </div>
    </section>
  )
}
