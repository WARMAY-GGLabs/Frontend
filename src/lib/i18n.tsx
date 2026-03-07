/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'EN' | 'ES' | 'QU' | 'AY';

export interface Translations {
  nav: { mission: string; app: string; howItWorks: string; institutional: string; technology: string; about: string };
  emergency: string;
  hero: { badge: string; line1: string; line2: string; line3: string };
  subtitle: string;
  langNames: [string, string, string];
  stats: { stat1: string; stat2: string; stat3: string };
  features: { badge: string; line1: string; line2: string; line3: string; cta1: string; cta2: string };
  scroll: string;
  crisis: { eyebrow: string; title1: string; title2: string; subtitle: string; cards: Array<{ name: string; desc: string }> };
  howItWorks: { badge: string; title1: string; title2: string; steps: Array<{ title: string; desc: string }> };
  orgBand: { heading: string; marquee: string };
  footer: { tagline: string; links: string[]; copyright: string };
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
