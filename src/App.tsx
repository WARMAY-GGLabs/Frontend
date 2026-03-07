import { useState } from 'react';
import { LangProvider } from './lib/i18n';
import LandingPage from './pages/LandingPage';
import AppDemoPage from './pages/app-demo/AppDemoPage';
import ComoFuncionaPage from './pages/como-funciona/ComoFuncionaPage';
import InstitucionalPage from './pages/institucional/InstitucionalPage';
import TecnologiaPage from './pages/tecnologia/TecnologiaPage';

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';

function AppInner() {
  const [page, setPage] = useState<Page>('inicio');

  if (page === 'app') {
    return <AppDemoPage onPageChange={setPage} />;
  }

  if (page === 'crisis') {
    return <ComoFuncionaPage onPageChange={setPage} />;
  }

  if (page === 'prenatal') {
    return <InstitucionalPage onPageChange={setPage} />;
  }

  if (page === 'blockchain') {
    return <TecnologiaPage onPageChange={setPage} />;
  }

  return <LandingPage onPageChange={setPage} />;
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}


