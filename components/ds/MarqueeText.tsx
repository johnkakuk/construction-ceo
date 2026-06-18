'use client'

import { useRef, useEffect, useState } from 'react'

export function MarqueeText({
  children,
  style,
  className,
  fadeColor,
}: {
  children: string
  style?: React.CSSProperties
  className?: string
  fadeColor?: string
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const outer = outerRef.current
    const measure = measureRef.current
    if (!outer || !measure) return

    function check() {
      if (outer && measure) setOverflows(measure.scrollWidth > outer.clientWidth + 1)
    }

    check()
    const ro = new ResizeObserver(check)
    ro.observe(outer)
    return () => ro.disconnect()
  }, [children])

  return (
    <div ref={outerRef} style={{ overflow: 'hidden', position: 'relative', ...style }} className={className}>
      {/* Always-rendered hidden span for accurate measurement regardless of animation state */}
      <span ref={measureRef} aria-hidden style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
        {children}
      </span>
      {overflows ? (
        <>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'cc-marquee 15s linear infinite', willChange: 'transform' }}>
            <span style={{ paddingRight: '4em' }}>{children}</span>
            <span aria-hidden style={{ paddingRight: '4em' }}>{children}</span>
          </span>
          {fadeColor && (
            <div aria-hidden style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: 48,
              background: `linear-gradient(to right, transparent, ${fadeColor})`,
              pointerEvents: 'none',
            }} />
          )}
        </>
      ) : (
        <span style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {children}
        </span>
      )}
    </div>
  )
}
