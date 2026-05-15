import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const categories = [
  {
    label: 'Pricing & Budget',
    faqs: [
      {
        q: "Why are you more expensive than other agencies?",
        a: "Because we're not an agency in the traditional sense. You're not paying for account managers, juniors doing the work, or a pitch that gets handed off to someone else. You're paying for a small senior team that has built 50+ products and knows where the mistakes are before they happen. The price is higher. The number of revisions, delays, and rebuilds is lower.",
      },
      {
        q: "Can you work within a smaller budget?",
        a: "Honestly? No—not at the level we work. Our minimum is $8,000 and that's already compressed for a Foundation scope. If your budget is below that, we're not the right fit right now, and we'd rather tell you that than take your money and under-deliver. We can point you toward alternatives that will serve you better at that budget.",
      },
      {
        q: "Why no hourly rate?",
        a: "Hourly billing creates the wrong incentives. When you pay by the hour, you're paying for time—not outcomes. We scope projects by deliverable and charge a fixed price. You know what you're getting before you sign. No surprises, no timesheet arguments.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes. Standard structure is 50% upfront to begin, 50% on delivery. For projects over $20k, we can discuss milestone-based payments tied to specific phases. We don't start work without a signed agreement and initial payment on file.",
      },
      {
        q: "Can I see a quote before a call?",
        a: "Not accurately. A ballpark without understanding your scope is just a guess that creates misaligned expectations. The 30-minute call costs you nothing and gives us both the information to have a real conversation about what's possible and what it costs.",
      },
    ],
  },
  {
    label: 'Process & Timeline',
    faqs: [
      {
        q: "How long will it take?",
        a: "Foundation projects (up to 5 pages): 2–3 weeks. Studio projects (up to 15 pages + CMS): 4–6 weeks. Enterprise / custom code: 8–16 weeks depending on scope. These are real timelines, not the optimistic ones agencies use to close deals. The biggest variable is how fast you review and give feedback.",
      },
      {
        q: "What happens if the project takes longer than expected?",
        a: "We're transparent about delays as soon as they're visible—not after they've already affected the timeline. Most delays come from the client side (late feedback, changed requirements). We build review windows into every phase. If we cause a delay, we own it.",
      },
      {
        q: "How involved do I need to be?",
        a: "Meaningfully involved at three points: the kickoff (90-minute call), the design review (asynchronous in Figma), and the pre-launch check. Outside of those, you trust us to do our job. If you want to be in every meeting approving every color choice, we're not the right fit.",
      },
      {
        q: "What do you need from us to get started?",
        a: "A signed agreement, the initial payment, access to any existing brand assets, and a 90-minute kickoff call in the first week. Everything else we can pull from research, your existing site, and the intake form. We won't block work waiting for assets that aren't ready.",
      },
      {
        q: "Can you start immediately?",
        a: "We typically have a 1–2 week onboarding buffer between signing and active build start. We use that time to prep your brief, research competitors, and set up the project environment. If your timeline is extremely urgent, mention it on the call—we'll tell you honestly whether it's possible.",
      },
    ],
  },
  {
    label: 'Design & Creative',
    faqs: [
      {
        q: "Will I own the designs?",
        a: "Yes. On final payment, you receive full ownership of all source files: Figma files, exported assets, and all code. There are no ongoing licensing fees for the designs we create.",
      },
      {
        q: "What if I don't like the design?",
        a: "Every package includes revision rounds. We also don't show you a final design out of nowhere—we start with wireframes, get alignment on structure, then move to visual design. By the time you see the first high-fidelity design, we've already agreed on the direction. That said, if something genuinely isn't right, we fix it.",
      },
      {
        q: "Can I give you our brand guidelines to follow?",
        a: "Yes. Send them before the kickoff call. We'll review them and tell you honestly if there's anything that needs updating to make the site work. A lot of brand guidelines were written for print and don't translate to web. We'll flag that if it's an issue.",
      },
      {
        q: "We don't have a brand yet. Can you help?",
        a: "Yes. Brand identity is part of our service suite. If you come in without a brand, we'll either include foundational brand work in the scope or recommend doing a focused brand sprint before we start the site. Building a site without a brand direction produces work that needs to be redone in 12 months.",
      },
      {
        q: "Can we see the design before you start building?",
        a: "Yes—that's how we work. We always design before we build. You sign off on the complete Figma design before a single line of code is written. You'll never be surprised by what we build.",
      },
    ],
  },
  {
    label: 'Technology',
    faqs: [
      {
        q: "Which platform do you recommend?",
        a: "It depends entirely on what you need. For most SaaS marketing sites: Webflow. For blogs, content-heavy sites, or WooCommerce: WordPress. For design-heavy brands under 200 pages: Framer. For anything with complex logic, integrations, or high traffic: custom Next.js. We'll tell you which one is right for your situation on the call—not which one we're most comfortable with.",
      },
      {
        q: "We already have a developer. Can you just do the design?",
        a: "Yes. Design-only engagements are available. We'll deliver production-ready Figma files with a component system, interaction specs, and a developer handoff document. We'd want to do a brief call with your developer before starting to make sure our output matches their build environment.",
      },
      {
        q: "Can you redesign our site without touching the code?",
        a: "Not meaningfully. A redesign that doesn't involve the code produces designs that don't reflect what's actually buildable. We do full design and development together, or we do design-only with the understanding that your developer builds from our files.",
      },
      {
        q: "Will the site be fast?",
        a: "Yes. Core Web Vitals are part of our QA process. Every site we ship scores 90+ on Google PageSpeed. If you're on a custom stack, we build for sub-2 second load times. Performance isn't a checkbox—it's a conversion factor.",
      },
      {
        q: "Will I be able to update the site myself?",
        a: "Yes, on every CMS-based project. We set up Webflow CMS, WordPress, or a headless CMS so your team can update content without touching code. We also provide a 60-minute training session and documentation. If you need a developer to make changes, that's a sign the CMS wasn't set up correctly.",
      },
    ],
  },
  {
    label: 'Results',
    faqs: [
      {
        q: "Can you guarantee results?",
        a: "We can't guarantee a specific conversion rate or revenue outcome—no honest agency can. What we guarantee: the design will be approved before we build it, the code will be clean and performant, it will launch on time, and if something breaks after launch we'll fix it. Results come from the site working as designed, your offer being strong, and your traffic being qualified. We handle the first one.",
      },
      {
        q: "How do I know your case studies are real?",
        a: "Every case study on our site names the client and links to the live product. We can provide references on request—real founders you can call or email directly. We don't make up numbers.",
      },
      {
        q: "What if the site doesn't convert after launch?",
        a: "First, we set up analytics and heatmaps at launch so we have data, not guesses. If conversion is underperforming after 30 days, we do a free diagnostic call to identify whether it's a design issue, a copy issue, a traffic quality issue, or an offer issue. Design issues: we fix them. The others: we advise.",
      },
    ],
  },
  {
    label: 'Working Together',
    faqs: [
      {
        q: "Do you work with small companies?",
        a: "We work with companies at the right stage, not the right size. A 2-person startup with traction and a clear offer is a better fit than a 50-person company that hasn't defined what it sells. The question isn't size—it's whether the website has a real job to do.",
      },
      {
        q: "We're in a different country or timezone. Can you work with us?",
        a: "Yes. We've worked with clients across Europe, North America, Southeast Asia, and the Middle East. The whole process is async-friendly. Kickoff and review calls are the only time-sensitive touchpoints—we find an overlap window that works for both sides.",
      },
      {
        q: "How many projects do you take at once?",
        a: "2–3 active projects at any time. That's intentional. When you're a client, you get real attention—not a slot in a production queue with 20 others.",
      },
      {
        q: "What happens after launch?",
        a: "You receive all source files and full ownership of the product. For clients who want ongoing support: monthly retainers start at $1,500/month and include a set number of design and dev hours. Most clients stay on retainer for the first 3–6 months while the site is actively iterated on post-launch data.",
      },
      {
        q: "Why should I hire you instead of building it myself on Squarespace?",
        a: "You absolutely can build it yourself on Squarespace. If your website is a brochure, that's fine. If your website is your primary acquisition channel—and for SaaS, startups, and hospitality it almost always is—then the gap between a template site and a conversion-engineered site is measured in revenue. That's the decision you're actually making.",
      },
    ],
  },
]

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          padding: '24px 0', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 17, fontWeight: 600,
          color: open ? '#FFFFFF' : 'rgba(255,255,255,0.82)',
          lineHeight: 1.35, letterSpacing: '-0.01em',
          transition: 'color 0.25s ease',
        }}>
          {q}
        </span>
        <span style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: open ? '#C7F751' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${open ? '#C7F751' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open ? '#0A2622' : '#FFFFFF',
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
          fontFamily: "'Inter', sans-serif",
          fontSize: 15, color: 'rgba(255,255,255,0.48)',
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
    <section id="faq" style={{ padding: '120px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
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
            fontFamily: "'Inter', sans-serif",
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: '#C7F751', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 28, height: 1, background: '#C7F751', display: 'inline-block' }} />
            Part 04 — FAQ
          </p>

          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            color: '#FFFFFF', lineHeight: 1.05, margin: '0 0 20px',
          }}>
            Every Vague Question,{' '}
            <em style={{ fontStyle: 'italic', color: '#C7F751', fontWeight: 700, textShadow: '0 0 40px rgba(199,247,81,0.3)' }}>
              Answered.
            </em>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7, maxWidth: 580, margin: 0,
          }}>
            Real questions asked by email, on calls, and in DMs — answered directly.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          marginBottom: 40,
        }}>
          {categories.map((cat, i) => {
            const active = activeTab === i
            return (
              <button
                key={i}
                onClick={() => handleTab(i)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.04em',
                  padding: '8px 16px',
                  borderRadius: 100,
                  border: `1px solid ${active ? 'rgba(199,247,81,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  background: active ? 'rgba(199,247,81,0.1)' : 'rgba(255,255,255,0.04)',
                  color: active ? '#C7F751' : 'rgba(255,255,255,0.45)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                  }
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Accordion */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
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
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.2)',
          marginTop: 32, textAlign: 'right',
          letterSpacing: '0.06em',
        }}>
          {current.faqs.length} questions in this category · {categories.reduce((s, c) => s + c.faqs.length, 0)} total
        </p>

      </div>
    </section>
  )
}
