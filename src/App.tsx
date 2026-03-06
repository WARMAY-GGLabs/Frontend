import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AppDemoPage from './pages/app-demo/AppDemoPage';
import ComoFuncionaPage from './pages/como-funciona/ComoFuncionaPage';
import InstitucionalPage from './pages/institucional/InstitucionalPage';

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';

function App() {
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

  return <LandingPage onPageChange={setPage} />;
}

export default App;
