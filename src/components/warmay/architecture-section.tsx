

import { 
  Smartphone, 
  Server, 
  Link2, 
  Fingerprint,
  ArrowRight,
  Database,
  Shield,
  Coins,
  AlertTriangle,
  MessageSquare,
  Check,
  Zap
} from 'lucide-react'

const flowSteps = [
  {
    phase: 'Fase 1',
    title: 'Verificacion de Identidad',
    description: 'La madre se registra y verifica su humanidad',
    icon: Fingerprint,
    color: 'from-[#4F46E5] to-[#7C3AED]',
    borderColor: 'border-[#4F46E5]',
    steps: [
      { actor: 'Frontend', action: 'Usuario inicia sesion en la app WARMAY' },
      { actor: 'World ID', action: 'IDKit genera proof de humanidad (ZKP)' },
      { actor: 'Backend', action: 'Verifica proof via World ID API' },
      { actor: 'Database', action: 'Almacena nullifier_hash unico' },
    ]
  },
  {
    phase: 'Fase 2',
    title: 'Registro de Control Prenatal',
    description: 'El profesional de salud registra el control medico',
    icon: Shield,
    color: 'from-[#059669] to-[#10B981]',
    borderColor: 'border-[#059669]',
    steps: [
      { actor: 'Frontend', action: 'Profesional escanea QR de la madre' },
      { actor: 'Backend', action: 'Valida credenciales del profesional' },
      { actor: 'CRE Workflow', action: 'Trigger: HTTP request con datos del control' },
      { actor: 'Chainlink CRE', action: 'Nodos ejecutan verificacion BFT' },
    ]
  },
  {
    phase: 'Fase 3',
    title: 'Verificacion Chainlink CRE',
    description: 'Red descentralizada verifica y registra en blockchain',
    icon: Link2,
    color: 'from-[#C2672A] to-[#F59E0B]',
    borderColor: 'border-[#C2672A]',
    steps: [
      { actor: 'CRE DON', action: 'Workflow DON orquesta la verificacion' },
      { actor: 'Capability DON', action: 'HTTP Fetch verifica con sistema de salud' },
      { actor: 'Consensus', action: 'Protocolo BFT genera resultado verificado' },
      { actor: 'EVM Write', action: 'Escribe registro en Sepolia testnet' },
    ]
  },
  {
    phase: 'Fase 4',
    title: 'Emision de Tokens MOM',
    description: 'La madre recibe recompensas por su cuidado prenatal',
    icon: Coins,
    color: 'from-[#F59E0B] to-[#FBBF24]',
    borderColor: 'border-[#F59E0B]',
    steps: [
      { actor: 'Smart Contract', action: 'Evento LogControlVerificado emitido' },
      { actor: 'CRE Trigger', action: 'EVM Log trigger detecta el evento' },
      { actor: 'Token Contract', action: 'Mint de tokens MOM a wallet de madre' },
      { actor: 'Frontend', action: 'Notificacion y actualizacion de balance' },
    ]
  },
]

const useCases = [
  {
    title: 'Emergencia SOS',
    icon: AlertTriangle,
    color: 'text-destructive',
    flow: [
      'Madre presiona boton SOS',
      'Frontend captura GPS + timestamp',
      'Backend notifica via Chainlink CRE',
      'Red de confianza recibe alerta',
      'Hospital cercano activado',
      'Registro inmutable en blockchain'
    ]
  },
  {
    title: 'Consulta IA Multilingue',
    icon: MessageSquare,
    color: 'text-[#8B5CF6]',
    flow: [
      'Madre escribe en Quechua/Aymara',
      'Claude AI procesa consulta',
      'Analiza historial verificado',
      'Genera respuesta personalizada',
      'Detecta sintomas de riesgo',
      'Escala a profesional si necesario'
    ]
  },
]

