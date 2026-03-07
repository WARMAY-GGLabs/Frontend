import { motion } from 'framer-motion';
import DotGrid from '../DotGrid';
import TiltedCard from '../TiltedCard';
import { useLang } from '../../lib/i18n';

const stepIcons = ['🌍', '🚨', '✅', '🪙'];
const stepNums  = ['01', '02', '03', '04'];

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
  const { t } = useLang();
  const steps = t.howItWorks.steps.map((s, i) => ({ num: stepNums[i], icon: stepIcons[i], ...s }));

  return (
    <section
      id="como"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#100018 0%,#0A0010 100%)' }}
    >
      {/* DotGrid background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={22}
          baseColor="#300a3a"
          activeColor="#C2672A"
          proximity={130}
          shockRadius={220}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="relative z-10 w-full py-28 px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] tracking-[0.2em] text-earth uppercase mb-3 inline-block px-3 py-1 bg-earth/15 rounded-full"
          >
            {t.howItWorks.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-black text-[clamp(28px,5vw,48px)] leading-[1.1]"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
          >
            <span className="text-earth">{t.howItWorks.title1}</span> {t.howItWorks.title2}
          </motion.h2>
        </div>
<br /><br /><br /><br />
        {/* Steps grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center px-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
            >
              <TiltedCard
                containerWidth="270px"
                containerHeight="320px"
                imageWidth="280px"
                imageHeight="320px"
                imageSrc=""
                rotateAmplitude={14}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent
                overlayContent={
                  <div
                    className="w-full h-full flex flex-col justify-between p-6 rounded-[15px] cursor-default"
                    style={{
                      background: 'linear-gradient(160deg, #ac5d2b 0%, #1A0800 100%)',
                      border: '1.5px solid rgba(194,103,42,0.35)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div>
                      <span className="font-display font-black text-6xl text-earth  leading-none block mb-4">
                        {step.num}
                      </span>
                      <div className="text-[32px] mb-4">{step.icon}</div>
                      <div className="font-bold text-[15px] mb-2 text-[#F5E6D3]">{step.title}</div>
                      <div className="text-[12px] text-[#B8915A] leading-[1.6]">{step.desc}</div>
                    </div>
                    <div className="h-[2px] rounded-full bg-linear-to-r from-earth to-transparent mt-4" />
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
