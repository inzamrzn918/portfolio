import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Header = () => {
  return (
    <header className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Inzamul Hoque
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            Software Engineer
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/inzamrzn918" className="p-2 hover:text-blue-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/inzamul" className="p-2 hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:inzamol@gmail.com" className="p-2 hover:text-blue-400 transition-colors">
              <Mail size={24} />
            </a>
            <a href="tel:+918402098761" className="p-2 hover:text-blue-400 transition-colors">
              <Phone size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;