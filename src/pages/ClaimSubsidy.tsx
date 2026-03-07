import { useState } from 'react';
// @ts-expect-error Types are not always correctly exported
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit';
import { AlertCircle, CheckCircle2, Loader2, HeartHandshake } from 'lucide-react';

const BACKEND_URL = "http://localhost:3001";
const WORLDID_APP_ID = "app_27fe5301affa50a0abf058d1125bc7ea"; 
const WORLDID_ACTION = "warmay-claim";

const TEXTS = {
  es: { 
    titulo: "Reclamar Subsidio", 
    sub: "Verifica tu identidad para acceder a tus beneficios prenatales de forma segura.", 
    btn: "Verificar con World ID",
    panic: "Pedir Ayuda Ahora (Botón Pánico)",
    status: {
      connecting: "Conectando con el servidor seguro...",
      opening: "Abriendo World ID...",
      successVerify: "Verificación exitosa. Enviando a Chainlink CRE...",
      successFinal: "¡Solicitud enviada! CRE procesando...",
      errorConnect: "No se pudo obtener la firma segura del servidor.",
      errorSend: "Error al conectar con el protocolo WARMAY.",
      errorVerify: "Fallo la verificación biométrica"
    }
  },
  qu: { 
    titulo: "Yanapayta Mañakuy", 
    sub: "Sutiykita chiqaqchay mana manchakuspa wik'uñaykipa allinninkunata chaskinaykipaq.", 
    btn: "World IDwan Chiqaqchay",
    panic: "Kunallan Yanapayta Mañakuy (Manchakuy Ñit'ina)",
    status: {
      connecting: "Waqaychasqa sirwiqman t'inkiykuchkan...",
      opening: "World ID kicharikuchkan...",
      successVerify: "Allin chiqaqchasqa. Chainlink CRE nisqaman apachichkan...",
      successFinal: "¡Mañakuy apachisqaña! CRE llamk'achkan...",
      errorConnect: "Manam waqaychasqa sirwiqmanta qillqa hap'iyta atikunchu.",
      errorSend: "WARMAY protocolo nisqawan t'inkiyta mana atikunchu.",
      errorVerify: "Mana chiqapaq qhawariy atikunchu"
    }
  },
  ay: { 
    titulo: "Yanapa Mayiña", 
    sub: "Sutima chiqanchaña jan axsarasa wawanakaman askinakap katuqañataki.", 
    btn: "World ID ukamp Chiqanchaña",
    panic: "Jichhaki Yanapa Mayiña (Axsaraña Ñit'ina)",
    status: {
      connecting: "Jark'aqat sirwiduramp chikt'asiskaraki...",
      opening: "World ID jist'araskay...",
      successVerify: "Kusa chiqanchat. Chainlink CRE ukar apayaskay...",
      successFinal: "¡Mayiwi apayata! CRE llamk'askay...",
      errorConnect: "Janiw jark'aqat sirwiduramp firm katuqaqkati.",
      errorSend: "WARMAY protoculumpi chikt'asiñ janiw atikiti.",
      errorVerify: "Janiw chiqanchatäkiti"
    }
  }
};

type Language = 'es' | 'qu' | 'ay';

export default function ClaimSubsidy() {
  const [lang, setLang] = useState<Language>('es');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rpContext, setRpContext] = useState<Record<string, unknown> | null>(null);

  const currentTexts = TEXTS[lang];

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const getRpContext = async () => {
    setIsLoading(true);
    setIsError(false);
    setStatusMessage(currentTexts.status.connecting);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/rp-signature`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(currentTexts.status.errorConnect);
      const rpSig = await response.json();
      
      setRpContext({
        rp_id: rpSig.rp_id, 
        nonce: rpSig.nonce,
        created_at: rpSig.created_at,
        expires_at: rpSig.expires_at,
        signature: rpSig.sig,
      });

      setStatusMessage(currentTexts.status.opening);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setStatusMessage(currentTexts.status.errorConnect);
      setIsLoading(false);
      throw error;
    }
  };

  const handleVerify = async (proofResult: ISuccessResult) => {
    setStatusMessage(currentTexts.status.successVerify);
    setIsError(false);

    try {
      // Wallet destino (Simulada, provendría del login/conexión Wallet de la app)
      const walletBeneficiaria = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; 

      const res = await fetch(`${BACKEND_URL}/api/v1/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            beneficiary: walletBeneficiaria, 
            idkitResponse: proofResult 
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatusMessage(currentTexts.status.successFinal);
        setIsLoading(false);
      } else {
        throw new Error(data.error || currentTexts.status.errorSend);
      }
    } catch (error) {
      console.error("Error enviando al backend:", error);
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : currentTexts.status.errorSend);
      setIsLoading(false);
    }
  };

  const handleOpenWidget = async () => {
    // Si ya tenemos rpContext lo reutilizamos u obtenemos uno nuevo cada vez
    await getRpContext();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-700 font-sans">
      {/* Encabezado */}
      <header className="bg-linear-to-r from-[#D72828] via-[#E86A10] via-[#E8B110] via-[#109D59] via-[#10599D] to-[#59109D] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">WARMAY</h1>
          <div className="flex space-x-2 text-sm">
            <button 
              onClick={() => handleLanguageChange('es')} 
              className={`hover:underline ${lang === 'es' ? 'font-semibold underline' : ''}`}
            >
              ES
            </button>
            <span>|</span>
            <button 
              onClick={() => handleLanguageChange('qu')} 
              className={`hover:underline ${lang === 'qu' ? 'font-semibold underline' : ''}`}
            >
              QU
            </button>
            <span>|</span>
            <button 
              onClick={() => handleLanguageChange('ay')} 
              className={`hover:underline ${lang === 'ay' ? 'font-semibold underline' : ''}`}
            >
              AY
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentTexts.titulo}</h2>
          <p className="text-gray-600 mb-8">{currentTexts.sub}</p>

          {/* Contenedor del Estado */}
          <div className="mb-6 h-12 flex items-center justify-center">
            {statusMessage && (
              <p className={`text-sm font-medium flex items-center gap-2 ${isError ? 'text-red-600' : 'text-green-600'}`}>
                {isError ? <AlertCircle size={18} /> : (isLoading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />)}
                {statusMessage}
              </p>
            )}
          </div>

          {/* Botón de World ID envuelto con IDKitWidget */}
          <IDKitWidget
            app_id={WORLDID_APP_ID as `app_${string}`}
            action={WORLDID_ACTION}
            onSuccess={handleVerify}
            verification_level="orb"
            rp_context={rpContext}
          >
            {({ open }: { open: () => void }) => (
              <button
                onClick={async () => {
                  try {
                    await handleOpenWidget();
                    open();
                  } catch {
                    // El error ya se setea en state
                  }
                }}
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* SVG Icono Genérico (Simulando Worldcoin Orb) */}
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>{currentTexts.btn}</span>
              </button>
            )}
          </IDKitWidget>

          {/* Botón de Pánico */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 mr-2" />
              {currentTexts.panic}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4 text-center text-sm">
        <p>WARMAY Protocol - Red de Custodia Comunitaria</p>
      </footer>
    </div>
  );
}
