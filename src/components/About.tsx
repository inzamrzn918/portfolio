import React, { useEffect, useState } from 'react';
import { Server, Database, Code2, Terminal, Brain, Sparkles } from 'lucide-react';

interface SkillsData {
  category: string;
  icon: string;
  items: string[];
}

interface AboutData {
  skills: SkillsData[];
}

const About = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section id="about" className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="about" className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 mb-4">Failed to load data</h2>
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

  // Extract skills by category with error handling
  const getSkillsByCategory = (categoryName: string) => {
    try {
      const category = data.skills.find(skill => skill.category === categoryName);
      return category ? category.items : [];
    } catch (error) {
      console.error(`Error getting skills for ${categoryName}:`, error);
      return [];
    }
  };

  const backendSkills = getSkillsByCategory('Programming Languages').concat(
    getSkillsByCategory('Frameworks').filter(item => 
      ['Django', 'FastAPI', 'Flask'].includes(item)
    )
  );

  const cloudDevOpsSkills = getSkillsByCategory('Cloud Platforms').concat(
    getSkillsByCategory('Automation & Tools')
  );

  const frontendSkills = getSkillsByCategory('Frontend');
  const aiMlSkills = getSkillsByCategory('Machine Learning');

  const skillCards = [
    {
      id: 'backend',
      title: 'Backend',
      icon: '⚡',
      color: 'blue',
      skills: backendSkills.slice(0, 6),
      description: 'Server-side development with Python frameworks'
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      icon: '☁️',
      color: 'purple',
      skills: cloudDevOpsSkills.slice(0, 6),
      description: 'Cloud infrastructure and automation'
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: '🎨',
      color: 'green',
      skills: frontendSkills.slice(0, 6),
      description: 'User interface and experience design'
    },
    {
      id: 'ai',
      title: 'AI/ML',
      icon: '🤖',
      color: 'pink',
      skills: aiMlSkills.slice(0, 6),
      description: 'Machine learning and artificial intelligence'
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About <span className="text-blue-500">Me</span>
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Enhanced About Text */}
          <div className={`space-y-8 text-gray-300 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Dedicated <span className="text-blue-400 font-semibold">Backend Developer</span> with over{' '}
                <span className="text-blue-500 font-bold">3+ years of experience</span> in designing and implementing scalable backend solutions.
              </p>
              <p className="text-lg leading-relaxed">
                Proficient in <span className="text-blue-400 font-semibold">Python-based frameworks</span> such as Django and FastAPI, 
                REST API development, and system automation.
              </p>
              <p className="text-lg leading-relaxed">
                Skilled in leveraging <span className="text-[#B66BFF] font-semibold">Golang and cloud platforms</span> like AWS to optimize 
                backend processes and improve system performance.
              </p>
              <p className="text-lg leading-relaxed">
                Adept at solving complex problems, delivering reliable solutions, and driving business value through technology.
              </p>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <div className="text-3xl font-bold text-blue-400">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-400">10+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Enhanced Skill Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {skillCards.map((card) => {
              const isHovered = hoveredCard === card.id;
              const colorClasses = {
                blue: 'border-blue-500/20 hover:border-blue-500/40 shadow-blue-500/20',
                purple: 'border-purple-500/20 hover:border-purple-500/40 shadow-purple-500/20',
                green: 'border-green-500/20 hover:border-green-500/40 shadow-green-500/20',
                pink: 'border-pink-500/20 hover:border-pink-500/40 shadow-pink-500/20'
              };
              
              const bgClasses = {
                blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/25',
                purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/25',
                green: 'bg-green-500/15 text-green-300 border-green-500/30 hover:border-green-500/50 hover:bg-green-500/25',
                pink: 'bg-pink-500/15 text-pink-300 border-pink-500/30 hover:border-pink-500/50 hover:bg-pink-500/25'
              };

              return (
                <div 
                  key={card.id}
                  className={`group bg-gradient-to-br from-[#0f0627] to-[#1a0a3a] p-6 rounded-2xl border transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${colorClasses[card.color as keyof typeof colorClasses]} ${isHovered ? 'scale-105' : ''}`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-${card.color}-500/20 rounded-lg group-hover:bg-${card.color}-500/30 transition-colors`}>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <div>
                      <h3 className={`text-${card.color}-400 text-lg font-semibold`}>{card.title}</h3>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.skills.map((skill, index) => (
                      <span 
                        key={`${skill}-${index}`} 
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${bgClasses[card.color as keyof typeof bgClasses]}`}
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
      </div>
    </section>
  );
};

export default About;