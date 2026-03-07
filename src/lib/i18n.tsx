/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'EN' | 'ES' | 'QU' | 'AY';

export interface Translations {
  nav: { mission: string; app: string; howItWorks: string; institutional: string; technology: string; about: string };
  emergency: string;
  hero: { badge: string; line1: string; line2: string; line3: string };
  subtitle: string;
  langNames: string[];
  stats: { stat1: string; stat2: string; stat3: string };
  features: { badge: string; line1: string; line2: string; line3: string; cta1: string; cta2: string };
  scroll: string;
  crisis: { eyebrow: string; title1: string; title2: string; subtitle: string; cards: Array<{ name: string; desc: string }> };
  howItWorks: { badge: string; title1: string; title2: string; steps: Array<{ title: string; desc: string }> };
  orgBand: { heading: string; marquee: string };
  footer: { tagline: string; links: string[]; copyright: string };
  appDemo: {
    onlineBadge: string; panicLabel: string; panicText: string; panicSub: string;
    sympLabel: string; symptoms: string[]; sidebar: string[];
    prenatalTitle: string; prenatalMeta: string; pctSuffix: string;
    nextControlLabel: string; airdropRing: string;
    badgeHospital: string; badgeCre: string; badgePending: string;
    airdropTitle: string; airdropDesc: string; momEarned: string; claimBtn: string;
    aiStatus: string; offlineBar: string; quickReplies: string[]; chatPlaceholder: string;
    progressLabel: string;
    controls: Array<{ name: string; week: string }>;
    initMsg1: string; initMsg2: string;
  };
  howItWorksPage: {
    sectionLabel: string; sectionTitle: string; sectionSub: string;
    worldidTitle: string; worldidSub: string;
    worldidSteps: Array<{ title: string; desc: string }>;
    worldidBadges: string[];
    creTitle: string; creSub: string;
    creSteps: Array<{ title: string; desc: string }>;
    aiTitle: string; aiSub: string;
    aiSteps: Array<{ title: string; desc: string }>;
    aiBadges: string[];
    offlineTitle: string; offlineSub: string;
    offlineSteps: Array<{ title: string; desc: string }>;
    offlineBadge: string; offlineMiniSteps: string[];
    pillarsLabel: string; pillarsTitle1: string; pillarsTitle2: string; pillarsSub: string;
    pillars: Array<{ title: string; desc: string }>;
  };
  institucional: {
    eyebrow: string; title: string; sub: string; cta1: string; cta2: string;
    targetDescs: string[];
    targetFeats: string[][];
    impactLabel: string; impactTitle2: string;
    impactLabels: string[];
  };
  tecnologia: {
    eyebrow: string; title: string; subtitle: string;
    nodes: Array<{ title: string; desc: string }>;
    checklist: Array<{ title: string; desc: string }>;
  };
}

