import React, { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Projects from './components/Projects';
import Certifications from './components/Certifications';

const Header = React.lazy(() => import('./components/Header'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-white">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Certifications/>
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
