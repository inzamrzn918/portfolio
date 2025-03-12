import React from 'react';

const Education = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Education</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[ 
            {
              title: "Master of Computer Applications",
              institution: "Assam Science & Technology University",
              year: "2022",
              project: "Final Project: Leave Management System (Django, Angular); graded 10/10 by the university.",
              cgpa: "CGPA: 8.82/10"
            },
            {
              title: "Bachelor of Computer Applications",
              institution: "Gauhati University",
              year: "2018",
              project: "Final Project: United India Insurance Website Clone (PHP, MySQL, jQuery, HTML, CSS).",
              cgpa: "CGPA: 6.6/10"
            }
          ].map((edu, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-8 shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl flex flex-col space-y-4">
              <h3 className="text-2xl font-bold text-gray-100 border-b border-gray-700 pb-2">{edu.title}</h3>
              <p className="text-gray-400 text-lg">{edu.institution}</p>
              <p className="text-gray-500 text-md">{edu.year}</p>
              <ul className="list-none text-gray-300 space-y-2 text-md">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">✔</span>
                  <span>{edu.project}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">✔</span>
                  <span>{edu.cgpa}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
