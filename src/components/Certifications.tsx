import React, { useEffect, useState } from 'react';
import { PiCertificateBold } from 'react-icons/pi';
import { ExternalLink, Calendar, Award } from 'lucide-react';

interface Certification {
  title: string;
  institution: string;
  year: string;
  link: { [key: string]: string };
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setCertifications(data.certifications);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching certifications data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {certifications.map((cert, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={`${cert.title}-${index}`}
                className={`group bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border relative overflow-hidden ${
                  isHovered 
                    ? 'border-blue-500/50 shadow-blue-500/20' 
                    : 'border-slate-700/50 hover:border-blue-500/30'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 space-y-6">
                  {/* Certificate icon */}
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-2xl transition-all duration-300 ${
                      isHovered 
                        ? 'bg-blue-500/30 text-blue-400' 
                        : 'bg-blue-500/20 text-blue-500 group-hover:bg-blue-500/25'
                    }`}>
                      <PiCertificateBold className='text-4xl' />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {cert.title}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">{cert.institution}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{cert.year}</span>
                    </div>
                  </div>

                  {/* Hover overlay with verification links */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90 flex items-center justify-center rounded-3xl transition-all duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    <div className="text-center space-y-6 p-6">
                      <h4 className="text-2xl font-bold text-white mb-4">Verify Certificate</h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(cert.link).map(([key, url], i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <ExternalLink size={18} />
                            {key}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover effect indicator */}
                  <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
                    isHovered ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;