import { useEffect, useRef, useState } from 'react'

import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'
import logo4 from '../assets/logo4.png'
import logo5 from '../assets/logo5.webp'
import logo6 from '../assets/logo6.svg'
import logo7 from '../assets/logo7.svg'

const logos = [
  { src: logo1, alt: 'Partner 1' },
  { src: logo2, alt: 'Partner 2' },
  { src: logo3, alt: 'Partner 3' },
  { src: logo4, alt: 'Partner 4' },
  { src: logo5, alt: 'Partner 5' },
  { src: logo6, alt: 'Partner 6' },
  { src: logo7, alt: 'Partner 7' },
]

/* Triple the array so the seamless loop always has content */
const track = [...logos, ...logos, ...logos]

export default function ClientLogos() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="cl-section">

      {/* ── top rule ── */}
      <div className="cl-rule" />

      {/* ── label ── */}
      <div
        className="cl-label-wrap"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)' }}
      >
        <span className="cl-rule-line" />
        <span className="cl-label-text">Trusted by</span>
        <span className="cl-rule-line" />
      </div>

      {/* ── marquee ── */}
      <div
        className="cl-marquee-wrap"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="cl-mask">
          <div className="cl-track">
            {track.map((logo, i) => (
              <div key={i} className="cl-logo-slot">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="cl-logo-img"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── bottom rule ── */}
      <div className="cl-rule" />

      <style>{`
        .cl-section {
          position: relative;
          padding: 64px 0 56px;
          overflow: hidden;
        }

        /* ── rules ── */
        .cl-rule {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.08) 20%,
            rgba(255,255,255,0.08) 80%,
            transparent
          );
        }

        /* ── label ── */
        .cl-label-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 40px 0 36px;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .cl-label-text {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          white-space: nowrap;
        }
        .cl-rule-line {
          display: block;
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.10);
        }

        /* ── marquee ── */
        .cl-marquee-wrap {
          transition: opacity 0.8s ease 0.15s;
        }
        .cl-mask {
          overflow: hidden;
          /* fade edges */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 7%,
            #000 93%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 7%,
            #000 93%,
            transparent 100%
          );
        }
        .cl-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: cl-scroll 38s linear infinite;
          padding: 12px 0;
        }
        .cl-mask:hover .cl-track {
          animation-play-state: paused;
        }

        /* ── each logo slot — fixed, identical box ── */
        .cl-logo-slot {
          /* every slot is the same rectangle */
          width: 160px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          box-sizing: border-box;
          /* thin right divider */
          border-right: 1px solid rgba(255,255,255,0.06);
          transition: filter 0.3s ease, opacity 0.3s ease;
          /* resting: clearly visible, slight warm tint removed */
          filter: brightness(1.15) contrast(1.08) grayscale(0.15);
          opacity: 0.72;
        }
        .cl-logo-slot:last-child {
          border-right: none;
        }
        .cl-mask:hover .cl-logo-slot:hover {
          filter: brightness(1.3) contrast(1.1) grayscale(0);
          opacity: 1;
        }

        .cl-logo-img {
          /* fills the slot while preserving aspect ratio */
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        @keyframes cl-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  )
}
