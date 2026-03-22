import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  Search, Phone, MapPin, ExternalLink, Save, Trash2, Edit2, Check, X, 
  Download, ChevronDown, BarChart3, Users, Lock, ArrowLeft, Loader2, RefreshCw,
  Bookmark, FileText, ArrowRight, Menu as MenuIcon
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
      setAuthError('Verbindingsfout');
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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <Link to="/"><img src={LOGO_URL} alt="Yrvante" className="h-8 mx-auto mb-6" /></Link>
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="text-gray-400" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">Voer het wachtwoord in</p>
            </div>
            <form onSubmit={handleLogin}>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Wachtwoord" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none mb-4" autoFocus />
              {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}
              <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">Inloggen</button>
            </form>
            <div className="text-center mt-6">
              <Link to="/" className="text-gray-500 text-sm hover:text-gray-700 flex items-center justify-center gap-2"><ArrowLeft size={14} />Terug naar home</Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="Yrvante" className="h-6 brightness-0 invert" />
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
            
            <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
              START PROJECT <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* ZOEKEN TAB */}
        {activeTab === 'zoeken' && (
          <motion.div key="zoeken" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0" style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.3) brightness(1.1)' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
              </div>
              
              {/* Watermark Logo */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                <img src={LOGO_URL} alt="" className="w-[400px] grayscale" />
              </div>

              <div className="max-w-7xl mx-auto px-6 py-16 w-full">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-8">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">Lead Finder — Powered by Yrvante</span>
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">INTERN TOOL — YRVANTE</p>

                {/* Big Typography */}
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.85] tracking-tight mb-8">
                  <span className="block text-black">VIND</span>
                  <span className="block text-black">BEDRIJVEN</span>
                  <span className="block text-gray-400">ZONDER</span>
                  <span className="block text-gray-400">WEBSITE.</span>
                </h1>

                <p className="text-gray-600 max-w-md mb-8">
                  Typ één of meerdere branches (gescheiden door komma) en een stad — de app filtert automatisch wie nog geen online aanwezigheid heeft.
                </p>

                {/* Search Form */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <input
                    value={branche}
                    onChange={e => setBranche(e.target.value)}
                    placeholder="Branch(es) — bijv. restaurant, kapper, bakkerij"
                    className="flex-1 min-w-[250px] px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none bg-white"
                  />
                  <input
                    value={stad}
                    onChange={e => setStad(e.target.value)}
                    placeholder="Stad — bijv. Amsterdam"
                    className="w-48 px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none bg-white"
                  />
                  <button
                    onClick={() => zoekBedrijven(false)}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                    ZOEKEN
                  </button>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Google Places API', 'Multi-Branche', 'CSV Export', 'Lead Opslaan', 'KVK / FB / IG'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600">{tag}</span>
                  ))}
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={autoSave} onChange={e => setAutoSave(e.target.checked)} className="w-3 h-3" />
                    Auto-opslaan uit
                  </label>
                </div>
              </div>
            </section>

            {/* Results Section */}
            {zoekResultaten.length > 0 && (
              <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{totaalGevonden} resultaten gevonden</h2>
                    <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-white transition-colors">
                      <Download size={16} /> CSV Export
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {zoekResultaten.map((lead, i) => (
                      <div key={lead.place_id || i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{lead.naam}</h3>
                            <p className="text-gray-500 text-sm flex items-center gap-2 mb-1"><MapPin size={14} />{lead.adres}</p>
                            {lead.telefoonnummer && <a href={`tel:${lead.telefoonnummer}`} className="text-blue-600 text-sm flex items-center gap-2"><Phone size={14} />{lead.telefoonnummer}</a>}
                          </div>
                          <div className="flex gap-2">
                            <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><ExternalLink size={18} className="text-gray-600" /></a>
                            <button onClick={() => saveLead(lead)} className="p-2 bg-black text-white rounded-lg hover:bg-gray-800"><Save size={18} /></button>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                          <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-black">KVK →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' facebook')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-black">Facebook →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' instagram')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-black">Instagram →</a>
                        </div>
                      </div>
                    ))}
                  </div>
                  {nextPageToken && (
                    <div className="text-center mt-8">
                      <button onClick={() => zoekBedrijven(true)} disabled={loading} className="flex items-center gap-2 px-6 py-3 mx-auto border border-gray-200 rounded-xl hover:bg-white transition-colors">
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <ChevronDown size={18} />} Meer laden
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* How It Works */}
            <section className="py-16 border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 text-center mb-12">HOE HET WERKT</p>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { num: '01', title: 'Voer in', desc: 'Typ een of meerdere branches (komma-gescheiden) en een stad.' },
                    { num: '02', title: 'Wij zoeken', desc: 'We doorzoeken Google Maps voor bedrijven zonder website.' },
                    { num: '03', title: 'Bel & Sluit', desc: 'Sla leads op, check FB/IG/KVK, exporteer als CSV of Sheets.' }
                  ].map(step => (
                    <div key={step.num} className="bg-gray-50 rounded-2xl p-8 text-center">
                      <p className="text-xs text-gray-400 mb-4">{step.num}</p>
                      <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FileText size={16} /> Yrvante Lead Finder
                </div>
                <p className="text-sm text-gray-400">© 2026 Yrvante — Smart Web & Software</p>
                <a href="https://yrvante.com" className="text-sm text-gray-400 hover:text-black">yrvante.com →</a>
              </div>
            </footer>
          </motion.div>
        )}

        {/* MIJN LEADS TAB */}
        {activeTab === 'leads' && (
          <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">OPGESLAGEN</p>
              <div className="flex items-end justify-between mb-8">
                <h1 className="font-serif text-5xl">Mijn Leads <span className="text-gray-300">{opgeslagenLeads.length}</span></h1>
                <div className="flex items-center gap-2">
                  {['alle', 'nieuw', 'gebeld', 'offerte', 'klant'].map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        statusFilter === status ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'alle' ? 'Alle' : status === 'nieuw' ? 'Nieuw' : status === 'gebeld' ? 'Gebeld' : status === 'offerte' ? 'Offerte gestuurd' : 'Klant geworden'}
                    </button>
                  ))}
                  <button onClick={loadLeads} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RefreshCw size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-16 text-center">
                  <Bookmark size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="font-serif text-2xl mb-2">Nog geen leads opgeslagen</h3>
                  <p className="text-gray-500 mb-6">Zoek bedrijven en sla ze op via de Zoeken tab.</p>
                  <button onClick={() => setActiveTab('zoeken')} className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800">
                    GA ZOEKEN
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredLeads.map(lead => (
                    <div key={lead.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{lead.naam}</h3>
                            <select
                              value={lead.status || 'nieuw'}
                              onChange={e => updateLeadStatus(lead.id, e.target.value)}
                              className="text-xs px-2 py-1 rounded-md border border-gray-200 cursor-pointer focus:outline-none"
                            >
                              <option value="nieuw">Nieuw</option>
                              <option value="gebeld">Gebeld</option>
                              <option value="offerte">Offerte gestuurd</option>
                              <option value="klant">Klant geworden</option>
                            </select>
                          </div>
                          <p className="text-gray-500 text-sm flex items-center gap-2 mb-1"><MapPin size={14} />{lead.adres}</p>
                          {lead.telefoonnummer && <a href={`tel:${lead.telefoonnummer}`} className="text-blue-600 text-sm flex items-center gap-2"><Phone size={14} />{lead.telefoonnummer}</a>}
                          <div className="mt-3">
                            {editingLead === lead.id ? (
                              <div className="flex gap-2">
                                <input value={editNotitie} onChange={e => setEditNotitie(e.target.value)} placeholder="Notitie..." className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none" autoFocus />
                                <button onClick={() => updateLeadNotitie(lead.id)} className="p-2 bg-black text-white rounded-lg"><Check size={16} /></button>
                                <button onClick={() => setEditingLead(null)} className="p-2 border border-gray-200 rounded-lg"><X size={16} /></button>
                              </div>
                            ) : (
                              <div onClick={() => { setEditingLead(lead.id); setEditNotitie(lead.notitie || ''); }} className="text-sm text-gray-500 cursor-pointer flex items-center gap-2 hover:text-black">
                                <Edit2 size={12} />{lead.notitie || 'Klik voor notitie...'}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><ExternalLink size={18} className="text-gray-600" /></a>
                          <button onClick={() => deleteLead(lead.id)} className="p-2 border border-red-200 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none opacity-30" style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.2)' }} />
          </motion.div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">OVERZICHT</p>
              <h1 className="font-serif text-5xl mb-12">Dashboard</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">TOTAAL OPGESLAGEN</p>
                  <p className="font-serif text-4xl">{dashboardData?.totaal_leads || 0}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">NIEUW</p>
                  <p className="font-serif text-4xl">{dashboardData?.status_verdeling?.nieuw || 0}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">GEBELD</p>
                  <p className="font-serif text-4xl">{dashboardData?.status_verdeling?.gebeld || 0}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">KLANT GEWORDEN</p>
                  <p className="font-serif text-4xl">{dashboardData?.status_verdeling?.klant || 0}</p>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Status Verdeling */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-6">STATUS VERDELING</p>
                  <div className="space-y-4">
                    {['Nieuw', 'Gebeld', 'Offerte gestuurd', 'Klant geworden'].map(status => {
                      const key = status === 'Offerte gestuurd' ? 'offerte' : status === 'Klant geworden' ? 'klant' : status.toLowerCase();
                      const count = dashboardData?.status_verdeling?.[key] || 0;
                      return (
                        <div key={status} className="flex items-center justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-700">{status}</span>
                          <span className="text-gray-400">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recente Zoekopdrachten */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-6">RECENTE ZOEKOPDRACHTEN</p>
                  {dashboardData?.recente_zoekopdrachten?.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.recente_zoekopdrachten.slice(0, 5).map((z, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-700">{z.branche} — {z.stad}</span>
                          <span className="text-gray-400 text-sm">{z.totaal} gevonden</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Nog geen zoekopdrachten</p>
                  )}
                </div>
              </div>

              {/* Google Sheets Integration */}
              <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText size={18} className="text-green-600" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400">GOOGLE SHEETS INTEGRATIE</p>
                </div>
                <p className="text-gray-600 mb-4">Verbind je Google account om leads direct naar Sheets te sturen.</p>
                <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  <FileText size={18} /> VERBIND MET GOOGLE SHEETS
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
