import { Heart, Target, Eye, Sparkles } from 'lucide-react'

export function MissionSection() {
  return (
    <section id="mision" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-[rgba(39,18,5,0.3)] to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase mb-4 px-3 py-1.5 bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-full inline-block">
            Nuestra Razon de Ser
          </div>
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-4 text-balance">
            Mision y <span className="text-primary">Vision</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-linear-to-br from-[rgba(39,18,5,0.85)] to-[rgba(26,8,0,0.9)] backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-br from-primary to-destructive rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-foreground">Mision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Reducir la mortalidad materna en Bolivia mediante tecnologia descentralizada, 
              garantizando acceso universal a atencion prenatal verificada, incentivos economicos 
              justos y respuesta de emergencia inmediata para cada madre, sin importar su ubicacion geografica.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-linear-to-br from-[rgba(39,18,5,0.85)] to-[rgba(26,8,0,0.9)] backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-br from-accent to-[#FBBF24] rounded-xl">
                <Eye className="w-6 h-6 text-background" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-foreground">Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Un mundo donde ninguna madre muera por causas prevenibles. Donde la blockchain 
              y la inteligencia artificial trabajen juntas para crear un sistema de salud materna 
              transparente, accesible y equitativo en toda Latinoamerica.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ValueCard
            icon={<Heart className="w-5 h-5" />}
            title="Empatia"
            description="Cada madre es unica y merece atencion personalizada"
          />
          <ValueCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Innovacion"
            description="Tecnologia de vanguardia al servicio de la salud"
          />
          <ValueCard
            icon={<Target className="w-5 h-5" />}
            title="Transparencia"
            description="Blockchain garantiza trazabilidad total"
          />
          <ValueCard
            icon={<Eye className="w-5 h-5" />}
            title="Accesibilidad"
            description="Disponible offline via SMS para zonas rurales"
          />
        </div>
      </div>
    </section>
  )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[rgba(39,18,5,0.6)] backdrop-blur-sm border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors">
      <div className="inline-flex p-2 bg-secondary rounded-lg mb-3 text-primary">
        {icon}
      </div>
      <h4 className="font-bold text-sm text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
