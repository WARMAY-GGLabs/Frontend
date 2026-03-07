import { Globe, Link2, Bot, Shield } from 'lucide-react'

export function SolutionSection() {
  return (
    <section id="como-funciona" className="py-20 px-5 md:px-7 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] text-[#15803D] uppercase mb-4 px-4 py-1.5 bg-[rgba(21,128,61,0.1)] backdrop-blur-sm border border-[#15803D]/30 rounded-full inline-block">
            La Solucion
          </div>
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-4 text-balance">
            Como funciona <em className="text-primary not-italic">WARMAY</em>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Combinamos cuatro tecnologias de vanguardia para crear un sistema autonomo, transparente y eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TechCard
            icon={<Globe className="w-8 h-8" />}
            title="World ID"
            subtitle="ZK Proof - Anti-Sybil"
            color="blue"
            steps={[
              "Escaneas tu iris en World App",
              "Se genera un ZK Proof criptografico",
              "Nullifier hash unico para cada accion",
              "CRE verifica en Sepolia"
            ]}
          />
          <TechCard
            icon={<Link2 className="w-8 h-8" />}
            title="Chainlink CRE"
            subtitle="DON Consensus - 5 nodos"
            color="primary"
            steps={[
              "Hospital registra control",
              "CRE consulta API del hospital",
              "5 nodos llegan a consenso",
              "Escribe en Sepolia"
            ]}
          />
          <TechCard
            icon={<Bot className="w-8 h-8" />}
            title="Claude AI"
            subtitle="ES - QU - AY - Trilingue"
            color="purple"
            steps={[
              "Pregunta en tu idioma",
              "Analisis de sintomas",
              "Clasificacion de urgencia",
              "Recomendaciones medicas"
            ]}
          />
          <TechCard
            icon={<Shield className="w-8 h-8" />}
            title="Red de Custodia"
            subtitle="Emergencia Offline SMS"
            color="green"
            steps={[
              "Contactos de confianza registrados",
              "Alerta automatica por SMS sin internet",
              "GPS compartido con hospitales cercanos",
              "Ambulancia coordinada via blockchain"
            ]}
          />
        </div>
      </div>
    </section>
  )
}

function TechCard({ 
  icon, 
  title, 
  subtitle, 
  color, 
  steps 
}: { 
  icon: React.ReactNode
  title: string
  subtitle: string
  color: 'blue' | 'primary' | 'purple' | 'green'
  steps: string[]
}) {
  const colorClasses = {
    blue: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30',
    primary: 'text-primary bg-primary/10 border-primary/30',
    purple: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/30',
    green: 'text-[#15803D] bg-[#15803D]/10 border-[#15803D]/30'
  }

  const iconBgClasses = {
    blue: 'text-[#3B82F6]',
    primary: 'text-primary',
    purple: 'text-[#8B5CF6]',
    green: 'text-[#15803D]'
  }

  return (
    <div className={`bg-[rgba(39,18,5,0.82)] backdrop-blur-sm border border-border rounded-2xl p-6 transition-all hover:border-opacity-100 hover:${colorClasses[color].split(' ')[2]}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={iconBgClasses[color]}>
          {icon}
        </div>
        <div>
          <div className="font-bold text-lg text-foreground">{title}</div>
          <div className="text-[11px] text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div key={i} className="text-sm text-secondary-foreground/80 leading-relaxed flex gap-2">
            <span className="font-bold text-muted-foreground">{i + 1}.</span>
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}
