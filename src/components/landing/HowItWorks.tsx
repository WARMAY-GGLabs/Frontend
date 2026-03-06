import { motion } from 'framer-motion';

const steps = [
  { num: '01', icon: '🌍', title: 'Identidad verificada', desc: 'WorldID ZK proof — eres única, sin revelar tu nombre. Anti-Sybil.' },
  { num: '02', icon: '🚨', title: 'Botón de Pánico', desc: 'Un toque alerta a familiares, hospital cercano y red comunitaria. Funciona sin internet.' },
  { num: '03', icon: '✅', title: 'Controles verificados', desc: 'Cada control prenatal registrado por el hospital en Chainlink CRE. Inmutable.' },
  { num: '04', icon: '🪙', title: 'Airdrop de tokens', desc: 'Al completar controles verificados, recibes MOM tokens. Incentivo real.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HowItWorks() {
  return (
    <section id="como" className="min-h-screen flex items-center justify-center border-t border-b border-border bg-base2/60 backdrop-blur-sm">
      <div className="w-full py-20 px-7 max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] tracking-[0.2em] text-earth uppercase mb-3 inline-block px-3 py-1 bg-earth/15 rounded-full"
          >
            Cómo funciona
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-black text-[clamp(28px,5vw,48px)] leading-[1.1]"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
          >
            <span className="text-earth">WARMAY</span> en 4 pasos
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              whileHover={{ y: -5, borderColor: '#C2672A' }}
              className="bg-base/88 backdrop-blur-md border border-border rounded-2xl p-7 relative cursor-default transition-colors duration-300"
            >
              <span className="font-display font-black text-5xl text-earth opacity-25 absolute top-4 right-5 leading-none">
                {step.num}
              </span>
              <div className="text-[28px] mb-3.5">{step.icon}</div>
              <div className="font-bold text-[15px] mb-2">{step.title}</div>
              <div className="text-[13px] text-warmay-text3 leading-[1.6]">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
