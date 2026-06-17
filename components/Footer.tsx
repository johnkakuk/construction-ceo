import Link from 'next/link'
import Logo from './Logo'

const AppleIcon = () => (
  <svg width="11" height="13" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.4 143.4-317.3 284.2-317.3 75.8 0 138.8 50 184.5 50 43.8 0 112.7-53.5 196.2-53.5 31.3 0 134.5 2.9 197.6 113zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
  </svg>
)
const SpotifyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.6.6 0 01-.9.2c-2.4-1.5-5.5-1.8-9.1-1a.6.6 0 11-.3-1.2c4-.9 7.4-.5 10.1 1.1.3.2.4.6.2.9zm1.2-2.7a.8.8 0 01-1 .3c-2.8-1.7-7-2.2-10.2-1.2a.8.8 0 11-.5-1.5c3.7-1.1 8.3-.6 11.5 1.4.3.2.5.7.2 1zm.1-2.8C14.6 8.9 9 8.7 5.8 9.7a.9.9 0 11-.6-1.8C9 6.7 15.2 6.9 19 9.2a.9.9 0 11-1 1.6z" />
  </svg>
)
const YouTubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1c0 2.3.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 22.2 12 22.2 12 22.2s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5v-2.1C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
  </svg>
)

type FooterSection = { heading: string; links: { label: string; href: string }[] }

const footerSections: FooterSection[] = [
  {
    heading: 'Show',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Episodes', href: '/podcast' },
      { label: 'About', href: '/about' },
      { label: 'Subscribe', href: '/subscribe' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact', href: 'mailto:contact@constructionceo.com' },
      { label: 'Advertise', href: 'mailto:advertise@constructionceo.com' },
    ],
  },
]

const platformButtons = [
  { label: 'Apple', href: 'https://podcasts.apple.com/us/podcast/construction-ceo-podcast/id1896663374', icon: <AppleIcon /> },
  { label: 'Spotify', href: 'https://open.spotify.com/show/033gFccjNwRC5NPHkGpApG', icon: <SpotifyIcon /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@ConstructionCEO', icon: <YouTubeIcon /> },
]

export default function Footer() {
  return (
    <footer className="theme-dark" style={{ background: 'var(--ink-900)', color: 'var(--paper)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 28px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>

          {/* Brand block */}
          <div style={{ maxWidth: 320 }}>
            <span className="cc-footer-brand" style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <Logo variant="monogram" size={48} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--concrete-300)' }}>
                  The podcast for industry leaders
                </span>
                <Logo variant="wordmark" size={38} tone="dark" />
              </span>
            </span>
            <p style={{ fontSize: 14, color: 'var(--steel-400)', marginTop: 16, lineHeight: 1.6 }}>
              Candid, long-form conversations with the leaders shaping commercial and industrial construction.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              {platformButtons.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    height: 32, padding: '0 12px',
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-inverse)',
                    background: 'transparent', color: 'var(--paper)', textDecoration: 'none',
                    transition: 'background 120ms ease-out',
                  }}
                >
                  {icon}{label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: 'flex', gap: 64 }}>
            {footerSections.map(({ heading, links }) => (
              <div key={heading}>
                <div className="cc-eyebrow" style={{ color: 'var(--steel-400)', marginBottom: 14 }}>{heading}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map(({ label, href }) => (
                    <Link key={label} href={href} style={{ fontSize: 14, color: 'var(--steel-300)', textDecoration: 'none' }}>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '36px 0 20px', height: 1, background: 'var(--border-inverse)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--steel-500)', letterSpacing: '0.04em' }}>
          <span>© {new Date().getFullYear()} Construction CEO</span>
          <span>Built, not hyped.</span>
        </div>
      </div>
    </footer>
  )
}
