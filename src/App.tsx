import React, { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Contact, Contact as ContactComponent, Education, Experience, Footer, Header, Projects, Skills, Certifications, Chat } from './components';
import ErrorFallback from './components/ErrorBoundary';
import Navbar from './components/Navbar';

// Loading component with enhanced animations
const LoadingSpinner = () => (
  <div className="min-h-screen bg-[#0a0118] flex items-center justify-center">
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Loading Portfolio</h2>
        <p className="text-gray-400">Preparing amazing content for you...</p>
      </div>
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Trigger entrance animation
      setTimeout(() => setIsVisible(true), 100);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={
            <div className={`bg-[#0a0118] min-h-screen text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Enhanced Navigation */}
              <Navbar />
              
              {/* Enhanced Header Section */}
              <Header />
              
              {/* Enhanced Main Content */}
              <main className="container mx-auto px-4 relative">
                {/* Background decoration for main content */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5 pointer-events-none"></div>
                
                {/* Content sections with staggered animations */}
                <div className="relative z-10 space-y-0">
                  <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <About />
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Experience />
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Projects />
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Skills />
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Certifications />
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Education />
                  </div>
                  
                  <div className={`transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <ContactComponent />
                  </div>
                </div>
              </main>
              
              {/* Enhanced Footer */}
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
