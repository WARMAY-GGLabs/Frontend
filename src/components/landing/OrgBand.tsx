import { motion } from 'framer-motion';
import CurvedLoop from '../CurvedLoop';
import DotGrid from '../DotGrid';
import { useLang } from '../../lib/i18n';

export default function OrgBand() {
  const { t } = useLang();
  return (
    <section id="orgs" className="relative border-t border-border overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10">
        <div className="pt-8 pb-0 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[30px] text-muted tracking-[0.15em] uppercase mb-2 font-mono pt-20"
          >
            {t.orgBand.heading}
          </motion.p>
        </div>

        <CurvedLoop
          marqueeText={t.orgBand.marquee}
          speed={1.2}
          curveAmount={40}
          direction="left"
          interactive={true}
          className="fill-[#C8B8A8] text-[5.5rem] font-bold tracking-widest"
        />
      </div>
    </section>
  );
}

