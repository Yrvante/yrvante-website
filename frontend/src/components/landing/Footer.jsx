import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { LOGO_URL, LOGO_URL_WHITE } from "./constants";

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="py-16 border-t border-gray-200 dark:border-neutral-800">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <img src={LOGO_URL} alt="Yrvante" className="h-12 w-auto object-contain dark:hidden" />
            <img src={LOGO_URL_WHITE} alt="Yrvante" className="h-12 w-auto object-contain hidden dark:block" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 max-w-xs leading-relaxed">
              {language === 'nl' ? 'Professionele websites voor ZZP\'ers en MKB. Betaalbaar en resultaatgericht.' : 'Professional websites for freelancers and SMBs. Affordable and result-driven.'}
            </p>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">{language === 'nl' ? 'Diensten' : 'Services'}</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/diensten/webdesign" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Webdesign</Link></li>
              <li><Link to="/onderhoud" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Onderhoud & Hosting' : 'Maintenance & Hosting'}</Link></li>
            </ul>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">{language === 'nl' ? 'Websites voor' : 'Websites for'}</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/voor/kappers" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Kappers' : 'Hairdressers'}</Link></li>
              <li><Link to="/voor/nagelstylisten" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Nagelstylisten' : 'Nail Technicians'}</Link></li>
              <li><Link to="/voor/restaurants" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Restaurants</Link></li>
              <li><Link to="/voor/coaches" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Coaches</Link></li>
              <li><Link to="/diensten" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Meer →' : 'More →'}</Link></li>
            </ul>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">{language === 'nl' ? 'Pagina\'s' : 'Pages'}</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pakketten" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Pakketten' : 'Packages'}</Link></li>
              <li><Link to="/calculator" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Calculator</Link></li>
              <li><Link to="/over-mij" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Over Mij' : 'About Me'}</Link></li>
              <li><Link to="/waarom-website" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Waarom?' : 'Why?'}</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div className="col-span-6 lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">Contact</p>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@yrvante.com" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">info@yrvante.com</a></li>
              <li className="text-gray-600 dark:text-gray-400">Nederland</li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-500">© {currentYear} Yrvante</p>
              <p className="text-xs text-gray-500 mt-1">{language === 'nl' ? 'Alle rechten voorbehouden' : 'All rights reserved'}</p>
              <div className="flex items-center gap-4 mt-2">
                <Link to="/privacy" className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{language === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}</Link>
                <button onClick={() => navigate('/leadfinder')} className="text-gray-300 hover:text-gray-500 transition-colors opacity-30 hover:opacity-100" title="Admin"><Lock size={12} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