export const translations: Record<Lang, Translations> = {
  EN: {
    nav: { mission: 'Mission', app: 'The App', howItWorks: 'How it works', institutional: 'Institutional', technology: 'Technology', about: 'About Us' },
    emergency: 'EMERGENCY',
    hero: { badge: 'Bolivia · Maternal Health Program', line1: 'No mother', line2: 'should die', line3: 'giving life' },
    subtitle: 'WARMAY is the first maternal mortality prevention platform combining emergency alerts, blockchain-verified prenatal care and trilingual AI for Bolivian mothers.',
    langNames: ['English', 'Quechua · Runa Simi', 'Aymara'],
    stats: { stat1: 'deaths per\n100,000 live births', stat2: 'are preventable\nwith timely care', stat3: 'occur in rural\nareas without access' },
    features: { badge: 'What does WARMAY do?', line1: 'Emergencies', line2: 'Blockchain', line3: 'Artificial Intelligence', cta1: '🌸 Access the App', cta2: 'Learn more ↓' },
    scroll: 'Scroll to explore',
    crisis: {
      eyebrow: 'The 5 leading causes',
      title1: 'Knowing',
      title2: 'the danger saves lives',
      subtitle: 'WARMAY detects these patterns and activates immediate emergency protocols.',
      cards: [
        { name: 'Postpartum Hemorrhage', desc: 'Active alert in less than 30 sec.' },
        { name: 'Eclampsia / Preeclampsia', desc: 'Predictive AI and early warning.' },
        { name: 'Sepsis / Infection', desc: 'Detection and urgent referral.' },
        { name: 'Obstructed Labour', desc: 'Nearest obstetric hospital.' },
        { name: 'Other causes', desc: 'Trilingual intelligent triage.' },
      ],
    },
    howItWorks: {
      badge: 'How it works',
      title1: 'WARMAY',
      title2: 'in 4 steps',
      steps: [
        { title: 'Verified identity', desc: 'WorldID ZK proof — you are unique, without revealing your name. Anti-Sybil.' },
        { title: 'Panic Button', desc: 'One tap alerts family, nearest hospital and community network. Works offline.' },
        { title: 'Verified check-ups', desc: 'Each prenatal check-up recorded by the hospital on Chainlink CRE. Immutable.' },
        { title: 'Token airdrop', desc: 'After completing verified check-ups, you receive MOM tokens. Real incentive.' },
      ],
    },
    orgBand: {
      heading: 'Designed for international organisations',
      marquee: '🏥 Ministry of Health Bolivia ✦ 🌍 PAHO / WHO ✦ 🤱 UNICEF ✦ 💙 UNFPA ✦ 🌐 World Bank ✦ ⚕️ Local NGOs ✦ ',
    },
    footer: {
      tagline: 'Digital maternal health in Bolivia — English · Spanish · Quechua · Aymara',
      links: ['Mission', 'Causes', 'How it works', 'Institutional'],
      copyright: '© 2026 WARMAY · Maternal Health Programme · Bolivia',
    },
    appDemo: {
      onlineBadge: 'Online · GPS active',
      panicLabel: '🚨 EMERGENCY BUTTON',
      panicText: 'ASK FOR HELP\nNOW',
      panicSub: 'Tap to activate alert',
      sympLabel: 'what do you feel?',
      symptoms: ['🩸 Bleeding', '⚡ Seizure', '😣 Severe pain', '🌡️ High fever', '💫 Dizziness', '🫀 Baby not moving'],
      sidebar: ['My Check-ups', 'Emergency Map', 'Blockchain Hospitals', 'My MOM Tokens', 'Trust Network'],
      prenatalTitle: '📋 Prenatal Check-ups',
      prenatalMeta: 'Verified by hospital + Chainlink CRE · Sepolia',
      pctSuffix: '% completed',
      nextControlLabel: 'Next check-up:',
      airdropRing: 'Complete 2 more check-ups for the next airdrop.',
      badgeHospital: '🏥 Hospital',
      badgeCre: '🔗 CRE',
      badgePending: '⏳ Pending',
      airdropTitle: 'You have tokens available!',
      airdropDesc: '6 check-ups verified by hospital + Chainlink CRE + WorldID. Claim your MOM!',
      momEarned: 'MOM earned',
      claimBtn: '🪙 Claim',
      aiStatus: 'Online · Claude AI',
      offlineBar: '📡 Offline mode available · Automatic SMS without internet',
      quickReplies: ['When to go to A&E?', 'Dangerous symptoms', 'How does offline work?', 'Haemorrhage — what to do?'],
      chatPlaceholder: 'Write your query...',
      progressLabel: 'progress',
      controls: [
        { name: 'First prenatal visit', week: 'Wk 8 · 15 Jan 2026' },
        { name: '1st trimester scan', week: 'Wk 12 · 12 Feb 2026' },
        { name: 'Blood test', week: 'Wk 16 · 5 Mar 2026' },
        { name: 'Morphology scan', week: 'Wk 20 · 2 Mar 2026' },
        { name: 'Blood pressure check', week: 'Wk 22 · Yesterday' },
        { name: 'Tetanus vaccine', week: 'Wk 24 · Today' },
        { name: 'Wk 28 check-up', week: 'Pending' },
        { name: '3rd trimester scan', week: 'Wk 32 · Pending' },
      ],
      initMsg1: "Hi! I'm WARMAY's AI. I'm here to help you with any questions about your pregnancy, symptoms or the app. I also work without internet via SMS. How can I help? 🌸",
      initMsg2: '🚑 Ambulance notified. ETA: 8-12 min. Stay calm, help is on the way. Do you need instructions while you wait?',
    },
    howItWorksPage: {
      sectionLabel: 'Technological transparency',
      sectionTitle: 'How does WARMAY work?',
      sectionSub: 'Each component has a specific role. Privacy and security as pillars — not promises.',
      worldidTitle: 'WorldID — Unique Identity',
      worldidSub: 'ZK Semaphore Proof · Anti-Sybil',
      worldidSteps: [
        { title: 'Scan your iris in World App', desc: "A special Orb creates a unique fingerprint that never leaves your phone. It doesn't store your face." },
        { title: 'A ZK Proof is generated', desc: 'A mathematical proof that shows "I am human and unique" without revealing who you are. Impossible to fake.' },
        { title: 'Unique nullifier hash', desc: 'Each action generates a unique code that prevents claiming twice. Nobody can impersonate your identity.' },
        { title: 'CRE verifies on Sepolia', desc: 'The Chainlink workflow reads the nullifier in the contract. If already used → automatically rejected.' },
      ],
      worldidBadges: ['🔒 No name or face', '✓ 1 person = 1 subsidy'],
      creTitle: 'Chainlink CRE — Orchestration',
      creSub: 'DON Consensus · 5 nodes · TypeScript → WASM',
      creSteps: [
        { title: 'Mother activates a check-up', desc: 'The hospital records attendance in their system. The hospital API confirms the check-up.' },
        { title: 'CRE workflow triggers', desc: '5 DON (Decentralized Oracle Network) nodes query the hospital API independently.' },
        { title: 'BFT Consensus', desc: 'All 5 nodes must agree on the result. If one lies, the other 4 reject it. Impossible to corrupt.' },
        { title: 'Writes to SubsidyVault', desc: 'Only if everything is valid → CRE writes to the Sepolia smart contract and releases MOM tokens.' },
      ],
      aiTitle: 'Claude AI — Trilingual Assistant',
      aiSub: 'ES · Quechua · Aymara · Real-time',
      aiSteps: [
        { title: 'Ask in your language', desc: 'Write or speak in Spanish, Quechua or Aymara. The AI understands all 3 native languages of Bolivia.' },
        { title: 'Symptom analysis', desc: 'Describe what you feel → the AI classifies urgency (critical/moderate/mild) and recommends action.' },
        { title: 'Emergency protocol', desc: 'If it detects a critical symptom → automatically activates the panic button and suggests the nearest hospital.' },
        { title: 'In the CRE workflow', desc: 'Claude also analyses check-up eligibility within the Chainlink workflow before releasing tokens.' },
      ],
      aiBadges: ['🧠 claude-haiku-4-5', '🌐 3 languages'],
      offlineTitle: 'Offline Mode — No Internet',
      offlineSub: 'SMS fallback · Rural Bolivia · Always works',
      offlineSteps: [
        { title: 'Automatic detection', desc: 'WARMAY detects if there is no internet. Switches to offline mode without the mother noticing any difference.' },
        { title: 'Panic button → SMS', desc: 'Without internet: sends emergency SMS with GPS coordinates to trusted contacts and the hospital number.' },
        { title: 'Basic local AI', desc: 'Emergency responses pre-loaded in all 3 languages. No remote server needed.' },
        { title: 'Syncs on reconnect', desc: 'Check-ups registered offline automatically sync with Chainlink CRE when the internet comes back.' },
      ],
      offlineBadge: 'No internet detected — SMS mode active',
      offlineMiniSteps: ['GPS saving location every 30 sec', 'Basic AI available (local responses)', 'Automatic SMS on emergency activation'],
      pillarsLabel: 'Core pillars',
      pillarsTitle1: 'Privacy',
      pillarsTitle2: 'and Security — not optional',
      pillarsSub: 'Every piece of data, every alert, every check-up is designed with privacy by-design. Mothers trust — we protect.',
      pillars: [
        { title: 'Privacy by design', desc: "No personal data (name, address, medical history) leaves your device without your explicit consent. WorldID only proves you're human." },
        { title: 'Full transparency', desc: 'All hospital-verified check-ups are on blockchain — any auditor, NGO or government can verify how many were done, without seeing who did them.' },
        { title: 'Multi-layer security', desc: 'Panic button with discreet mode (silent vibration), encrypted trust network, alerts that don\'t reveal the reason to people outside the network.' },
        { title: 'Verifiable anonymity', desc: 'Hospitals only record "check-up done" — not the patient\'s name. The blockchain only stores anonymised statistics. Zero correlation possible.' },
      ],
    },
    institucional: {
      eyebrow: '🏛️ For Organisations',
      title: 'WARMAY for institutions',
      sub: 'A platform ready to scale. Verifiable, transparent and corruption-resistant thanks to blockchain + WorldID.',
      cta1: '📩 Request Demo',
      cta2: '📄 Download Report',
      targetDescs: [
        'Verifiable infrastructure for maternal health programmes. Real-time data, impossible to falsify.',
        'Verifiable digital public policy. Subsidies reach those who need them, not intermediaries.',
        'Field tool for midwives, health promoters and community organisations.',
        'Every donated peso traceable on blockchain. They know exactly how many mothers were treated.',
      ],
      targetFeats: [
        ['Regional metrics dashboard', 'SNIS Bolivia integration API', 'Automatic blockchain reports', 'Real-time audit'],
        ['Zero corruption: blockchain + WorldID', 'Trilingual: ES + Quechua + Aymara', 'Offline (SMS fallback)', 'Compatible with SIS and SAFCI'],
        ['No internet mode (SMS)', 'Offline check-up registration', 'Community network alert', 'Integrated training with AI'],
        ['Verifiable onchain impact', 'Automatic social ROI', 'Full fund transparency', 'ESG/SDG Certification'],
      ],
      impactLabel: 'Projected impact',
      impactTitle2: 'can achieve',
      impactLabels: [
        'Reduction in maternal mortality in coverage areas',
        'Mothers who complete all prenatal check-ups',
        'Emergency response time to contacts',
        'Possible fraud (WorldID nullifier + blockchain)',
      ],
    },
    tecnologia: {
      eyebrow: '🏆 Hackathon Submission',
      title: 'WARMAY — Technical Architecture',
      subtitle: 'Chainlink CRE + WorldID + Claude AI + Vinext/Cloudflare · Categories: CRE+AI | WorldID+CRE',
      nodes: [
        { title: 'Mother / Beneficiary', desc: 'Panic button, check-ups, trilingual AI ES/QU/AY. Offline SMS.' },
        { title: 'WorldID IDKit', desc: 'ZK Semaphore proof. Unique nullifier per person per programme. Anti-Sybil.' },
        { title: 'Hospital API', desc: 'Verified hospitals record check-ups. CRE queries with DON consensus (5 BFT nodes).' },
        { title: 'Chainlink CRE Workflow', desc: 'Orchestrates: WorldID → Hospital API (DON) → Claude AI eligibility → EVM read nullifier → EVM write SubsidyVault.' },
        { title: 'Claude AI (Anthropic)', desc: 'LLM-in-the-loop. Eligibility + trilingual counselling. If rejected → not written onchain.' },
        { title: 'SubsidyVault · Sepolia', desc: 'Receives CRE writeReport. Verifies nullifier. Transfers MOM tokens. Records anonymous check-up.' },
      ],
      checklist: [
        { title: 'CRE workflow created and simulable', desc: 'cre workflow simulate warmay-maternal-workflow --broadcast' },
        { title: 'Blockchain + external API + LLM', desc: 'Sepolia EVM + Hospital API (DON BFT) + Claude AI — inside the CRE workflow' },
        { title: 'WorldID + CRE (non-native chain)', desc: 'ZK Nullifier on Sepolia via CRE. Anti-Sybil for MOM airdrop.' },
        { title: 'Binding AI + trilingual counselling', desc: 'Claude AI EN/ES/QU/AY. If rejected → not written onchain. Offline SMS fallback.' },
        { title: 'Verified hospitals on blockchain', desc: 'Immutable checklist. Transparency for NGO/Government. Patient anonymity.' },
        { title: 'Privacy by design', desc: 'ZK proofs + nullifier hash + E2E encryption + discreet mode + private trust network' },
        { title: '3-5 min video', desc: 'Panic button → map → Quechua chat → CRE simulate terminal → txHash Etherscan' },
      ],
    },
  },

  ES: {
    nav: { mission: 'Misión', app: 'La App', howItWorks: '¿Cómo funciona?', institutional: 'Institucional', technology: 'Tecnología', about: 'Nosotros' },
    emergency: 'EMERGENCIA',
    hero: { badge: 'Bolivia · Programa de Salud Materna', line1: 'Ninguna madre', line2: 'debería morir', line3: 'dando vida' },
    subtitle: 'WARMAY es la primera plataforma de prevención de mortalidad materna que combina alertas de emergencia, seguimiento prenatal verificado en blockchain y IA trilingüe para madres bolivianas.',
    langNames: ['Español', 'Quechua · Runa Simi', 'Aymara'],
    stats: { stat1: 'muertes por cada\n100,000 nacidos vivos', stat2: 'son prevenibles con\natención oportuna', stat3: 'ocurren en áreas\nrurales sin acceso' },
    features: { badge: '¿Qué hace WARMAY?', line1: 'Emergencias', line2: 'Blockchain', line3: 'Inteligencia Artificial', cta1: '🌸 Acceder a la App', cta2: 'Conoce más ↓' },
    scroll: 'Desliza para explorar',
    crisis: {
      eyebrow: 'Las 5 causas principales',
      title1: 'Conocer',
      title2: 'el peligro salva vidas',
      subtitle: 'WARMAY detecta estos patrones y activa protocolos de emergencia inmediata.',
      cards: [
        { name: 'Hemorragia Postparto', desc: 'Alerta activa en menos de 30 seg.' },
        { name: 'Eclampsia / Preeclampsia', desc: 'IA predictiva y alerta temprana.' },
        { name: 'Sepsis / Infección', desc: 'Detección y derivación urgente.' },
        { name: 'Parto Obstruido', desc: 'Hospital obstétrico más cercano.' },
        { name: 'Otras causas', desc: 'Triage inteligente trilingüe.' },
      ],
    },
    howItWorks: {
      badge: 'Cómo funciona',
      title1: 'WARMAY',
      title2: 'en 4 pasos',
      steps: [
        { title: 'Identidad verificada', desc: 'WorldID ZK proof — eres única, sin revelar tu nombre. Anti-Sybil.' },
        { title: 'Botón de Pánico', desc: 'Un toque alerta a familiares, hospital cercano y red comunitaria. Funciona sin internet.' },
        { title: 'Controles verificados', desc: 'Cada control prenatal registrado por el hospital en Chainlink CRE. Inmutable.' },
        { title: 'Airdrop de tokens', desc: 'Al completar controles verificados, recibes MOM tokens. Incentivo real.' },
      ],
    },
    orgBand: {
      heading: 'Diseñado para organismos internacionales',
      marquee: '🏥 Ministerio de Salud Bolivia ✦ 🌍 OPS / OMS ✦ 🤱 UNICEF ✦ 💙 UNFPA ✦ 🌐 Banco Mundial ✦ ⚕️ ONGs Locales ✦ ',
    },
    footer: {
      tagline: 'Salud materna digital en Bolivia — Español · Quechua · Aymara',
      links: ['Misión', 'Causas', 'Cómo funciona', 'Institucional'],
      copyright: '© 2026 WARMAY · Programa de Salud Materna · Bolivia',
    },
    appDemo: {
      onlineBadge: 'En línea · GPS activo',
      panicLabel: '🚨 BOTÓN DE EMERGENCIA',
      panicText: 'PEDIR AYUDA\nAHORA',
      panicSub: 'Toca para activar alerta',
      sympLabel: '¿qué sientes?',
      symptoms: ['🩸 Sangrado', '⚡ Convulsión', '😣 Dolor fuerte', '🌡️ Fiebre alta', '💫 Mareo', '🫀 Bebé no mueve'],
      sidebar: ['Mis Controles', 'Mapa de Emergencia', 'Hospitales Blockchain', 'Mis Tokens MOM', 'Red de Confianza'],
      prenatalTitle: '📋 Controles Prenatales',
      prenatalMeta: 'Verificados por hospital + Chainlink CRE · Sepolia',
      pctSuffix: '% completado',
      nextControlLabel: 'Próximo control:',
      airdropRing: 'Completa 2 controles más para el próximo airdrop.',
      badgeHospital: '🏥 Hospital',
      badgeCre: '🔗 CRE',
      badgePending: '⏳ Pendiente',
      airdropTitle: '¡Tienes tokens disponibles!',
      airdropDesc: '6 controles verificados por hospital + Chainlink CRE + WorldID. ¡Reclama tus MOM!',
      momEarned: 'MOM ganados',
      claimBtn: '🪙 Reclamar',
      aiStatus: 'En línea · Claude AI',
      offlineBar: '📡 Modo offline disponible · SMS automático sin internet',
      quickReplies: ['¿Cuándo ir a urgencias?', 'Síntomas peligrosos', '¿Cómo funciona offline?', 'Hemorragia ¿qué hago?'],
      chatPlaceholder: 'Escribe tu consulta...',
      progressLabel: 'avance',
      controls: [
        { name: 'Primera visita prenatal', week: 'Sem 8 · 15 Ene 2026' },
        { name: 'Ecografía I trimestre', week: 'Sem 12 · 12 Feb 2026' },
        { name: 'Análisis de sangre', week: 'Sem 16 · 5 Mar 2026' },
        { name: 'Ecografía morfológica', week: 'Sem 20 · 2 Mar 2026' },
        { name: 'Control presión arterial', week: 'Sem 22 · Ayer' },
        { name: 'Vacuna antitetánica', week: 'Sem 24 · Hoy' },
        { name: 'Control sem 28', week: 'Pendiente' },
        { name: 'Ecografía III trimestre', week: 'Sem 32 · Pendiente' },
      ],
      initMsg1: '¡Hola! Soy la IA de WARMAY. Estoy aquí para ayudarte con cualquier duda sobre tu embarazo, síntomas o la aplicación. También funciono sin internet mediante SMS. ¿En qué te ayudo? 🌸',
      initMsg2: '🚑 Ambulancia notificada. ETA: 8-12 min. Quédate tranquila, ayuda en camino. ¿Necesitas instrucciones mientras esperas?',
    },
    howItWorksPage: {
      sectionLabel: 'Transparencia tecnológica',
      sectionTitle: '¿Cómo funciona WARMAY?',
      sectionSub: 'Cada componente tiene un rol específico. Privacidad y seguridad como pilares — no como promesas.',
      worldidTitle: 'WorldID — Identidad Única',
      worldidSub: 'ZK Semaphore Proof · Anti-Sybil',
      worldidSteps: [
        { title: 'Escaneas tu iris en World App', desc: 'Un orb especial crea una "huella única" que nunca sale de tu teléfono. No guarda tu cara.' },
        { title: 'Se genera un ZK Proof', desc: 'Una prueba matemática que demuestra "soy humana y única" sin revelar quién eres. Imposible de falsificar.' },
        { title: 'Nullifier hash único', desc: 'Cada acción genera un código único que impide reclamar dos veces. Nadie puede suplantar tu identidad.' },
        { title: 'CRE verifica en Sepolia', desc: 'El workflow Chainlink lee el nullifier en el contrato. Si ya fue usado → rechazado automáticamente.' },
      ],
      worldidBadges: ['🔒 Sin nombre ni cara', '✓ 1 persona = 1 subsidio'],
      creTitle: 'Chainlink CRE — Orquestación',
      creSub: 'DON Consensus · 5 nodos · TypeScript → WASM',
      creSteps: [
        { title: 'La madre activa un control', desc: 'El hospital registra la asistencia en su sistema. La API del hospital confirma el control.' },
        { title: 'CRE workflow se dispara', desc: '5 nodos del DON (Decentralized Oracle Network) consultan la API del hospital de forma independiente.' },
        { title: 'Consenso BFT', desc: 'Los 5 nodos deben acordar el resultado. Si uno miente, los otros 4 lo rechazan. Imposible corromper.' },
        { title: 'Escribe en SubsidyVault', desc: 'Solo si todo es válido → el CRE escribe en el smart contract de Sepolia y libera los tokens MOM.' },
      ],
      aiTitle: 'Claude AI — Asistente Trilingüe',
      aiSub: 'ES · Quechua · Aymara · Tiempo real',
      aiSteps: [
        { title: 'Pregunta en tu idioma', desc: 'Escribe o habla en español, quechua o aymara. La IA entiende los 3 idiomas nativos de Bolivia.' },
        { title: 'Análisis de síntomas', desc: 'Describe lo que sientes → la IA clasifica urgencia (crítica/moderada/leve) y recomienda acción.' },
        { title: 'Protocolo de emergencia', desc: 'Si detecta síntoma crítico → activa automáticamente el botón de pánico y sugiere el hospital más cercano.' },
        { title: 'En el CRE workflow', desc: 'Claude también analiza elegibilidad de los controles dentro del Chainlink workflow antes de liberar tokens.' },
      ],
      aiBadges: ['🧠 claude-haiku-4-5', '🌐 3 idiomas'],
      offlineTitle: 'Modo Offline — Sin Internet',
      offlineSub: 'SMS fallback · Bolivia rural · Funciona siempre',
      offlineSteps: [
        { title: 'Detección automática', desc: 'WARMAY detecta si no hay internet. Cambia a modo offline sin que la madre note diferencia.' },
        { title: 'Botón de pánico → SMS', desc: 'Sin internet: envía SMS de emergencia con coordenadas GPS a contactos de confianza y al número del hospital.' },
        { title: 'IA local básica', desc: 'Respuestas de emergencia pre-cargadas en los 3 idiomas. Sin necesitar servidor remoto.' },
        { title: 'Sincroniza al reconectar', desc: 'Los controles registrados offline se sincronizan automáticamente con Chainlink CRE cuando vuelve el internet.' },
      ],
      offlineBadge: 'Sin internet detectado — Modo SMS activo',
      offlineMiniSteps: ['GPS guardando ubicación cada 30 seg', 'IA básica disponible (respuestas locales)', 'SMS automático al activar emergencia'],
      pillarsLabel: 'Pilares fundamentales',
      pillarsTitle1: 'Privacidad',
      pillarsTitle2: 'y Seguridad — no son opciones',
      pillarsSub: 'Cada dato, cada alerta, cada control está diseñado con privacidad by-design. Las madres confían — nosotros lo protegemos.',
      pillars: [
        { title: 'Privacidad por diseño', desc: 'Ningún dato personal (nombre, dirección, historial médico) sale de tu dispositivo sin tu consentimiento explícito. WorldID solo prueba que eres humana.' },
        { title: 'Transparencia total', desc: 'Todos los controles verificados por hospitales están en blockchain — cualquier auditor, ONG o gobierno puede verificar cuántos se realizaron, sin ver quién los hizo.' },
        { title: 'Seguridad multicapa', desc: 'Botón de pánico con modo discreto (vibración silenciosa), red de confianza cifrada, alertas que no revelan el motivo a personas externas a la red.' },
        { title: 'Anonimato verificable', desc: 'Los hospitales solo registran "control realizado" — no el nombre de la paciente. La blockchain solo guarda estadísticas anonimizadas. Cero correlación posible.' },
      ],
    },
    institucional: {
      eyebrow: '🏛️ Para Organizaciones',
      title: 'WARMAY para instituciones',
      sub: 'Una plataforma lista para escalar. Verificable, transparente y resistente a la corrupción gracias a blockchain + WorldID.',
      cta1: '📩 Solicitar Demo',
      cta2: '📄 Descargar Informe',
      targetDescs: [
        'Infraestructura verificable para programas de salud materna. Datos en tiempo real, imposibles de falsificar.',
        'Política pública digital verificable. Los subsidios llegan a quienes los necesitan, no a intermediarios.',
        'Herramienta de campo para parteras, promotoras de salud y organizaciones comunitarias.',
        'Cada peso donado trazable en blockchain. Saben exactamente cuántas madres se atendieron.',
      ],
      targetFeats: [
        ['Dashboard de métricas por región', 'API de integración con SNIS Bolivia', 'Reportes blockchain automáticos', 'Auditoría en tiempo real'],
        ['Zero corrupción: blockchain + WorldID', 'Trilingüe: ES + Quechua + Aymara', 'Offline (SMS fallback)', 'Compatible SIS y SAFCI'],
        ['Modo sin internet (SMS)', 'Registro offline de controles', 'Alerta a red comunitaria', 'Capacitación integrada con IA'],
        ['Impacto verificable onchain', 'ROI social automático', 'Transparencia total de fondos', 'Certificación ESG/SDG'],
      ],
      impactLabel: 'Impacto proyectado',
      impactTitle2: 'puede lograr',
      impactLabels: [
        'Reducción mortalidad materna en zonas de cobertura',
        'Madres que completan todos sus controles prenatales',
        'Tiempo de respuesta de emergencia a contactos',
        'Fraude posible (WorldID nullifier + blockchain)',
      ],
    },
    tecnologia: {
      eyebrow: '🏆 Hackathon Submission',
      title: 'WARMAY — Arquitectura Técnica',
      subtitle: 'Chainlink CRE + WorldID + Claude AI + Vinext/Cloudflare · Categorías: CRE+IA | WorldID+CRE',
      nodes: [
        { title: 'Madre / Beneficiaria', desc: 'Botón de pánico, controles, IA trilingüe ES/QU/AY. Offline SMS.' },
        { title: 'WorldID IDKit', desc: 'ZK Semaphore proof. Nullifier único por persona por programa. Anti-Sybil.' },
        { title: 'Hospital API', desc: 'Los hospitales verificados registran controles. CRE consulta con DON consensus (5 nodos BFT).' },
        { title: 'Chainlink CRE Workflow', desc: 'Orquesta: WorldID → Hospital API (DON) → Claude AI elegibilidad → EVM read nullifier → EVM write SubsidyVault.' },
        { title: 'Claude AI (Anthropic)', desc: 'LLM-in-the-loop. Elegibilidad + consejería trilingüe. Si rechaza → no escribe onchain.' },
        { title: 'SubsidyVault · Sepolia', desc: 'Recibe CRE writeReport. Verifica nullifier. Transfiere MOM tokens. Registra control anónimo.' },
      ],
      checklist: [
        { title: 'CRE workflow creado y simulable', desc: 'cre workflow simulate warmay-maternal-workflow --broadcast' },
        { title: 'Blockchain + API externa + LLM', desc: 'Sepolia EVM + Hospital API (DON BFT) + Claude AI — dentro del CRE workflow' },
        { title: 'WorldID + CRE (chain no nativa)', desc: 'Nullifier ZK en Sepolia a través de CRE. Anti-Sybil para airdrop MOM.' },
        { title: 'IA vinculante + consejería trilingüe', desc: 'Claude AI ES/QU/AY. Si rechaza → no escribe onchain. Offline SMS fallback.' },
        { title: 'Hospitales verificados en blockchain', desc: 'Checklist inmutable. Transparencia para ONG/Gobierno. Anonimato de pacientes.' },
        { title: 'Privacidad by-design', desc: 'ZK proofs + nullifier hash + cifrado E2E + modo discreto + red de confianza privada' },
        { title: 'Video 3-5 min', desc: 'Botón pánico → mapa → chat quechua → CRE simulate terminal → txHash Etherscan' },
      ],
    },
  },

  QU: {
    nav: { mission: 'Llankay', app: 'App-ta', howItWorks: 'Imaynatan?', institutional: 'Ayllu', technology: 'Yachay', about: 'Ñuqanchis' },
    emergency: 'MANCHAY',
    hero: { badge: 'Bolivia · Mamakuna Qhapaq Kawsay', line1: 'Mana mama', line2: 'wañunanchu', line3: 'kawsayta qukuspa' },
    subtitle: 'WARMAY ñawpaq plataforma mamakuna wañuymanta llankaq — manchay willakuykuna, blockchain prenatal qhaway, IA kimsayuq simipim.',
    langNames: ['Español', 'Quechua · Runa Simi', 'Aymara'],
    stats: { stat1: 'wañuy sapa\n100,000 wawakuqmanta', stat2: 'atipasqa kanman\npaqtachiy atendisqanpi', stat3: 'chawpi llaqtapi\nmana yanapay kaqpi' },
    features: { badge: 'Imaynatan WARMAY llamkan?', line1: 'Manchakuy', line2: 'Blockchain', line3: 'Yachaymanta Ruway', cta1: '🌸 App-ta yaykuy', cta2: 'Aswan yachay ↓' },
    scroll: 'Urayman kachay',
    crisis: {
      eyebrow: 'Pichqa hatun llakikuna',
      title1: 'Yachay',
      title2: 'llakita wiñay kawsayman',
      subtitle: 'WARMAY kay yuyaytakunata tarispan ñawpaq manchay kamachiyta qallarichen.',
      cards: [
        { name: 'Wachay Yawar', desc: 'Manchay willakuy 30 segundopi.' },
        { name: 'Eclampsia / Preeclampsia', desc: 'IA ñawpaqmanta yachaq.' },
        { name: 'Sepsis / Onqoy', desc: 'Tarispan utqaylla apay.' },
        { name: 'Sasachakuy Wachay', desc: 'Qayllapi wachay wasi.' },
        { name: 'Huk llakikuna', desc: 'Kimsayuq simi triage.' },
      ],
    },
    howItWorks: {
      badge: 'Imaynatan llamkan',
      title1: 'WARMAY',
      title2: '4 pasupi',
      steps: [
        { title: 'Sutiyki qhawasqa', desc: 'WorldID ZK proof — huklla kanki, mana sutiykita willarispa. Anti-Sybil.' },
        { title: 'Manchay Tumpiy', desc: 'Hukllataq tumpiyqa ayllukta, qayllaqi wachay wasita willachin. Internetpaq mana munan.' },
        { title: 'Qhawasqa qhawakuykuna', desc: 'Sapa prenatal wasiman wisqasqa Chainlink CRE-pi. Mana tikrakusqachu.' },
        { title: 'Token airdrop', desc: 'Qhawakuykuna tukuchisqan qhipaman MOM token japinki. Cheqaq incentivo.' },
      ],
    },
    orgBand: {
      heading: 'Hatun ayllukunapaq ruwasqa',
      marquee: '🏥 Bolivia Salud Ministerio ✦ 🌍 OPS / OMS ✦ 🤱 UNICEF ✦ 💙 UNFPA ✦ 🌐 Mundo Banco ✦ ⚕️ Llaqta ONGs ✦ ',
    },
    footer: {
      tagline: 'Bolivia mamakuna digital kawsay — Español · Quechua · Aymara',
      links: ['Llankay', 'Llakikuna', 'Imaynatan', 'Ayllu'],
      copyright: '© 2026 WARMAY · Mamakuna Kawsay · Bolivia',
    },
    appDemo: {
      onlineBadge: 'Kuska · GPS kamachisqa',
      panicLabel: '🚨 MANCHAY TUMPIY',
      panicText: 'YANAPAY MAÑAY\nKUNAN',
      panicSub: 'Tumpiy manchay willakuypaq',
      sympLabel: '¿imatam siyanki?',
      symptoms: ['🩸 Yawar', '⚡ Manchaykuy', '😣 Hatun Nanay', '🌡️ Rupay Onqoy', '💫 Ñawiñakuy', '🫀 Wawa Mana Kuyuq'],
      sidebar: ['Ñuqa Qhawakuykuna', 'Manchay Mapa', 'Blockchain Wasikuna', 'Ñuqa MOM Token', 'Allpa Red'],
      prenatalTitle: '📋 Prenatal Qhawakuykuna',
      prenatalMeta: 'Hospital + Chainlink CRE · Sepolia qhawasqa',
      pctSuffix: '% tukusqa',
      nextControlLabel: 'Qayllapi qhawakuy:',
      airdropRing: 'Iskay qhawakuykuna aswan tukuy airdrop qhipaman.',
      badgeHospital: '🏥 Onqoy Wasi',
      badgeCre: '🔗 CRE',
      badgePending: '⏳ Suyakuy',
      airdropTitle: '¡Token tiyanki!',
      airdropDesc: '6 qhawakuykuna qhawasqa hospital + Chainlink CRE + WorldID. ¡MOM japiy!',
      momEarned: 'MOM japirqa',
      claimBtn: '🪙 Japiy',
      aiStatus: 'Kuska · Claude AI',
      offlineBar: '📡 Offline llamkay · SMS mana internetpim',
      quickReplies: ['¿Imaypimi manchaypi rinki?', 'Manchay onqoykuna', '¿Mana internetpichu llamkan?', 'Yawar ¿imatam ruway?'],
      chatPlaceholder: 'Tapuykita qillqay...',
      progressLabel: 'ñanta',
      controls: [
        { name: 'Ñawpaq prenatal qhaway', week: 'Sem 8 · 15 Ene 2026' },
        { name: 'I trimestre ecografía', week: 'Sem 12 · 12 Feb 2026' },
        { name: 'Yawar tarikiy', week: 'Sem 16 · 5 Mar 2026' },
        { name: 'Morfología ecografía', week: 'Sem 20 · 2 Mar 2026' },
        { name: 'Yawar presión qhaway', week: 'Sem 22 · Qayna Punchay' },
        { name: 'Antitetánica vacuna', week: 'Sem 24 · Kunan Punchay' },
        { name: 'Sem 28 qhaway', week: 'Suyakuy' },
        { name: 'III trimestre ecografía', week: 'Sem 32 · Suyakuy' },
      ],
      initMsg1: '¡Napaykullayki! Ñuqaqa WARMAY IA kani. Llakiykipim yanapasunki. Mana internetpin SMS-ñan llamkani. ¿Ima yanapasunki? 🌸',
      initMsg2: '🚑 Ambulancia willasqa. ETA: 8-12 min. Sumaq tiyay, yanapay ñayninpi. ¿Suyaspa yachankiManmi?',
    },
    howItWorksPage: {
      sectionLabel: 'Teknología willakuy',
      sectionTitle: '¿WARMAY imaynatan llamkan?',
      sectionSub: 'Sapa yanapay rakikunki. Mana sutiyki rikuchiy — prometiis mana.',
      worldidTitle: 'WorldID — Huk Sutin',
      worldidSub: 'ZK Semaphore Proof · Anti-Sybil',
      worldidSteps: [
        { title: 'Nawiykita World App-pi qhawaykuy', desc: 'Huk Orb especial hukllan ruwana rikusqa — mana qanpa ñawikita waqaychanchu.' },
        { title: 'ZK Proof ruwasqa', desc: 'Matemática ñanllan rikusqa "ñuqaqa runaymi huklla" nispa — mana pitam sutiykita rikuchin. Mana ruwasqachu.' },
        { title: 'Huk nullifier hash', desc: 'Sapa ruwaypi huk códigoqa ruwasqa iskaynintanmi mañanampaq. Mana pitapis qanmanta sutiykita churasunchu.' },
        { title: 'CRE Sepolia-pi qhaway', desc: 'Chainlink workflow nullifier ñiqinpi leenqa. Ya yuraq kaqtin → automáticamente rechazan.' },
      ],
      worldidBadges: ['🔒 Mana sutim cara', '✓ 1 runa = 1 subsidio'],
      creTitle: 'Chainlink CRE — Kamachiy',
      creSub: 'DON Consensus · 5 nodi · TypeScript → WASM',
      creSteps: [
        { title: 'Mama qhawakuyta qallarichin', desc: 'Wasi onqoy asistincianta registran. Hospital API qhawakuyta cheqanin.' },
        { title: 'CRE workflow qallarichin', desc: 'DON 5 nodi hospital APita independientepim tapun.' },
        { title: 'BFT Consenso', desc: '5 nodikuna rimayninkumantataq. Huknin llullakitin, hukninkuna chiqanin. Mana kunkachisqachu.' },
        { title: 'SubsidyVault qillqan', desc: 'Cheqan kaqtin → CRE Sepolia smart contratupi qillqan MOM tokens pascachin.' },
      ],
      aiTitle: 'Claude AI — Kimsayuq Simi Yanapaq',
      aiSub: 'ES · Quechua · Aymara · Kunan tiempo',
      aiSteps: [
        { title: 'Simiykipi tapuy', desc: 'Español, quechua icha aymarapin qillqay icha rimay. IA Bolivia kimsayuq simita comprenden.' },
        { title: 'Onqoykuna tarikiy', desc: 'Imatas siyanki willaktiy → IA urgencia (critico/moderado/suave) clasifica acción nispa.' },
        { title: 'Manchay protocolo', desc: 'Manchay onqoy tarispan → automáticamente pánico botón qallarichin qayllapi hospitalta willachin.' },
        { title: 'CRE workflow-pi', desc: 'Claude controles elegibilidad CRE Chainlink workflow-pi analisa tokens mana pascachispa.' },
      ],
      aiBadges: ['🧠 claude-haiku-4-5', '🌐 3 simikuna'],
      offlineTitle: 'Offline Modo — Mana Internet',
      offlineSub: 'SMS fallback · Bolivia Chawpi llaqta · Siempre llamkan',
      offlineSteps: [
        { title: 'Automático tarispan', desc: 'WARMAY internet mana kaqta tarispan. Offline modo cambian mama mana rikuspan.' },
        { title: 'Pánico botón → SMS', desc: 'Mana internetpim: SMS manchay GPS coordinates confianza contactokunaman hospitalmantaq.' },
        { title: 'Básico local IA', desc: 'Manchay kutinakuykuna kimsayuq simipi pre-cargado. Mana remoto servidor munaspa.' },
        { title: 'Reconectaspa sincroniza', desc: 'Offline qhawakuykuna automáticamente Chainlink CRE-man sincroniza internet kutimuqtin.' },
      ],
      offlineBadge: 'Mana internet tarispan — SMS modo activo',
      offlineMiniSteps: ['GPS ubicación 30 seg wakin waqaychan', 'Básico IA tarispan (respuestas locales)', 'SMS automático manchay qallarichispa'],
      pillarsLabel: 'Hatun pilares',
      pillarsTitle1: 'Mana sutiyki',
      pillarsTitle2: 'Seguridad — mana optio kanchu',
      pillarsSub: 'Sapa data, sapa alerta, sapa control privacidad munaspan ruwasqa. Mamakuna confian — ñuqaykukuna waqaychaniku.',
      pillars: [
        { title: 'Diseño privacidad', desc: 'Mana personal data (suti, dirección, historial médico) dispositivoykimanta mana rikuspan consentimientoykipi. WorldID ñuqaqa runaymi rikuchin.' },
        { title: 'Llapan transparencia', desc: 'Hospital qhawasqa controles blockchain-pi — auditor, ONG icha gobierno quantas controles rurqa chiqanichin mana pitam rikuchispa.' },
        { title: 'Multicapa seguridad', desc: 'Pánico botón discreto modo (vibración silencioso), cifrada confianza red, alertas personas mana red-pi kaqmanta razón mana rikuchis.' },
        { title: 'Verificable anonimato', desc: 'Hospitalkuna "control rurqa" nispa qillqan — mana paciente surinta. Blockchain estadísticas anonimizadas waqaychan. Cero correlación posible.' },
      ],
    },
    institucional: {
      eyebrow: '🏛️ Organizacionkunapaq',
      title: 'WARMAY instituciones qhapaqpaq',
      sub: 'Plataforma astawan kay. Verificable, transparente mana corrupcion blockchain + WorldID-wan.',
      cta1: '📩 Demo mañay',
      cta2: '📄 Informe descarga',
      targetDescs: [
        'Verificable infraestructura mamakuna salud programas. Tiempo real datos mana falsificar kaqchu.',
        'Verificable pública digital política. Subsidios munaqkunaman chayan mana intermediarios.',
        'Campo herramienta parteras, salud promotoras organizaciones comunitarias.',
        'Sapa donado peso blockchain-pi trazable. Exactamente cuantas mamaskunatan atendieron yachanku.',
      ],
      targetFeats: [
        ['Región métricas dashboard', 'SNIS Bolivia API integración', 'Blockchain reportes automáticos', 'Tiempo real auditoría'],
        ['Zero corrupción: blockchain + WorldID', 'Kimsayuq: ES + Quechua + Aymara', 'Offline (SMS fallback)', 'SIS SAFCI compatible'],
        ['Mana internet modo (SMS)', 'Offline controles registro', 'Comunidad red alerta', 'IA integrado capacitación'],
        ['Onchain verificable impacto', 'Social ROI automático', 'Llapan fondos transparencia', 'ESG/SDG Certificación'],
      ],
      impactLabel: 'Proyectado impacto',
      impactTitle2: 'atipanman',
      impactLabels: [
        'Cobertura zonas mamakuna wañuy reducción',
        'Mamakuna llapan prenatal controles tukuchin',
        'Contactos manchay kutimuy tiempo',
        'Fraude posible (WorldID nullifier + blockchain)',
      ],
    },
    tecnologia: {
      eyebrow: '🏆 Hackathon Submission',
      title: 'WARMAY — Téktiko Arquitectura',
      subtitle: 'Chainlink CRE + WorldID + Claude AI + Vinext/Cloudflare · Categorías: CRE+IA | WorldID+CRE',
      nodes: [
        { title: 'Mama / Beneficiaria', desc: 'Pánico botón, controles, IA trilingüe ES/QU/AY. Offline SMS.' },
        { title: 'WorldID IDKit', desc: 'ZK Semaphore proof. Nullifier huk runa huk programa. Anti-Sybil.' },
        { title: 'Hospital API', desc: 'Verificado hospitalkuna controles qillqan. CRE DON consensus (5 BFT nodo) tapun.' },
        { title: 'Chainlink CRE Workflow', desc: 'Kamachin: WorldID → Hospital API (DON) → Claude AI elegibilidad → EVM nullifier leeq → EVM SubsidyVault qillqay.' },
        { title: 'Claude AI (Anthropic)', desc: 'LLM-in-the-loop. Elegibilidad + kimsayuq consejería. Rechazaspa → onchain mana qillqan.' },
        { title: 'SubsidyVault · Sepolia', desc: 'CRE writeReport hapiqpi. Nullifier qhawan. MOM tokens transferisqa. Anónimo control qillqan.' },
      ],
      checklist: [
        { title: 'CRE workflow ruwasqa simulable', desc: 'cre workflow simulate warmay-maternal-workflow --broadcast' },
        { title: 'Blockchain + API externa + LLM', desc: 'Sepolia EVM + Hospital API (DON BFT) + Claude AI — CRE workflow ukupi' },
        { title: 'WorldID + CRE (mana nativa chain)', desc: 'ZK Nullifier Sepolia CRE-wan. Anti-Sybil MOM airdrop.' },
        { title: 'IA vinculante + kimsayuq consejería', desc: 'Claude AI ES/QU/AY. Rechazaspa → onchain mana qillqan. Offline SMS fallback.' },
        { title: 'Verificado hospitalkuna blockchain-pi', desc: 'Inmutable checklist. ONG/Gobierno transparencia. Pacientes anonimato.' },
        { title: 'Privacidad by-design', desc: 'ZK proofs + nullifier hash + cifrado E2E + discreto modo + privada confianza red' },
        { title: 'Video 3-5 min', desc: 'Pánico botón → mapa → quechua chat → CRE simulate terminal → txHash Etherscan' },
      ],
    },
  },

  AY: {
    nav: { mission: 'Lurawi', app: 'App-xa', howItWorks: 'Kunjamasa?', institutional: "Jach'a Uta", technology: 'Yatiri', about: 'Jiwasa' },
    emergency: "JISK'A LLAKI",
    hero: { badge: 'Bolivia · Taykana Salud Sartawi', line1: 'Jan kunsa tayka', line2: 'wañuñapataki jani', line3: 'jakañ uñtayasa' },
    subtitle: "WARMAY nayrïr plataforma taykana wañuwi taqpachani — jisk'a llaki willtaña, blockchain prenatal qhanachaña, IA kimsani arurawi.",
    langNames: ['Español', 'Quechua · Runa Simi', 'Aymara'],
    stats: { stat1: 'wañuwi sapa\n100,000 wawanakampi', stat2: "janiw wañuniñaspawa\nkamachi yanapt'asax", stat3: 'jaqi uta nayranpi\njan yanapaña katankixa' },
    features: { badge: 'Kuna lurani WARMAY?', line1: "Jisk'a Llaki", line2: 'Blockchain', line3: 'Yatiyawi', cta1: '🌸 App-xa mantaña', cta2: 'Askinaka yatinxa ↓' },
    scroll: 'Aynacha kuyuy',
    crisis: {
      eyebrow: 'Phisqa nayr llakiwi',
      title1: 'Yatiña',
      title2: 'llakiwi jakaña uñtayan',
      subtitle: "WARMAY aka yatiyawinakaru tarpaspan nayrïr jisk'a llaki kamachin.",
      cards: [
        { name: 'Wawachaña Yawar', desc: "Jisk'a llaki willataña 30 segundopi." },
        { name: 'Eclampsia / Preeclampsia', desc: 'IA nayrïr yatiña.' },
        { name: 'Sepsis / Usu', desc: 'Tarpaña ukhamaraki utjawi.' },
        { name: 'Sasachawi Wawachaña', desc: 'Qayllïri wawachaña uta.' },
        { name: 'Ukjamankixa llakiwi', desc: 'Kimsani arurawi triage.' },
      ],
    },
    howItWorks: {
      badge: 'Kunjamasa lurani',
      title1: 'WARMAY',
      title2: '4 pankhar',
      steps: [
        { title: 'Sutimp qhanachawi', desc: 'WorldID ZK proof — hiwsakiwa, sutimp jan willtasa. Anti-Sybil.' },
        { title: "Jisk'a Llaki Mäk'a", desc: "Mayïr mäk'asax jilïrinakaru, qayllïri wawachaña utaru willtaña. Jan internetpi lurani." },
        { title: 'Qhantawinaka qhanachata', desc: 'Sapa prenatal uta Chainlink CRE-n qillqata. Jan tikrasiñapataki.' },
        { title: 'Token airdrop', desc: 'Qhantawinaka tukuyasax MOM token japxani. Cheqa incentivo.' },
      ],
    },
    orgBand: {
      heading: "Jach'a ayllunaka uñtayiri",
      marquee: '🏥 Bolivia Salud Ministerio ✦ 🌍 OPS / OMS ✦ 🤱 UNICEF ✦ 💙 UNFPA ✦ 🌐 Mundo Banco ✦ ⚕️ Marka ONGs ✦ ',
    },
    footer: {
      tagline: 'Bolivia taykana digital salud — Español · Quechua · Aymara',
      links: ['Lurawi', 'Llakiwi', 'Kunjamasa', "Jach'a Uta"],
      copyright: '© 2026 WARMAY · Taykana Salud · Bolivia',
    },
    appDemo: {
      onlineBadge: "Katjawi · GPS kamachi",
      panicLabel: "🚨 JISK'A LLAKI MAK'A",
      panicText: "YANAPT'AÑA MAÑAÑA\nAKITA",
      panicSub: "Mäk'asa jisk'a llaki willtaña",
      sympLabel: '¿kunasa siantäta?',
      symptoms: ['🩸 Yawar', '⚡ Jark\'awi', '😣 Jach\'a Nanawi', '🌡️ Rupthawi Usu', '💫 Ñiqiñiña', '🫀 Wawa Jan Kuyuri'],
      sidebar: ["Nayan Qhantawinaka", "Jisk'a Llaki Mapa", "Blockchain Utanaka", "Nayan MOM Token", "Llak'u Red"],
      prenatalTitle: '📋 Prenatal Qhantawinaka',
      prenatalMeta: 'Uta + Chainlink CRE · Sepolia qhanachata',
      pctSuffix: '% tukuyata',
      nextControlLabel: 'Qayllïri qhantawi:',
      airdropRing: 'Paya qhantawinaka askat tukuyasa airdrop akanïpata.',
      badgeHospital: '🏥 Usuta Uta',
      badgeCre: '🔗 CRE',
      badgePending: '⏳ Awayu',
      airdropTitle: '¡Token utjxi!',
      airdropDesc: '6 qhantawinaka qhanachata uta + Chainlink CRE + WorldID. ¡MOM japxaña!',
      momEarned: 'MOM japxata',
      claimBtn: '🪙 Japxaña',
      aiStatus: 'Katjawi · Claude AI',
      offlineBar: '📡 Offline lurawi · SMS jan internetpi',
      quickReplies: ["¿Kamachisa jisk'a llakïri risini?", 'Jisk\'a llaki usunaka', '¿Jan internetpi lurani?', '¿Yawar kunasa lurana?'],
      chatPlaceholder: 'Tapuñataki qillqaña...',
      progressLabel: 'thakhini',
      controls: [
        { name: 'Nayrïr prenatal qhantatawi', week: 'Sem 8 · 15 Ene 2026' },
        { name: 'I trimestre ecografía', week: 'Sem 12 · 12 Feb 2026' },
        { name: 'Yawar taripawi', week: 'Sem 16 · 5 Mar 2026' },
        { name: 'Morfología ecografía', week: 'Sem 20 · 2 Mar 2026' },
        { name: 'Yawar presión qhantatawi', week: 'Sem 22 · Jutïr Urupa' },
        { name: 'Antitetánica vacuna', week: 'Sem 24 · Akïr Uru' },
        { name: 'Sem 28 qhantatawi', week: 'Awayu' },
        { name: 'III trimestre ecografía', week: 'Sem 32 · Awayu' },
      ],
      initMsg1: '¡Kamisaraki! Nayaxa WARMAY IA. Akankañatakixa utjarakta. Jan internetpi SMS-na lurani. ¿Kunataki yanapt\'asma? 🌸',
      initMsg2: '🚑 Ambulancia willtata. ETA: 8-12 min. Walikisko utjañä, yanapaña sarnaqki. ¿Suyasax kunasa luranañatakis munasmati?',
    },
    howItWorksPage: {
      sectionLabel: "Tecnología qhanañani",
      sectionTitle: '¿WARMAY kunjamasa lurani?',
      sectionSub: "Sapa yanapt'awi akïr lurawi ukhanï. Jan sutimp — qharañänïti mä phürawa.",
      worldidTitle: 'WorldID — May Sutimpi',
      worldidSub: 'ZK Semaphore Proof · Anti-Sybil',
      worldidSteps: [
        { title: 'Nayraxamp World App-n qhananchtaña', desc: 'May Orb especial hiwsïr lurawi rikusïwi — jan nayranktapa waqichaniti.' },
        { title: 'ZK Proof rurata', desc: 'Matemática ñiqini rikusïwi "nayaxa jaqiwa hiwsakiwa" — jan kamachisma sutimp rikuyäpkïti. Jan ruwatätäxa.' },
        { title: 'May nullifier hash', desc: 'Sapa lurwinxa may código rurata iskïr mañantañapata. Janïwa maynixa sutimp churasïtäti.' },
        { title: 'CRE Sepolia-n qhanatañani', desc: 'Chainlink workflow nullifier leenïwi. Ya yuraqata ukhama → automáticamente rechazan.' },
      ],
      worldidBadges: ['🔒 Jan suti jan cara', '✓ 1 jaqi = 1 subsidio'],
      creTitle: 'Chainlink CRE — Kamachiri',
      creSub: 'DON Consensus · 5 nodi · TypeScript → WASM',
      creSteps: [
        { title: 'Tayka qhantawi qalltayi', desc: 'Usuta uta asistencia registran. Hospital API qhantawi chiqanchan.' },
        { title: 'CRE workflow qalltayi', desc: 'DON 5 nodi hospital API-x independientesa tapun.' },
        { title: 'BFT Consenso', desc: '5 nodinaka rimawinakamps. Maynixa llullakïxata, ukjamaxa jan mantañäkïtixa. Jan kunkachäkïti.' },
        { title: 'SubsidyVault qillqani', desc: 'Taqpach walikïxata ukhama → CRE Sepolia smart contrato-n qillqani MOM tokens luñchayi.' },
      ],
      aiTitle: "Claude AI — Kimsani Aru Yanapt'iri",
      aiSub: 'ES · Quechua · Aymara · Real tiempo',
      aiSteps: [
        { title: 'Arunktampi tapuña', desc: 'Español, quechua ukhamaraki aymarapi qillqaña ukhamaraki arsuña. IA Bolivia kimsani aruta comprenden.' },
        { title: 'Usunaka taripawi', desc: 'Kunasa siantäta willktaña → IA urgencia (critico/moderado/suave) clasifica acción nispa.' },
        { title: "Jisk'a llaki protocolo", desc: "Jisk'a llaki usu tarpaspan → automáticamente pánico botón qalltayi qayllïri hospital willataña." },
        { title: 'CRE workflow-n', desc: 'Claude qhantawinaka elegibilidad CRE Chainlink workflow-n analisa tokens jan luñchayasa.' },
      ],
      aiBadges: ['🧠 claude-haiku-4-5', '🌐 3 arunaka'],
      offlineTitle: 'Offline Modo — Jan Internet',
      offlineSub: "SMS fallback · Bolivia Jaqi Uta · Sumper lurani",
      offlineSteps: [
        { title: 'Automático taripawi', desc: 'WARMAY internet jan utjañata tarpaspan. Offline modo cambian tayka jan uñtasa.' },
        { title: 'Pánico botón → SMS', desc: "Jan internetpi: SMS jisk'a llaki GPS coordinates llak'u contactunakaru utaparu." },
        { title: 'Básico local IA', desc: "Jisk'a llaki kutinakuwinaka kimsani arupi pre-cargado. Jan remoto servidor munasa." },
        { title: 'Reconectasax sincroniza', desc: 'Offline qhantawinaka automáticamente Chainlink CRE-x sincroniza internet kutïxata.' },
      ],
      offlineBadge: 'Jan internet tarpaspan — SMS modo activo',
      offlineMiniSteps: ['GPS ubicación 30 seg ukjar waqichani', 'Básico IA utjawi (respuestas locales)', "SMS automático jisk'a llaki qalltayasa"],
      pillarsLabel: 'Nayrïr thakhikuna',
      pillarsTitle1: 'Jan Sutimp',
      pillarsTitle2: 'Seguridad — jan optio',
      pillarsSub: 'Sapa dato, sapa alerta, sapa qhantawi privacidad munasa luratäki. Taykanaka confian — jiwasanaka waqichanta.',
      pillars: [
        { title: 'Diseño privacidad', desc: 'Jan personal dato (suti, dirección, historial médico) dispositivonktampi jan uñtasa consentimientonktampi. WorldID nayaxa jaqiwa qhananchan.' },
        { title: 'Taqpach transparencia', desc: 'Uta qhantasyata qhantawinaka blockchain-n — auditor, ONG ukhamaraki gobierno quantas qhantawinaka lurataxa qhananchan jan kamachisma rikuyäpkïti.' },
        { title: 'Multicapa seguridad', desc: 'Pánico botón discreto modo (vibración silencioso), cifrada confianza red, alertas personas jan red-n kataynakaru razón jan rikuyäpkïti.' },
        { title: 'Verificable anonimato', desc: 'Utanaka "qhantawi lurataxa" nispa qillqan — jan paciente sutimp. Blockchain estadísticas anonimizadas waqichan. Cero correlación utjanapataki.' },
      ],
    },
    institucional: {
      eyebrow: '🏛️ Organizacionakapxäruxa',
      title: 'WARMAY institucionanakapxäruxa',
      sub: "Plataforma ch'amanchaña katäta. Verificable, transparente jan corrupcion blockchain + WorldID-mpi.",
      cta1: '📩 Demo mañaña',
      cta2: '📄 Informe descargaña',
      targetDescs: [
        'Verificable infraestructura taykanaka salud programanaka. Real tiempo datos jan falsificar utjïti.',
        'Verificable pública digital política. Subsidios munirinakarux chayani jan intermediarios.',
        'Jach\'a lurawi parteras, salud promotoras organizaciones comunitarias.',
        'Sapa donado peso blockchain-n trazable. Exactamente quantas taykanaka atendisista yatanki.',
      ],
      targetFeats: [
        ['Región métricas dashboard', 'SNIS Bolivia API integración', 'Blockchain reportes automáticos', 'Real tiempo auditoría'],
        ['Zero corrupción: blockchain + WorldID', 'Kimsani: ES + Quechua + Aymara', 'Offline (SMS fallback)', 'SIS SAFCI compatible'],
        ['Jan internet modo (SMS)', 'Offline qhantawinaka registro', 'Comunidad red alerta', 'IA integrado capacitación'],
        ['Onchain verificable impacto', 'Social ROI automático', 'Taqpach fondos transparencia', 'ESG/SDG Certificación'],
      ],
      impactLabel: 'Proyectado impacto',
      impactTitle2: "lurañ atipan",
      impactLabels: [
        'Cobertura zonas taykanaka wañuwi reducción',
        'Taykanaka taqpach prenatal qhantawinaka tukuyani',
        "Contactos jisk'a llaki kutimuy tiempo",
        'Fraude posible (WorldID nullifier + blockchain)',
      ],
    },
    tecnologia: {
      eyebrow: '🏆 Hackathon Submission',
      title: 'WARMAY — Técnica Arquitectura',
      subtitle: 'Chainlink CRE + WorldID + Claude AI + Vinext/Cloudflare · Categorías: CRE+IA | WorldID+CRE',
      nodes: [
        { title: 'Tayka / Beneficiaria', desc: 'Pánico botón, qhantawinaka, IA trilingüe ES/QU/AY. Offline SMS.' },
        { title: 'WorldID IDKit', desc: 'ZK Semaphore proof. Nullifier may jaqi may programa. Anti-Sybil.' },
        { title: 'Hospital API', desc: 'Verificado utanaka qhantawinaka qillqan. CRE DON consensus (5 BFT nodo) tapun.' },
        { title: 'Chainlink CRE Workflow', desc: 'Kamachini: WorldID → Hospital API (DON) → Claude AI elegibilidad → EVM nullifier leenïwi → EVM SubsidyVault qillqawi.' },
        { title: 'Claude AI (Anthropic)', desc: 'LLM-in-the-loop. Elegibilidad + kimsani consejería. Rechazasax → onchain jan qillqani.' },
        { title: 'SubsidyVault · Sepolia', desc: "CRE writeReport hapt'iynï. Nullifier qhananchan. MOM tokens transferitäki. Anónimo qhantawi qillqani." },
      ],
      checklist: [
        { title: 'CRE workflow luratäki simulable', desc: 'cre workflow simulate warmay-maternal-workflow --broadcast' },
        { title: 'Blockchain + API externa + LLM', desc: 'Sepolia EVM + Hospital API (DON BFT) + Claude AI — CRE workflow ukanïwa' },
        { title: 'WorldID + CRE (jan nativa chain)', desc: 'ZK Nullifier Sepolia CRE-mpi. Anti-Sybil MOM airdrop.' },
        { title: 'IA vinculante + kimsani consejería', desc: 'Claude AI ES/QU/AY. Rechazasax → onchain jan qillqani. Offline SMS fallback.' },
        { title: 'Verificado utanaka blockchain-n', desc: 'Inmutable checklist. ONG/Gobierno transparencia. Pacientes anonimato.' },
        { title: 'Privacidad by-design', desc: 'ZK proofs + nullifier hash + cifrado E2E + discreto modo + privada confianza red' },
        { title: 'Video 3-5 min', desc: 'Pánico botón → mapa → quechua chat → CRE simulate terminal → txHash Etherscan' },
      ],
    },
  },
};

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: 'EN',
  setLang: () => {},
  t: translations.EN,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('EN');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
