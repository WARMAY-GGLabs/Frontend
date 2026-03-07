

import { useState, useEffect, useRef } from 'react'
import {
  Home,
  Calendar,
  Map,
  Link2,
  Coins,
  Users,
  AlertTriangle,
  Baby,
  Heart,
  TrendingUp,
  CalendarDays,
  Check,
  Clock,
  Send,
  Flower2,
  Loader2,
  Fingerprint,
  ChevronRight,
  Shield,
  Globe,

  UserPlus,
  Star,
  ArrowLeft,
  X,
  Wifi,

  Building2,
  Activity,
  Zap,
} from 'lucide-react'

// ─── Screen types ─────────────────────────────────────────────────────────────
type Screen =
  | 'splash'
  | 'onboarding'
  | 'register'
  | 'pregnancy-data'
  | 'worldid-intro'
  | 'worldid-scanning'
  | 'worldid-success'
  | 'trust-network'
  | 'app-ready'
  | 'main'

type MainView = 'dashboard' | 'controles' | 'mapa' | 'blockchain' | 'tokens' | 'contactos'

// ─── Onboarding slides ────────────────────────────────────────────────────────
const ONBOARDING_SLIDES = [
  {
    icon: <Baby className="w-12 h-12 text-[#C2672A]" />,
    title: 'Tu embarazo,\nprotegido',
    subtitle:
      'WARMAY acompana cada control prenatal con inteligencia artificial y registro en blockchain.',
    accent: '#C2672A',
  },
  {
    icon: <Shield className="w-12 h-12 text-[#4F46E5]" />,
    title: 'Identidad\nanónima',
    subtitle:
      'World ID verifica que eres una persona real sin revelar ningún dato personal. Solo tú eres tú.',
    accent: '#4F46E5',
  },
  {
    icon: <Zap className="w-12 h-12 text-[#F59E0B]" />,
    title: 'Subsidios\nreales',
    subtitle:
      'Cada control verificado por Chainlink CRE genera tokens MOM. Canjéalos por medicinas, ecografías y más.',
    accent: '#F59E0B',
  },
  {
    icon: <Wifi className="w-12 h-12 text-[#15803D]" />,
    title: 'Sin internet\ntambién funciona',
    subtitle:
      'Nuestra IA puede responderte por SMS. Nunca estarás sola, aunque no tengas señal.',
    accent: '#15803D',
  },
]

