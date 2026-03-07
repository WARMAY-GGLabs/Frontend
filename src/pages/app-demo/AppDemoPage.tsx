import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/landing/Navbar";
import EmergencyModal from "../../components/landing/EmergencyModal";
import { useLang } from "../../lib/i18n";

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';

type MessageRole = 'bot' | 'user';
interface Message {
  id: number;
  role: MessageRole;
  text: string;
  time: string;
}

interface AppDemoPageProps {
  onPageChange?: (page: Page) => void;
}

// ── Styles ──────────────────────────────────────────────────────────────────
const styles = `
  .app-demo-root {
    background: #1A0800;
    min-height: 100vh;
    color: #FDF6EC;
    font-family: 'Nunito', 'Helvetica Neue', sans-serif;
  }

  /* ─── APP LAYOUT ───────────────────────────────────────────── */
  .app-layout {
    display: grid;
    grid-template-columns: 280px 1fr 320px;
    min-height: calc(100vh - 85px);
  }
  @media (max-width: 1100px) {
    .app-layout { grid-template-columns: 1fr; }
    .ad-chat-panel { display: none; }
  }
  @media (max-width: 700px) {
    .ad-sidebar { display: none; }
  }

  /* ─── SIDEBAR ──────────────────────────────────────────────── */
  .ad-sidebar {
    border-right: 1px solid #5C3018;
    padding: 14px 10px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: rgba(15,5,0,0.94);
    backdrop-filter: blur(16px);
    position: sticky;
    top: 85px;
    height: calc(100vh - 85px);
    overflow-y: auto;
  }

  .ad-offline-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: rgba(5,46,22,0.5);
    border: 1px solid rgba(21,128,61,0.4);
    border-radius: 10px;
    font-size: 11px;
    color: #4ade80;
    font-family: 'IBM Plex Mono', monospace;
  }
  .ad-offline-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
    animation: adPulse 2s infinite;
    flex-shrink: 0;
  }
  @keyframes adPulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }

  /* PANIC ZONE */
  .ad-panic-zone {
    background: linear-gradient(135deg, rgba(26,0,0,0.97), rgba(50,0,0,0.97));
    border: 1px solid rgba(220,38,38,0.5);
    border-radius: 18px;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(220,38,38,0.18);
  }
  .ad-panic-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: .2em;
    color: #fca5a5;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .ad-panic-circle-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
  }
  .ad-panic-circle {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 35%, #ef4444, #991b1b);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    font-size: 22px;
    color: #fff;
    letter-spacing: .1em;
    animation: panicPulse 2.5s ease-in-out infinite;
    border: 2px solid rgba(220,38,38,0.6);
  }
  @keyframes panicPulse {
    0%,100% { box-shadow: 0 0 0 8px rgba(220,38,38,0.13),0 0 0 16px rgba(220,38,38,0.07),0 0 36px rgba(220,38,38,0.4); }
    50%      { box-shadow: 0 0 0 14px rgba(220,38,38,0.2),0 0 0 26px rgba(220,38,38,0.1),0 0 56px rgba(220,38,38,0.6); }
  }
  .ad-panic-circle:active { transform: scale(.93); }
  .ad-panic-text {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 1.2;
  }
  .ad-panic-sub {
    font-size: 10px;
    color: #fca5a5;
    font-family: 'IBM Plex Mono', monospace;
    margin-top: 2px;
  }
  .ad-symp-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #9A6040;
    letter-spacing: .1em;
    text-transform: uppercase;
    align-self: flex-start;
  }
  .ad-symp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    width: 100%;
  }
  .ad-symp-btn {
    padding: 7px 5px;
    border-radius: 7px;
    border: 1px solid rgba(220,38,38,0.28);
    background: rgba(26,0,0,0.7);
    color: #E8C9A0;
    cursor: pointer;
    text-align: center;
    font-size: 11px;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    line-height: 1.3;
    transition: all .2s;
  }
  .ad-symp-btn:hover, .ad-symp-btn.active {
    background: #DC2626;
    border-color: #DC2626;
    color: #fff;
  }

  /* SIDEBAR NAV */
  .ad-sidebar-section {
    background: rgba(26,8,0,0.88);
    backdrop-filter: blur(8px);
    border: 1px solid #5C3018;
    border-radius: 14px;
    overflow: hidden;
  }
  .ad-sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 14px;
    cursor: pointer;
    transition: all .2s;
    border-bottom: 1px solid #5C3018;
    font-size: 13px;
    font-weight: 600;
    color: #E8C9A0;
  }
  .ad-sidebar-item:last-child { border-bottom: none; }
  .ad-sidebar-item:hover, .ad-sidebar-item.active {
    background: #3D1E0A;
    color: #FDF6EC;
  }
  .ad-sidebar-icon { font-size: 17px; flex-shrink: 0; }
  .ad-sidebar-badge {
    margin-left: auto;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    padding: 2px 7px;
    border-radius: 20px;
    font-weight: 700;
  }
  .badge-earth { background: rgba(194,103,42,0.2); color: #C2672A; }
  .badge-life  { background: rgba(21,128,61,0.2);  color: #4ade80; }
  .badge-sun   { background: rgba(245,158,11,0.2); color: #F59E0B; }
  .badge-panic { background: rgba(220,38,38,0.2);  color: #fca5a5; }
  .badge-blue  { background: rgba(59,130,246,0.2); color: #93c5fd; }

  /* ─── MAIN AREA ─────────────────────────────────────────────── */
  .ad-main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    overflow-y: auto;
    max-height: calc(100vh - 85px);
    background: rgba(26,8,0,0.3);
  }

  /* PRENATAL CARD */
  .ad-prenatal-card {
    background: rgba(39,18,5,0.9);
    backdrop-filter: blur(16px);
    border: 1px solid #5C3018;
    border-radius: 18px;
    overflow: hidden;
  }
  .ad-card-header {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #5C3018;
    background: linear-gradient(90deg, rgba(61,30,10,0.85), rgba(39,18,5,0.65));
    flex-wrap: wrap;
    gap: 8px;
  }
  .ad-card-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 16px;
    color: #FDF6EC;
  }
  .ad-card-meta {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #9A6040;
    margin-top: 3px;
  }
  .ad-card-progress {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #E8C9A0;
    text-align: right;
  }
  .ad-card-body { padding: 20px; }

  /* Progress ring section */
  .ad-ring-wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  .ad-progress-ring {
    position: relative;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
  }
  .ad-progress-ring svg { transform: rotate(-90deg); }
  .ad-ring-center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ad-ring-pct {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: 20px;
    color: #C2672A;
    line-height: 1;
  }
  .ad-ring-lbl {
    font-size: 9px;
    color: #9A6040;
    font-family: 'IBM Plex Mono', monospace;
    margin-top: 1px;
  }
  .ad-ring-info h3 {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 4px;
    color: #FDF6EC;
  }
  .ad-ring-info p {
    font-size: 12px;
    color: #B8915A;
    line-height: 1.6;
  }
  .ad-ring-info strong { color: #E8895A; }

  /* Controls grid */
  .ad-controls-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 600px) { .ad-controls-grid { grid-template-columns: 1fr; } }

  .ad-control-item {
    background: rgba(26,8,0,0.7);
    border: 1px solid #5C3018;
    border-radius: 11px;
    padding: 13px 12px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    transition: all .2s;
  }
  .ad-control-item:hover { border-color: #C2672A; }
  .ad-control-item.done {
    border-color: rgba(21,128,61,0.6);
    background: rgba(5,46,22,0.28);
  }
  .ad-ctrl-check {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    border: 2px solid #5C3018;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
    margin-top: 1px;
    transition: all .2s;
    background: rgba(26,8,0,0.8);
    color: transparent;
  }
  .ad-control-item.done .ad-ctrl-check {
    border-color: rgba(21,128,61,0.8);
    background: rgba(21,128,61,0.2);
    color: #4ade80;
  }
  .ad-ctrl-info { flex: 1; }
  .ad-ctrl-name { font-size: 12px; font-weight: 700; color: #FDF6EC; margin-bottom: 2px; }
  .ad-ctrl-week {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #9A6040;
    margin-bottom: 4px;
  }
  .ad-ctrl-badges { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 3px; }
  .ad-ctrl-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    padding: 1px 6px;
    border-radius: 10px;
    font-weight: 700;
  }
  .cb-hospital { background: rgba(59,130,246,0.18); color: #93c5fd; border:1px solid rgba(59,130,246,0.35); }
  .cb-cre      { background: rgba(139,92,246,0.18); color: #c4b5fd; border:1px solid rgba(139,92,246,0.35); }
  .cb-pending  { background: rgba(245,158,11,0.12); color: #fcd34d; border:1px solid rgba(245,158,11,0.28); }

  /* AIRDROP CARD */
  .ad-airdrop-card {
    background: linear-gradient(135deg, rgba(26,15,0,0.94), rgba(40,24,0,0.94));
    border: 1px solid rgba(245,158,11,0.35);
    border-radius: 18px;
    padding: 20px 22px;
    display: flex;
    align-items: center;
    gap: 18px;
    box-shadow: 0 0 28px rgba(245,158,11,0.1);
    flex-wrap: wrap;
  }
  .ad-airdrop-icon {
    font-size: 42px;
    flex-shrink: 0;
    animation: adFloat 3s ease-in-out infinite;
  }
  @keyframes adFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
  .ad-airdrop-info { flex: 1; min-width: 180px; }
  .ad-airdrop-info h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 16px;
    color: #F59E0B;
    margin-bottom: 5px;
  }
  .ad-airdrop-info p { font-size: 13px; color: #E8C9A0; line-height: 1.5; }
  .ad-airdrop-tokens {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #F59E0B;
    margin-top: 6px;
  }
  .ad-airdrop-tokens span { font-size: 12px; color: #9A6040; margin-left: 6px; }
  .ad-btn-airdrop {
    padding: 12px 20px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #F59E0B, #D97706);
    color: #1A0800;
    font-weight: 800;
    font-size: 13px;
    font-family: 'Nunito', sans-serif;
    white-space: nowrap;
    transition: all .2s;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ad-btn-airdrop:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(245,158,11,0.4);
  }

  /* ─── CHAT PANEL ────────────────────────────────────────────── */
  .ad-chat-panel {
    background: rgba(12,4,0,0.97);
    backdrop-filter: blur(24px);
    border-left: 1px solid #5C3018;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 85px;
    height: calc(100vh - 85px);
  }
  .ad-chat-header {
    padding: 14px 16px;
    border-bottom: 1px solid #5C3018;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(26,8,0,0.82);
    flex-shrink: 0;
  }
  .ad-ai-avatar {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: linear-gradient(135deg, #C2672A, #8B3A10);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
  }
  .ad-ai-name { font-weight: 700; font-size: 14px; color: #FDF6EC; }
  .ad-ai-status {
    font-size: 11px;
    color: #4ade80;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .ad-ai-status::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
  }
  .ad-chat-lang {
    margin-left: auto;
    display: flex;
    background: #3D1E0A;
    border: 1px solid #5C3018;
    border-radius: 8px;
    overflow: hidden;
  }
  .ad-chat-lang-btn {
    padding: 5px 9px;
    border: none;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    background: transparent;
    color: #9A6040;
    transition: all .2s;
  }
  .ad-chat-lang-btn.active { background: #C2672A; color: #fff; }

  .ad-offline-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: rgba(5,46,22,0.45);
    border-bottom: 1px solid rgba(21,128,61,0.3);
    font-size: 11px;
    color: #4ade80;
    font-family: 'IBM Plex Mono', monospace;
    flex-shrink: 0;
  }

  .ad-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ad-chat-messages::-webkit-scrollbar { width: 4px; }
  .ad-chat-messages::-webkit-scrollbar-track { background: transparent; }
  .ad-chat-messages::-webkit-scrollbar-thumb { background: #5C3018; border-radius: 4px; }

  .ad-msg { max-width: 90%; display: flex; flex-direction: column; gap: 3px; }
  .ad-msg-bot  { align-self: flex-start; }
  .ad-msg-user { align-self: flex-end; }
  .ad-msg-bubble {
    padding: 11px 13px;
    border-radius: 13px;
    font-size: 13px;
    line-height: 1.6;
    word-break: break-word;
  }
  .ad-msg-bot .ad-msg-bubble {
    background: rgba(61,30,10,0.85);
    border: 1px solid #5C3018;
    color: #FDF6EC;
    border-bottom-left-radius: 4px;
  }
  .ad-msg-user .ad-msg-bubble {
    background: linear-gradient(135deg, #C2672A, #8B3A10);
    color: #fff;
    border-bottom-right-radius: 4px;
  }
  .ad-msg-time {
    font-size: 10px;
    color: #9A6040;
    font-family: 'IBM Plex Mono', monospace;
  }
  .ad-msg-bot .ad-msg-time  { text-align: left; }
  .ad-msg-user .ad-msg-time { text-align: right; }

  /* Typing dots */
  .ad-typing { display: flex; gap: 5px; align-items: center; padding: 4px 0; }
  .ad-typing-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #9A6040;
    animation: adTyping 1.2s ease-in-out infinite;
  }
  .ad-typing-dot:nth-child(2) { animation-delay: .2s; }
  .ad-typing-dot:nth-child(3) { animation-delay: .4s; }
  @keyframes adTyping {
    0%,60%,100% { transform: translateY(0); }
    30%         { transform: translateY(-5px); }
  }

  .ad-quick-replies {
    padding: 8px 12px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    border-top: 1px solid #5C3018;
    flex-shrink: 0;
  }
  .ad-quick-btn {
    padding: 5px 11px;
    border-radius: 18px;
    border: 1px solid #5C3018;
    background: rgba(26,8,0,0.75);
    color: #B8915A;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s;
    font-family: 'Nunito', sans-serif;
  }
  .ad-quick-btn:hover { border-color: #C2672A; color: #C2672A; }

  .ad-chat-input-area {
    padding: 12px;
    border-top: 1px solid #5C3018;
    flex-shrink: 0;
    display: flex;
    gap: 7px;
    align-items: flex-end;
    background: rgba(12,4,0,0.85);
  }
  .ad-chat-input {
    flex: 1;
    background: rgba(39,18,5,0.85);
    border: 1px solid #5C3018;
    border-radius: 11px;
    padding: 10px 13px;
    color: #FDF6EC;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    outline: none;
    resize: none;
    max-height: 80px;
    transition: border .2s;
  }
  .ad-chat-input:focus { border-color: #C2672A; }
  .ad-chat-input::placeholder { color: #9A6040; }
  .ad-btn-send {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    border: none;
    cursor: pointer;
    background: #C2672A;
    color: #fff;
    font-size: 15px;
    flex-shrink: 0;
    transition: all .2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ad-btn-send:hover { background: #8B3A10; }
`;

