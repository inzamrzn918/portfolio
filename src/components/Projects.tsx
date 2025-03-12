import React, { useState } from 'react';

const projects = [
  {
    title: "SOM-Sobeys",
    technologies: "Python, FastAPI, MS SQL, React, Docker",
    description: [
      "Built a scalable, asynchronous architecture and high-performance REST APIs.",
      "Deployed securely on CyberArk Windows Server with Nginx load balancing.",
      "Implemented SSL, JWT, CORS, and rate limiting.",
      "Achieved 100% CI/CD automation for testing and deployments."
    ]
  },
  {
    title: "EVP - WAIVIT",
    technologies: "Go(mux), PostgreSQL, React, AWS, CI/CD, AI",
    description: [
      "Developed RESTful APIs using Go Mux, optimizing enterprise application performance.",
      "Automated deployment using CI/CD pipelines, achieving 100% automated test and deployments AWS.",
      "Integrated FOXY AI and AI Service to WAIVIT Application to generate an AI Report on a property.",
      "Designed the LENDSMART microservice to expose an API from VALTOOL."
    ],
    link: "https://yourevp.com"
  },
  {
    title: "EVP-VALTOOL",
    technologies: "Go(mux), PostgreSQL, Vue, AWS, CICD",
    description: [
      "Developed RESTful APIs using Go Mux, optimizing enterprise application performance.",
      "Automated deployment using CI/CD pipelines, achieving 100% automated test and deployments AWS.",
      "Integrated FOXY AI and AI Service to WAIVIT Application to generate an AI Report on a property.",
      "Designed the LENDSMART microservice to expose an API from VALTOOL."
    ],
    confidential: true
  },
  {
    title: "EVP-SNAP",
    technologies: "Go(mux), PostgreSQL, React-Native, AWS, CI/CD",
    description: [
      "Developed RESTful APIs using Go Mux, optimizing enterprise application performance.",
      "Automated deployment using CI/CD pipelines, achieving 100% automated test and deployments AWS.",
      "Integrated FOXY AI and AI Service to WAIVIT Application to generate an AI Report on a property.",
      "Designed the LENDSMART microservice to expose an API from VALTOOL."
    ],
    link: "https://snap.waivit.net"
  },
  {
    title: "EVP Dev Tool",
    technologies: "Python, TKinter, SQLite",
    description: [
      "Developed a Python-based GUI deployment tool, reducing DevOps dependency by 80%."
    ]
  },
  {
    title: "Quantuvos",
    technologies: "Python, Django, PostgreSQL, Angular",
    description: [
      "Engineered REST API using Django and Django Rest Frameworks.",
      "Developed a feature to migrate legacy data from Excel sheets to the application database.",
      "Contributed to the front end using Angular, improving UI functionality and user experience."
    ]
  }
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null as number | null);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Projects</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-8 shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl flex flex-col space-y-4 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 className="text-2xl font-bold text-gray-100 border-b border-gray-700 pb-2">{project.title}</h3>
              <p className="text-gray-400 text-lg">{project.technologies}</p>
              <ul className="list-none text-gray-300 space-y-2 text-md">
                {project.description.map((desc, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-green-400">✔</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center rounded-2xl">
                  {project.link ? (
                    <button
                      className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      Visit
                    </button>
                  ) : project.confidential ? (
                    <span className="text-red-500 font-semibold">Confidential</span>
                  ) : (
                    <span className="text-gray-400 font-semibold">No Link Available</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;