import { useState, useEffect } from 'react';
import { LangProvider } from './lib/i18n';
import LandingPage from './pages/LandingPage';
import AppDemoPage from './pages/app-demo/AppDemoPage';
import ComoFuncionaPage from './pages/como-funciona/ComoFuncionaPage';
import InstitucionalPage from './pages/institucional/InstitucionalPage';
import TecnologiaPage from './pages/tecnologia/TecnologiaPage';

type Page = 'inicio' | 'app' | 'crisis' | 'prenatal' | 'blockchain' | 'nosotros';

function AppInner() {
  // Sincronizar el estado inicial con la URL del navegador
  const [page, setPage] = useState<Page>(() => {
    const urlPath = window.location.pathname.substring(1);
    if (['app', 'crisis', 'prenatal', 'blockchain', 'nosotros'].includes(urlPath)) {
      return urlPath as Page;
    }
    return 'inicio';
  });

  useEffect(() => {
    // Detectar cuando el usuario usa los botones de "Atrás/Adelante" en el navegador principal
    const handlePopState = () => {
      const currentPath = window.location.pathname.substring(1);
      setPage((currentPath as Page) || 'inicio');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Función envuelta para cambiar de página Y actualizar la barra de direcciones
  const handlePageChange = (newPage: Page) => {
    setPage(newPage);
    // Cambiamos la URL visualmente usando el History API de HTML5 para no recargar la página
    window.history.pushState(null, '', newPage === 'inicio' ? '/' : `/${newPage}`);
    // Opcional: Volver al inicio del scoll
    window.scrollTo(0, 0);
  };

  if (page === 'app') {
    return <AppDemoPage onPageChange={handlePageChange} />;
  }

  if (page === 'crisis') {
    return <ComoFuncionaPage onPageChange={handlePageChange} />;
  }

  if (page === 'prenatal') {
    return <InstitucionalPage onPageChange={handlePageChange} />;
  }

  if (page === 'blockchain') {
    return <TecnologiaPage onPageChange={handlePageChange} />;
  }

  return <LandingPage onPageChange={handlePageChange} />;
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}


