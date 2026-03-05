import { motion } from 'framer-motion';

const orgs = [
  '🏥 Ministerio de Salud Bolivia',
  '🌍 OPS / OMS',
  '🤱 UNICEF',
  '💙 UNFPA',
  '🌐 Banco Mundial',
  '⚕️ ONGs Locales',
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function OrgBand() {
  return (
    <section id="orgs" className="border-t border-border">
      <div className="px-7 py-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] text-muted tracking-[0.15em] uppercase mb-6 font-mono"
        >
          Diseñado para organismos internacionales
        </motion.p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex gap-3 justify-center flex-wrap"
        >
          {orgs.map((org) => (
            <motion.div
              key={org}
              variants={itemAnim}
              whileHover={{ borderColor: '#C2672A', color: '#FDF6EC', y: -2 }}
              className="px-4.5 py-2.5 bg-base2/85 backdrop-blur-sm border border-border rounded-[10px] text-[13px] text-warmay-text3 font-semibold transition-all duration-200 cursor-default"
            >
              {org}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
