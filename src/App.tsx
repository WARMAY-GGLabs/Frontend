import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AppDemoPage from './pages/app-demo/AppDemoPage';

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';

function App() {
  const [page, setPage] = useState<Page>('inicio');

  if (page === 'app') {
    return <AppDemoPage onPageChange={setPage} />;
  }

  return <LandingPage onPageChange={setPage} />;
}

export default App;
