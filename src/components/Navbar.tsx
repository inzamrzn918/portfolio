import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];
      const currentSection = sections.find(section => {
        const element = document.querySelector(`#${section.toLowerCase()}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#', active: activeSection === 'Home' },
    { name: 'About', href: '#about', active: activeSection === 'About' },
    { name: 'Experience', href: '#experience', active: activeSection === 'Experience' },
    { name: 'Projects', href: '#projects', active: activeSection === 'Projects' },
    { name: 'Skills', href: '#skills', active: activeSection === 'Skills' },
    { name: 'Education', href: '#education', active: activeSection === 'Education' },
    { name: 'Contact', href: '#contact', active: activeSection === 'Contact' }
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0a0118]/95 backdrop-blur-md shadow-lg shadow-blue-500/10 border-b border-blue-500/20' 
        : 'bg-[#0a0118]/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
              <span className="text-xl md:text-2xl font-black text-white">IH</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hidden sm:block group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300">
              Inzamul Hoque
            </span>
          </a>
          
          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 relative group ${
                  item.active 
                    ? 'text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                }`}
              >
                {item.name}
                <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                  item.active ? 'w-full left-0' : ''
                }`}></div>
                {item.active && (
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl animate-pulse"></div>
                )}
              </a>
            ))}
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Hire Me</span>
            </button>
          </div>

          {/* Enhanced Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-700/50">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:translate-x-2 ${
                  item.active 
                    ? 'text-blue-400 bg-blue-500/10 border-l-4 border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 hover:border-l-4 hover:border-blue-500/50'
                }`}
              >
                {item.name}
                {item.active && (
                  <div className="inline-block ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </a>
            ))}
            
            {/* Enhanced Mobile CTA Button */}
            <div className="pt-4 border-t border-gray-700/50">
              <button 
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;