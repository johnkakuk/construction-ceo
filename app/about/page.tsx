import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'About — Construction CEO',
  description: 'About Jonathan and the Construction CEO podcast.',
}

export default function About() {
  return (
    <>
      {/* Dark hero — The Show */}
      <section style={{ background: 'var(--ink-900)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.008) 0 18px, transparent 18px 40px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '8%', transform: 'translateY(-50%)', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,62,0.14), transparent 65%)', pointerEvents: 'none' }} />
        <div className="cc-container" style={{ position: 'relative' }}>
          <div className="py-16">
            <span className="cc-tick mb-5 block" />
            <p className="cc-eyebrow mb-4" style={{ color: 'var(--ochre-400)' }}>About</p>
            <h1 className="font-display text-5xl font-black leading-tight tracking-[-0.035em]" style={{ color: 'var(--paper-50)' }}>
              The show
            </h1>
          </div>
        </div>
      </section>

      <div className="cc-container">
      <section className="border-b border-[var(--border-subtle)] py-14">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_0.9fr]">

          {/* Left: text */}
          <div>
            <p style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 500, lineHeight: 1.55, color: 'var(--text-strong)', maxWidth: '52ch', marginBottom: '2.5rem' }}>
              Construction CEO exists because the most important conversations in commercial construction never make it onto a stage, into a trade publication, or through a PR filter.
            </p>
            <div style={{ width: 48, height: 2, background: 'var(--border-strong)', marginBottom: '2.5rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p className="text-lg leading-8 text-[var(--text-body)]">
                The executives who have built the best companies in this industry tend to be private people. They are not interested in becoming influencers. They are interested in building.
              </p>
              <p className="text-lg leading-8 text-[var(--text-body)]">
                This podcast creates the conditions for them to think out loud about leadership, operations, capital, and the decisions that determined what kind of company they built.
              </p>
            </div>
          </div>

          {/* Right: topic index card + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: 'var(--ink-900)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.008) 0 18px, transparent 18px 40px)' }} />
              <div style={{ position: 'absolute', top: -80, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,62,0.18), transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <p className="cc-eyebrow" style={{ color: 'var(--ochre-400)', marginBottom: 28 }}>What we cover</p>
                {[
                  'Leadership at scale',
                  'Growth & capital strategy',
                  'Operations, systems & hiring',
                  'Lessons from decades of execution',
                ].map((topic, i, arr) => (
                  <div key={topic} style={{ display: 'flex', alignItems: 'baseline', gap: 18, paddingBottom: 20, marginBottom: i < arr.length - 1 ? 20 : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ochre-500)', letterSpacing: '0.1em', flexShrink: 0 }}>
                      0{i + 1}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--paper-50)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                      {topic}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 16 }}>
                  <Button href="/podcast" variant="inverse">Browse all episodes</Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Jonathan */}
      <section className="grid items-center gap-14 py-14 lg:grid-cols-[auto_1fr]">
        {/* Portrait */}
        <div style={{ width: 240, height: 240, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--border)', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=480&h=480&fit=crop&crop=face"
            alt="Jonathan — host of Construction CEO"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Content */}
        <div>
          <p className="cc-eyebrow mb-4">About Jonathan</p>
          <h2 className="font-display text-3xl font-black tracking-[-0.025em] text-[var(--text-strong)]" style={{ marginBottom: '1.25rem' }}>
            Operator-level interviews.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="text-base leading-8 text-[var(--text-body)]">
            <p>
              Jonathan has spent years studying how commercial construction companies are built and led. His interviews are driven by curiosity about the operational and leadership realities that separate great firms from the rest.
            </p>
            <p>
              The goal is simple: preserve and share executive insight from the leaders shaping the future of commercial and industrial construction.
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
