import './HowItWorks.css';

const steps = [
  { num: '01', icon: '🌍', title: 'Identidad verificada', desc: 'WorldID ZK proof — eres única, sin revelar tu nombre. Anti-Sybil.' },
  { num: '02', icon: '🚨', title: 'Botón de Pánico', desc: 'Un toque alerta a familiares, hospital cercano y red comunitaria. Funciona sin internet.' },
  { num: '03', icon: '✅', title: 'Controles verificados', desc: 'Cada control prenatal registrado por el hospital en Chainlink CRE. Inmutable.' },
  { num: '04', icon: '🪙', title: 'Airdrop de tokens', desc: 'Al completar controles verificados, recibes MOM tokens. Incentivo real.' },
];

export default function HowItWorks() {
  return (
    <section id="como">
      <div className="how-section">
        <div className="how-inner">
          <div className="section-header">
            <div className="section-label animate-on-scroll">Cómo funciona</div>
            <h2 className="section-title animate-on-scroll">
              <em>WARMAY</em> en 4 pasos
            </h2>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <div className="step-card animate-on-scroll" key={step.num}>
                <span className="step-num">{step.num}</span>
                <div className="step-icon">{step.icon}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
