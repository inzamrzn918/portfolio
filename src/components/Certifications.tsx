import React, { useState } from 'react';
import { PiCertificateBold } from 'react-icons/pi';

const certifications = [
  {
    title: "Python for Machine Learning with Numpy, Pandas & Matplotlib",
    institution: "Udemy",
    year: "2024",
    link: { "Verify": "https://www.youracclaim.com/badges/1b7b3b7b-7b7b-4b7b-8b7b-7b7b7b7b7b7b" }
  },
  {
    title: "Complete JAVA Bootcamp: Go from zero to hero with Spring",
    institution: "Udemy",
    year: "2023",
    link: { "Verify": "https://udemy-certificate.s3.amazonaws.com/pdf/UC-ebc46519-56f6-47ba-a6a0-97a897f365b8.pdf" }
  },
  {
    title: "Flask Tutorial Step by Step",
    institution: "Udemy",
    year: "2023",
    link: { "Verify": "https://www.udemy.com/certificate/UC-15ad315f-db49-4491-b0e4-8b2f3894ef15" }
  },
  {
    title: "Python & Django Framework Course: The Complete Guide",
    institution: "Udemy",
    year: "2022",
    link: { "Verify": "https://udemy-certificate.s3.amazonaws.com/pdf/UC-eefc88ee-be4c-4a96-8397-8c2b392ac10c.pdf" }
  },
  {
    title: "Android Daily Shopping List App Using Firebase(Project base)",
    institution: "Udemy",
    year: "2020",
    link: { "Verify": "https://udemy-certificate.s3.amazonaws.com/pdf/UC-8c296511-608b-4320-a542-1980f39e58d1.pdf" }
  }
];

const Certifications = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-100">Certifications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg p-8 shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <PiCertificateBold  className='text-xl text-center'/>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                 {cert.title}
              </h3>
              <p className="text-gray-400">{cert.institution}</p>
              <p className="text-gray-400">{cert.year}</p>
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center rounded-lg">
                  {Object.entries(cert.link).map(([key, url], i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-400 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-500 transition-colors mr-4"
                    >
                      {key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;