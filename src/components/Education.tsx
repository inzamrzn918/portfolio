import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

interface Education {
  title: string;
  institution: string;
  year: string;
  project: string;
  cgpa: string;
  technologies?: string;
}

const Education = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setEducation(data.education);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching education data:', error);
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
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {education.map((edu, index) => {
            const isHovered = hoveredCard === index;
            
            return (
              <div 
                key={`${edu.title}-${index}`}
                className={`group bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl 
                transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border ${
                  isHovered 
                    ? 'border-blue-500/50 shadow-blue-500/20' 
                    : 'border-slate-700/50 hover:border-blue-500/30'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="space-y-6">
                  {/* Header with icon */}
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-all duration-300 ${
                      isHovered 
                        ? 'bg-blue-500/30 text-blue-400' 
                        : 'bg-blue-500/20 text-blue-500 group-hover:bg-blue-500/25'
                    }`}>
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {edu.title}
                      </h3>
                      <p className="text-blue-400 font-medium">{edu.institution}</p>
                    </div>
                  </div>

                  {/* Year and CGPA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{edu.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">{edu.cgpa}</span>
                    </div>
                  </div>

                  {/* Project details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-500" />
                      <h4 className="text-lg font-semibold text-white">Final Project</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{edu.project}</p>
                    
                    {/* Technologies if available */}
                    {edu.technologies && (
                      <div className="pt-2">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Technologies Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.technologies.split(', ').map((tech, idx) => (
                            <span 
                              key={`${tech}-${idx}`}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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

export default Education;
