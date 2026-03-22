import { useState } from "react";
import "@/App.css";
import axios from "axios";
import { Search, Download, MapPin, Phone, ExternalLink, AlertCircle } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Yrvante Logo SVG
const YrvanteLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Yrvante logo">
    <circle cx="20" cy="20" r="19" stroke="#111827" strokeWidth="2" fill="none" />
    <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="#111827">&lt;/&gt;</text>
  </svg>
);

// CSV export helper
function exportToCSV(leads, branche, stad) {
  const header = ["Bedrijfsnaam", "Adres", "Telefoonnummer", "Google Maps Link"];
  const rows = leads.map((l) => [
    `"${(l.naam || "").replace(/"/g, '""')}"`,
    `"${(l.adres || "").replace(/"/g, '""')}"`,
    `"${(l.telefoonnummer || "").replace(/"/g, '""')}"`,
    `"${(l.google_maps_url || "").replace(/"/g, '""')}"`,
  ]);
  const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `leads_${branche}_${stad}_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [branche, setBranche] = useState("");
  const [stad, setStad] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

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
      const msg = err.response?.data?.detail || "Er is een fout opgetreden. Probeer opnieuw.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const leads = results?.leads || [];
  const totaal = results?.totaal_gevonden || 0;

  return (
    <div className="app-root">
      {/* Header */}
      <header className="app-header" data-testid="app-header">
        <div className="header-inner">
          <div className="brand">
            <YrvanteLogo />
            <span className="brand-name">Yrvante</span>
          </div>
          <span className="brand-tagline">Lead Finder</span>
        </div>
      </header>

      <main className="main-content">
        {/* Hero / Search Section */}
        <section className="search-section" data-testid="search-section">
          <div className="search-hero">
            <h1 className="hero-title">Vind bedrijven<br />zonder website</h1>
            <p className="hero-sub">
              Voer een branche en stad in. Wij zoeken welke bedrijven nog geen online aanwezigheid hebben.
            </p>

            <form className="search-form" onSubmit={handleSearch} data-testid="search-form">
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="branche-input" className="input-label">Branche</label>
                  <input
                    id="branche-input"
                    data-testid="branche-input"
                    type="text"
                    placeholder="bijv. restaurant, loodgieter, kapper"
                    value={branche}
                    onChange={(e) => setBranche(e.target.value)}
                    className="search-input"
                    disabled={loading}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="stad-input" className="input-label">Stad</label>
                  <input
                    id="stad-input"
                    data-testid="stad-input"
                    type="text"
                    placeholder="bijv. Amsterdam, Rotterdam, Utrecht"
                    value={stad}
                    onChange={(e) => setStad(e.target.value)}
                    className="search-input"
                    disabled={loading}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="search-btn"
                  data-testid="search-button"
                  disabled={loading || !branche.trim() || !stad.trim()}
                >
                  {loading ? (
                    <span className="btn-inner">
                      <span className="spinner" />
                      Zoeken...
                    </span>
                  ) : (
                    <span className="btn-inner">
                      <Search size={18} />
                      Zoeken
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <section className="results-section" data-testid="results-section">

          {/* Error State */}
          {error && (
            <div className="error-banner" data-testid="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="loading-state" data-testid="loading-state">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-row">
                  <div className="skeleton skeleton-name" />
                  <div className="skeleton skeleton-address" />
                  <div className="skeleton skeleton-phone" />
                  <div className="skeleton skeleton-action" />
                </div>
              ))}
            </div>
          )}

          {/* Results Table */}
          {!loading && results && (
            <>
              <div className="results-header" data-testid="results-header">
                <div className="results-meta">
                  <h2 className="results-title">
                    {leads.length > 0
                      ? `${leads.length} lead${leads.length !== 1 ? "s" : ""} gevonden`
                      : "Geen leads gevonden"}
                  </h2>
                  <p className="results-sub">
                    {leads.length > 0
                      ? `Uit ${totaal} bedrijven in "${branche}" – ${stad} hebben ${leads.length} geen website.`
                      : `Alle ${totaal} gevonden bedrijven bij "${branche}" in ${stad} hebben al een website.`}
                  </p>
                </div>
                {leads.length > 0 && (
                  <button
                    className="export-btn"
                    data-testid="export-csv-button"
                    onClick={() => exportToCSV(leads, branche, stad)}
                  >
                    <Download size={16} />
                    Exporteer CSV
                  </button>
                )}
              </div>

              {leads.length > 0 ? (
                <div className="table-wrapper" data-testid="leads-table">
                  <table className="leads-table">
                    <thead>
                      <tr>
                        <th data-testid="col-naam">Bedrijfsnaam</th>
                        <th data-testid="col-adres">Adres</th>
                        <th data-testid="col-telefoon">Telefoonnummer</th>
                        <th data-testid="col-actie">Actie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead, idx) => (
                        <tr key={lead.place_id || idx} data-testid={`lead-row-${idx}`} className="lead-row">
                          <td className="cell-naam" data-testid={`lead-naam-${idx}`}>
                            {lead.naam}
                          </td>
                          <td className="cell-adres" data-testid={`lead-adres-${idx}`}>
                            <span className="adres-inner">
                              <MapPin size={14} className="icon-muted" />
                              {lead.adres}
                            </span>
                          </td>
                          <td className="cell-phone" data-testid={`lead-telefoon-${idx}`}>
                            {lead.telefoonnummer ? (
                              <span className="phone-inner">
                                <Phone size={14} className="icon-muted" />
                                {lead.telefoonnummer}
                              </span>
                            ) : (
                              <span className="no-data">—</span>
                            )}
                          </td>
                          <td className="cell-action" data-testid={`lead-action-${idx}`}>
                            <a
                              href={lead.google_maps_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="maps-link"
                              data-testid={`lead-maps-link-${idx}`}
                            >
                              <ExternalLink size={14} />
                              Google Maps
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state" data-testid="empty-state">
                  <div className="empty-icon">
                    <Search size={32} strokeWidth={1.5} />
                  </div>
                  <p className="empty-title">Geen leads in deze categorie</p>
                  <p className="empty-sub">Probeer een andere branche of stad.</p>
                </div>
              )}
            </>
          )}

          {/* Initial State */}
          {!loading && !searched && !error && (
            <div className="initial-state" data-testid="initial-state">
              <div className="initial-icon">
                <Search size={28} strokeWidth={1.5} />
              </div>
              <p className="initial-text">Vul een branche en stad in om te starten.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer" data-testid="app-footer">
        <span>© {new Date().getFullYear()} Yrvante — Lead Finder</span>
      </footer>
    </div>
  );
}
