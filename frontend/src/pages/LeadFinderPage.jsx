import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  Search, Phone, MapPin, ExternalLink, Save, Trash2, Edit2, Check, X, 
  Download, ChevronDown, BarChart3, Users, Lock, ArrowLeft, Loader2, RefreshCw
} from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';
const API = `${API_BASE}/api/admin/leadfinder`;
const LOGO_URL = "/logo-nav.png";

const statusColors = {
  'nieuw': { bg: '#EBF5FF', text: '#2563eb', border: '#BFDBFE' },
  'gebeld': { bg: '#FEF9C3', text: '#CA8A04', border: '#FDE047' },
  'offerte': { bg: '#F3E8FF', text: '#9333EA', border: '#D8B4FE' },
  'klant': { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
  'afgewezen': { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' }
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
      if (data.error) { toast.error(data.error); return; }
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

  // Login Screen - Yrvante Style
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <Link to="/">
                <img src={LOGO_URL} alt="Yrvante" className="h-8 mx-auto mb-6" />
              </Link>
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="text-gray-400" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">Voer het wachtwoord in om door te gaan</p>
            </div>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Wachtwoord" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none text-gray-900 mb-4"
                autoFocus 
              />
              {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}
              <button 
                type="submit" 
                className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                Inloggen
              </button>
            </form>
            <div className="text-center mt-6">
              <Link to="/" className="text-gray-500 text-sm hover:text-gray-700 flex items-center justify-center gap-2">
                <ArrowLeft size={14} />
                Terug naar home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Dashboard - Yrvante Style
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <img src={LOGO_URL} alt="Yrvante" className="h-6" />
              </Link>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Admin Dashboard</span>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: 'zoeken', label: 'Zoeken', icon: Search },
                { id: 'leads', label: 'Leads', icon: Users },
                { id: 'dashboard', label: 'Overzicht', icon: BarChart3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
            
            <button 
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Search Tab */}
          {activeTab === 'zoeken' && (
            <motion.div key="zoeken" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Hero */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Vind Bedrijven<br />
                  <span className="text-gray-400">Zonder Website</span>
                </h1>
                <p className="text-gray-500">Zoek potentiële klanten via Google Maps</p>
              </div>

              {/* Search Form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-2xl mx-auto mb-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Branche</label>
                    <input 
                      value={branche} 
                      onChange={e => setBranche(e.target.value)} 
                      placeholder="kapper, restaurant..." 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Stad</label>
                    <input 
                      value={stad} 
                      onChange={e => setStad(e.target.value)} 
                      placeholder="Amsterdam..." 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={autoSave} 
                      onChange={e => setAutoSave(e.target.checked)} 
                      className="w-4 h-4 rounded"
                    />
                    Auto-opslaan
                  </label>
                  <button 
                    onClick={() => zoekBedrijven(false)} 
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
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
                    <p className="text-gray-500">{totaalGevonden} resultaten zonder website</p>
                    <button 
                      onClick={exportCSV}
                      className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <Download size={16} />
                      Export CSV
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {zoekResultaten.map((lead, i) => (
                      <div key={lead.place_id || i} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 transition-colors">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-2">{lead.naam}</h3>
                            <p className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                              <MapPin size={14} />{lead.adres}
                            </p>
                            {lead.telefoonnummer && (
                              <a href={`tel:${lead.telefoonnummer}`} className="text-blue-600 text-sm flex items-center gap-2">
                                <Phone size={14} />{lead.telefoonnummer}
                              </a>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <a 
                              href={lead.google_maps_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                              <ExternalLink size={18} className="text-gray-600" />
                            </a>
                            <button 
                              onClick={() => saveLead(lead)}
                              className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                              <Save size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                          <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700">KVK →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' ' + stad + ' facebook')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700">Facebook →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' ' + stad + ' instagram')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700">Instagram →</a>
                        </div>
                      </div>
                    ))}
                  </div>
                  {nextPageToken && (
                    <div className="text-center mt-6">
                      <button 
                        onClick={() => zoekBedrijven(true)} 
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 mx-auto border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <ChevronDown size={18} />}
                        Laad meer
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Opgeslagen Leads ({opgeslagenLeads.length})</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-gray-300"
                  >
                    <Download size={16} />
                    CSV
                  </button>
                  <button 
                    onClick={loadLeads}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-gray-300"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              {opgeslagenLeads.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <Users size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nog geen leads opgeslagen</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {opgeslagenLeads.map(lead => (
                    <div key={lead.id} className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">{lead.naam}</h3>
                            <select 
                              value={lead.status || 'nieuw'} 
                              onChange={e => updateLeadStatus(lead.id, e.target.value)}
                              className="text-xs px-2 py-1 rounded-lg border cursor-pointer"
                              style={{
                                backgroundColor: statusColors[lead.status || 'nieuw'].bg,
                                borderColor: statusColors[lead.status || 'nieuw'].border,
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
                          <p className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                            <MapPin size={14} />{lead.adres}
                          </p>
                          {lead.telefoonnummer && (
                            <a href={`tel:${lead.telefoonnummer}`} className="text-blue-600 text-sm flex items-center gap-2">
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
                                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400"
                                  autoFocus
                                />
                                <button onClick={() => updateLeadNotitie(lead.id)} className="p-2 bg-black text-white rounded-lg"><Check size={16} /></button>
                                <button onClick={() => setEditingLead(null)} className="p-2 border border-gray-200 rounded-lg"><X size={16} /></button>
                              </div>
                            ) : (
                              <div 
                                onClick={() => { setEditingLead(lead.id); setEditNotitie(lead.notitie || ''); }}
                                className="text-sm text-gray-500 cursor-pointer flex items-center gap-2 hover:text-gray-700"
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
                            className="p-2 border border-gray-200 rounded-lg hover:border-gray-300"
                          >
                            <ExternalLink size={18} className="text-gray-600" />
                          </a>
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 border border-red-200 rounded-lg hover:border-red-300 text-red-500"
                          >
                            <Trash2 size={18} />
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overzicht</h2>
              
              {dashboardData && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Totaal</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.totaal_leads}</p>
                  </div>
                  {Object.entries(dashboardData.status_verdeling || {}).map(([status, count]) => (
                    <div key={status} className="bg-white rounded-xl border border-gray-100 p-5">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{status}</p>
                      <p className="text-3xl font-bold" style={{ color: statusColors[status]?.text || '#000' }}>{count}</p>
                    </div>
                  ))}
                </div>
              )}

              {dashboardData?.recente_zoekopdrachten?.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Recente Zoekopdrachten</h3>
                  {dashboardData.recente_zoekopdrachten.slice(0, 5).map((z, i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-gray-50 last:border-0">
                      <span className="text-gray-700">{z.branche} in {z.stad}</span>
                      <span className="text-gray-500">{z.totaal} resultaten</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LeadFinderPage;
