import { useState } from "react";
import Navbar from "../../components/landing/Navbar";
import EmergencyModal from "../../components/landing/EmergencyModal";

type Page = "inicio" | "app" | "crisis" | "prenatal" | "blockchain" | "nosotros";

interface InstitucionalPageProps {
  onPageChange?: (page: Page) => void;
}

const styles = `
  .inst-root {
    background: #1A0800;
    min-height: 100vh;
    color: #FDF6EC;
    font-family: 'Nunito', 'Helvetica Neue', sans-serif;
  }

  /* ── HERO ── */
  .inst-hero {
    padding: 80px 28px;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
  }
  .inst-eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: .2em;
    color: #C2672A;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: inline-block;
    padding: 4px 12px;
    background: rgba(194,103,42,0.15);
    border-radius: 20px;
  }
  .inst-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: clamp(32px, 5vw, 60px);
    line-height: 1.1;
    margin-bottom: 16px;
    text-shadow: 0 2px 20px rgba(0,0,0,.8);
  }
  .inst-title em { font-style: normal; color: #C2672A; }
  .inst-sub {
    font-size: 16px;
    color: #E8C9A0;
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.7;
    padding: 12px 20px;
    background: rgba(15,5,0,.6);
    backdrop-filter: blur(8px);
    border-radius: 12px;
  }
  .inst-ctas {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .inst-btn-primary {
    padding: 16px 32px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #C2672A, #8B3A10);
    color: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 800;
    box-shadow: 0 4px 30px rgba(194,103,42,0.35);
    transition: all .25s;
  }
  .inst-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 40px rgba(194,103,42,0.55);
  }
  .inst-btn-secondary {
    padding: 16px 32px;
    border-radius: 14px;
    cursor: pointer;
    background: transparent;
    color: #E8C9A0;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid #5C3018;
    transition: all .25s;
  }
  .inst-btn-secondary:hover {
    border-color: #C2672A;
    color: #C2672A;
  }

  /* ── TARGET GRID ── */
  .inst-target-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 28px 80px;
  }
  .inst-target-card {
    background: rgba(39,18,5,.88);
    backdrop-filter: blur(16px);
    border: 1px solid #5C3018;
    border-radius: 18px;
    padding: 26px;
    transition: all .3s;
  }
  .inst-target-card:hover {
    border-color: #C2672A;
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(194,103,42,0.1);
  }
  .inst-target-icon {
    font-size: 34px;
    margin-bottom: 14px;
  }
  .inst-target-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 9px;
    color: #FDF6EC;
  }
  .inst-target-desc {
    font-size: 13px;
    color: #B8915A;
    line-height: 1.6;
    margin-bottom: 14px;
  }
  .inst-feat-item {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    font-size: 12px;
    color: #E8C9A0;
    margin-bottom: 5px;
  }
  .inst-feat-check {
    color: #C2672A;
    flex-shrink: 0;
    font-weight: 700;
  }

  /* ── IMPACT BAND ── */
  .inst-impact-band {
    background: rgba(39,18,5,.6);
    backdrop-filter: blur(16px);
    border-top: 1px solid #5C3018;
    border-bottom: 1px solid #5C3018;
    padding: 60px 28px;
  }
  .inst-impact-inner { max-width: 1100px; margin: 0 auto; }

  .inst-section-header { text-align: center; margin-bottom: 40px; }
  .inst-section-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: .2em;
    color: #C2672A;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: inline-block;
    padding: 4px 12px;
    background: rgba(194,103,42,0.15);
    border-radius: 20px;
  }
  .inst-section-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.1;
    text-shadow: 0 2px 16px rgba(0,0,0,.7);
  }
  .inst-section-title em { font-style: normal; color: #C2672A; }

  .inst-impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin-top: 40px;
  }
  .inst-impact-item { text-align: center; }
  .inst-impact-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: 48px;
    color: #C2672A;
    text-shadow: 0 2px 20px rgba(0,0,0,.7);
    line-height: 1;
  }
  .inst-impact-label {
    font-size: 13px;
    color: #B8915A;
    margin-top: 8px;
    line-height: 1.4;
    padding: 6px 10px;
    background: rgba(26,8,0,.5);
    border-radius: 8px;
  }
`;

