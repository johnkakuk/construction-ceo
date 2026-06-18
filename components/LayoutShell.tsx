'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import { AudioProvider } from '@/app/AudioProvider'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) return <>{children}</>

  return (
    <AudioProvider>
      <div style={{ position: 'relative' }}>
        {/* Black underlay at top of document — scrolls away, making header appear solid black when at top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 68, background: '#1c1a14', zIndex: 1 }} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </AudioProvider>
  )
}
