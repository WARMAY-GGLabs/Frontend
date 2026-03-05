import { useEffect, useRef, useCallback } from 'react';
import './HeroSection.css';

const stats = [
  { value: 164, suffix: '', label: 'muertes por cada\n100,000 nacidos vivos' },
  { value: 78, suffix: '%', label: 'son prevenibles con\natención oportuna' },
  { value: 47, suffix: '%', label: 'ocurren en áreas\nrurales sin acceso' },
];

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const animateCounters = useCallback(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    const numEls = statsRef.current?.querySelectorAll('.num');
    if (!numEls) return;

    numEls.forEach((el, i) => {
      const target = stats[i].value;
      const suffix = stats[i].suffix;
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        (el as HTMLElement).textContent = Math.floor(current) + suffix;
      }, 20);
    });
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateCounters]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      <div className="hero">
        <div className="hero-geo" />
        <div className="hero-eyebrow">
          🌸 <span>Bolivia · Programa de Salud Materna</span>
        </div>
        <h1>
          <span>Ninguna madre</span>
          <br />
          <em>debería morir</em>
          <br />
          <span>dando vida</span>
        </h1>
        <p className="hero-sub">
          WARMAY es la primera plataforma de prevención de mortalidad materna que
          combina alertas de emergencia, seguimiento prenatal verificado en
          blockchain y IA trilingüe para madres bolivianas.
        </p>
        <p className="hero-lang">
          🌐 Disponible en Español · Quechua (Runa Simi) · Aymara
        </p>

        <div className="stats-band" ref={statsRef}>
          {stats.map((stat, i) => (
            <div className="stat-pill animate-on-scroll" key={i}>
              <div className="num">0{stat.suffix}</div>
              <div
                className="label"
                dangerouslySetInnerHTML={{
                  __html: stat.label.replace('\n', '<br/>'),
                }}
              />
            </div>
          ))}
        </div>

        <div className="hero-ctas">
          <button className="btn-primary">🌸 Acceder a la App</button>
          <button className="btn-secondary" onClick={() => scrollTo('como')}>
            ¿Cómo funciona? →
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('orgs')}>
            Para ONG / Gobiernos
          </button>
        </div>
      </div>
    </section>
  );
}
