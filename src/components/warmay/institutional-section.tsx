import { Building2, Stethoscope, GraduationCap, Shield, FileCheck } from 'lucide-react'

const partners = [
  {
    category: 'Tecnologia',
    icon: Shield,
    items: [
      { name: 'Chainlink', role: 'Infraestructura Oracle' },
      { name: 'World ID', role: 'Verificacion de Identidad' },
      { name: 'Anthropic', role: 'Claude AI' },
    ]
  },
  {
    category: 'Salud',
    icon: Stethoscope,
    items: [
      { name: 'Ministerio de Salud Bolivia', role: 'Aliado Institucional' },
      { name: 'Red de Salud Rural', role: 'Implementacion Local' },
      { name: 'OPS/OMS', role: 'Asesoria Tecnica' },
    ]
  },
  {
    category: 'Academia',
    icon: GraduationCap,
    items: [
      { name: 'UMSA', role: 'Investigacion' },
      { name: 'UCB', role: 'Desarrollo' },
      { name: 'MIT Media Lab', role: 'Innovacion Social' },
    ]
  },
]

const certifications = [
  { name: 'ISO 27001', description: 'Seguridad de la Informacion' },
  { name: 'HIPAA', description: 'Proteccion de Datos de Salud' },
  { name: 'SOC 2', description: 'Controles de Servicio' },
  { name: 'GDPR', description: 'Privacidad de Datos' },
]

export function InstitutionalSection() {
  return (
    <section id="institucional" className="py-16 md:py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase mb-4 px-3 py-1.5 bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-full inline-block">
            Respaldo Institucional
          </div>
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-4 text-balance">
            Alianzas <span className="text-primary">Estrategicas</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Trabajamos con los mejores aliados en tecnologia, salud y academia para garantizar el exito de nuestra mision.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {partners.map((group, index) => (
            <div key={index} className="bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary rounded-lg">
                  <group.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{group.category}</h3>
              </div>
              <div className="space-y-3">
                {group.items.map((partner, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[rgba(26,8,0,0.5)] rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{partner.name}</div>
                      <div className="text-xs text-muted-foreground">{partner.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-linear-to-r from-[rgba(39,18,5,0.85)] to-[rgba(26,8,0,0.9)] backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileCheck className="w-6 h-6 text-primary" />
            <h3 className="font-serif font-bold text-xl text-foreground">Certificaciones y Cumplimiento</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4 bg-[rgba(26,8,0,0.5)] rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="font-bold text-lg text-primary mb-1">{cert.name}</div>
                <div className="text-xs text-muted-foreground">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="5+" label="Aliados Tecnologicos" />
          <StatCard value="3" label="Universidades" />
          <StatCard value="2" label="Ministerios" />
          <StatCard value="4" label="Certificaciones" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[rgba(39,18,5,0.6)] backdrop-blur-sm border border-border rounded-xl p-4 text-center">
      <div className="font-serif font-black text-3xl md:text-4xl text-primary mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
