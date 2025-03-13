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
    link: { Visit: "https://yourevp.com" }
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
    link: { Visit: "https://snap.waivit.net" }
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
  },
  {
    title: "Attendance Record Using Machine Learning along with emotions",
    technologies: "Python, Flask, SQlite, Git, Machine Learning, OpenCV, TensorFlow, Keras",
    description: [
      "Developed a facial recognition system using OpenCV and deep learning.",
      "Integrated the system with a Flask web application to record attendance.",
      "Trained the model using TensorFlow and Keras to detect emotions and attendance."
    ],
    link: { Visit: "https://github.com/inzamrzn918/Attendance-Record-Using-Machine-Learning" }
  },
  {
    title: "Leave Management System",
    technologies: "Django, Django REST framework, PostgreSQL, Angular, Bootstrap",
    description: [
      "Developed a full-stack application for managing employee leaves.",
      "Implemented role-based access control for users and managers.",
      "Designed a user-friendly interface using Angular and Bootstrap.",
      "Integrated Django REST framework for API development."
    ],
    link: {
      Frontend: "https://github.com/inzamrzn918/Leave-Management-System-Frontend",
      Backend: "https://github.com/inzamrzn918/Leave-Management-System-Backend"
    }
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
                    // Create a link for each key-value pair in the link object
                    Object.entries(project.link).map(([text, url], i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-400 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-500 transition-colors mr-4"
                      >
                        {text}
                      </a>

                     )
                  )) : (
                    <p className="text-red-600 text-xl">Confidential project</p>
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