import { motion } from 'framer-motion';
import DotGrid from '../DotGrid';

const crisisData = [
  { pct: 27, icon: '🩸', name: 'Hemorragia Postparto', desc: 'Alerta activa en menos de 30 seg.' },
  { pct: 22, icon: '⚡', name: 'Eclampsia / Preeclampsia', desc: 'IA predictiva y alerta temprana.' },
  { pct: 15, icon: '🦠', name: 'Sepsis / Infección', desc: 'Detección y derivación urgente.' },
  { pct: 13, icon: '👶', name: 'Parto Obstruido', desc: 'Hospital obstétrico más cercano.' },
  { pct: 23, icon: '⚠️', name: 'Otras causas', desc: 'Triage inteligente trilingüe.' },
];

export default function CrisisSection() {
  return (
    <section
      id="crisis"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* DotGrid background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={22}
          baseColor="#3A1A0A"
          activeColor="#C2672A"
          proximity={130}
          shockRadius={220}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 w-full flex flex-col items-center">
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-mono text-[10px] tracking-[0.35em] text-earth/60 uppercase mb-8"
      >
        Las 5 causas principales
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-black text-[clamp(42px,7vw,88px)] leading-[1.0] text-center mb-5"
      >
        <span className="text-earth">Conocer</span> el peligro<br className="hidden sm:block" /> salva vidas
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-warmay-text3 text-[13px] text-center max-w-[380px] mb-20 leading-relaxed"
      >
        WARMAY detecta estos patrones y activa protocolos de emergencia inmediata.
      </motion.p>

      {/* Stat grid — divided by 1 px borders */}
      <div className="w-full max-w-[1100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
        {crisisData.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ backgroundColor: 'rgba(194,103,42,0.07)' }}
            className="relative bg-base2 flex flex-col gap-5 p-8 transition-colors duration-500 group cursor-default"
          >
            {/* Top accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-earth scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <span className="text-[28px] leading-none">{item.icon}</span>

            <p className="font-mono font-bold text-earth leading-none" style={{ fontSize: 'clamp(36px,3.8vw,56px)' }}>
              {item.pct}<span className="text-earth/40" style={{ fontSize: '0.55em' }}>%</span>
            </p>

            <div className="mt-auto space-y-1">
              <p className="font-semibold text-[12px] tracking-wide text-warmay-text">{item.name}</p>
              <p className="text-[11px] text-warmay-text3 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
