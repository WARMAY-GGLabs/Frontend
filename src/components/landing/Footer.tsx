const navLinks = [
  { href: '#hero', label: 'Misión' },
  { href: '#crisis', label: 'Causas' },
  { href: '#como', label: 'Cómo funciona' },
  { href: '#orgs', label: 'Institucional' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0300] border-t border-[#2A1200] flex flex-col items-center">
      {/* Wiphala bar */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            'linear-gradient(90deg,#E40303 14.28%,#FF8C00 14.28% 28.56%,#FFED00 28.56% 42.84%,#008026 42.84% 57.12%,#004DFF 57.12% 71.40%,#750787 71.40% 85.68%,#FFFFFF 85.68%)',
        }}
      />

      <div className="w-full max-w-[700px] px-8 py-12 flex flex-col items-center text-center gap-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-[9px] flex items-center justify-center text-base flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg,#C2672A,#9B3A1A)',
              boxShadow: '0 0 18px #C2672A33',
            }}
          >
            🌸
          </div>
          <span
            className="font-black text-xl tracking-tight leading-none"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: 'linear-gradient(135deg,#E8895A,#F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            WARMAY
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[13px] text-center max-w-[400px] leading-relaxed" style={{ color: '#7A5030' }}>
          Salud materna digital en Bolivia — Español · Quechua · Aymara
        </p>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] transition-colors duration-200 hover:text-[#C2672A]"
              style={{ color: '#6B4020' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #3A1A0A, transparent)' }} />

        {/* Copyright */}
        <p
          className="text-[11px] tracking-wide text-center"
          style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#4A2A10' }}
        >
          © 2026 WARMAY · Programa de Salud Materna · Bolivia
        </p>
      </div>
    </footer>
  );
}