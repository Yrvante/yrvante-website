import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useTheme } from "../App";
import { 
  Eye, Users, Mail, MailOpen, Calendar, TrendingUp, 
  Trash2, Check, Lock, ArrowLeft, RefreshCw, Shield
} from "lucide-react";
import { Toaster } from "../components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;
const LOGO_URL = "/logo-nav.png";
const LOGO_URL_WHITE = "/logo-nav-white.png";

const AdminDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [pageviews, setPageviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_auth", "true");
        toast.success("Ingelogd!");
        loadData();
      }
    } catch (error) {
      toast.error("Ongeldig wachtwoord");
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, contactsRes, pageviewsRes] = await Promise.all([
        axios.get(`${API}/admin/stats`),
        axios.get(`${API}/admin/contacts`),
        axios.get(`${API}/admin/stats?type=pageviews`)
      ]);
      setStats(statsRes.data);
      setContacts(contactsRes.data);
      setPageviews(pageviewsRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Fout bij laden van data");
    }
    setLoading(false);
  };

  const markAsRead = async (contactId) => {
    try {
      await axios.put(`${API}/admin/contacts?id=${contactId}&action=read`);
      setContacts(contacts.map(c => 
        c.id === contactId ? { ...c, read: true } : c
      ));
      setStats(prev => ({ ...prev, unread_contacts: prev.unread_contacts - 1 }));
      toast.success("Gemarkeerd als gelezen");
    } catch (error) {
      toast.error("Fout bij markeren");
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm("Weet je zeker dat je dit bericht wilt verwijderen?")) return;
    try {
      await axios.delete(`${API}/admin/contacts?id=${contactId}`);
      setContacts(contacts.filter(c => c.id !== contactId));
      setStats(prev => ({ ...prev, total_contacts: prev.total_contacts - 1 }));
      toast.success("Bericht verwijderd");
    } catch (error) {
      toast.error("Fout bij verwijderen");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  // Login screen — redesigned with glassmorphism
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-white dark:bg-neutral-950">
        <Toaster position="top-right" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-neutral-700 p-8 sm:p-10 shadow-lg" data-testid="admin-login-card">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/">
                <img src={isDark ? LOGO_URL_WHITE : LOGO_URL} alt="Yrvante" className="h-7 sm:h-8 mx-auto mb-6" />
              </Link>
              
              {/* Shield Icon */}
              <div className="w-16 h-16 bg-gray-50 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-neutral-700">
                <Shield className="text-gray-400 dark:text-gray-500" size={28} />
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white mb-1 font-heading">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 dark:text-gray-500 text-sm">Beveiligd gebied — Yrvante</p>
            </div>
            
            <form onSubmit={login} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 rounded-xl focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-neutral-700 outline-none transition-all text-base text-black dark:text-white"
                  placeholder="Wachtwoord"
                  autoFocus
                  data-testid="admin-password"
                />
              </div>
              <button
                type="submit"
                data-testid="admin-login-btn"
                className="w-full py-3.5 sm:py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-all rounded-full"
              >
                Inloggen
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-gray-400 dark:text-gray-500 text-sm hover:text-black dark:hover:text-white flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={14} />
                Terug naar website
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/">
              <img src={isDark ? LOGO_URL_WHITE : LOGO_URL} alt="Yrvante" className="h-5 sm:h-6" />
            </Link>
            <span className="text-xs font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded">ADMIN</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors text-gray-600 dark:text-gray-400"
              data-testid="refresh-btn"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={logout}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              data-testid="logout-btn"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-neutral-900 p-4 sm:p-6 border border-gray-200 dark:border-neutral-800 rounded-xl"
              data-testid="stat-pageviews">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="text-gray-400 dark:text-gray-500" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500 dark:text-gray-400">Pageviews</span>
              </div>
              <p className="text-3xl font-heading font-bold text-black dark:text-white">{stats.total_page_views}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">+{stats.page_views_today} vandaag</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white dark:bg-neutral-900 p-4 sm:p-6 border border-gray-200 dark:border-neutral-800 rounded-xl"
              data-testid="stat-visitors">
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-gray-400 dark:text-gray-500" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500 dark:text-gray-400">Bezoekers</span>
              </div>
              <p className="text-3xl font-heading font-bold text-black dark:text-white">{stats.unique_visitors}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Unieke bezoekers</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white dark:bg-neutral-900 p-4 sm:p-6 border border-gray-200 dark:border-neutral-800 rounded-xl"
              data-testid="stat-contacts">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-gray-400 dark:text-gray-500" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500 dark:text-gray-400">Berichten</span>
              </div>
              <p className="text-3xl font-heading font-bold text-black dark:text-white">{stats.total_contacts}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">+{stats.contacts_today} vandaag</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white dark:bg-neutral-900 p-4 sm:p-6 border border-gray-200 dark:border-neutral-800 rounded-xl"
              data-testid="stat-unread">
              <div className="flex items-center gap-3 mb-3">
                <MailOpen className="text-gray-400 dark:text-gray-500" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500 dark:text-gray-400">Ongelezen</span>
              </div>
              <p className="text-3xl font-heading font-bold text-black dark:text-white">{stats.unread_contacts}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Te beantwoorden</p>
            </motion.div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-neutral-800">
          {[
            { id: 'overview', label: 'Overzicht' },
            { id: 'contacts', label: `Berichten (${contacts.length})` },
            { id: 'analytics', label: 'Analytics' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-mono uppercase tracking-wider transition-colors ${
                activeTab === tab.id 
                  ? 'border-b-2 border-black dark:border-white text-black dark:text-white' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && stats && (
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white dark:bg-neutral-900 p-6 border border-gray-200 dark:border-neutral-800 rounded-xl">
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                <Calendar size={18} /> Deze Week
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Pageviews</span>
                  <span className="font-mono font-bold text-black dark:text-white">{stats.page_views_week}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Berichten</span>
                  <span className="font-mono font-bold text-black dark:text-white">{stats.contacts_week}</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="bg-white dark:bg-neutral-900 p-6 border border-gray-200 dark:border-neutral-800 rounded-xl">
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                <Mail size={18} /> Laatste Berichten
              </h3>
              <div className="space-y-3">
                {contacts.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${contact.read ? 'bg-gray-300 dark:bg-neutral-600' : 'bg-black dark:bg-white'}`} />
                    <span className="font-medium truncate flex-1 text-black dark:text-white">{contact.name}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      {new Date(contact.timestamp).toLocaleDateString('nl-NL')}
                    </span>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <p className="text-gray-400 dark:text-gray-500 text-sm">Nog geen berichten</p>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "contacts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {contacts.length === 0 ? (
              <div className="bg-white dark:bg-neutral-900 p-12 border border-gray-200 dark:border-neutral-800 text-center rounded-xl">
                <Mail className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
                <p className="text-gray-500 dark:text-gray-400">Nog geen berichten ontvangen</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`bg-white dark:bg-neutral-900 p-5 sm:p-6 border rounded-xl ${contact.read ? 'border-gray-200 dark:border-neutral-800' : 'border-black dark:border-white'}`}
                  data-testid={`contact-${contact.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {!contact.read && <span className="w-2 h-2 bg-black dark:bg-white rounded-full" />}
                        <h4 className="font-heading font-bold text-lg text-black dark:text-white">{contact.name}</h4>
                      </div>
                      <a href={`mailto:${contact.email}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                        {contact.email}
                      </a>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {new Date(contact.timestamp).toLocaleString('nl-NL')}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{contact.message}</p>
                  
                  <div className="flex items-center gap-3">
                    {!contact.read && (
                      <button onClick={() => markAsRead(contact.id)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                        <Check size={14} /> Markeer als gelezen
                      </button>
                    )}
                    <button onClick={() => deleteContact(contact.id)} className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                      <Trash2 size={14} /> Verwijderen
                    </button>
                    <a href={`mailto:${contact.email}?subject=Re: Website Aanvraag - Yrvante`} className="text-sm text-black dark:text-white hover:underline ml-auto">
                      Beantwoorden →
                    </a>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === "analytics" && pageviews && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-6 border border-gray-200 dark:border-neutral-800 rounded-xl">
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                <TrendingUp size={18} /> Pageviews per Dag (Laatste 30 dagen)
              </h3>
              <div className="space-y-2">
                {Object.entries(pageviews.daily_views)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .slice(0, 14)
                  .map(([date, count]) => (
                    <div key={date} className="flex items-center gap-4">
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-24">{date}</span>
                      <div className="flex-1 bg-gray-100 dark:bg-neutral-800 h-4 rounded-sm overflow-hidden">
                        <div className="bg-black dark:bg-white h-full transition-all"
                          style={{ width: `${Math.min((count / Math.max(...Object.values(pageviews.daily_views))) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono w-12 text-right text-black dark:text-white">{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 border border-gray-200 dark:border-neutral-800 rounded-xl">
              <h3 className="text-lg font-heading font-bold mb-4 text-black dark:text-white">Pagina's</h3>
              <div className="space-y-2">
                {Object.entries(pageviews.page_breakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([page, count]) => (
                    <div key={page} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-neutral-800 last:border-0">
                      <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{page}</span>
                      <span className="font-mono text-sm font-bold text-black dark:text-white">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
