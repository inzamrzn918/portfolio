import React from 'react';
import { Server, Database, Code2, Terminal, Brain } from 'lucide-react';

const About = () => {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">About Me</h2>
        <div className="max-w-5xl mx-auto">
          <p className="text-slate-300 leading-relaxed mb-6 text-justify text-lg">
            Dedicated Backend Developer with over 3 years of experience in designing and implementing scalable backend solutions. Proficient in Python-based frameworks such as Django and FastAPI, REST API development, and system automation. Skilled in leveraging Golang and cloud platforms like AWS to optimize backend processes and improve system performance. Adept at solving complex problems, delivering reliable solutions, and driving business value through technology.
          </p>
          <div className="flex flex-wrap justify-center gap-12 mt-12">
            <div className="text-center w-28">
              <Server className="w-12 h-12 mx-auto mb-2 text-blue-400" />
              <p className="text-white text-lg font-semibold">Backend</p>
            </div>
            <div className="text-center w-28">
              <Database className="w-12 h-12 mx-auto mb-2 text-blue-400" />
              <p className="text-white text-lg font-semibold">Databases</p>
            </div>
            {/* <div className="text-center w-28">
              <Code2 className="w-12 h-12 mx-auto mb-2 text-blue-400" />
              <p className="text-white text-lg font-semibold">Frontend</p>
            </div>
            <div className="text-center w-28">
              <Terminal className="w-12 h-12 mx-auto mb-2 text-blue-400" />
              <p className="text-white text-lg font-semibold">DevOps</p>
            </div> */}
            <div className="text-center w-28">
              <Brain className="w-12 h-12 mx-auto mb-2 text-blue-400" />
              <p className="text-white text-lg font-semibold">AI/ML</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;