import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../ScrollReveal';

const stats = [
  { value: 164, suffix: '', label: 'muertes por cada<br/>100,000 nacidos vivos' },
  { value: 78, suffix: '%', label: 'son prevenibles con<br/>atención oportuna' },
  { value: 47, suffix: '%', label: 'ocurren en áreas<br/>rurales sin acceso' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const animateCounters = useCallback(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;
    const numEls = statsRef.current?.querySelectorAll('.stat-num');
    if (!numEls) return;
    numEls.forEach((el, i) => {
      const target = stats[i].value;
      const suffix = stats[i].suffix;
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        (el as HTMLElement).textContent = Math.floor(current) + suffix;
      }, 20);
    });
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { animateCounters(); observer.disconnect(); }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateCounters]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Decorative Wiphala circle */}
      <div className="absolute -top-10 -right-15 w-[300px] h-[300px] opacity-[0.04] rounded-full"
        style={{
          background: 'conic-gradient(#E40303 0 45deg,#FF8C00 45deg 90deg,#FFED00 90deg 135deg,#008026 135deg 180deg,#004DFF 180deg 225deg,#750787 225deg 270deg,#FFFFFF 270deg 315deg,#E40303 315deg 360deg)',
        }}
      />

      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-7 py-15 text-center relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[11px] tracking-[0.2em] text-earth uppercase mb-5 px-4 py-1.5 bg-base2/85 backdrop-blur-sm border border-border rounded-full inline-block"
        >
          🌸 Bolivia · Programa de Salud Materna
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-[clamp(40px,8vw,96px)] leading-[1.0] mb-4 tracking-tight"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
            fontWeight: 900,
          }}
        >
          Ninguna madre
          <br />
          <span style={{ color: 'var(--color-earth)', fontStyle: 'italic' }}>debería morir</span>
          <br />
          dando vida
        </motion.h1>

        {/* Subtitle */}
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={3}
          containerClassName="max-w-[640px] mb-3 px-5 py-3 bg-base/60 backdrop-blur-sm rounded-xl !my-0"
          textClassName="!text-[clamp(15px,2.5vw,20px)] text-warmay-text2 leading-[1.7] !font-normal"
        >
          WARMAY es la primera plataforma de prevención de mortalidad materna que combina alertas de emergencia, seguimiento prenatal verificado en blockchain y IA trilingüe para madres bolivianas.
        </ScrollReveal>

        {/* Languages */}
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={1}
          blurStrength={2}
          containerClassName="mb-10 px-3.5 py-1.5 bg-base/60 rounded-lg inline-block !my-0"
          textClassName="!text-[13px] text-muted !font-normal italic"
        >
          🌐 Disponible en Español · Quechua (Runa Simi) · Aymara
        </ScrollReveal>

        {/* Stats */}
        <div ref={statsRef} className="flex gap-6 justify-center flex-wrap mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center px-6 py-4 rounded-2xl min-w-[140px] bg-base2/88 backdrop-blur-md border border-border"
            >
              <div className="stat-num font-display font-black text-4xl bg-linear-to-br from-earth to-sun bg-clip-text text-transparent">
                0{stat.suffix}
              </div>
              <div
                className="text-[11px] text-warmay-text2 mt-1 leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: stat.label }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex gap-3.5 justify-center flex-wrap"
        >
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="glow-btn px-8 py-4 rounded-xl border-none cursor-pointer font-body text-[15px] font-extrabold bg-linear-to-br from-earth to-earth-dark text-white transition-all duration-250"
          >
            🌸 Acceder a la App
          </motion.button>
          <motion.button
            whileHover={{ y: -2, borderColor: '#C2672A', color: '#C2672A' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('como')}
            className="px-8 py-4 rounded-xl cursor-pointer font-body text-[15px] font-bold bg-base2/80 text-warmay-text border-2 border-border transition-all duration-250"
          >
            ¿Cómo funciona? →
          </motion.button>
          <motion.button
            whileHover={{ y: -2, borderColor: '#C2672A', color: '#C2672A' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('orgs')}
            className="px-8 py-4 rounded-xl cursor-pointer font-body text-[15px] font-bold bg-base2/80 text-warmay-text border-2 border-border transition-all duration-250"
          >
            Para ONG / Gobiernos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
