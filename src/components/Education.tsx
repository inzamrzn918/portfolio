import React, { useEffect, useState } from 'react';

interface Education {
  title: string;
  institution: string;
  year: string;
  project: string;
  cgpa: string;
}

const Education = () => {
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setEducation(data.education));
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Education</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {education.map((edu, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-8 shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">{edu.title}</h3>
              <p className="text-gray-400">{edu.institution}</p>
              <p className="text-gray-400">{edu.year}</p>
              <p className="text-gray-300 mt-2">{edu.project}</p>
              <p className="text-gray-300 mt-2">{edu.cgpa}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