export function ArchitectureSection() {
  return (
    <section id="como-funciona" className="py-16 md:py-24 px-4 md:px-8 bg-linear-to-b from-background to-[rgba(39,18,5,0.3)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase mb-4 px-3 py-1.5 bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-full inline-block">
            Arquitectura del Sistema
          </div>
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-4 text-balance">
            Como funciona <span className="text-primary">WARMAY</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Flujo completo de verificacion: Frontend + Backend + Chainlink CRE + World ID
          </p>
        </div>

        {/* Main Flow Diagram */}
        <div className="mb-16">
          <div className="grid gap-6 md:gap-8">
            {flowSteps.map((phase, index) => (
              <div key={index} className="relative">
                <div className={`bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border ${phase.borderColor} rounded-2xl overflow-hidden`}>
                  {/* Phase Header */}
                  <div className={`bg-linear-to-r ${phase.color} px-4 py-3 md:px-6 md:py-4`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <phase.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] md:text-xs font-mono text-white/70 uppercase tracking-wider">{phase.phase}</div>
                        <div className="text-lg md:text-xl font-bold text-white">{phase.title}</div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-white/80 mt-2">{phase.description}</p>
                  </div>

                  {/* Steps */}
                  <div className="p-4 md:p-6">
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                      {phase.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3">
                          <div className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">
                            {stepIndex + 1}
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-primary uppercase tracking-wider">{step.actor}</div>
                            <div className="text-xs text-foreground leading-relaxed">{step.action}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow connector */}
                {index < flowSteps.length - 1 && (
                  <div className="flex justify-center py-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-0.5 h-4 bg-linear-to-b from-border to-primary/50" />
                      <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-center mb-8">Stack Tecnologico</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TechCard 
              title="Frontend"
              items={['Next.js 16', 'React 19', 'TailwindCSS', 'MiniKit SDK']}
              icon={<Smartphone className="w-5 h-5" />}
            />
            <TechCard 
              title="Backend"
              items={['Node.js / Python', 'World ID API', 'PostgreSQL', 'Redis Cache']}
              icon={<Server className="w-5 h-5" />}
            />
            <TechCard 
              title="Chainlink CRE"
              items={['Workflow DON', 'HTTP Capability', 'EVM Read/Write', 'Consensus BFT']}
              icon={<Link2 className="w-5 h-5" />}
            />
            <TechCard 
              title="Blockchain"
              items={['World Chain', 'Sepolia Testnet', 'Smart Contracts', 'Token MOM (ERC-20)']}
              icon={<Database className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-center mb-8">Casos de Uso</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-2xl p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary rounded-lg">
                    <useCase.icon className={`w-5 h-5 ${useCase.color}`} />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">{useCase.title}</h4>
                </div>
                <div className="space-y-2">
                  {useCase.flow.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CRE Code Example */}
        <div className="mt-12">
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-center mb-6">Ejemplo de Workflow CRE</h3>
          <div className="bg-[#0D0D0D] rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(39,18,5,0.5)] border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-accent" />
              <div className="w-3 h-3 rounded-full bg-[#15803D]" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">warmay-workflow.ts</span>
            </div>
            <pre className="p-4 md:p-6 text-xs md:text-sm font-mono text-foreground overflow-x-auto">
              <code>{`// WARMAY CRE Workflow - Verificacion de Control Prenatal
import { handler, cron, http, evm } from '@chainlink/cre-sdk'

// Trigger: HTTP request cuando se registra un control
handler(
  http.Trigger({ path: "/api/control-prenatal" }),
  async (runtime) => {
    const { maternalId, controlData, worldIdProof } = runtime.input
    
    // 1. Verificar World ID proof
    const isHuman = await http.fetch(runtime, {
      url: "https://developer.worldcoin.org/api/v2/verify",
      method: "POST",
      body: { proof: worldIdProof, action: "control-prenatal" }
    })
    
    if (!isHuman.success) throw new Error("Verificacion fallida")
    
    // 2. Verificar con sistema de salud (consenso BFT)
    const healthVerification = await http.fetch(runtime, {
      url: process.env.HEALTH_API_URL,
      headers: { Authorization: runtime.getSecret("HEALTH_API_KEY") }
    })
    
    // 3. Escribir registro verificado en blockchain
    const tx = await evm.write(runtime, {
      chain: "sepolia",
      contract: "0x...",
      method: "registrarControl",
      args: [maternalId, controlData.weekNumber, Date.now()]
    })
    
    // 4. Emitir tokens MOM como recompensa
    await evm.write(runtime, {
      chain: "sepolia", 
      contract: "0x...",
      method: "mint",
      args: [maternalId, 20] // 20 MOM tokens por control
    })
    
    return { success: true, txHash: tx.hash }
  }
)`}</code>
            </pre>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            <Zap className="w-3 h-3 inline mr-1" />
            Ejecutado por red descentralizada de nodos Chainlink con consenso BFT
          </p>
        </div>
      </div>
    </section>
  )
}

function TechCard({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div className="bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-primary">{icon}</div>
        <h4 className="font-bold text-sm text-foreground">{title}</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
