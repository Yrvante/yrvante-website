import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import { useTheme } from "../App";
import { 
  Search, Phone, MapPin, ExternalLink, Save, Trash2, Edit2, Check, X, 
  Download, ChevronDown, ChevronUp, BarChart3, Users, Lock, ArrowLeft, Loader2, RefreshCw,
  Bookmark, FileText, ArrowRight, Menu as MenuIcon, Mail, Globe, Building2,
  Instagram, Facebook, Filter, SortAsc, CheckSquare, Square, MoreHorizontal,
  Target, TrendingUp, Calendar, Clock, Star, Tag, Copy, MessageSquare,
  Briefcase, User, Hash, Link2, ChevronRight, Settings, Zap, Database, FileSpreadsheet,
  Upload, Sun, Moon
} from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';
const API = `${API_BASE}/api/admin/leadfinder`;
const LOGO_URL = "/logo-nav.png";
const LOGO_URL_WHITE = "/logo-nav-white.png";

// Glassmorphism base classes (matching AdminDashboard)
const G = "bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-white/40 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]";
const GC = `${G} rounded-2xl`;
const GI = "bg-white/50 dark:bg-white/[0.06] border border-gray-200/60 dark:border-white/10 backdrop-blur-sm rounded-xl focus:border-black dark:focus:border-white focus:bg-white/80 dark:focus:bg-white/10 outline-none transition-all text-black dark:text-white";

