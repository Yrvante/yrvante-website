import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import { toast } from "sonner";
import { useTheme } from "../App";
import { 
  Eye, Users, Mail, MailOpen, Calendar, TrendingUp, 
  Trash2, Check, Lock, ArrowLeft, RefreshCw, Shield,
  Upload, Search, Phone, MessageSquare, ChevronDown, ChevronUp,
  BarChart3, FileText, Settings, ExternalLink, Star, Globe
} from "lucide-react";
import { Toaster } from "../components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;
const LOGO_URL = "/logo-nav.png";
const LOGO_URL_WHITE = "/logo-nav-white.png";

// Glass card base classes
const GLASS = "bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-white/40 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]";
const GLASS_CARD = `${GLASS} rounded-2xl`;
const GLASS_INPUT = "bg-white/50 dark:bg-white/[0.06] border border-gray-200/60 dark:border-white/10 backdrop-blur-sm rounded-xl focus:border-black dark:focus:border-white focus:bg-white/80 dark:focus:bg-white/10 outline-none transition-all text-black dark:text-white";

const CSV_STATUS_OPTIONS = [
  { value: 'nieuw', label: 'Nieuw', color: '#3B82F6', bg: '#EFF6FF', darkBg: 'rgba(59,130,246,0.15)' },
  { value: 'benaderd', label: 'Benaderd', color: '#F59E0B', bg: '#FFFBEB', darkBg: 'rgba(245,158,11,0.15)' },
  { value: 'gereageerd', label: 'Gereageerd', color: '#10B981', bg: '#ECFDF5', darkBg: 'rgba(16,185,129,0.15)' },
  { value: 'overgeslagen', label: 'Overgeslagen', color: '#6B7280', bg: '#F3F4F6', darkBg: 'rgba(107,114,128,0.15)' },
];

const formatPhoneForWhatsApp = (phone) => {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('0')) cleaned = '31' + cleaned.substring(1);
  if (!cleaned.startsWith('+') && !cleaned.startsWith('31')) cleaned = '31' + cleaned;
  return cleaned.replace(/^\+/, '');
};

