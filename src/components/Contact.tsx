import React, { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';

interface ContactInfo {
  email: string;
  phone: string;
}

const Contact = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setContact(data.contact));
  }, []);

  if (!contact) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-slate-300 mb-8">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Mail size={20} />
              Email
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Phone size={20} />
              Call Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;