import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stacks = [
  {
    id: 'framer',
    name: 'Framer',
    sub: 'Rapide & animé',
    featured: false,
    desc: 'Idéal pour des landing pages modernes, rapides et animées, faciles à faire évoluer. Parfait quand la vitesse de lancement et le rendu visuel priment.',
    cost:    '$$',
    speed:   'Rapide',
    flex:    'Moyen',
    pros: [
      'Animations et interactions haut de gamme sans code',
      'Idéal pour les landing pages et sites courts',
      'Mise en ligne et itérations très rapides',
      'Édition simple du contenu par le client',
    ],
    cons: [
      'Moins adapté aux très gros sites de contenu',
      'E-commerce limité',
      'Écosystème de plugins restreint',
    ],
    bestFor: 'Landing pages, sites de lancement, portfolios et marques qui veulent un rendu premium rapidement.',
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    sub: 'Flexible & riche en contenu',
    featured: false,
    desc: 'Le CMS le plus utilisé au monde. Idéal pour les sites vitrines, blogs, sites corporate et projets qui nécessitent une gestion de contenu simple et de la flexibilité.',
    cost:    '$$',
    speed:   'Moyen',
    flex:    'Élevé',
    pros: [
      'Écosystème de plugins immense — presque tout est possible',
      'Excellent pour le blog, le contenu et le SEO',
      'WooCommerce pour un e-commerce sérieux',
      'Vous possédez tout : code, données, hébergement',
    ],
    cons: [
      'Nécessite des mises à jour de sécurité régulières',
      'Les conflits de plugins peuvent casser des choses',
      'La performance dépend beaucoup de l’hébergement',
    ],
    bestFor: 'Sites de contenu, blogs à forte ambition SEO, sites corporate et e-commerce avec beaucoup de produits.',
  },
  {
    id: 'webflow',
    name: 'Webflow',
    sub: 'Premium & sur mesure',
    featured: true,
    desc: 'Plateforme de développement visuel avec hébergement intégré. Contrôle pixel-perfect sans écrire de code, animations soignées et zéro maintenance de plugins. La façon la plus rapide de lancer un site marketing premium.',
    cost:    '$$$',
    speed:   'Rapide',
    flex:    'Moyen',
    pros: [
      'Animations et interactions superbes sans code',
      'Hébergement rapide et sécurisé inclus',
      'Code propre, excellents Core Web Vitals',
      'Le client peut éditer sans rien casser',
      'CMS intégré parfait pour blogs et réalisations',
    ],
    cons: [
      'Frais d’hébergement Webflow mensuels',
      'E-commerce plus limité que Shopify',
      'Pas de véritable écosystème de plugins',
    ],
    bestFor: 'Sites marketing, agences, landing pages SaaS, marques haut de gamme et entreprises orientées design.',
  },
  {
    id: 'custom',
    name: 'Développement sur mesure',
    sub: 'Contrôle total',
    featured: false,
    desc: 'React, Next.js, code personnalisé — une application construite selon vos besoins exacts. Performance maximale, flexibilité maximale, contrôle maximal. Pour plateformes, dashboards, MVP, SaaS et intégrations API.',
    cost:    '$$$$',
    speed:   'Lent',
    flex:    'Max',
    pros: [
      'Performances parfaites, temps de chargement minimal',
      'Contrôle total sur chaque pixel et interaction',
      'Logique sur mesure — calculateurs, dashboards, API',
      'S’adapte à des millions d’utilisateurs sans refonte',
      'Aucun frais de plateforme, aucun verrouillage',
    ],
    cons: [
      'Investissement initial le plus élevé',
      'Un développeur est requis pour les évolutions',
      'Délai plus long selon la complexité',
    ],
    bestFor: 'Plateformes SaaS, e-commerce ambitieux, portails clients ou tout projet à logique complexe.',
  },
]

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="7" cy="7" r="6.5" stroke="#8B5CF6" strokeWidth="1"/>
      <path d="M7 4v6M4 7h6" stroke="#8B5CF6" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <path d="M4 7h6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function StatBlock({ value, label, highlight }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 22, fontWeight: 800,
        color: highlight ? '#8B5CF6' : '#FFFFFF',
        letterSpacing: '-0.02em', lineHeight: 1,
        marginBottom: 4,
      }}>{value}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 9, fontWeight: 600,
        color: 'rgba(255,255,255,0.28)',
        textTransform: 'uppercase', letterSpacing: '0.14em',
      }}>{label}</div>
    </div>
  )
}

