import Navbar from "../../components/landing/Navbar";
import EmergencyModal from "../../components/landing/EmergencyModal";
import { useState } from "react";
import { useLang } from "../../lib/i18n";

type Page = "inicio" | "app" | "crisis" | "prenatal" | "blockchain" | "nosotros";

interface ComoFuncionaPageProps {
  onPageChange?: (page: Page) => void;
}

const styles = `
  .cf-root {
    background: #1A0800;
    min-height: 100vh;
    color: #FDF6EC;
    font-family: 'Nunito', 'Helvetica Neue', sans-serif;
  }

  /* ── SHARED VARS ── */
  .cf-root {
    --earth: #C2672A;
    --earth-d: #8B3A10;
    --earth-l: #E8895A;
    --panic: #DC2626;
    --life: #15803D;
    --life-l: #4ade80;
    --sun: #F59E0B;
    --blue: #3B82F6;
    --purple: #8B5CF6;
    --base: #1A0800;
    --base2: #271205;
    --base3: #3D1E0A;
    --border: #5C3018;
    --muted: #9A6040;
    --text: #FDF6EC;
    --text2: #E8C9A0;
    --text3: #B8915A;
    --display: 'Playfair Display', Georgia, serif;
    --body: 'Nunito', sans-serif;
    --mono: 'IBM Plex Mono', monospace;
    --blur-sm: blur(8px);
    --blur-md: blur(16px);
    --blur-lg: blur(24px);
  }

  /* ── SECTION HEADER ── */
  .cf-section-header {
    text-align: center;
    margin-bottom: 50px;
  }
  .cf-section-label {
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
  .cf-section-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.1;
    margin-bottom: 16px;
    text-shadow: 0 2px 16px rgba(0,0,0,.7);
  }
  .cf-section-title em { font-style: normal; color: #C2672A; }
  .cf-section-sub {
    color: #E8C9A0;
    font-size: 15px;
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.7;
    padding: 10px 16px;
    background: rgba(26,8,0,0.55);
    backdrop-filter: blur(8px);
    border-radius: 10px;
  }

  /* ── EXPLAINER SECTION ── */
  .cf-explainer-section {
    padding: 60px 28px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .cf-explainer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 40px;
  }
  @media (max-width: 800px) {
    .cf-explainer-grid { grid-template-columns: 1fr; }
  }

  /* ── EXPLAINER CARDS ── */
  .cf-explainer-card {
    background: rgba(39,18,5,0.88);
    backdrop-filter: blur(16px);
    border: 1px solid #5C3018;
    border-radius: 20px;
    padding: 28px;
    position: relative;
    overflow: hidden;
  }
  .cf-explainer-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }
  .cf-worldid-card::before { background: linear-gradient(90deg, #1d4ed8, #60a5fa); }
  .cf-cre-card::before     { background: linear-gradient(90deg, #DC2626, #C2672A); }
  .cf-ai-card::before      { background: linear-gradient(90deg, #8B5CF6, #c4b5fd); }
  .cf-offline-card::before { background: linear-gradient(90deg, #15803D, #4ade80); }

  .cf-expl-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .cf-expl-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }
  .cf-ei-worldid { background: rgba(29,78,216,.25);  border: 1px solid rgba(96,165,250,.4); }
  .cf-ei-cre     { background: rgba(220,38,38,.2);   border: 1px solid rgba(220,38,38,.4); }
  .cf-ei-ai      { background: rgba(139,92,246,.2);  border: 1px solid rgba(196,181,253,.3); }
  .cf-ei-offline { background: rgba(21,128,61,.2);   border: 1px solid rgba(74,222,128,.3); }

  .cf-expl-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 17px;
    color: #FDF6EC;
  }
  .cf-expl-subtitle {
    font-size: 11px;
    color: #9A6040;
    font-family: 'IBM Plex Mono', monospace;
    margin-top: 2px;
  }

  /* ── FLOW STEPS ── */
  .cf-flow-steps {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .cf-flow-step {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .cf-flow-num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(194,103,42,.25);
    border: 1px solid #C2672A;
    color: #C2672A;
    font-size: 11px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    font-family: 'IBM Plex Mono', monospace;
  }
  .cf-flow-text {
    font-size: 13px;
    color: #E8C9A0;
    line-height: 1.6;
  }
  .cf-flow-text strong {
    color: #FDF6EC;
    display: block;
    font-size: 12px;
    margin-bottom: 1px;
  }

  /* ── PRIVACY BADGES ── */
  .cf-badges-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 14px;
  }
  .cf-privacy-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    font-family: 'IBM Plex Mono', monospace;
  }
  .cf-pb-private { background: rgba(139,92,246,.2); color: #c4b5fd; border: 1px solid rgba(139,92,246,.4); }
  .cf-pb-safe    { background: rgba(21,128,61,.2);  color: #4ade80; border: 1px solid rgba(21,128,61,.4); }
  .cf-pb-blue    { background: rgba(59,130,246,.2); color: #93c5fd; border: 1px solid rgba(59,130,246,.4); }
  .cf-pb-purple  { background: rgba(139,92,246,.2); color: #c4b5fd; border: 1px solid rgba(139,92,246,.4); }

  /* ── TERMINAL ── */
  .cf-terminal {
    background: #070707;
    border: 1px solid #1a1a1a;
    border-radius: 12px;
    overflow: hidden;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    margin-top: 14px;
  }
  .cf-term-header {
    background: #111;
    padding: 11px 14px;
    border-bottom: 1px solid #1a1a1a;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .cf-term-dots { display: flex; gap: 5px; }
  .cf-td { width: 10px; height: 10px; border-radius: 50%; }
  .cf-td-r { background: #ff5f56; }
  .cf-td-y { background: #ffbd2e; }
  .cf-td-g { background: #27c93f; }
  .cf-term-title { color: #444; font-size: 11px; margin-left: 7px; }
  .cf-term-body {
    padding: 18px;
    line-height: 1.8;
    font-size: 11px;
  }
  .cf-t-log { color: #16a34a; }
  .cf-t-val { color: #f59e0b; font-weight: 700; }

  /* ── OFFLINE DEMO ── */
  .cf-offline-mode-demo {
    margin-top: 16px;
    background: rgba(26,8,0,.8);
    border: 1px solid rgba(74,222,128,.3);
    border-radius: 12px;
    padding: 14px;
  }
  .cf-offline-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    padding: 7px 12px;
    background: rgba(5,46,22,0.4);
    border: 1px solid rgba(74,222,128,0.25);
    font-size: 11px;
    color: #fca5a5;
    font-family: 'IBM Plex Mono', monospace;
  }
  .cf-offline-dot-red {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #f87171;
    flex-shrink: 0;
  }
  .cf-offline-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
  }
  .cf-offline-step {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #E8C9A0;
  }
  .cf-offline-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
  }
  .cf-oi-green  { background: rgba(21,128,61,.25); }
  .cf-oi-blue   { background: rgba(59,130,246,.2); }
  .cf-oi-orange { background: rgba(194,103,42,.2); }

  /* ── PILLARS BAND ── */
  .cf-pillars-band {
    padding: 60px 28px;
    background: rgba(15,5,0,0.75);
    backdrop-filter: blur(16px);
    border-top: 1px solid #5C3018;
    border-bottom: 1px solid #5C3018;
  }
  .cf-pillars-inner { max-width: 1100px; margin: 0 auto; }
  .cf-pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-top: 40px;
  }

  .cf-pillar-card {
    background: rgba(39,18,5,0.85);
    backdrop-filter: blur(8px);
    border: 1px solid #5C3018;
    border-radius: 18px;
    padding: 26px;
    position: relative;
    transition: all .3s;
  }
  .cf-pillar-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,.3);
  }
  .cf-pillar-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 0 0 18px 18px;
  }
  .cf-pc-priv::after { background: linear-gradient(90deg, #8B5CF6, #c4b5fd); }
  .cf-pc-trans::after { background: linear-gradient(90deg, #3B82F6, #93c5fd); }
  .cf-pc-sec::after  { background: linear-gradient(90deg, #15803D, #4ade80); }
  .cf-pc-anon::after { background: linear-gradient(90deg, #F59E0B, #fcd34d); }

  .cf-pillar-icon  { font-size: 32px; margin-bottom: 14px; }
  .cf-pillar-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 8px;
    color: #FDF6EC;
  }
  .cf-pillar-desc  { font-size: 13px; color: #B8915A; line-height: 1.6; margin-bottom: 14px; }
  .cf-pillar-tech  { display: flex; flex-wrap: wrap; gap: 6px; }

  .cf-tech-tag {
    padding: 3px 9px;
    border-radius: 20px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 600;
  }
  .cf-tt-purple { background: rgba(139,92,246,.2); color: #c4b5fd; border: 1px solid rgba(139,92,246,.3); }
  .cf-tt-blue   { background: rgba(59,130,246,.2); color: #93c5fd; border: 1px solid rgba(59,130,246,.3); }
  .cf-tt-green  { background: rgba(21,128,61,.2);  color: #4ade80; border: 1px solid rgba(21,128,61,.3); }
  .cf-tt-orange { background: rgba(194,103,42,.2); color: #E8895A; border: 1px solid rgba(194,103,42,.3); }
`;

