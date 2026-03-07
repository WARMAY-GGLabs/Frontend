import { WiphalaBar } from '../components/warmay/wiphala-bar';
import { Navbar } from '../components/warmay/navbar';
import { HeroSection } from '../components/warmay/hero-section';
import { MissionSection } from '../components/warmay/mission-section';
import { ProblemSection } from '../components/warmay/problem-section';
import { SolutionSection } from '../components/warmay/solution-section';
import { ArchitectureSection } from '../components/warmay/architecture-section';
import { InstitutionalSection } from '../components/warmay/institutional-section';
import { TechnologySection } from '../components/warmay/technology-section';
import { TeamSection } from '../components/warmay/team-section';
import { Footer } from '../components/warmay/footer';

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';

interface LandingPageProps {
  onPageChange?: (page: Page) => void;
}

export default function LandingPage({ onPageChange }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground" style={{ backgroundColor: '#1A0800', color: '#FDF6EC' }}>
      <WiphalaBar />
      <Navbar onAppDemoClick={() => onPageChange?.('app')} />
      <HeroSection onAppDemoClick={() => onPageChange?.('app')} />
      <MissionSection />
      <ProblemSection />
      <SolutionSection />
      <ArchitectureSection />
      <InstitutionalSection />
      <TechnologySection />
      <TeamSection />
      <Footer />
    </main>
  );
}
