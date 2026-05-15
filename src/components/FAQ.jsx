import { useState } from 'react'

const faqs = [
  {
    q: "We have a designer in-house. Can you just do development?",
    a: "Yes — we take well-specified Figma files and build them into production-ready React or Next.js. If your design is production-ready, we start there. If it needs refinement before development begins, we'll flag it upfront and scope accordingly.",
  },
  {
    q: "How is FUTURA different from a freelancer or a traditional agency?",
    a: "Freelancers work alone and juggle multiple clients. Traditional agencies layer in account managers and junior teams. FUTURA is a senior studio — the people who scope, design, and build your product are the same people you talk to every week. No handoffs between strangers, no briefing chains.",
  },
  {
    q: "Can you work with our existing tech stack?",
    a: "Usually, yes. We work in React, Next.js, TypeScript, and most modern front-end stacks. If you're running something legacy or unusual, we'll scope accordingly and be transparent about where constraints exist before any agreement is signed.",
  },
  {
    q: "How do you handle revisions and feedback?",
    a: "Each phase includes two structured rounds of revisions. We don't do open-ended feedback loops — they slow projects down and dilute creative direction. We present clearly, explain the reasoning behind every decision, and iterate with purpose.",
  },
  {
    q: "What does the 6-week delivery actually look like?",
    a: "Week 1: strategy and architecture. Weeks 2–3: design. Weeks 4–5: build and integration. Week 6: QA, final review, and ship. The timeline assumes you're available for the kickoff call and can give feedback within 48 hours at each milestone.",
  },
  {
    q: "Do you offer ongoing support after the product launches?",
    a: "Every project includes a post-launch support window. After that, we offer a monthly retainer for ongoing iteration, feature design, and product evolution. Most clients stay engaged for 3–6 months post-launch — your product roadmap doesn't stop at launch, and neither do we.",
  },
]

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          padding: '28px 0', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
          {q}
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: '50%',
          background: open ? '#A8D830' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${open ? '#A8D830' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          color: '#FFFFFF',
          fontSize: 18, lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'none',
        }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, paddingBottom: 28 }}>
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" style={{
      padding: '120px 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#00FF87', marginBottom: 16 }}>
            FAQ
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1.05, marginBottom: 16 }}>
            Before we talk.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.45)' }}>
            Honest answers to the questions we hear before every engagement.
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              {...faq}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
