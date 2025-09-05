import React, { useEffect, useState } from 'react';
import { Github, Link, ExternalLink, Star, Eye, Code } from 'lucide-react';

interface Project {
  title: string;
  technologies: string;
  description: string[];
  link?: { [key: string]: string };
  confidential?: boolean;
}

interface ProjectsData {
  projects: Project[];
}

const Projects = () => {
  const [data, setData] = useState<ProjectsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        console.error('Error fetching projects data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section id="projects" className="min-h-screen py-20 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="projects" className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 mb-4">Failed to load projects data</h2>
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
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Explore my latest work showcasing innovative solutions and technical expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {data.projects.map((project, index) => {
            const isHovered = hoveredProject === index;
            const technologies = project.technologies.split(', ').map(tech => tech.trim());
            
            return (
              <div 
                key={`${project.title}-${index}`}
                className={`group bg-gradient-to-br from-[#0f0627] to-[#1a0a3a] rounded-3xl overflow-hidden border transition-all duration-700 transform hover:scale-105 hover:shadow-2xl ${
                  isHovered 
                    ? 'border-blue-500/50 shadow-blue-500/20' 
                    : 'border-gray-700/30 hover:border-blue-500/30'
                } transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="p-8 space-y-6">
                  {/* Enhanced Project Header */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300">
                      {project.title}
                    </h3>
                    {project.confidential || !project.link && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/30 animate-pulse">
                        Confidential
                      </span>
                    )}
                  </div>
                  
                  {/* Enhanced Description */}
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {project.description[0]}
                  </p>

                  {/* Enhanced Technologies Section */}
                  <div>
                    <h4 className="text-blue-400 text-lg font-semibold mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech, idx) => (
                        <span 
                          key={`${tech}-${idx}`}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 transform hover:scale-110 ${
                            isHovered
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/25'
                              : 'bg-gray-800/50 text-gray-300 border-gray-600/30 group-hover:bg-blue-500/10 group-hover:border-blue-500/20'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Key Highlights */}
                  <div>
                    <h4 className="text-blue-400 text-lg font-semibold mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Key Highlights
                    </h4>
                    <ul className="space-y-3">
                      {project.description.map((highlight, idx) => (
                        <li key={`${highlight}-${idx}`} className="text-gray-300 flex items-start gap-3 group/item">
                          <span className="text-blue-400 mt-1.5 flex-shrink-0 group-hover/item:animate-pulse">✓</span>
                          <span className="leading-relaxed group-hover/item:text-gray-200 transition-colors duration-200">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-700/30">
                    {project?.link && Object.keys(project?.link).length > 0 && (
                      Object.entries(project.link).map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group/btn ${
                            isHovered
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500/30'
                              : 'bg-gray-800/50 text-gray-300 border border-gray-600/30 hover:bg-blue-500/20 hover:border-blue-500/30'
                          }`}
                        >
                          <ExternalLink size={18} className="group-hover/btn:animate-bounce" />
                          {key}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in working together?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your project requirements and explore how we can bring your ideas to life with cutting-edge technology.
            </p>
            <button 
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;