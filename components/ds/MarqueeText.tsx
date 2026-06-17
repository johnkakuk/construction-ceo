'use client'

import { useRef, useEffect, useState } from 'react'

export function MarqueeText({
  children,
  style,
  className,
}: {
  children: string
  style?: React.CSSProperties
  className?: string
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (outer && inner) {
      setOverflows(inner.scrollWidth > outer.clientWidth + 1)
    }
  }, [children])

  return (
    <div ref={outerRef} style={{ overflow: 'hidden', ...style }} className={className}>
      {overflows ? (
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'cc-marquee 14s linear infinite', willChange: 'transform' }}>
          <span ref={innerRef} style={{ paddingRight: '4em' }}>{children}</span>
          <span aria-hidden style={{ paddingRight: '4em' }}>{children}</span>
        </span>
      ) : (
        <span ref={innerRef} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {children}
        </span>
      )}
    </div>
  )
}
