import React, { useEffect, useState } from 'react';
import { Coffee, Github, Linkedin, Mail, Phone, Heart, ArrowUp, Sparkles } from 'lucide-react';

interface ContactData {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

interface FooterData {
  contact: ContactData;
}

const Footer = () => {
  const [data, setData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

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
        console.error('Error fetching footer data:', error);
        setIsLoading(false);
      });
  }, []);

  // Replace the existing useEffect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled more than 100vh (one full viewport height)
      const scrollThreshold = window.innerHeight;
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButton(currentScroll > scrollThreshold);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <footer className="bg-gray-900 text-white py-12 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
        </div>
      </footer>
    );
  }

  if (!data) {
    return (
      <footer className="bg-gray-900 text-white py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg text-red-400 mb-2">Failed to load footer data</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </footer>
    );
  }

  const socialLinks = [
    { 
      icon: Github, 
      href: data.contact.github, 
      label: 'GitHub',
      color: 'hover:text-gray-300 hover:bg-gray-800',
      iconColor: 'text-gray-400'
    },
    { 
      icon: Linkedin, 
      href: data.contact.linkedin, 
      label: 'LinkedIn',
      color: 'hover:text-blue-400 hover:bg-blue-900/20',
      iconColor: 'text-gray-400'
    },
    { 
      icon: Mail, 
      href: `mailto:${data.contact.email}`, 
      label: 'Email',
      color: 'hover:text-red-400 hover:bg-red-900/20',
      iconColor: 'text-gray-400'
    },
    { 
      icon: Phone, 
      href: `tel:${data.contact.phone}`, 
      label: 'Phone',
      color: 'hover:text-green-400 hover:bg-green-900/20',
      iconColor: 'text-gray-400'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Enhanced Brand section */}
              <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-blue-500/25">
                    <span className="text-2xl font-bold text-white">IH</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300">
                      Inzamul Hoque
                    </h3>
                    <p className="text-gray-400 text-sm">Senior Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed max-w-sm">
                  Dedicated backend developer with expertise in Python, Go, and cloud technologies. 
                  Passionate about creating scalable solutions and driving innovation.
                </p>
                
                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-xl font-bold text-blue-400">3+</div>
                    <div className="text-xs text-gray-400">Years</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-xl font-bold text-purple-400">10+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick links */}
              <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-300 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block transform group"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                          {item}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enhanced Contact info */}
              <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  Get In Touch
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300 group">
                    <Mail className="w-5 h-5 text-blue-400 group-hover:animate-bounce transition-all duration-300" />
                    <span className="text-sm group-hover:text-blue-300 transition-colors duration-300">{data.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 group">
                    <Phone className="w-5 h-5 text-green-400 group-hover:animate-pulse transition-all duration-300" />
                    <span className="text-sm group-hover:text-green-300 transition-colors duration-300">{data.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 group">
                    <div className="w-5 h-5 text-purple-400 flex items-center justify-center group-hover:animate-pulse transition-all duration-300">
                      📍
                    </div>
                    <span className="text-sm group-hover:text-purple-300 transition-colors duration-300">{data.contact.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Social links and copyright */}
          <div className="border-t border-gray-700/50 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Enhanced Social links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 group ${social.color}`}
                    onMouseEnter={() => setHoveredIcon(social.label)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    title={social.label}
                    aria-label={social.label}
                  >
                    <social.icon className={`w-6 h-6 ${hoveredIcon === social.label ? 'animate-pulse' : ''} group-hover:animate-bounce`} />
                  </a>
                ))}
              </div>

              {/* Enhanced Copyright */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {new Date().getFullYear()} Inzamul Hoque. All rights reserved.</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> 
                  and <Coffee className="w-4 h-4 text-yellow-500 group-hover:animate-spin transition-all duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Back to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 
          hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl 
          hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 z-50 
          ${showScrollButton ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 mx-auto group-hover:animate-bounce" />
        </button>
      )}
    </footer>
  );
};

export default Footer;