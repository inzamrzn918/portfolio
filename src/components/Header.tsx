import { useState, useEffect } from 'react';
import { DownloadCloudIcon, Github, Linkedin, Mail, Phone, Bot, BotMessageSquareIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import ScrollIndicator from './ScrollIndicator';

interface ContactData {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

interface HeaderData {
  contact: ContactData;
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<HeaderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 100);
      })
      .catch((error) => {
        console.error('Error fetching header data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <header className="min-h-screen flex items-center justify-center relative">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
        </div>
      </header>
    );
  }

  if (!data) {
    return (
      <header className="min-h-screen flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 mb-4">Failed to load header data</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Main heading with enhanced typography and entrance animation */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-tight hover:scale-105 transition-transform duration-500">
              INZAMUL HOQUE
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Subtitle with enhanced styling and entrance animation */}
          <p className={`text-xl md:text-3xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Senior Software Engineer | Gen AI Developer | AI/ML Developer
          </p>

          {/* Social links with enhanced hover effects and entrance animation */}
          <div className={`flex justify-center gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { icon: Github, href: data.contact.github, color: 'hover:text-gray-800 dark:hover:text-gray-200', label: 'GitHub' },
              { icon: Linkedin, href: data.contact.linkedin, color: 'hover:text-blue-600', label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${data.contact.email}`, color: 'hover:text-red-500', label: 'Email' },
              { icon: Phone, href: `tel:${data.contact.phone}`, color: 'hover:text-green-500', label: 'Phone' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${item.color} group relative`}
                title={item.label}
                aria-label={item.label}
              >
                <item.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:animate-bounce" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </div>
              </a>
            ))}
          </div>

          {/* Action buttons with enhanced styling and entrance animation */}
          <div className={`flex flex-wrap justify-center gap-6 pt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a
              href="/resume.pdf"
              download="Inzamul_Hoque_Resume.pdf"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 font-semibold text-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <DownloadCloudIcon className="w-6 h-6 group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Resume</span>
            </a>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-gray-800 dark:text-white px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-lg border border-white/20 hover:border-white/40 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Mail className="w-6 h-6 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10">Hire Me</span>
            </button>

            <button
              onClick={() => navigate('/chat')}
              className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-gray-800 dark:text-white px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-lg border border-white/20 hover:border-white/40 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <BotMessageSquareIcon className="w-6 h-6 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10">Chat Now</span>
            </button>
          </div>
        </div>

        {/* Enhanced ScrollIndicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center" style={{ bottom: "5vh" }}>
          <ScrollIndicator />
        </div> */}
      </div>

      {/* Enhanced Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center space-y-6 p-2">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            I'm available for freelance work and full-time positions.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${data.contact.email}`}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold group"
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              {data.contact.email}
            </a>
            <a
              href={`tel:${data.contact.phone}`}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 font-semibold group"
            >
              <Phone className="w-5 h-5 group-hover:animate-pulse" />
              {data.contact.phone}
            </a>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;