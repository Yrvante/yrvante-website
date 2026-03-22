import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  Search, Phone, MapPin, ExternalLink, Save, Trash2, Edit2, Check, X, 
  Download, ChevronDown, BarChart3, Users, Lock, ArrowLeft, Loader2, RefreshCw,
  Bookmark, FileText, ArrowRight, Menu as MenuIcon, Mail, Globe, Building2,
  Instagram, Facebook, Filter, SortAsc, CheckSquare, Square, MoreHorizontal,
  Target, TrendingUp, Calendar, Clock, Star, Tag, Copy, MessageSquare,
  Briefcase, User, Hash, Link2, ChevronRight, Settings, Zap, Database
} from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';
const API = `${API_BASE}/api/admin/leadfinder`;
const LOGO_URL = "/logo-nav.png";
const BG_IMAGE = "/bg-pattern.jpg";

// Search source configurations
const SEARCH_SOURCES = {
  google: { id: 'google', name: 'Google Maps', icon: MapPin, color: '#4285F4', description: 'Zoek bedrijven via Google Maps' },
  kvk: { id: 'kvk', name: 'KVK / ZZP', icon: Building2, color: '#00A1E0', description: 'Kamer van Koophandel database' },
  instagram: { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', description: 'Zakelijke Instagram accounts' },
  facebook: { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', description: 'Facebook bedrijfspagina\'s' },
};

const STATUS_CONFIG = {
  nieuw: { label: 'Nieuw', color: '#3B82F6', bg: '#EFF6FF' },
  contact: { label: 'Gecontacteerd', color: '#F59E0B', bg: '#FFFBEB' },
  interesse: { label: 'Interesse', color: '#8B5CF6', bg: '#F5F3FF' },
  offerte: { label: 'Offerte Gestuurd', color: '#EC4899', bg: '#FDF2F8' },
  onderhandeling: { label: 'Onderhandeling', color: '#F97316', bg: '#FFF7ED' },
  klant: { label: 'Klant Geworden', color: '#10B981', bg: '#ECFDF5' },
  afgewezen: { label: 'Afgewezen', color: '#EF4444', bg: '#FEF2F2' },
  later: { label: 'Later Opvolgen', color: '#6B7280', bg: '#F3F4F6' },
};

const PRIORITY_CONFIG = {
  hoog: { label: 'Hoog', color: '#EF4444', icon: '🔥' },
  medium: { label: 'Medium', color: '#F59E0B', icon: '⚡' },
  laag: { label: 'Laag', color: '#6B7280', icon: '📌' },
};

const LeadFinderPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('zoeken');
  const [activeSource, setActiveSource] = useState('google');
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState(25);
  const [searchAll, setSearchAll] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    onlyWithoutWebsite: true,
    onlyWithPhone: false,
    onlyWithEmail: false,
  });
  const [zoekResultaten, setZoekResultaten] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [totaalGevonden, setTotaalGevonden] = useState(0);
  const [zoekgebied, setZoekgebied] = useState('');
  const [bronnenDoorzocht, setBronnenDoorzocht] = useState([]);
  
  // Lead management states
  const [opgeslagenLeads, setOpgeslagenLeads] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [statusFilter, setStatusFilter] = useState('alle');
  const [sourceFilter, setSourceFilter] = useState('alle');
  const [priorityFilter, setPriorityFilter] = useState('alle');
  const [searchLeadsQuery, setSearchLeadsQuery] = useState('');
  const [sortBy, setSortBy] = useState('datum');
  const [selectedLeads, setSelectedLeads] = useState([]);
  
  // Edit states
  const [editingLead, setEditingLead] = useState(null);
  const [editData, setEditData] = useState({});
  const [showLeadModal, setShowLeadModal] = useState(null);
  
  // Bulk action states
  const [showBulkActions, setShowBulkActions] = useState(false);

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
    if (!searchLocation.trim()) {
      toast.error('Vul een locatie in');
      return;
    }
    setLoading(true);
    try {
      const body = { 
        branche: searchQuery, 
        stad: searchLocation, 
        radius: searchRadius,
        searchAll: searchAll,
        source: activeSource,
        filters: searchFilters
      };
      if (useToken && nextPageToken) body.pageToken = nextPageToken;
      
      const res = await fetch(`${API}/zoek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.error) { toast.error(data.error); setLoading(false); return; }
      
      const leadsWithSource = (data.leads || []).map(lead => ({
        ...lead,
        source: lead.source || activeSource
      }));
      
      if (useToken) {
        setZoekResultaten(prev => [...prev, ...leadsWithSource]);
      } else {
        setZoekResultaten(leadsWithSource);
      }
      setNextPageToken(data.nextPageToken || null);
      setTotaalGevonden(data.totaal_gevonden || 0);
      setZoekgebied(data.zoekgebied || '');
      setBronnenDoorzocht(data.bronnen_doorzocht || []);
      
      if (!useToken) {
        toast.success(`${data.totaal_gevonden} bedrijven zonder website gevonden!`);
        if (data.zoekgebied) {
          toast.info(`Zoekgebied: ${data.zoekgebied}`, { duration: 4000 });
        }
      }
      if (data.note) toast.info(data.note, { duration: 5000 });
    } catch (err) { toast.error('Zoekfout'); }
    finally { setLoading(false); }
  };

  // Quick search for "Zoek Alles" 
  const zoekAlles = async () => {
    if (!searchLocation.trim()) {
      toast.error('Vul een locatie in');
      return;
    }
    setSearchAll(true);
    setLoading(true);
    try {
      const body = { 
        branche: searchQuery || '', 
        stad: searchLocation, 
        radius: searchRadius,
        searchAll: true,
        filters: searchFilters
      };
      
      const res = await fetch(`${API}/zoek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.error) { toast.error(data.error); setLoading(false); return; }
      
      const leadsWithSource = (data.leads || []).map(lead => ({
        ...lead,
        source: lead.source || 'google'
      }));
      
      setZoekResultaten(leadsWithSource);
      setNextPageToken(data.nextPageToken || null);
      setTotaalGevonden(data.totaal_gevonden || 0);
      setZoekgebied(data.zoekgebied || '');
      setBronnenDoorzocht(data.bronnen_doorzocht || []);
      
      toast.success(`${data.totaal_gevonden} ZZP'ers & bedrijven gevonden!`);
      if (data.zoekgebied) {
        toast.info(`Zoekgebied: ${data.zoekgebied}`, { duration: 4000 });
      }
      if (data.note) toast.info(data.note, { duration: 5000 });
    } catch (err) { toast.error('Zoekfout'); }
    finally { setLoading(false); setSearchAll(false); }
  };

  const saveLead = async (lead, silent = false) => {
    try {
      const res = await fetch(`${API}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          naam: lead.naam, 
          adres: lead.adres, 
          telefoonnummer: lead.telefoonnummer, 
          email: lead.email || '',
          website: lead.website || '',
          google_maps_url: lead.google_maps_url, 
          place_id: lead.place_id, 
          branche: searchQuery, 
          stad: searchLocation,
          source: lead.source || activeSource,
          instagram_url: lead.instagram_url || '',
          facebook_url: lead.facebook_url || '',
          kvk_nummer: lead.kvk_nummer || '',
          priority: 'medium'
        })
      });
      const data = await res.json();
      if (data.id) { 
        if (!silent) toast.success('Lead opgeslagen!'); 
        loadLeads(); 
        loadDashboard(); 
      } else if (data.error?.includes('bestaat')) { 
        if (!silent) toast.info('Lead bestaat al'); 
      }
    } catch (err) { if (!silent) toast.error('Fout bij opslaan'); }
  };

  const saveAllResults = async () => {
    if (zoekResultaten.length === 0) {
      toast.error('Geen resultaten om op te slaan');
      return;
    }
    toast.info(`${zoekResultaten.length} leads worden opgeslagen...`);
    let saved = 0;
    for (const lead of zoekResultaten) {
      try {
        await saveLead(lead, true);
        saved++;
      } catch (err) {}
    }
    toast.success(`${saved} leads opgeslagen!`);
    loadLeads();
    loadDashboard();
  };

  const updateLead = async (id, updates) => {
    try {
      await fetch(`${API}/lead/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(updates) 
      });
      loadLeads(); 
      loadDashboard();
      toast.success('Lead bijgewerkt');
    } catch (err) {
      toast.error('Fout bij bijwerken');
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Lead verwijderen?')) return;
    await fetch(`${API}/lead/${id}`, { method: 'DELETE' });
    loadLeads(); loadDashboard(); toast.success('Verwijderd');
  };

  const bulkUpdateStatus = async (status) => {
    if (selectedLeads.length === 0) return;
    for (const id of selectedLeads) {
      await fetch(`${API}/lead/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ status }) 
      });
    }
    setSelectedLeads([]);
    loadLeads();
    toast.success(`${selectedLeads.length} leads bijgewerkt`);
  };

  const bulkDelete = async () => {
    if (selectedLeads.length === 0) return;
    if (!window.confirm(`${selectedLeads.length} leads verwijderen?`)) return;
    for (const id of selectedLeads) {
      await fetch(`${API}/lead/${id}`, { method: 'DELETE' });
    }
    setSelectedLeads([]);
    loadLeads();
    loadDashboard();
    toast.success(`${selectedLeads.length} leads verwijderd`);
  };

  const exportCSV = (data = null) => {
    const exportData = data || (activeTab === 'zoeken' ? zoekResultaten : filteredLeads);
    if (!exportData.length) { toast.error('Geen data om te exporteren'); return; }
    const headers = ['Naam','Adres','Telefoon','Email','Website','Instagram','Facebook','KVK','Bron','Status','Prioriteit','Notitie','Datum'];
    const csv = [
      headers.join(','), 
      ...exportData.map(l => [
        l.naam, l.adres, l.telefoonnummer, l.email, l.website, 
        l.instagram_url, l.facebook_url, l.kvk_nummer, l.source,
        l.status, l.priority, l.notitie, l.opgeslagen_op
      ].map(c => `"${(c || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const a = document.createElement('a'); 
    a.href = URL.createObjectURL(new Blob([csv], {type: 'text/csv;charset=utf-8;'})); 
    a.download = `leads_${activeSource}_${new Date().toISOString().split('T')[0]}.csv`; 
    a.click();
    toast.success('CSV geëxporteerd');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Gekopieerd!');
  };

  const toggleSelectLead = (id) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAllLeads = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(l => l.id));
    }
  };

  // Filter and sort leads
  const filteredLeads = opgeslagenLeads
    .filter(lead => {
      if (statusFilter !== 'alle' && (lead.status || 'nieuw') !== statusFilter) return false;
      if (sourceFilter !== 'alle' && lead.source !== sourceFilter) return false;
      if (priorityFilter !== 'alle' && lead.priority !== priorityFilter) return false;
      if (searchLeadsQuery) {
        const q = searchLeadsQuery.toLowerCase();
        return lead.naam?.toLowerCase().includes(q) || 
               lead.adres?.toLowerCase().includes(q) ||
               lead.telefoonnummer?.includes(q) ||
               lead.email?.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'datum') return new Date(b.opgeslagen_op) - new Date(a.opgeslagen_op);
      if (sortBy === 'naam') return (a.naam || '').localeCompare(b.naam || '');
      if (sortBy === 'status') return (a.status || '').localeCompare(b.status || '');
      return 0;
    });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.3) brightness(1.1)' }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white/95 to-white/80" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="text-center mb-8">
              <Link to="/"><img src={LOGO_URL} alt="Yrvante" className="h-8 mx-auto mb-6" /></Link>
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Database className="text-gray-400" size={28} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-black mb-2">LEAD FINDER</h1>
              <p className="text-gray-500">Pro Suite — Yrvante</p>
            </div>
            <form onSubmit={handleLogin}>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Wachtwoord" className="w-full bg-white border border-gray-200 rounded-xl focus:border-black outline-none py-4 px-4 transition-colors mb-4" autoFocus />
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Yrvante" className="h-6" />
              </Link>
              <span className="text-xs bg-black text-white px-2 py-1 rounded font-bold">LEAD FINDER PRO</span>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: 'zoeken', label: 'ZOEKEN', icon: Search },
                { id: 'leads', label: 'LEADS', icon: Users, count: opgeslagenLeads.length },
                { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3 },
                { id: 'tools', label: 'TOOLS', icon: Settings }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                    activeTab === tab.id ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={logout} className="text-xs text-gray-500 hover:text-black transition-colors">Uitloggen</button>
              <Link to="/" className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-[0.1em] hover:bg-gray-800 transition-all rounded-full">
                YRVANTE.COM →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* ZOEKEN TAB */}
        {activeTab === 'zoeken' && (
          <motion.div key="zoeken" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-[1800px] mx-auto px-6 py-8">
              
              {/* UNIFIED SEARCH BOX - Zoek Alles */}
              <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl p-8 mb-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Target size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-2xl">ZOEK ALLES</h2>
                    <p className="text-gray-400 text-sm">Vind alle ZZP'ers & bedrijven zonder website in één keer</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">
                      Branche (optioneel)
                    </label>
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="bijv. kapper, coach, schilder... of leeg voor ALLE branches"
                      className="w-full bg-white/10 border border-white/20 rounded-xl focus:border-white outline-none py-4 px-4 transition-colors text-white placeholder-gray-500"
                      onKeyPress={e => e.key === 'Enter' && zoekAlles()}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">
                      Locatie *
                    </label>
                    <input
                      value={searchLocation}
                      onChange={e => setSearchLocation(e.target.value)}
                      placeholder="bijv. Almelo"
                      className="w-full bg-white/10 border border-white/20 rounded-xl focus:border-white outline-none py-4 px-4 transition-colors text-white placeholder-gray-500"
                      onKeyPress={e => e.key === 'Enter' && zoekAlles()}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">
                      Radius
                    </label>
                    <select
                      value={searchRadius}
                      onChange={e => setSearchRadius(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl outline-none py-4 px-4 transition-colors text-white cursor-pointer"
                    >
                      <option value={5} className="text-black">+5 km</option>
                      <option value={10} className="text-black">+10 km</option>
                      <option value={15} className="text-black">+15 km</option>
                      <option value={25} className="text-black">+25 km</option>
                      <option value={50} className="text-black">+50 km</option>
                      <option value={75} className="text-black">+75 km</option>
                      <option value={100} className="text-black">+100 km</option>
                    </select>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <span className="text-xs font-bold uppercase text-gray-500">Filters:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={searchFilters.onlyWithPhone} 
                      onChange={e => setSearchFilters({...searchFilters, onlyWithPhone: e.target.checked})}
                      className="w-4 h-4 accent-white"
                    />
                    <span className="text-sm text-gray-300">Alleen met telefoonnummer</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <Zap size={14} className="inline mr-2" />
                    Doorzoekt Google Maps, KVK, en ZZP databases in {searchLocation || '[locatie]'} + {searchRadius}km
                  </div>
                  <button
                    onClick={zoekAlles}
                    disabled={loading || !searchLocation.trim()}
                    className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-100 transition-all rounded-full disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Target size={16} />}
                    ZOEK ALLE ZZP'ERS & BEDRIJVEN
                  </button>
                </div>
              </div>

              {/* Alternative: Search by Source */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Of zoek per bron:</p>
                <div className="grid grid-cols-4 gap-4">
                  {Object.values(SEARCH_SOURCES).map(source => (
                    <button
                      key={source.id}
                      onClick={() => { setActiveSource(source.id); }}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        activeSource === source.id 
                          ? 'border-black bg-white shadow-lg' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <source.icon size={24} style={{ color: source.color }} className="mb-2" />
                      <h3 className="font-bold text-sm">{source.name}</h3>
                    </button>
                  ))}
                </div>
              </div>

              {/* Standard Search Box */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  {React.createElement(SEARCH_SOURCES[activeSource].icon, { 
                    size: 20, 
                    style: { color: SEARCH_SOURCES[activeSource].color } 
                  })}
                  <h2 className="font-bold text-lg">Zoek specifiek via {SEARCH_SOURCES[activeSource].name}</h2>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      Branche / Zoekterm
                    </label>
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="bijv. kapper, restaurant, coach..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none py-4 px-4 transition-colors"
                      onKeyPress={e => e.key === 'Enter' && zoekBedrijven(false)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Locatie</label>
                    <input
                      value={searchLocation}
                      onChange={e => setSearchLocation(e.target.value)}
                      placeholder="bijv. Almelo"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none py-4 px-4 transition-colors"
                      onKeyPress={e => e.key === 'Enter' && zoekBedrijven(false)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Radius</label>
                    <select
                      value={searchRadius}
                      onChange={e => setSearchRadius(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl outline-none py-4 px-4 transition-colors cursor-pointer"
                    >
                      <option value={5}>+5 km</option>
                      <option value={10}>+10 km</option>
                      <option value={15}>+15 km</option>
                      <option value={25}>+25 km</option>
                      <option value={50}>+50 km</option>
                      <option value={75}>+75 km</option>
                      <option value={100}>+100 km</option>
                    </select>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase text-gray-400">Filters:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={searchFilters.onlyWithoutWebsite} 
                      onChange={e => setSearchFilters({...searchFilters, onlyWithoutWebsite: e.target.checked})}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm">Alleen zonder website</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={searchFilters.onlyWithPhone} 
                      onChange={e => setSearchFilters({...searchFilters, onlyWithPhone: e.target.checked})}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm">Alleen met telefoonnummer</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} />
                    <span>Zoekgebied: {searchLocation || '...'} + {searchRadius}km radius</span>
                  </div>
                  <button
                    onClick={() => zoekBedrijven(false)}
                    disabled={loading || !searchLocation.trim()}
                    className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-800 transition-all rounded-full disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    ZOEKEN
                  </button>
                </div>
              </div>

              {/* Results Header with Search Info */}
              {zoekResultaten.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h3 className="font-bold text-xl">{totaalGevonden} Resultaten</h3>
                      {zoekgebied && (
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                          <MapPin size={12} className="inline mr-1" />
                          {zoekgebied}
                        </span>
                      )}
                      {bronnenDoorzocht.length > 0 && (
                        <span className="text-sm text-gray-500">
                          Bronnen: {bronnenDoorzocht.join(', ')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={saveAllResults} className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 flex items-center gap-2">
                        <Save size={14} /> ALLES OPSLAAN
                      </button>
                      <button onClick={() => exportCSV(zoekResultaten)} className="px-4 py-2 border border-gray-200 text-xs font-bold rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        <Download size={14} /> CSV
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {zoekResultaten.map((lead, i) => (
                      <div key={lead.place_id || i} className="bg-white border border-gray-200 p-5 rounded-xl hover:border-black transition-all">
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg">{lead.naam}</h3>
                              <span className="px-2 py-1 rounded text-xs font-bold" style={{ 
                                backgroundColor: SEARCH_SOURCES[lead.source || activeSource]?.color + '20',
                                color: SEARCH_SOURCES[lead.source || activeSource]?.color
                              }}>
                                {SEARCH_SOURCES[lead.source || activeSource]?.name}
                              </span>
                              {!lead.website && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">GEEN WEBSITE</span>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                              {lead.adres && (
                                <p className="text-gray-500 flex items-center gap-2"><MapPin size={14} />{lead.adres}</p>
                              )}
                              {lead.telefoonnummer && (
                                <a href={`tel:${lead.telefoonnummer}`} className="text-blue-600 flex items-center gap-2 hover:underline">
                                  <Phone size={14} />{lead.telefoonnummer}
                                  <button onClick={() => copyToClipboard(lead.telefoonnummer)} className="p-1 hover:bg-gray-100 rounded"><Copy size={12} /></button>
                                </a>
                              )}
                              {lead.email && (
                                <a href={`mailto:${lead.email}`} className="text-blue-600 flex items-center gap-2 hover:underline">
                                  <Mail size={14} />{lead.email}
                                </a>
                              )}
                              {lead.kvk_nummer && (
                                <span className="text-gray-500 flex items-center gap-2"><Building2 size={14} />KVK: {lead.kvk_nummer}</span>
                              )}
                            </div>

                            {/* Quick Links */}
                            <div className="flex flex-wrap gap-2">
                              {lead.google_maps_url && (
                                <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                                  <MapPin size={12} /> Maps
                                </a>
                              )}
                              <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                                <Building2 size={12} /> KVK
                              </a>
                              <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' ' + searchLocation + ' facebook')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                                <Facebook size={12} /> Facebook
                              </a>
                              <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' ' + searchLocation + ' instagram')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                                <Instagram size={12} /> Instagram
                              </a>
                              <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' ' + searchLocation + ' site:linkedin.com')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                                <User size={12} /> LinkedIn
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            <button onClick={() => saveLead(lead)} className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors" title="Opslaan">
                              <Save size={18} />
                            </button>
                            {lead.google_maps_url && (
                              <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-200 rounded-xl hover:border-black transition-colors" title="Open in Maps">
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {nextPageToken && (
                    <div className="text-center mt-8">
                      <button onClick={() => zoekBedrijven(true)} disabled={loading} className="px-8 py-4 border-2 border-black text-xs font-bold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-all rounded-full flex items-center gap-2 mx-auto">
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <ChevronDown size={16} />} MEER LADEN
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!loading && zoekResultaten.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
                  <Search size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-2xl font-bold mb-2">Begin met zoeken</h3>
                  <p className="text-gray-500 mb-6">Kies een bron, voer een zoekterm en locatie in</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-[1800px] mx-auto px-6 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-black tracking-tight">Leads Database</h1>
                  <p className="text-gray-500">{opgeslagenLeads.length} leads opgeslagen</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={loadLeads} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RefreshCw size={18} />
                  </button>
                  <button onClick={() => exportCSV()} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2">
                    <Download size={16} /> EXPORT
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Search */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={searchLeadsQuery}
                        onChange={e => setSearchLeadsQuery(e.target.value)}
                        placeholder="Zoek leads..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-black"
                  >
                    <option value="alle">Alle Status</option>
                    {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>

                  {/* Source Filter */}
                  <select
                    value={sourceFilter}
                    onChange={e => setSourceFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-black"
                  >
                    <option value="alle">Alle Bronnen</option>
                    {Object.entries(SEARCH_SOURCES).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>

                  {/* Priority Filter */}
                  <select
                    value={priorityFilter}
                    onChange={e => setPriorityFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-black"
                  >
                    <option value="alle">Alle Prioriteit</option>
                    {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                      <option key={key} value={key}>{val.icon} {val.label}</option>
                    ))}
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-black"
                  >
                    <option value="datum">Nieuwste eerst</option>
                    <option value="naam">Naam A-Z</option>
                    <option value="status">Status</option>
                  </select>
                </div>

                {/* Bulk Actions */}
                {selectedLeads.length > 0 && (
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium">{selectedLeads.length} geselecteerd</span>
                    <div className="flex items-center gap-2">
                      <select
                        onChange={e => { if(e.target.value) { bulkUpdateStatus(e.target.value); e.target.value = ''; }}}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none"
                      >
                        <option value="">Status wijzigen...</option>
                        {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                      <button onClick={bulkDelete} className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200">
                        Verwijderen
                      </button>
                      <button onClick={() => setSelectedLeads([])} className="px-3 py-1.5 text-gray-500 text-sm hover:text-black">
                        Annuleren
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Leads List */}
              {filteredLeads.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-2xl font-bold mb-2">Geen leads gevonden</h3>
                  <p className="text-gray-500 mb-6">Pas je filters aan of zoek nieuwe leads</p>
                  <button onClick={() => setActiveTab('zoeken')} className="px-6 py-3 bg-black text-white rounded-full font-bold text-sm">
                    ZOEK LEADS
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Select All */}
                  <div className="flex items-center gap-2 px-2">
                    <button onClick={selectAllLeads} className="p-1 hover:bg-gray-100 rounded">
                      {selectedLeads.length === filteredLeads.length ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    <span className="text-sm text-gray-500">Selecteer alles ({filteredLeads.length})</span>
                  </div>

                  {filteredLeads.map(lead => (
                    <div key={lead.id} className={`bg-white border rounded-xl p-5 transition-all ${selectedLeads.includes(lead.id) ? 'border-black' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <button onClick={() => toggleSelectLead(lead.id)} className="mt-1">
                          {selectedLeads.includes(lead.id) ? <CheckSquare size={20} /> : <Square size={20} className="text-gray-300" />}
                        </button>

                        {/* Main Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{lead.naam}</h3>
                            
                            {/* Status Badge */}
                            <select
                              value={lead.status || 'nieuw'}
                              onChange={e => updateLead(lead.id, { status: e.target.value })}
                              className="px-2 py-1 rounded-full text-xs font-bold border-0 cursor-pointer"
                              style={{
                                backgroundColor: STATUS_CONFIG[lead.status || 'nieuw']?.bg,
                                color: STATUS_CONFIG[lead.status || 'nieuw']?.color
                              }}
                            >
                              {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                              ))}
                            </select>

                            {/* Priority */}
                            <select
                              value={lead.priority || 'medium'}
                              onChange={e => updateLead(lead.id, { priority: e.target.value })}
                              className="px-2 py-1 rounded text-xs font-bold border border-gray-200 cursor-pointer"
                            >
                              {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                                <option key={key} value={key}>{val.icon} {val.label}</option>
                              ))}
                            </select>

                            {/* Source Badge */}
                            {lead.source && (
                              <span className="px-2 py-1 rounded text-xs font-medium" style={{
                                backgroundColor: SEARCH_SOURCES[lead.source]?.color + '15',
                                color: SEARCH_SOURCES[lead.source]?.color
                              }}>
                                {SEARCH_SOURCES[lead.source]?.name}
                              </span>
                            )}
                          </div>

                          {/* Contact Info */}
                          <div className="flex flex-wrap gap-4 text-sm mb-3">
                            {lead.adres && <span className="text-gray-500 flex items-center gap-1"><MapPin size={14} />{lead.adres}</span>}
                            {lead.telefoonnummer && (
                              <a href={`tel:${lead.telefoonnummer}`} className="text-blue-600 flex items-center gap-1 hover:underline">
                                <Phone size={14} />{lead.telefoonnummer}
                              </a>
                            )}
                            {lead.email && (
                              <a href={`mailto:${lead.email}`} className="text-blue-600 flex items-center gap-1 hover:underline">
                                <Mail size={14} />{lead.email}
                              </a>
                            )}
                          </div>

                          {/* Notes */}
                          {editingLead === lead.id ? (
                            <div className="flex gap-2 mt-2">
                              <input
                                value={editData.notitie || ''}
                                onChange={e => setEditData({...editData, notitie: e.target.value})}
                                placeholder="Voeg notitie toe..."
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                                autoFocus
                              />
                              <button onClick={() => { updateLead(lead.id, editData); setEditingLead(null); }} className="p-2 bg-black text-white rounded-lg">
                                <Check size={16} />
                              </button>
                              <button onClick={() => setEditingLead(null)} className="p-2 border border-gray-200 rounded-lg">
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div 
                              onClick={() => { setEditingLead(lead.id); setEditData({ notitie: lead.notitie || '' }); }}
                              className="text-sm text-gray-500 cursor-pointer flex items-center gap-2 hover:text-black mt-2"
                            >
                              <Edit2 size={12} />
                              {lead.notitie || 'Klik om notitie toe te voegen...'}
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {lead.google_maps_url && (
                              <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                                <MapPin size={12} /> Maps
                              </a>
                            )}
                            <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                              <Building2 size={12} /> KVK
                            </a>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' facebook')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                              <Facebook size={12} /> FB
                            </a>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' instagram')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 flex items-center gap-1">
                              <Instagram size={12} /> IG
                            </a>
                            {lead.telefoonnummer && (
                              <a href={`https://wa.me/${lead.telefoonnummer.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium hover:bg-green-200 flex items-center gap-1">
                                <MessageSquare size={12} /> WhatsApp
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <button onClick={() => deleteLead(lead.id)} className="p-2 border border-red-200 rounded-lg hover:bg-red-50 text-red-500" title="Verwijderen">
                            <Trash2 size={16} />
                          </button>
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
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-[1800px] mx-auto px-6 py-8">
              <h1 className="text-3xl font-black tracking-tight mb-8">Dashboard</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Totaal Leads</p>
                  <p className="text-4xl font-black">{dashboardData?.totaal_leads || 0}</p>
                </div>
                {Object.entries(STATUS_CONFIG).slice(0, 5).map(([key, val]) => (
                  <div key={key} className="bg-white rounded-xl border border-gray-200 p-6">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">{val.label}</p>
                    <p className="text-4xl font-black" style={{ color: val.color }}>
                      {dashboardData?.status_verdeling?.[key] || 0}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Status Distribution */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold mb-4">Status Verdeling</h3>
                  <div className="space-y-3">
                    {Object.entries(STATUS_CONFIG).map(([key, val]) => {
                      const count = dashboardData?.status_verdeling?.[key] || 0;
                      const total = dashboardData?.totaal_leads || 1;
                      const percentage = Math.round((count / total) * 100);
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{val.label}</span>
                            <span className="font-bold">{count}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all" 
                              style={{ width: `${percentage}%`, backgroundColor: val.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Source Distribution */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold mb-4">Bronnen</h3>
                  <div className="space-y-3">
                    {Object.entries(SEARCH_SOURCES).map(([key, source]) => {
                      const count = opgeslagenLeads.filter(l => l.source === key).length;
                      return (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-2">
                            <source.icon size={18} style={{ color: source.color }} />
                            <span>{source.name}</span>
                          </div>
                          <span className="font-bold">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold mb-4">Recent Toegevoegd</h3>
                {opgeslagenLeads.slice(0, 5).map(lead => (
                  <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{lead.naam}</span>
                      <span className="px-2 py-0.5 rounded text-xs" style={{
                        backgroundColor: STATUS_CONFIG[lead.status || 'nieuw']?.bg,
                        color: STATUS_CONFIG[lead.status || 'nieuw']?.color
                      }}>
                        {STATUS_CONFIG[lead.status || 'nieuw']?.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {lead.opgeslagen_op ? new Date(lead.opgeslagen_op).toLocaleDateString('nl-NL') : '-'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TOOLS TAB */}
        {activeTab === 'tools' && (
          <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-[1800px] mx-auto px-6 py-8">
              <h1 className="text-3xl font-black tracking-tight mb-8">Tools & Integraties</h1>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Export Tool */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Download size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">CSV Export</h3>
                  <p className="text-gray-500 text-sm mb-4">Exporteer alle leads naar een CSV bestand voor gebruik in Excel of Google Sheets.</p>
                  <button onClick={() => exportCSV()} className="w-full py-3 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700">
                    EXPORTEER ALLE LEADS
                  </button>
                </div>

                {/* Bulk Import */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Bulk Import</h3>
                  <p className="text-gray-500 text-sm mb-4">Importeer leads vanuit een CSV bestand. Handig voor migratie van andere systemen.</p>
                  <button className="w-full py-3 border-2 border-gray-200 rounded-lg font-bold text-sm hover:border-black">
                    COMING SOON
                  </button>
                </div>

                {/* KVK API */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Building2 size={24} className="text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">KVK Integratie</h3>
                  <p className="text-gray-500 text-sm mb-4">Directe koppeling met de Kamer van Koophandel voor bedrijfsgegevens.</p>
                  <button className="w-full py-3 border-2 border-gray-200 rounded-lg font-bold text-sm hover:border-black">
                    COMING SOON
                  </button>
                </div>

                {/* WhatsApp */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <MessageSquare size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">WhatsApp Templates</h3>
                  <p className="text-gray-500 text-sm mb-4">Stuur gepersonaliseerde WhatsApp berichten naar leads met één klik.</p>
                  <button className="w-full py-3 border-2 border-gray-200 rounded-lg font-bold text-sm hover:border-black">
                    COMING SOON
                  </button>
                </div>

                {/* Email */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Mail size={24} className="text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Email Campagnes</h3>
                  <p className="text-gray-500 text-sm mb-4">Verstuur gepersonaliseerde email campagnes naar geselecteerde leads.</p>
                  <button className="w-full py-3 border-2 border-gray-200 rounded-lg font-bold text-sm hover:border-black">
                    COMING SOON
                  </button>
                </div>

                {/* Calendar */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Calendar size={24} className="text-red-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Follow-up Reminders</h3>
                  <p className="text-gray-500 text-sm mb-4">Plan automatische herinneringen voor lead opvolging.</p>
                  <button className="w-full py-3 border-2 border-gray-200 rounded-lg font-bold text-sm hover:border-black">
                    COMING SOON
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadFinderPage;
