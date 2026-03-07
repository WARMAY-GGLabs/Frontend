import { motion, AnimatePresence } from 'framer-motion';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contacts = [
  { icon: '👩', name: 'Mamá Rosa', role: 'Familiar directo' },
  { icon: '🏥', name: 'Hospital Materno', role: '2.3 km · Abierto 24h' },
  { icon: '🚑', name: 'SAMU Ambulancia', role: 'Línea de emergencia' },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } },
};

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const handleConfirm = () => {
    alert('🚨 Alerta de emergencia enviada. Tu ubicación ha sido compartida con tu red de confianza.');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[1000] bg-black/88 backdrop-blur-2xl flex items-center justify-center p-5"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-base2/96 backdrop-blur-2xl border-2 border-panic rounded-[22px] max-w-[480px] w-full overflow-hidden shadow-[0_0_60px_#DC262250]"
          >
            {/* Header */}
            <div className="bg-linear-to-br from-panic to-panic-dark p-5.5 text-center">
              <h2 className="font-display font-black text-xl text-white mb-0.5">
                🚨 EMERGENCIA ACTIVADA
              </h2>
              <p className="text-xs text-white/70">
                Se enviará tu ubicación a contactos de emergencia
              </p>
            </div>

            {/* Body */}
            <div className="p-5.5">
              <div className="text-[13px] text-warmay-text2 mb-4.5 leading-[1.6]">
                Se alertará a tu red de confianza y al hospital más cercano. ¿Confirmas la emergencia?
              </div>

              <div className="flex flex-col gap-2.5 mb-4.5">
                {contacts.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 p-3.5 bg-base/75 border border-border rounded-[11px]"
                  >
                    <div className="text-xl shrink-0">{c.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{c.name}</div>
                      <div className="text-[11px] text-muted">{c.role}</div>
                    </div>
                    <div className="font-mono text-[10px] text-life-light bg-life/20 px-2 py-0.5 rounded-full border border-life/40">
                      ✓ Activo
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirm}
                  className="w-full p-4 rounded-[11px] border-none cursor-pointer bg-panic text-white font-extrabold text-[15px] font-body transition-all duration-200 hover:bg-panic-dark"
                >
                  🚨 CONFIRMAR EMERGENCIA
                </motion.button>
                <button className="w-full p-3 rounded-[10px] border border-border cursor-pointer bg-base/60 text-warmay-text2 text-[13px] font-semibold font-body">
                  📱 Enviar SMS sin internet
                </button>
                <button
                  onClick={onClose}
                  className="w-full p-2 border-none cursor-pointer bg-transparent text-muted text-xs font-body"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
