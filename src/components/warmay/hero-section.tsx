
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection({ onAppDemoClick }: { onAppDemoClick?: () => void }) {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-start justify-center px-5 py-16 md:px-12 md:py-20 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[#1A0F0A]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/video/video final.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay to protect text readability on the left */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0f0500]/95 via-[#0f0500]/60 to-transparent z-10" />
      </div>

      {/* Background gradient effects */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 10% 90%, rgba(194,103,42,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 10%, rgba(245,158,11,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(220,38,38,0.03) 0%, transparent 70%)
          `
        }}
      />
      
      <div className="relative z-10 flex flex-col items-start text-left max-w-7xl mx-auto w-full -mt-4 md:-mt-12">
        <div className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase mb-4 px-4 py-1.5 bg-[#271205]/90 backdrop-blur-md border border-white/10 rounded-full inline-block text-white shadow-lg">
          Bolivia - Programa de Salud Materna
        </div>
        
        <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-3 text-balance drop-shadow-xl">
          <span className="text-white">Ninguna madre</span><br />
          <em className="text-primary not-italic drop-shadow-md">deberia morir</em><br />
          <span className="text-white">dando vida</span>
        </h1>
        
        <p className="text-base md:text-lg text-white/90 max-w-[640px] leading-relaxed mb-2 px-5 py-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl">
          WARMAY es la primera plataforma de prevencion de mortalidad materna que combina alertas de emergencia, 
          seguimiento prenatal verificado en blockchain e IA trilingue para madres bolivianas.
        </p>
        
        <p className="text-sm text-white/60 mb-6 pl-2 font-medium">
          Disponible en Espanol - Quechua (Runa Simi) - Aymara
        </p>

        {/* Stats Band */}
        <div className="flex gap-4 md:gap-6 justify-start flex-wrap mb-8">
          <StatPill value="164" label="muertes por cada 100,000 nacidos vivos" />
          <StatPill value="78%" label="son prevenibles con atencion oportuna" />
          <StatPill value="2.3s" label="tiempo de respuesta con Chainlink CRE" />
        </div>

        {/* CTAs */}
        <div className="flex gap-3.5 justify-start flex-wrap">
          <button
            onClick={onAppDemoClick}
            type="button"
            className="px-8 py-4 rounded-xl border-none cursor-pointer font-sans text-base font-extrabold bg-linear-to-br from-primary to-[#8B3A10] text-white shadow-[0_4px_30px_rgba(194,103,42,0.5)] transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_40px_rgba(194,103,42,0.7)] flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Ver App Demo
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#como-funciona"
            className="px-8 py-4 rounded-xl cursor-pointer font-sans text-base font-bold bg-[#271205]/80 text-white border-2 border-white/10 transition-all hover:border-primary hover:text-primary backdrop-blur-sm shadow-lg"
          >
            Como funciona
          </a>
        </div>
      </div>
    </section>
  )
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center px-4 py-3 rounded-xl min-w-[120px] max-w-[140px] bg-[rgba(39,18,5,0.88)] backdrop-blur-md border border-border">
      <div 
        className="font-serif font-black text-2xl md:text-3xl bg-linear-to-br from-primary to-accent bg-clip-text text-transparent"
      >
        {value}
      </div>
      <div className="text-[10px] text-secondary-foreground/70 mt-1 leading-snug text-balance">{label}</div>
    </div>
  )
}
