import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import VariableProximity from '../ui/VariableProximity';
import TextType from '../TextType';

const TOTAL_FRAMES = 192;
const SCROLL_HEIGHT = '600vh';

function getFramePath(index: number): string {
  const num = String(index + 1).padStart(3, '0');
  return `/img/ezgif-frame-${num}.png`;
}

/* ── Headline with VariableProximity effect ── */
function HeadlineContent() {
  const headlineRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={headlineRef} style={{ position: 'relative' }}>
      <div className="font-mono text-[11px] tracking-[0.2em] text-earth uppercase mb-4 px-4 py-1.5 bg-base2/80 backdrop-blur-sm border border-border rounded-full inline-block">
        🌸 Bolivia · Programa de Salud Materna
      </div>
      <h1 className="font-display text-[clamp(32px,6vw,72px)] leading-[1.05] mb-4"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)' }}>
        <VariableProximity
          label="Ninguna madre"
          className="text-warmay-text"
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 900"
          containerRef={headlineRef}
          radius={150}
          falloff="gaussian"
          style={{ fontFamily: "'Outfit', sans-serif", display: 'block' }}
        />
        <VariableProximity
          label="debería morir"
          className="text-earth"
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 900"
          containerRef={headlineRef}
          radius={150}
          falloff="gaussian"
          style={{ fontFamily: "'Outfit', sans-serif", display: 'block' }}
        />
        <VariableProximity
          label="dando vida"
          className="text-warmay-text"
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 900"
          containerRef={headlineRef}
          radius={150}
          falloff="gaussian"
          style={{ fontFamily: "'Outfit', sans-serif", display: 'block' }}
        />
      </h1>
    </div>
  );
}

/* ── Subtitle with word-by-word Framer Motion animation ── */
function SubtitleContent() {
  const words = 'WARMAY es la primera plataforma de prevención de mortalidad materna que combina alertas de emergencia, seguimiento prenatal verificado en blockchain y IA trilingüe para madres bolivianas.'.split(' ');

  return (
    <div className="max-w-[620px] text-center" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.7)' }}>
      <p className="text-[clamp(20px,3vw,30px)] font-semibold leading-[1.7] text-warmay-text flex flex-wrap justify-center gap-x-[0.3em] gap-y-0">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-[22px]">🌐</span>
        <TextType
          text={['Español', 'Quechua · Runa Simi', 'Aymara']}
          typingSpeed={60}
          deletingSpeed={35}
          pauseDuration={1800}
          loop
          showCursor
          cursorCharacter="|"
          cursorClassName="text-earth"
          textColors={['#FDF6EC', '#E8895A', '#F59E0B']}
          className="text-[clamp(22px,3.5vw,36px)] font-black tracking-wide uppercase"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.95)' }}
        />
      </div>
    </div>
  );
}

/* ── Text sections that appear at different scroll points ── */
const textSections = [
  {
    range: [0, 0, 0.18, 0.24] as const,
    content: <HeadlineContent />,
  },
  {
    range: [0.22, 0.28, 0.40, 0.46] as const,
    content: <SubtitleContent />,
  },
  {
    range: [0.44, 0.50, 0.62, 0.68] as const,
    content: (
      <div className="flex gap-5 justify-center flex-wrap">
        {[
          { num: '164', label: 'muertes por cada\n100,000 nacidos vivos' },
          { num: '78%', label: 'son prevenibles con\natención oportuna' },
          { num: '47%', label: 'ocurren en áreas\nrurales sin acceso' },
        ].map((stat, i) => (
          <div key={i} className="text-center px-5 py-4 rounded-2xl min-w-[130px] bg-base2/85 backdrop-blur-md border border-border">
            <div className="font-display font-black text-3xl bg-gradient-to-br from-earth to-sun bg-clip-text text-transparent">
              {stat.num}
            </div>
            <div className="text-[11px] text-warmay-text2 mt-1 leading-[1.4] whitespace-pre-line">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    range: [0.66, 0.72, 0.88, 0.94] as const,
    content: (
      <div className="flex flex-col items-center gap-4">
        <div className="font-mono text-[11px] tracking-[0.2em] text-earth uppercase px-3 py-1 bg-earth/15 rounded-full">
          ¿Qué hace WARMAY?
        </div>
        <h2 className="font-display font-black text-[clamp(24px,4vw,44px)] leading-[1.1] text-center"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>
          <span className="text-earth">Emergencias</span> · Blockchain · IA
        </h2>
        <div className="flex gap-3 flex-wrap justify-center mt-2">
          <button className="glow-btn px-7 py-3.5 rounded-xl border-none cursor-pointer font-body text-sm font-extrabold bg-gradient-to-br from-earth to-earth-dark text-white">
            🌸 Acceder a la App
          </button>
          <button
            onClick={() => document.getElementById('crisis')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl cursor-pointer font-body text-sm font-bold bg-base2/80 text-warmay-text border-2 border-border hover:border-earth hover:text-earth transition-all duration-250"
          >
            Conoce más ↓
          </button>
        </div>
      </div>
    ),
  },
];

/* ── Overlay that fades in/out based on scroll progress ── */
function TextOverlay({
  range,
  children,
  scrollProgress,
}: {
  range: readonly [number, number, number, number];
  children: React.ReactNode;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const opacity = useTransform(
    scrollProgress,
    [range[0], range[1], range[2], range[3]],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [range[0], range[1], range[2], range[3]],
    [40, 0, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
    >
      <div className="pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}

/* ── Main component ── */
export default function ImageSequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const frameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        if (loadedCount === TOTAL_FRAMES) {
          setReady(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Draw frame to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const cw = canvas.width / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, cw, ch);

      // "Cover" fit (fill entire canvas)
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;
      let drawW: number, drawH: number, offsetX: number, offsetY: number;

      if (imgRatio > canvasRatio) {
        drawH = ch;
        drawW = ch * imgRatio;
        offsetX = (cw - drawW) / 2;
        offsetY = 0;
      } else {
        drawW = cw;
        drawH = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - drawH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    // Draw first frame
    if (ready) drawFrame(0);

    const unsubscribe = frameIndex.on('change', (v) => {
      const idx = Math.min(Math.floor(v), TOTAL_FRAMES - 1);
      if (idx !== frameRef.current) {
        frameRef.current = idx;
        requestAnimationFrame(() => drawFrame(idx));
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [ready, frameIndex]);

  const loadProgress = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas — the image sequence */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-base/50 via-transparent to-base/60 pointer-events-none" />

        {/* Text overlays fade in/out at different scroll points */}
        {ready && textSections.map((section, i) => (
          <TextOverlay
            key={i}
            range={section.range}
            scrollProgress={scrollYProgress}
          >
            {section.content}
          </TextOverlay>
        ))}

        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-base/95 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-earth to-panic flex items-center justify-center text-xl mb-4 shadow-[0_0_20px_#C2672A40]">
              🌸
            </div>
            <div className="font-display font-black text-lg mb-3 bg-gradient-to-r from-earth-light to-sun bg-clip-text text-transparent">
              WARMAY
            </div>
            <div className="w-48 h-1.5 bg-base3 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-earth to-sun rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="font-mono text-xs text-muted">
              Cargando experiencia... {loadProgress}%
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.03], [1, 0]),
          }}
        >
          <span className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase">
            Desliza para explorar
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-5 h-8 border-2 border-muted/50 rounded-full flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 bg-earth rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
