import React, { useEffect, useState } from 'react';
import { Mail, Phone, MessageCircle, Send, MapPin, Clock, Users } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactInfo {
  email: string;
  phone: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false
  });

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setContact(data.contact);
        setIsLoading(false);
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 100);
      })
      .catch((error) => {
        console.error('Error fetching contact data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: null, success: false });

    // console.log('Sending email with the following data:', formData);
    // console.log(import.meta.env);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          from_email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString()
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID_AUTO_REPLY!,
        {
          name: formData.name,
          email: formData.email
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setFormStatus({ loading: false, error: null, success: true });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus({ 
        loading: false, 
        error: error?.toString() || 'Failed to send message. Please try again later.', 
        success: false 
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-800 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
        </div>
      </section>
    );
  }

  if (!contact) {
    return (
      <section className="py-20 bg-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-400 mb-4">Failed to load contact data</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8 animate-pulse"></div>
            <p className="text-slate-300 text-xl leading-relaxed max-w-3xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. 
              Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          {/* Enhanced Contact Stats */}
          {/* <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">10+</h3>
              <p className="text-gray-400">Happy Clients</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
              <p className="text-gray-400">Support Available</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-2xl border border-pink-500/20">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Remote</h3>
              <p className="text-gray-400">Worldwide Service</p>
            </div>
          </div> */}

          {/* Enhanced Contact methods */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Enhanced Email contact */}
            <div className="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-8 rounded-2xl border border-slate-600/30 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="p-4 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/30 transition-colors duration-300 group-hover:scale-110">
                  <Mail className="w-12 h-12 text-blue-400 group-hover:animate-bounce" />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-bold text-white">Email Me</h3>
                  <p className="text-slate-300">Perfect for detailed project discussions</p>
                  <p className="text-blue-400 font-mono text-lg group-hover:text-blue-300 transition-colors duration-300">{contact.email}</p>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    hoveredButton === 'email'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white'
                  }`}
                  onMouseEnter={() => setHoveredButton('email')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Send className="w-5 h-5 group-hover:animate-pulse" />
                  Send Email
                </a>
              </div>
            </div>

            {/* Enhanced Phone contact */}
            <div className="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-8 rounded-2xl border border-slate-600/30 hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="p-4 bg-green-500/20 rounded-2xl group-hover:bg-green-500/30 transition-colors duration-300 group-hover:scale-110">
                  <Phone className="w-12 h-12 text-green-400 group-hover:animate-bounce" />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-bold text-white">Call Me</h3>
                  <p className="text-slate-300">Great for quick questions and calls</p>
                  <p className="text-green-400 font-mono text-lg group-hover:text-green-300 transition-colors duration-300">{contact.phone}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    hoveredButton === 'phone'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white'
                  }`}
                  onMouseEnter={() => setHoveredButton('phone')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Phone className="w-5 h-5 group-hover:animate-bounce" />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Additional info */}
          <div className={`bg-gradient-to-r from-slate-700/30 to-slate-800/30 p-8 rounded-2xl border border-slate-600/30 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-purple-400 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Let's Connect</h3>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto text-center">
              Whether you have a project in mind, want to discuss potential collaborations, 
              or just want to say hello, I'd love to hear from you. 
              I'm always open to new opportunities and interesting conversations.
            </p>
            
            {/* Enhanced Quick Contact Form */}
            <form onSubmit={handleSubmit} className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
              <h4 className="text-xl font-semibold text-white mb-4 text-center">Quick Message</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
                />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
                />
              </div>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                required
                rows={3}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors duration-300 resize-none"
              ></textarea>
              <div className="text-center mt-4">
                <button 
                  type="submit"
                  disabled={formStatus.loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus.error && <p className="mt-2 text-red-400">{formStatus.error}</p>}
                {formStatus.success && <p className="mt-2 text-green-400">Message sent successfully!</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;