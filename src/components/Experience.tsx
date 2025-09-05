import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Building } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

interface ExperienceData {
  experiences: Experience[];
}

const Experience = () => {
  const [data, setData] = useState<ExperienceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching experience data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section id="experience" className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="experience" className="py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 mb-4">Failed to load experience data</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-16">
          {data.experiences.map((exp, index) => {
            const isHovered = hoveredExperience === index;
            
            return (
              <div 
                key={`${exp.title}-${index}`}
                className={`relative pl-12 border-l-2 transition-all duration-500 ${
                  isHovered ? 'border-blue-500' : 'border-blue-400/50'
                }`}
                onMouseEnter={() => setHoveredExperience(index)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                {/* Timeline dot */}
                <div className={`absolute w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full left-[-13px] top-0 transition-all duration-300 ${
                  isHovered ? 'scale-125 shadow-lg shadow-blue-500/50' : 'scale-100'
                }`} />
                
                {/* Content card */}
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500 transform ${
                  isHovered ? 'scale-105 shadow-2xl shadow-blue-500/20' : 'scale-100'
                } border ${
                  isHovered ? 'border-blue-500/30' : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {exp.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Building className="w-5 h-5 text-blue-500" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-purple-500" />
                          <span>{exp.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-green-500" />
                          <span className="font-medium">{exp.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li 
                            key={`${responsibility}-${idx}`} 
                            className="text-gray-600 dark:text-gray-300 flex items-start gap-3 leading-relaxed"
                          >
                            <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;