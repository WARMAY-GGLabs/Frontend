import { useState } from "react";
import { useLang } from '../../lib/i18n';
import type { Lang } from '../../lib/i18n';

// ── CSS Variables & Styles ──
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

  :root {
    --earth: #C2672A;
    --earth-d: #8B3A10;
    --earth-l: #E8895A;
    --panic: #DC2626;
    --base: #1A0800;
    --base2: #271205;
    --base3: #3D1E0A;
    --border: #5C3018;
    --muted: #9A6040;
    --text: #FDF6EC;
    --text2: #E8C9A0;
    --text3: #B8915A;
    --display: 'Playfair Display', Georgia, serif;
    --body: 'Nunito', 'Helvetica Neue', sans-serif;
    --mono: 'IBM Plex Mono', monospace;
    --blur-lg: blur(24px);
    --blur-sm: blur(8px);
  }

  .wiphala-bar {
    height: 5px;
    background: linear-gradient(90deg,
      #E40303 14.28%,
      #FF8C00 14.28% 28.56%,
      #FFED00 28.56% 42.84%,
      #008026 42.84% 57.12%,
      #004DFF 57.12% 71.40%,
      #750787 71.40% 85.68%,
      #FFFFFF 85.68%
    );
  }

  .warmay-nav {
    position: sticky;
    top: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 28px;
    gap: 12px;
    flex-wrap: wrap;
    background: rgba(15, 5, 0, 0.92);
    backdrop-filter: var(--blur-lg);
    -webkit-backdrop-filter: var(--blur-lg);
    border-bottom: 1px solid var(--border);
    font-family: var(--body);
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-logo {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--earth), var(--panic));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    box-shadow: 0 0 20px #C2672A40;
  }

  .nav-title {
    font-family: var(--display);
    font-size: 20px;
    font-weight: 900;
    line-height: 1;
    color: var(--text);
  }

  .nav-subtitle {
    font-size: 10px;
    color: var(--muted);
    font-family: var(--mono);
    letter-spacing: 0.1em;
  }

  .nav-center {
    display: flex;
    gap: 2px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-btn {
    padding: 8px 14px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-family: var(--body);
    font-size: 12px;
    font-weight: 600;
    color: var(--text3);
    background: transparent;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .nav-btn:hover,
  .nav-btn.active {
    background: var(--base3);
    color: var(--text);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lang-switcher {
    display: flex;
    background: var(--base3);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .lang-btn {
    padding: 6px 10px;
    border: none;
    cursor: pointer;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    background: transparent;
    color: var(--text3);
    transition: all 0.2s;
  }

  .lang-btn.active {
    background: var(--earth);
    color: #fff;
  }

  .nav-panic {
    padding: 8px 14px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: var(--panic);
    color: #fff;
    font-family: var(--body);
    font-size: 12px;
    font-weight: 800;
    animation: navPulse 2s ease-in-out infinite;
    white-space: nowrap;
  }

  @keyframes navPulse {
    0%, 100% { box-shadow: 0 0 0 0 #DC262660; }
    50%       { box-shadow: 0 0 0 8px transparent; }
  }
`;

// ── Types ──
type Page = "inicio" | "app" | "crisis" | "prenatal" | "blockchain" | "nosotros";

const LANGS: Lang[] = ["EN", "ES", "QU", "AY"];

// ── Props ──
interface NavbarProps {
  activePage?: Page;
  onPageChange?: (page: Page) => void;
  onPanicClick?: () => void;
}

// ── Component ──
export default function Navbar({
  activePage: initialPage = "inicio",
  onPageChange,
  onPanicClick,
}: NavbarProps) {
  const [activePage, setActivePage] = useState<Page>(initialPage);
  const { lang, setLang, t } = useLang();

  const NAV_ITEMS: { id: Page; label: string }[] = [
    { id: "inicio",     label: t.nav.mission },
    { id: "app",        label: t.nav.app },
    { id: "crisis",     label: t.nav.howItWorks },
    { id: "prenatal",   label: t.nav.institutional },
    { id: "blockchain", label: t.nav.technology },
    { id: "nosotros",   label: t.nav.about },
  ];

  const handlePage = (page: Page) => {
    setActivePage(page);
    onPageChange?.(page);
  };

  const handleLang = (l: Lang) => {
    setLang(l);
  };

  return (
    <>
      <style>{styles}</style>

      {/* Wiphala colour bar */}
      <div className="wiphala-bar" />

      {/* Main navbar */}
      <nav className="warmay-nav">

        {/* Brand */}
        <div className="nav-brand">
          <div className="nav-logo">🌸</div>
          <div>
            <div className="nav-title">WARMAY</div>
            <div className="nav-subtitle">SALVANDO VIDAS MATERNAS</div>
          </div>
        </div>

        {/* Page links */}
        <div className="nav-center">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav-btn${activePage === id ? " active" : ""}`}
              onClick={() => handlePage(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side: lang switcher + panic button */}
        <div className="nav-right">
          <div className="lang-switcher">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`lang-btn${lang === l ? " active" : ""}`}
                onClick={() => handleLang(l)}
              >
                {l}
              </button>
            ))}
          </div>

          <button className="nav-panic" onClick={onPanicClick}>
            🚨 {t.emergency}
          </button>
        </div>
      </nav>
    </>
  );
}