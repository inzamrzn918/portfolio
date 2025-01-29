import React from 'react';

const Experience = () => {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Experience</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-400">Associate Software Engineer</h3>
            <p className="text-slate-300 mb-2">Kanaka Software Consulting Pvt. Ltd – Pune, Maharashtra</p>
            <p className="text-slate-400 mb-4">July 2022 - Present</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Engineered robust backend REST APIs using Django, FastAPI, and Golang, supporting enterprise-grade web applications.</li>
              <li>Automated email attachment processing with Python, integrated with PostgreSQL databases, and visualized results in PowerBI, saving 90% of manual effort.</li>
              <li>Built a Python GUI tool to streamline deployment pipelines, reducing DevOps dependency by ~80%.</li>
              <li>Designed and implemented a Golang-based log processor, reducing build revert rates by up to 99%.</li>
              <li>Single-handedly set up and deployed applications on Windows and Linux servers.</li>
              <li>Developed shell scripts and CI/CD to automate ~100% of deployment process with AWS and AZURE on Debian server.</li>
              <li>Single-handedly set up and deployed a complete backend application using FastAPI, Alembic, SQL Server, and Docker.</li>
              <li>Developed a Python script to collect IoT data via BACnet, store in a time-series DB, and apply business logic.</li>
            </ul>
          </div>
          <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-400">Trainee Software Engineer</h3>
            <p className="text-slate-300 mb-2">Kanaka Software Consulting Pvt. Ltd – Pune, Maharashtra</p>
            <p className="text-slate-400 mb-4">Feb 2022 – June 2022</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Engineered backend solutions using Django to support full-stack applications.</li>
              <li>Developed the required solution using Angular, ensuring seamless functionality and user experience.</li>
              <li>Automated data migration from CSV/Excel to PostgreSQL using Python, improving accessibility and reducing migration time.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;