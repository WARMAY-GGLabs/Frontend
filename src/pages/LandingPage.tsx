import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';
import ImageSequenceScroll from '../components/landing/ImageSequenceScroll';
import OrgBand from '../components/landing/OrgBand';
import CrisisSection from '../components/landing/CrisisSection';
import HowItWorks from '../components/landing/HowItWorks';
import Footer from '../components/landing/Footer';
import EmergencyModal from '../components/landing/EmergencyModal';

const PARTICLE_COLORS = ['#C2672A', '#F59E0B', '#DC2626', '#8B5CF6', '#3B82F6'];

interface LandingPageProps {
  onPageChange?: (page: Page) => void;
}

export default function LandingPage({ onPageChange }: LandingPageProps) {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  // Create floating particles on mount
  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.background = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      p.style.animationDuration = `${Math.random() * 15 + 10}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      document.body.appendChild(p);
      particles.push(p);
    }
    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <>
      <Navbar
        activePage="inicio"
        onPageChange={onPageChange}
        onPanicClick={() => setEmergencyOpen(true)}
      />
      <main>
        {/* Scrollytelling: image sequence + text overlays */}
        <ImageSequenceScroll />
        <OrgBand />
        <CrisisSection />
        <HowItWorks />
      </main>
      <Footer />
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />

      {/* Botón emergencia permanente — esquina inferior derecha */}
      <motion.button
        onClick={() => setEmergencyOpen(true)}
        className="fixed bottom-7 right-7 z-[999] flex items-center gap-3 px-7 py-4 rounded-2xl font-black text-base text-white cursor-pointer border-none"
        style={{ background: 'var(--panic)', fontFamily: 'var(--body)', fontSize: '16px' }}
        animate={{
          scale: [1, 1.08, 1, 1.05, 1],
          boxShadow: [
            '0 0 0 0px #DC262650',
            '0 0 0 14px #DC262620',
            '0 0 0 0px #DC262650',
            '0 0 0 10px #DC262625',
            '0 0 0 0px #DC262650',
          ],
        }}
        transition={{ duration: 0.9, times: [0, 0.2, 0.4, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          style={{ display: 'inline-block', fontSize: '20px' }}
          animate={{ scale: [1, 1.3, 1, 1.2, 1] }}
          transition={{ duration: 0.9, times: [0, 0.2, 0.4, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
        >
          🚨
        </motion.span>
        EMERGENCIA
      </motion.button>
    </>
  );
}
