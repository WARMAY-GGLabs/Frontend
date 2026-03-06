import { useState } from "react";
import Navbar from "../../components/landing/Navbar";
import EmergencyModal from "../../components/landing/EmergencyModal";

type Page = "inicio" | "app" | "crisis" | "prenatal" | "blockchain" | "nosotros";

interface TecnologiaPageProps {
  onPageChange?: (page: Page) => void;
}

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

  .tech-page-wrapper {
    min-height: 100vh;
    background: var(--base);
    font-family: var(--body);
    color: var(--text);
  }

  .tech-page {
    max-width: 860px;
    margin: 0 auto;
    padding: 56px 24px 80px;
  }

  .tech-eyebrow {
    display: inline-block;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--earth-l);
    background: rgba(194,103,42,.15);
    border: 1px solid rgba(194,103,42,.35);
    border-radius: 20px;
    padding: 5px 14px;
    margin-bottom: 20px;
  }

  .tech-title {
    font-family: var(--display);
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 900;
    color: var(--text);
    margin: 0 0 8px;
    line-height: 1.1;
  }

  .tech-subtitle {
    color: var(--text2);
    font-size: 15px;
    margin-bottom: 36px;
    padding: 10px 16px;
    background: rgba(26,8,0,.6);
    border-radius: 10px;
    backdrop-filter: var(--blur-sm);
    -webkit-backdrop-filter: var(--blur-sm);
    line-height: 1.6;
  }

  /* ── Arch Flow ── */
  .arch-flow {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 36px;
  }

  .arch-node {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    padding: 20px 24px;
    background: var(--base2);
    border: 1px solid var(--border);
    border-radius: 14px;
    position: relative;
  }

  .arch-node-icon {
    font-size: 32px;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .arch-node-text {
    flex: 1;
  }

  .arch-node-text h3 {
    font-family: var(--body);
    font-size: 15px;
    font-weight: 800;
    color: var(--text);
    margin: 0 0 4px;
  }

  .arch-node-text p {
    font-size: 13px;
    color: var(--text3);
    margin: 0;
    line-height: 1.55;
  }

  .arch-badge {
    flex-shrink: 0;
    align-self: flex-start;
    margin-top: 4px;
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid;
    white-space: nowrap;
  }

  .ab-app    { background: rgba(15,30,10,.7);  color: #86efac; border-color: #16a34a; }
  .ab-worldid{ background: rgba(15,20,40,.7);  color: #a5b4fc; border-color: #4338ca; }
  .ab-cre    { background: rgba(30,10,0,.7);   color: #fdba74; border-color: #c2672a; }
  .ab-ai     { background: rgba(30,10,30,.7);  color: #d8b4fe; border-color: #7c3aed; }
  .ab-evm    { background: rgba(12,26,46,.7);  color: #93c5fd; border-color: #1e40af; }

  .arch-arrow {
    text-align: center;
    font-size: 22px;
    color: var(--muted);
    line-height: 1;
    padding: 6px 0;
    user-select: none;
  }

  /* ── Terminal ── */
  .tech-terminal {
    background: #0a0f0a;
    border: 1px solid #1a3a1a;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 32px;
    font-family: var(--mono);
  }

  .tech-term-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: #111811;
    border-bottom: 1px solid #1a3a1a;
  }

  .tech-term-dots {
    display: flex;
    gap: 5px;
  }

  .tech-td {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }

  .td-r { background: #ff5f57; }
  .td-y { background: #ffbd2e; }
  .td-g { background: #28c840; }

  .tech-term-title {
    font-size: 10px;
    color: #4a7a4a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tech-term-body {
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .tech-term-body > div {
    font-size: 12px;
    line-height: 1.6;
    color: #6a9f6a;
  }

  .t-ts  { color: #3a5f3a; }
  .t-sim { color: #c2672a; font-weight: 700; }
  .t-log { color: #4a8f6a; font-weight: 700; }
  .t-val { color: #86efac; font-weight: 700; }
  .t-res { color: #a5b4fc; font-style: italic; display: block; margin-top: 4px; }

  /* ── Checklist ── */
  .tech-checklist {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .check-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 20px;
    background: var(--base2);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: border-color 0.2s;
  }

  .check-row:hover {
    border-color: var(--earth);
  }

  .check-ico {
    font-size: 18px;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .check-body {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .check-body strong {
    font-size: 14px;
    font-weight: 800;
    color: var(--text);
  }

  .check-body span {
    font-size: 12px;
    color: var(--text3);
    font-family: var(--mono);
    line-height: 1.5;
  }
`;

const ARCH_NODES = [
  {
    icon: "👩‍🍼",
    title: "Madre / Beneficiaria",
    desc: "Botón de pánico, controles, IA trilingüe ES/QU/AY. Offline SMS.",
    badge: "UI · Vinext",
    badgeClass: "ab-app",
  },
  {
    icon: "🌍",
    title: "WorldID IDKit",
    desc: "ZK Semaphore proof. Nullifier único por persona por programa. Anti-Sybil.",
    badge: "ZK Proof",
    badgeClass: "ab-worldid",
  },
  {
    icon: "🏥",
    title: "Hospital API",
    desc: "Los hospitales verificados registran controles. CRE consulta con DON consensus (5 nodos BFT).",
    badge: "API Externa",
    badgeClass: "ab-evm",
  },
  {
    icon: "🔗",
    title: "Chainlink CRE Workflow",
    desc: "Orquesta: WorldID → Hospital API (DON) → Claude AI elegibilidad → EVM read nullifier → EVM write SubsidyVault.",
    badge: "CRE DON",
    badgeClass: "ab-cre",
  },
  {
    icon: "🤖",
    title: "Claude AI (Anthropic)",
    desc: "LLM-in-the-loop. Elegibilidad + consejería trilingüe. Si rechaza → no escribe onchain.",
    badge: "LLM",
    badgeClass: "ab-ai",
  },
  {
    icon: "⬡",
    title: "SubsidyVault · Sepolia",
    desc: "Recibe CRE writeReport. Verifica nullifier. Transfiere MOM tokens. Registra control anónimo.",
    badge: "EVM Write",
    badgeClass: "ab-evm",
  },
];

const TERMINAL_LINES = [
  { ts: "2026-03-04T12:00:00Z", tag: "[SIMULATION]", tagClass: "t-sim", text: "Simulator Initialized" },
  { ts: "2026-03-04T12:00:01Z", tag: "[USER LOG]",   tagClass: "t-log", text: "[WARMAY] Control prenatal Sem 24 · WorldID verified ✓" },
  { ts: "2026-03-04T12:00:02Z", tag: "[USER LOG]",   tagClass: "t-log", text: "[WARMAY] Hospital API → control VERIFICADO (5 nodos DON)" },
  { ts: "2026-03-04T12:00:03Z", tag: "[USER LOG]",   tagClass: "t-log", text: '[WARMAY] Claude AI: APPROVE 97% confianza · "Control válido"' },
  { ts: "2026-03-04T12:00:04Z", tag: "[USER LOG]",   tagClass: "t-log", text: "[WARMAY] Nullifier Sepolia → fresh ✓" },
  { ts: "2026-03-04T12:00:05Z", tag: "[USER LOG]",   tagClass: "t-log", text: null, highlight: "20 MOM", pre: "[WARMAY] SubsidyVault.claim() → ", post: " tokens" },
  { ts: "2026-03-04T12:00:11Z", tag: "[USER LOG]",   tagClass: "t-log", text: null, highlight: "0x6346d9ee...bfbf9e6", pre: "[WARMAY] ✅ txHash: ", post: "" },
];

const CHECKLIST = [
  { done: true,  title: "CRE workflow creado y simulable",       desc: "cre workflow simulate warmay-maternal-workflow --broadcast" },
  { done: true,  title: "Blockchain + API externa + LLM",        desc: "Sepolia EVM + Hospital API (DON BFT) + Claude AI — dentro del CRE workflow" },
  { done: true,  title: "WorldID + CRE (chain no nativa)",       desc: "Nullifier ZK en Sepolia a través de CRE. Anti-Sybil para airdrop MOM." },
  { done: true,  title: "IA vinculante + consejería trilingüe",  desc: "Claude AI ES/QU/AY. Si rechaza → no escribe onchain. Offline SMS fallback." },
  { done: true,  title: "Hospitales verificados en blockchain",  desc: "Checklist inmutable. Transparencia para ONG/Gobierno. Anonimato de pacientes." },
  { done: true,  title: "Privacidad by-design",                  desc: "ZK proofs + nullifier hash + cifrado E2E + modo discreto + red de confianza privada" },
  { done: false, title: "Video 3-5 min",                         desc: "Botón pánico → mapa → chat quechua → CRE simulate terminal → txHash Etherscan" },
];

export default function TecnologiaPage({ onPageChange }: TecnologiaPageProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <style>{styles}</style>

      <div className="tech-page-wrapper">
        <Navbar
          activePage="blockchain"
          onPageChange={onPageChange}
          onPanicClick={() => setShowModal(true)}
        />

        <div className="tech-page">
          {/* Header */}
          <div className="tech-eyebrow">🏆 Hackathon Submission</div>
          <h2 className="tech-title">WARMAY — Arquitectura Técnica</h2>
          <p className="tech-subtitle">
            Chainlink CRE + WorldID + Claude AI + Vinext/Cloudflare · Categorías: CRE+IA | WorldID+CRE
          </p>

          {/* Architecture flow */}
          <div className="arch-flow">
            {ARCH_NODES.map((node, i) => (
              <>
                <div className="arch-node" key={node.title}>
                  <div className="arch-node-icon">{node.icon}</div>
                  <div className="arch-node-text">
                    <h3>{node.title}</h3>
                    <p>{node.desc}</p>
                  </div>
                  <span className={`arch-badge ${node.badgeClass}`}>{node.badge}</span>
                </div>
                {i < ARCH_NODES.length - 1 && (
                  <div className="arch-arrow" key={`arrow-${i}`}>↓</div>
                )}
              </>
            ))}
          </div>

          {/* Terminal */}
          <div className="tech-terminal">
            <div className="tech-term-header">
              <div className="tech-term-dots">
                <div className="tech-td td-r" />
                <div className="tech-td td-y" />
                <div className="tech-td td-g" />
              </div>
              <span className="tech-term-title">
                cre workflow simulate warmay-maternal-workflow --target staging-settings --broadcast
              </span>
            </div>
            <div className="tech-term-body">
              {TERMINAL_LINES.map((line, i) => (
                <div key={i}>
                  <span className="t-ts">{line.ts} </span>
                  <span className={line.tagClass}>{line.tag}</span>{" "}
                  {line.text ? (
                    line.text
                  ) : (
                    <>
                      {line.pre}
                      <span className="t-val">{line.highlight}</span>
                      {line.post}
                    </>
                  )}
                </div>
              ))}
              <div>
                <span className="t-res">
                  {'Result: { "decision": "APPROVED", "tokens": "20 MOM", "aiConfidence": 0.97 }'}
                </span>
              </div>
              <div>
                <span className="t-ts">2026-03-04T12:00:11Z </span>
                <span className="t-sim">[SIMULATION]</span> Execution finished ✓
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="tech-checklist">
            {CHECKLIST.map((item) => (
              <div className="check-row" key={item.title}>
                <span className="check-ico">{item.done ? "✅" : "⬜"}</span>
                <div className="check-body">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <EmergencyModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
}
