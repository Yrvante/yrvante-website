import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  Search, Phone, MapPin, ExternalLink, Save, Trash2, Edit2, Check, X, 
  Download, ChevronDown, BarChart3, Users, Lock, ArrowLeft, Loader2, RefreshCw,
  Database, Zap
} from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';
const API = `${API_BASE}/api/admin/leadfinder`;

const statusColors = {
  'nieuw': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.4)' },
  'gebeld': { bg: 'rgba(234, 179, 8, 0.15)', text: '#fbbf24', border: 'rgba(234, 179, 8, 0.4)' },
  'offerte': { bg: 'rgba(168, 85, 247, 0.15)', text: '#a78bfa', border: 'rgba(168, 85, 247, 0.4)' },
  'klant': { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.4)' },
  'afgewezen': { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.4)' }
};

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

  // Login Screen - Dark Vercel/Neon Style
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0a0a0a' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="rounded-xl p-8" style={{ background: '#171717', border: '1px solid #262626' }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                <Database className="text-white" size={26} />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">Admin Dashboard</h1>
              <p className="text-sm" style={{ color: '#a3a3a3' }}>Voer het wachtwoord in om door te gaan</p>
            </div>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Wachtwoord" 
                className="w-full px-4 py-3 rounded-lg text-white mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ background: '#262626', border: '1px solid #404040' }}
                autoFocus 
              />
              {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
              <button 
                type="submit" 
                className="w-full py-3 font-medium rounded-lg transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white' }}
              >
                Inloggen
              </button>
            </form>
            <div className="text-center mt-6">
              <Link to="/" className="text-sm hover:text-white flex items-center justify-center gap-2" style={{ color: '#a3a3a3' }}>
                <ArrowLeft size={14} />
                Terug naar home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Dashboard - Dark Vercel/Neon Style
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', color: '#fafafa' }}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-56 border-r flex flex-col" style={{ background: '#0a0a0a', borderColor: '#262626' }}>
        {/* Logo */}
        <div className="p-4 border-b" style={{ borderColor: '#262626' }}>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-semibold text-white">Yrvante</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <p className="text-xs uppercase tracking-wider mb-3 px-3" style={{ color: '#737373' }}>Menu</p>
          {[
            { id: 'zoeken', label: 'Zoeken', icon: Search },
            { id: 'leads', label: 'Leads', icon: Users },
            { id: 'dashboard', label: 'Overzicht', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all"
              style={{
                background: activeTab === tab.id ? '#262626' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#a3a3a3'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t" style={{ borderColor: '#262626' }}>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-red-500/10"
            style={{ color: '#f87171' }}
          >
            <Lock size={18} />
            Uitloggen
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="ml-56">
        {/* Header */}
        <header className="sticky top-0 z-40 px-6 py-4 border-b" style={{ background: '#0a0a0a', borderColor: '#262626' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">
                {activeTab === 'zoeken' && 'Bedrijven Zoeken'}
                {activeTab === 'leads' && 'Opgeslagen Leads'}
                {activeTab === 'dashboard' && 'Dashboard Overzicht'}
              </h1>
              <p className="text-sm" style={{ color: '#737373' }}>
                {activeTab === 'zoeken' && 'Vind bedrijven zonder website via Google Maps'}
                {activeTab === 'leads' && `${opgeslagenLeads.length} leads in database`}
                {activeTab === 'dashboard' && 'Statistieken en recente activiteit'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(activeTab === 'zoeken' || activeTab === 'leads') && zoekResultaten.length + opgeslagenLeads.length > 0 && (
                <button 
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all"
                  style={{ background: '#262626', color: '#a3a3a3', border: '1px solid #404040' }}
                >
                  <Download size={16} />
                  Export
                </button>
              )}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                Y
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Search Tab */}
            {activeTab === 'zoeken' && (
              <motion.div key="zoeken" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Search Form */}
                <div className="rounded-xl p-6 mb-6" style={{ background: '#171717', border: '1px solid #262626' }}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: '#737373' }}>Branche</label>
                      <input 
                        value={branche} 
                        onChange={e => setBranche(e.target.value)} 
                        placeholder="kapper, restaurant..." 
                        className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        style={{ background: '#262626', border: '1px solid #404040' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: '#737373' }}>Stad</label>
                      <input 
                        value={stad} 
                        onChange={e => setStad(e.target.value)} 
                        placeholder="Amsterdam..." 
                        className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        style={{ background: '#262626', border: '1px solid #404040' }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#a3a3a3' }}>
                      <input 
                        type="checkbox" 
                        checked={autoSave} 
                        onChange={e => setAutoSave(e.target.checked)} 
                        className="w-4 h-4 rounded accent-green-500"
                      />
                      Auto-opslaan
                    </label>
                    <button 
                      onClick={() => zoekBedrijven(false)} 
                      disabled={loading}
                      className="flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white' }}
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                      Zoeken
                    </button>
                  </div>
                </div>

                {/* Results */}
                {zoekResultaten.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <p style={{ color: '#737373' }}>{totaalGevonden} bedrijven zonder website gevonden</p>
                    </div>
                    <div className="grid gap-3">
                      {zoekResultaten.map((lead, i) => (
                        <div key={lead.place_id || i} className="rounded-xl p-5 transition-all hover:border-green-500/30" style={{ background: '#171717', border: '1px solid #262626' }}>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-white text-lg mb-2">{lead.naam}</h3>
                              <p className="text-sm flex items-center gap-2 mb-1" style={{ color: '#a3a3a3' }}>
                                <MapPin size={14} />{lead.adres}
                              </p>
                              {lead.telefoonnummer && (
                                <a href={`tel:${lead.telefoonnummer}`} className="text-sm flex items-center gap-2 text-green-400 hover:text-green-300">
                                  <Phone size={14} />{lead.telefoonnummer}
                                </a>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <a 
                                href={lead.google_maps_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg transition-all hover:bg-white/5"
                                style={{ border: '1px solid #404040' }}
                              >
                                <ExternalLink size={18} style={{ color: '#a3a3a3' }} />
                              </a>
                              <button 
                                onClick={() => saveLead(lead)}
                                className="p-2 rounded-lg transition-all hover:opacity-80"
                                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                              >
                                <Save size={18} className="text-white" />
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #262626' }}>
                            <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-green-400" style={{ color: '#737373' }}>KVK →</a>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' ' + stad + ' facebook')}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-green-400" style={{ color: '#737373' }}>Facebook →</a>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' ' + stad + ' instagram')}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-green-400" style={{ color: '#737373' }}>Instagram →</a>
                          </div>
                        </div>
                      ))}
                    </div>
                    {nextPageToken && (
                      <div className="text-center mt-6">
                        <button 
                          onClick={() => zoekBedrijven(true)} 
                          disabled={loading}
                          className="flex items-center gap-2 px-5 py-2.5 mx-auto rounded-lg transition-all"
                          style={{ background: '#262626', border: '1px solid #404040', color: '#a3a3a3' }}
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : <ChevronDown size={18} />}
                          Meer laden
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {zoekResultaten.length === 0 && !loading && (
                  <div className="rounded-xl p-12 text-center" style={{ background: '#171717', border: '1px solid #262626' }}>
                    <Search size={48} className="mx-auto mb-4" style={{ color: '#404040' }} />
                    <p style={{ color: '#737373' }}>Voer een branche en stad in om te zoeken</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Leads Tab */}
            {activeTab === 'leads' && (
              <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={loadLeads}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all"
                    style={{ background: '#262626', color: '#a3a3a3', border: '1px solid #404040' }}
                  >
                    <RefreshCw size={16} />
                    Vernieuwen
                  </button>
                </div>

                {opgeslagenLeads.length === 0 ? (
                  <div className="rounded-xl p-12 text-center" style={{ background: '#171717', border: '1px solid #262626' }}>
                    <Users size={48} className="mx-auto mb-4" style={{ color: '#404040' }} />
                    <p style={{ color: '#737373' }}>Nog geen leads opgeslagen</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {opgeslagenLeads.map(lead => (
                      <div key={lead.id} className="rounded-xl p-5" style={{ background: '#171717', border: '1px solid #262626' }}>
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-white text-lg">{lead.naam}</h3>
                              <select 
                                value={lead.status || 'nieuw'} 
                                onChange={e => updateLeadStatus(lead.id, e.target.value)}
                                className="text-xs px-2 py-1 rounded-md cursor-pointer focus:outline-none"
                                style={{
                                  backgroundColor: statusColors[lead.status || 'nieuw'].bg,
                                  border: `1px solid ${statusColors[lead.status || 'nieuw'].border}`,
                                  color: statusColors[lead.status || 'nieuw'].text
                                }}
                              >
                                <option value="nieuw">Nieuw</option>
                                <option value="gebeld">Gebeld</option>
                                <option value="offerte">Offerte</option>
                                <option value="klant">Klant</option>
                                <option value="afgewezen">Afgewezen</option>
                              </select>
                            </div>
                            <p className="text-sm flex items-center gap-2 mb-1" style={{ color: '#a3a3a3' }}>
                              <MapPin size={14} />{lead.adres}
                            </p>
                            {lead.telefoonnummer && (
                              <a href={`tel:${lead.telefoonnummer}`} className="text-sm flex items-center gap-2 text-green-400 hover:text-green-300">
                                <Phone size={14} />{lead.telefoonnummer}
                              </a>
                            )}
                            
                            {/* Notitie */}
                            <div className="mt-3">
                              {editingLead === lead.id ? (
                                <div className="flex gap-2">
                                  <input 
                                    value={editNotitie} 
                                    onChange={e => setEditNotitie(e.target.value)} 
                                    placeholder="Notitie..." 
                                    className="flex-1 px-3 py-2 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    style={{ background: '#262626', border: '1px solid #404040' }}
                                    autoFocus
                                  />
                                  <button onClick={() => updateLeadNotitie(lead.id)} className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}><Check size={16} className="text-white" /></button>
                                  <button onClick={() => setEditingLead(null)} className="p-2 rounded-lg" style={{ background: '#262626', border: '1px solid #404040' }}><X size={16} style={{ color: '#a3a3a3' }} /></button>
                                </div>
                              ) : (
                                <div 
                                  onClick={() => { setEditingLead(lead.id); setEditNotitie(lead.notitie || ''); }}
                                  className="text-sm cursor-pointer flex items-center gap-2 hover:text-green-400"
                                  style={{ color: lead.notitie ? '#d4d4d4' : '#737373' }}
                                >
                                  <Edit2 size={12} />
                                  {lead.notitie || 'Klik voor notitie...'}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a 
                              href={lead.google_maps_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg transition-all hover:bg-white/5"
                              style={{ border: '1px solid #404040' }}
                            >
                              <ExternalLink size={18} style={{ color: '#a3a3a3' }} />
                            </a>
                            <button 
                              onClick={() => deleteLead(lead.id)}
                              className="p-2 rounded-lg transition-all hover:bg-red-500/10"
                              style={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}
                            >
                              <Trash2 size={18} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {dashboardData && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <div className="rounded-xl p-5" style={{ background: '#171717', border: '1px solid #262626' }}>
                      <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#737373' }}>Totaal</p>
                      <p className="text-3xl font-bold text-white">{dashboardData.totaal_leads}</p>
                    </div>
                    {Object.entries(dashboardData.status_verdeling || {}).map(([status, count]) => (
                      <div key={status} className="rounded-xl p-5" style={{ background: '#171717', border: '1px solid #262626' }}>
                        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#737373' }}>{status}</p>
                        <p className="text-3xl font-bold" style={{ color: statusColors[status]?.text || '#fff' }}>{count}</p>
                      </div>
                    ))}
                  </div>
                )}

                {dashboardData?.recente_zoekopdrachten?.length > 0 && (
                  <div className="rounded-xl p-6" style={{ background: '#171717', border: '1px solid #262626' }}>
                    <h3 className="font-semibold text-white mb-4">Recente Zoekopdrachten</h3>
                    {dashboardData.recente_zoekopdrachten.slice(0, 5).map((z, i) => (
                      <div key={i} className="flex justify-between py-3" style={{ borderBottom: i < 4 ? '1px solid #262626' : 'none' }}>
                        <span className="text-white">{z.branche} in {z.stad}</span>
                        <span style={{ color: '#737373' }}>{z.totaal} resultaten</span>
                      </div>
                    ))}
                  </div>
                )}

                {(!dashboardData || dashboardData.totaal_leads === 0) && (
                  <div className="rounded-xl p-12 text-center" style={{ background: '#171717', border: '1px solid #262626' }}>
                    <BarChart3 size={48} className="mx-auto mb-4" style={{ color: '#404040' }} />
                    <p style={{ color: '#737373' }}>Nog geen statistieken beschikbaar</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default LeadFinderPage;
