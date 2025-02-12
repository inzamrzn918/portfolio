import React from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Associate Software Engineer",
    company: "Kanaka Software Consulting Pvt. Ltd",
    location: "Pune, Maharashtra",
    duration: "July 2022 - Present",
    responsibilities: [
      "Engineered robust backend REST APIs using Django, FastAPI, and Golang, supporting enterprise-grade web applications.",
      "Automated email attachment processing with Python, integrated with PostgreSQL databases, and visualized results in PowerBI, saving 90% of manual effort.",
      "Built a Python GUI tool to streamline deployment pipelines, reducing DevOps dependency by ~80%.",
      "Designed and implemented a Golang-based log processor, reducing build revert rates by up to 99%.",
      "Single-handedly set up and deployed applications on Windows and Linux servers.",
      "Developed shell scripts and CI/CD to automate ~100% of deployment process with AWS and AZURE on Debian server.",
      "Single-handedly set up and deployed a complete backend application using FastAPI, Alembic, SQL Server, and Docker.",
      "Developed a Python script to collect IoT data via BACnet, store in a time-series DB, and apply business logic."
    ]
  },
  {
    title: "Trainee Software Engineer",
    company: "Kanaka Software Consulting Pvt. Ltd",
    location: "Pune, Maharashtra",
    duration: "Feb 2022 – June 2022",
    responsibilities: [
      "Engineered backend solutions using Django to support full-stack applications.",
      "Developed the required solution using Angular, ensuring seamless functionality and user experience.",
      "Automated data migration from CSV/Excel to PostgreSQL using Python, improving accessibility and reducing migration time."
    ]
  }
];

const Experience = () => {
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