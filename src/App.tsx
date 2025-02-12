import React, { Suspense, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import apiService from './services/api';

const Header = React.lazy(() => import('./components/Header'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {
  useEffect(() => {
    const getEnhancedClientData = async () => {
      const clientIp = await apiService.getClientIp();
      const data = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || null,
        path: window.location.pathname,
        device: {
          screen: {
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            orientation: screen.orientation.type
          },
          browser: {
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: (navigator as any).deviceMemory,
            maxTouchPoints: navigator.maxTouchPoints,
            pdfViewerEnabled: navigator.pdfViewerEnabled,
          },
          connection: {
            type: (navigator as any).connection?.effectiveType || null,
            downlink: (navigator as any).connection?.downlink || null,
            rtt: (navigator as any).connection?.rtt || null,
          },
          battery: await (navigator as any).getBattery?.() || null,
        },
        window: {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        },
        ip_address: clientIp
      };

      await apiService.storeRequestData(data);
    };

    // getEnhancedClientData();
  }, []); // Only run once on initial mount

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-white">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
