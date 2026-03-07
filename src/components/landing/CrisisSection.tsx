import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DotGrid from '../DotGrid';
import { gsap } from 'gsap';
import { useLang } from '../../lib/i18n';

const crisisColors = ['#C2672A', '#E67E3A', '#B13E3E', '#C2672A', '#E67E3A'];
const crisisIcons = ['🩸', '⚡', '🦠', '👶', '⚠️'];
const crisisPcts  = [27, 22, 15, 13, 23];

const transformStyles = [
  'rotate(6deg) translate(-180px)',
  'rotate(2deg) translate(-88px)',
  'rotate(-4deg)',
  'rotate(5deg) translate(88px)',
  'rotate(-3deg) translate(180px)',
];

function CrisisBounceCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const crisisData = t.crisis.cards.map((c, i) => ({
    pct: crisisPcts[i], icon: crisisIcons[i], color: crisisColors[i], name: c.name, desc: c.desc,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.crisis-card',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.08, ease: 'elastic.out(1, 0.6)', delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getNoRotationTransform = (t: string) =>
    /rotate\([\s\S]*?\)/.test(t)
      ? t.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
      : `${t} rotate(0deg)`;

  const getPushedTransform = (base: string, offsetX: number) => {
    const m = base.match(/translate\(([-0-9.]+)px\)/);
    if (m) {
      const newX = parseFloat(m[1]) + offsetX;
      return base.replace(/translate\(([-0-9.]+)px\)/, `translate(${newX}px)`);
    }
    return `${base} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    crisisData.forEach((_, i) => {
      const sel = q(`.crisis-card-${i}`);
      gsap.killTweensOf(sel);
      const base = transformStyles[i];
      if (i === hoveredIdx) {
        gsap.to(sel, { transform: getNoRotationTransform(base), duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        gsap.to(sel, {
          transform: getPushedTransform(base, offsetX),
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: 'auto',
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    crisisData.forEach((_, i) => {
      gsap.to(q(`.crisis-card-${i}`), { transform: transformStyles[i], duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: '100%', maxWidth: 1100, height: 420 }}
    >
      {crisisData.map((item, idx) => (
        <div
          key={item.name}
          className={`crisis-card crisis-card-${idx} absolute w-[210px] rounded-2xl overflow-hidden cursor-default select-none`}
          style={{
            transform: transformStyles[idx],
            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 2px ${item.color}55`,
            background: 'linear-gradient(160deg, #271205 0%, #1A0800 100%)',
            border: `1.5px solid ${item.color}66`,
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <div className="flex flex-col items-center gap-3 p-6 h-full text-center">
            {/* Top accent bar */}
            <div className="h-[3px] rounded-full w-full" style={{ background: item.color }} />
            <span className="text-[36px] leading-none">{item.icon}</span>
            <p className="font-mono font-black leading-none" style={{ fontSize: 54, color: item.color }}>
              {item.pct}<span className="opacity-50 text-[26px]">%</span>
            </p>
            <div className="mt-auto space-y-1.5">
              <p className="font-bold text-[13px] tracking-wide text-[#F5E6D3]">{item.name}</p>
              <p className="text-[11px] text-[#B8915A] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CrisisSection() {
  const { t } = useLang();
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
        {t.crisis.eyebrow}
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-black text-[clamp(42px,7vw,88px)] leading-[1.0] text-center mb-5"
      >
        <span className="text-earth">{t.crisis.title1}</span> {t.crisis.title2}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-warmay-text3 text-[13px] text-center max-w-[380px] mb-20 leading-relaxed"
      >
        {t.crisis.subtitle}
      </motion.p>

      {/* BounceCards grid */}
      <CrisisBounceCards />
      </div>
    </section>
  );
}
