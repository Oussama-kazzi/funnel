import { useRef } from 'react'
import { useInView } from 'framer-motion'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const tarifs = [
  {
    name: 'Site web vitrine',
    audience: 'Pour entreprises, agences…',
    price: 'De 3 500 DH',
    note: 'Livraison en 5 à 10 jours',
  },
  {
    name: 'Site web E-commerce',
    audience: 'Entrepreneurs, vendeurs…',
    price: 'De 6 000 DH',
    note: 'Boutique complète & paiement',
  },
  {
    name: 'Application WEB',
    audience: 'Entreprises, startups',
    price: 'Sur devis',
    note: 'Plateformes & dashboards sur mesure',
  },
  {
    name: 'Application MOBILE',
    audience: 'Entreprises, startups',
    price: 'Sur devis',
    note: 'iOS & Android, MVP au produit final',
  },
]

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="18" y2="12" /><polyline points="13 7 18 12 13 17" />
    </svg>
  )
}

function TarifRow({ t, i, onCTA, inView }) {
  return (
    <div
      className="tarif-row"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.7s ${EASE} ${0.1 + i * 0.08}s, transform 0.7s ${EASE} ${0.1 + i * 0.08}s`,
      }}
    >
      {/* Name + audience */}
      <div className="tarif-name">
        <h3 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 20, fontWeight: 700, color: '#141019', letterSpacing: '-0.02em', margin: 0 }}>
          {t.name}
        </h3>
        <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 13, color: 'rgba(20,16,25,0.5)', margin: '5px 0 0' }}>
          {t.audience}
        </p>
      </div>

      {/* Price + note */}
      <div className="tarif-price">
        <span style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 16, fontWeight: 800, color: '#1A1526', letterSpacing: '-0.01em' }}>
          {t.price}
        </span>
        <span style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12.5, color: 'rgba(20,16,25,0.42)' }}>
          {t.note}
        </span>
      </div>

      {/* CTA */}
      <button onClick={onCTA} className="tarif-btn">
        Discuter de mon projet
        <ArrowRight />
      </button>
    </div>
  )
}

export default function Pricing({ onCTA }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="pricing" className="section-light pricing-section" ref={ref} style={{ padding: '104px 32px', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
        }}>
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#1A1526', marginBottom: 18 }}>
            Nos tarifs
          </p>
          <h2 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 'clamp(30px, 4.5vw, 50px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#141019', lineHeight: 1.08, margin: '0 auto', maxWidth: 640 }}>
            Des tarifs clairs, adaptés à votre projet.
          </h2>
        </div>

        {/* Rows */}
        <div className="tarif-list">
          {tarifs.map((t, i) => (
            <TarifRow key={i} t={t} i={i} onCTA={onCTA} inView={inView} />
          ))}
        </div>

        {/* Reassurance footer */}
        <div className="tarif-notes" style={{
          opacity: inView ? 1 : 0,
          transition: `opacity 0.8s ${EASE} 0.5s`,
        }}>
          <span><span className="tarif-note-dot" />Support client disponible 24h/24 et 7j/7</span>
          <span><span className="tarif-note-dot" />Formation personnalisée pour maîtriser la gestion de votre site</span>
        </div>
      </div>

      <style>{`
        #pricing.section-light {
          background: linear-gradient(180deg,
            rgba(240,235,222,0) 0%,
            rgba(240,235,222,0.55) 18%,
            rgba(240,235,222,0.55) 82%,
            rgba(240,235,222,0) 100%);
        }
        .tarif-list {
          display: flex; flex-direction: column;
          border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(15,12,30,0.08);
          background: #FFFFFF;
          box-shadow: 0 10px 32px rgba(20,16,25,0.05);
        }
        .tarif-row {
          display: grid;
          grid-template-columns: 1.3fr 1fr auto;
          align-items: center;
          gap: 24px;
          padding: 26px 30px;
          border-bottom: 1px solid rgba(15,12,30,0.07);
          transition: background 0.25s ease;
        }
        .tarif-row:last-child { border-bottom: none; }
        .tarif-row:hover { background: rgba(204,243,6,0.035); }
        .tarif-price { display: flex; flex-direction: column; gap: 4px; }
        .tarif-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #141019; color: #FFFFFF;
          font-family: 'Mona Sans Variable', sans-serif;
          font-weight: 600; font-size: 13.5px;
          padding: 12px 20px; border: none; border-radius: 100px; cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .tarif-btn:hover { background: #CCF306; color: #1A1526; transform: translateY(-2px); }

        .tarif-notes {
          display: flex; flex-wrap: wrap; gap: 12px 32px;
          justify-content: center; margin-top: 32px;
        }
        .tarif-notes > span {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: 'Mona Sans Variable', sans-serif; font-size: 13.5px;
          color: rgba(20,16,25,0.6);
        }
        .tarif-note-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #CCF306;
        }

        @media (max-width: 720px) {
          .tarif-row {
            grid-template-columns: 1fr;
            gap: 14px;
            text-align: left;
            padding: 24px 22px;
          }
          .tarif-btn { justify-content: center; width: 100%; }
          .tarif-notes { flex-direction: column; align-items: center; gap: 10px; }
        }
        @media (max-width: 768px) {
          #pricing { padding: 80px 20px !important; }
        }
      `}</style>
    </section>
  )
}
