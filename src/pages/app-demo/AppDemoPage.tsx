import { WiphalaBar } from '../../components/warmay/wiphala-bar';
import { PhoneMockup } from '../../components/warmay/phone-mockup';
import { MobileApp } from '../../components/warmay/mobile-app';
import { Smartphone, MessageSquare, AlertTriangle, Coins, ArrowLeft } from 'lucide-react';

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';

interface AppDemoPageProps {
  onPageChange?: (page: Page) => void;
}

export default function AppDemoPage({ onPageChange }: AppDemoPageProps) {
  return (
    <main className="min-h-screen bg-[#1A0800] text-[#FDF6EC]">
      <WiphalaBar />

      <div className="pt-1 pb-6 md:pt-2 md:pb-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto -mt-4">
          {/* Back Button */}
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={() => onPageChange?.('inicio')}
              className="inline-flex items-center gap-2 text-sm text-[#A39E93] hover:text-[#C2672A] transition-colors py-1 rounded-lg bg-transparent border-none cursor-pointer mb-1 md:mb-2 z-10 relative"
            >
              <span>Volver al inicio</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 -mt-2 md:-mt-8">
            {/* Instructions Panel */}
            <div className="w-full max-w-md lg:max-w-sm order-2 lg:order-1">
              <div className="w-full flex justify-end mb-4">
                <div className="font-mono text-[11px] tracking-[0.2em] text-[#C2672A] uppercase px-3 py-1.5 bg-[rgba(39,18,5,0.85)] backdrop-blur-sm border border-[#2C1810] rounded-full inline-block">
                  Demo Interactivo
                </div>
              </div>

              <h1 className="font-serif font-black text-3xl md:text-4xl leading-tight mb-4" style={{textWrap: 'balance'}}>
                Prueba <em className="text-[#C2672A] not-italic">WARMAY</em>
              </h1>

              <p className="text-[#A39E93] leading-relaxed mb-8">
                Explora la aplicación móvil de WARMAY. Interactúa con todas las funcionalidades como si estuvieras usando un teléfono real.
              </p>

              <div className="space-y-4">
                <FeatureCard
                  icon={<AlertTriangle className="w-5 h-5 text-[#DC2626]" />}
                  title="Botón de Pánico"
                  description="Presiona SOS para ver cómo funciona el sistema de emergencia con geolocalización y notificación automática."
                />
                <FeatureCard
                  icon={<MessageSquare className="w-5 h-5 text-[#8B5CF6]" />}
                  title="Chat con IA"
                  description="Escribe tus consultas médicas en español, quechua o aymara. La IA responde en tu idioma."
                />
                <FeatureCard
                  icon={<Coins className="w-5 h-5 text-[#F59E0B]" />}
                  title="Tokens MOM"
                  description="Reclama tokens por completar controles prenatales verificados en blockchain."
                />
                <FeatureCard
                  icon={<Smartphone className="w-5 h-5 text-[#C2672A]" />}
                  title="Navegación Completa"
                  description="Usa la barra inferior para explorar: Dashboard, Controles, Mapa, Blockchain, Tokens y Red de Confianza."
                />
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="order-1 lg:order-2 flex-shrink-0 pt-4 lg:pt-2">
              <PhoneMockup>
                <MobileApp />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3 p-4 bg-[rgba(39,18,5,0.6)] backdrop-blur-sm border border-[#2C1810] rounded-xl transition-all hover:border-[#C2672A]/50">
      <div className="shrink-0 p-2 bg-[#2C1810] rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-sm text-[#FDF6EC] mb-1">{title}</h3>
        <p className="text-xs text-[#A39E93] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
