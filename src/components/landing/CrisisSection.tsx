import './CrisisSection.css';

const crisisData = [
  { pct: '27%', icon: '🩸', name: 'Hemorragia Postparto', desc: 'Principal causa de muerte. WARMAY activa alerta en menos de 30 segundos.' },
  { pct: '22%', icon: '⚡', name: 'Eclampsia / Preeclampsia', desc: 'Monitoreo con IA predictiva y alerta temprana.' },
  { pct: '15%', icon: '🦠', name: 'Sepsis / Infección', desc: 'Detección de síntomas vía IA y derivación urgente.' },
  { pct: '13%', icon: '👶', name: 'Parto Obstruido', desc: 'Geolocalización del hospital obstétrico más cercano.' },
  { pct: '23%', icon: '⚠️', name: 'Otras causas', desc: 'Protocolos de triage inteligente trilingüe.' },
];

export default function CrisisSection() {
  return (
    <section id="crisis">
      <div className="crisis-section">
        <div className="section-header">
          <div className="section-label animate-on-scroll">
            Las 5 causas principales
          </div>
          <h2 className="section-title animate-on-scroll">
            <em>Conocer</em> <span>el peligro salva vidas</span>
          </h2>
          <p className="section-sub animate-on-scroll">
            WARMAY detecta estos patrones de riesgo y activa protocolos de
            emergencia inmediata.
          </p>
        </div>
        <div className="crisis-grid">
          {crisisData.map((item) => (
            <div className="crisis-card animate-on-scroll" key={item.name}>
              <span className="crisis-pct">{item.pct}</span>
              <div className="crisis-icon">{item.icon}</div>
              <div className="crisis-name">{item.name}</div>
              <div className="crisis-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
