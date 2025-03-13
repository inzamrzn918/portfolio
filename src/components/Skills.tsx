import React, { useEffect, useState } from 'react';
import { Code, Database, Cloud, GitBranch, ExpandIcon } from 'lucide-react';

interface Skill {
  category: string;
  icon: string;
  items: string[];
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setSkills(data.skills));
  }, []);

  const iconMap: { [key: string]: React.ElementType } = {
    Code,
    Database,
    Cloud,
    GitBranch,
    ExpandIcon,
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <div key={index} className="bg-slate-800 rounded-lg p-8 shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <IconComponent size={20} /> {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2 pt-2 mt-2 border-t border-gray-700">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm">{item}</span>
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