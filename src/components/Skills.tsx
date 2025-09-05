import React, { useEffect, useState } from 'react';
import { Code, Cloud, Database, Shield, Bell, Brain, GitBranch, FormInput, Server } from 'lucide-react';

interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

interface SkillsData {
  skills: SkillCategory[];
}

const Skills = () => {
  const [data, setData] = useState<SkillsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching skills data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section id="skills" className="min-h-screen py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="skills" className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 mb-4">Failed to load skills data</h2>
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

  // Map icon names to actual icon components with error handling
  const getIconComponent = (iconName: string) => {
    try {
      const iconMap: { [key: string]: any } = {
        'Code': Code,
        'Cloud': Cloud,
        'Database': Database,
        'GitBranch': GitBranch,
        'FormInput': FormInput,
        'Server': Server,
        'Brain': Brain
      };
      return iconMap[iconName] || Code;
    } catch (error) {
      console.error(`Error getting icon for ${iconName}:`, error);
      return Code;
    }
  };

  return (
    <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data.skills.map((category, idx) => {
            const IconComponent = getIconComponent(category.icon);
            const isHovered = hoveredCategory === idx;
            
            return (
              <div 
                key={`${category.category}-${idx}`}
                className={`group bg-gradient-to-br from-[#0f0627] to-[#1a0a3a] rounded-2xl p-8 border transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  isHovered 
                    ? 'border-blue-500/50 shadow-blue-500/20' 
                    : 'border-gray-700/30 hover:border-blue-500/30'
                }`}
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isHovered 
                      ? 'bg-blue-500/30 text-blue-400' 
                      : 'bg-blue-500/20 text-blue-500 group-hover:bg-blue-500/25'
                  }`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className={`text-xl font-bold transition-all duration-300 ${
                    isHovered 
                      ? 'text-blue-400' 
                      : 'text-blue-500 group-hover:text-blue-400'
                  }`}>
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 transform hover:scale-110 ${
                        isHovered
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : 'bg-gray-800/50 text-gray-300 border-gray-600/30 group-hover:bg-blue-500/10 group-hover:border-blue-500/20'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;