// ─── Component ─────────────────────────────────────────────────────────────────
export function MobileApp() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [onboardingSlide, setOnboardingSlide] = useState(0)

  // Registration form
  const [form, setForm] = useState({ name: '', phone: '', language: 'es' })
  const [pregnancyWeeks, setPregnancyWeeks] = useState('')
  const [trustContacts, setTrustContacts] = useState([
    { name: 'Maria Lopez', role: 'Esposa', added: false },
    { name: 'Dr. Rodriguez', role: 'Medico', added: false },
  ])

  // Main app state
  const [mainView, setMainView] = useState<MainView>('dashboard')
  const [showPanicModal, setShowPanicModal] = useState(false)
  const [showClaimFlow, setShowClaimFlow] = useState<null | 'worldid' | 'cre-loading' | 'cre-success' | 'cre-veto'>(null)
  const [chatMessages, setChatMessages] = useState<Array<{type: 'ai' | 'user', text: string}>>([
      {
        type: 'ai',
      text: 'Hola Maria! Soy WARMAY IA. Estoy aqui para ayudarte en espanol, quechua o aymara. En que te ayudo hoy?',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // ── Splash auto-advance ──────────────────────────────────────────────────────
  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('onboarding'), 2200)
      return () => clearTimeout(t)
    }
  }, [screen])

  // ── World ID scanning simulation ─────────────────────────────────────────────
  useEffect(() => {
    if (screen === 'worldid-scanning') {
      const t = setTimeout(() => setScreen('worldid-success'), 2500)
      return () => clearTimeout(t)
    }
  }, [screen])

  // ── CRE loading simulation ────────────────────────────────────────────────────
  useEffect(() => {
    if (showClaimFlow === 'cre-loading') {
      const t = setTimeout(() => setShowClaimFlow('cre-success'), 3000)
      return () => clearTimeout(t)
    }
  }, [showClaimFlow])

  // ── Chat scroll ───────────────────────────────────────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    const userMsg = inputValue
    setChatMessages(prev => [...prev, { type: 'user', text: userMsg }])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      let reply = 'Entiendo tu consulta. Recuerda que siempre puedes llamar a tu medico de cabecera si tienes dudas urgentes.'
      const lc = userMsg.toLowerCase()
      if (lc.includes('dolor') || lc.includes('sangr'))
        reply = 'ATENCION: Los sintomas que describes pueden requerir atencion inmediata. Presiona el boton SOS rojo para alertar a emergencias y tu red de confianza.'
      else if (lc.includes('token') || lc.includes('mom'))
        reply = 'Tienes 320 tokens MOM disponibles. Ve a "Controles" y presiona "Reclamar Subsidio" en cualquier control completado para iniciar el proceso con World ID y Chainlink CRE.'
      else if (lc.includes('control') || lc.includes('cita'))
        reply = 'Tu proximo control esta programado para el 28 de Marzo en el Hospital de la Mujer. Recuerda que cada control verificado te da 20 tokens MOM + bonus CRE.'
      else if (lc.includes('quechua') || lc.includes('aymara'))
        reply = 'Hablamos los tres idiomas. Puedes escribirme en espanol, quechua o aymara. Allinllachu!'

      setChatMessages(prev => [...prev, { type: 'ai', text: reply }])
      setIsTyping(false)
    }, 1200)
  }

  // ─── SCREENS ─────────────────────────────────────────────────────────────────

  // ── 1. Splash ─────────────────────────────────────────────────────────────────
  if (screen === 'splash') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#100300] relative overflow-hidden">
        {/* Wiphala bar top */}
        <WiphalaBar mt="mt-0" />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#C2672A] to-[#DC2626] flex items-center justify-center shadow-[0_0_40px_rgba(194,103,42,0.5)] animate-pulse">
            <Flower2 className="w-10 h-10 text-white" />
          </div>
          <div className="text-center">
            <div className="font-serif font-black text-4xl text-[#FDF6EC] tracking-tight">WARMAY</div>
            <div className="text-[11px] text-[#9A6040] font-mono tracking-[0.2em] mt-1">SALUD MATERNA · BOLIVIA</div>
          </div>
          <div className="flex gap-1.5 mt-4">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#C2672A]"
                style={{ animationDelay: `${i * 0.2}s`, animation: 'pulse 1s infinite' }}
              />
            ))}
          </div>
        </div>
        <div className="pb-10 text-[9px] text-[#5C3018] text-center font-mono">v1.0.0 · Testnet Sepolia</div>
      </div>
    )
  }

  // ── 2. Onboarding slides ───────────────────────────────────────────────────────
  if (screen === 'onboarding') {
    const slide = ONBOARDING_SLIDES[onboardingSlide]
    const isLast = onboardingSlide === ONBOARDING_SLIDES.length - 1
    return (
      <div className="h-full flex flex-col bg-[#100300]">
        <WiphalaBar />
        {/* Skip */}
        <div className="flex justify-end px-4 pt-3">
          <button
            onClick={() => setScreen('register')}
            className="text-[10px] text-[#9A6040] px-2 py-1 rounded hover:text-[#E8C9A0] transition-colors"
          >
            Omitir
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center"
            style={{ background: `${slide.accent}18`, border: `1px solid ${slide.accent}40` }}
          >
            {slide.icon}
          </div>
          <div>
            <h2 className="font-serif font-black text-2xl text-[#FDF6EC] leading-tight whitespace-pre-line text-balance">
              {slide.title}
            </h2>
            <p className="text-[11px] text-[#B8915A] leading-relaxed mt-3 text-pretty">
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* Dots + CTA */}
        <div className="px-6 pb-8 space-y-4">
          <div className="flex justify-center gap-2">
            {ONBOARDING_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setOnboardingSlide(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === onboardingSlide ? 20 : 8,
                  height: 8,
                  background: i === onboardingSlide ? slide.accent : '#5C3018',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => {
              if (isLast) setScreen('register')
              else setOnboardingSlide(p => p + 1)
            }}
            className="w-full py-3 rounded-xl font-bold text-[12px] text-white flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{ background: slide.accent }}
          >
            {isLast ? 'Comenzar ahora' : 'Siguiente'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // ── 3. Register ────────────────────────────────────────────────────────────────
  if (screen === 'register') {
    return (
      <div className="h-full flex flex-col bg-[#100300]">
        <WiphalaBar />
        <div className="px-4 pt-4 pb-2">
          <div className="text-[10px] font-mono text-[#C2672A] tracking-widest uppercase">Paso 1 de 4</div>
          <h2 className="font-serif font-black text-xl text-[#FDF6EC] mt-1">Crea tu perfil</h2>
          <p className="text-[10px] text-[#9A6040] mt-0.5">Solo pedimos lo necesario. Ningun dato se comparte.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <InputField
            label="Nombre completo"
            placeholder="Ej. Maria Quispe"
            value={form.name}
            onChange={v => setForm(f => ({ ...f, name: v }))}
          />
          <InputField
            label="Celular (WhatsApp / SMS)"
            placeholder="+591 7XXXXXXX"
            type="tel"
            value={form.phone}
            onChange={v => setForm(f => ({ ...f, phone: v }))}
          />
          <div>
            <div className="text-[10px] text-[#E8C9A0] mb-1.5 font-semibold">Idioma preferido</div>
            <div className="grid grid-cols-3 gap-2">
              {(['es', 'qu', 'ay'] as const).map(lang => {
                const labels = { es: 'Espanol', qu: 'Quechua', ay: 'Aymara' }
                return (
                  <button
                    key={lang}
                    onClick={() => setForm(f => ({ ...f, language: lang }))}
                    className="py-2 rounded-xl text-[10px] font-bold border transition-all"
                    style={{
                      background: form.language === lang ? '#C2672A' : 'rgba(39,18,5,0.85)',
                      borderColor: form.language === lang ? '#C2672A' : '#5C3018',
                      color: form.language === lang ? 'white' : '#9A6040',
                    }}
                  >
                    {labels[lang]}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-[rgba(39,18,5,0.6)] border border-[#5C3018] rounded-xl p-3">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-[#C2672A] shrink-0 mt-0.5" />
              <p className="text-[9px] text-[#9A6040] leading-relaxed">
                Tus datos se almacenan en Ethereum Sepolia de forma anonima. Nunca compartimos tu identidad con terceros.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-8">
          <button
            onClick={() => setScreen('pregnancy-data')}
            disabled={!form.name || !form.phone}
            className="w-full py-3 rounded-xl font-bold text-[12px] text-white bg-[#C2672A] flex items-center justify-center gap-2 disabled:opacity-40 active:scale-95 transition-all"
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // ── 4. Pregnancy data ─────────────────────────────────────────────────────────
  if (screen === 'pregnancy-data') {
    const weekNum = parseInt(pregnancyWeeks) || 0
    return (
      <div className="h-full flex flex-col bg-[#100300]">
        <WiphalaBar />
        <div className="px-4 pt-4 pb-2">
          <button onClick={() => setScreen('register')} className="flex items-center gap-1 text-[10px] text-[#9A6040] mb-2">
            <ArrowLeft className="w-3 h-3" /> Volver
          </button>
          <div className="text-[10px] font-mono text-[#C2672A] tracking-widest uppercase">Paso 2 de 4</div>
          <h2 className="font-serif font-black text-xl text-[#FDF6EC] mt-1">Datos del embarazo</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Week selector */}
          <div>
            <div className="text-[10px] text-[#E8C9A0] mb-2 font-semibold">Semanas de gestacion</div>
            <div className="flex items-center gap-3">
              <input
                type="range" min="4" max="40" value={pregnancyWeeks || 20}
                onChange={e => setPregnancyWeeks(e.target.value)}
                className="flex-1 accent-[#C2672A]"
              />
              <div className="w-14 text-center py-1.5 bg-[rgba(39,18,5,0.85)] border border-[#5C3018] rounded-lg text-[#C2672A] font-bold text-sm">
                {pregnancyWeeks || 20} sem
              </div>
            </div>
          </div>

          {/* Trimester indicator */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '1er Trimestre', range: '4–13 sem', active: weekNum > 0 && weekNum <= 13 },
              { label: '2do Trimestre', range: '14–26 sem', active: weekNum >= 14 && weekNum <= 26 },
              { label: '3er Trimestre', range: '27–40 sem', active: weekNum >= 27 },
            ].map(t => (
              <div
                key={t.label}
                className="rounded-xl p-2 text-center border"
                style={{
                  background: t.active ? 'rgba(194,103,42,0.15)' : 'rgba(39,18,5,0.5)',
                  borderColor: t.active ? '#C2672A' : '#5C3018',
                }}
              >
                <div className="text-[8px] font-bold" style={{ color: t.active ? '#C2672A' : '#9A6040' }}>{t.label}</div>
                <div className="text-[7px] text-[#5C3018] mt-0.5">{t.range}</div>
              </div>
            ))}
          </div>

          {/* Hospital */}
          <div>
            <div className="text-[10px] text-[#E8C9A0] mb-1.5 font-semibold">Centro de salud asignado</div>
            <div className="space-y-2">
              {['Hospital de la Mujer', 'Hospital Municipal Bolivia', 'Centro de Salud Cotahuma'].map(h => (
                <button key={h} className="w-full flex items-center gap-2.5 p-2.5 bg-[rgba(39,18,5,0.85)] border border-[#5C3018] rounded-xl text-left hover:border-[#C2672A] transition-colors group">
                  <Building2 className="w-4 h-4 text-[#9A6040] group-hover:text-[#C2672A]" />
                  <span className="text-[10px] text-[#E8C9A0]">{h}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-8">
          <button
            onClick={() => setScreen('worldid-intro')}
            className="w-full py-3 rounded-xl font-bold text-[12px] text-white bg-[#C2672A] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // ── 5. World ID intro ─────────────────────────────────────────────────────────
  if (screen === 'worldid-intro') {
    return (
      <div className="h-full flex flex-col bg-[#100300]">
        <WiphalaBar />
        <div className="px-4 pt-4 pb-2">
          <button onClick={() => setScreen('pregnancy-data')} className="flex items-center gap-1 text-[10px] text-[#9A6040] mb-2">
            <ArrowLeft className="w-3 h-3" /> Volver
          </button>
          <div className="text-[10px] font-mono text-[#4F46E5] tracking-widest uppercase">Paso 3 de 4</div>
          <h2 className="font-serif font-black text-xl text-[#FDF6EC] mt-1">Verificacion de identidad</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* World ID hero */}
          <div className="bg-linear-to-br from-[rgba(79,70,229,0.15)] to-[rgba(124,58,237,0.1)] border border-[#4F46E5]/40 rounded-2xl p-5 text-center">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center mx-auto mb-3">
              <Fingerprint className="w-8 h-8 text-white" />
            </div>
            <div className="font-bold text-[#FDF6EC] text-sm mb-1">World ID</div>
            <p className="text-[10px] text-[#9A6040] leading-relaxed">
              Verificamos que eres una persona real y unica mediante Zero-Knowledge Proofs. Sin datos personales, sin nombre, sin carnet.
            </p>
          </div>

          {/* Why needed */}
          <div className="space-y-2">
            <div className="text-[10px] text-[#E8C9A0] font-semibold">Por que lo necesitamos</div>
            {[
              { icon: <Shield className="w-3.5 h-3.5 text-[#4F46E5]" />, text: 'Garantiza que cada subsidio llega a una persona real, no a bots' },
              { icon: <Check className="w-3.5 h-3.5 text-[#15803D]" />, text: 'Una sola verificacion por persona, evita doble cobro' },
              { icon: <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />, text: 'Tu identidad permanece completamente anonima en blockchain' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 bg-[rgba(39,18,5,0.6)] rounded-xl border border-[#5C3018]">
                {item.icon}
                <span className="text-[9px] text-[#B8915A] leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <div className="text-[10px] text-[#E8C9A0] font-semibold">Pasos</div>
            <div className="space-y-1.5">
              {[
                'La app abre el widget de World ID',
                'Tu telefono verifica tu iris de forma local',
                'Se genera un ZK Proof anonimo',
                'Listo! Tu identidad queda verificada',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-linear-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[9px] text-[#9A6040]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-8 space-y-2">
          <button
            onClick={() => setScreen('worldid-scanning')}
            className="w-full py-3 rounded-xl font-bold text-[12px] text-white bg-linear-to-r from-[#4F46E5] to-[#7C3AED] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Fingerprint className="w-4 h-4" />
            Verificar con World ID
          </button>
          <button
            onClick={() => setScreen('trust-network')}
            className="w-full py-2 rounded-xl text-[10px] text-[#9A6040] border border-[#5C3018] bg-transparent"
          >
            Omitir por ahora
          </button>
        </div>
      </div>
    )
  }

  // ── 6. World ID scanning (Iris simulation) ─────────────────────────────────────
  if (screen === 'worldid-scanning') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#0A0018] gap-6 px-6">
        {/* Realistic Iris Scanner */}
        <div className="relative flex items-center justify-center">
          {/* Outer scanning ring */}
          <div className="absolute w-44 h-44 rounded-full border border-[#4F46E5]/20" />
          <div 
            className="absolute w-44 h-44 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: '#7C3AED',
              borderRightColor: '#4F46E5',
              animation: 'spin 1.5s linear infinite',
            }}
          />
          
          {/* Middle ring */}
          <div className="absolute w-36 h-36 rounded-full border border-[#7C3AED]/30" />
          
          {/* Eye/Iris container */}
          <div className="relative w-28 h-28 rounded-full bg-linear-to-br from-[#1a1030] to-[#0d0820] border-2 border-[#4F46E5]/40 overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.3)]">
            {/* Sclera (white of eye) */}
            <div className="absolute w-24 h-24 rounded-full bg-linear-to-br from-[#f5f5f0] to-[#e8e8e0]" />
            
            {/* Iris */}
            <div className="absolute w-16 h-16 rounded-full bg-linear-to-br from-[#3a2510] via-[#5a3a1a] to-[#2a1a08] border-2 border-[#1a0a00]/30 shadow-inner">
              {/* Iris texture rings */}
              <div className="absolute inset-1 rounded-full border border-[#6a4a2a]/30" />
              <div className="absolute inset-2 rounded-full border border-[#5a3a1a]/20" />
              <div className="absolute inset-3 rounded-full border border-[#4a2a10]/20" />
              
              {/* Iris radial lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[1px] h-6 bg-linear-to-b from-[#7a5a3a]/40 to-transparent left-1/2 top-1"
                  style={{ transform: `translateX(-50%) rotate(${i * 30}deg)`, transformOrigin: 'center 28px' }}
                />
              ))}
            </div>
            
            {/* Pupil */}
            <div 
              className="absolute w-6 h-6 rounded-full bg-[#0a0500] shadow-inner"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            >
              {/* Light reflection */}
              <div className="absolute w-2 h-2 rounded-full bg-white/60 top-1 left-1" />
              <div className="absolute w-1 h-1 rounded-full bg-white/40 bottom-1.5 right-1.5" />
            </div>
            
            {/* Scanning laser line */}
            <div 
              className="absolute w-full h-[2px] bg-linear-to-r from-transparent via-[#4F46E5] to-transparent"
              style={{ animation: 'scanLine 1.5s ease-in-out infinite' }}
            />
          </div>
          
          {/* Corner brackets */}
          <div className="absolute w-32 h-32">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#4F46E5] rounded-tl" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#4F46E5] rounded-tr" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#4F46E5] rounded-bl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#4F46E5] rounded-br" />
          </div>
        </div>
        
        {/* Status text */}
        <div className="text-center space-y-2">
          <div className="font-bold text-[#FDF6EC] text-sm flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#4F46E5]" />
            Escaneando iris...
          </div>
          <div className="text-[10px] text-[#7C3AED]">Generando Zero-Knowledge Proof</div>
          <div className="text-[9px] text-[#5C3018]">Ningun dato biometrico sale de tu dispositivo</div>
        </div>
        
        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-[#1a1030] rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-[#4F46E5] to-[#7C3AED] rounded-full"
            style={{ animation: 'progressBar 2.5s ease-out forwards' }}
          />
        </div>
        
        {/* Add keyframes */}
        <style>{`
          @keyframes scanLine {
            0%, 100% { transform: translateY(-50px); opacity: 0; }
            50% { transform: translateY(50px); opacity: 1; }
          }
          @keyframes progressBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // ── 7. World ID success ────────────────────────────────────────────────────────
  if (screen === 'worldid-success') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#100300] gap-6 px-6 text-center">
        <WiphalaBar />
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#15803D] to-[#4ADE80] flex items-center justify-center shadow-[0_0_30px_rgba(74,222,128,0.3)]">
          <Check className="w-10 h-10 text-white" />
        </div>
        <div>
          <div className="font-serif font-black text-2xl text-[#FDF6EC]">Verificada!</div>
          <div className="text-[11px] text-[#4ADE80] mt-1">Identidad confirmada con World ID</div>
        </div>
        <div className="bg-[rgba(21,128,61,0.1)] border border-[rgba(21,128,61,0.3)] rounded-2xl p-4 w-full space-y-2">
          {[
            'ZK Proof generado correctamente',
            'Nullifier hash registrado',
            'Sin datos personales expuestos',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[9px] text-[#4ADE80]">
              <Check className="w-3 h-3 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <div className="w-full space-y-2">
          <button
            onClick={() => setScreen('trust-network')}
            className="w-full py-3 rounded-xl font-bold text-[12px] text-white bg-[#C2672A] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // ── 8. Trust network setup ────────────────────────────────────────────────────
  if (screen === 'trust-network') {
    return (
      <div className="h-full flex flex-col bg-[#100300]">
        <WiphalaBar />
        <div className="px-4 pt-4 pb-2">
          <div className="text-[10px] font-mono text-[#F59E0B] tracking-widest uppercase">Paso 4 de 4</div>
          <h2 className="font-serif font-black text-xl text-[#FDF6EC] mt-1">Red de confianza</h2>
          <p className="text-[10px] text-[#9A6040] mt-0.5">Estas personas seran alertadas si presionas SOS.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <div className="space-y-2">
            {trustContacts.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[rgba(39,18,5,0.85)] border border-[#5C3018] rounded-xl">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#C2672A] to-[#8B3A10] flex items-center justify-center text-white font-bold text-[11px]">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-[#FDF6EC]">{c.name}</div>
                  <div className="text-[8px] text-[#9A6040]">{c.role}</div>
                </div>
                <button
                  onClick={() => setTrustContacts(prev => prev.map((tc, j) => j === i ? { ...tc, added: !tc.added } : tc))}
                  className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold border transition-all"
                  style={{
                    background: c.added ? 'rgba(21,128,61,0.15)' : 'rgba(39,18,5,0.5)',
                    borderColor: c.added ? '#15803D' : '#5C3018',
                    color: c.added ? '#4ADE80' : '#9A6040',
                  }}
                >
                  {c.added ? 'Agregado' : 'Agregar'}
                </button>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#5C3018] rounded-xl text-[10px] text-[#9A6040] hover:border-[#C2672A] transition-colors">
            <UserPlus className="w-3.5 h-3.5" />
            Agregar otro contacto
          </button>

          <div className="bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <p className="text-[9px] text-[#9A6040] leading-relaxed">
                En caso de emergencia, todos los contactos de tu red recibiran un SMS con tu ubicacion GPS en tiempo real.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-8 space-y-2">
          <button
            onClick={() => setScreen('app-ready')}
            className="w-full py-3 rounded-xl font-bold text-[12px] text-white bg-[#C2672A] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Finalizar configuracion
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // ── 9. App ready ──────────────────────────────────────────────────────────────
  if (screen === 'app-ready') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#100300] gap-6 px-6 text-center">
        <WiphalaBar />
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#C2672A] to-[#DC2626] flex items-center justify-center shadow-[0_0_40px_rgba(194,103,42,0.4)]">
          <Star className="w-10 h-10 text-white" />
        </div>
        <div>
          <div className="font-serif font-black text-2xl text-[#FDF6EC]">Todo listo, Maria!</div>
          <div className="text-[11px] text-[#C2672A] mt-1">Bienvenida a WARMAY</div>
        </div>
        <div className="w-full space-y-2 text-left">
          {[
            { icon: <Baby className="w-3.5 h-3.5 text-[#C2672A]" />, text: 'Perfil creado — Semana 24' },
            { icon: <Fingerprint className="w-3.5 h-3.5 text-[#4F46E5]" />, text: 'Identidad verificada con World ID' },
            { icon: <Users className="w-3.5 h-3.5 text-[#F59E0B]" />, text: 'Red de confianza configurada' },
            { icon: <Coins className="w-3.5 h-3.5 text-[#4ADE80]" />, text: '320 tokens MOM disponibles' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 p-2.5 bg-[rgba(39,18,5,0.7)] border border-[#5C3018] rounded-xl">
              {item.icon}
              <span className="text-[10px] text-[#E8C9A0]">{item.text}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setScreen('main')}
          className="w-full py-3 rounded-xl font-bold text-[13px] text-white bg-linear-to-r from-[#C2672A] to-[#8B3A10] active:scale-95 transition-all"
        >
          Abrir WARMAY
        </button>
      </div>
    )
  }

  // ── 10. MAIN APP ──────────────────────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col bg-[#1A0800] text-[#FDF6EC] font-sans text-[11px]">
      <WiphalaBar mt="mt-[38px]" />

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[rgba(15,5,0,0.95)] border-b border-[#5C3018] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#C2672A] to-[#DC2626] flex items-center justify-center">
            <Flower2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-xs text-[#FDF6EC]">WARMAY</div>
            <div className="text-[8px] text-[#4ADE80] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] inline-block" />
              En linea · GPS activo
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowPanicModal(true)}
          className="px-2.5 py-1.5 rounded-md bg-[#DC2626] text-white text-[9px] font-bold flex items-center gap-1 animate-pulse"
        >
          <AlertTriangle className="w-3 h-3" /> SOS
        </button>
      </div>

      {/* Content - hide scrollbar */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {mainView === 'dashboard' && <ViewDashboard setShowClaimFlow={setShowClaimFlow} chatMessages={chatMessages} isTyping={isTyping} inputValue={inputValue} setInputValue={setInputValue} handleSendMessage={handleSendMessage} chatEndRef={chatEndRef} />}
        {mainView === 'controles' && <ViewControles setShowClaimFlow={setShowClaimFlow} />}
        {mainView === 'mapa' && <ViewMapa />}
        {mainView === 'blockchain' && <ViewBlockchain />}
        {mainView === 'tokens' && <ViewTokens setShowClaimFlow={setShowClaimFlow} />}
        {mainView === 'contactos' && <ViewContactos />}
      </div>

      {/* Bottom Nav */}
      <div className="shrink-0 flex items-center justify-around px-2 py-2 bg-[rgba(15,5,0,0.98)] border-t border-[#5C3018] pb-6">
        <NavItem icon={<Home className="w-4 h-4" />} label="Inicio" active={mainView === 'dashboard'} onClick={() => setMainView('dashboard')} />
        <NavItem icon={<Calendar className="w-4 h-4" />} label="Controles" active={mainView === 'controles'} onClick={() => setMainView('controles')} badge="6" />
        <NavItem icon={<Map className="w-4 h-4" />} label="Mapa" active={mainView === 'mapa'} onClick={() => setMainView('mapa')} />
        <NavItem icon={<Link2 className="w-4 h-4" />} label="Chain" active={mainView === 'blockchain'} onClick={() => setMainView('blockchain')} />
        <NavItem icon={<Coins className="w-4 h-4" />} label="Tokens" active={mainView === 'tokens'} onClick={() => setMainView('tokens')} />
        <NavItem icon={<Users className="w-4 h-4" />} label="Red" active={mainView === 'contactos'} onClick={() => setMainView('contactos')} />
      </div>

      {/* ── Modals ── */}

      {/* Panic */}
      {showPanicModal && (
        <Modal onClose={() => setShowPanicModal(false)}>
          <div className="bg-linear-to-r from-[#DC2626] to-[#991B1B] p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-white mx-auto mb-1" />
            <div className="font-bold text-white text-sm">ALERTA DE EMERGENCIA</div>
            <div className="text-[10px] text-white/70">Tu ubicacion ha sido compartida</div>
          </div>
          <div className="p-4 space-y-3">
            <div className="space-y-2">
              <HospitalItem name="Hospital de la Mujer" distance="2.3 km" status="Ambulancia en camino" />
              <HospitalItem name="Clinica Boliviana" distance="3.1 km" status="Preparada" />
            </div>
            <div className="bg-[rgba(21,128,61,0.15)] border border-[rgba(21,128,61,0.3)] rounded-lg p-2.5 space-y-1">
              {['Ambulancia en camino', 'Red de confianza notificada (2)', 'Evento registrado en blockchain'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-[9px] text-[#4ADE80]">
                  <Check className="w-3 h-3" /> {t}
                </div>
              ))}
            </div>
            <button onClick={() => setShowPanicModal(false)} className="w-full py-2 rounded-lg bg-[#3D1E0A] text-[#9A6040] text-[10px]">
              Cerrar
            </button>
          </div>
        </Modal>
      )}

      {/* Claim: World ID widget */}
      {showClaimFlow === 'worldid' && (
        <Modal onClose={() => setShowClaimFlow(null)}>
          <div className="bg-linear-to-r from-[#4F46E5] to-[#7C3AED] p-4 text-center">
            <Fingerprint className="w-8 h-8 text-white mx-auto mb-1" />
            <div className="font-bold text-white text-sm">World ID · Verificar</div>
            <div className="text-[10px] text-white/70">Reclamar Subsidio — Control Sem 24</div>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-[10px] text-[#E8C9A0] text-center leading-relaxed">
              Para reclamar este subsidio necesitamos confirmar que eres una persona real unica. Sin nombre, sin carnet.
            </p>
            <div className="space-y-1.5">
              {['Sin datos personales compartidos', 'Resistente a bots y fraude', 'Una verificacion por persona'].map(t => (
                <div key={t} className="flex items-center gap-2 text-[9px] text-[#4ADE80]">
                  <Check className="w-3 h-3" /> {t}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowClaimFlow('cre-loading')}
              className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold text-[11px] flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-4 h-4" /> Verificar con World App
            </button>
            <button onClick={() => setShowClaimFlow(null)} className="w-full py-2 rounded-lg border border-[#5C3018] text-[#9A6040] text-[10px]">
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {/* Claim: CRE loading */}
      {showClaimFlow === 'cre-loading' && (
        <Modal>
          <div className="p-6 text-center space-y-5">
            <div className="relative flex items-center justify-center mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-[#F59E0B]/20 animate-ping" />
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#F59E0B]/20 to-[#C2672A]/20 border border-[#F59E0B]/40 flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-[#F59E0B] animate-spin" />
              </div>
            </div>
            <div>
              <div className="font-bold text-[#FDF6EC] text-sm">Chainlink CRE verificando...</div>
              <div className="text-[10px] text-[#9A6040] mt-1">Los 5 nodos descentralizados estan trabajando</div>
            </div>
            <div className="text-left space-y-2">
              {[
                { label: 'Consultando API hospital', done: true },
                { label: 'Claude AI revisando historial', done: true },
                { label: 'Consenso de 5 nodos CRE', done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px]">
                  {step.done
                    ? <Check className="w-3 h-3 text-[#4ADE80] shrink-0" />
                    : <Loader2 className="w-3 h-3 text-[#F59E0B] animate-spin shrink-0" />}
                  <span style={{ color: step.done ? '#4ADE80' : '#9A6040' }}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Claim: CRE success */}
      {showClaimFlow === 'cre-success' && (
        <Modal onClose={() => setShowClaimFlow(null)}>
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="font-serif font-black text-2xl text-[#F59E0B]">+20 MOM</div>
              <div className="text-[11px] text-[#4ADE80] font-bold mt-0.5">Chainlink CRE: Aprobado</div>
              <div className="text-[10px] text-[#9A6040] mt-1">Control Sem 24 verificado por 5 nodos</div>
            </div>
            <div className="bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-xl p-3 text-left space-y-1.5">
              {[
                { label: 'Verificacion hospital', badge: 'OK', col: '#4ADE80' },
                { label: 'Auditoria Claude AI', badge: 'OK', col: '#4ADE80' },
                { label: 'Consenso blockchain', badge: '5/5', col: '#F59E0B' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between text-[9px]">
                  <span className="text-[#B8915A]">{r.label}</span>
                  <span className="font-bold px-1.5 py-0.5 rounded text-[8px]" style={{ color: r.col, background: `${r.col}15` }}>{r.badge}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowClaimFlow(null)} className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#F59E0B] to-[#D97706] text-[#1A0800] font-bold text-[11px]">
              Genial, gracias!
            </button>
          </div>
        </Modal>
      )}

      {/* Claim: CRE veto */}
      {showClaimFlow === 'cre-veto' && (
        <Modal onClose={() => setShowClaimFlow(null)}>
          <div className="bg-linear-to-r from-[#DC2626] to-[#991B1B] p-4 text-center">
            <AlertTriangle className="w-7 h-7 text-white mx-auto mb-1" />
            <div className="font-bold text-white text-sm">Reclamo pausado</div>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-[10px] text-[#E8C9A0] leading-relaxed text-center">
              El asistente de IA ha detectado una anomalia (presion arterial elevada) que requiere atencion prioritaria.
            </p>
            <div className="bg-[rgba(220,38,38,0.1)] border border-[rgba(220,38,38,0.3)] rounded-xl p-3 text-[9px] text-[#DC2626]">
              Acude al hospital inmediatamente o presiona SOS.
            </div>
            <button onClick={() => setShowPanicModal(true)} className="w-full py-2.5 rounded-xl bg-[#DC2626] text-white font-bold text-[11px] flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Activar SOS
            </button>
            <button onClick={() => setShowClaimFlow(null)} className="w-full py-2 rounded-lg border border-[#5C3018] text-[#9A6040] text-[10px]">
              Entendido
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Sub-views ────────────────────────────────────────────────────────────────

function ViewDashboard({
  setShowClaimFlow,
  chatMessages,
  isTyping,
  inputValue,
  setInputValue,
  handleSendMessage,
  chatEndRef,
}: {
  setShowClaimFlow: (v: null | 'worldid' | 'cre-loading' | 'cre-success' | 'cre-veto') => void;
  chatMessages: { type: 'ai' | 'user'; text: string }[]
  isTyping: boolean
  inputValue: string
  setInputValue: (v: string) => void
  handleSendMessage: () => void
  chatEndRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="p-3 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <StatCard icon={<Baby className="w-5 h-5" />} label="Semana" value="24" />
        <StatCard icon={<Heart className="w-5 h-5" />} label="Presion" value="120/80" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Riesgo" value="BAJO" valueColor="text-[#4ADE80]" />
        <StatCard icon={<CalendarDays className="w-5 h-5" />} label="Cita" value="28 Mar" />
      </div>

      {/* Next control */}
      <div className="bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)] rounded-xl p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[9px] text-[#9A6040]">Proximo control</div>
            <div className="font-bold text-[11px] text-[#FDF6EC]">Control de presion — Sem 24</div>
            <div className="text-[9px] text-[#F59E0B]">28 Mar · Hospital de la Mujer</div>
          </div>
          <Activity className="w-6 h-6 text-[#F59E0B]" />
        </div>
      </div>

      {/* Tokens */}
      <div className="bg-linear-to-br from-[rgba(245,158,11,0.1)] to-[rgba(194,103,42,0.08)] rounded-xl p-3 border border-[#F59E0B]/30">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-[#F59E0B]" />
            <span className="font-bold text-[#FDF6EC] text-[11px]">Tokens MOM</span>
          </div>
          <span className="text-[8px] text-[#9A6040] bg-[rgba(39,18,5,0.6)] px-1.5 py-0.5 rounded border border-[#5C3018]">World ID</span>
        </div>
        <div className="text-2xl font-bold text-[#F59E0B] mb-0.5">320 MOM</div>
        <div className="text-[9px] text-[#9A6040] mb-2">6 controles verificados · Chainlink CRE</div>
        <button
          onClick={() => setShowClaimFlow('worldid')}
          className="w-full py-2 rounded-lg bg-linear-to-r from-[#C2672A] to-[#8B3A10] text-white text-[10px] font-bold"
        >
          Reclamar Subsidio
        </button>
      </div>

      {/* AI Chat */}
      <div className="bg-[rgba(39,18,5,0.85)] rounded-xl p-3 border border-[#5C3018]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-[9px] font-bold text-[#1A0800]">AI</div>
          <div>
            <div className="font-bold text-[10px] text-[#FDF6EC]">WARMAY IA</div>
            <div className="text-[8px] text-[#4ADE80]">En linea · Claude AI</div>
          </div>
        </div>
        <div className="h-[90px] overflow-y-auto space-y-1.5 mb-2 bg-[rgba(26,8,0,0.5)] rounded-lg p-2">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`px-2 py-1.5 rounded text-[9px] leading-relaxed max-w-[88%] ${
                msg.type === 'user'
                  ? 'ml-auto bg-linear-to-r from-[#C2672A] to-[#8B3A10] text-white'
                  : 'bg-[#3D1E0A] text-[#FDF6EC] border border-[#5C3018]'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="bg-[#3D1E0A] border border-[#5C3018] px-2 py-1.5 rounded max-w-[40%] flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#9A6040]" style={{ animation: `pulse 1s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu consulta..."
            className="flex-1 bg-[#3D1E0A] border border-[#5C3018] rounded px-2 py-1.5 text-[9px] text-[#FDF6EC] placeholder-[#9A6040] focus:outline-none focus:border-[#C2672A]"
          />
          <button onClick={handleSendMessage} className="p-1.5 rounded bg-linear-to-r from-[#F59E0B] to-[#D97706] text-[#1A0800]">
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ViewControles({ setShowClaimFlow }: { setShowClaimFlow: (v: null | 'worldid' | 'cre-loading' | 'cre-success' | 'cre-veto') => void }) {
  const controls = [
    { title: 'Primera visita', week: 'Sem 8', done: true, tokens: 20, txHash: '0x6346...9e6f' },
    { title: 'Ecografia I', week: 'Sem 12', done: true, tokens: 20, txHash: '0x8a12...b3c4' },
    { title: 'Analisis de sangre', week: 'Sem 16', done: true, tokens: 20, txHash: '0xc78d...4f21' },
    { title: 'Ecografia II', week: 'Sem 20', done: true, tokens: 20, txHash: '0x1d4e...8c90' },
    { title: 'Control de presion', week: 'Sem 24', done: false, claimable: true },
    { title: 'Ecografia III', week: 'Sem 32', done: false },
  ]
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-[#FDF6EC] text-[11px]">Mis Controles Prenatales</span>
        <span className="text-[#F59E0B] text-[10px] font-bold">6 / 12</span>
      </div>
      {controls.map((c, i) => (
        <div key={i} className="bg-[rgba(39,18,5,0.85)] rounded-xl p-3 border border-[#5C3018]">
          <div className="flex items-start gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${c.done ? 'bg-[#15803D]' : 'bg-[#3D1E0A] border border-[#5C3018]'}`}>
              {c.done ? <Check className="w-3.5 h-3.5 text-white" /> : <Clock className="w-3.5 h-3.5 text-[#9A6040]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <div className="text-[10px] font-bold text-[#FDF6EC]">{c.title}</div>
                <div className="text-[8px] text-[#9A6040] shrink-0">{c.week}</div>
              </div>
              {c.done && (
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-[7px] px-1.5 py-0.5 rounded bg-[rgba(21,128,61,0.2)] text-[#4ADE80] border border-[rgba(21,128,61,0.3)]">Hospital</span>
                  <span className="text-[7px] px-1.5 py-0.5 rounded bg-[rgba(79,70,229,0.2)] text-[#818CF8] border border-[rgba(79,70,229,0.3)]">IA Auditado</span>
                  <span className="text-[7px] px-1.5 py-0.5 rounded bg-[rgba(245,158,11,0.2)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]">CRE</span>
                  <span className="text-[7px] text-[#F59E0B] font-bold ml-auto">+{c.tokens} MOM</span>
                </div>
              )}
              {c.done && c.txHash && (
                <div className="text-[7px] text-[#5C3018] font-mono mt-0.5">{c.txHash}</div>
              )}
              {('claimable' in c && c.claimable) && (
                <button
                  onClick={() => setShowClaimFlow('worldid')}
                  className="mt-2 w-full py-1.5 rounded-lg bg-linear-to-r from-[#4F46E5] to-[#7C3AED] text-white text-[9px] font-bold flex items-center justify-center gap-1.5"
                >
                  <Fingerprint className="w-3 h-3" /> Reclamar Subsidio
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ViewMapa() {
  const hospitals = [
    { name: 'Hospital de la Mujer', distance: '2.3 km', available: true, beds: 4 },
    { name: 'Hospital Municipal', distance: '3.8 km', available: true, beds: 2 },
    { name: 'Clinica Boliviana', distance: '5.1 km', available: false, beds: 0 },
  ]
  return (
    <div className="p-3 space-y-3">
      <div className="bg-[rgba(21,128,61,0.08)] border border-[rgba(21,128,61,0.2)] rounded-xl p-2.5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
        <span className="text-[9px] text-[#4ADE80]">GPS activo · La Paz, Bolivia</span>
      </div>
      {/* Fake map */}
      <div className="bg-[#1A0D00] rounded-xl overflow-hidden border border-[#5C3018] h-[120px] relative">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(#5C3018 1px, transparent 1px), linear-gradient(90deg, #5C3018 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-[#DC2626] border-2 border-white shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
            <div className="absolute -top-0.5 -left-0.5 w-5 h-5 rounded-full border-2 border-[#DC2626] animate-ping" />
          </div>
        </div>
        {hospitals.map((_h, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-[#4ADE80] border border-white shadow-sm"
            style={{ top: `${20 + i * 30}%`, left: `${25 + i * 20}%` }}
          />
        ))}
        <div className="absolute bottom-2 right-2 text-[7px] text-[#5C3018] font-mono">La Paz · Bolivia</div>
      </div>
      <div className="space-y-2">
        <div className="text-[10px] font-bold text-[#FDF6EC]">Hospitales cercanos</div>
        {hospitals.map(h => (
          <div key={h.name} className="flex items-center gap-2.5 p-2.5 bg-[rgba(39,18,5,0.85)] rounded-xl border border-[#5C3018]">
            <Building2 className="w-5 h-5 text-[#C2672A] shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] font-bold text-[#FDF6EC]">{h.name}</div>
              <div className="text-[8px] text-[#9A6040]">{h.distance}</div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-bold" style={{ color: h.available ? '#4ADE80' : '#DC2626' }}>
                {h.available ? `${h.beds} camas` : 'Lleno'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ViewBlockchain() {
  const txs = [
    { hash: '0x6346...9e6f', event: 'Control verificado', week: 'Sem 8', tokens: '+20 MOM', time: '12 Feb' },
    { hash: '0x8a12...b3c4', event: 'Control verificado', week: 'Sem 12', tokens: '+20 MOM', time: '18 Feb' },
    { hash: '0xc78d...4f21', event: 'Control verificado', week: 'Sem 16', tokens: '+20 MOM', time: '3 Mar' },
    { hash: '0x1d4e...8c90', event: 'Tokens reclamados', week: '80 MOM', tokens: 'Canjeo', time: '5 Mar' },
  ]
  return (
    <div className="p-3 space-y-3">
      <div className="bg-[rgba(79,70,229,0.08)] border border-[rgba(79,70,229,0.2)] rounded-xl p-2.5 flex items-center justify-between">
        <div>
          <div className="text-[9px] text-[#818CF8] font-bold">Ethereum Sepolia Testnet</div>
          <div className="text-[8px] text-[#9A6040]">4 transacciones registradas</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
      </div>
      <div className="space-y-2">
        {txs.map(tx => (
          <div key={tx.hash} className="bg-[rgba(39,18,5,0.85)] rounded-xl p-2.5 border border-[#5C3018]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono text-[#818CF8]">{tx.hash}</span>
              <span className="text-[8px] text-[#9A6040]">{tx.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#E8C9A0]">{tx.event} · {tx.week}</span>
              <span className="text-[8px] font-bold text-[#F59E0B]">{tx.tokens}</span>
            </div>
            <div className="flex gap-1 mt-1.5">
              {['Chainlink CRE', 'World ID'].map(badge => (
                <span key={badge} className="text-[6px] px-1.5 py-0.5 rounded bg-[rgba(79,70,229,0.15)] text-[#818CF8] border border-[rgba(79,70,229,0.2)]">{badge}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ViewTokens({ setShowClaimFlow }: { setShowClaimFlow: (v: null | 'worldid' | 'cre-loading' | 'cre-success' | 'cre-veto') => void }) {
  const benefits = [
    { label: 'Descuento medicinas', cost: 10 },
    { label: 'Consulta nutricionista', cost: 25 },
    { label: 'Paquete ecografias', cost: 50 },
    { label: 'Cobertura de parto', cost: 100 },
  ]
  return (
    <div className="p-3 space-y-3">
      <div className="bg-linear-to-br from-[rgba(245,158,11,0.12)] to-[rgba(194,103,42,0.08)] rounded-xl p-4 text-center border border-[rgba(245,158,11,0.3)]">
        <Coins className="w-10 h-10 text-[#F59E0B] mx-auto mb-2" />
        <div className="text-3xl font-bold text-[#F59E0B]">320</div>
        <div className="text-[10px] text-[#E8C9A0]">MOM tokens disponibles</div>
        <div className="text-[8px] text-[#9A6040] mt-1">6 controles · Chainlink CRE verificados</div>
      </div>
      <button
        onClick={() => setShowClaimFlow('worldid')}
        className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold text-[11px] flex items-center justify-center gap-2"
      >
        <Fingerprint className="w-4 h-4" /> Reclamar con World ID
      </button>
      <div>
        <div className="text-[10px] font-bold text-[#FDF6EC] mb-2">Canjear beneficios</div>
        <div className="grid grid-cols-2 gap-2">
          {benefits.map(b => (
            <button key={b.label} className="p-2.5 bg-[rgba(39,18,5,0.85)] border border-[#5C3018] rounded-xl text-left hover:border-[#C2672A] transition-colors">
              <div className="text-[#F59E0B] font-bold text-sm">{b.cost}</div>
              <div className="text-[7px] text-[#9A6040]">MOM tokens</div>
              <div className="text-[9px] text-[#E8C9A0] mt-0.5 leading-tight">{b.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ViewContactos() {
  const contacts = [
    { name: 'Maria Lopez', role: 'Esposo', verified: true },
    { name: 'Ana Garcia', role: 'Madre', verified: true },
    { name: 'Dr. Rodriguez', role: 'Medico', verified: true },
  ]
  return (
    <div className="p-3 space-y-3">
      <div className="text-[10px] text-[#9A6040]">Estas personas recibiran un SMS con tu ubicacion cuando presiones SOS.</div>
      <div className="space-y-2">
        {contacts.map(c => (
          <div key={c.name} className="flex items-center gap-2.5 p-2.5 bg-[rgba(39,18,5,0.85)] border border-[#5C3018] rounded-xl">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#C2672A] to-[#8B3A10] flex items-center justify-center text-white font-bold text-[11px]">
              {c.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold text-[#FDF6EC]">{c.name}</div>
              <div className="text-[8px] text-[#9A6040]">{c.role}</div>
            </div>
            <div className="text-[7px] text-[#4ADE80] px-1.5 py-0.5 bg-[rgba(21,128,61,0.15)] rounded border border-[rgba(21,128,61,0.3)] flex items-center gap-1">
              <Check className="w-2.5 h-2.5" /> Activo
            </div>
          </div>
        ))}
      </div>
      <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#5C3018] rounded-xl text-[10px] text-[#9A6040] hover:border-[#C2672A] transition-colors">
        <UserPlus className="w-3.5 h-3.5" /> Agregar contacto
      </button>
    </div>
  )
}

// ─── Small reusable components ────────────────────────────────────────────────

function WiphalaBar({ mt = '' }: { mt?: string }) {
  return (
    <div
      className={`h-[4px] w-full shrink-0 ${mt}`}
      style={{
        background: 'linear-gradient(90deg,#E40303 14.28%,#FF8C00 14.28% 28.56%,#FFED00 28.56% 42.84%,#008026 42.84% 57.12%,#004DFF 57.12% 71.40%,#750787 71.40% 85.68%,#FFFFFF 85.68%)',
      }}
    />
  )
}

function StatCard({ icon, label, value, valueColor = 'text-[#C2672A]' }: { icon: React.ReactNode; label: string; value: string; valueColor?: string }) {
  return (
    <div className="bg-[rgba(39,18,5,0.85)] rounded-xl p-3 text-center border border-[#5C3018]">
      <div className="text-[#C2672A] mb-1 flex justify-center">{icon}</div>
      <div className="text-[8px] text-[#9A6040] mb-0.5">{label}</div>
      <div className={`text-lg font-bold ${valueColor}`}>{value}</div>
    </div>
  )
}

function NavItem({ icon, label, active, onClick, badge }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; badge?: string }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${active ? 'text-[#C2672A]' : 'text-[#9A6040]'}`}>
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1.5 bg-[#F59E0B] text-[#1A0800] text-[6px] font-bold px-1 rounded-full">{badge}</span>
        )}
      </div>
      <span className="text-[7px]">{label}</span>
    </button>
  )
}

function HospitalItem({ name, distance, status }: { name: string; distance: string; status: string }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-[rgba(26,8,0,0.75)] rounded-lg border border-[#5C3018]">
      <Building2 className="w-4 h-4 text-[#DC2626]" />
      <div className="flex-1">
        <div className="text-[10px] font-medium text-[#FDF6EC]">{name}</div>
        <div className="text-[8px] text-[#9A6040]">{distance} · {status}</div>
      </div>
    </div>
  )
}

function InputField({ label, placeholder, value, onChange, type = 'text' }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <div className="text-[10px] text-[#E8C9A0] mb-1.5 font-semibold">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[rgba(39,18,5,0.85)] border border-[#5C3018] rounded-xl px-3 py-2.5 text-[10px] text-[#FDF6EC] placeholder-[#5C3018] focus:outline-none focus:border-[#C2672A] transition-colors"
      />
    </div>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
      <div className="bg-[rgba(39,18,5,0.98)] border border-[#5C3018] rounded-2xl w-full max-w-[280px] overflow-hidden">
        {onClose && (
          <button onClick={onClose} className="absolute top-3 right-3 text-[#9A6040] hover:text-[#FDF6EC]">
            <X className="w-4 h-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

