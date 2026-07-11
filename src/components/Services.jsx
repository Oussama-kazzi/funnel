import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  { title: 'Sites vitrines', desc: 'Des sites professionnels qui présentent votre entreprise et renforcent votre crédibilité.', tag: 'Vitrine', span: 2, chips: ['Front-end', 'Développement', 'UX/UI'] },
  { title: 'Landing pages', desc: 'Des pages à forte conversion conçues pour générer plus de leads et de ventes.', tag: 'Conversion', chips: ['Conversion', 'A/B Test'] },
  { title: 'E-commerce', desc: 'Des boutiques en ligne performantes, sécurisées et faciles à gérer.', tag: 'Boutique', chips: ['Boutique', 'Paiement', 'SEO'] },
  { title: 'Applications web', desc: 'Des plateformes web sur mesure pour simplifier vos processus métiers.', tag: 'Web App', chips: ['Front-end', 'Back-end', 'MVP'] },
  { title: 'UI / UX Design', desc: 'Des interfaces modernes, intuitives et centrées sur l’expérience utilisateur.', tag: 'Design', chips: ['UX/UI', 'Prototype', 'Design system'] },
  { title: 'Refonte de site', desc: 'Nous transformons votre site actuel en une expérience moderne et performante.', tag: 'Refonte', chips: ['Refonte', 'Performance'] },
  { title: 'Automatisation IA', desc: 'Nous intégrons l’intelligence artificielle et l’automatisation pour gagner du temps.', tag: 'IA', chips: ['IA', 'Automatisation', 'API'] },
  { title: 'Maintenance', desc: 'Mises à jour, sécurité, optimisations et support continu pour votre site.', tag: 'Support', chips: ['Support', 'Sécurité'] },
]

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

function ServiceCard({ title, desc, tag, span, chips }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`svc-card${hovered ? ' is-hover' : ''}`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ gridColumn: span === 2 ? 'span 2' : 'span 1' }}
    >
      {/* Underlined heading */}
      <h3 className="svc-title">
        {title}
        <span className="svc-underline" />
      </h3>

      {/* Desc */}
      <p className="svc-desc">{desc}</p>

      {/* Tag chips (anchored to the bottom) */}
      <div className="svc-chips">
        {chips.map((c) => (
          <span key={c} className="svc-chip">{c}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-light" style={{ padding: '112px 32px 100px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          style={{
            textAlign: 'center', marginBottom: 64,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#1A1526', marginBottom: 18 }}>
            Ce que nous faisons
          </p>
          <h2 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 'clamp(30px, 4.5vw, 50px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#141019', lineHeight: 1.08, margin: 0, maxWidth: 620 }}>
            Des solutions complètes pour accélérer votre croissance.
          </h2>
        </motion.div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '1fr',
          gap: 18,
        }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>

      <style>{`
        /* Soft-edged warm band — fades in/out so the section melts into the
           ambient background instead of starting/ending on a hard seam. */
        #services.section-light {
          background: linear-gradient(180deg,
            rgba(240,235,222,0) 0%,
            rgba(240,235,222,0.55) 18%,
            rgba(240,235,222,0.55) 82%,
            rgba(240,235,222,0) 100%);
        }
        /* gentle gold bloom at the top edge for continuity with the hero */
        #services.section-light::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 180px;
          background: radial-gradient(ellipse 60% 100% at 50% 0%, rgba(254,210,75,0.08), transparent 70%);
          pointer-events: none;
        }

        /* ── Card ── */
        .svc-card {
          background: #FFFFFF;
          border: 1px solid rgba(15,12,30,0.08);
          border-radius: 20px;
          padding: 30px 30px 26px;
          position: relative;
          display: flex; flex-direction: column;
          height: 100%;
          box-shadow: 0 1px 3px rgba(15,12,30,0.04);
          transition: border-color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1);
          cursor: default; overflow: hidden;
        }
        .svc-card.is-hover {
          border-color: rgba(254,210,75,0.4);
          box-shadow: 0 14px 36px rgba(20,16,25,0.08), 0 2px 6px rgba(15,12,30,0.03);
        }

        /* Underlined heading — the gold underline grows on hover */
        .svc-title {
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: 19px; font-weight: 700;
          color: #141019; letter-spacing: -0.02em;
          line-height: 1.25; margin: 0 0 10px;
          position: relative; display: inline-block; width: fit-content;
          padding-bottom: 8px;
        }
        .svc-underline {
          position: absolute; left: 0; bottom: 0; height: 2px;
          width: 34px; border-radius: 2px;
          background: #FED24B;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-card.is-hover .svc-underline { width: 100%; }

        .svc-desc {
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: 14px; color: rgba(20,16,25,0.55);
          line-height: 1.65; margin: 0;
        }

        /* Tag chips — pinned to the bottom of the card */
        .svc-chips {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: auto; padding-top: 22px;
        }
        .svc-chip {
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: 12px; font-weight: 600;
          color: rgba(20,16,25,0.62);
          padding: 6px 13px;
          border: 1px solid rgba(15,12,30,0.1);
          border-radius: 100px;
          background: rgba(15,12,30,0.02);
          white-space: nowrap;
          transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .svc-card.is-hover .svc-chip {
          border-color: rgba(254,210,75,0.35);
          background: rgba(254,210,75,0.07);
        }

        @media (max-width: 1024px) {
          #services .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          #services .svc-card { grid-column: span 1 !important; }
        }
        @media (max-width: 768px) {
          #services { padding: 80px 20px 72px !important; }
          #services > div > div:first-child { margin-bottom: 44px !important; }
        }
        @media (max-width: 560px) {
          #services .services-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          #services .svc-card { padding: 24px 22px 22px !important; }
        }
      `}</style>
    </section>
  )
}