const extractCity = (address) => {
  if (!address) return '-';
  const parts = address.split(',').map(p => p.trim());
  if (parts.length >= 2) {
    const cityPart = parts[1].replace(/^\d{4}\s?[A-Z]{0,2}\s*/, '').trim();
    return cityPart || parts[1].trim();
  }
  return parts[0];
};

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

  // CSV states
  const csvFileRef = useRef(null);
  const [csvLeads, setCsvLeads] = useState(() => {
    try { return JSON.parse(localStorage.getItem('csv_imported_leads') || '[]'); } catch { return []; }
  });
  const [csvSearch, setCsvSearch] = useState('');
  const [csvStatusFilter, setCsvStatusFilter] = useState('alle');
  const [csvOnlyNoWebsite, setCsvOnlyNoWebsite] = useState(false);
  const [csvSortCol, setCsvSortCol] = useState(null);
  const [csvSortDir, setCsvSortDir] = useState('asc');

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
    } catch { toast.error("Ongeldig wachtwoord"); }
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
    } catch { toast.error("Fout bij laden van data"); }
    setLoading(false);
  };

  const markAsRead = async (contactId) => {
    try {
      await axios.put(`${API}/admin/contacts?id=${contactId}&action=read`);
      setContacts(contacts.map(c => c.id === contactId ? { ...c, read: true } : c));
      setStats(prev => ({ ...prev, unread_contacts: prev.unread_contacts - 1 }));
      toast.success("Gelezen");
    } catch { toast.error("Fout bij markeren"); }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm("Bericht verwijderen?")) return;
    try {
      await axios.delete(`${API}/admin/contacts?id=${contactId}`);
      setContacts(contacts.filter(c => c.id !== contactId));
      setStats(prev => ({ ...prev, total_contacts: prev.total_contacts - 1 }));
      toast.success("Verwijderd");
    } catch { toast.error("Fout"); }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") { setIsAuthenticated(true); loadData(); }
  }, []);

  const logout = () => { setIsAuthenticated(false); localStorage.removeItem("admin_auth"); };

  // CSV functions
  const persistCsv = (leads) => { setCsvLeads(leads); localStorage.setItem('csv_imported_leads', JSON.stringify(leads)); };

  const handleCsvImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        if (!rows.length) { toast.error('CSV is leeg'); return; }
        const totalImported = rows.length;
        const mapped = rows.map((row, i) => ({
          id: `csv_${Date.now()}_${i}`,
          naam: row.title || row.naam || '',
          categorie: row.category || row.categorie || '',
          adres: row.address || row.adres || '',
          telefoon: row.phone || row.telefoon || '',
          website: row.website || '',
          rating: row.review_rating || '',
          aantalReviews: row.review_count || '',
          status: 'nieuw',
        }));
        const zonderWebsite = mapped.filter(l => !l.website || l.website.trim() === '').length;
        const existing = csvLeads.map(l => `${l.naam}|${l.telefoon}`);
        const newLeads = mapped.filter(l => !existing.includes(`${l.naam}|${l.telefoon}`));
        persistCsv([...csvLeads, ...newLeads]);
        toast.success(`${totalImported} rijen — ${zonderWebsite} zonder website — ${newLeads.length} nieuw`);
      },
      error: () => { toast.error('CSV leesfout'); }
    });
    e.target.value = '';
  };

  const updateCsvStatus = (id, status) => persistCsv(csvLeads.map(l => l.id === id ? { ...l, status } : l));
  const deleteCsvLead = (id) => persistCsv(csvLeads.filter(l => l.id !== id));
  const clearCsv = () => { if (window.confirm('Alle CSV leads verwijderen?')) { persistCsv([]); toast.success('Gewist'); }};

  const getWhatsAppUrl = (lead) => {
    const phone = formatPhoneForWhatsApp(lead.telefoon);
    const msg = encodeURIComponent(`Hoi ${lead.naam}! Ik ben Yvar

Ik bouw websites voor kleine bedrijven in Nederland!

Ik scroll elke dag door Google Maps en zie prachtige bedrijven die online nergens te vinden zijn. Toen ik ${lead.naam} tegenkwam dacht ik hetzelfde, geen website? Want jullie bedrijf ziet er geweldig uit. En zou zonde zijn om onzichtbaar te blijven.

Wist je trouwens ook dat elke dag dat jullie geen website hebben loopt er ergens een klant langs die jullie had kunnen vinden — maar in plaats daarvan naar de concurrent gaat. Niet omdat jullie minder goed zijn. Gewoon omdat die wel online staat.

🌐 Professionele website vanaf €399
⚡ Binnen 2 weken live
🤝 Eerst 40% — de rest pas als je blij bent
💯 Niet tevreden? Ik ga door tot je dat wel bent

Benieuwd? → https://yrvante.com
Of stuur me gewoon een berichtje terug 😊

Yvar
Yrvante — Smart Web & Software 085-5055314`);
    return `https://api.whatsapp.com/send?phone=${phone}&text=${msg}`;
  };

  const filteredCsv = csvLeads.filter(l => {
    if (csvOnlyNoWebsite && l.website && l.website.trim() !== '') return false;
    if (csvStatusFilter !== 'alle' && l.status !== csvStatusFilter) return false;
    if (csvSearch) { const q = csvSearch.toLowerCase(); return l.naam?.toLowerCase().includes(q) || extractCity(l.adres).toLowerCase().includes(q); }
    return true;
  });

  const formatRating = (r) => {
    if (!r) return null;
    const n = parseFloat(r);
    return isNaN(n) ? r : n.toFixed(1);
  };

  const toggleCsvSort = (col) => {
    if (csvSortCol === col) { setCsvSortDir(d => d === 'asc' ? 'desc' : 'asc'); }
    else { setCsvSortCol(col); setCsvSortDir('asc'); }
  };

  const sortedCsv = [...filteredCsv].sort((a, b) => {
    if (!csvSortCol) return 0;
    const dir = csvSortDir === 'asc' ? 1 : -1;
    let va, vb;
    switch (csvSortCol) {
      case 'naam': va = a.naam || ''; vb = b.naam || ''; break;
      case 'categorie': va = a.categorie || ''; vb = b.categorie || ''; break;
      case 'plaats': va = extractCity(a.adres); vb = extractCity(b.adres); break;
      case 'website': va = a.website ? '0' : '1'; vb = b.website ? '0' : '1'; break;
      case 'rating': va = parseFloat(a.rating) || 0; vb = parseFloat(b.rating) || 0; return (va - vb) * dir;
      case 'reviews': va = parseInt(a.aantalReviews) || 0; vb = parseInt(b.aantalReviews) || 0; return (va - vb) * dir;
      case 'status': va = a.status || ''; vb = b.status || ''; break;
      default: return 0;
    }
    return typeof va === 'string' ? va.localeCompare(vb) * dir : (va - vb) * dir;
  });

  const csvStats = {
    totaal: csvLeads.length,
    zonderWebsite: csvLeads.filter(l => !l.website || l.website.trim() === '').length,
    benaderd: csvLeads.filter(l => l.status === 'benaderd').length,
    gereageerd: csvLeads.filter(l => l.status === 'gereageerd').length,
    overgeslagen: csvLeads.filter(l => l.status === 'overgeslagen').length,
  };

  // === LOGIN SCREEN ===
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900">
        <Toaster position="top-right" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
          <div className={`${GLASS_CARD} p-8 sm:p-10`} data-testid="admin-login-card">
            <div className="text-center mb-8">
              <Link to="/"><img src={isDark ? LOGO_URL_WHITE : LOGO_URL} alt="Yrvante" className="h-7 sm:h-8 mx-auto mb-6" /></Link>
              <div className={`w-16 h-16 ${GLASS} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Shield className="text-gray-500 dark:text-gray-400" size={28} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white mb-1 font-heading">Admin Dashboard</h1>
              <p className="text-gray-400 dark:text-gray-500 text-sm">Beveiligd gebied — Yrvante</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 sm:py-4 text-base ${GLASS_INPUT}`} placeholder="Wachtwoord" autoFocus data-testid="admin-password" />
              </div>
              <button type="submit" data-testid="admin-login-btn"
                className="w-full py-3.5 sm:py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-all rounded-full">
                Inloggen
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/" className="text-gray-400 dark:text-gray-500 text-sm hover:text-black dark:hover:text-white flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={14} /> Terug naar website
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // === MAIN DASHBOARD ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Toaster position="top-right" />
      <input ref={csvFileRef} type="file" accept=".csv" onChange={handleCsvImport} className="hidden" data-testid="csv-file-input" />

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-b border-white/40 dark:border-white/[0.06]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/"><img src={isDark ? LOGO_URL_WHITE : LOGO_URL} alt="Yrvante" className="h-5 sm:h-6" /></Link>
            <span className="text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-1 rounded-full tracking-wider">ADMIN</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={loadData} disabled={loading}
              className={`p-2 rounded-xl transition-colors ${GLASS} !rounded-xl !shadow-none hover:bg-white/80 dark:hover:bg-white/10`} data-testid="refresh-btn">
              <RefreshCw size={16} className={`text-gray-500 dark:text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link to="/leadfinder" className="hidden sm:flex text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors items-center gap-1">
              Lead Finder <ExternalLink size={12} />
            </Link>
            <button onClick={logout} className="text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors" data-testid="logout-btn">
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              { icon: Eye, label: 'Pageviews', value: stats.total_page_views, sub: `+${stats.page_views_today} vandaag`, delay: 0 },
              { icon: Users, label: 'Bezoekers', value: stats.unique_visitors, sub: 'Unieke bezoekers', delay: 0.05 },
              { icon: Mail, label: 'Berichten', value: stats.total_contacts, sub: `+${stats.contacts_today} vandaag`, delay: 0.1 },
              { icon: MailOpen, label: 'Ongelezen', value: stats.unread_contacts, sub: 'Te beantwoorden', delay: 0.15 },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: s.delay }}
                className={`${GLASS_CARD} p-4 sm:p-6`} data-testid={`stat-${s.label.toLowerCase()}`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <s.icon size={18} className="text-gray-400 dark:text-gray-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{s.label}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-heading font-bold text-black dark:text-white">{s.value}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className={`${GLASS} rounded-xl p-1 mb-6 sm:mb-8 flex gap-1`}>
          {[
            { id: 'overview', label: 'Overzicht', icon: BarChart3 },
            { id: 'csv', label: `CSV Leads (${csvLeads.length})`, icon: Upload },
            { id: 'contacts', label: `Berichten (${contacts.length})`, icon: Mail },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                  : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/[0.06]'
              }`} data-testid={`tab-${tab.id}`}>
              <tab.icon size={14} className="hidden sm:block" />
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && stats && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className={GLASS_CARD + " p-6"}>
                  <h3 className="text-lg font-heading font-bold mb-5 flex items-center gap-2 text-black dark:text-white">
                    <Calendar size={18} /> Deze Week
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Pageviews', val: stats.page_views_week },
                      { label: 'Berichten', val: stats.contacts_week },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100/50 dark:border-white/[0.05] last:border-0">
                        <span className="text-gray-500 dark:text-gray-400">{row.label}</span>
                        <span className="text-xl font-heading font-bold text-black dark:text-white">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={GLASS_CARD + " p-6"}>
                  <h3 className="text-lg font-heading font-bold mb-5 flex items-center gap-2 text-black dark:text-white">
                    <Mail size={18} /> Laatste Berichten
                  </h3>
                  <div className="space-y-3">
                    {contacts.slice(0, 4).map(c => (
                      <div key={c.id} className="flex items-center gap-3 text-sm py-1">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${c.read ? 'bg-gray-300 dark:bg-neutral-600' : 'bg-black dark:bg-white'}`} />
                        <span className="font-medium truncate flex-1 text-black dark:text-white">{c.name}</span>
                        <span className="text-gray-400 dark:text-gray-500 text-xs shrink-0">{new Date(c.timestamp).toLocaleDateString('nl-NL')}</span>
                      </div>
                    ))}
                    {!contacts.length && <p className="text-gray-400 dark:text-gray-500 text-sm">Nog geen berichten</p>}
                  </div>
                </div>
              </div>

              {/* CSV Quick Stats */}
              <div className={GLASS_CARD + " p-6"}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-bold flex items-center gap-2 text-black dark:text-white">
                    <Upload size={18} /> CSV Leads Overzicht
                  </h3>
                  <button onClick={() => setActiveTab('csv')} className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    Bekijk alles →
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Totaal', val: csvStats.totaal, color: isDark ? '#fff' : '#000' },
                    { label: 'Benaderd', val: csvStats.benaderd, color: '#F59E0B' },
                    { label: 'Gereageerd', val: csvStats.gereageerd, color: '#10B981' },
                    { label: 'Overgeslagen', val: csvStats.overgeslagen, color: '#6B7280' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/40 dark:bg-white/[0.03] rounded-xl p-3 border border-gray-100/50 dark:border-white/[0.05]">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">{s.label}</p>
                      <p className="text-2xl font-black" style={{ color: s.color }}>{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* CSV LEADS TAB */}
          {activeTab === "csv" && (
            <motion.div key="csv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-black dark:text-white">CSV Leads</h2>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">Importeer & beheer leads van Google Maps Scraper</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => csvFileRef.current?.click()}
                    className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full flex items-center gap-2 transition-all"
                    data-testid="csv-import-button">
                    <Upload size={14} /> Importeren
                  </button>
                  {csvLeads.length > 0 && (
                    <button onClick={clearCsv}
                      className="px-4 py-2.5 text-red-500 text-xs font-bold rounded-full border border-red-200/50 dark:border-red-800/30 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-1.5 transition-all"
                      data-testid="csv-clear-all">
                      <Trash2 size={13} /> Wissen
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Totaal', val: csvStats.totaal, color: isDark ? '#fff' : '#000' },
                  { label: 'Zonder Website', val: csvStats.zonderWebsite, color: '#3B82F6' },
                  { label: 'Benaderd', val: csvStats.benaderd, color: '#F59E0B' },
                  { label: 'Gereageerd', val: csvStats.gereageerd, color: '#10B981' },
                ].map((s, i) => (
                  <div key={i} className={`${GLASS_CARD} p-4`} data-testid={`csv-stat-${i}`}>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">{s.label}</p>
                    <p className="text-2xl sm:text-3xl font-black" style={{ color: s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Search & Filter */}
              {csvLeads.length > 0 && (
                <div className={`${GLASS_CARD} p-3 sm:p-4 mb-6`}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 relative">
                      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input value={csvSearch} onChange={e => setCsvSearch(e.target.value)} placeholder="Zoek op naam of plaats..."
                        className={`w-full pl-10 pr-4 py-2.5 text-sm ${GLASS_INPUT}`} data-testid="csv-search-input" />
                    </div>
                    <button onClick={() => setCsvOnlyNoWebsite(!csvOnlyNoWebsite)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                        csvOnlyNoWebsite
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400'
                          : 'bg-white/50 dark:bg-white/[0.06] border-gray-200/60 dark:border-white/10 text-gray-500 dark:text-gray-400'
                      }`} data-testid="csv-no-website-toggle">
                      <Globe size={13} /> {csvOnlyNoWebsite ? 'Zonder website' : 'Alle websites'}
                    </button>
                    <select value={csvStatusFilter} onChange={e => setCsvStatusFilter(e.target.value)}
                      className={`px-4 py-2.5 text-sm font-medium ${GLASS_INPUT} cursor-pointer`} data-testid="csv-status-filter">
                      <option value="alle">Alle Status</option>
                      {CSV_STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <span className="text-xs text-gray-400 dark:text-gray-500 self-center whitespace-nowrap">{filteredCsv.length} resultaten</span>
                  </div>
                </div>
              )}

              {/* Table / Empty */}
              {csvLeads.length === 0 ? (
                <div className={`${GLASS_CARD} p-12 sm:p-16 text-center`}>
                  <div className={`w-16 h-16 ${GLASS} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Upload size={28} className="text-gray-300 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Geen leads geimporteerd</h3>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">Upload een CSV van de Google Maps Scraper</p>
                  <button onClick={() => csvFileRef.current?.click()}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm">
                    CSV Importeren
                  </button>
                </div>
              ) : (
                <div className={`${GLASS_CARD} overflow-hidden`}>
                  {/* Desktop */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full" data-testid="csv-leads-table">
                      <thead>
                        <tr className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-gray-100/50 dark:border-white/[0.05]">
                          {[
                            { key: 'naam', label: 'Bedrijfsnaam', sortable: true },
                            { key: 'categorie', label: 'Categorie', sortable: true },
                            { key: 'plaats', label: 'Plaats', sortable: true },
                            { key: 'website', label: 'Website', sortable: true },
                            { key: 'telefoon', label: 'Telefoon', sortable: false },
                            { key: 'rating', label: 'Rating', sortable: true, center: true },
                            { key: 'reviews', label: 'Reviews', sortable: true, center: true },
                            { key: 'status', label: 'Status', sortable: true },
                            { key: 'whatsapp', label: 'WhatsApp', sortable: false, center: true },
                            { key: 'delete', label: '', sortable: false },
                          ].map((h) => (
                            <th key={h.key}
                              onClick={h.sortable ? () => toggleCsvSort(h.key) : undefined}
                              className={`${h.center ? 'text-center' : 'text-left'} px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ${h.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 select-none transition-colors' : ''}`}
                              data-testid={`csv-header-${h.key}`}>
                              <span className="inline-flex items-center gap-1">
                                {h.label}
                                {h.sortable && csvSortCol === h.key && (
                                  csvSortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                                )}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sortedCsv.map(lead => {
                          const sc = CSV_STATUS_OPTIONS.find(s => s.value === lead.status) || CSV_STATUS_OPTIONS[0];
                          const hasWebsite = lead.website && lead.website.trim() !== '';
                          return (
                            <tr key={lead.id} className="border-b border-gray-100/30 dark:border-white/[0.03] hover:bg-white/40 dark:hover:bg-white/[0.03] transition-colors" data-testid={`csv-lead-row-${lead.id}`}>
                              <td className="px-3 py-3">
                                <a href={`https://www.google.com/maps/search/${encodeURIComponent(lead.naam + ' ' + lead.adres)}`}
                                  target="_blank" rel="noopener noreferrer"
                                  className="font-semibold text-sm text-black dark:text-white hover:underline flex items-center gap-1">
                                  {lead.naam} <ExternalLink size={10} className="text-gray-400 shrink-0" />
                                </a>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">{lead.categorie || '-'}</td>
                              <td className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">{extractCity(lead.adres)}</td>
                              <td className="px-3 py-3">
                                {hasWebsite ? (
                                  <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-[140px]">
                                    {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                                  </a>
                                ) : <span className="text-xs font-semibold text-red-500">Geen website</span>}
                              </td>
                              <td className="px-3 py-3">
                                {lead.telefoon ? (
                                  <a href={`tel:${lead.telefoon}`} className="text-sm font-medium flex items-center gap-1 text-black dark:text-white hover:underline">
                                    <Phone size={12} />{lead.telefoon}
                                  </a>
                                ) : <span className="text-sm text-gray-400">-</span>}
                              </td>
                              <td className="px-3 py-3 text-center">
                                {lead.rating ? (
                                  <span className="text-sm font-bold flex items-center justify-center gap-1 text-amber-500">
                                    <Star size={12} fill="currentColor" />{formatRating(lead.rating)}
                                  </span>
                                ) : <span className="text-xs text-gray-400">-</span>}
                              </td>
                              <td className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">{lead.aantalReviews || '-'}</td>
                              <td className="px-3 py-3">
                                <select value={lead.status} onChange={e => updateCsvStatus(lead.id, e.target.value)}
                                  className="px-2.5 py-1 rounded-full text-xs font-bold border-0 cursor-pointer"
                                  style={{ backgroundColor: isDark ? sc.darkBg : sc.bg, color: sc.color }}
                                  data-testid={`csv-status-select-${lead.id}`}>
                                  {CSV_STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                              </td>
                              <td className="px-3 py-3 text-center">
                                {lead.telefoon ? (
                                  <a href={getWhatsAppUrl(lead)} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold hover:bg-green-600 transition-colors"
                                    data-testid={`csv-whatsapp-${lead.id}`}>
                                    <MessageSquare size={11} /> WhatsApp
                                  </a>
                                ) : <span className="text-xs text-gray-400">-</span>}
                              </td>
                              <td className="px-3 py-3 text-center">
                                <button onClick={() => deleteCsvLead(lead.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  data-testid={`csv-delete-${lead.id}`}>
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden divide-y divide-gray-100/30 dark:divide-white/[0.03]">
                    {sortedCsv.map(lead => {
                      const sc = CSV_STATUS_OPTIONS.find(s => s.value === lead.status) || CSV_STATUS_OPTIONS[0];
                      const hasWebsite = lead.website && lead.website.trim() !== '';
                      return (
                        <div key={lead.id} className="p-4" data-testid={`csv-lead-card-${lead.id}`}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <a href={`https://www.google.com/maps/search/${encodeURIComponent(lead.naam + ' ' + lead.adres)}`}
                                target="_blank" rel="noopener noreferrer"
                                className="font-semibold text-sm text-black dark:text-white hover:underline flex items-center gap-1">
                                {lead.naam} <ExternalLink size={10} className="text-gray-400" />
                              </a>
                              <p className="text-xs text-gray-400 dark:text-gray-500">{lead.categorie} — {extractCity(lead.adres)}</p>
                            </div>
                            <select value={lead.status} onChange={e => updateCsvStatus(lead.id, e.target.value)}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold border-0 cursor-pointer"
                              style={{ backgroundColor: isDark ? sc.darkBg : sc.bg, color: sc.color }}>
                              {CSV_STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                            {hasWebsite ? (
                              <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                                target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[180px]">
                                {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                              </a>
                            ) : <span className="font-semibold text-red-500">Geen website</span>}
                            {lead.rating && <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star size={11} fill="currentColor" />{formatRating(lead.rating)}</span>}
                            {lead.aantalReviews && <span className="text-gray-400">({lead.aantalReviews})</span>}
                          </div>
                          {lead.telefoon && <p className="text-xs font-medium flex items-center gap-1 text-black dark:text-white mb-2"><Phone size={11} />{lead.telefoon}</p>}
                          <div className="flex items-center gap-2">
                            {lead.telefoon && (
                              <a href={getWhatsAppUrl(lead)} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600">
                                <MessageSquare size={11} /> WhatsApp
                              </a>
                            )}
                            <button onClick={() => deleteCsvLead(lead.id)} className="p-2 text-gray-400 hover:text-red-500 border border-gray-200/40 dark:border-white/10 rounded-lg">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* CONTACTS TAB */}
          {activeTab === "contacts" && (
            <motion.div key="contacts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {contacts.length === 0 ? (
                <div className={`${GLASS_CARD} p-12 text-center`}>
                  <Mail className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
                  <p className="text-gray-500 dark:text-gray-400">Nog geen berichten ontvangen</p>
                </div>
              ) : contacts.map(c => (
                <div key={c.id} className={`${GLASS_CARD} p-5 sm:p-6 ${!c.read ? '!border-black/30 dark:!border-white/20' : ''}`} data-testid={`contact-${c.id}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {!c.read && <span className="w-2 h-2 bg-black dark:bg-white rounded-full" />}
                        <h4 className="font-heading font-bold text-lg text-black dark:text-white">{c.name}</h4>
                      </div>
                      <a href={`mailto:${c.email}`} className="text-sm text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">{c.email}</a>
                    </div>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{new Date(c.timestamp).toLocaleString('nl-NL')}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap text-sm leading-relaxed">{c.message}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100/40 dark:border-white/[0.05]">
                    {!c.read && (
                      <button onClick={() => markAsRead(c.id)} className="text-sm text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
                        <Check size={14} /> Gelezen
                      </button>
                    )}
                    <button onClick={() => deleteContact(c.id)} className="text-sm text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors">
                      <Trash2 size={14} /> Verwijderen
                    </button>
                    <a href={`mailto:${c.email}?subject=Re: Website Aanvraag - Yrvante`} className="text-sm text-black dark:text-white hover:underline ml-auto font-medium">
                      Beantwoorden →
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && pageviews && (
            <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className={GLASS_CARD + " p-6"}>
                <h3 className="text-lg font-heading font-bold mb-5 flex items-center gap-2 text-black dark:text-white">
                  <TrendingUp size={18} /> Pageviews per Dag
                </h3>
                <div className="space-y-2.5">
                  {pageviews.daily_views && Object.keys(pageviews.daily_views).length > 0 ? (
                    Object.entries(pageviews.daily_views).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 14).map(([date, count]) => {
                      const max = Math.max(...Object.values(pageviews.daily_views));
                      return (
                        <div key={date} className="flex items-center gap-4">
                          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 w-24">{date}</span>
                          <div className="flex-1 bg-black/[0.04] dark:bg-white/[0.04] h-5 rounded-md overflow-hidden">
                            <div className="bg-black dark:bg-white h-full rounded-md transition-all" style={{ width: `${Math.min((count / max) * 100, 100)}%` }} />
                          </div>
                          <span className="text-sm font-mono w-12 text-right font-bold text-black dark:text-white">{count}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-sm">Geen pageview data beschikbaar</p>
                  )}
                </div>
              </div>
              <div className={GLASS_CARD + " p-6"}>
                <h3 className="text-lg font-heading font-bold mb-4 text-black dark:text-white">Pagina's</h3>
                <div className="space-y-1">
                  {pageviews.page_breakdown && Object.keys(pageviews.page_breakdown).length > 0 ? (
                    Object.entries(pageviews.page_breakdown).sort((a, b) => b[1] - a[1]).map(([page, count]) => (
                      <div key={page} className="flex items-center justify-between py-2.5 border-b border-gray-100/30 dark:border-white/[0.04] last:border-0">
                        <span className="font-mono text-sm text-gray-600 dark:text-gray-300">{page}</span>
                        <span className="font-mono text-sm font-bold text-black dark:text-white">{count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-sm">Geen pagina data beschikbaar</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
