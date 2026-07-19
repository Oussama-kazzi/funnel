import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/context'

const GOLD = '#CCF306'

const SERVICES = ['Site web', 'Landing page', 'Application (web/mobile)', 'Autres']

export default function BookingForm({ id = 'booking', className = '' }) {
  const { t } = useLang()
  const [form, setForm] = useState({
    name: '', phone: '', email: '', company: '', domain: '',
  })
  const [services, setServices] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const toggleService = (s) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={`bf-wrap ${className}`} {...(id ? { id } : {})}>
      <style>{css}</style>

      <motion.div
        className="bf-card"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {submitted ? (
          <div className="bf-success">
            <div className="bf-success-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="bf-success-title">{t('Bien reçu. Nous vous répondons sous 24h.')}</h3>
            <p className="bf-success-text">
              {t('Merci pour votre demande. Notre équipe vous recontacte très vite pour planifier votre appel gratuit.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="bf-title">{t('Réservez un appel gratuit')}</h2>

            {/* Nom Complet */}
            <div className="bf-field">
              <label className="bf-label">{t('Nom Complet')} <span className="bf-req">*</span></label>
              <input
                type="text" className="bf-input" placeholder={t('Nom Complet')} required
                value={form.name} onChange={e => set('name', e.target.value)}
              />
            </div>

            {/* Numéro whatsapp */}
            <div className="bf-field">
              <label className="bf-label">{t('Numéro whatsapp')} <span className="bf-req">*</span></label>
              <div className="bf-phone">
                <span className="bf-phone-code">
                  <span className="bf-flag" aria-hidden="true">🇲🇦</span>
                  <span>+212</span>
                </span>
                <input
                  type="tel" className="bf-input bf-input-phone" placeholder={t('Votre Numéro')} required
                  value={form.phone} onChange={e => set('phone', e.target.value)}
                />
              </div>
            </div>

            {/* E-mail */}
            <div className="bf-field">
              <label className="bf-label">{t('E-mail')} <span className="bf-req">*</span></label>
              <input
                type="email" className="bf-input" placeholder={t('Votre Email')} required
                value={form.email} onChange={e => set('email', e.target.value)}
              />
            </div>

            {/* Nom d'entreprise */}
            <div className="bf-field">
              <label className="bf-label">{t('Nom d’entreprise ( Optionnel )')}</label>
              <input
                type="text" className="bf-input" placeholder=""
                value={form.company} onChange={e => set('company', e.target.value)}
              />
            </div>

            {/* Domaine d'activité */}
            <div className="bf-field">
              <label className="bf-label">{t('Domaine d’activité')}</label>
              <input
                type="text" className="bf-input" placeholder={t('(eg. Commerce, BTP, Tourisme…)')}
                value={form.domain} onChange={e => set('domain', e.target.value)}
              />
            </div>

            {/* Service souhaité */}
            <div className="bf-field">
              <label className="bf-label">{t('Service souhaité')}</label>
              <div className="bf-checks">
                {SERVICES.map(s => (
                  <label key={s} className="bf-check">
                    <input
                      type="checkbox"
                      checked={services.includes(s)}
                      onChange={() => toggleService(s)}
                    />
                    <span className="bf-check-box" />
                    <span className="bf-check-label">{t(s)}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="bf-submit">{t('Suivant')}</button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

const css = `
  .bf-wrap {
    display: flex; justify-content: center;
    padding: 0 24px 72px;
  }
  .bf-card {
    width: 100%; max-width: 640px;
    background: #FFFFFF;
    border: 1px solid rgba(26,21,38,0.08);
    border-radius: 24px;
    padding: clamp(28px, 4vw, 44px);
    box-shadow: 0 22px 52px rgba(20,16,25,0.06), 0 3px 10px rgba(20,16,25,0.04);
  }
  .bf-title {
    font-family: 'Mona Sans Variable', sans-serif;
    font-size: clamp(28px, 4vw, 40px); font-weight: 800;
    letter-spacing: -0.03em; color: #1A1526;
    margin: 0 0 28px;
  }
  .bf-field { margin-bottom: 20px; }
  .bf-label {
    display: block;
    font-family: 'Mona Sans Variable', sans-serif;
    font-size: 14px; font-weight: 700; color: #1A1526;
    margin-bottom: 8px;
  }
  .bf-req { color: ${GOLD}; }
  .bf-input {
    width: 100%;
    font-family: 'Mona Sans Variable', sans-serif;
    font-size: 15px; color: #1A1526;
    background: rgba(26,21,38,0.03);
    border: 1.5px solid rgba(26,21,38,0.12);
    border-radius: 12px;
    padding: 13px 16px;
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }
  .bf-input::placeholder { color: rgba(26,21,38,0.38); }
  .bf-input:focus {
    border-color: ${GOLD};
    background: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(204,243,6,0.18);
  }
  .bf-phone {
    display: flex; align-items: stretch; gap: 0;
    border: 1.5px solid rgba(26,21,38,0.12);
    border-radius: 12px;
    background: #FFFFFF;
    overflow: hidden;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .bf-phone:focus-within {
    border-color: ${GOLD};
    box-shadow: 0 0 0 3px rgba(204,243,6,0.18);
  }
  .bf-phone-code {
    display: flex; align-items: center; gap: 6px;
    padding: 0 12px;
    font-family: 'Mona Sans Variable', sans-serif;
    font-size: 15px; font-weight: 600; color: #1A1526;
    background: rgba(26,21,38,0.03);
    border-right: 1.5px solid rgba(26,21,38,0.10);
    white-space: nowrap;
  }
  .bf-flag { font-size: 18px; line-height: 1; }
  .bf-input-phone {
    border: none; border-radius: 0; background: transparent; box-shadow: none;
    flex: 1; min-width: 0;
  }
  .bf-input-phone:focus { box-shadow: none; background: transparent; }
  .bf-checks { display: flex; flex-wrap: wrap; gap: 22px; margin-top: 4px; }
  .bf-check {
    display: inline-flex; align-items: center; gap: 9px;
    cursor: pointer;
    font-family: 'Mona Sans Variable', sans-serif;
  }
  .bf-check input { position: absolute; opacity: 0; width: 0; height: 0; }
  .bf-check-box {
    width: 20px; height: 20px; border-radius: 6px;
    border: 1.5px solid rgba(26,21,38,0.22);
    background: #FFFFFF;
    display: inline-flex; align-items: center; justify-content: center;
    transition: all 0.18s ease;
    flex-shrink: 0;
  }
  .bf-check input:checked + .bf-check-box {
    background: ${GOLD}; border-color: ${GOLD};
  }
  .bf-check input:checked + .bf-check-box::after {
    content: '';
    width: 10px; height: 6px;
    border-left: 2px solid #1A1526; border-bottom: 2px solid #1A1526;
    transform: rotate(-45deg) translateY(-1px);
  }
  .bf-check input:focus-visible + .bf-check-box {
    box-shadow: 0 0 0 3px rgba(204,243,6,0.3);
  }
  .bf-check-label {
    font-size: 14.5px; color: #1A1526; font-weight: 500;
  }
  .bf-submit {
    width: 100%; margin-top: 12px;
    font-family: 'Mona Sans Variable', sans-serif;
    font-size: 15px; font-weight: 800; letter-spacing: -0.01em;
    color: ${GOLD}; background: #1A1526;
    border: none; border-radius: 12px;
    padding: 16px; cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease;
  }
  .bf-submit:hover { transform: translateY(-2px); background: #000000; }

  .bf-success { text-align: center; padding: 12px 0; }
  .bf-success-icon {
    width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 20px;
    background: rgba(204,243,6,0.12); border: 1px solid rgba(204,243,6,0.3);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 32px rgba(204,243,6,0.14);
  }
  .bf-success-title {
    font-family: 'Mona Sans Variable', sans-serif;
    font-size: 24px; font-weight: 800; color: #1A1526;
    letter-spacing: -0.03em; margin: 0 0 12px;
  }
  .bf-success-text {
    font-family: 'Mona Sans Variable', sans-serif;
    font-size: 14.5px; color: rgba(26,21,38,0.65); line-height: 1.7;
    max-width: 400px; margin: 0 auto;
  }

  @media (max-width: 560px) {
    .bf-checks { flex-direction: column; gap: 12px; }
  }
`
