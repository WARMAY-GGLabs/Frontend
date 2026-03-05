import { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  onOpenEmergency: () => void;
}

const navItems = [
  { id: 'hero', label: 'Misión' },
  { id: 'crisis', label: 'Causas' },
  { id: 'como', label: '¿Cómo funciona?' },
  { id: 'orgs', label: 'Institucional' },
];

const languages = ['ES', 'QU', 'AY'];

export default function Navbar({ onOpenEmergency }: NavbarProps) {
  const [activeNav, setActiveNav] = useState('hero');
  const [activeLang, setActiveLang] = useState('ES');

  const scrollTo = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="wiphala-bar" />
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">🌸</div>
          <div>
            <div className="nav-title">WARMAY</div>
            <div className="nav-subtitle">Salvando vidas maternas · Bolivia</div>
          </div>
        </div>

        <div className="nav-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn${activeNav === item.id ? ' active' : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div className="lang-switcher">
            {languages.map((lang) => (
              <button
                key={lang}
                className={`lang-btn${activeLang === lang ? ' active' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
          <button className="nav-panic" onClick={onOpenEmergency}>
            🚨 <span>EMERGENCIA</span>
          </button>
        </div>
      </nav>
    </>
  );
}
