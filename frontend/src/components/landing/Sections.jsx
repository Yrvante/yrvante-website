import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../App";
import { Link } from "react-router-dom";
import { Phone, ClipboardList, Code, Rocket, Globe, ArrowRight, Cloud, Shield, Settings, Monitor, Smartphone, RefreshCw, ChevronLeft, ChevronRight, ChevronDown, Star } from "lucide-react";

export const ProcessSection = () => {
  const { language } = useLanguage();
  const steps = [
    { icon: Phone, label: language === 'nl' ? 'Kennismaking' : 'Introduction', desc: language === 'nl' ? 'Gratis gesprek over jouw wensen' : 'Free call about your wishes' },
    { icon: ClipboardList, label: 'Planning', desc: language === 'nl' ? 'Duidelijk plan en tijdlijn' : 'Clear plan and timeline' },
    { icon: Code, label: language === 'nl' ? 'Ontwerp & Code' : 'Design & Code', desc: language === 'nl' ? 'Jouw website wordt gebouwd' : 'Your website gets built' },
    { icon: Rocket, label: language === 'nl' ? 'Implementatie' : 'Implementation', desc: language === 'nl' ? 'Testen en finetunen' : 'Testing and fine-tuning' },
    { icon: Globe, label: 'Live!', desc: language === 'nl' ? 'Domein koppelen en online!' : 'Connect domain and go live!' },
  ];

  return (
    <section data-testid="process-section" className="py-24 lg:py-32 relative overflow-hidden bg-gray-50/80 dark:bg-neutral-900/50">
      <motion.div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} initial={{ y: 0 }} whileInView={{ y: -20 }} viewport={{ once: false }} transition={{ duration: 1.5, ease: "easeOut" }} />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">&nbsp;</p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter dark:text-white">{language === 'nl' ? 'HET PROCES' : 'THE PROCESS'}</h2>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-0 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="flex-1 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-6 text-center border border-gray-200/50 dark:border-neutral-700/50 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors group">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4"><step.icon size={22} strokeWidth={1.5} className="text-gray-500" /></div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-1">0{i + 1}</span>
                <h3 className="font-bold dark:text-white text-base mb-1">{step.label}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && <div className="hidden lg:flex items-center justify-center px-2"><ArrowRight size={20} className="text-gray-300" /></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExpertiseSection = () => {
  const { language } = useLanguage();
  const technologies = [
    { name: 'React', icon: Code, desc: language === 'nl' ? 'Moderne interfaces' : 'Modern interfaces' },
    { name: 'Python', icon: Monitor, desc: language === 'nl' ? 'Backend & automatisering' : 'Backend & automation' },
    { name: 'Node.js', icon: Settings, desc: 'Serverless & API\'s' },
    { name: language === 'nl' ? 'MKB Focus' : 'SMB Focus', icon: Globe, desc: language === 'nl' ? 'ZZP\'ers & kleine bedrijven' : 'Freelancers & small businesses' },
  ];
  const voordelen = [
    { icon: Rocket, title: language === 'nl' ? 'Uptime 99.9%' : 'Uptime 99.9%', desc: language === 'nl' ? 'Jouw website is altijd bereikbaar' : 'Your website is always accessible' },
    { icon: Phone, title: language === 'nl' ? 'Direct Contact' : 'Direct Contact', desc: language === 'nl' ? 'Rechtstreeks met de ontwikkelaar' : 'Directly with the developer' },
    { icon: Shield, title: language === 'nl' ? 'Code Eigendom' : 'Code Ownership', desc: language === 'nl' ? 'Jij bent 100% eigenaar' : 'You are 100% owner' },
  ];

  return (
    <section data-testid="expertise-section" className="py-24 lg:py-32 relative overflow-hidden">
      <motion.div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} initial={{ y: 0 }} whileInView={{ y: -15 }} viewport={{ once: false }} transition={{ duration: 2, ease: "easeOut" }} />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-20">
          <div className="col-span-12 lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">&nbsp;</p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter dark:text-white mb-8">EXPERTISE</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 overflow-hidden">
              {technologies.map((tech, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 dark:bg-neutral-800/60 rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500 transition-all duration-300 group min-w-0 hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center mb-2 sm:mb-3"><tech.icon size={18} strokeWidth={1.5} className="text-gray-500" /></div>
                  <h3 className="font-bold dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1 truncate">{tech.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs leading-tight truncate">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4">&nbsp;</p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter dark:text-white mb-8">{language === 'nl' ? 'VOORDELEN' : 'BENEFITS'}</h2>
            <div className="space-y-4">
              {voordelen.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-5 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl p-5 border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500 transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-md">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center flex-shrink-0"><v.icon size={22} strokeWidth={1.5} className="text-gray-500" /></div>
                  <div><h3 className="font-bold dark:text-white text-base mb-1">{v.title}</h3><p className="text-gray-500 dark:text-gray-400 text-sm">{v.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HostingSection = () => {
  const { language } = useLanguage();
  const features = [
    { icon: Cloud, title: language === 'nl' ? 'Snelle Hosting' : 'Fast Hosting', desc: language === 'nl' ? 'Je website draait op razendsnelle servers.' : 'Your website runs on blazing fast servers.' },
    { icon: Globe, title: language === 'nl' ? 'Domeinnaam' : 'Domain Name', desc: language === 'nl' ? 'Help bij het koppelen van jouw eigen domein.' : 'Help connecting your own domain.' },
    { icon: Shield, title: 'SSL Certificaat', desc: language === 'nl' ? 'Gratis SSL voor een veilige verbinding.' : 'Free SSL for a secure connection.' },
    { icon: Settings, title: language === 'nl' ? 'Beheerd Platform' : 'Managed Platform', desc: language === 'nl' ? 'Ik regel alles, jij hoeft niks te doen.' : 'I handle everything, you don\'t have to do anything.' },
  ];

  return (
    <section data-testid="hosting-section" className="py-24 lg:py-32 relative overflow-hidden bg-gray-50/80 dark:bg-neutral-900/50">
      <motion.div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '48px 48px' }} initial={{ y: 0 }} whileInView={{ y: -20 }} viewport={{ once: false }} transition={{ duration: 1.8, ease: "easeOut" }} />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-12 gap-4 mb-12">
          <div className="col-span-12 lg:col-span-4"><p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">&nbsp;</p></div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter dark:text-white">HOSTING</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg">{language === 'nl' ? 'Betrouwbare hosting en domeinnaam begeleiding. Alles wat je nodig hebt om online te zijn.' : 'Reliable hosting and domain name guidance. Everything you need to be online.'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-neutral-700/50 hover:border-gray-400 dark:hover:border-neutral-500 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center mb-5"><f.icon size={22} strokeWidth={1.5} className="text-gray-500" /></div>
              <h3 className="text-lg font-bold dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/onderhoud" className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Meer over hosting →' : 'More about hosting →'}</Link>
        </div>
      </div>
    </section>
  );
};

export const WhyExpensiveSection = () => {
  const { language } = useLanguage();
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      <motion.div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, currentColor 1px, transparent 1px)', backgroundSize: '100% 80px' }} initial={{ y: 0 }} whileInView={{ y: -25 }} viewport={{ once: false }} transition={{ duration: 2, ease: "easeOut" }} />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="col-span-12 lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-6">&nbsp;</p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-8 dark:text-white">{language === 'nl' ? 'WAAROM BEN IK GOEDKOPER?' : 'WHY AM I MORE AFFORDABLE?'}</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-8">{language === 'nl' ? 'Veel webdesignbureaus rekenen €3.000 tot €8.000 voor een simpele website. Je betaalt voor overhead, managers en vergaderingen — niet voor je website.' : 'Many web design agencies charge €3,000 to €8,000 for a simple website. You pay for overhead, managers and meetings — not for your website.'}</p>
            <Link to="/waarom-website" className="text-xs uppercase tracking-[0.2em] hover:underline underline-offset-4 dark:text-gray-300">{language === 'nl' ? 'Lees meer →' : 'Read more →'}</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="col-span-12 lg:col-span-5">
            <div className="border-t border-black dark:border-white pt-8 mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">{language === 'nl' ? 'Bureaus' : 'Agencies'}</p>
              <p className="text-5xl font-black line-through decoration-gray-300 dark:text-white">€3.000+</p>
            </div>
            <div className="border-t border-black dark:border-white pt-8 mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Yrvante</p>
              <p className="text-5xl font-black dark:text-white">€399</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">{language === 'nl' ? 'Vanaf' : 'Starting from'}</p>
            </div>
            {/* Mini MacBook preview */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-4">
              <div className="bg-gray-200 dark:bg-neutral-700 rounded-t-lg pt-1.5 px-1.5">
                <div className="flex items-center gap-1 px-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" /><div className="w-2 h-2 rounded-full bg-yellow-400/60" /><div className="w-2 h-2 rounded-full bg-green-400/60" />
                </div>
                <div className="bg-white dark:bg-neutral-900 rounded-t-sm overflow-hidden p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-2 bg-gray-800 dark:bg-white rounded-sm" />
                    <div className="flex gap-2"><div className="w-6 h-1 bg-gray-200 dark:bg-neutral-700 rounded-full" /><div className="w-6 h-1 bg-gray-200 dark:bg-neutral-700 rounded-full" /></div>
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="h-2 bg-gray-900 dark:bg-white rounded w-2/3" />
                    <div className="h-1 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
                    <div className="h-1 bg-gray-200 dark:bg-neutral-700 rounded w-4/5" />
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-gray-800 dark:bg-white rounded-full"><div className="w-6 h-0.5 bg-white dark:bg-gray-900 rounded" /></div>
                    <div className="px-3 py-1 border border-gray-300 dark:border-neutral-600 rounded-full"><div className="w-6 h-0.5 bg-gray-400 rounded" /></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-300 dark:bg-neutral-600 h-2 rounded-b-md mx-4" />
              <div className="bg-gray-200 dark:bg-neutral-700 h-1 rounded-b-lg mx-10" />
              <p className="text-[10px] text-center text-gray-400 mt-2">{language === 'nl' ? 'Zelfde kwaliteit, eerlijke prijs' : 'Same quality, fair price'}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const ServicesSection = () => {
  const { language } = useLanguage();
  return (
    <section id="services" data-testid="services-section" className="py-16 lg:py-20 relative overflow-hidden">
      <motion.div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} initial={{ y: 0 }} whileInView={{ y: -30 }} viewport={{ once: false }} transition={{ duration: 2, ease: "easeOut" }} />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-12 gap-4 mb-12">
          <div className="col-span-12 lg:col-span-4"><p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">&nbsp;</p></div>
          <div className="col-span-12 lg:col-span-8 flex items-end gap-6"><h2 className="text-5xl lg:text-7xl font-black tracking-tighter dark:text-white">{language === 'nl' ? 'DIENSTEN' : 'SERVICES'}</h2></div>
        </div>
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {[
            { num: '01', icon: Monitor, title: language === 'nl' ? 'Website Ontwikkeling' : 'Website Development', desc: language === 'nl' ? 'Moderne, snelle websites die perfect werken op elk apparaat. Van simpele landingspagina tot complete bedrijfswebsite.' : 'Modern, fast websites that work perfectly on any device. From simple landing page to complete business website.',
              mini: (
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200/50 dark:border-neutral-600/50 bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-neutral-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-300" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-300" /><div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                    <span className="text-[7px] text-gray-400 ml-1">jouwsite.nl</span>
                  </div>
                  <div className="p-2.5 space-y-1.5">
                    <div className="h-1.5 bg-gray-800 dark:bg-white rounded w-1/2" />
                    <div className="h-1 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
                    <div className="h-1 bg-gray-200 dark:bg-neutral-700 rounded w-3/4" />
                    <div className="flex gap-1.5 mt-2"><div className="h-5 flex-1 bg-gray-100 dark:bg-neutral-800 rounded" /><div className="h-5 flex-1 bg-gray-100 dark:bg-neutral-800 rounded" /><div className="h-5 flex-1 bg-gray-100 dark:bg-neutral-800 rounded" /></div>
                  </div>
                </div>
              )
            },
            { num: '02', icon: Smartphone, title: language === 'nl' ? 'Web Applicaties' : 'Web Applications', desc: language === 'nl' ? 'Boekingssystemen, klantportalen en op maat gemaakte oplossingen voor jouw specifieke bedrijfsbehoeften.' : 'Booking systems, client portals and custom solutions for your specific business needs.',
              mini: (
                <div className="mt-4 flex justify-center">
                  <div className="w-20 bg-gray-900 dark:bg-neutral-700 rounded-[12px] p-1 shadow-lg">
                    <div className="bg-white dark:bg-neutral-900 rounded-[9px] overflow-hidden">
                      <div className="h-2 flex items-center justify-center"><div className="w-6 h-0.5 bg-gray-200 dark:bg-neutral-700 rounded-full" /></div>
                      <div className="px-1.5 pb-1.5 space-y-1">
                        <div className="h-1 bg-gray-800 dark:bg-white rounded w-3/4" />
                        <div className="h-0.5 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
                        <div className="bg-gray-100 dark:bg-neutral-800 rounded p-1 text-center"><div className="h-0.5 bg-gray-400 rounded w-2/3 mx-auto" /></div>
                        <div className="bg-gray-100 dark:bg-neutral-800 rounded p-1 text-center"><div className="h-0.5 bg-gray-400 rounded w-1/2 mx-auto" /></div>
                        <div className="h-3 bg-gray-800 dark:bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            },
            { num: '03', icon: RefreshCw, title: 'Rebranding', desc: language === 'nl' ? 'Heeft je website een opfrisbeurt nodig? Ik geef je bestaande site een compleet nieuw uiterlijk en betere gebruikservaring.' : 'Does your website need a refresh? I give your existing site a completely new look and improved user experience.',
              mini: (
                <div className="mt-4 flex gap-2 items-center">
                  <div className="flex-1 rounded-lg border border-gray-200/50 dark:border-neutral-600/50 overflow-hidden opacity-50">
                    <div className="p-1.5 bg-white dark:bg-neutral-900 space-y-1">
                      <div className="h-1 bg-gray-300 dark:bg-neutral-600 rounded w-1/2" />
                      <div className="h-0.5 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
                      <div className="h-4 bg-gray-100 dark:bg-neutral-800 rounded" />
                    </div>
                  </div>
                  <ArrowRight size={12} className="text-gray-400 flex-shrink-0" />
                  <div className="flex-1 rounded-lg border border-gray-300 dark:border-neutral-500 overflow-hidden shadow-sm">
                    <div className="p-1.5 bg-white dark:bg-neutral-900 space-y-1">
                      <div className="h-1 bg-gray-800 dark:bg-white rounded w-1/2" />
                      <div className="h-0.5 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
                      <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-neutral-800 dark:to-neutral-700 rounded" />
                    </div>
                  </div>
                </div>
              )
            },
          ].map((svc, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="col-span-12 lg:col-span-4 group">
              <div className="bg-gray-50 dark:bg-neutral-800/60 rounded-3xl p-8 hover:bg-gray-100 dark:hover:bg-neutral-700/60 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-500">{svc.num}</span>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center"><svc.icon size={22} strokeWidth={1.5} className="text-gray-500" /></div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold dark:text-white mb-4">{svc.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{svc.desc}</p>
                {svc.mini}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
          <Link to="/diensten" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Bekijk alle branches →' : 'View all industries →'}</Link>
        </motion.div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = React.useState(0);
  const testimonials = [
    { text: language === 'nl' ? "Binnen 2 weken was mijn website online. De kwaliteit is uitstekend en de communicatie was top!" : "Within 2 weeks my website was online. The quality is excellent and communication was great!", type: language === 'nl' ? 'Bouwbedrijf' : 'Construction company', rating: 5 },
    { text: language === 'nl' ? "Eindelijk een betaalbare maar professionele website. Precies wat ik als ZZP'er nodig had." : "Finally an affordable but professional website. Exactly what I needed as a freelancer.", type: language === 'nl' ? 'ZZP\'er' : 'Freelancer', rating: 5 },
    { text: language === 'nl' ? "Het resultaat overtrof mijn verwachtingen. Mijn nieuwe website trekt merkbaar meer klanten aan." : "The result exceeded my expectations. My new website noticeably attracts more customers.", type: language === 'nl' ? 'Coach' : 'Coach', rating: 5 },
  ];
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-16 text-gray-800 dark:text-white">
      <div className="container-yrvante">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold dark:text-white">{language === 'nl' ? 'Wat klanten zeggen' : 'What clients say'}</h2>
        </motion.div>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center px-8">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => <Star key={i} className="text-gray-500 fill-gray-500" size={20} />)}
              </div>
              <p className="text-xl md:text-2xl font-heading mb-6 leading-relaxed">"{testimonials[current].text}"</p>
              <p className="text-gray-500">— {testimonials[current].type}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-10">
            <button onClick={prev} className="p-3 border border-gray-300 dark:border-neutral-600 rounded-full hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors"><ChevronLeft size={20} /></button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'w-6 bg-gray-500' : 'bg-gray-300 dark:bg-neutral-600'}`} />)}
            </div>
            <button onClick={next} className="p-3 border border-gray-300 dark:border-neutral-600 rounded-full hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState(null);
  const [showAll, setShowAll] = React.useState(false);

  const faqs = [
    { q: language === 'nl' ? 'Hoe lang duurt het om een website te maken?' : 'How long does it take to build a website?', a: language === 'nl' ? 'Een basis website is meestal binnen 1 week klaar. Voor Pro en Premium pakketten reken ik 1 tot 2 weken.' : 'A basic website is usually ready within 1 week. For Pro and Premium packages I estimate 1 to 2 weeks.' },
    { q: language === 'nl' ? 'Wat heb ik nodig om te beginnen?' : 'What do I need to get started?', a: language === 'nl' ? 'Om te starten heb ik een paar simpele dingen van je nodig:\n\n\u2022 Teksten voor je website (bijvoorbeeld een korte beschrijving van je bedrijf en diensten)\n\u2022 Foto\'s of afbeeldingen die je wilt gebruiken\n\u2022 Je logo (als je die al hebt)\n\nHeb je dit nog niet allemaal? Geen probleem. Ik kan je helpen met goede teksten en professionele stockfoto\'s.\n\nVoor je website heb je ook een domeinnaam nodig (bijvoorbeeld jouwbedrijf.nl). Je koopt een domeinnaam zelf bij een provider zoals TransIP of Antagonist. Dit kost maximaal ongeveer \u20ac10\u2013\u20ac15 per jaar. Ik help je daarna met het koppelen van de domeinnaam aan je website. Zo blijft de domeinnaam altijd op jouw naam staan en blijf jij volledig eigenaar!' : 'To get started I need a few simple things from you:\n\n\u2022 Texts for your website\n\u2022 Photos or images you want to use\n\u2022 Your logo (if you have one)\n\nDon\'t have all of this yet? No problem. I can help you with good texts and professional stock photos.\n\nYou also need a domain name (e.g. yourbusiness.com). You buy one yourself from a provider like TransIP or Antagonist for about \u20ac10-\u20ac15 per year. I\'ll then help you connect it.' },
    { q: language === 'nl' ? 'Kan ik de website later nog uitbreiden?' : 'Can I expand the website later?', a: language === 'nl' ? 'Ja, je kan altijd de website aanpassen. Als je weet hoe dit werkt en je koopt alleen de website, dan moet je zelf dingen laten aanpassen. Maar kies je voor het maandelijkse abonnement? Dan hoef je niet alleen niks te betalen aan hosting en bugs \u2014 ik regel dan alles voor je.' : 'Yes, you can always adjust the website. If you know how this works and you only buy the website, you\'ll need to make adjustments yourself. But if you choose the monthly subscription? Then I take care of everything for you.' },
    { q: language === 'nl' ? 'Wat gebeurt er als ik niet tevreden ben?' : 'What happens if I\'m not satisfied?', a: language === 'nl' ? 'Ik blijf de website aanpassen tot jij tevreden bent. Je kan altijd voorbeelden laten zien en ik blijf een test website sturen tot ik jouw volledige goedkeuring heb op de voorwaarden die ondertekend zijn.' : 'I keep adjusting the website until you\'re satisfied. You can always show examples and I\'ll keep sending a test website until I have your full approval.' },
    { q: language === 'nl' ? 'Hoe werkt de betaling?' : 'How does payment work?', a: language === 'nl' ? 'Ik werk met 40% aanbetaling bij de start van het project. De resterende 60% betaal je bij oplevering van de website. Na betaling maak ik je de host/co-host.' : 'I work with a 40% deposit at the start. You pay the remaining 60% upon delivery. After payment, I\'ll make you the host/co-host.' },
    { q: language === 'nl' ? 'Blijft mijn website online als ik geen onderhoudspakket neem?' : 'Will my website stay online without maintenance?', a: language === 'nl' ? 'Ja, je website blijft gewoon online. Het onderhoudspakket is optioneel maar zorgt ervoor dat ik kleine aanpassingen doe, updates bijhoud en je website veilig en snel blijft.' : 'Yes, your website will stay online. The maintenance package is optional but ensures I make small adjustments and keep your website safe and fast.' },
    { q: language === 'nl' ? 'Kan ik zelf teksten en foto\'s aanpassen?' : 'Can I edit texts and photos myself?', a: language === 'nl' ? 'Dat is mogelijk, maar vraagt een uitgebreidere technische oplossing. Het beste is dat we dat regelen via het onderhoudspakket. Zo hoef jij je geen zorgen te maken over technische zaken.' : 'That\'s possible, but requires a more extensive technical solution. It\'s best arranged via the maintenance package.' },
    { q: language === 'nl' ? 'Maak jij ook webshops?' : 'Do you also make webshops?', a: language === 'nl' ? 'Op dit moment richt ik mij volledig op professionele websites voor ZZP\'ers en kleine bedrijven. Webshops vallen buiten mijn huidige aanbod.' : 'At the moment I focus entirely on professional websites for freelancers and small businesses.' },
    { q: language === 'nl' ? 'Wat is het verschil tussen jou en een groot webbureau?' : 'What\'s the difference between you and a large web agency?', a: language === 'nl' ? 'Bij een groot webbureau ben je \u00e9\u00e9n van de vele klanten. Je betaalt voor overhead, account managers en vergaderingen \u2014 niet voor je website. Bij Yrvante werk je rechtstreeks met mij. Geen tussenpersonen, geen wachtrijen, geen verrassingen achteraf.\n\nGrote bureaus rekenen voor dezelfde website al snel \u20ac3000 tot \u20ac8000. Bij Yrvante betaal je een eerlijke prijs.' : 'At a large web agency, you\'re one of many clients. You pay for overhead, not your website. At Yrvante you work directly with me. No intermediaries, no queues, no surprises.' },
    { q: language === 'nl' ? 'Mijn bedrijf is heel klein, is een website wel de moeite waard?' : 'My business is very small, is a website worth it?', a: language === 'nl' ? 'Juist dan. Mensen googlen tegenwoordig alles. Als jij niet online staat, kiest de klant gewoon voor iemand die dat wel is. Een website is je 24/7 visitekaartje. Met een basiswebsite vanaf \u20ac399 is de stap kleiner dan je denkt.' : 'Especially then. People google everything nowadays. If you\'re not online, the customer chooses someone who is. With a basic website from \u20ac399, the step is smaller than you think.' },
    { q: language === 'nl' ? 'Zit SEO standaard in elke website?' : 'Is SEO included in every website?', a: language === 'nl' ? 'Elke website die ik bouw heeft een solide technische basis. Uitgebreide SEO-optimalisatie zit standaard in het Pro en Premium pakket. Bij het Basis pakket kan je dit altijd later toevoegen als extra.' : 'Every website I build has a solid technical foundation. Extensive SEO optimization is included in Pro and Premium. With Basic you can always add it later.' },
    { q: language === 'nl' ? 'Kan ik ook alleen een pagina laten aanpassen?' : 'Can I have just one page adjusted?', a: language === 'nl' ? 'Ja, dat kan. Neem gewoon contact op en ik kijk wat ik voor je kan doen. Ik geef je altijd eerst een eerlijke prijsindicatie voordat er iets van start gaat.' : 'Yes, that\'s possible. Just get in touch and I\'ll see what I can do. I\'ll always give you an honest price indication first.' },
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);

  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden bg-gray-50/80 dark:bg-neutral-900/50">
      <motion.div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '36px 36px' }} initial={{ y: 0 }} whileInView={{ y: -10 }} viewport={{ once: false }} transition={{ duration: 1.5, ease: "easeOut" }} />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">&nbsp;</p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter dark:text-white">FAQ</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {visibleFaqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="bg-gray-50 dark:bg-neutral-800/60 rounded-3xl border border-gray-200 hover:border-gray-300 transition-colors">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-6 text-left cursor-pointer" data-testid={`faq-button-${index}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-[0.2em] block mb-2">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                    <span className="font-bold dark:text-white text-base block">{faq.q}</span>
                  </div>
                  <ChevronDown className={`flex-shrink-0 transform transition-transform mt-1 text-gray-400 ${openIndex === index ? 'rotate-180' : ''}`} size={18} />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 leading-relaxed whitespace-pre-line">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
        {!showAll && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              data-testid="faq-show-more"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-neutral-500 hover:text-black dark:hover:text-white transition-all"
            >
              {language === 'nl' ? 'Zie meer' : 'See more'}
              <ChevronDown size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
