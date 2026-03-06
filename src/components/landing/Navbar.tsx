import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenEmergency: () => void;
}

const navItems = [
  { id: 'hero', label: 'Misión' },
  { id: 'app', label: 'La App' },
  { id: 'como', label: '¿Cómo funciona?' },
  { id: 'institucional', label: 'Institucional' },
  { id: 'tecnologia', label: 'Tecnología' }
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
      <style jsx global>{`
        @keyframes panicPulse {
          0%, 100% { 
            background-color: #C2672A;
            box-shadow: 0 0 0 0 rgba(194, 103, 42, 0.7);
          }
          50% { 
            background-color: #E67E3A;
            box-shadow: 0 0 20px 5px rgba(194, 103, 42, 0.4);
          }
        }
      `}</style>

      {/* Wiphala bar */}
      <div className="fixed top-0 left-0 right-0 z-[201] h-[5px] w-full" 
           style={{ 
             background: 'linear-gradient(90deg, #F0C45A 0%, #F0C45A 20%, #FFFFFF 20%, #FFFFFF 40%, #4A9E5A 40%, #4A9E5A 60%, #3A6EA5 60%, #3A6EA5 80%, #B13E3E 80%, #B13E3E 100%)'
           }} 
      />

      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-[5px] left-0 right-0 z-[200] font-sans"
      >
        {/* Main bar */}
        <div
          className={`transition-all duration-500 ${
            scrolled 
              ? 'bg-[#2C1810]/95 backdrop-blur-xl shadow-lg' 
              : 'bg-[#2C1810]'
          }`}
          style={{ borderBottom: '1px solid rgba(194, 103, 42, 0.2)' }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between px-10 py-5 lg:px-16">

            {/* Brand (left) */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2 cursor-pointer border-none bg-transparent group flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C2672A] to-[#E67E3A] flex items-center justify-center text-white text-lg shadow-lg group-hover:shadow-xl transition-all">
                🌸
              </div>
              <div className="flex flex-col">
                <span className="text-[#F5E6D3] text-4xl font-bold leading-none tracking-tight">
                  WARMAY
                </span>
                <span className="text-[#B8A89A] text-[10px] tracking-[0.2em] uppercase leading-tight">
                  SALVANDO VIDAS MATERNAS · BOLIVIA
                </span>
              </div>
            </button>

            {/* Nav links (center) - hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative px-3 py-2 cursor-pointer border-none bg-transparent group"
                >
                  <span
                    className={`text-base font-medium transition-colors duration-300 ${
                      activeNav === item.id 
                        ? 'text-[#F5E6D3]' 
                        : 'text-[#B8A89A] hover:text-[#D4C5B8]'
                    }`}
                  >
                    {item.label}
                  </span>
                  {activeNav === item.id && (
                    <motion.span
                      layoutId="underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C2672A] rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Language selector - hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-2 py-1 rounded cursor-pointer text-sm font-medium tracking-wider transition-all duration-200 ${
                      activeLang === lang
                        ? 'text-[#F5E6D3] bg-[#C2672A]/20'
                        : 'text-[#B8A89A] hover:text-[#D4C5B8]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Vertical divider */}
              <span className="hidden sm:block w-px h-6 bg-[#C2672A]/30" />

              {/* Emergency button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenEmergency}
                className="flex items-center gap-2 px-4 py-1.5 rounded-md border-none cursor-pointer text-white text-sm font-bold tracking-wider uppercase whitespace-nowrap"
                style={{ 
                  background: 'linear-gradient(135deg, #C2672A, #E67E3A)',
                  animation: 'panicPulse 2.5s ease-in-out infinite',
                  boxShadow: '0 4px 15px rgba(194, 103, 42, 0.3)'
                }}
              >
                <span className="text-base">🚨</span>
                EMERGENCIA
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer border-none bg-transparent"
                aria-label="Menú"
              >
                <motion.span 
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} 
                  className="block w-5 h-0.5 bg-[#F5E6D3] rounded-full origin-center transition-colors"
                />
                <motion.span 
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} 
                  className="block w-5 h-0.5 bg-[#F5E6D3] rounded-full transition-colors"
                />
                <motion.span 
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} 
                  className="block w-5 h-0.5 bg-[#F5E6D3] rounded-full origin-center transition-colors"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-[#2C1810] border-t border-[#C2672A]/20"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left px-4 py-3 rounded-lg border-none cursor-pointer text-base transition-all duration-200 ${
                      activeNav === item.id
                        ? 'text-[#F5E6D3] bg-[#C2672A]/10 font-medium'
                        : 'text-[#B8A89A] hover:text-[#F5E6D3] hover:bg-[#C2672A]/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile language selector */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-[#C2672A]/20">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`flex-1 px-4 py-2 rounded-lg border-none cursor-pointer text-sm font-medium tracking-wider transition-all ${
                        activeLang === lang 
                          ? 'text-[#F5E6D3] bg-[#C2672A]' 
                          : 'text-[#B8A89A] bg-[#3A2A22] hover:bg-[#4A3A32]'
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