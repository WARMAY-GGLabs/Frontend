import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenEmergency: () => void;
}

const navItems = [
  { id: 'hero', label: 'Misión' },
  { id: 'crisis', label: 'Causas' },
  { id: 'como', label: 'Cómo funciona' },
  { id: 'orgs', label: 'Institucional' },
];

const languages = ['ES', 'QU', 'AY'];

export default function Navbar({ onOpenEmergency }: NavbarProps) {
  const [activeNav, setActiveNav] = useState('hero');
  const [activeLang, setActiveLang] = useState('ES');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 40));
  }, [scrollY]);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Wiphala accent */}
      <div className="wiphala-bar fixed top-0 left-0 right-0 z-[201]" />

      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-[5px] left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled
            ? 'bg-[#110600]/95 backdrop-blur-2xl border-b border-border/40 shadow-[0_4px_60px_rgba(0,0,0,0.7)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-10 py-4 gap-8">

          {/* ── Brand ── */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3.5 cursor-pointer border-none bg-transparent shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 6 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-earth to-panic/70 flex items-center justify-center text-xl shadow-[0_0_22px_#C2672A30]"
            >
              🌸
            </motion.div>
            <div className="text-left">
              <p className="font-display text-[20px] font-black leading-tight bg-gradient-to-r from-earth-light to-sun bg-clip-text text-transparent">
                WARMAY
              </p>
              <p className="font-mono text-[10px] text-warmay-text3/60 tracking-[0.18em] leading-none uppercase">
                Bolivia · Salud Materna
              </p>
            </div>
          </button>

          {/* ── Center nav (desktop) ── */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative px-5 py-2.5 cursor-pointer border-none bg-transparent group"
              >
                <span
                  className={`font-body text-[13.5px] font-semibold tracking-wide transition-colors duration-200 ${
                    activeNav === item.id
                      ? 'text-warmay-text'
                      : 'text-warmay-text3 group-hover:text-warmay-text2'
                  }`}
                >
                  {item.label}
                </span>
                {activeNav === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-base3/70 border border-border/50 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Right ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-0.5 border border-border/40 rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-md border-none cursor-pointer font-mono text-[11px] font-bold tracking-widest transition-all duration-200 ${
                    activeLang === lang
                      ? 'bg-earth/25 text-earth-light'
                      : 'bg-transparent text-warmay-text3/50 hover:text-warmay-text3'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Emergency CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenEmergency}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border-none cursor-pointer bg-panic text-white font-body text-[12px] font-extrabold tracking-widest uppercase whitespace-nowrap shadow-[0_0_24px_#DC262650]"
              style={{ animation: 'panicPulse 2s ease-in-out infinite' }}
            >
              🚨 Emergencia
            </motion.button>

            {/* Burger (mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 cursor-pointer border border-border/40 rounded-lg bg-base3/50"
              aria-label="Menú"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block mx-auto w-4 h-[1.5px] bg-warmay-text2 rounded-full origin-center" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}        className="block mx-auto w-4 h-[1.5px] bg-warmay-text2 rounded-full" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block mx-auto w-4 h-[1.5px] bg-warmay-text2 rounded-full origin-center" />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-border/30 bg-[#110600]/97 backdrop-blur-2xl"
            >
              <div className="flex flex-col px-8 py-5 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left px-4 py-3 rounded-xl border-none cursor-pointer font-body text-[14px] font-semibold transition-colors duration-200 ${
                      activeNav === item.id
                        ? 'text-warmay-text bg-base3'
                        : 'text-warmay-text3 hover:text-warmay-text2 bg-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex gap-1.5 mt-4 pt-4 border-t border-border/30">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-4 py-2 rounded-lg border-none cursor-pointer font-mono text-[11px] font-bold tracking-widest transition-all ${
                        activeLang === lang
                          ? 'bg-earth/20 text-earth-light border border-earth/30'
                          : 'bg-transparent text-warmay-text3/50 border border-transparent'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
