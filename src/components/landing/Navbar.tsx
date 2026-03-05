import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavbarProps {
  onOpenEmergency: () => void;
}

const navItems = [
  { id: 'hero', label: 'Misión' },
  { id: 'crisis', label: 'Causas' },
  { id: 'como', label: '¿Cómo funciona?' },
  { id: 'orgs', label: 'Institucional' },
];

const languages = ['ES', 'QU', 'AY'];

export default function Navbar({ onOpenEmergency }: NavbarProps) {
  const [activeNav, setActiveNav] = useState('hero');
  const [activeLang, setActiveLang] = useState('ES');
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 50));
  }, [scrollY]);

  const bgOpacity = useTransform(scrollY, [0, 100], [0.7, 0.95]);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="wiphala-bar" />
      <motion.nav
        style={{ backgroundColor: useTransform(bgOpacity, (v) => `rgba(15,5,0,${v})`) }}
        className={`fixed top-[5px] left-0 right-0 z-200 flex items-center justify-between px-7 py-3.5 gap-3 flex-wrap backdrop-blur-2xl transition-all duration-300 ${
          scrolled ? 'border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'border-b border-transparent'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-earth to-panic flex items-center justify-center text-xl shrink-0 shadow-[0_0_20px_#C2672A40]"
          >
            🌸
          </motion.div>
          <div>
            <div className="font-display text-xl font-black leading-none bg-gradient-to-r from-earth-light to-sun bg-clip-text text-transparent">
              WARMAY
            </div>
            <div className="text-[10px] text-muted font-mono tracking-[0.1em]">
              Salvando vidas maternas · Bolivia
            </div>
          </div>
        </div>

        {/* Center nav */}
        <div className="hidden md:flex gap-0.5">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo(item.id)}
              className={`px-3.5 py-2 rounded-lg border-none cursor-pointer font-body text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                activeNav === item.id
                  ? 'bg-base3 text-warmay-text'
                  : 'bg-transparent text-warmay-text3 hover:bg-base3 hover:text-warmay-text'
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="flex bg-base3 border border-border rounded-lg overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-2.5 py-1.5 border-none cursor-pointer font-mono text-[11px] font-bold transition-all duration-200 ${
                  activeLang === lang
                    ? 'bg-earth text-white'
                    : 'bg-transparent text-warmay-text3'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenEmergency}
            className="px-3.5 py-2 rounded-lg border-none cursor-pointer bg-panic text-white font-body text-xs font-extrabold whitespace-nowrap"
            style={{ animation: 'panicPulse 2s ease-in-out infinite' }}
          >
            🚨 EMERGENCIA
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
}
