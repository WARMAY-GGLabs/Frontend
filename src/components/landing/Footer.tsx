import './Footer.css';

const links = [
  { href: '#hero', label: 'Misión' },
  { href: '#crisis', label: 'Causas' },
  { href: '#como', label: '¿Cómo funciona?' },
  { href: '#orgs', label: 'Institucional' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="footer-logo">🌸</div>
        <div className="footer-title">WARMAY</div>
      </div>
      <div className="footer-tagline">Salvando vidas maternas · Bolivia</div>
      <div className="footer-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="footer-copy">
        © 2026 WARMAY — Programa de Salud Materna · Bolivia
      </div>
    </footer>
  );
}
