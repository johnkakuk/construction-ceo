import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type BaseProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse'
  className?: string
}

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    href: string
  }

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined
  }

function classes(variant: BaseProps['variant'] = 'primary', className = '') {
  const base =
    'inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] px-5 font-sans text-sm font-semibold transition duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'
  const variants = {
    primary: 'bg-[var(--accent)] text-[var(--ink-950)] hover:bg-[var(--accent-hover)]',
    secondary:
      'border border-[var(--border)] bg-transparent text-[var(--text-strong)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]',
    ghost: 'text-[var(--text-strong)] hover:bg-[var(--surface-sunken)]',
    inverse:
      'border border-[var(--border-inverse)] bg-transparent text-[var(--paper-50)] hover:bg-white/10',
  }

  return `${base} ${variants[variant]} ${className}`.trim()
}

export default function Button(props: LinkButtonProps | NativeButtonProps) {
  if (typeof props.href === 'string') {
    const { children, variant, className, ...rest } = props as LinkButtonProps
    return (
      <Link {...rest} className={classes(variant, className)}>
        {children}
      </Link>
    )
  }

  const { children, variant, className, ...rest } = props as NativeButtonProps
  return (
    <button {...rest} className={classes(variant, className)}>
      {children}
    </button>
  )
}
