import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Eye, 
  Users, 
  Mail, 
  MailOpen,
  Calendar,
  TrendingUp,
  Trash2,
  Check,
  Lock,
  ArrowLeft,
  RefreshCw
} from "lucide-react";
import { Toaster } from "../components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
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
        axios.get(`${API}/admin/pageviews`)
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
      await axios.put(`${API}/admin/contacts/${contactId}/read`);
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
      await axios.delete(`${API}/admin/contacts/${contactId}`);
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

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Yrvante Admin</h1>
            <p className="text-gray-500 text-sm">Beheer je website statistieken</p>
          </div>
          
          <form onSubmit={login} className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                Wachtwoord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                  placeholder="••••••••"
                  data-testid="admin-password"
                />
              </div>
            </div>
            <button
              type="submit"
              data-testid="admin-login-btn"
              className="w-full bg-black text-white py-3 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Inloggen
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-black transition-colors inline-flex items-center gap-2">
              <ArrowLeft size={14} />
              Terug naar website
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-heading font-bold">Yrvante Admin</h1>
            <span className="text-xs font-mono text-gray-400 uppercase">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              data-testid="refresh-btn"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-black transition-colors"
              data-testid="logout-btn"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 border border-gray-200"
              data-testid="stat-pageviews"
            >
              <div className="flex items-center gap-3 mb-3">
                <Eye className="text-gray-400" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500">Pageviews</span>
              </div>
              <p className="text-3xl font-heading font-bold">{stats.total_page_views}</p>
              <p className="text-xs text-gray-400 mt-1">+{stats.page_views_today} vandaag</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 border border-gray-200"
              data-testid="stat-visitors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-gray-400" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500">Bezoekers</span>
              </div>
              <p className="text-3xl font-heading font-bold">{stats.unique_visitors}</p>
              <p className="text-xs text-gray-400 mt-1">Unieke bezoekers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 border border-gray-200"
              data-testid="stat-contacts"
            >
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-gray-400" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500">Berichten</span>
              </div>
              <p className="text-3xl font-heading font-bold">{stats.total_contacts}</p>
              <p className="text-xs text-gray-400 mt-1">+{stats.contacts_today} vandaag</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 border border-gray-200"
              data-testid="stat-unread"
            >
              <div className="flex items-center gap-3 mb-3">
                <MailOpen className="text-gray-400" size={20} />
                <span className="text-xs font-mono uppercase text-gray-500">Ongelezen</span>
              </div>
              <p className="text-3xl font-heading font-bold">{stats.unread_contacts}</p>
              <p className="text-xs text-gray-400 mt-1">Te beantwoorden</p>
            </motion.div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-1 text-sm font-mono uppercase tracking-wider transition-colors ${
              activeTab === "overview" 
                ? "border-b-2 border-black text-black" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            data-testid="tab-overview"
          >
            Overzicht
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`pb-3 px-1 text-sm font-mono uppercase tracking-wider transition-colors ${
              activeTab === "contacts" 
                ? "border-b-2 border-black text-black" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            data-testid="tab-contacts"
          >
            Berichten ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`pb-3 px-1 text-sm font-mono uppercase tracking-wider transition-colors ${
              activeTab === "analytics" 
                ? "border-b-2 border-black text-black" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            data-testid="tab-analytics"
          >
            Analytics
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && stats && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekly Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 border border-gray-200"
            >
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                <Calendar size={18} />
                Deze Week
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pageviews</span>
                  <span className="font-mono font-bold">{stats.page_views_week}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Berichten</span>
                  <span className="font-mono font-bold">{stats.contacts_week}</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Contacts Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 border border-gray-200"
            >
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                <Mail size={18} />
                Laatste Berichten
              </h3>
              <div className="space-y-3">
                {contacts.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${contact.read ? 'bg-gray-300' : 'bg-black'}`} />
                    <span className="font-medium truncate flex-1">{contact.name}</span>
                    <span className="text-gray-400 text-xs">
                      {new Date(contact.timestamp).toLocaleDateString('nl-NL')}
                    </span>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <p className="text-gray-400 text-sm">Nog geen berichten</p>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "contacts" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {contacts.length === 0 ? (
              <div className="bg-white p-12 border border-gray-200 text-center">
                <Mail className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500">Nog geen berichten ontvangen</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`bg-white p-6 border ${contact.read ? 'border-gray-200' : 'border-black'}`}
                  data-testid={`contact-${contact.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {!contact.read && (
                          <span className="w-2 h-2 bg-black rounded-full" />
                        )}
                        <h4 className="font-heading font-bold text-lg">{contact.name}</h4>
                      </div>
                      <a 
                        href={`mailto:${contact.email}`} 
                        className="text-sm text-gray-500 hover:text-black transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono">
                        {new Date(contact.timestamp).toLocaleString('nl-NL')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{contact.message}</p>
                  
                  <div className="flex items-center gap-3">
                    {!contact.read && (
                      <button
                        onClick={() => markAsRead(contact.id)}
                        className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
                      >
                        <Check size={14} />
                        Markeer als gelezen
                      </button>
                    )}
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Verwijderen
                    </button>
                    <a
                      href={`mailto:${contact.email}?subject=Re: Website Aanvraag - Yrvante`}
                      className="text-sm text-black hover:underline ml-auto"
                    >
                      Beantwoorden →
                    </a>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === "analytics" && pageviews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Daily Views Chart (Simple) */}
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={18} />
                Pageviews per Dag (Laatste 30 dagen)
              </h3>
              <div className="space-y-2">
                {Object.entries(pageviews.daily_views)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .slice(0, 14)
                  .map(([date, count]) => (
                    <div key={date} className="flex items-center gap-4">
                      <span className="text-xs font-mono text-gray-500 w-24">{date}</span>
                      <div className="flex-1 bg-gray-100 h-4 rounded-sm overflow-hidden">
                        <div 
                          className="bg-black h-full transition-all"
                          style={{ 
                            width: `${Math.min((count / Math.max(...Object.values(pageviews.daily_views))) * 100, 100)}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-mono w-12 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Page Breakdown */}
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="text-lg font-heading font-bold mb-4">Pagina's</h3>
              <div className="space-y-2">
                {Object.entries(pageviews.page_breakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([page, count]) => (
                    <div key={page} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="font-mono text-sm">{page}</span>
                      <span className="font-mono text-sm font-bold">{count}</span>
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
