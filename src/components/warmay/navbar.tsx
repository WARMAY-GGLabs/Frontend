


import { Flower2, Menu, X, Smartphone } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '#mision', label: 'Mision' },
  { href: '#como-funciona', label: 'Como funciona?' },
  { href: '#institucional', label: 'Institucional' },
  { href: '#tecnologia', label: 'Tecnologia' },
  { href: '#nosotros', label: 'Nosotros' },
]

export function Navbar({ onAppDemoClick }: { onAppDemoClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(15,5,0,0.92)] backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 md:px-7 gap-3">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-destructive flex items-center justify-center shadow-[0_0_20px_rgba(194,103,42,0.4)]">
            <Flower2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-serif font-black text-xl leading-none text-foreground">WARMAY</div>
            <div className="text-[10px] text-muted-foreground font-mono tracking-widest">Salvando vidas maternas</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-0.5 flex-wrap justify-center">
          {navItems.map((item) => (
            <NavButton key={item.href} href={item.href}>{item.label}</NavButton>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAppDemoClick}
            type="button"
            className="px-3 py-2 rounded-lg border-none cursor-pointer font-sans text-xs font-extrabold bg-destructive text-white animate-pulse flex items-center gap-1.5 hover:bg-[#991B1B] transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">App Demo</span>
          </button>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 border-t border-border bg-[rgba(15,5,0,0.98)]">
          <div className="flex flex-col gap-1 pt-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

function NavButton({ 
  children, 
  href, 
}: { 
  children: React.ReactNode
  href: string
}) {
  return (
    <a
      href={href}
      className={cn(
        "px-3.5 py-2 rounded-lg border-none cursor-pointer font-sans text-xs font-semibold text-muted-foreground bg-transparent transition-all whitespace-nowrap hover:bg-secondary hover:text-foreground"
      )}
    >
      {children}
    </a>
  )
}

