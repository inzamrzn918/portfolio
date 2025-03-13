import React, { useEffect, useState } from 'react';
import { PiCertificateBold } from 'react-icons/pi';

interface Certification {
  title: string;
  institution: string;
  year: string;
  link: { [key: string]: string };
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setCertifications(data.certifications));
  }, []);

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
              <PiCertificateBold className='text-xl text-center' />
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