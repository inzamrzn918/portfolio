import React, { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}


const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[] | null>(null);
  useEffect(() => {
      fetch('/data.json')
        .then((response) => response.json())
        .then((data) => setExperiences(data.experience));
    }, []);
  
    if (!experiences) {
      return null;
    }
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Experience</h2>
        <div className="max-w-4xl mx-auto space-y-10">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <Briefcase className="text-blue-400 w-8 h-8" />
                <h3 className="text-2xl font-semibold text-blue-300">{exp.title}</h3>
              </div>
              <p className="text-gray-400">{exp.company} – {exp.location}</p>
              <p className="text-gray-500 text-sm mb-4">{exp.duration}</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
                {exp.responsibilities.map((task, idx) => (
                  <li key={idx} className="leading-relaxed">{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;