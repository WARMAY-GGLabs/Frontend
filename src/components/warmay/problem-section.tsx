import { AlertTriangle, MapPin, ShieldOff, Clock } from 'lucide-react'

export function ProblemSection() {
  return (
    <section className="py-20 px-5 md:px-7">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] text-destructive uppercase mb-4 px-4 py-1.5 bg-[rgba(220,38,38,0.1)] backdrop-blur-sm border border-destructive/30 rounded-full inline-block">
            El Problema
          </div>
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-4 text-balance">
            Una <em className="text-destructive not-italic">crisis silenciosa</em> en Bolivia
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Las madres bolivianas enfrentan barreras criticas que ponen en riesgo sus vidas y las de sus bebes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProblemCard
            icon={<AlertTriangle className="w-7 h-7 text-destructive" />}
            title="Alta Mortalidad Materna"
            description="Bolivia tiene una de las tasas mas altas de mortalidad materna en Latinoamerica, con 164 muertes por cada 100,000 nacidos vivos."
            stat="164"
            statLabel="por 100k"
          />
          <ProblemCard
            icon={<MapPin className="w-7 h-7 text-accent" />}
            title="Aislamiento Rural"
            description="El 47% de las muertes maternas ocurren en zonas rurales aisladas, donde el acceso a hospitales puede tomar horas."
            stat="47%"
            statLabel="rural"
          />
          <ProblemCard
            icon={<ShieldOff className="w-7 h-7 text-primary" />}
            title="Fraude en Subsidios"
            description="Los sistemas de subsidios actuales son vulnerables al fraude y la corrupcion, privando a las madres de recursos vitales."
            stat="$2M"
            statLabel="perdidos"
          />
          <ProblemCard
            icon={<Clock className="w-7 h-7 text-[#15803D]" />}
            title="Respuesta Lenta"
            description="La falta de sistemas de alerta rapida y coordinacion significa que muchas emergencias no reciben atencion a tiempo."
            stat="78%"
            statLabel="prevenibles"
          />
        </div>
      </div>
    </section>
  )
}

function ProblemCard({ 
  icon, 
  title, 
  description, 
  stat, 
  statLabel 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  stat: string
  statLabel: string
}) {
  return (
    <div className="bg-[rgba(39,18,5,0.82)] backdrop-blur-sm border border-border rounded-2xl p-6 transition-all hover:border-primary/50 hover:translate-y-[-2px]">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-secondary rounded-xl">
          {icon}
        </div>
        <div className="text-right">
          <div className="font-serif font-black text-2xl text-foreground">{stat}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{statLabel}</div>
        </div>
      </div>
      <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
