import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  Search, Phone, MapPin, ExternalLink, Save, Trash2, Edit2, Check, X, 
  Download, ChevronDown, BarChart3, Users, Lock, ArrowLeft, Loader2, RefreshCw,
  Bookmark, FileText, ArrowRight, Menu as MenuIcon, Mail
} from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';
const API = `${API_BASE}/api/admin/leadfinder`;
const LOGO_URL = "/logo-nav.png";
const BG_IMAGE = "/bg-pattern.jpg";

const LeadFinderPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('zoeken');
  const [branche, setBranche] = useState('');
  const [stad, setStad] = useState('');
  const [zoekResultaten, setZoekResultaten] = useState([]);
  const [opgeslagenLeads, setOpgeslagenLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [totaalGevonden, setTotaalGevonden] = useState(0);
  const [autoSave, setAutoSave] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [editNotitie, setEditNotitie] = useState('');
  const [statusFilter, setStatusFilter] = useState('alle');

  useEffect(() => {
    if (localStorage.getItem('leadfinder_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
      loadDashboard();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('leadfinder_auth', 'true');
        toast.success('Welkom!');
      } else {
        setAuthError('Ongeldig wachtwoord');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setAuthError('Verbindingsfout - probeer opnieuw');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('leadfinder_auth');
  };

  const loadLeads = async () => {
    try {
      const res = await fetch(`${API}/leads`);
      const data = await res.json();
      setOpgeslagenLeads(data.leads || []);
    } catch (err) { console.error(err); }
  };

  const loadDashboard = async () => {
    try {
      const res = await fetch(`${API}/dashboard`);
      const data = await res.json();
      setDashboardData(data);
    } catch (err) { console.error(err); }
  };

  const zoekBedrijven = async (useToken = false) => {
    if (!branche.trim() || !stad.trim()) {
      toast.error('Vul branche en stad in');
      return;
    }
    setLoading(true);
    try {
      const body = { branche, stad };
      if (useToken && nextPageToken) body.pageToken = nextPageToken;
      const res = await fetch(`${API}/zoek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.error) { toast.error(data.error); setLoading(false); return; }
      if (useToken) {
        setZoekResultaten(prev => [...prev, ...data.leads]);
      } else {
        setZoekResultaten(data.leads || []);
      }
      setNextPageToken(data.nextPageToken || null);
      setTotaalGevonden(data.totaal_gevonden || 0);
      if (!useToken) toast.success(`${data.totaal_gevonden} bedrijven gevonden!`);
      if (data.note) toast.info(data.note);
      if (autoSave && data.leads?.length) {
        for (const lead of data.leads) await saveLead(lead, true);
        toast.success(`${data.leads.length} leads opgeslagen`);
      }
    } catch (err) { toast.error('Zoekfout'); }
    finally { setLoading(false); }
  };

  const saveLead = async (lead, silent = false) => {
    try {
      const res = await fetch(`${API}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naam: lead.naam, adres: lead.adres, telefoonnummer: lead.telefoonnummer, google_maps_url: lead.google_maps_url, place_id: lead.place_id, branche, stad })
      });
      const data = await res.json();
      if (data.id) { if (!silent) toast.success('Opgeslagen!'); loadLeads(); loadDashboard(); }
      else if (data.error?.includes('bestaat')) { if (!silent) toast.info('Al opgeslagen'); }
    } catch (err) { if (!silent) toast.error('Fout'); }
  };

  const updateLeadStatus = async (id, status) => {
    await fetch(`${API}/lead/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    loadLeads(); loadDashboard(); toast.success('Status bijgewerkt');
  };

  const updateLeadNotitie = async (id) => {
    await fetch(`${API}/lead/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ notitie: editNotitie }) });
    setEditingLead(null); setEditNotitie(''); loadLeads(); toast.success('Notitie opgeslagen');
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Verwijderen?')) return;
    await fetch(`${API}/lead/${id}`, { method: 'DELETE' });
    loadLeads(); loadDashboard(); toast.success('Verwijderd');
  };

  const exportCSV = () => {
    const data = activeTab === 'zoeken' ? zoekResultaten : opgeslagenLeads;
    if (!data.length) { toast.error('Geen data'); return; }
    const csv = [['Naam','Adres','Telefoon','Maps','Status','Notitie'].join(','), ...data.map(l => [l.naam,l.adres,l.telefoonnummer,l.google_maps_url,l.status,l.notitie].map(c=>`"${c||''}"`).join(','))].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`; a.click();
  };

  const filteredLeads = opgeslagenLeads.filter(lead => {
    if (statusFilter === 'alle') return true;
    return (lead.status || 'nieuw') === statusFilter;
  });

  // Login Screen - Same style as Yrvante homepage
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background pattern like homepage */}
        <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.3) brightness(1.1)' }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white/95 to-white/80" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="text-center mb-8">
              <Link to="/"><img src={LOGO_URL} alt="Yrvante" className="h-8 mx-auto mb-6" /></Link>
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Lock className="text-gray-400" size={28} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-black mb-2">ADMIN</h1>
              <p className="text-gray-500">Voer het wachtwoord in</p>
            </div>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Wachtwoord" 
                className="w-full bg-white border border-gray-200 rounded-xl focus:border-black outline-none py-4 px-4 transition-colors mb-4" 
                autoFocus 
              />
              {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}
              <button type="submit" className="w-full px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-600 transition-all rounded-full">
                Inloggen
              </button>
            </form>
            <div className="text-center mt-6">
              <Link to="/" className="text-gray-500 text-sm hover:text-black flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={14} />Terug naar home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main App - Same style as Yrvante homepage
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Same as homepage */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-6" />
            </Link>
            
            {/* Tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: 'zoeken', label: 'ZOEKEN', icon: Search },
                { id: 'leads', label: 'MIJN LEADS', icon: MenuIcon },
                { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                    activeTab === tab.id 
                      ? 'bg-gray-500 text-white' 
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={logout} className="text-xs text-gray-500 hover:text-black transition-colors">
                Uitloggen
              </button>
              <Link to="/" className="px-6 py-2.5 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.1em] hover:bg-gray-600 transition-all rounded-full">
                START PROJECT →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* ZOEKEN TAB */}
        {activeTab === 'zoeken' && (
          <motion.div key="zoeken" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Section - Exact same style as homepage */}
            <section className="min-h-[80vh] pt-24 relative overflow-hidden">
              {/* Background - Same as homepage */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0" style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.3) brightness(1.1)' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
              </div>

              <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="min-h-[calc(80vh-120px)] flex flex-col justify-center">
                  
                  {/* Badge - Same style as homepage */}
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200" style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.25), 0 2px 10px rgba(0, 0, 0, 0.03)' }}>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
                      </span>
                      <span className="text-sm text-gray-600">Lead Finder — Powered by Yrvante</span>
                    </div>
                  </motion.div>

                  {/* Slogan - Same style as homepage */}
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-sm font-medium uppercase tracking-[0.25em] text-gray-600 mb-4">
                    INTERN TOOL — YRVANTE
                  </motion.p>

                  {/* Main Headline - EXACT same style as homepage */}
                  <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[12vw] lg:text-[8vw] font-black leading-[0.95] tracking-tighter mb-10">
                    <span className="block">VIND</span>
                    <span className="block">BEDRIJVEN</span>
                    <span className="block text-gray-400">ZONDER</span>
                    <span className="block text-gray-400">WEBSITE</span>
                  </motion.h1>

                  {/* Description - Same style */}
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm lg:text-base text-gray-500 max-w-lg leading-relaxed mb-8">
                    Typ één of meerdere branches (gescheiden door komma) en een stad — de app filtert automatisch wie nog geen online aanwezigheid heeft.
                  </motion.p>

                  {/* Search Form - Same button style as homepage */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 mb-6">
                    <input
                      value={branche}
                      onChange={e => setBranche(e.target.value)}
                      placeholder="Branch(es) — bijv. restaurant, kapper"
                      className="flex-1 min-w-[250px] bg-white border border-gray-200 rounded-xl focus:border-black outline-none py-4 px-4 transition-colors"
                    />
                    <input
                      value={stad}
                      onChange={e => setStad(e.target.value)}
                      placeholder="Stad"
                      className="w-40 bg-white border border-gray-200 rounded-xl focus:border-black outline-none py-4 px-4 transition-colors"
                    />
                    <button
                      onClick={() => zoekBedrijven(false)}
                      disabled={loading}
                      className="group px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-600 transition-all rounded-full disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                      ZOEKEN
                    </button>
                  </motion.div>

                  {/* Feature Tags - Same style */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2">
                    {['Google Places API', 'Multi-Branche', 'CSV Export', 'Lead Opslaan'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-700">{tag}</span>
                    ))}
                    <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={autoSave} onChange={e => setAutoSave(e.target.checked)} className="w-3 h-3 accent-gray-500" />
                      Auto-opslaan {autoSave ? 'AAN' : 'UIT'}
                    </label>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Results Section */}
            {zoekResultaten.length > 0 && (
              <section className="py-20 md:py-28 bg-gray-50">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black tracking-tighter">{totaalGevonden} RESULTATEN</h2>
                    <button onClick={exportCSV} className="px-6 py-3 border border-gray-400 text-gray-700 text-xs font-bold uppercase tracking-[0.1em] hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-all rounded-full flex items-center gap-2">
                      <Download size={14} /> CSV
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {zoekResultaten.map((lead, i) => (
                      <div key={lead.place_id || i} className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-black transition-all">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{lead.naam}</h3>
                            <p className="text-gray-500 text-sm flex items-center gap-2 mb-1"><MapPin size={14} />{lead.adres}</p>
                            {lead.telefoonnummer && <a href={`tel:${lead.telefoonnummer}`} className="text-gray-700 font-medium text-sm flex items-center gap-2 hover:text-black"><Phone size={14} />{lead.telefoonnummer}</a>}
                          </div>
                          <div className="flex gap-2">
                            <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-200 rounded-full hover:border-black transition-colors"><ExternalLink size={18} /></a>
                            <button onClick={() => saveLead(lead)} className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"><Save size={18} /></button>
                          </div>
                        </div>
                        <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
                          <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black">KVK →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' facebook')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black">Facebook →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' instagram')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black">Instagram →</a>
                        </div>
                      </div>
                    ))}
                  </div>
                  {nextPageToken && (
                    <div className="text-center mt-10">
                      <button onClick={() => zoekBedrijven(true)} disabled={loading} className="px-8 py-4 border border-gray-400 text-gray-700 text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-500 hover:text-white transition-all rounded-full flex items-center gap-2 mx-auto">
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <ChevronDown size={16} />} MEER LADEN
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* How It Works */}
            <section className="py-20 md:py-28 border-t border-gray-100">
              <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 text-center mb-12">HOE HET WERKT</p>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { num: '01', title: 'VOER IN', desc: 'Typ een of meerdere branches (komma-gescheiden) en een stad.' },
                    { num: '02', title: 'WIJ ZOEKEN', desc: 'We doorzoeken Google Maps voor bedrijven zonder website.' },
                    { num: '03', title: 'BEL & SLUIT', desc: 'Sla leads op, check FB/IG/KVK, exporteer als CSV.' }
                  ].map(step => (
                    <div key={step.num} className="bg-white border border-gray-200 p-8 rounded-2xl text-center hover:border-black transition-all">
                      <p className="text-xs text-gray-400 mb-4 tracking-wider">{step.num}</p>
                      <h3 className="text-2xl font-black tracking-tighter mb-3">{step.title}</h3>
                      <p className="text-gray-500">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* MIJN LEADS TAB */}
        {activeTab === 'leads' && (
          <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen relative">
            {/* Background */}
            <div className="absolute inset-0 -z-10 opacity-20" style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', filter: 'saturate(0.2)' }} />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/95 to-white/80" />
            
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-20">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">OPGESLAGEN</p>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <h1 className="text-[10vw] lg:text-[6vw] font-black leading-[0.95] tracking-tighter">
                  MIJN<br/><span className="text-gray-400">LEADS</span> <span className="text-gray-300">{opgeslagenLeads.length}</span>
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  {['alle', 'nieuw', 'gebeld', 'offerte', 'klant'].map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                        statusFilter === status ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'alle' ? 'Alle' : status}
                    </button>
                  ))}
                  <button onClick={loadLeads} className="p-2 border border-gray-200 rounded-full hover:border-black transition-colors">
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="bg-white border border-gray-200 p-16 rounded-2xl text-center">
                  <Bookmark size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-2xl font-black tracking-tighter mb-2">GEEN LEADS</h3>
                  <p className="text-gray-500 mb-6">Zoek bedrijven en sla ze op via de Zoeken tab.</p>
                  <button onClick={() => setActiveTab('zoeken')} className="px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-600 transition-all rounded-full">
                    GA ZOEKEN
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredLeads.map(lead => (
                    <div key={lead.id} className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-black transition-all">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{lead.naam}</h3>
                            <select
                              value={lead.status || 'nieuw'}
                              onChange={e => updateLeadStatus(lead.id, e.target.value)}
                              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 cursor-pointer focus:outline-none focus:border-black transition-colors font-bold uppercase"
                            >
                              <option value="nieuw">Nieuw</option>
                              <option value="gebeld">Gebeld</option>
                              <option value="offerte">Offerte</option>
                              <option value="klant">Klant</option>
                            </select>
                          </div>
                          <p className="text-gray-500 text-sm flex items-center gap-2 mb-1"><MapPin size={14} />{lead.adres}</p>
                          {lead.telefoonnummer && <a href={`tel:${lead.telefoonnummer}`} className="text-gray-700 font-medium text-sm flex items-center gap-2 hover:text-black"><Phone size={14} />{lead.telefoonnummer}</a>}
                          <div className="mt-4">
                            {editingLead === lead.id ? (
                              <div className="flex gap-2">
                                <input value={editNotitie} onChange={e => setEditNotitie(e.target.value)} placeholder="Notitie..." className="flex-1 bg-white border border-gray-200 rounded-xl focus:border-black outline-none py-2 px-4 transition-colors text-sm" autoFocus />
                                <button onClick={() => updateLeadNotitie(lead.id)} className="p-2 bg-gray-500 text-white rounded-full"><Check size={16} /></button>
                                <button onClick={() => setEditingLead(null)} className="p-2 border border-gray-200 rounded-full hover:border-black"><X size={16} /></button>
                              </div>
                            ) : (
                              <div onClick={() => { setEditingLead(lead.id); setEditNotitie(lead.notitie || ''); }} className="text-sm text-gray-500 cursor-pointer flex items-center gap-2 hover:text-black transition-colors">
                                <Edit2 size={12} />{lead.notitie || 'Klik voor notitie...'}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-200 rounded-full hover:border-black transition-colors"><ExternalLink size={18} /></a>
                          <button onClick={() => deleteLead(lead.id)} className="p-3 border border-red-200 rounded-full hover:border-red-400 hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-20">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">OVERZICHT</p>
              <h1 className="text-[10vw] lg:text-[6vw] font-black leading-[0.95] tracking-tighter mb-12">DASHBOARD</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'TOTAAL', value: dashboardData?.totaal_leads || 0 },
                  { label: 'NIEUW', value: dashboardData?.status_verdeling?.nieuw || 0 },
                  { label: 'GEBELD', value: dashboardData?.status_verdeling?.gebeld || 0 },
                  { label: 'KLANT', value: dashboardData?.status_verdeling?.klant || 0 }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-black transition-all">
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">{stat.label}</p>
                    <p className="text-5xl font-black tracking-tighter">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-6">STATUS VERDELING</p>
                  <div className="space-y-4">
                    {['nieuw', 'gebeld', 'offerte', 'klant'].map(key => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-700 uppercase text-sm font-bold">{key}</span>
                        <span className="text-gray-400 font-mono">{dashboardData?.status_verdeling?.[key] || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-6">RECENTE ZOEKOPDRACHTEN</p>
                  {dashboardData?.recente_zoekopdrachten?.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.recente_zoekopdrachten.slice(0, 5).map((z, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <span className="text-gray-700">{z.branche} — {z.stad}</span>
                          <span className="text-gray-400 text-sm">{z.totaal}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">Nog geen zoekopdrachten</p>
                  )}
                </div>
              </div>

              {/* Export */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText size={20} className="text-gray-600" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400">EXPORT OPTIONS</p>
                </div>
                <p className="text-gray-600 mb-6">Exporteer je leads als CSV bestand.</p>
                <button onClick={exportCSV} className="px-8 py-4 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-600 transition-all rounded-full flex items-center gap-2">
                  <Download size={16} /> EXPORT CSV
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadFinderPage;