// ── Static badge metadata (not language-dependent) ──────────────────────────
const CONTROL_BADGES = [
  ["hospital", "cre"],
  ["hospital", "cre"],
  ["hospital", "cre"],
  ["hospital", "cre"],
  ["hospital", "cre"],
  ["hospital", "cre"],
  ["pending"],
  ["pending"],
];

const SIDEBAR_ICONS  = ["📋", "🗺️", "🏥", "🪙", "👥"];
const SIDEBAR_IDS    = ["controles", "mapa", "hospitales", "tokens", "confianza"];
const SIDEBAR_BADGES = ["6/12", "LIVE", "12 ✓", "120", "3"];
const SIDEBAR_BADGE_CLASSES = ["badge-earth", "badge-panic", "badge-life", "badge-sun", "badge-blue"];

// ── SVG Progress Ring ──────────────────────────────────────────────────────
function ProgressRing({ pct, label }: { pct: number; label: string }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="ad-progress-ring">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(92,48,24,0.5)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r}
          fill="none"
          stroke="#C2672A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="ad-ring-center">
        <span className="ad-ring-pct">{pct}%</span>
        <span className="ad-ring-lbl">{label}</span>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AppDemoPage({ onPageChange }: AppDemoPageProps) {
  const { t } = useLang();
  const d = t.appDemo;

  const PRENATAL_CONTROLS = d.controls.map((c, i) => ({
    id: i + 1,
    name: c.name,
    week: c.week,
    done: i < 6,
    badges: CONTROL_BADGES[i],
  }));
  const SIDEBAR_ITEMS = SIDEBAR_IDS.map((id, i) => ({
    id,
    icon: SIDEBAR_ICONS[i],
    label: d.sidebar[i],
    badge: SIDEBAR_BADGES[i],
    badgeClass: SIDEBAR_BADGE_CLASSES[i],
  }));
  const SYMPTOMS = d.symptoms.map((label, i) => ({ id: `sym${i}`, label }));
  const INITIAL_MESSAGES: Message[] = [
    { id: 1, role: "bot" as const, text: d.initMsg1, time: "ahora" },
    { id: 2, role: "bot" as const, text: d.initMsg2, time: "14:30" },
  ];
  const QUICK_REPLIES = d.quickReplies;

  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);
  const [activeSideItem, setActiveSideItem] = useState("controles");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [chatLang, setChatLang] = useState("ES");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(100);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text?: string) => {
    const content = text ?? chatInput.trim();
    if (!content) return;
    const now = new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: ++msgIdRef.current,
      role: "user",
      text: content,
      time: now,
    };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setTyping(true);
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
      const botMsg: Message = {
        id: ++msgIdRef.current,
        role: "bot",
        text: getBotReply(content),
        time: replyTime,
      };
      setTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 1400);
  };

  return (
    <div className="app-demo-root">
      <style>{styles}</style>

      <Navbar
        activePage="app"
        onPageChange={onPageChange}
        onPanicClick={() => setEmergencyOpen(true)}
      />

      <div className="app-layout">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="ad-sidebar">
          {/* Online indicator */}
          <div className="ad-offline-badge">
            <span className="ad-offline-dot" />
            {d.onlineBadge}
          </div>

          {/* PANIC ZONE */}
          <div className="ad-panic-zone">
            <div className="ad-panic-label">{d.panicLabel}</div>
            <button
              className="ad-panic-circle-btn"
              onClick={() => setEmergencyOpen(true)}
              aria-label="Activar alerta de emergencia"
            >
              <div className="ad-panic-circle">SOS</div>
              <div className="ad-panic-text">{d.panicText.split('\n')[0]}<br />{d.panicText.split('\n')[1]}</div>
              <div className="ad-panic-sub">{d.panicSub}</div>
            </button>

            <div className="ad-symp-label">{d.sympLabel}</div>
            <div className="ad-symp-grid">
              {SYMPTOMS.map((s) => (
                <button
                  key={s.id}
                  className={`ad-symp-btn${activeSymptom === s.id ? " active" : ""}`}
                  onClick={() => setActiveSymptom(activeSymptom === s.id ? null : s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation items */}
          <div className="ad-sidebar-section">
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`ad-sidebar-item${activeSideItem === item.id ? " active" : ""}`}
                onClick={() => setActiveSideItem(item.id)}
              >
                <span className="ad-sidebar-icon">{item.icon}</span>
                {item.label}
                <span className={`ad-sidebar-badge ${item.badgeClass}`}>{item.badge}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── MAIN AREA ── */}
        <main className="ad-main">
          {/* Prenatal Controls Card */}
          <div className="ad-prenatal-card">
            <div className="ad-card-header">
              <div>
                <div className="ad-card-title">{d.prenatalTitle}</div>
                <div className="ad-card-meta">{d.prenatalMeta}</div>
              </div>
              <div className="ad-card-progress">
                6 / 12<br />
                <span style={{ color: "#9A6040" }}>50{d.pctSuffix}</span>
              </div>
            </div>
            <div className="ad-card-body">
              {/* Patient info + ring */}
              <div className="ad-ring-wrap">
                <ProgressRing pct={50} label={d.progressLabel} />
                <div className="ad-ring-info">
                  <h3>María Quispe</h3>
                  <p>
                    Semana 24 · {d.nextControlLabel} <strong>Sem 28</strong>.{" "}
                    {d.airdropRing}
                  </p>
                </div>
              </div>

              {/* Controls grid */}
              <div className="ad-controls-grid">
                {PRENATAL_CONTROLS.map((ctrl) => (
                  <div
                    key={ctrl.id}
                    className={`ad-control-item${ctrl.done ? " done" : ""}`}
                  >
                    <div className="ad-ctrl-check">{ctrl.done ? "✓" : ""}</div>
                    <div className="ad-ctrl-info">
                      <div className="ad-ctrl-name">{ctrl.name}</div>
                      <div className="ad-ctrl-week">{ctrl.week}</div>
                      <div className="ad-ctrl-badges">
                        {ctrl.badges.map((b) => (
                          <span
                            key={b}
                            className={`ad-ctrl-badge ${
                              b === "hospital"
                                ? "cb-hospital"
                                : b === "cre"
                                ? "cb-cre"
                                : "cb-pending"
                            }`}
                          >
                            {b === "hospital"
                              ? d.badgeHospital
                              : b === "cre"
                              ? d.badgeCre
                              : d.badgePending}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Airdrop / tokens card */}
          <div className="ad-airdrop-card">
            <div className="ad-airdrop-icon">🪙</div>
            <div className="ad-airdrop-info">
              <h3>{d.airdropTitle}</h3>
              <p>{d.airdropDesc}</p>
              <div className="ad-airdrop-tokens">
                120&nbsp;<span>{d.momEarned}</span>
              </div>
            </div>
            <button className="ad-btn-airdrop">
              {d.claimBtn}
            </button>
          </div>
        </main>

        {/* ── CHAT PANEL ── */}
        <aside className="ad-chat-panel">
          <div className="ad-chat-header">
            <div className="ad-ai-avatar">🌸</div>
            <div>
              <div className="ad-ai-name">WARMAY IA</div>
              <div className="ad-ai-status">{d.aiStatus}</div>
            </div>
            <div className="ad-chat-lang">
              {["ES", "QU", "AY"].map((l) => (
                <button
                  key={l}
                  className={`ad-chat-lang-btn${chatLang === l ? " active" : ""}`}
                  onClick={() => setChatLang(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="ad-offline-bar">
            {d.offlineBar}
          </div>

          <div className="ad-chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`ad-msg ad-msg-${m.role}`}>
                <div className="ad-msg-bubble">{m.text}</div>
                <div className="ad-msg-time">WARMAY IA · {m.time}</div>
              </div>
            ))}
            {typing && (
              <div className="ad-msg ad-msg-bot">
                <div className="ad-msg-bubble">
                  <div className="ad-typing">
                    <div className="ad-typing-dot" />
                    <div className="ad-typing-dot" />
                    <div className="ad-typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ad-quick-replies">
            {QUICK_REPLIES.map((q) => (
              <button key={q} className="ad-quick-btn" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <div className="ad-chat-input-area">
            <textarea
              className="ad-chat-input"
              placeholder={d.chatPlaceholder}
              rows={1}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button className="ad-btn-send" onClick={() => sendMessage()} aria-label="Enviar mensaje">
              →
            </button>
          </div>
        </aside>
      </div>

      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />
    </div>
  );
}

// ── Simple bot replies ────────────────────────────────────────────────────────
function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("urgencia") || lower.includes("emergen"))
    return "🚨 Ve a urgencias si tienes: sangrado abundante, convulsiones, fiebre >38°C, bebé sin moverse >2h, dolor abdominal intenso o hinchazón repentina de cara/manos.";
  if (lower.includes("offline") || lower.includes("internet"))
    return "📡 Sin internet, WARMAY funciona via SMS. Envía tu estado al +591-XXX. Tus controles se sincronizan automáticamente al reconectarte.";
  if (lower.includes("hemorragia") || lower.includes("sangrado"))
    return "🩸 Hemorragia: Llama al 118 (ambulancia) de inmediato. Acuéstate de lado izquierdo, no uses tampones. La app ya notificó al hospital más cercano.";
  if (lower.includes("síntoma") || lower.includes("sintoma"))
    return "⚠️ Los síntomas de alerta son: sangrado, convulsiones, fiebre alta, dolor de cabeza intenso, visión borrosa y hinchazón. Usa el botón SOS si los sientes.";
  return "Entendido. Estoy aquí para ayudarte. Si es una emergencia, usa el botón SOS rojo en el panel izquierdo. ¿Tienes algún síntoma específico?";
}
