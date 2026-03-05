import { motion } from 'framer-motion';

const links = [
  { href: '#hero', label: 'Misión' },
  { href: '#crisis', label: 'Causas' },
  { href: '#como', label: '¿Cómo funciona?' },
  { href: '#orgs', label: 'Institucional' },
];

const techStack = ['WorldID', 'Chainlink CRE', 'Base (L2)', 'IA Trilingüe'];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border bg-base/90 backdrop-blur-md"
    >
      <div className="max-w-[1100px] mx-auto px-7 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-earth to-panic flex items-center justify-center text-lg">
                🌸
              </div>
              <div className="font-display text-lg font-black bg-gradient-to-r from-earth-light to-sun bg-clip-text text-transparent">
                WARMAY
              </div>
            </div>
            <p className="text-xs text-warmay-text3 leading-[1.6] mb-4">
              Salvando vidas maternas en Bolivia a través de tecnología blockchain, IA trilingüe y redes comunitarias.
            </p>
            <div className="font-mono text-[10px] text-muted tracking-[0.1em]">
              Salvando vidas maternas · Bolivia
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-warmay-text2">Navegación</h4>
            <div className="flex flex-col gap-2.5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-warmay-text3 font-semibold hover:text-earth transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-warmay-text2">Tecnología</h4>
            <div className="flex flex-col gap-2.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[13px] text-warmay-text3 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-warmay-text2">Soporte</h4>
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] text-warmay-text3">Contacto</span>
              <span className="text-[13px] text-warmay-text3">Privacidad</span>
              <span className="text-[13px] text-warmay-text3">Términos</span>
              <span className="text-[13px] text-warmay-text3">FAQ</span>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-border pt-6 flex items-center justify-between flex-wrap gap-4">
          <div className="font-mono text-[11px] text-muted">
            © 2026 WARMAY — Programa de Salud Materna · Bolivia
          </div>
          <div className="flex gap-3">
            {['Twitter', 'GitHub', 'Discord'].map((s) => (
              <span
                key={s}
                className="text-xs text-warmay-text3 hover:text-earth cursor-pointer transition-colors duration-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
