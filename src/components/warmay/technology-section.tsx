import { Link2, Fingerprint, Brain, Shield, Zap, Lock, Globe, Cpu } from 'lucide-react'

const technologies = [
  {
    name: 'Chainlink CRE',
    description: 'Runtime Environment para orquestacion de workflows descentralizados con consenso BFT',
    icon: Link2,
    color: 'from-[#375BD2] to-[#4E6CD4]',
    features: [
      'Workflow DON para orquestacion',
      'HTTP Capability para APIs externas',
      'EVM Read/Write para blockchain',
      'Consenso Byzantine Fault Tolerant'
    ],
    docs: 'https://docs.chain.link/cre'
  },
  {
    name: 'World ID',
    description: 'Protocolo de identidad que verifica humanidad preservando privacidad mediante ZKP',
    icon: Fingerprint,
    color: 'from-[#000000] to-[#1D1D1D]',
    features: [
      'Zero-Knowledge Proofs',
      'Verificacion de humanidad',
      'Privacidad por defecto',
      'Resistencia a Sybil'
    ],
    docs: 'https://docs.world.org'
  },
  {
    name: 'Claude AI',
    description: 'IA conversacional avanzada para consultas medicas multilingues',
    icon: Brain,
    color: 'from-[#D97706] to-[#F59E0B]',
    features: [
      'Espanol, Quechua, Aymara',
      'Analisis de sintomas',
      'Deteccion de riesgo',
      'Escalamiento automatico'
    ],
    docs: 'https://anthropic.com'
  },
  {
    name: 'World Chain',
    description: 'L2 optimizado para humanos verificados con gas gratuito',
    icon: Globe,
    color: 'from-[#15803D] to-[#22C55E]',
    features: [
      'EVM compatible',
      'Gas gratis para verificados',
      'Transacciones rapidas',
      'Bajo costo operativo'
    ],
    docs: 'https://docs.world.org/world-chain'
  },
]

const securityFeatures = [
  {
    icon: Lock,
    title: 'Encriptacion E2E',
    description: 'Todos los datos de salud encriptados en transito y reposo'
  },
  {
    icon: Shield,
    title: 'Zero Knowledge',
    description: 'Verificacion sin revelar datos personales'
  },
  {
    icon: Zap,
    title: 'Consenso BFT',
    description: 'Tolerancia a fallas bizantinas en cada operacion'
  },
  {
    icon: Cpu,
    title: 'Inmutabilidad',
    description: 'Registros en blockchain no pueden ser alterados'
  },
]

export function TechnologySection() {
  return (
    <section id="tecnologia" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-background to-[rgba(39,18,5,0.3)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase mb-4 px-3 py-1.5 bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-full inline-block">
            Stack Tecnologico
          </div>
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-4 text-balance">
            Tecnologia de <span className="text-primary">Vanguardia</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Combinamos las mejores tecnologias Web3 e IA para crear un sistema de salud materna sin precedentes.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
              {/* Header */}
              <div className={`bg-linear-to-r ${tech.color} px-5 py-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <tech.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{tech.name}</h3>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tech.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {tech.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <a 
                  href={tech.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Ver documentacion
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="bg-linear-to-r from-[rgba(39,18,5,0.85)] to-[rgba(26,8,0,0.9)] backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
          <h3 className="font-serif font-bold text-xl md:text-2xl text-center mb-6">Seguridad de Grado Institucional</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="inline-flex p-3 bg-secondary rounded-xl mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-sm text-foreground mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
