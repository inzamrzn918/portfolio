import React from 'react';

const Education = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Master of Computer Applications</h3>
            <p className="text-slate-300 mb-2">Assam Science & Technology University – Guwahati, Assam</p>
            <p className="text-slate-400 mb-4">2022</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Final Project: Leave Management System (Django, Angular); graded 10/10 by the university.</li>
              <li>CGPA: 8.82/10</li>
            </ul>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Bachelor of Computer Applications</h3>
            <p className="text-slate-300 mb-2">Gauhati University – Guwahati, Assam</p>
            <p className="text-slate-400 mb-4">2018</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Final Project: United India Insurance Website Clone (PHP, MySQL, jQuery, HTML, CSS).</li>
              <li>CGPA: 6.6/10</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;