// Search source configurations
const SEARCH_SOURCES = {
  google: { id: 'google', name: 'Google Maps', icon: MapPin, color: '#4285F4', description: 'Google Places API — echte bedrijfsdata' },
  openstreetmap: { id: 'openstreetmap', name: 'OpenStreetMap', icon: Globe, color: '#7EBC6F', description: 'Gratis open-data kaart' },
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

const CSV_STATUS_OPTIONS = [
  { value: 'nieuw', label: 'Nieuw', color: '#3B82F6', bg: '#EFF6FF' },
  { value: 'benaderd', label: 'Benaderd', color: '#F59E0B', bg: '#FFFBEB' },
  { value: 'gereageerd', label: 'Gereageerd', color: '#10B981', bg: '#ECFDF5' },
  { value: 'geen_interesse', label: 'Geen interesse', color: '#EF4444', bg: '#FEF2F2' },
  { value: 'overgeslagen', label: 'Overgeslagen', color: '#6B7280', bg: '#F3F4F6' },
];

const formatPhoneForWhatsApp = (phone) => {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('0')) cleaned = '31' + cleaned.substring(1);
  if (!cleaned.startsWith('+') && !cleaned.startsWith('31')) cleaned = '31' + cleaned;
  cleaned = cleaned.replace(/^\+/, '');
  return cleaned;
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

const LeadFinderPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('zoeken');
  const [activeSource, setActiveSource] = useState('google');
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
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
  const [synoniemenGezocht, setSynoniemenGezocht] = useState([]);
  
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

  // CSV Import states
  const csvFileRef = useRef(null);
  const [csvLeads, setCsvLeads] = useState([]);
  const [csvSearchQuery, setCsvSearchQuery] = useState('');
  const [csvStatusFilter, setCsvStatusFilter] = useState('alle');
  const [csvOnlyNoWebsite, setCsvOnlyNoWebsite] = useState(false);
  const [csvSortCol, setCsvSortCol] = useState(null);
  const [csvSortDir, setCsvSortDir] = useState('asc');

  useEffect(() => {
    if (localStorage.getItem('leadfinder_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
      loadDashboard();
      loadCsvLeads();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        searchAll: searchAll,
        source: activeSource,
        sources: ["google", "openstreetmap", "instagram", "facebook", "linkedin", "telefoongids", "goudengids", "marktplaats", "kvk"],
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
      setSynoniemenGezocht(data.synoniemen_gezocht || []);
      
      if (!useToken) {
        const synMsg = data.synoniemen_gezocht?.length > 1 
          ? ` (${data.synoniemen_gezocht.length} zoektermen gebruikt)` 
          : '';
        toast.success(`${data.totaal_gevonden} bedrijven gevonden!${synMsg}`);
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
    setZoekResultaten([]); // Clear previous results
    
    try {
      const body = { 
        branche: searchQuery || '', 
        stad: searchLocation, 
        searchAll: true,
        sources: ["google", "openstreetmap", "instagram", "facebook", "linkedin", "telefoongids", "goudengids", "marktplaats", "kvk"],
        filters: searchFilters
      };
      
      toast.loading('Zoeken naar bedrijven zonder website...', { id: 'search' });
      
      const res = await fetch(`${API}/zoek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      
      toast.dismiss('search');
      
      if (data.error) { 
        toast.error(data.error); 
        setLoading(false); 
        return; 
      }
      
      const leadsWithSource = (data.leads || []).map(lead => ({
        ...lead,
        source: lead.source || 'google'
      }));
      
      setZoekResultaten(leadsWithSource);
      setNextPageToken(data.nextPageToken || null);
      setTotaalGevonden(data.totaal_gevonden || 0);
      setZoekgebied(data.zoekgebied || '');
      setBronnenDoorzocht(data.bronnen_doorzocht || []);
      setSynoniemenGezocht(data.synoniemen_gezocht || []);
      
      if (data.totaal_gevonden > 0) {
        const synMsg = data.synoniemen_gezocht?.length > 1 
          ? ` (${data.synoniemen_gezocht.length} zoektermen gebruikt)` 
          : '';
        toast.success(`${data.totaal_gevonden} leads gevonden!${synMsg}`);
      } else {
        toast.info('Geen bedrijven gevonden. Probeer een andere branche of stad.');
      }
      
      if (data.zoektermen_gebruikt && data.zoektermen_gebruikt.length > 0) {
        console.log('Zoektermen gebruikt:', data.zoektermen_gebruikt);
      }
    } catch (err) { 
      toast.dismiss('search');
      toast.error('Zoekfout - probeer opnieuw'); 
      console.error('Search error:', err);
    }
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

  // Google Sheets Export - Copy to clipboard in Google Sheets format
  const exportToGoogleSheets = (data = null) => {
    const exportData = data || (activeTab === 'zoeken' ? zoekResultaten : filteredLeads);
    if (!exportData.length) { 
      toast.error('Geen data om te exporteren'); 
      return; 
    }
    
    // Create tab-separated values (TSV) for Google Sheets
    const headers = ['Naam', 'Adres', 'Telefoon', 'Bron', 'Google Maps', 'Instagram', 'Facebook', 'LinkedIn', 'Status', 'Notitie'];
    const rows = exportData.map(l => [
      l.naam || '',
      l.adres || '',
      l.telefoonnummer || '',
      l.source || '',
      l.google_maps_url || '',
      l.instagram_url || '',
      l.facebook_url || '',
      l.linkedin_url || '',
      l.status || 'nieuw',
      l.notitie || ''
    ].map(c => c.toString().replace(/\t/g, ' ').replace(/\n/g, ' ')).join('\t'));
    
    const tsv = [headers.join('\t'), ...rows].join('\n');
    
    navigator.clipboard.writeText(tsv).then(() => {
      toast.success(
        <div>
          <strong>✅ Gekopieerd naar klembord!</strong>
          <p className="text-sm mt-1">Open Google Sheets → Ctrl+V om te plakken</p>
        </div>,
        { duration: 5000 }
      );
    }).catch(() => {
      // Fallback: create a textarea and copy
      const textarea = document.createElement('textarea');
      textarea.value = tsv;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('Gekopieerd! Open Google Sheets en druk Ctrl+V');
    });
  };

  // Open directly in Google Sheets (creates new sheet with data)
  const openInGoogleSheets = (data = null) => {
    const exportData = data || (activeTab === 'zoeken' ? zoekResultaten : filteredLeads);
    if (!exportData.length) { 
      toast.error('Geen data om te exporteren'); 
      return; 
    }
    
    // Create CSV content
    const headers = ['Naam', 'Adres', 'Telefoon', 'Bron', 'Google Maps URL', 'Status'];
    const csvContent = [
      headers.join(','),
      ...exportData.map(l => [
        `"${(l.naam || '').replace(/"/g, '""')}"`,
        `"${(l.adres || '').replace(/"/g, '""')}"`,
        `"${(l.telefoonnummer || '').replace(/"/g, '""')}"`,
        `"${(l.source || '').replace(/"/g, '""')}"`,
        `"${(l.google_maps_url || '').replace(/"/g, '""')}"`,
        `"${(l.status || 'nieuw').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');
    
    // Create blob and download as CSV (Google Sheets can open CSV files)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast.success(
      <div>
        <strong>📊 CSV gedownload!</strong>
        <p className="text-sm mt-1">Open in Google Sheets: File → Import → Upload</p>
      </div>,
      { duration: 5000 }
    );
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

  // === CSV Import Functions (synced via API + localStorage backup) ===
  const backupToLocal = (leads) => {
    localStorage.setItem('csv_imported_leads', JSON.stringify(leads));
  };

  const loadCsvLeads = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/leads`);
      if (!res.ok) throw new Error('API niet bereikbaar');
      let dbLeads = await res.json();

      // Migratie: oude localStorage data naar database
      const local = JSON.parse(localStorage.getItem('csv_imported_leads') || '[]');
      if (dbLeads.length === 0 && local.length > 0) {
        const migrated = local.map(l => ({
          ...l,
          plaats: l.plaats || extractCity(l.adres) || '',
          reviews: l.reviews || l.aantalReviews || '',
        }));
        await fetch(`${API_BASE}/api/leads`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leads: migrated })
        });
        dbLeads = local;
        toast.success(`${local.length} leads hersteld vanuit backup!`);
      }

      setCsvLeads(dbLeads);
      if (dbLeads.length > 0) backupToLocal(dbLeads);
    } catch {
      // Fallback naar localStorage
      const local = JSON.parse(localStorage.getItem('csv_imported_leads') || '[]');
      setCsvLeads(local);
      if (local.length > 0) toast.info(`${local.length} leads geladen uit lokale backup`);
    }
  };

  const saveCsvToServer = async (newLeads) => {
    try {
      await fetch(`${API_BASE}/api/leads`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: newLeads })
      });
    } catch { toast.error("Fout bij opslaan naar server — lokale backup bewaard"); }
  };

  const manualSaveAll = async () => {
    try {
      backupToLocal(csvLeads);
      await fetch(`${API_BASE}/api/leads`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: csvLeads })
      });
      toast.success(`${csvLeads.length} leads opgeslagen!`);
    } catch {
      backupToLocal(csvLeads);
      toast.success(`${csvLeads.length} leads opgeslagen als lokale backup`);
    }
  };

  const handleCsvImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data;
        if (!rows.length) { toast.error('CSV is leeg'); return; }
        
        const totalImported = rows.length;
        const mapped = rows
          .map((row, i) => ({
            id: `csv_${Date.now()}_${i}`,
            naam: row.title || row.naam || '',
            categorie: row.category || row.categorie || '',
            plaats: row.city || row.plaats || extractCity(row.address || row.adres || ''),
            telefoon: row.phone || row.telefoon || '',
            website: row.website || '',
            rating: row.review_rating || row.rating || '',
            reviews: row.review_count || row.reviews || '',
            status: 'nieuw',
          }));

        const zonderWebsite = mapped.filter(l => !l.website || l.website.trim() === '').length;
        const existing = new Set(csvLeads.map(l => l.telefoon?.trim()).filter(Boolean));
        const newLeads = mapped.filter(l => {
          const phone = l.telefoon?.trim();
          if (phone && existing.has(phone)) return false;
          if (phone) existing.add(phone);
          return true;
        });
        
        const merged = [...csvLeads, ...newLeads];
        setCsvLeads(merged);
        backupToLocal(merged);
        await saveCsvToServer(newLeads);
        
        toast.success(
          `${totalImported} rijen gelezen — ${zonderWebsite} zonder website — ${newLeads.length} nieuw toegevoegd`
        );
      },
      error: () => { toast.error('Fout bij het lezen van de CSV'); }
    });
    
    e.target.value = '';
  };

  const updateCsvStatus = async (id, status) => {
    setCsvLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    try { await fetch(`${API_BASE}/api/leads?id=${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }); } catch { toast.error("Fout bij status update"); }
  };

  const deleteCsvLead = async (id) => {
    setCsvLeads(prev => prev.filter(l => l.id !== id));
    try { await fetch(`${API_BASE}/api/leads?id=${id}`, { method: 'DELETE' }); }
    catch { toast.error("Fout bij verwijderen"); }
  };

  const clearAllCsvLeads = async () => {
    if (!window.confirm('Alle geïmporteerde leads verwijderen?')) return;
    setCsvLeads([]);
    try { await fetch(`${API_BASE}/api/leads`, { method: 'DELETE' }); toast.success('Alle CSV leads verwijderd'); }
    catch { toast.error("Fout bij wissen"); }
  };

  const [bulkSending, setBulkSending] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });

  const bulkWhatsApp = async () => {
    const targets = csvLeads.filter(l => l.status === 'nieuw' && l.telefoon?.trim());
    if (!targets.length) { toast.error('Geen nieuwe leads met telefoonnummer gevonden'); return; }
    if (!window.confirm(`WhatsApp openen voor ${targets.length} leads? (elke 2 sec een nieuw tabblad)`)) return;

    setBulkSending(true);
    setBulkProgress({ current: 0, total: targets.length });

    for (let i = 0; i < targets.length; i++) {
      const lead = targets[i];
      setBulkProgress({ current: i + 1, total: targets.length });
      window.open(getWhatsAppUrl(lead), '_blank');
      updateCsvStatus(lead.id, 'benaderd');
      if (i < targets.length - 1) await new Promise(r => setTimeout(r, 2000));
    }

    setBulkSending(false);
    toast.success(`${targets.length} WhatsApp berichten geopend!`);
  };

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
🔄 Al een website? Ik blaas 'm nieuw leven in vanaf €249

Benieuwd? → https://yrvante.com
Of stuur me gewoon een berichtje terug 😊

Yvar
Yrvante — Smart Web & Software 085-5055314`);
    return `https://api.whatsapp.com/send?phone=${phone}&text=${msg}`;
  };

  const filteredCsvLeads = csvLeads.filter(lead => {
    if (csvOnlyNoWebsite && lead.website && lead.website.trim() !== '') return false;
    if (csvStatusFilter !== 'alle' && lead.status !== csvStatusFilter) return false;
    if (csvSearchQuery) {
      const q = csvSearchQuery.toLowerCase();
      const city = (lead.plaats || '').toLowerCase();
      return lead.naam?.toLowerCase().includes(q) || city.includes(q);
    }
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

  const sortedCsvLeads = [...filteredCsvLeads].sort((a, b) => {
    if (!csvSortCol) return 0;
    const dir = csvSortDir === 'asc' ? 1 : -1;
    let va, vb;
    switch (csvSortCol) {
      case 'naam': va = a.naam || ''; vb = b.naam || ''; break;
      case 'categorie': va = a.categorie || ''; vb = b.categorie || ''; break;
      case 'plaats': va = a.plaats || ''; vb = b.plaats || ''; break;
      case 'website': va = a.website ? '0' : '1'; vb = b.website ? '0' : '1'; break;
      case 'rating': va = parseFloat(a.rating) || 0; vb = parseFloat(b.rating) || 0; return (va - vb) * dir;
      case 'reviews': va = parseInt(a.reviews) || 0; vb = parseInt(b.reviews) || 0; return (va - vb) * dir;
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
    geenInteresse: csvLeads.filter(l => l.status === 'geen_interesse').length,
  };

  const exportCsvLeads = () => {
    if (!csvLeads.length) { toast.error('Geen CSV leads om te exporteren'); return; }
    const headers = ['Bedrijfsnaam','Categorie','Plaats','Telefoon','Website','Rating','Reviews','Status','Notitie'];
    const csv = [
      headers.join(','),
      ...csvLeads.map(l => [
        l.naam, l.categorie, l.plaats || '', l.telefoon,
        l.website, l.rating, l.reviews || '', l.status, l.notitie || ''
      ].map(c => `"${(c || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = `csv_leads_backup_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success(`${csvLeads.length} leads geëxporteerd als CSV backup`);
  };

  const updateCsvNote = async (id, notitie) => {
    setCsvLeads(prev => prev.map(l => l.id === id ? { ...l, notitie } : l));
    try { await fetch(`${API_BASE}/api/leads?id=${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notitie })
    }); } catch { /* silent */ }
  };

  const copyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    toast.success('Telefoonnummer gekopieerd!');
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
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
          <div className={`${GC} p-6 sm:p-8`}>
            <div className="text-center mb-6 sm:mb-8">
              <Link to="/"><img src={isDark ? LOGO_URL_WHITE : LOGO_URL} alt="Yrvante" className="h-7 sm:h-8 mx-auto mb-4 sm:mb-6" /></Link>
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${G} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                <Lock className="text-gray-400 dark:text-gray-500" size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white mb-1">Admin Dashboard</h1>
              <p className="text-gray-400 dark:text-gray-500 text-sm">Beveiligd gebied — Yrvante</p>
            </div>
            <form onSubmit={handleLogin}>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Wachtwoord"
                className={`w-full py-3.5 sm:py-4 px-4 text-base mb-4 ${GI}`} autoFocus />
              {authError && <p className="text-red-500 text-sm mb-4 text-center">{authError}</p>}
              <button type="submit" className="w-full py-3.5 sm:py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-all rounded-full">
                Inloggen
              </button>
            </form>
            <div className="text-center mt-5 sm:mt-6">
              <Link to="/" className="text-gray-400 dark:text-gray-500 text-sm hover:text-black dark:hover:text-white flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={14} />Terug naar website
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-b border-white/40 dark:border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/" className="flex items-center">
                <img src={isDark ? LOGO_URL_WHITE : LOGO_URL} alt="Yrvante" className="h-5 sm:h-6" />
              </Link>
              <span className="hidden sm:inline text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black px-2.5 py-1 rounded-full tracking-wider">ADMIN</span>
            </div>
            
            {/* Tab Pills */}
            <div className={`${G} !rounded-xl !shadow-none p-0.5 flex gap-0.5`}>
              {[
                { id: 'zoeken', label: 'ZOEKEN', icon: Search },
                { id: 'csv', label: 'CSV', icon: Upload, count: csvLeads.length },
                { id: 'leads', label: 'LEADS', icon: Users, count: opgeslagenLeads.length },
                { id: 'dashboard', label: 'STATS', icon: BarChart3 },
                { id: 'tools', label: 'TOOLS', icon: Settings }
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                      : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/[0.06]'
                  }`}>
                  <tab.icon size={13} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`px-1 py-0.5 rounded text-[9px] ${activeTab === tab.id ? 'bg-white/20 dark:bg-black/20' : 'bg-gray-200/50 dark:bg-white/10'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/[0.06] transition-all"
                data-testid="theme-toggle-button"
                title={isDark ? 'Licht thema' : 'Donker thema'}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={logout} className="text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors hidden sm:block">Uitloggen</button>
              <button onClick={logout} className="sm:hidden p-2 text-gray-400 hover:text-black dark:hover:text-white">
                <ArrowLeft size={18} />
              </button>
              <Link to="/" className="hidden sm:flex px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-all rounded-full">
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
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
              
              {/* Main Search Card */}
              <div className={`${GC} overflow-hidden mb-4 sm:mb-8`}>
                {/* Header */}
                <div className="bg-black dark:bg-white text-white dark:text-black p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 dark:bg-black/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Target size={18} />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg sm:text-xl tracking-tight">Lead Finder</h2>
                      <p className="text-gray-400 dark:text-gray-600 text-xs sm:text-sm">Vind ZZP'ers & bedrijven zonder website</p>
                    </div>
                  </div>
                </div>
                
                {/* Search Form */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 mb-4">
                    <div className="sm:col-span-5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 block">Branche (optioneel)</label>
                      <input
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="bijv. kapper, coach..."
                        className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 text-base ${GI}`}
                        onKeyPress={e => e.key === 'Enter' && zoekAlles()}
                      />
                    </div>
                    <div className="sm:col-span-5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 block">Locatie *</label>
                      <input
                        value={searchLocation}
                        onChange={e => setSearchLocation(e.target.value)}
                        placeholder="bijv. Almelo"
                        className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 text-base ${GI}`}
                        onKeyPress={e => e.key === 'Enter' && zoekAlles()}
                      />
                    </div>
                  </div>

                  {/* Filter & Search Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-100/40 dark:border-white/[0.05]">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                      <input 
                        type="checkbox" 
                        checked={searchFilters.onlyWithPhone} 
                        onChange={e => setSearchFilters({...searchFilters, onlyWithPhone: e.target.checked})}
                        className="w-4 h-4 accent-black dark:accent-white rounded"
                      />
                      Alleen met telefoonnummer
                    </label>
                    <button
                      onClick={zoekAlles}
                      disabled={loading || !searchLocation.trim()}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-800 dark:hover:bg-gray-200 transition-all rounded-full disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                      ZOEKEN
                    </button>
                  </div>
                </div>

                {/* Bronnen Info - Hidden on mobile */}
                <div className="hidden sm:block bg-black/[0.02] dark:bg-white/[0.02] px-6 py-3 border-t border-gray-100/40 dark:border-white/[0.05]">
                  <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-gray-500">
                    <span className="font-medium">Doorzoekt:</span>
                    {Object.values(SEARCH_SOURCES).map(source => (
                      <span key={source.id} className="flex items-center gap-1">
                        <source.icon size={12} style={{ color: source.color }} />
                        {source.name}
                      </span>
                    ))}
                    <span className="flex items-center gap-1"><Database size={12} /> + Telefoongids, Gouden Gids, Marktplaats</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              {zoekResultaten.length > 0 && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <h3 className="font-bold text-lg sm:text-xl">{totaalGevonden} Resultaten</h3>
                      {zoekgebied && (
                        <span className="px-2 sm:px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                          <MapPin size={12} className="inline mr-1" />
                          {zoekgebied}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={saveAllResults} className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 flex items-center justify-center gap-1.5">
                        <Save size={14} /> <span className="hidden sm:inline">OPSLAAN</span>
                      </button>
                      <button onClick={() => exportToGoogleSheets(zoekResultaten)} className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-1.5">
                        <FileSpreadsheet size={14} /> <span className="hidden sm:inline">SHEETS</span>
                      </button>
                      <button onClick={() => exportCSV(zoekResultaten)} className="px-3 sm:px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-xs font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 flex items-center justify-center gap-1.5 text-black dark:text-white">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Synoniemen indicator */}
                  {synoniemenGezocht.length > 1 && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl" data-testid="synonyms-indicator">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Zap size={14} className="text-blue-500" />
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Synoniem-uitbreiding actief — {synoniemenGezocht.length} zoektermen gebruikt</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {synoniemenGezocht.map((term, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white dark:bg-neutral-800 border border-blue-200 dark:border-blue-700 rounded-full text-xs text-blue-600 dark:text-blue-300">{term}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3">
                    {zoekResultaten.map((lead, i) => (
                      <div key={lead.place_id || i} className={`${GC} p-4 sm:p-5 hover:shadow-lg transition-all`}>
                        <div className="flex justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="font-bold text-base sm:text-lg truncate text-black dark:text-white">{lead.naam}</h3>
                              <span className="px-2 py-0.5 rounded text-xs font-medium shrink-0" style={{ 
                                backgroundColor: SEARCH_SOURCES[lead.source || activeSource]?.color + '15',
                                color: SEARCH_SOURCES[lead.source || activeSource]?.color
                              }}>
                                {SEARCH_SOURCES[lead.source || activeSource]?.name || lead.source}
                              </span>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-4 text-sm mb-3">
                              {lead.adres && (
                                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 truncate"><MapPin size={13} className="shrink-0" /><span className="truncate">{lead.adres}</span></span>
                              )}
                              {lead.telefoonnummer && (
                                <a href={`tel:${lead.telefoonnummer}`} className="text-black dark:text-white font-medium flex items-center gap-1.5 hover:underline">
                                  <Phone size={13} className="shrink-0" />{lead.telefoonnummer}
                                </a>
                              )}
                            </div>

                            {/* Quick Links - Compact */}
                            <div className="flex flex-wrap gap-1.5">
                              {lead.google_maps_url && (
                                <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-2.5 py-1 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-400 border border-white/30 dark:border-white/[0.06]">
                                  <MapPin size={11} /> Maps
                                </a>
                              )}
                              <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-2.5 py-1 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-400 border border-white/30 dark:border-white/[0.06]">
                                <Building2 size={11} /> KVK
                              </a>
                              <a href={`https://www.facebook.com/search/pages?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-2.5 py-1 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-400 border border-white/30 dark:border-white/[0.06]">
                                <Facebook size={11} /> FB
                              </a>
                              <a href={`https://www.instagram.com/${lead.naam.toLowerCase().replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-2.5 py-1 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-400 border border-white/30 dark:border-white/[0.06]">
                                <Instagram size={11} /> IG
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <button onClick={() => saveLead(lead)} className="p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors" title="Opslaan">
                              <Save size={16} />
                            </button>
                            {lead.google_maps_url && (
                              <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className={`p-2.5 ${G} !rounded-xl !shadow-none hover:bg-white/80 dark:hover:bg-white/10 text-black dark:text-white`} title="Open">
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {nextPageToken && (
                    <div className="text-center mt-8">
                      <button onClick={() => zoekBedrijven(true)} disabled={loading} className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-[0.1em] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all rounded-full flex items-center gap-2 mx-auto">
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <ChevronDown size={16} />} MEER LADEN
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!loading && zoekResultaten.length === 0 && (
                <div className={`${GC} p-16 text-center`}>
                  <div className={`w-16 h-16 ${G} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Search size={28} className="text-gray-300 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Begin met zoeken</h3>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">Voer een locatie in en klik op zoeken</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ZOEKEN TAB - END */}

        {/* CSV IMPORT TAB */}
        {activeTab === 'csv' && (
          <motion.div key="csv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
              
              {/* Header + Import Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white" data-testid="csv-import-title">CSV Import</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Importeer leads van Google Maps Scraper</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input ref={csvFileRef} type="file" accept=".csv" onChange={handleCsvImport} className="hidden" data-testid="csv-file-input" />
                  <button onClick={() => csvFileRef.current?.click()}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.1em] hover:bg-gray-800 dark:hover:bg-gray-200 transition-all rounded-full flex items-center gap-2"
                    data-testid="csv-import-button">
                    <Upload size={14} /> IMPORTEREN
                  </button>
                  {csvLeads.length > 0 && (
                    <button onClick={manualSaveAll}
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-green-200 dark:border-green-800 text-green-600 text-xs font-bold rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-1.5"
                      data-testid="csv-save-all">
                      <Save size={14} /> OPSLAAN
                    </button>
                  )}
                  {csvLeads.length > 0 && (
                    <button onClick={exportCsvLeads}
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-blue-200 dark:border-blue-800 text-blue-600 text-xs font-bold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-1.5"
                      data-testid="csv-export-button">
                      <Download size={14} /> EXPORT
                    </button>
                  )}
                  {csvLeads.length > 0 && (
                    <button onClick={clearAllCsvLeads}
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-red-200 dark:border-red-800 text-red-500 text-xs font-bold rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1.5"
                      data-testid="csv-clear-all">
                      <Trash2 size={14} /> WISSEN
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              {/* Bulk WhatsApp */}
              {csvLeads.filter(l => l.status === 'nieuw' && l.telefoon?.trim()).length > 0 && (
                <div className="mb-6 p-3 sm:p-4 bg-green-50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-testid="bulk-whatsapp-bar">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-green-800 dark:text-green-300">
                      {bulkSending
                        ? `WhatsApp versturen... ${bulkProgress.current}/${bulkProgress.total}`
                        : `${csvLeads.filter(l => l.status === 'nieuw' && l.telefoon?.trim()).length} nieuwe leads klaar om te benaderen`
                      }
                    </p>
                    <p className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 mt-0.5">Opent WhatsApp per lead met vooringevuld bericht (elke 2 sec)</p>
                  </div>
                  <button
                    onClick={bulkWhatsApp}
                    disabled={bulkSending}
                    className={`w-full sm:w-auto px-5 py-2.5 text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all ${bulkSending ? 'bg-green-400 cursor-wait' : 'bg-green-600 hover:bg-green-700'}`}
                    data-testid="bulk-whatsapp-button">
                    <MessageSquare size={14} /> {bulkSending ? `${bulkProgress.current}/${bulkProgress.total}` : 'Bulk WhatsApp'}
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
                {[
                  { label: 'Totaal', value: csvStats.totaal, color: isDark ? '#fff' : '#000' },
                  { label: 'Zonder Website', value: csvStats.zonderWebsite, color: '#3B82F6' },
                  { label: 'Benaderd', value: csvStats.benaderd, color: '#F59E0B' },
                  { label: 'Gereageerd', value: csvStats.gereageerd, color: '#10B981' },
                  { label: 'Geen Interesse', value: csvStats.geenInteresse, color: '#EF4444' },
                ].map((stat, i) => (
                  <div key={i} className={`${GC} p-4 sm:p-5`} data-testid={`csv-stat-${i}`}>
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Search + Filter Bar */}
              {csvLeads.length > 0 && (
                <div className={`${GC} p-3 sm:p-4 mb-4 sm:mb-6`}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <div className="flex-1 relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input value={csvSearchQuery} onChange={e => setCsvSearchQuery(e.target.value)}
                        placeholder="Zoek op naam of plaats..."
                        className={`w-full pl-10 pr-4 py-2 text-sm ${GI}`}
                        data-testid="csv-search-input" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setCsvOnlyNoWebsite(!csvOnlyNoWebsite)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                          csvOnlyNoWebsite
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400'
                            : 'bg-white/50 dark:bg-white/[0.06] border-gray-200/60 dark:border-white/10 text-gray-500 dark:text-gray-400'
                        }`}
                        data-testid="csv-no-website-toggle"
                      >
                        <Globe size={13} />
                        {csvOnlyNoWebsite ? 'Zonder' : 'Alle'}
                      </button>
                      <select value={csvStatusFilter} onChange={e => setCsvStatusFilter(e.target.value)}
                        className={`px-3 py-2 text-xs sm:text-sm font-medium cursor-pointer ${GI}`}
                        data-testid="csv-status-filter">
                        <option value="alle">Alle Status</option>
                        {CSV_STATUS_OPTIONS.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}
                      </select>
                      <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">{filteredCsvLeads.length} resultaten</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Leads Table */}
              {csvLeads.length === 0 ? (
                <div className={`${GC} p-10 sm:p-16 text-center`}>
                  <div className={`w-16 h-16 ${G} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Upload size={28} className="text-gray-300 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Geen leads geïmporteerd</h3>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">Upload een CSV van de Google Maps Scraper om te beginnen</p>
                  <button onClick={() => csvFileRef.current?.click()}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm"
                    data-testid="csv-import-empty-button">
                    CSV IMPORTEREN
                  </button>
                </div>
              ) : filteredCsvLeads.length === 0 ? (
                <div className={`${GC} p-12 text-center`}>
                  <Search size={40} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Geen resultaten</h3>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">Pas je zoekopdracht of filter aan</p>
                </div>
              ) : (
                <div className={`${GC} overflow-hidden`}>
                  {/* Desktop Table */}
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
                            { key: 'delete', label: '', sortable: false, center: true },
                          ].map((h) => (
                            <th key={h.key}
                              onClick={h.sortable ? () => toggleCsvSort(h.key) : undefined}
                              className={`${h.center ? 'text-center' : 'text-left'} px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${h.sortable ? 'cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 select-none transition-colors' : ''}`}
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
                        {sortedCsvLeads.map(lead => {
                          const statusConf = CSV_STATUS_OPTIONS.find(s => s.value === lead.status) || CSV_STATUS_OPTIONS[0];
                          const hasWebsite = lead.website && lead.website.trim() !== '';
                          return (
                            <React.Fragment key={lead.id}>
                            <tr className="border-b border-gray-100/30 dark:border-white/[0.03] hover:bg-white/40 dark:hover:bg-white/[0.03] transition-colors" data-testid={`csv-lead-row-${lead.id}`}>
                              <td className="px-4 py-3">
                                <a href={`https://www.google.com/maps/search/${encodeURIComponent(lead.naam + ' ' + (lead.plaats || ''))}`}
                                  target="_blank" rel="noopener noreferrer"
                                  className="font-semibold text-sm text-black dark:text-white hover:underline flex items-center gap-1"
                                  data-testid={`csv-lead-name-${lead.id}`}>
                                  {lead.naam} <ExternalLink size={11} className="text-gray-400 shrink-0" />
                                </a>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{lead.categorie || '-'}</td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{lead.plaats || '-'}</td>
                              <td className="px-4 py-3">
                                {hasWebsite ? (
                                  <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-[160px]"
                                    data-testid={`csv-website-${lead.id}`}>
                                    {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                                  </a>
                                ) : (
                                  <span className="text-xs font-semibold text-red-500" data-testid={`csv-no-website-${lead.id}`}>Geen website</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                {lead.telefoon ? (
                                  <div className="flex items-center gap-1.5">
                                    <a href={`tel:${lead.telefoon}`} className="text-sm font-medium hover:underline text-black dark:text-white">
                                      {lead.telefoon}
                                    </a>
                                    <button onClick={() => copyPhone(lead.telefoon)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" title="Kopiëren">
                                      <Copy size={12} />
                                    </button>
                                  </div>
                                ) : <span className="text-sm text-gray-400">-</span>}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {lead.rating ? (
                                  <span className="text-sm font-bold flex items-center justify-center gap-1 text-amber-500">
                                    <Star size={13} fill="currentColor" />{formatRating(lead.rating)}
                                  </span>
                                ) : <span className="text-xs text-gray-400">-</span>}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{lead.reviews || '-'}</span>
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={lead.status}
                                  onChange={e => updateCsvStatus(lead.id, e.target.value)}
                                  className="px-2.5 py-1 rounded-full text-xs font-bold border-0 cursor-pointer"
                                  style={{ backgroundColor: statusConf.bg, color: statusConf.color }}
                                  data-testid={`csv-status-select-${lead.id}`}
                                >
                                  {CSV_STATUS_OPTIONS.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 py-3 text-center">
                                {lead.telefoon ? (
                                  <button
                                    onClick={() => { window.open(getWhatsAppUrl(lead), '_blank'); updateCsvStatus(lead.id, 'benaderd'); }}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold hover:bg-green-600 transition-colors cursor-pointer"
                                    data-testid={`csv-whatsapp-${lead.id}`}
                                  >
                                    <MessageSquare size={12} /> WhatsApp
                                  </button>
                                ) : <span className="text-xs text-gray-400">Geen nr.</span>}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => deleteCsvLead(lead.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  data-testid={`csv-delete-${lead.id}`}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                            {/* Notitie + benaderd op rij */}
                            <tr className="border-b border-gray-100/30 dark:border-white/[0.03]">
                              <td colSpan={10} className="px-4 py-1.5">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="text"
                                    value={lead.notitie || ''}
                                    onChange={e => updateCsvNote(lead.id, e.target.value)}
                                    placeholder="Notitie toevoegen..."
                                    className="flex-1 text-xs bg-transparent border-0 outline-none text-gray-500 dark:text-gray-400 placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                    data-testid={`csv-note-${lead.id}`}
                                  />
                                  {lead.updatedAt && lead.status === 'benaderd' && (
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap flex items-center gap-1">
                                      <Clock size={10} /> {new Date(lead.updatedAt).toLocaleString('nl-NL')}
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden divide-y divide-gray-100 dark:divide-neutral-800">
                    {sortedCsvLeads.map(lead => {
                      const statusConf = CSV_STATUS_OPTIONS.find(s => s.value === lead.status) || CSV_STATUS_OPTIONS[0];
                      const hasWebsite = lead.website && lead.website.trim() !== '';
                      return (
                        <div key={lead.id} className="p-4" data-testid={`csv-lead-card-${lead.id}`}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <a href={`https://www.google.com/maps/search/${encodeURIComponent(lead.naam + ' ' + (lead.plaats || ''))}`}
                                target="_blank" rel="noopener noreferrer"
                                className="font-semibold text-sm text-black dark:text-white hover:underline flex items-center gap-1">
                                {lead.naam} <ExternalLink size={10} className="text-gray-400" />
                              </a>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{lead.categorie} — {lead.plaats || '-'}</p>
                            </div>
                            <select value={lead.status} onChange={e => updateCsvStatus(lead.id, e.target.value)}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold border-0 cursor-pointer"
                              style={{ backgroundColor: statusConf.bg, color: statusConf.color }}>
                              {CSV_STATUS_OPTIONS.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}
                            </select>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-1 mb-2 text-xs">
                            {hasWebsite ? (
                              <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                                target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[180px]">
                                {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                              </a>
                            ) : (
                              <span className="font-semibold text-red-500">Geen website</span>
                            )}
                            {lead.rating && <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star size={11} fill="currentColor" />{formatRating(lead.rating)}</span>}
                            {lead.reviews && <span className="text-gray-400">({lead.reviews} reviews)</span>}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {lead.telefoon && (
                              <a href={`tel:${lead.telefoon}`} className="text-xs font-medium flex items-center gap-1 text-black dark:text-white">
                                <Phone size={12} />{lead.telefoon}
                              </a>
                            )}
                            {lead.telefoon && (
                              <button onClick={() => { navigator.clipboard.writeText(lead.telefoon); toast.success('Gekopieerd!'); }}
                                className="p-1 text-gray-400 hover:text-black dark:hover:text-white"><Copy size={12} /></button>
                            )}
                          </div>
                          {/* Notitie */}
                          <input
                            type="text"
                            value={lead.notitie || ''}
                            onChange={e => updateCsvNote(lead.id, e.target.value)}
                            placeholder="Notitie toevoegen..."
                            className="w-full mt-2 text-xs bg-gray-50 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/10 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 placeholder:text-gray-300 dark:placeholder:text-gray-600 outline-none focus:border-gray-400 dark:focus:border-white/20"
                            data-testid={`csv-note-mobile-${lead.id}`}
                          />
                          <div className="flex items-center gap-2 mt-3">
                            {lead.telefoon && (
                              <button onClick={() => { window.open(getWhatsAppUrl(lead), '_blank'); updateCsvStatus(lead.id, 'benaderd'); }}
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 cursor-pointer">
                                <MessageSquare size={12} /> WhatsApp
                              </button>
                            )}
                            <button onClick={() => deleteCsvLead(lead.id)}
                              className="p-2 text-gray-400 hover:text-red-500 border border-gray-200 dark:border-neutral-700 rounded-lg">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white">Leads Database</h1>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">{opgeslagenLeads.length} leads opgeslagen</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={loadLeads} className={`p-2 ${G} !rounded-xl !shadow-none hover:bg-white/80 dark:hover:bg-white/10 text-black dark:text-white`}><RefreshCw size={18} /></button>
                  <button onClick={() => exportToGoogleSheets()} className="px-3 sm:px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-emerald-600 flex items-center gap-1.5"><FileSpreadsheet size={14} /> SHEETS</button>
                  <button onClick={() => exportCSV()} className={`px-3 sm:px-4 py-2 ${G} !rounded-xl !shadow-none text-xs sm:text-sm font-bold hover:bg-white/80 dark:hover:bg-white/10 flex items-center gap-1.5 text-black dark:text-white`}><Download size={14} /> CSV</button>
                </div>
              </div>

              <div className={`${GC} p-3 sm:p-4 mb-6`}>
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0 sm:min-w-[200px] relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={searchLeadsQuery} onChange={e => setSearchLeadsQuery(e.target.value)} placeholder="Zoek leads..."
                      className={`w-full pl-10 pr-4 py-2 text-sm ${GI}`} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                  {[
                    { val: statusFilter, set: setStatusFilter, opts: Object.entries(STATUS_CONFIG).map(([k,v]) => [k, v.label]), def: 'Alle Status' },
                    { val: sourceFilter, set: setSourceFilter, opts: Object.entries(SEARCH_SOURCES).map(([k,v]) => [k, v.name]), def: 'Alle Bronnen' },
                    { val: priorityFilter, set: setPriorityFilter, opts: Object.entries(PRIORITY_CONFIG).map(([k,v]) => [k, `${v.icon} ${v.label}`]), def: 'Alle Prioriteit' },
                    { val: sortBy, set: setSortBy, opts: [['datum','Nieuwste'],['naam','Naam A-Z'],['status','Status']], def: null },
                  ].map((f, i) => (
                    <select key={i} value={f.val} onChange={e => f.set(e.target.value)} className={`px-3 py-2 text-xs sm:text-sm font-medium cursor-pointer ${GI}`}>
                      {f.def && <option value="alle">{f.def}</option>}
                      {f.opts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                    </select>
                  ))}
                  </div>
                </div>
                {selectedLeads.length > 0 && (
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100/40 dark:border-white/[0.05]">
                    <span className="text-sm font-medium text-black dark:text-white">{selectedLeads.length} geselecteerd</span>
                    <select onChange={e => { if(e.target.value) { bulkUpdateStatus(e.target.value); e.target.value = ''; }}} className={`px-3 py-1.5 text-sm ${GI}`}>
                      <option value="">Status wijzigen...</option>
                      {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                    <button onClick={bulkDelete} className="px-3 py-1.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">Verwijderen</button>
                    <button onClick={() => setSelectedLeads([])} className="px-3 py-1.5 text-gray-400 text-sm hover:text-black dark:hover:text-white">Annuleren</button>
                  </div>
                )}
              </div>

              {filteredLeads.length === 0 ? (
                <div className={`${GC} p-16 text-center`}>
                  <Users size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Geen leads gevonden</h3>
                  <p className="text-gray-400 dark:text-gray-500 mb-6">Pas je filters aan of zoek nieuwe leads</p>
                  <button onClick={() => setActiveTab('zoeken')} className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm">ZOEK LEADS</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-2">
                    <button onClick={selectAllLeads} className="p-1 hover:bg-white/40 dark:hover:bg-white/[0.06] rounded text-black dark:text-white">
                      {selectedLeads.length === filteredLeads.length ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    <span className="text-sm text-gray-400 dark:text-gray-500">Selecteer alles ({filteredLeads.length})</span>
                  </div>
                  {filteredLeads.map(lead => (
                    <div key={lead.id} className={`${GC} p-3 sm:p-5 transition-all ${selectedLeads.includes(lead.id) ? '!border-black dark:!border-white' : ''}`}>
                      <div className="flex items-start gap-2 sm:gap-4">
                        <button onClick={() => toggleSelectLead(lead.id)} className="mt-1 text-black dark:text-white shrink-0">
                          {selectedLeads.includes(lead.id) ? <CheckSquare size={18} /> : <Square size={18} className="text-gray-300 dark:text-gray-600" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-bold text-sm sm:text-lg text-black dark:text-white truncate">{lead.naam}</h3>
                            <select value={lead.status || 'nieuw'} onChange={e => updateLead(lead.id, { status: e.target.value })}
                              className="px-2 py-1 rounded-full text-xs font-bold border-0 cursor-pointer"
                              style={{ backgroundColor: STATUS_CONFIG[lead.status || 'nieuw']?.bg, color: STATUS_CONFIG[lead.status || 'nieuw']?.color }}>
                              {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                            </select>
                            <select value={lead.priority || 'medium'} onChange={e => updateLead(lead.id, { priority: e.target.value })}
                              className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${GI} !rounded-md`}>
                              {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
                            </select>
                            {lead.source && <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: SEARCH_SOURCES[lead.source]?.color + '15', color: SEARCH_SOURCES[lead.source]?.color }}>{SEARCH_SOURCES[lead.source]?.name}</span>}
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm mb-3">
                            {lead.adres && <span className="text-gray-400 flex items-center gap-1"><MapPin size={14} />{lead.adres}</span>}
                            {lead.telefoonnummer && <a href={`tel:${lead.telefoonnummer}`} className="text-gray-500 dark:text-gray-300 flex items-center gap-1 hover:underline"><Phone size={14} />{lead.telefoonnummer}</a>}
                            {lead.email && <a href={`mailto:${lead.email}`} className="text-gray-500 dark:text-gray-300 flex items-center gap-1 hover:underline"><Mail size={14} />{lead.email}</a>}
                          </div>
                          {editingLead === lead.id ? (
                            <div className="flex gap-2 mt-2">
                              <input value={editData.notitie || ''} onChange={e => setEditData({...editData, notitie: e.target.value})} placeholder="Voeg notitie toe..."
                                className={`flex-1 px-3 py-2 text-sm ${GI}`} autoFocus />
                              <button onClick={() => { updateLead(lead.id, editData); setEditingLead(null); }} className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-xl"><Check size={16} /></button>
                              <button onClick={() => setEditingLead(null)} className={`p-2 ${G} !rounded-xl !shadow-none text-black dark:text-white`}><X size={16} /></button>
                            </div>
                          ) : (
                            <div onClick={() => { setEditingLead(lead.id); setEditData({ notitie: lead.notitie || '' }); }}
                              className="text-sm text-gray-400 cursor-pointer flex items-center gap-2 hover:text-black dark:hover:text-white mt-2">
                              <Edit2 size={12} />{lead.notitie || 'Klik om notitie toe te voegen...'}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {lead.google_maps_url && <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm border border-white/30 dark:border-white/[0.06] rounded-full text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-300"><MapPin size={12} /> Maps</a>}
                            <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm border border-white/30 dark:border-white/[0.06] rounded-full text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-300"><Building2 size={12} /> KVK</a>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' facebook')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm border border-white/30 dark:border-white/[0.06] rounded-full text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-300"><Facebook size={12} /> FB</a>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam + ' instagram')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm border border-white/30 dark:border-white/[0.06] rounded-full text-xs font-medium hover:bg-white/70 dark:hover:bg-white/10 flex items-center gap-1 text-gray-600 dark:text-gray-300"><Instagram size={12} /> IG</a>
                            {lead.telefoonnummer && <a href={`https://api.whatsapp.com/send?phone=${lead.telefoonnummer.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/30 flex items-center gap-1 border border-green-200/50 dark:border-green-800/30"><MessageSquare size={12} /> WhatsApp</a>}
                          </div>
                        </div>
                        <button onClick={() => deleteLead(lead.id)} className="p-2 border border-red-200/50 dark:border-red-800/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500"><Trash2 size={16} /></button>
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
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 sm:mb-8 text-black dark:text-white">Dashboard</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className={`${GC} p-4 sm:p-6`}>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1 sm:mb-2">Totaal Leads</p>
                  <p className="text-2xl sm:text-4xl font-black text-black dark:text-white">{dashboardData?.totaal_leads || 0}</p>
                </div>
                {Object.entries(STATUS_CONFIG).slice(0, 5).map(([key, val]) => (
                  <div key={key} className={`${GC} p-4 sm:p-6`}>
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1 sm:mb-2">{val.label}</p>
                    <p className="text-2xl sm:text-4xl font-black" style={{ color: val.color }}>{dashboardData?.status_verdeling?.[key] || 0}</p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className={`${GC} p-6`}>
                  <h3 className="font-bold mb-4 text-black dark:text-white">Status Verdeling</h3>
                  <div className="space-y-3">
                    {Object.entries(STATUS_CONFIG).map(([key, val]) => {
                      const count = dashboardData?.status_verdeling?.[key] || 0;
                      const total = dashboardData?.totaal_leads || 1;
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500 dark:text-gray-400">{val.label}</span>
                            <span className="font-bold text-black dark:text-white">{count}</span>
                          </div>
                          <div className="h-2 bg-black/[0.04] dark:bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: val.color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={`${GC} p-6`}>
                  <h3 className="font-bold mb-4 text-black dark:text-white">Bronnen</h3>
                  <div className="space-y-3">
                    {Object.entries(SEARCH_SOURCES).map(([key, source]) => {
                      const count = opgeslagenLeads.filter(l => l.source === key).length;
                      return (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100/30 dark:border-white/[0.04] last:border-0">
                          <div className="flex items-center gap-2"><source.icon size={18} style={{ color: source.color }} /><span className="text-gray-500 dark:text-gray-400">{source.name}</span></div>
                          <span className="font-bold text-black dark:text-white">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={`${GC} p-6`}>
                <h3 className="font-bold mb-4 text-black dark:text-white">Recent Toegevoegd</h3>
                {opgeslagenLeads.slice(0, 5).map(lead => (
                  <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-100/30 dark:border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-black dark:text-white">{lead.naam}</span>
                      <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: STATUS_CONFIG[lead.status || 'nieuw']?.bg, color: STATUS_CONFIG[lead.status || 'nieuw']?.color }}>
                        {STATUS_CONFIG[lead.status || 'nieuw']?.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 dark:text-gray-500">{lead.opgeslagen_op ? new Date(lead.opgeslagen_op).toLocaleDateString('nl-NL') : '-'}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TOOLS TAB */}
        {activeTab === 'tools' && (
          <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 sm:mb-8 text-black dark:text-white">Tools & Integraties</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: Download, iconBg: 'bg-green-100 dark:bg-green-900/20', iconColor: 'text-green-600 dark:text-green-400', title: 'CSV Export', desc: 'Exporteer alle leads naar een CSV bestand voor gebruik in Excel of Google Sheets.', btnText: 'EXPORTEER ALLE LEADS', btnClass: 'bg-green-600 text-white hover:bg-green-700', action: () => exportCSV() },
                  { icon: FileText, iconBg: 'bg-gray-100/50 dark:bg-white/[0.04]', iconColor: 'text-gray-500 dark:text-gray-400', title: 'Bulk Import', desc: 'Importeer leads vanuit een CSV bestand. Handig voor migratie van andere systemen.', btnText: 'COMING SOON', btnClass: `${G} !shadow-none hover:bg-white/80 dark:hover:bg-white/10 text-black dark:text-white`, soon: true },
                  { icon: Building2, iconBg: 'bg-purple-100 dark:bg-purple-900/20', iconColor: 'text-purple-600 dark:text-purple-400', title: 'KVK Integratie', desc: 'Directe koppeling met de Kamer van Koophandel voor bedrijfsgegevens.', btnText: 'COMING SOON', btnClass: `${G} !shadow-none hover:bg-white/80 dark:hover:bg-white/10 text-black dark:text-white`, soon: true },
                  { icon: MessageSquare, iconBg: 'bg-green-100 dark:bg-green-900/20', iconColor: 'text-green-600 dark:text-green-400', title: 'WhatsApp Templates', desc: 'Stuur gepersonaliseerde WhatsApp berichten naar leads met één klik.', btnText: 'COMING SOON', btnClass: `${G} !shadow-none hover:bg-white/80 dark:hover:bg-white/10 text-black dark:text-white`, soon: true },
                  { icon: Mail, iconBg: 'bg-orange-100 dark:bg-orange-900/20', iconColor: 'text-orange-600 dark:text-orange-400', title: 'Email Campagnes', desc: 'Verstuur gepersonaliseerde email campagnes naar geselecteerde leads.', btnText: 'COMING SOON', btnClass: `${G} !shadow-none hover:bg-white/80 dark:hover:bg-white/10 text-black dark:text-white`, soon: true },
                  { icon: Calendar, iconBg: 'bg-red-100 dark:bg-red-900/20', iconColor: 'text-red-600 dark:text-red-400', title: 'Follow-up Reminders', desc: 'Plan automatische herinneringen voor lead opvolging.', btnText: 'COMING SOON', btnClass: `${G} !shadow-none hover:bg-white/80 dark:hover:bg-white/10 text-black dark:text-white`, soon: true },
                ].map((tool, i) => (
                  <div key={i} className={`${GC} p-4 sm:p-6`}>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${tool.iconBg} rounded-xl flex items-center justify-center mb-3 sm:mb-4 border border-white/30 dark:border-white/[0.06]`}>
                      <tool.icon size={20} className={tool.iconColor} />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 text-black dark:text-white">{tool.title}</h3>
                    <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">{tool.desc}</p>
                    <button onClick={tool.action} className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm ${tool.btnClass}`}>{tool.btnText}</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadFinderPage;
