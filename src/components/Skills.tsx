import React from 'react';
import { Code, Database, Cloud, GitBranch, ExpandIcon } from 'lucide-react';

const skills = [
  {
    category: "Programming Languages",
    icon: <Code size={20} />,
    items: ["Python", "Go", "JavaScript", "Java", "PHP"]
  },
  {
    category: "Frameworks",
    icon: <Database size={20} />,
    items: ["Django", "FastAPI", "Flask", "Django Rest Framework", "Gin","Mux"]
  },
  {
    category: "Libraries",
    icon: <Database size={20} />,
    items: ["Pandas", "Numpy", "Pytest", "Boto3", "OpenCV", "Matplotlib"]
  },
  {
    category: "Databases",
    icon: <Database size={20} />,
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "MS SQL Server"]
  },
  {
    category: "Cloud Platforms",
    icon: <Cloud size={20} />,
    items: ["AWS", "Azure", "VPS"]
  },
  {
    category: "Automation & Tools",
    icon: <GitBranch size={20} />,
    items: ["Git", "CI/CD pipelines", "Docker"]
  },
  {
    category: "Additional Tools",
    icon: <ExpandIcon size={20} />,
    items: ["Apache", "Nginx"]
  }
];

const Skills = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-100">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-8 shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                {skill.icon} {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2 pt-2 mt-2 border-t border-gray-700">
                {skill.items.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;