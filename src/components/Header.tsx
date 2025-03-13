import React, { useEffect, useState } from 'react';
import { DownloadCloudIcon, Github, Linkedin, Mail, Phone, Scroll } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

const Header = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setContact(data.contact));
  }, []);

  if (!contact) {
    return null;
  }
  return (
    <header className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            INZAMUL HOQUE
          </h1>
          <p className="text-2xl md:text-2xl text-slate-300 mb-8">
            Software Engineer | Backend Developer | AI/ML Enthusiast
          </p>
          <div className="flex justify-center gap-4">
            <a href={contact.github} className="p-2 hover:text-blue-400 transition-colors">
              <Github size={24} />
            </a>
            <a href={contact.linkedin} className="p-2 hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${contact.email}`} className="p-2 hover:text-blue-400 transition-colors">
              <Mail size={24} />
            </a>
            <a href={`tel:${contact.phone}`} className="p-2 hover:text-blue-400 transition-colors">
              <Phone size={24} />
            </a>
          </div>
        </div>
        <div className="text-center mt-12 text-lg">
              <a
                href="/resume.pdf"
                download="Inzamul_Hoque_Resume.pdf"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:bg-blue-600 hover:text-white text-white px-6 py-3 rounded-lg transition-colors transition duration-300"
              >
                <DownloadCloudIcon size={20} />
                Download Resume
              </a>
            <ScrollIndicator />
            </div>
      </div>
      
    </header>
  );
};

export default Header;