function StackCard({ stack, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: stack.featured
          ? 'rgba(255,255,255,0.05)'
          : hovered ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)',
        border: `1px solid ${stack.featured ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        padding: '36px 32px 28px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 0,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: stack.featured
          ? '0 0 0 1px rgba(139,92,246,0.06), 0 24px 48px rgba(0,0,0,0.35)'
          : hovered ? '0 16px 40px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.15)',
        opacity: 0,
        animation: `pr-fadein 0.55s ease forwards ${index * 0.13 + 0.15}s`,
      }}
    >
      {/* Featured badge */}
      {stack.featured && (
        <div style={{
          position: 'absolute', top: -1, left: '50%',
          transform: 'translateX(-50%)',
          background: '#8B5CF6',
          color: '#0A0A0A',
          fontFamily: "'Inter', sans-serif",
          fontSize: 9, fontWeight: 800,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '5px 14px',
          borderRadius: '0 0 8px 8px',
          whiteSpace: 'nowrap',
        }}>Recommandé</div>
      )}

      {/* Name */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 28, fontWeight: 800,
        color: '#FFFFFF', letterSpacing: '-0.03em',
        lineHeight: 1.1, marginBottom: 8,
        marginTop: stack.featured ? 10 : 0,
      }}>{stack.name}</h3>

      {/* Sub */}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10, fontWeight: 600,
        color: stack.featured ? 'rgba(139,92,246,0.65)' : 'rgba(255,255,255,0.28)',
        textTransform: 'uppercase', letterSpacing: '0.15em',
        marginBottom: 20,
      }}>{stack.sub}</div>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13.5, color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.7, marginBottom: 24,
      }}>{stack.desc}</p>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: 28, alignItems: 'flex-start',
        paddingBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        marginBottom: 24,
      }}>
        <StatBlock value={stack.cost}  label="Budget"        highlight={true} />
        <StatBlock value={stack.speed} label="Rapidité"      highlight={false} />
        <StatBlock value={stack.flex}  label="Flexibilité"   highlight={false} />
      </div>

      {/* Pros */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 14 }}>
        {stack.pros.map((p, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <PlusIcon />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5,
            }}>{p}</span>
          </li>
        ))}
      </ul>

      {/* Cons */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
        {stack.cons.map((c, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <MinusIcon />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.32)', lineHeight: 1.5,
            }}>{c}</span>
          </li>
        ))}
      </ul>

      {/* Best for */}
      <div style={{
        marginTop: 'auto',
        padding: '16px 18px',
        background: stack.featured ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${stack.featured ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 10,
      }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 9, fontWeight: 700,
          color: stack.featured ? '#8B5CF6' : 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase', letterSpacing: '0.18em',
          marginBottom: 8,
        }}>Idéal pour</div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, fontStyle: 'italic',
          color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
          margin: 0,
        }}>{stack.bestFor}</p>
      </div>
    </div>
  )
}

export default function Pricing({ onCTA }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="pricing" className="pricing-section" ref={ref} style={{ padding: '104px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{
          maxWidth: 680,
          marginBottom: 72,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: '#8B5CF6', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 28, height: 1, background: '#8B5CF6', display: 'inline-block' }} />
            La bonne technologie
          </p>

          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            lineHeight: 1.06,
            marginBottom: 28,
          }}>
            Framer, WordPress, Webflow{' '}
            ou sur mesure —{' '}
            <em style={{
              fontStyle: 'italic',
              color: '#8B5CF6',
              fontWeight: 700,
              textShadow: '0 0 40px rgba(139,92,246,0.35)',
            }}>
              lequel choisir ?
            </em>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75, margin: 0,
          }}>
            Nous ne forçons pas une seule solution. Nous avons livré sur les quatre, et le bon choix dépend de vos objectifs, de votre budget, de votre vitesse d’exécution et de qui gère le site après la mise en ligne.
          </p>
        </div>

        {/* ── Stack cards ── */}
        <div className="pricing-cards" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          alignItems: 'stretch',
        }}>
          {stacks.map((stack, i) => (
            <StackCard key={stack.id} stack={stack} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes pr-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1080px) {
          .pricing-section .pricing-cards {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 760px !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 768px) {
          .pricing-section { padding: 56px 20px 48px !important; }
          .pricing-section > div > div:first-child {
            margin-bottom: 40px !important;
          }
        }
        @media (max-width: 560px) {
          .pricing-section .pricing-cards {
            grid-template-columns: 1fr !important;
            max-width: 460px !important;
          }
        }
        @media (max-width: 480px) {
          .pricing-section { padding: 48px 16px 40px !important; }
        }
      `}</style>
    </section>
  )
}
