import React, { useEffect, useState } from 'react';

interface Project {
  title: string;
  technologies: string;
  description: string[];
  link?: { [key: string]: string };
  confidential?: boolean;
}

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null as number | null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setProjects(data.projects));
  }, []);
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