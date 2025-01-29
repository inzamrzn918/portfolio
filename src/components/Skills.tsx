import React from 'react';
import { Code, Database, Cloud, GitBranch, Computer, ExpandIcon } from 'lucide-react';

const Skills = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Code size={20} /> Programming & Frameworks
            </h3>
            <div className="flex gap-2 pt-2 mt-2 border-t">
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Python</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Django</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">FastAPI</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Golang</span>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Database size={20} /> Databases
            </h3>
            <div className="flex gap-2 pt-2 mt-2 border-t">
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">PostgreSQL</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">MySQL</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">MongoDB</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">SQLServer</span>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Cloud size={20} /> Cloud Platforms
            </h3>
            <div className="flex gap-2 pt-2 mt-2 border-t items-center">  
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">AWS</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Azure</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">VPS</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Shared</span>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <GitBranch size={20} /> Automation & Tools
            </h3>
            <div className="flex gap-2 pt-2 mt-2 border-t items-center">  
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Git</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">CI/CD</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">PowerBI</span>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <ExpandIcon size={20} /> Additional Tools
            </h3>
            <div className="flex gap-2 pt-2 mt-2 border-t items-center">  
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Apache</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Nginx</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Tomcat</span>
            </div>
          </div>
          {/* <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Computer size={20} /> UI
            </h3>
            <div className="flex gap-2 pt-2 mt-2 border-t items-center">  
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">Angular</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">TailwindCSS</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Skills;