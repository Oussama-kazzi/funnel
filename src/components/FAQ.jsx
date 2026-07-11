import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const categories = [
  {
    label: 'Questions fréquentes',
    faqs: [
      {
        q: "Combien de temps faut-il pour créer un site ?",
        a: "Cela dépend du type de projet, du nombre de pages et des fonctionnalités. Une landing page peut être lancée rapidement, tandis qu’un site complet ou une plateforme sur mesure nécessite plus de préparation.",
      },
      {
        q: "Est-ce que vous pouvez refaire mon site actuel ?",
        a: "Oui. Nous pouvons analyser votre site existant, identifier ce qui bloque la conversion et proposer une refonte complète ou progressive.",
      },
      {
        q: "Est-ce que je pourrai modifier le site moi-même ?",
        a: "Oui, selon la technologie choisie. Framer, WordPress et Webflow permettent une gestion simple du contenu. Pour les projets sur mesure, nous pouvons prévoir un espace d’administration adapté.",
      },
      {
        q: "Est-ce que vous faites aussi le contenu ?",
        a: "Oui. Nous pouvons vous aider avec la structure, les textes, les messages clés, les appels à l’action et l’optimisation de la page pour convertir.",
      },
      {
        q: "Pouvez-vous intégrer des automatisations IA ?",
        a: "Oui. Nous pouvons connecter votre site à des outils d’automatisation, CRM, formulaires intelligents, chatbots, emails automatisés ou workflows internes.",
      },
      {
        q: "Quelle technologie choisir pour mon projet ?",
        a: "Nous vous guidons selon vos besoins. Framer pour la vitesse et les landing pages modernes, WordPress pour la flexibilité de contenu, Webflow pour les sites premium, et custom code pour les projets complexes.",
      },
    ],
  },
]

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(26,21,38,0.09)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          padding: '24px 0', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 17, fontWeight: 600,
          color: open ? '#FFFFFF' : 'rgba(26,21,38,0.92)',
          lineHeight: 1.35, letterSpacing: '-0.01em',
          transition: 'color 0.25s ease',
        }}>
          {q}
        </span>
        <span style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: open ? '#FED24B' : 'rgba(26,21,38,0.09)',
          border: `1px solid ${open ? '#FED24B' : 'rgba(26,21,38,0.09)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open ? '#FFFFFF' : '#FFFFFF',
          fontSize: 20, lineHeight: 1, fontWeight: 300,
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1), color 0.3s ease',
        }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: open ? 600 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.55s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 15, color: 'rgba(26,21,38,0.72)',
          lineHeight: 1.75, paddingBottom: 26, margin: 0,
        }}>
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(0)
  const [openIdx, setOpenIdx] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const handleTab = (i) => {
    setActiveTab(i)
    setOpenIdx(null)
  }

  const current = categories[activeTab]

  return (
    <section id="faq" className="faq-section" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={ref}
          style={{
            marginBottom: 56,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p style={{
            fontFamily: "'Mona Sans Variable', sans-serif",
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: '#FED24B', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 28, height: 1, background: '#FED24B', display: 'inline-block' }} />
            FAQ
          </p>

          <h2 style={{
            fontFamily: "'Mona Sans Variable', sans-serif",
            fontSize: 'clamp(26px, 6vw, 50px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            color: '#1A1526', lineHeight: 1.05, margin: '0 0 20px',
          }}>
            Questions{' '}
            <em style={{ fontStyle: 'italic', color: '#FED24B', fontWeight: 700, textShadow: '0 0 40px rgba(254,210,75,0.3)' }}>
              fréquentes.
            </em>
          </h2>

          <p style={{
            fontFamily: "'Mona Sans Variable', sans-serif",
            fontSize: 16, color: 'rgba(26,21,38,0.55)',
            lineHeight: 1.7, maxWidth: 580, margin: 0,
          }}>
            Les questions qu’on nous pose le plus souvent — réponses claires et directes.
          </p>
        </div>

        {/* Category tabs (hidden when a single category) */}
        <div style={{
          display: categories.length > 1 ? 'flex' : 'none', flexWrap: 'wrap', gap: 8,
          marginBottom: 40,
        }}>
          {categories.map((cat, i) => {
            const active = activeTab === i
            return (
              <button
                key={i}
                onClick={() => handleTab(i)}
                style={{
                  fontFamily: "'Mona Sans Variable', sans-serif",
                  fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.04em',
                  padding: '8px 16px',
                  borderRadius: 100,
                  border: `1px solid ${active ? 'rgba(254,210,75,0.4)' : 'rgba(26,21,38,0.09)'}`,
                  background: active ? 'rgba(254,210,75,0.1)' : 'rgba(26,21,38,0.05)',
                  color: active ? '#FED24B' : 'rgba(26,21,38,0.72)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(26,21,38,0.09)'
                    e.currentTarget.style.color = 'rgba(26,21,38,0.92)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(26,21,38,0.05)'
                    e.currentTarget.style.color = 'rgba(26,21,38,0.72)'
                  }
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Accordion */}
        <div style={{ borderTop: '1px solid rgba(26,21,38,0.09)' }}>
          {current.faqs.map((faq, i) => (
            <FAQItem
              key={`${activeTab}-${i}`}
              {...faq}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Footer count */}
        <p style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 12, color: 'rgba(26,21,38,0.40)',
          marginTop: 32, textAlign: 'right',
          letterSpacing: '0.06em',
        }}>
          {current.faqs.length} questions · Une autre question ? Écrivez-nous.
        </p>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-section { padding: 56px 20px 48px !important; }
        }
        @media (max-width: 480px) {
          .faq-section { padding: 48px 16px 40px !important; }
        }
      `}</style>
    </section>
  )
}
