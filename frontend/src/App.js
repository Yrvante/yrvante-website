import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import axios from "axios";
import {
  Search, Download, MapPin, Phone, ExternalLink, ChevronDown,
  Bookmark, BookmarkCheck, BarChart3, List, Trash2, FileSpreadsheet,
  Facebook, Instagram, Building2, RefreshCw, SlidersHorizontal
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_prospect-scout-11/artifacts/1x2gzwkm_Yrvante%20logo%20transparant.PNG";

const STATUS_OPTIONS = ["Nieuw", "Gebeld", "Offerte gestuurd", "Klant geworden"];
const STATUS_COLORS = {
  "Nieuw": "bg-blue-50 text-blue-700 border-blue-200",
  "Gebeld": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Offerte gestuurd": "bg-purple-50 text-purple-700 border-purple-200",
  "Klant geworden": "bg-green-50 text-green-700 border-green-200"
};

function exportToCSV(leads, branche, stad) {
  const header = ["Bedrijfsnaam", "Adres", "Telefoonnummer", "Branche", "Stad", "Status", "Google Maps Link"];
  const rows = leads.map((l) => [
    `"${(l.naam || "").replace(/"/g, '""')}"`,
    `"${(l.adres || "").replace(/"/g, '""')}"`,
    `"${(l.telefoonnummer || "").replace(/"/g, '""')}"`,
    `"${(l.branche || branche || "").replace(/"/g, '""')}"`,
    `"${(l.stad || stad || "").replace(/"/g, '""')}"`,
    `"${(l.status || "").replace(/"/g, '""')}"`,
    `"${(l.google_maps_url || "").replace(/"/g, '""')}"`,
  ]);
  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${branche || "export"}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Social quick-search links
function fbLink(naam, stad) { return `https://www.google.com/search?q=${encodeURIComponent(`${naam} Facebook ${stad}`)}`; }
function igLink(naam, stad) { return `https://www.google.com/search?q=${encodeURIComponent(`${naam} Instagram ${stad}`)}`; }
function kvkLink(naam, stad) { return `https://www.kvk.nl/zoeken/?q=${encodeURIComponent(naam)}&plaatsnaam=${encodeURIComponent(stad)}`; }

export default function App() {
  const [tab, setTab] = useState("zoeken");
  const [branche, setBranche] = useState("");
  const [stad, setStad] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [results, setResults] = useState(null);
  const [allLeads, setAllLeads] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [totaalGevonden, setTotaalGevonden] = useState(0);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [visible, setVisible] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [savingId, setSavingId] = useState(null);
  const [shareUrl, setShareUrl] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);

  // Leads tab
  const [savedLeads, setSavedLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState("");

  // Dashboard
  const [dashData, setDashData] = useState(null);

  // Sheets
  const [sheetsStatus, setSheetsStatus] = useState(null);
  const [sheetsSpreadsheetId, setSheetsSpreadsheetId] = useState("");
  const [sheetsMsg, setSheetsMsg] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Load saved lead IDs on mount
  useEffect(() => {
    axios.get(`${API}/leads`).then(res => {
      const ids = new Set(res.data.map(l => l.place_id));
      setSavedIds(ids);
    }).catch(() => {});
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!branche.trim() || !stad.trim()) return;
    setLoading(true); setError(null); setResults(null); setAllLeads([]); setNextPageToken(null); setSearched(true);
    try {
      const res = await axios.post(`${API}/zoek`, { branche: branche.trim(), stad: stad.trim() });
      setResults(res.data);
      setAllLeads(res.data.leads || []);
      setNextPageToken(res.data.next_page_token || null);
      setTotaalGevonden(res.data.totaal_gevonden || 0);
    } catch (err) {
      setError(err.response?.data?.detail || "Er is een fout opgetreden.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await axios.post(`${API}/zoek`, {
        branche: branche.trim(), stad: stad.trim(), page_token: nextPageToken
      });
      const newLeads = res.data.leads || [];
      setAllLeads(prev => [...prev, ...newLeads]);
      setNextPageToken(res.data.next_page_token || null);
      setTotaalGevonden(prev => prev + (res.data.totaal_gevonden || 0));
    } catch (err) {
      setError("Fout bij laden van meer resultaten.");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCreateShare = async () => {
    setShareLoading(true);
    try {
      const res = await axios.post(`${API}/share?titel=Leadoverzicht ${branche} ${stad}`);
      const fullUrl = `${window.location.origin}/share/${res.data.token}`;
      setShareUrl(fullUrl);
      await navigator.clipboard.writeText(fullUrl).catch(() => {});
    } catch (err) {
      console.error(err);
    } finally {
      setShareLoading(false);
    }
  };

  const handleSaveLead = async (lead) => {
    setSavingId(lead.place_id);
    try {
      await axios.post(`${API}/leads`, { ...lead, branche, stad });
      setSavedIds(prev => new Set([...prev, lead.place_id]));
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingId(null);
    }
  };

  const loadSavedLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const res = await axios.get(`${API}/leads`);
      setSavedLeads(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLeadsLoading(false);
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/dashboard`);
      setDashData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadSheetsStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/sheets/status`);
      setSheetsStatus(res.data);
      if (res.data.spreadsheet_id) setSheetsSpreadsheetId(res.data.spreadsheet_id);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    if (tab === "leads") loadSavedLeads();
    if (tab === "dashboard") { loadDashboard(); loadSheetsStatus(); }
  }, [tab, loadSavedLeads, loadDashboard, loadSheetsStatus]);

  const handleUpdateStatus = async (leadId, status) => {
    try {
      const res = await axios.put(`${API}/leads/${leadId}`, { status });
      setSavedLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: res.data.status } : l));
    } catch (err) { console.error(err); }
  };

  const handleSaveNote = async (leadId) => {
    try {
      const res = await axios.put(`${API}/leads/${leadId}`, { notitie: noteText });
      setSavedLeads(prev => prev.map(l => l.id === leadId ? { ...l, notitie: res.data.notitie } : l));
      setEditingNote(null);
    } catch (err) { console.error(err); }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      await axios.delete(`${API}/leads/${leadId}`);
      setSavedLeads(prev => prev.filter(l => l.id !== leadId));
    } catch (err) { console.error(err); }
  };

  const handleSheetsLogin = async () => {
    try {
      const res = await axios.get(`${API}/sheets/login`);
      window.open(res.data.auth_url, "_blank");
    } catch (err) {
      setSheetsMsg(err.response?.data?.detail || "Fout bij inloggen");
    }
  };

  const handleSetSpreadsheet = async () => {
    try {
      await axios.post(`${API}/sheets/spreadsheet`, { spreadsheet_id: sheetsSpreadsheetId });
      setSheetsMsg("Spreadsheet ID opgeslagen!");
      loadSheetsStatus();
    } catch (err) {
      setSheetsMsg("Fout bij opslaan.");
    }
  };

  const handleExportAllToSheets = async () => {
    try {
      const res = await axios.post(`${API}/sheets/append-all`);
      setSheetsMsg(res.data.message);
    } catch (err) {
      setSheetsMsg(err.response?.data?.detail || "Sheets fout.");
    }
  };

  const handleAppendToSheets = async (leadId) => {
    try {
      const res = await axios.post(`${API}/sheets/append/${leadId}`);
      setSheetsMsg(res.data.message);
    } catch (err) {
      setSheetsMsg(err.response?.data?.detail || "Sheets fout.");
    }
  };

  const leads = allLeads;
  const totaal = totaalGevonden;
  const filteredLeads = filterStatus === "Alle" ? savedLeads : savedLeads.filter(l => l.status === filterStatus);
  return (
    <div className="min-h-screen relative overflow-x-hidden" data-testid="app-root">
      <div className="fixed inset-0 -z-10 bg-layer" />
      <div className="fixed inset-0 -z-10 bg-overlay pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100" data-testid="app-header">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto" />
            <span className="text-sm font-bold tracking-tight">Yrvante</span>
            <span className="hidden sm:inline text-xs text-gray-400 ml-1">Lead Finder</span>
          </div>
          {/* Tab nav */}
          <div className="flex items-center gap-1">
            {[
              { id: "zoeken", icon: <Search size={14} />, label: "Zoeken" },
              { id: "leads", icon: <List size={14} />, label: "Mijn Leads" },
              { id: "dashboard", icon: <BarChart3 size={14} />, label: "Dashboard" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-testid={`tab-${t.id}`}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                  tab === t.id ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t.icon} <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
          <a href="https://yrvante.com" target="_blank" rel="noreferrer"
            className="hidden md:flex px-5 py-2.5 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors">
            Start Project →
          </a>
        </div>
      </nav>

      {/* ── ZOEKEN TAB ── */}
      {tab === "zoeken" && (
        <>
          <section className="min-h-screen pt-16 relative overflow-hidden" data-testid="search-section">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
              <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center relative">

                <div className={`mb-6 fade-in ${visible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
                  <button data-testid="hero-badge" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 badge-glow">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-gray-600 text-xs">Lead Finder — Powered by Yrvante</span>
                  </button>
                </div>

                <p className={`text-sm font-medium uppercase tracking-[0.25em] text-gray-600 mb-4 fade-in ${visible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
                  Alles wat je nodig hebt om te groeien
                </p>

                <h1 className={`text-[12vw] lg:text-[7.5vw] font-black leading-[0.92] tracking-tighter mb-8 fade-in ${visible ? "fade-in-visible" : ""}`}
                  style={{ transitionDelay: "0.3s" }} data-testid="hero-title">
                  <span className="flex flex-col">
                    <span>VIND LEADS</span>
                    <span className="text-gray-400">ZONDER WEBSITE</span>
                  </span>
                </h1>

                <p className={`text-sm lg:text-base text-gray-500 max-w-lg leading-relaxed mb-6 fade-in ${visible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.35s" }}>
                  Voer een branche en stad in. Wij zoeken welke bedrijven nog geen online aanwezigheid hebben — dat zijn jouw potentiële klanten.
                </p>

                <div className={`fade-in ${visible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
                  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl" data-testid="search-form">
                    <input id="branche-input" data-testid="branche-input" type="text"
                      placeholder="Branche — bijv. restaurant, kapper"
                      value={branche} onChange={(e) => setBranche(e.target.value)}
                      disabled={loading} required
                      className="flex-1 h-14 px-5 bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 rounded-2xl transition-colors" />
                    <input id="stad-input" data-testid="stad-input" type="text"
                      placeholder="Stad — bijv. Amsterdam"
                      value={stad} onChange={(e) => setStad(e.target.value)}
                      disabled={loading} required
                      className="flex-1 h-14 px-5 bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 rounded-2xl transition-colors" />
                    <button type="submit" disabled={loading || !branche.trim() || !stad.trim()}
                      data-testid="search-button"
                      className="h-14 px-8 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 whitespace-nowrap">
                      {loading ? <><span className="spinner-sm" /> Zoeken...</> : <><Search size={15} /> Zoeken</>}
                    </button>
                  </form>
                </div>

                <div className={`flex flex-wrap items-center gap-3 mt-6 fade-in ${visible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.45s" }}>
                  {["Google Places API", "CSV Export", "Lead Opslaan", "Social Links", "KVK Lookup"].map(f => (
                    <span key={f} className="px-3 py-1.5 bg-white/80 border border-gray-200 rounded-full text-xs text-gray-600">{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right logo */}
            <div className="hidden lg:flex absolute right-0 top-0 h-full items-center pointer-events-none logo-right">
              <img src={LOGO_URL} alt="" aria-hidden="true" className="w-full h-auto object-contain" style={{ mixBlendMode: "multiply", opacity: 0.1 }} />
            </div>
            {!searched && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
                <ChevronDown size={20} />
              </div>
            )}
          </section>

          {/* Results */}
          {(searched || loading) && (
            <section className="relative z-10 bg-white border-t border-gray-100 py-16" data-testid="results-section">
              <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                {error && (
                  <div className="mb-8 flex items-center gap-3 px-6 py-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm" data-testid="error-banner">{error}</div>
                )}
                {loading && (
                  <div data-testid="loading-state">
                    <div className="mb-10">
                      <div className="h-10 w-48 bg-gray-100 rounded-full animate-pulse mb-3" />
                      <div className="h-4 w-80 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-2xl">
                          <div className="h-4 w-1/4 bg-gray-200 rounded-full animate-pulse" />
                          <div className="h-4 w-1/3 bg-gray-100 rounded-full animate-pulse" />
                          <div className="h-4 w-1/5 bg-gray-100 rounded-full animate-pulse" />
                          <div className="h-4 w-1/6 bg-gray-100 rounded-full animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {!loading && results && (
                  <>
                    <div className="flex items-start justify-between mb-10 gap-4 flex-wrap" data-testid="results-header">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Resultaten</p>
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tighter" data-testid="results-title">
                          {leads.length > 0 ? <>{leads.length} <span className="text-gray-400">leads</span></> : <span className="text-gray-400">Geen leads</span>}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                          {leads.length > 0
                            ? `Uit ${totaal} bedrijven bij "${branche}" in ${stad} hebben ${leads.length} geen website.`
                            : `Alle ${totaal} gevonden bedrijven hebben al een website.`}
                        </p>
                      </div>
                      {leads.length > 0 && (
                        <button onClick={() => exportToCSV(leads.map(l => ({ ...l, branche, stad })), branche, stad)}
                          data-testid="export-csv-button"
                          className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors">
                          <Download size={14} /> Exporteer CSV
                        </button>
                      )}
                    </div>

                    {leads.length > 0 ? (
                      <div className="rounded-3xl overflow-hidden border border-gray-200" data-testid="leads-table">
                        {/* Header */}
                        <div className="grid grid-cols-12 gap-2 px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <div className="col-span-3 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Bedrijfsnaam</div>
                          <div className="col-span-3 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Adres</div>
                          <div className="col-span-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Telefoon</div>
                          <div className="col-span-4 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Acties</div>
                        </div>
                        {leads.map((lead, idx) => {
                          const isSaved = savedIds.has(lead.place_id);
                          const isSaving = savingId === lead.place_id;
                          return (
                            <div key={lead.place_id || idx} data-testid={`lead-row-${idx}`}
                              className="grid grid-cols-12 gap-2 px-6 py-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0">
                              <div className="col-span-3 font-bold text-gray-900 text-sm" data-testid={`lead-naam-${idx}`}>{lead.naam}</div>
                              <div className="col-span-3 text-sm text-gray-500 flex items-start gap-1" data-testid={`lead-adres-${idx}`}>
                                <MapPin size={12} className="text-gray-300 mt-0.5 flex-shrink-0" />
                                <span className="leading-tight text-xs">{lead.adres}</span>
                              </div>
                              <div className="col-span-2 text-sm text-gray-500 flex items-center gap-1" data-testid={`lead-telefoon-${idx}`}>
                                {lead.telefoonnummer ? (
                                  <a href={`tel:${lead.telefoonnummer}`} className="flex items-center gap-1 text-xs hover:text-gray-900 transition-colors">
                                    <Phone size={12} className="text-gray-300 flex-shrink-0" />{lead.telefoonnummer}
                                  </a>
                                ) : <span className="text-gray-300 text-xs">—</span>}
                              </div>
                              <div className="col-span-4 flex items-center gap-1.5 flex-wrap" data-testid={`lead-action-${idx}`}>
                                <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer"
                                  data-testid={`lead-maps-link-${idx}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors">
                                  <ExternalLink size={10} /> Maps
                                </a>
                                <a href={kvkLink(lead.naam, stad)} target="_blank" rel="noopener noreferrer"
                                  data-testid={`lead-kvk-${idx}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-medium rounded-full transition-colors">
                                  <Building2 size={10} /> KVK
                                </a>
                                <a href={fbLink(lead.naam, stad)} target="_blank" rel="noopener noreferrer"
                                  data-testid={`lead-fb-${idx}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-full transition-colors">
                                  <Facebook size={10} /> FB
                                </a>
                                <a href={igLink(lead.naam, stad)} target="_blank" rel="noopener noreferrer"
                                  data-testid={`lead-ig-${idx}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-medium rounded-full transition-colors">
                                  <Instagram size={10} /> IG
                                </a>
                                <button onClick={() => !isSaved && handleSaveLead(lead)}
                                  disabled={isSaved || isSaving}
                                  data-testid={`lead-save-${idx}`}
                                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                                    isSaved ? "bg-green-50 text-green-700 cursor-default" : "bg-gray-900 text-white hover:bg-gray-700"
                                  }`}>
                                  {isSaving ? <span className="spinner-xs" /> : isSaved ? <><BookmarkCheck size={10} /> Opgeslagen</> : <><Bookmark size={10} /> Opslaan</>}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-200" data-testid="empty-state">
                        <div className="text-gray-300 mb-4"><Search size={40} strokeWidth={1} /></div>
                        <p className="text-xl font-black tracking-tighter text-gray-500 mb-2">Geen leads gevonden</p>
                        <p className="text-sm text-gray-400">Alle bedrijven hebben al een website. Probeer een andere branche of stad.</p>
                      </div>
                    )}

                    {/* Laad meer + Deel rapport */}
                    {(nextPageToken || leads.length > 0) && (
                      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          {nextPageToken && (
                            <button onClick={handleLoadMore} disabled={loadingMore}
                              data-testid="load-more-button"
                              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:border-gray-500 disabled:opacity-50 transition-colors">
                              {loadingMore ? <><span className="spinner-xs-dark" /> Laden...</> : <><RefreshCw size={13} /> Laad meer resultaten</>}
                            </button>
                          )}
                        </div>
                        {leads.length > 0 && (
                          <div className="flex flex-col items-end gap-2">
                            <button onClick={handleCreateShare} disabled={shareLoading}
                              data-testid="share-report-button"
                              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:border-gray-500 transition-colors">
                              {shareLoading ? <span className="spinner-xs-dark" /> : <ExternalLink size={13} />}
                              Deel Rapport
                            </button>
                            {shareUrl && (
                              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-2 text-xs text-green-700" data-testid="share-url">
                                <span>Link gekopieerd:</span>
                                <a href={shareUrl} target="_blank" rel="noreferrer" className="font-mono underline truncate max-w-[200px]">{shareUrl}</a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          )}

          {!searched && !loading && (
            <section className="relative z-10 bg-white/60 py-16 border-t border-gray-100">
              <div className="max-w-[1800px] mx-auto px-6 lg:px-12 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-10">Hoe het werkt</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    { n: "01", t: "Voer in", d: "Typ een branche (bijv. restaurant) en een stad." },
                    { n: "02", t: "Wij zoeken", d: "We doorzoeken Google Maps voor bedrijven zonder website." },
                    { n: "03", t: "Bel & Sluit", d: "Sla leads op, check Facebook/Instagram, exporteer als CSV." },
                  ].map((s) => (
                    <div key={s.n} className="bg-white rounded-3xl border border-gray-200 p-8 hover:bg-gray-50 transition-colors">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">{s.n}</p>
                      <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── MIJN LEADS TAB ── */}
      {tab === "leads" && (
        <section className="pt-24 pb-16 min-h-screen" data-testid="leads-section">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Opgeslagen</p>
              <div className="flex items-end justify-between flex-wrap gap-4">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">
                  Mijn Leads <span className="text-gray-400">{savedLeads.length}</span>
                </h2>
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Filter */}
                  <div className="flex items-center gap-1">
                    {["Alle", ...STATUS_OPTIONS].map(s => (
                      <button key={s} onClick={() => setFilterStatus(s)}
                        data-testid={`filter-${s.replace(" ", "-")}`}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterStatus === s ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {savedLeads.length > 0 && (
                    <button onClick={() => exportToCSV(savedLeads, "", "")}
                      data-testid="export-saved-csv"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors">
                      <Download size={13} /> CSV
                    </button>
                  )}
                  {savedLeads.length > 0 && (
                    <button onClick={handleCreateShare} disabled={shareLoading}
                      data-testid="share-leads-button"
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:border-gray-500 transition-colors">
                      <ExternalLink size={13} /> Deel
                    </button>
                  )}
                  <button onClick={loadSavedLeads} className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
            </div>

            {leadsLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-2xl animate-pulse" />)}
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-200" data-testid="no-saved-leads">
                <Bookmark size={40} strokeWidth={1} className="text-gray-300 mx-auto mb-4" />
                <p className="text-xl font-black tracking-tighter text-gray-500 mb-2">Nog geen leads opgeslagen</p>
                <p className="text-sm text-gray-400">Zoek bedrijven en sla ze op via de Zoeken tab.</p>
                <button onClick={() => setTab("zoeken")} className="mt-6 px-6 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-700 transition-colors">
                  Ga Zoeken
                </button>
              </div>
            ) : (
              <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-2 px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="col-span-3 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Bedrijf</div>
                  <div className="col-span-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Telefoon</div>
                  <div className="col-span-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Status</div>
                  <div className="col-span-3 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Notitie</div>
                  <div className="col-span-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Acties</div>
                </div>
                {filteredLeads.map((lead) => (
                  <div key={lead.id} data-testid={`saved-lead-${lead.id}`}
                    className="grid grid-cols-12 gap-2 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0 items-start">
                    <div className="col-span-3">
                      <p className="font-bold text-sm text-gray-900">{lead.naam}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{lead.branche} · {lead.stad}</p>
                    </div>
                    <div className="col-span-2 text-xs text-gray-500">
                      {lead.telefoonnummer ? (
                        <a href={`tel:${lead.telefoonnummer}`} className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                          <Phone size={11} className="text-gray-300" />{lead.telefoonnummer}
                        </a>
                      ) : <span className="text-gray-300">—</span>}
                    </div>
                    <div className="col-span-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        data-testid={`status-select-${lead.id}`}
                        className={`text-xs font-medium px-2 py-1 rounded-full border cursor-pointer bg-transparent ${STATUS_COLORS[lead.status] || "bg-gray-50 text-gray-700 border-gray-200"}`}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="col-span-3">
                      {editingNote === lead.id ? (
                        <div className="flex flex-col gap-1">
                          <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)}
                            className="text-xs p-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-gray-500 w-full"
                            rows={2} placeholder="Notitie..." />
                          <div className="flex gap-1">
                            <button onClick={() => handleSaveNote(lead.id)}
                              className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">Opslaan</button>
                            <button onClick={() => setEditingNote(null)}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">Annuleer</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => { setEditingNote(lead.id); setNoteText(lead.notitie || ""); }}
                          className="text-xs text-gray-400 hover:text-gray-700 text-left w-full truncate">
                          {lead.notitie || <span className="italic">Notitie toevoegen...</span>}
                        </button>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 flex-wrap">
                      <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full">
                        <ExternalLink size={10} /> Maps
                      </a>
                      <a href={fbLink(lead.naam, lead.stad)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs rounded-full">
                        <Facebook size={10} /> FB
                      </a>
                      <a href={igLink(lead.naam, lead.stad)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs rounded-full">
                        <Instagram size={10} /> IG
                      </a>
                      {sheetsStatus?.connected && (
                        <button onClick={() => handleAppendToSheets(lead.id)}
                          data-testid={`sheets-append-${lead.id}`}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs rounded-full">
                          <FileSpreadsheet size={10} /> Sheets
                        </button>
                      )}
                      <button onClick={() => handleDeleteLead(lead.id)}
                        data-testid={`delete-lead-${lead.id}`}
                        className="p-1 text-gray-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Share URL feedback in Mijn Leads */}
            {shareUrl && tab === "leads" && (
              <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 text-xs text-green-700" data-testid="share-url-leads">
                <span className="font-medium">Rapport link gekopieerd!</span>
                <a href={shareUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-xs">{shareUrl}</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── DASHBOARD TAB ── */}
      {tab === "dashboard" && (
        <section className="pt-24 pb-16 min-h-screen" data-testid="dashboard-section">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
            <div className="mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Overzicht</p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">Dashboard</h2>
            </div>

            {dashData ? (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Totaal opgeslagen", value: dashData.totaal_opgeslagen, color: "gray" },
                    { label: "Nieuw", value: dashData.status_verdeling?.Nieuw || 0, color: "blue" },
                    { label: "Gebeld", value: dashData.status_verdeling?.Gebeld || 0, color: "yellow" },
                    { label: "Klant geworden", value: dashData.status_verdeling?.["Klant geworden"] || 0, color: "green" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-3xl border border-gray-200 p-8" data-testid={`stat-${stat.label}`}>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">{stat.label}</p>
                      <p className="text-5xl font-black tracking-tighter">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Status breakdown */}
                  <div className="bg-white rounded-3xl border border-gray-200 p-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Status Verdeling</p>
                    <div className="space-y-4">
                      {Object.entries(dashData.status_verdeling || {}).map(([status, count]) => {
                        const total = dashData.totaal_opgeslagen || 1;
                        const pct = Math.round((count / total) * 100);
                        return (
                          <div key={status}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{status}</span>
                              <span className="text-sm font-bold">{count}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gray-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent searches */}
                  <div className="bg-white rounded-3xl border border-gray-200 p-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Recente Zoekopdrachten</p>
                    {dashData.recente_zoekopdrachten?.length > 0 ? (
                      <div className="space-y-3">
                        {dashData.recente_zoekopdrachten.map((s, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <span className="text-sm font-medium">{s.branche} — {s.stad}</span>
                            <span className="text-xs text-gray-400">{s.totaal} gevonden</span>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-sm text-gray-400">Nog geen zoekopdrachten.</p>}
                  </div>
                </div>

                {/* Google Sheets */}
                <div className="bg-white rounded-3xl border border-gray-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FileSpreadsheet size={20} className="text-green-600" />
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Google Sheets Integratie</p>
                    {sheetsStatus?.connected && (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Verbonden
                      </span>
                    )}
                  </div>

                  {!sheetsStatus?.configured ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                      <p className="text-sm font-medium text-yellow-800 mb-2">Google Sheets niet geconfigureerd</p>
                      <p className="text-xs text-yellow-700 mb-4">
                        Voeg <code className="bg-yellow-100 px-1 rounded">GOOGLE_SHEETS_CLIENT_ID</code>, <code className="bg-yellow-100 px-1 rounded">GOOGLE_SHEETS_CLIENT_SECRET</code> en <code className="bg-yellow-100 px-1 rounded">SHEETS_REDIRECT_URI</code> toe aan de backend .env.
                      </p>
                      <ol className="text-xs text-yellow-700 space-y-1 list-decimal list-inside">
                        <li>Ga naar <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="underline">console.cloud.google.com</a></li>
                        <li>Enable Google Sheets API</li>
                        <li>Maak OAuth 2.0 credentials (Web App)</li>
                        <li>Redirect URI: <code className="bg-yellow-100 px-1 rounded">{BACKEND_URL}/api/sheets/callback</code></li>
                        <li>Deel de Client ID en Secret met Yrvante</li>
                      </ol>
                    </div>
                  ) : !sheetsStatus?.connected ? (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-gray-500">Verbind je Google account om leads direct naar Sheets te sturen.</p>
                      <button onClick={handleSheetsLogin} data-testid="sheets-login-btn"
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-green-700 transition-colors w-fit">
                        <FileSpreadsheet size={14} /> Verbind met Google Sheets
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3 items-start">
                        <input
                          type="text"
                          value={sheetsSpreadsheetId}
                          onChange={(e) => setSheetsSpreadsheetId(e.target.value)}
                          placeholder="Google Spreadsheet ID (uit de URL)"
                          data-testid="spreadsheet-id-input"
                          className="flex-1 h-11 px-4 bg-gray-50 border border-gray-200 text-sm rounded-2xl focus:outline-none focus:border-gray-500"
                        />
                        <button onClick={handleSetSpreadsheet} data-testid="save-spreadsheet-btn"
                          className="h-11 px-5 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-gray-700 transition-colors whitespace-nowrap">
                          Spreadsheet opslaan
                        </button>
                        <button onClick={handleExportAllToSheets} data-testid="export-all-sheets-btn"
                          className="h-11 px-5 bg-green-600 text-white text-xs font-bold rounded-full hover:bg-green-700 transition-colors whitespace-nowrap">
                          Exporteer alle leads → Sheets
                        </button>
                      </div>
                      {sheetsMsg && <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-xl">{sheetsMsg}</p>}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-white border border-gray-200 rounded-3xl animate-pulse" />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-gray-100 py-8" data-testid="app-footer">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Yrvante" className="h-6 w-auto opacity-70" />
            <span className="text-xs text-gray-400">Yrvante Lead Finder</span>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Yrvante — Smart Web & Software</p>
          <a href="https://yrvante.com" target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-black transition-colors">yrvante.com →</a>
        </div>
      </footer>
    </div>
  );
}
