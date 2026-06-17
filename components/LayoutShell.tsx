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
      <Nav />
      <main>{children}</main>
      <Footer />
    </AudioProvider>
  )
}
