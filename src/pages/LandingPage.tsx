import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import OrgBand from '../components/landing/OrgBand';
import CrisisSection from '../components/landing/CrisisSection';
import HowItWorks from '../components/landing/HowItWorks';
import Footer from '../components/landing/Footer';
import EmergencyModal from '../components/landing/EmergencyModal';

const PARTICLE_COLORS = ['#C2672A', '#F59E0B', '#DC2626', '#8B5CF6', '#3B82F6'];

export default function LandingPage() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const containerRef = useScrollAnimation<HTMLDivElement>();

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
    <div ref={containerRef}>
      <Navbar onOpenEmergency={() => setEmergencyOpen(true)} />
      <HeroSection />
      <OrgBand />
      <CrisisSection />
      <HowItWorks />
      <Footer />
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />
    </div>
  );
}
