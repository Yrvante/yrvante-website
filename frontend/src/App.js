import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { Search, Download, MapPin, Phone, ExternalLink, ChevronDown } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = "https://customer-assets.emergentagent.com/job_prospect-scout-11/artifacts/1x2gzwkm_Yrvante%20logo%20transparant.PNG";
const BG_URL = "https://images.unsplash.com/photo-1659282278213-b7eeed9b790b?crop=entropy&cs=srgb&fm=jpg&q=85";

function exportToCSV(leads, branche, stad) {
  const header = ["Bedrijfsnaam", "Adres", "Telefoonnummer", "Google Maps Link"];
  const rows = leads.map((l) => [
    `"${(l.naam || "").replace(/"/g, '""')}"`,
    `"${(l.adres || "").replace(/"/g, '""')}"`,
    `"${(l.telefoonnummer || "").replace(/"/g, '""')}"`,
    `"${(l.google_maps_url || "").replace(/"/g, '""')}"`,
  ]);
  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${branche}_${stad}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [branche, setBranche] = useState("");
  const [stad, setStad] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!branche.trim() || !stad.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    setSearched(true);
    try {
      const res = await axios.post(`${API}/zoek`, { branche: branche.trim(), stad: stad.trim() });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Er is een fout opgetreden. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  const leads = results?.leads || [];
  const totaal = results?.totaal_gevonden || 0;

  return (
    <div className="min-h-screen relative overflow-x-hidden" data-testid="app-root">

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-layer" />
      <div className="fixed inset-0 -z-10 bg-overlay pointer-events-none" />

      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100" data-testid="app-header">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Yrvante" className="h-8 w-auto" />
            <span className="text-sm font-bold tracking-tight">Yrvante</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="https://yrvante.com" target="_blank" rel="noreferrer" className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors">Diensten</a>
            <a href="https://yrvante.com" target="_blank" rel="noreferrer" className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors">Over</a>
            <a href="https://yrvante.com" target="_blank" rel="noreferrer" className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors">Contact</a>
          </div>
          <a href="https://yrvante.com" target="_blank" rel="noreferrer"
            className="px-5 py-2.5 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors">
            Start Project <span className="ml-1">→</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-16 relative overflow-hidden" data-testid="search-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center relative">

            {/* Badge */}
            <div className={`mb-6 fade-in ${visible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-400 transition-all text-sm badge-glow">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-gray-600 text-xs">Lead Finder — Powered by Yrvante</span>
              </button>
            </div>

            {/* Pre-title */}
            <p
              className={`text-sm font-medium uppercase tracking-[0.25em] text-gray-600 mb-4 fade-in ${visible ? "fade-in-visible" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              Alles wat je nodig hebt om te groeien
            </p>

            {/* Hero Title */}
            <h1
              className={`text-[13vw] lg:text-[8vw] font-black leading-[0.92] tracking-tighter mb-8 fade-in ${visible ? "fade-in-visible" : ""}`}
              style={{ transitionDelay: "0.3s" }}
              data-testid="hero-title"
            >
              <span className="flex flex-col">
                <span>VIND LEADS</span>
                <span className="text-gray-400">ZONDER WEBSITE</span>
              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-sm lg:text-base text-gray-500 max-w-lg leading-relaxed mb-6 fade-in ${visible ? "fade-in-visible" : ""}`}
              style={{ transitionDelay: "0.35s" }}
            >
              Voer een branche en stad in. Wij zoeken welke bedrijven nog geen online aanwezigheid hebben — dat zijn jouw potentiële klanten.
            </p>

            {/* Search Form */}
            <div
              className={`fade-in ${visible ? "fade-in-visible" : ""}`}
              style={{ transitionDelay: "0.4s" }}
            >
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl" data-testid="search-form">
                <input
                  id="branche-input"
                  data-testid="branche-input"
                  type="text"
                  placeholder="Branche — bijv. restaurant, kapper"
                  value={branche}
                  onChange={(e) => setBranche(e.target.value)}
                  disabled={loading}
                  required
                  className="flex-1 h-14 px-5 bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 rounded-2xl transition-colors"
                />
                <input
                  id="stad-input"
                  data-testid="stad-input"
                  type="text"
                  placeholder="Stad — bijv. Amsterdam"
                  value={stad}
                  onChange={(e) => setStad(e.target.value)}
                  disabled={loading}
                  required
                  className="flex-1 h-14 px-5 bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 rounded-2xl transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading || !branche.trim() || !stad.trim()}
                  data-testid="search-button"
                  className="h-14 px-8 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <><span className="spinner-sm" /> Zoeken...</>
                  ) : (
                    <><Search size={15} /> Zoeken</>
                  )}
                </button>
              </form>
            </div>

            {/* Stats */}
            <div
              className={`flex items-center gap-3 mt-6 fade-in ${visible ? "fade-in-visible" : ""}`}
              style={{ transitionDelay: "0.45s" }}
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 border border-gray-200 rounded-full text-xs font-bold text-gray-700">
                <span>Google Places</span> <span className="text-gray-400 font-normal">API</span>
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 border border-gray-200 rounded-full text-xs font-bold text-gray-700">
                <span>CSV</span> <span className="text-gray-400 font-normal">Export</span>
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 border border-gray-200 rounded-full text-xs font-bold text-gray-700">
                <span>NL</span> <span className="text-gray-400 font-normal">Gebaseerd</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Yrvante Logo */}
        <div className="hidden lg:flex absolute right-0 top-0 h-full items-center pointer-events-none logo-right">
          <img
            src={LOGO_URL}
            alt="Yrvante"
            aria-hidden="true"
            className="w-full h-auto object-contain"
            style={{ mixBlendMode: "multiply", opacity: 0.12 }}
          />
        </div>

        {/* Scroll hint */}
        {!searched && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
            <ChevronDown size={20} />
          </div>
        )}
      </section>

      {/* Results Section */}
      {(searched || loading) && (
        <section className="relative z-10 bg-white border-t border-gray-100 min-h-screen py-16" data-testid="results-section">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

            {/* Error */}
            {error && (
              <div className="mb-8 flex items-center gap-3 px-6 py-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm" data-testid="error-banner">
                {error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div data-testid="loading-state">
                <div className="mb-10">
                  <div className="h-10 w-48 bg-gray-100 rounded-full animate-pulse mb-3" />
                  <div className="h-4 w-80 bg-gray-50 rounded-full animate-pulse" />
                </div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                      <div className="h-4 w-1/4 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-4 w-1/3 bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-4 w-1/6 bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-4 w-1/8 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {!loading && results && (
              <>
                {/* Results header */}
                <div className="flex items-start justify-between mb-10 gap-4 flex-wrap" data-testid="results-header">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Resultaten</p>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tighter" data-testid="results-title">
                      {leads.length > 0 ? (
                        <>{leads.length} <span className="text-gray-400">leads gevonden</span></>
                      ) : (
                        <span className="text-gray-400">Geen leads</span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      {leads.length > 0
                        ? `Uit ${totaal} bedrijven bij "${branche}" in ${stad} hebben ${leads.length} geen website.`
                        : `Alle ${totaal} gevonden bedrijven bij "${branche}" in ${stad} hebben al een website.`}
                    </p>
                  </div>
                  {leads.length > 0 && (
                    <button
                      onClick={() => exportToCSV(leads, branche, stad)}
                      data-testid="export-csv-button"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-600 transition-colors"
                    >
                      <Download size={14} />
                      Exporteer CSV
                    </button>
                  )}
                </div>

                {leads.length > 0 ? (
                  <div className="space-y-0 rounded-3xl overflow-hidden border border-gray-200" data-testid="leads-table">
                    {/* Table header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <div className="col-span-3 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium" data-testid="col-naam">Bedrijfsnaam</div>
                      <div className="col-span-4 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium" data-testid="col-adres">Adres</div>
                      <div className="col-span-3 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium" data-testid="col-telefoon">Telefoonnummer</div>
                      <div className="col-span-2 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium" data-testid="col-actie">Actie</div>
                    </div>
                    {/* Rows */}
                    {leads.map((lead, idx) => (
                      <div
                        key={lead.place_id || idx}
                        data-testid={`lead-row-${idx}`}
                        className="grid grid-cols-12 gap-4 px-6 py-5 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
                      >
                        <div className="col-span-3 font-bold text-gray-900 text-sm truncate" data-testid={`lead-naam-${idx}`}>
                          {lead.naam}
                        </div>
                        <div className="col-span-4 text-sm text-gray-500 flex items-start gap-1.5" data-testid={`lead-adres-${idx}`}>
                          <MapPin size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{lead.adres}</span>
                        </div>
                        <div className="col-span-3 text-sm text-gray-500 flex items-center gap-1.5" data-testid={`lead-telefoon-${idx}`}>
                          {lead.telefoonnummer ? (
                            <><Phone size={13} className="text-gray-300 flex-shrink-0" />{lead.telefoonnummer}</>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </div>
                        <div className="col-span-2" data-testid={`lead-action-${idx}`}>
                          <a
                            href={lead.google_maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`lead-maps-link-${idx}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors"
                          >
                            <ExternalLink size={11} />
                            Maps
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-200" data-testid="empty-state">
                    <div className="text-gray-300 mb-4"><Search size={40} strokeWidth={1} /></div>
                    <p className="text-xl font-black tracking-tighter text-gray-500 mb-2">Geen leads gevonden</p>
                    <p className="text-sm text-gray-400">Alle bedrijven in deze categorie hebben al een website. Probeer een andere branche of stad.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Initial state */}
      {!searched && !loading && (
        <section className="relative z-10 bg-white/50 py-16 border-t border-gray-100" data-testid="initial-state">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Hoe het werkt</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-3xl mx-auto">
              {[
                { n: "01", t: "Voer in", d: "Typ een branche (bijv. restaurant) en een stad." },
                { n: "02", t: "Wij zoeken", d: "We doorzoeken Google Maps voor bedrijven zonder website." },
                { n: "03", t: "Exporteer", d: "Download jouw leadlijst als CSV en begin te bellen." },
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