const TARGET_CARDS = [
  {
    icon: "🌍",
    name: "OPS / OMS / UNFPA",
    desc: "Infraestructura verificable para programas de salud materna. Datos en tiempo real, imposibles de falsificar.",
    feats: [
      "Dashboard de métricas por región",
      "API de integración con SNIS Bolivia",
      "Reportes blockchain automáticos",
      "Auditoría en tiempo real",
    ],
  },
  {
    icon: "🏛️",
    name: "Gobierno Boliviano",
    desc: "Política pública digital verificable. Los subsidios llegan a quienes los necesitan, no a intermediarios.",
    feats: [
      "Zero corrupción: blockchain + WorldID",
      "Trilingüe: ES + Quechua + Aymara",
      "Offline (SMS fallback)",
      "Compatible SIS y SAFCI",
    ],
  },
  {
    icon: "🤱",
    name: "ONGs y OSC Locales",
    desc: "Herramienta de campo para parteras, promotoras de salud y organizaciones comunitarias.",
    feats: [
      "Modo sin internet (SMS)",
      "Registro offline de controles",
      "Alerta a red comunitaria",
      "Capacitación integrada con IA",
    ],
  },
  {
    icon: "🏦",
    name: "Fondos y Donantes",
    desc: "Cada peso donado trazable en blockchain. Saben exactamente cuántas madres se atendieron.",
    feats: [
      "Impacto verificable onchain",
      "ROI social automático",
      "Transparencia total de fondos",
      "Certificación ESG/SDG",
    ],
  },
];

const IMPACT_ITEMS = [
  { num: "-60%",  label: "Reducción mortalidad materna en zonas de cobertura" },
  { num: "+85%",  label: "Madres que completan todos sus controles prenatales" },
  { num: "<30s",  label: "Tiempo de respuesta de emergencia a contactos" },
  { num: "0%",    label: "Fraude posible (WorldID nullifier + blockchain)" },
];

export default function InstitucionalPage({ onPageChange }: InstitucionalPageProps) {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div className="inst-root">
      <style>{styles}</style>

      <Navbar
        activePage="prenatal"
        onPageChange={onPageChange}
        onPanicClick={() => setEmergencyOpen(true)}
      />

      {/* ── HERO ── */}
      <div className="inst-hero">
        <div className="inst-eyebrow">🏛️ Para Organizaciones</div>
        <h1 className="inst-title"><em>WARMAY</em> para instituciones</h1>
        <p className="inst-sub">
          Una plataforma lista para escalar. Verificable, transparente y resistente a la corrupción gracias a blockchain + WorldID.
        </p>
        <div className="inst-ctas">
          <button className="inst-btn-primary">📩 Solicitar Demo</button>
          <button className="inst-btn-secondary">📄 Descargar Informe</button>
        </div>
      </div>

      {/* ── TARGET CARDS ── */}
      <div className="inst-target-grid">
        {TARGET_CARDS.map((card) => (
          <div key={card.name} className="inst-target-card">
            <div className="inst-target-icon">{card.icon}</div>
            <div className="inst-target-name">{card.name}</div>
            <div className="inst-target-desc">{card.desc}</div>
            {card.feats.map((f) => (
              <div key={f} className="inst-feat-item">
                <span className="inst-feat-check">→</span>
                {f}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── IMPACT BAND ── */}
      <div className="inst-impact-band">
        <div className="inst-impact-inner">
          <div className="inst-section-header">
            <div className="inst-section-label">Impacto proyectado</div>
            <h2 className="inst-section-title">Lo que <em>WARMAY</em> puede lograr</h2>
          </div>
          <div className="inst-impact-grid">
            {IMPACT_ITEMS.map((item) => (
              <div key={item.num} className="inst-impact-item">
                <div className="inst-impact-num">{item.num}</div>
                <div className="inst-impact-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />
    </div>
  );
}
