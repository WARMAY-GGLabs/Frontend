import { motion } from 'framer-motion';
import CurvedLoop from '../CurvedLoop';

const marqueeText =
  '🏥 Ministerio de Salud Bolivia ✦ 🌍 OPS / OMS ✦ 🤱 UNICEF ✦ 💙 UNFPA ✦ 🌐 Banco Mundial ✦ ⚕️ ONGs Locales ✦ ';

export default function OrgBand() {
  return (
    <section id="orgs" className="border-t border-border overflow-hidden">
      <div className="pt-8 pb-0 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[30px] text-muted tracking-[0.15em] uppercase mb-2 font-mono pt-20"
        >
          Diseñado para organismos internacionales
        </motion.p>
      </div>

      <CurvedLoop
        marqueeText={marqueeText}
        speed={1.2}
        curveAmount={40}
        direction="left"
        interactive={true}
        className="fill-[#C8B8A8] text-[5.5rem] font-bold tracking-widest"
      />
    </section>
  );
}

