import { motion } from 'framer-motion';

const crisisData = [
  { pct: '27%', icon: '🩸', name: 'Hemorragia Postparto', desc: 'Principal causa de muerte. WARMAY activa alerta en menos de 30 segundos.' },
  { pct: '22%', icon: '⚡', name: 'Eclampsia / Preeclampsia', desc: 'Monitoreo con IA predictiva y alerta temprana.' },
  { pct: '15%', icon: '🦠', name: 'Sepsis / Infección', desc: 'Detección de síntomas vía IA y derivación urgente.' },
  { pct: '13%', icon: '👶', name: 'Parto Obstruido', desc: 'Geolocalización del hospital obstétrico más cercano.' },
  { pct: '23%', icon: '⚠️', name: 'Otras causas', desc: 'Protocolos de triage inteligente trilingüe.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function CrisisSection() {
  return (
    <section id="crisis" className="py-20 px-7 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] tracking-[0.2em] text-earth uppercase mb-3 inline-block px-3 py-1 bg-earth/15 rounded-full"
        >
          Las 5 causas principales
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-[clamp(28px,5vw,48px)] leading-[1.1] mb-4"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
        >
          <span className="text-earth">Conocer</span> el peligro salva vidas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-warmay-text2 text-[15px] max-w-[560px] mx-auto leading-[1.7] px-4 py-2.5 bg-base/55 backdrop-blur-sm rounded-[10px]"
        >
          WARMAY detecta estos patrones de riesgo y activa protocolos de emergencia inmediata.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {crisisData.map((item, i) => (
          <motion.div
            key={item.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            whileHover={{ y: -6, borderColor: '#DC262660', boxShadow: '0 16px 40px #DC262620' }}
            className="border border-border rounded-2xl p-6 bg-base2/85 backdrop-blur-sm cursor-pointer relative overflow-hidden transition-colors duration-300"
          >
            <span className="absolute top-3.5 right-3.5 font-mono text-[11px] font-bold text-panic bg-panic/[0.12] px-2 py-0.5 rounded-full">
              {item.pct}
            </span>
            <div className="text-[32px] mb-3">{item.icon}</div>
            <div className="font-bold text-sm mb-1.5">{item.name}</div>
            <div className="text-xs text-warmay-text3 leading-[1.5]">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