export default function ComoFuncionaPage({ onPageChange }: ComoFuncionaPageProps) {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const { t } = useLang();
  const p = t.howItWorksPage;

  const PILLAR_ICONS = ['🔒', '🔍', '🛡️', '👤'];
  const PILLAR_CLASSES = ['cf-pc-priv', 'cf-pc-trans', 'cf-pc-sec', 'cf-pc-anon'];
  const PILLAR_TAGS = [
    [{ cls: 'cf-tt-purple', label: 'ZK Proofs' }, { cls: 'cf-tt-purple', label: 'WorldID' }, { cls: 'cf-tt-green', label: 'Cifrado E2E' }],
    [{ cls: 'cf-tt-blue', label: 'Chainlink CRE' }, { cls: 'cf-tt-blue', label: 'Sepolia' }, { cls: 'cf-tt-blue', label: 'Etherscan' }],
    [{ cls: 'cf-tt-green', label: 'Modo discreto' }, { cls: 'cf-tt-green', label: 'Red cifrada' }, { cls: 'cf-tt-orange', label: 'SMS seguro' }],
    [{ cls: 'cf-tt-orange', label: 'Nullifier Hash' }, { cls: 'cf-tt-purple', label: 'ZK Semaphore' }, { cls: 'cf-tt-blue', label: 'Smart Contract' }],
  ];

  return (
    <div className="cf-root">
      <style>{styles}</style>

      <Navbar
        activePage="crisis"
        onPageChange={onPageChange}
        onPanicClick={() => setEmergencyOpen(true)}
      />

      {/* ══ EXPLAINER SECTION ══ */}
      <div className="cf-explainer-section">
        <div className="cf-section-header">
          <div className="cf-section-label">{p.sectionLabel}</div>
          <h2 className="cf-section-title">{p.sectionTitle}</h2>
          <p className="cf-section-sub">{p.sectionSub}</p>
        </div>

        <div className="cf-explainer-grid">

          {/* ── WorldID ── */}
          <div className="cf-explainer-card cf-worldid-card">
            <div className="cf-expl-header">
              <div className="cf-expl-icon cf-ei-worldid">🌍</div>
              <div>
                <div className="cf-expl-title">{p.worldidTitle}</div>
                <div className="cf-expl-subtitle">{p.worldidSub}</div>
              </div>
            </div>
            <div className="cf-flow-steps">
              {p.worldidSteps.map((s, i) => (
                <div className="cf-flow-step" key={i}>
                  <div className="cf-flow-num">{i + 1}</div>
                  <div className="cf-flow-text">
                    <strong>{s.title}</strong>
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="cf-badges-row">
              {p.worldidBadges.map((b, i) => (
                <span key={i} className="cf-privacy-badge cf-pb-private">{b}</span>
              ))}
            </div>
          </div>

          {/* ── Chainlink CRE ── */}
          <div className="cf-explainer-card cf-cre-card">
            <div className="cf-expl-header">
              <div className="cf-expl-icon cf-ei-cre">🔗</div>
              <div>
                <div className="cf-expl-title">{p.creTitle}</div>
                <div className="cf-expl-subtitle">{p.creSub}</div>
              </div>
            </div>
            <div className="cf-flow-steps">
              {p.creSteps.map((s, i) => (
                <div className="cf-flow-step" key={i}>
                  <div className="cf-flow-num">{i + 1}</div>
                  <div className="cf-flow-text">
                    <strong>{s.title}</strong>
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="cf-terminal">
              <div className="cf-term-header">
                <div className="cf-term-dots">
                  <div className="cf-td cf-td-r" />
                  <div className="cf-td cf-td-y" />
                  <div className="cf-td cf-td-g" />
                </div>
                <span className="cf-term-title">CRE Simulation Output</span>
              </div>
              <div className="cf-term-body">
                <div><span className="cf-t-log">[USER LOG]</span> WorldID verified ✓</div>
                <div><span className="cf-t-log">[USER LOG]</span> Hospital API → Control PARTO ✓</div>
                <div><span className="cf-t-log">[USER LOG]</span> Claude AI: APPROVE 97%</div>
                <div><span className="cf-t-log">[USER LOG]</span> Nullifier fresh ✓</div>
                <div><span className="cf-t-val">[RESULT]</span> txHash: 0x6346...9e6 ✅</div>
              </div>
            </div>
          </div>

          {/* ── Claude AI ── */}
          <div className="cf-explainer-card cf-ai-card">
            <div className="cf-expl-header">
              <div className="cf-expl-icon cf-ei-ai">🤖</div>
              <div>
                <div className="cf-expl-title">{p.aiTitle}</div>
                <div className="cf-expl-subtitle">{p.aiSub}</div>
              </div>
            </div>
            <div className="cf-flow-steps">
              {p.aiSteps.map((s, i) => (
                <div className="cf-flow-step" key={i}>
                  <div className="cf-flow-num">{i + 1}</div>
                  <div className="cf-flow-text">
                    <strong>{s.title}</strong>
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="cf-badges-row">
              {p.aiBadges.map((b, i) => (
                <span key={i} className={i === 0 ? 'cf-privacy-badge cf-pb-purple' : 'cf-privacy-badge cf-pb-safe'}>{b}</span>
              ))}
            </div>
          </div>

          {/* ── Modo Offline ── */}
          <div className="cf-explainer-card cf-offline-card">
            <div className="cf-expl-header">
              <div className="cf-expl-icon cf-ei-offline">📡</div>
              <div>
                <div className="cf-expl-title">{p.offlineTitle}</div>
                <div className="cf-expl-subtitle">{p.offlineSub}</div>
              </div>
            </div>
            <div className="cf-flow-steps">
              {p.offlineSteps.map((s, i) => (
                <div className="cf-flow-step" key={i}>
                  <div className="cf-flow-num">{i + 1}</div>
                  <div className="cf-flow-text">
                    <strong>{s.title}</strong>
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="cf-offline-mode-demo">
              <div className="cf-offline-badge">
                <div className="cf-offline-dot-red" />
                <span>{p.offlineBadge}</span>
              </div>
              <div className="cf-offline-steps">
                {[['📍', 'cf-oi-green'], ['💬', 'cf-oi-blue'], ['📱', 'cf-oi-orange']].map(([icon, cls], i) => (
                  <div className="cf-offline-step" key={i}>
                    <div className={`cf-offline-icon ${cls}`}>{icon}</div>
                    {p.offlineMiniSteps[i]}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══ PRIVACY PILLARS ══ */}
      <div className="cf-pillars-band">
        <div className="cf-pillars-inner">
          <div className="cf-section-header">
            <div className="cf-section-label">{p.pillarsLabel}</div>
            <h2 className="cf-section-title"><em>{p.pillarsTitle1}</em> {p.pillarsTitle2}</h2>
            <p className="cf-section-sub">{p.pillarsSub}</p>
          </div>
          <div className="cf-pillars-grid">
            {p.pillars.map((pillar, i) => (
              <div key={i} className={`cf-pillar-card ${PILLAR_CLASSES[i]}`}>
                <div className="cf-pillar-icon">{PILLAR_ICONS[i]}</div>
                <div className="cf-pillar-title">{pillar.title}</div>
                <div className="cf-pillar-desc">{pillar.desc}</div>
                <div className="cf-pillar-tech">
                  {PILLAR_TAGS[i].map((tag) => (
                    <span key={tag.label} className={`cf-tech-tag ${tag.cls}`}>{tag.label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </div>
  );
}
