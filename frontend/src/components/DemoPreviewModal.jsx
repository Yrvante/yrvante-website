import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Clock, Star, Calendar, Globe, ChevronRight, Dog, Sparkles, Check } from 'lucide-react';

// Demo Preview Modal Component
const DemoPreviewModal = ({ isOpen, onClose, packageType }) => {
  if (!isOpen) return null;

  const demos = {
    basis: <BasisDemo onClose={onClose} />,
    pro: <ProDemo onClose={onClose} />,
    premium: <PremiumDemo onClose={onClose} />
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-screen py-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="fixed top-6 right-6 z-50 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              {demos[packageType]}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================
// BASIS DEMO - Honden Uitlaat Service
// ============================================
const BasisDemo = ({ onClose }) => {
  return (
    <div className="bg-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dog className="text-amber-600" size={28} />
            <span className="font-bold text-xl">Blije Pootjes</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-amber-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-amber-600">Over Ons</a>
            <a href="#" className="text-gray-600 hover:text-amber-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Uw hond verdient de beste zorg
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Professionele hondenuitlaatservice in uw buurt. Elke dag een blije hond!
            </p>
            <a href="#contact" className="inline-block bg-amber-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-600 transition-colors">
              Neem Contact Op
            </a>
          </div>
          <div className="bg-amber-200 rounded-3xl h-64 md:h-80 flex items-center justify-center">
            <Dog size={120} className="text-amber-600" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Onze Diensten</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Dagelijkse Wandeling', desc: '30-60 min wandeling' },
              { title: 'Groepswandeling', desc: 'Sociaal & leuk' },
              { title: 'Puppy Zorg', desc: 'Extra aandacht' }
            ].map((service, i) => (
              <div key={i} className="text-center p-6 bg-amber-50 rounded-2xl">
                <Dog className="mx-auto mb-4 text-amber-500" size={40} />
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Phone className="text-amber-500" size={20} />
                <span>06 12345678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-amber-500" size={20} />
                <span>info@blijepootjes.nl</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-amber-500" size={20} />
                <span>Amsterdam en omgeving</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Blije Pootjes - Hondenuitlaatservice</p>
        </div>
      </footer>

      {/* Package Info Banner */}
      <div className="bg-amber-500 text-white py-4 px-6 text-center">
        <p className="font-semibold">BASIS PAKKET - €399 | 3 pagina's | Responsive Design | Basis Contact</p>
      </div>
    </div>
  );
};

// ============================================
// PRO DEMO - Schoonmaakbedrijf
// ============================================
const ProDemo = ({ onClose }) => {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles size={32} />
            <div>
              <span className="font-bold text-xl block">CleanPro</span>
              <span className="text-blue-200 text-xs">Professionele Schoonmaak</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-200 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Diensten</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Portfolio</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Blog</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:block bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors">
            Offerte Aanvragen
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-blue-500 px-4 py-1 rounded-full text-sm mb-4 inline-block">⭐ #1 Schoonmaakbedrijf</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Een schoon kantoor, een productief team
            </h1>
            <p className="text-blue-100 mb-8 text-lg">
              Professionele schoonmaakdiensten voor kantoren, winkels en bedrijfspanden. 
              Betrouwbaar, grondig en altijd op tijd.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Gratis Offerte
              </a>
              <a href="#diensten" className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Onze Diensten
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <span className="text-4xl font-bold">500+</span>
              <p className="text-blue-200 text-sm">Tevreden Klanten</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <span className="text-4xl font-bold">15+</span>
              <p className="text-blue-200 text-sm">Jaar Ervaring</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <span className="text-4xl font-bold">24/7</span>
              <p className="text-blue-200 text-sm">Beschikbaar</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <span className="text-4xl font-bold">100%</span>
              <p className="text-blue-200 text-sm">Tevredenheid</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="diensten" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Onze Diensten</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Wat wij voor u kunnen doen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Kantoor Schoonmaak', desc: 'Dagelijkse of wekelijkse schoonmaak van kantoorruimtes', icon: '🏢' },
              { title: 'Glazenwassen', desc: 'Streepvrije ramen voor een helder uitzicht', icon: '🪟' },
              { title: 'Vloeronderhoud', desc: 'Professionele reiniging en onderhoud van alle vloertypes', icon: '✨' },
              { title: 'Dieptereiniging', desc: 'Grondige eenmalige schoonmaak', icon: '🧹' },
              { title: 'Sanitair', desc: 'Hygiënische toiletten en badkamers', icon: '🚿' },
              { title: 'Specialistisch', desc: 'Tapijt, stoffering en meer', icon: '🛋️' }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
                <a href="#" className="text-blue-600 font-semibold mt-4 inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Meer info <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Recent Werk</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {['Kantoor Amsterdam', 'Winkel Rotterdam', 'Hotel Den Haag'].map((project, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 h-64">
                <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="font-bold text-xl">{project}</h3>
                    <p className="text-blue-200">Bekijk project →</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold">
                  {project}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Laatste Nieuws</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: '5 Tips voor een Schoon Kantoor', date: '15 maart 2025' },
              { title: 'Waarom Professionele Schoonmaak Loont', date: '10 maart 2025' }
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <h3 className="font-bold text-xl mt-2 mb-3">{post.title}</h3>
                  <a href="#" className="text-blue-600 font-semibold inline-flex items-center gap-2">
                    Lees meer <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Vraag een Gratis Offerte Aan</h2>
            <p className="text-blue-200 mt-4">Binnen 24 uur reactie gegarandeerd</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-gray-900">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Uw naam" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
              <input type="email" placeholder="E-mailadres" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
              <input type="tel" placeholder="Telefoonnummer" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
              <input type="text" placeholder="Bedrijfsnaam" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
            </div>
            <textarea placeholder="Uw bericht..." rows={4} className="w-full mt-6 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none resize-none"></textarea>
            <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Verstuur Aanvraag
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={24} />
              <span className="font-bold text-xl">CleanPro</span>
            </div>
            <p className="text-gray-400 text-sm">Professionele schoonmaakdiensten voor elk bedrijf.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Diensten</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Kantoor Schoonmaak</li>
              <li>Glazenwassen</li>
              <li>Vloeronderhoud</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Bedrijf</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Over Ons</li>
              <li>Portfolio</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>info@cleanpro.nl</li>
              <li>020 123 4567</li>
              <li>Amsterdam</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2025 CleanPro - Alle rechten voorbehouden
        </div>
      </footer>

      {/* Package Info Banner */}
      <div className="bg-blue-600 text-white py-4 px-6 text-center">
        <p className="font-semibold">PRO PAKKET - €699 | 10 pagina's | SEO | Blog | Portfolio | Contactformulier</p>
      </div>
    </div>
  );
};

// ============================================
// PREMIUM DEMO - Nagel Beauty Studio
// ============================================
const PremiumDemo = ({ onClose }) => {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Luxe Nails</span>
              <span className="text-gray-400 text-xs block">Beauty Studio</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Behandelingen</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Gallerij</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Reviews</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Blog</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Globe size={16} className="text-gray-400" />
              <span>NL</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-400">EN</span>
            </div>
            <a href="#boeken" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all">
              Boek Nu
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm mb-6">
                <Star size={14} fill="currentColor" /> 4.9 Sterren op Google
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 bg-clip-text text-transparent">
                  Perfecte Nagels,
                </span>
                <br />
                <span className="text-gray-900">Perfecte Jij</span>
              </h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Ontdek de ultieme nail art ervaring in onze luxe studio. 
                Van klassieke manicures tot artistieke designs - wij maken jouw droomnagels werkelijkheid.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#boeken" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-pink-500/30 transition-all inline-flex items-center gap-2">
                  <Calendar size={18} /> Afspraak Maken
                </a>
                <a href="#behandelingen" className="border-2 border-pink-200 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-colors">
                  Bekijk Behandelingen
                </a>
              </div>
            </motion.div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-3xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-pink-200 to-rose-300 rounded-3xl h-96 flex items-center justify-center">
              <Sparkles size={100} className="text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="text-green-600" size={24} />
                </div>
                <div>
                  <span className="font-semibold block">Online Boeken</span>
                  <span className="text-gray-500 text-sm">24/7 Beschikbaar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="behandelingen" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Onze Behandelingen</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Luxe Nail Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Van natuurlijke elegantie tot gedurfde statement nails - ontdek onze premium behandelingen</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Gel Manicure', price: '€45', time: '60 min', color: 'from-pink-400 to-pink-500' },
              { name: 'Acryl Nagels', price: '€65', time: '90 min', color: 'from-rose-400 to-rose-500' },
              { name: 'Nail Art', price: '€25+', time: '30+ min', color: 'from-fuchsia-400 to-fuchsia-500' },
              { name: 'Luxe Spa', price: '€85', time: '120 min', color: 'from-purple-400 to-purple-500' }
            ].map((service, i) => (
              <div key={i} className="group">
                <div className={`bg-gradient-to-br ${service.color} rounded-3xl p-6 text-white mb-4 transform group-hover:scale-105 transition-transform`}>
                  <span className="text-white/60 text-sm">{service.time}</span>
                  <h3 className="font-bold text-xl mt-2">{service.name}</h3>
                  <p className="text-3xl font-bold mt-4">{service.price}</p>
                </div>
                <a href="#boeken" className="text-pink-500 font-semibold text-sm flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                  Boek Nu <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 px-6 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" alt="Google" className="h-6" />
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="font-semibold">4.9</span>
            </div>
            <h2 className="text-4xl font-bold">Wat Onze Klanten Zeggen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sophie V.', text: 'Absoluut de beste nagelsalon! De aandacht voor detail is geweldig.', rating: 5 },
              { name: 'Emma K.', text: 'Prachtige resultaten en super vriendelijk personeel. Kom hier al jaren!', rating: 5 },
              { name: 'Lisa M.', text: 'Online boeken is zo handig. Mijn nagels zijn altijd perfect!', rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full"></div>
                  <span className="font-semibold">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking System */}
      <section id="boeken" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Online Reserveren</span>
            <h2 className="text-4xl font-bold mt-4">Boek Jouw Afspraak</h2>
            <p className="text-gray-600 mt-4">Selecteer je gewenste behandeling en kies een beschikbare tijd</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Behandeling</label>
                <select className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:border-pink-500 outline-none bg-white">
                  <option>Gel Manicure - €45</option>
                  <option>Acryl Nagels - €65</option>
                  <option>Nail Art - vanaf €25</option>
                  <option>Luxe Spa Behandeling - €85</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Datum</label>
                <input type="date" className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:border-pink-500 outline-none bg-white" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Beschikbare Tijden</label>
              <div className="grid grid-cols-4 gap-3">
                {['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00'].map((time, i) => (
                  <button key={i} className={`py-3 rounded-xl text-sm font-semibold transition-all ${i === 2 ? 'bg-pink-500 text-white' : 'bg-white border border-pink-200 hover:border-pink-500'}`}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input type="text" placeholder="Je naam" className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:border-pink-500 outline-none bg-white" />
              <input type="tel" placeholder="Telefoonnummer" className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:border-pink-500 outline-none bg-white" />
            </div>
            <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-pink-500/30 transition-all">
              Bevestig Afspraak
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="font-bold text-xl">Luxe Nails</span>
              </div>
              <p className="text-gray-400">Premium nail art studio voor de moderne vrouw.</p>
              <div className="flex gap-4 mt-6">
                <Globe size={20} className="text-gray-400" />
                <span className="text-gray-400">NL | EN | DE</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Behandelingen</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Gel Manicure</li>
                <li>Acryl Nagels</li>
                <li>Nail Art</li>
                <li>Spa Behandelingen</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Over Ons</li>
                <li>Gallerij</li>
                <li>Blog</li>
                <li>Vacatures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><Phone size={16} /> 020 123 4567</li>
                <li className="flex items-center gap-2"><Mail size={16} /> info@luxenails.nl</li>
                <li className="flex items-center gap-2"><MapPin size={16} /> Amsterdam Centrum</li>
                <li className="flex items-center gap-2"><Clock size={16} /> Ma-Za: 9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2025 Luxe Nails Beauty Studio - Alle rechten voorbehouden
          </div>
        </div>
      </footer>

      {/* Package Info Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 text-center">
        <p className="font-semibold">PREMIUM PAKKET - €999 | 15 pagina's | Boekingssysteem | Google Reviews | Meertalig | Premium Design</p>
      </div>
    </div>
  );
};

export default DemoPreviewModal;
