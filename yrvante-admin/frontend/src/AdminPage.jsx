'use client';
// pages/admin.jsx  OR  app/admin/page.jsx (Next.js App Router)
// Place this file in your Next.js project:
//   - Pages Router: pages/admin.jsx
//   - App Router:   app/admin/page.jsx  (keep 'use client' at top)

import { useState, useEffect, useCallback } from 'react';

// ── Constants ────────────────────────────────────────────────────────────────
const LOGO_URL =
  'https://customer-assets.emergentagent.com/job_prospect-scout-11/artifacts/1x2gzwkm_Yrvante%20logo%20transparant.PNG';
const API = '/api/admin';
const TOKEN_KEY = 'yrvante_admin_token';
const STATUS_OPTIONS = ['Nieuw', 'Gebeld', 'Offerte gestuurd', 'Klant geworden'];
const STATUS_COLORS = {
  Nieuw: { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  Gebeld: { bg: '#fefce8', color: '#a16207', border: '#fde68a' },
  'Offerte gestuurd': { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' },
  'Klant geworden': { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function exportToCSV(leads, branche, stad) {
  const header = ['Bedrijfsnaam', 'Adres', 'Telefoonnummer', 'Branche', 'Stad', 'Status', 'Google Maps'];
  const rows = leads.map((l) => [
    `"${(l.naam || '').replace(/"/g, '""')}"`,
    `"${(l.adres || '').replace(/"/g, '""')}"`,
    `"${(l.telefoonnummer || '').replace(/"/g, '""')}"`,
    `"${(l.branche || branche || '').replace(/"/g, '""')}"`,
    `"${(l.stad || stad || '').replace(/"/g, '""')}"`,
    `"${(l.status || '').replace(/"/g, '""')}"`,
    `"${(l.google_maps_url || '').replace(/"/g, '""')}"`,
  ]);
  const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads_${branche || 'export'}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function fbLink(naam, stad) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${naam} Facebook ${stad}`)}`;
}
function igLink(naam, stad) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${naam} Instagram ${stad}`)}`;
}
function kvkLink(naam, stad) {
  return `https://www.kvk.nl/zoeken/?q=${encodeURIComponent(naam)}&plaatsnaam=${encodeURIComponent(stad)}`;
}

// ── API fetch helper ──────────────────────────────────────────────────────────
async function apiFetch(path, options = {}, token = null) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Fout'), { status: res.status });
  return data;
}

// ── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      const data = await apiFetch('/auth', {
        method: 'POST',
        body: JSON.stringify({ password: pw }),
      });
      onLogin(data.token);
    } catch {
      setErr('Ongeldig wachtwoord. Probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <img src={LOGO_URL} alt="Yrvante" style={{ height: 40, marginBottom: 12 }} />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' }}>
            Admin — Lead Finder
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Wachtwoord"
            autoFocus
            required
            data-testid="admin-password-input"
            style={{
              height: 48, padding: '0 16px', border: '1px solid #e5e7eb', borderRadius: 12,
              fontSize: 14, outline: 'none', background: '#f9fafb', width: '100%', boxSizing: 'border-box',
            }}
          />
          {err && (
            <p style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '8px 12px' }}>
              {err}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !pw}
            data-testid="admin-login-btn"
            style={{
              height: 48, background: '#111827', color: '#fff', border: 'none', borderRadius: 24,
              fontWeight: 700, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
              cursor: loading || !pw ? 'not-allowed' : 'pointer', opacity: loading || !pw ? 0.5 : 1,
            }}
          >
            {loading ? 'Inloggen...' : 'Inloggen →'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState('zoeken');

  // Zoeken
  const [branche, setBranche] = useState('');
  const [stad, setStad] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [totaalGevonden, setTotaalGevonden] = useState(0);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [savingId, setSavingId] = useState(null);
  const [shareUrl, setShareUrl] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [autoSaveCount, setAutoSaveCount] = useState(0);

  // Leads
  const [savedLeads, setSavedLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Alle');
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Dashboard
  const [dashData, setDashData] = useState(null);
  const [sheetsStatus, setSheetsStatus] = useState(null);
  const [sheetsSpreadsheetId, setSheetsSpreadsheetId] = useState('');
  const [sheetsMsg, setSheetsMsg] = useState('');

  // ── Auth ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) setToken(t);
  }, []);

  // Check for Google Sheets callback params
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('sheets_connected')) {
      setSheetsMsg('Google Sheets succesvol verbonden!');
      setTab('dashboard');
      window.history.replaceState({}, '', '/admin');
    } else if (params.get('sheets_error')) {
      setSheetsMsg(`Sheets fout: ${params.get('sheets_error')}`);
      setTab('dashboard');
      window.history.replaceState({}, '', '/admin');
    }
  }, []);

  useEffect(() => {
    if (autoSave !== undefined) {
      localStorage.setItem('yrvante_autosave', String(autoSave));
    }
  }, [autoSave]);

  useEffect(() => {
    if (!token) return;
    apiFetch('/leads', {}, token)
      .then((data) => setSavedIds(new Set(data.map((l) => l.place_id))))
      .catch(() => {});
    const stored = localStorage.getItem('yrvante_autosave');
    if (stored !== null) setAutoSave(stored === 'true');
  }, [token]);

  const handleLogin = (t) => {
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  // ── Auto save ────────────────────────────────────────────────────────────────
  const autoSaveLeads = useCallback(
    async (leads) => {
      if (!leads.length || !token) return;
      let saved = 0;
      for (const lead of leads) {
        try {
          await apiFetch('/leads', { method: 'POST', body: JSON.stringify({ ...lead, branche, stad }) }, token);
          setSavedIds((prev) => new Set([...prev, lead.place_id]));
          saved++;
        } catch {}
      }
      if (saved > 0) setAutoSaveCount((prev) => prev + saved);
    },
    [branche, stad, token]
  );

  // ── Search ───────────────────────────────────────────────────────────────────
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!branche.trim() || !stad.trim()) return;
    setLoading(true);
    setError(null);
    setAllLeads([]);
    setNextPageToken(null);
    setSearched(true);
    setShareUrl(null);
    try {
      const data = await apiFetch('/zoek', { method: 'POST', body: JSON.stringify({ branche: branche.trim(), stad: stad.trim() }) }, token);
      setAllLeads(data.leads || []);
      setNextPageToken(data.next_page_token || null);
      setTotaalGevonden(data.totaal_gevonden || 0);
      if (autoSave && data.leads?.length) autoSaveLeads(data.leads);
    } catch (err) {
      setError(err.message || 'Er is een fout opgetreden.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await apiFetch(
        '/zoek',
        { method: 'POST', body: JSON.stringify({ branche: branche.trim(), stad: stad.trim(), page_token: nextPageToken }) },
        token
      );
      const newLeads = data.leads || [];
      setAllLeads((prev) => [...prev, ...newLeads]);
      setNextPageToken(data.next_page_token || null);
      setTotaalGevonden((prev) => prev + (data.totaal_gevonden || 0));
      if (autoSave && newLeads.length) autoSaveLeads(newLeads);
    } catch {
      setError('Fout bij laden van meer resultaten.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSaveLead = async (lead) => {
    setSavingId(lead.place_id);
    try {
      await apiFetch('/leads', { method: 'POST', body: JSON.stringify({ ...lead, branche, stad }) }, token);
      setSavedIds((prev) => new Set([...prev, lead.place_id]));
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSavingId(null);
    }
  };

  const handleCreateShare = async () => {
    setShareLoading(true);
    try {
      const data = await apiFetch('/share', { method: 'POST', body: JSON.stringify({ titel: `Leadoverzicht ${branche} ${stad}` }) }, token);
      const fullUrl = `${window.location.origin}/admin/share/${data.token}`;
      setShareUrl(fullUrl);
      await navigator.clipboard.writeText(fullUrl).catch(() => {});
    } catch (err) {
      console.error(err);
    } finally {
      setShareLoading(false);
    }
  };

  // ── Leads ────────────────────────────────────────────────────────────────────
  const loadSavedLeads = useCallback(async () => {
    if (!token) return;
    setLeadsLoading(true);
    try {
      const data = await apiFetch('/leads', {}, token);
      setSavedLeads(data);
    } catch {}
    finally { setLeadsLoading(false); }
  }, [token]);

  const handleUpdateStatus = async (leadId, status) => {
    try {
      const data = await apiFetch(`/lead?id=${leadId}`, { method: 'PUT', body: JSON.stringify({ status }) }, token);
      setSavedLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: data.status } : l)));
    } catch {}
  };

  const handleSaveNote = async (leadId) => {
    try {
      const data = await apiFetch(`/lead?id=${leadId}`, { method: 'PUT', body: JSON.stringify({ notitie: noteText }) }, token);
      setSavedLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, notitie: data.notitie } : l)));
      setEditingNote(null);
    } catch {}
  };

  const handleDeleteLead = async (leadId) => {
    try {
      await apiFetch(`/lead?id=${leadId}`, { method: 'DELETE' }, token);
      setSavedLeads((prev) => prev.filter((l) => l.id !== leadId));
    } catch {}
  };

  // ── Dashboard ────────────────────────────────────────────────────────────────
  const loadDashboard = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiFetch('/dashboard', {}, token);
      setDashData(data);
    } catch {}
  }, [token]);

  const loadSheetsStatus = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiFetch('/sheets-status', {}, token);
      setSheetsStatus(data);
      if (data.spreadsheet_id) setSheetsSpreadsheetId(data.spreadsheet_id);
    } catch {}
  }, [token]);

  useEffect(() => {
    if (!token) return;
    if (tab === 'leads') loadSavedLeads();
    if (tab === 'dashboard') { loadDashboard(); loadSheetsStatus(); }
  }, [tab, token, loadSavedLeads, loadDashboard, loadSheetsStatus]);

  // ── Sheets ───────────────────────────────────────────────────────────────────
  const handleSheetsLogin = async () => {
    try {
      const data = await apiFetch('/sheets-login', {}, token);
      window.open(data.auth_url, '_blank');
    } catch (err) {
      setSheetsMsg(err.message || 'Fout bij inloggen');
    }
  };

  const handleSetSpreadsheet = async () => {
    try {
      await apiFetch('/sheets-status', { method: 'POST', body: JSON.stringify({ spreadsheet_id: sheetsSpreadsheetId }) }, token);
      setSheetsMsg('Spreadsheet ID opgeslagen!');
      loadSheetsStatus();
    } catch {
      setSheetsMsg('Fout bij opslaan.');
    }
  };

  const handleExportAllToSheets = async () => {
    try {
      const data = await apiFetch('/sheets-append', { method: 'POST', body: JSON.stringify({ all: true }) }, token);
      setSheetsMsg(data.message);
    } catch (err) {
      setSheetsMsg(err.message || 'Sheets fout.');
    }
  };

  const handleAppendToSheets = async (leadId) => {
    try {
      const data = await apiFetch('/sheets-append', { method: 'POST', body: JSON.stringify({ lead_id: leadId }) }, token);
      setSheetsMsg(data.message);
    } catch (err) {
      setSheetsMsg(err.message || 'Sheets fout.');
    }
  };

  // ── Not logged in ─────────────────────────────────────────────────────────────
  if (!token) return <LoginScreen onLogin={handleLogin} />;

  const filteredLeads = filterStatus === 'Alle' ? savedLeads : savedLeads.filter((l) => l.status === filterStatus);

  // ── Styles ────────────────────────────────────────────────────────────────────
  const s = {
    root: { minHeight: '100vh', background: '#f9fafb', fontFamily: '"Playfair Display", Georgia, serif' },
    nav: {
      position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #f3f4f6', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
    },
    navLeft: { display: 'flex', alignItems: 'center', gap: 12 },
    navTabs: { display: 'flex', gap: 4 },
    tabBtn: (active) => ({
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 20,
      border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em',
      textTransform: 'uppercase', transition: 'all 0.15s',
      background: active ? '#111827' : 'transparent', color: active ? '#fff' : '#6b7280',
    }),
    page: { maxWidth: 1600, margin: '0 auto', padding: '32px 24px' },
    heading: { fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em', margin: 0 },
    subLabel: { fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 8 },
    card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24, padding: 32 },
    input: {
      height: 52, padding: '0 20px', border: '1px solid #e5e7eb', borderRadius: 16,
      fontSize: 14, outline: 'none', background: '#fff', flex: 1, minWidth: 0,
    },
    btnPrimary: {
      height: 52, padding: '0 28px', background: '#6b7280', color: '#fff', border: 'none',
      borderRadius: 26, fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
      cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 8,
    },
    btnOutline: {
      height: 40, padding: '0 20px', background: '#fff', color: '#374151', border: '1px solid #d1d5db',
      borderRadius: 20, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
    },
    pill: (active) => ({
      padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
      fontWeight: 600, fontSize: 11, letterSpacing: '0.05em',
      background: active ? '#111827' : '#f3f4f6', color: active ? '#fff' : '#6b7280',
    }),
    tableHeader: {
      display: 'grid', gridTemplateColumns: '3fr 3fr 2fr 4fr', gap: 8, padding: '12px 24px',
      background: '#f9fafb', borderBottom: '1px solid #e5e7eb', borderRadius: '20px 20px 0 0',
    },
    tableRow: {
      display: 'grid', gridTemplateColumns: '3fr 3fr 2fr 4fr', gap: 8,
      padding: '16px 24px', borderBottom: '1px solid #f3f4f6', background: '#fff',
      alignItems: 'center',
    },
    tLabel: { fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' },
  };

  return (
    <div style={s.root} data-testid="admin-root">
      {/* Nav */}
      <nav style={s.nav} data-testid="admin-nav">
        <div style={s.navLeft}>
          <img src={LOGO_URL} alt="Yrvante" style={{ height: 32 }} />
          <span style={{ fontWeight: 700, fontSize: 13 }}>Yrvante</span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Lead Finder</span>
        </div>
        <div style={s.navTabs}>
          {[
            { id: 'zoeken', label: 'Zoeken' },
            { id: 'leads', label: 'Mijn Leads' },
            { id: 'dashboard', label: 'Dashboard' },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={s.tabBtn(tab === t.id)} data-testid={`tab-${t.id}`}>
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={handleLogout} style={{ ...s.btnOutline, height: 36 }} data-testid="logout-btn">
          Uitloggen
        </button>
      </nav>

      {/* ── ZOEKEN TAB ──────────────────────────────────────────────────────── */}
      {tab === 'zoeken' && (
        <div style={s.page} data-testid="search-tab">
          {/* Hero */}
          <div style={{ paddingTop: 48, paddingBottom: 48 }}>
            <p style={s.subLabel}>Intern tool — Yrvante</p>
            <h1 style={{ ...s.heading, fontSize: 56, marginBottom: 16 }}>
              VIND BEDRIJVEN<br />
              <span style={{ color: '#9ca3af' }}>ZONDER WEBSITE.</span>
            </h1>
            <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
              Vul een branche en stad in — de tool filtert automatisch wie nog geen online aanwezigheid heeft. Klaar om te bellen.
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 780 }} data-testid="search-form">
              <input
                data-testid="branche-input"
                type="text"
                placeholder="Branche — bijv. restaurant, kapper"
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
                required
                disabled={loading}
                style={s.input}
              />
              <input
                data-testid="stad-input"
                type="text"
                placeholder="Stad — bijv. Amsterdam"
                value={stad}
                onChange={(e) => setStad(e.target.value)}
                required
                disabled={loading}
                style={{ ...s.input, maxWidth: 240 }}
              />
              <button type="submit" disabled={loading || !branche.trim() || !stad.trim()} data-testid="search-btn" style={{ ...s.btnPrimary, opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Zoeken...' : 'Zoeken →'}
              </button>
            </form>

            {/* Chips */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              {['Google Places API', 'CSV Export', 'Lead Opslaan', 'Social Links', 'KVK Lookup'].map((f) => (
                <span key={f} style={{ padding: '6px 14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, fontSize: 12, color: '#6b7280' }}>
                  {f}
                </span>
              ))}
              <button
                onClick={() => { const n = !autoSave; setAutoSave(n); }}
                data-testid="autosave-toggle"
                style={{
                  padding: '6px 14px', borderRadius: 20, border: autoSave ? '1px solid #86efac' : '1px solid #e5e7eb',
                  background: autoSave ? '#f0fdf4' : '#fff', fontSize: 12,
                  color: autoSave ? '#15803d' : '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: autoSave ? '#22c55e' : '#d1d5db' }} />
                Auto-opslaan {autoSave ? 'aan' : 'uit'}
                {autoSave && autoSaveCount > 0 && (
                  <span style={{ background: '#22c55e', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>
                    {autoSaveCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginBottom: 24, padding: '12px 20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 16, color: '#dc2626', fontSize: 14 }} data-testid="error-banner">
              {error}
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div data-testid="loading-state" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ height: 60, background: '#f3f4f6', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
          )}

          {/* Results */}
          {!loading && searched && allLeads.length > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }} data-testid="results-header">
                <div>
                  <p style={s.subLabel}>Resultaten</p>
                  <h2 style={{ ...s.heading, fontSize: 40 }}>
                    {allLeads.length} <span style={{ color: '#9ca3af' }}>leads</span>
                  </h2>
                  <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                    Uit {totaalGevonden} bedrijven bij &ldquo;{branche}&rdquo; in {stad} hebben {allLeads.length} geen website.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {autoSave && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 20, fontSize: 12, color: '#15803d' }} data-testid="autosave-banner">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                      Auto-opslaan actief
                    </span>
                  )}
                  <button onClick={() => exportToCSV(allLeads.map((l) => ({ ...l, branche, stad })), branche, stad)} data-testid="export-csv-btn" style={s.btnPrimary}>
                    Exporteer CSV
                  </button>
                </div>
              </div>

              {/* Table */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: 20, overflow: 'hidden' }} data-testid="leads-table">
                <div style={s.tableHeader}>
                  <span style={s.tLabel}>Bedrijfsnaam</span>
                  <span style={s.tLabel}>Adres</span>
                  <span style={s.tLabel}>Telefoon</span>
                  <span style={s.tLabel}>Acties</span>
                </div>
                {allLeads.map((lead, idx) => {
                  const isSaved = savedIds.has(lead.place_id);
                  const isSaving = savingId === lead.place_id;
                  return (
                    <div key={lead.place_id || idx} data-testid={`lead-row-${idx}`} style={{ ...s.tableRow, background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{lead.naam}</span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>{lead.adres}</span>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>
                        {lead.telefoonnummer ? (
                          <a href={`tel:${lead.telefoonnummer}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lead.telefoonnummer}</a>
                        ) : '—'}
                      </span>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                        <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" data-testid={`lead-maps-${idx}`}
                          style={{ padding: '4px 10px', background: '#f3f4f6', borderRadius: 10, fontSize: 11, fontWeight: 600, color: '#374151', textDecoration: 'none' }}>
                          Maps
                        </a>
                        <a href={kvkLink(lead.naam, stad)} target="_blank" rel="noopener noreferrer" data-testid={`lead-kvk-${idx}`}
                          style={{ padding: '4px 10px', background: '#fff7ed', borderRadius: 10, fontSize: 11, fontWeight: 600, color: '#c2410c', textDecoration: 'none' }}>
                          KVK
                        </a>
                        <a href={fbLink(lead.naam, stad)} target="_blank" rel="noopener noreferrer" data-testid={`lead-fb-${idx}`}
                          style={{ padding: '4px 10px', background: '#eff6ff', borderRadius: 10, fontSize: 11, fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>
                          FB
                        </a>
                        <a href={igLink(lead.naam, stad)} target="_blank" rel="noopener noreferrer" data-testid={`lead-ig-${idx}`}
                          style={{ padding: '4px 10px', background: '#fdf2f8', borderRadius: 10, fontSize: 11, fontWeight: 600, color: '#9d174d', textDecoration: 'none' }}>
                          IG
                        </a>
                        <button
                          onClick={() => !isSaved && handleSaveLead(lead)}
                          disabled={isSaved || isSaving}
                          data-testid={`lead-save-${idx}`}
                          style={{
                            padding: '4px 12px', borderRadius: 10, border: 'none', fontSize: 11, fontWeight: 700,
                            cursor: isSaved ? 'default' : 'pointer',
                            background: isSaved ? '#f0fdf4' : '#111827',
                            color: isSaved ? '#15803d' : '#fff',
                          }}
                        >
                          {isSaving ? '...' : isSaved ? 'Opgeslagen' : 'Opslaan'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load more + Share */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  {nextPageToken && (
                    <button onClick={handleLoadMore} disabled={loadingMore} data-testid="load-more-btn" style={s.btnOutline}>
                      {loadingMore ? 'Laden...' : 'Laad meer resultaten'}
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <button onClick={handleCreateShare} disabled={shareLoading} data-testid="share-report-btn" style={s.btnOutline}>
                    {shareLoading ? 'Bezig...' : 'Deel Rapport'}
                  </button>
                  {shareUrl && (
                    <div style={{ padding: '8px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, fontSize: 12, color: '#15803d' }} data-testid="share-url">
                      Link: <a href={shareUrl} target="_blank" rel="noreferrer" style={{ color: '#15803d', fontFamily: 'monospace' }}>{shareUrl}</a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* No results */}
          {!loading && searched && allLeads.length === 0 && !error && (
            <div style={{ textAlign: 'center', padding: '80px 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24 }} data-testid="empty-state">
              <p style={{ fontSize: 20, fontWeight: 900, color: '#6b7280', marginBottom: 8 }}>Geen leads gevonden</p>
              <p style={{ fontSize: 14, color: '#9ca3af' }}>Alle bedrijven hebben al een website. Probeer een andere branche of stad.</p>
            </div>
          )}
        </div>
      )}

      {/* ── MIJN LEADS TAB ──────────────────────────────────────────────────── */}
      {tab === 'leads' && (
        <div style={s.page} data-testid="leads-tab">
          <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={s.subLabel}>Opgeslagen</p>
              <h2 style={{ ...s.heading, fontSize: 40 }}>
                Mijn Leads <span style={{ color: '#9ca3af' }}>{savedLeads.length}</span>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {['Alle', ...STATUS_OPTIONS].map((s_) => (
                <button key={s_} onClick={() => setFilterStatus(s_)} style={s.pill(filterStatus === s_)} data-testid={`filter-${s_.replace(' ', '-')}`}>
                  {s_}
                </button>
              ))}
              {savedLeads.length > 0 && (
                <>
                  <button onClick={() => exportToCSV(savedLeads, '', '')} data-testid="export-saved-csv" style={s.btnOutline}>CSV</button>
                  <button onClick={handleCreateShare} disabled={shareLoading} data-testid="share-leads-btn" style={s.btnOutline}>Deel</button>
                </>
              )}
            </div>
          </div>

          {leadsLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...Array(4)].map((_, i) => <div key={i} style={{ height: 64, background: '#f3f4f6', borderRadius: 16 }} />)}
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24 }} data-testid="no-saved-leads">
              <p style={{ fontSize: 20, fontWeight: 900, color: '#6b7280', marginBottom: 8 }}>Nog geen leads opgeslagen</p>
              <p style={{ fontSize: 14, color: '#9ca3af' }}>Zoek bedrijven en sla ze op via de Zoeken tab.</p>
              <button onClick={() => setTab('zoeken')} style={{ ...s.btnPrimary, marginTop: 24 }}>Ga Zoeken</button>
            </div>
          ) : (
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 2fr 3fr 2fr', gap: 8, padding: '12px 24px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Bedrijf', 'Telefoon', 'Status', 'Notitie', 'Acties'].map((h) => <span key={h} style={s.tLabel}>{h}</span>)}
              </div>
              {filteredLeads.map((lead, idx) => (
                <div
                  key={lead.id}
                  data-testid={`saved-lead-${lead.id}`}
                  style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 2fr 3fr 2fr', gap: 8, padding: '14px 24px', borderBottom: '1px solid #f3f4f6', background: idx % 2 === 0 ? '#fff' : '#fafafa', alignItems: 'start' }}
                >
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{lead.naam}</p>
                    <p style={{ fontSize: 11, color: '#9ca3af', margin: '2px 0 0' }}>{lead.branche} · {lead.stad}</p>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    {lead.telefoonnummer ? (
                      <a href={`tel:${lead.telefoonnummer}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lead.telefoonnummer}</a>
                    ) : '—'}
                  </div>
                  <div>
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                      data-testid={`status-select-${lead.id}`}
                      style={{
                        fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 10, cursor: 'pointer',
                        border: `1px solid ${STATUS_COLORS[lead.status]?.border || '#e5e7eb'}`,
                        background: STATUS_COLORS[lead.status]?.bg || '#f9fafb',
                        color: STATUS_COLORS[lead.status]?.color || '#374151',
                      }}
                    >
                      {STATUS_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    {editingNote === lead.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          rows={2}
                          placeholder="Notitie..."
                          style={{ fontSize: 12, padding: 8, border: '1px solid #e5e7eb', borderRadius: 8, resize: 'vertical', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                        />
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => handleSaveNote(lead.id)} style={{ padding: '3px 10px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                            Opslaan
                          </button>
                          <button onClick={() => setEditingNote(null)} style={{ padding: '3px 10px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontSize: 11, cursor: 'pointer' }}>
                            Annuleer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditingNote(lead.id); setNoteText(lead.notitie || ''); }}
                        style={{ fontSize: 12, color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                      >
                        {lead.notitie || <em>Notitie toevoegen...</em>}
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer"
                      style={{ padding: '4px 8px', background: '#f3f4f6', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#374151', textDecoration: 'none' }}>
                      Maps
                    </a>
                    <a href={fbLink(lead.naam, lead.stad)} target="_blank" rel="noopener noreferrer"
                      style={{ padding: '4px 8px', background: '#eff6ff', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>
                      FB
                    </a>
                    <a href={igLink(lead.naam, lead.stad)} target="_blank" rel="noopener noreferrer"
                      style={{ padding: '4px 8px', background: '#fdf2f8', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#9d174d', textDecoration: 'none' }}>
                      IG
                    </a>
                    {sheetsStatus?.connected && (
                      <button onClick={() => handleAppendToSheets(lead.id)} data-testid={`sheets-btn-${lead.id}`}
                        style={{ padding: '4px 8px', background: '#f0fdf4', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#15803d', cursor: 'pointer' }}>
                        Sheets
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      data-testid={`delete-lead-${lead.id}`}
                      style={{ padding: '4px 8px', background: 'none', border: 'none', fontSize: 11, color: '#d1d5db', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {shareUrl && (
            <div style={{ marginTop: 16, padding: '10px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, fontSize: 12, color: '#15803d' }} data-testid="share-url-leads">
              Rapport link: <a href={shareUrl} target="_blank" rel="noreferrer" style={{ color: '#15803d' }}>{shareUrl}</a>
            </div>
          )}
        </div>
      )}

      {/* ── DASHBOARD TAB ───────────────────────────────────────────────────── */}
      {tab === 'dashboard' && (
        <div style={s.page} data-testid="dashboard-tab">
          <div style={{ marginBottom: 32 }}>
            <p style={s.subLabel}>Overzicht</p>
            <h2 style={{ ...s.heading, fontSize: 40 }}>Dashboard</h2>
          </div>

          {dashData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { label: 'Totaal opgeslagen', value: dashData.totaal_opgeslagen },
                  { label: 'Nieuw', value: dashData.status_verdeling?.Nieuw || 0 },
                  { label: 'Gebeld', value: dashData.status_verdeling?.Gebeld || 0 },
                  { label: 'Klant geworden', value: dashData.status_verdeling?.['Klant geworden'] || 0 },
                ].map((stat) => (
                  <div key={stat.label} style={s.card} data-testid={`stat-card`}>
                    <p style={s.subLabel}>{stat.label}</p>
                    <p style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Status breakdown */}
                <div style={s.card}>
                  <p style={s.subLabel}>Status Verdeling</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {Object.entries(dashData.status_verdeling || {}).map(([status, count]) => {
                      const total = dashData.totaal_opgeslagen || 1;
                      const pct = Math.round(((count) / total) * 100);
                      return (
                        <div key={status}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                            <span style={{ fontWeight: 600 }}>{status}</span>
                            <span style={{ fontWeight: 700 }}>{count}</span>
                          </div>
                          <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: '#9ca3af', borderRadius: 4, width: `${pct}%`, transition: 'width 0.5s' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent searches */}
                <div style={s.card}>
                  <p style={s.subLabel}>Recente Zoekopdrachten</p>
                  {dashData.recente_zoekopdrachten?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {dashData.recente_zoekopdrachten.map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < dashData.recente_zoekopdrachten.length - 1 ? '1px solid #f3f4f6' : 'none', fontSize: 13 }}>
                          <span style={{ fontWeight: 600 }}>{r.branche} — {r.stad}</span>
                          <span style={{ color: '#9ca3af' }}>{r.totaal} gevonden</span>
                        </div>
                      ))}
                    </div>
                  ) : <p style={{ fontSize: 13, color: '#9ca3af' }}>Nog geen zoekopdrachten.</p>}
                </div>
              </div>

              {/* Google Sheets */}
              <div style={s.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <p style={{ ...s.subLabel, margin: 0 }}>Google Sheets Integratie</p>
                  {sheetsStatus?.connected && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 20, fontSize: 11, color: '#15803d' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> Verbonden
                    </span>
                  )}
                </div>

                {!sheetsStatus?.configured ? (
                  <div style={{ padding: 20, background: '#fefce8', border: '1px solid #fde68a', borderRadius: 16 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#92400e', marginBottom: 8 }}>Google Sheets niet geconfigureerd</p>
                    <p style={{ fontSize: 13, color: '#92400e' }}>
                      Voeg <code>GOOGLE_SHEETS_CLIENT_ID</code>, <code>GOOGLE_SHEETS_CLIENT_SECRET</code> en{' '}
                      <code>SHEETS_REDIRECT_URI</code> toe aan je Vercel environment variables.
                    </p>
                  </div>
                ) : !sheetsStatus?.connected ? (
                  <div>
                    <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>Verbind je Google account om leads direct naar Sheets te sturen.</p>
                    <button onClick={handleSheetsLogin} data-testid="sheets-login-btn"
                      style={{ ...s.btnPrimary, background: '#16a34a' }}>
                      Verbind met Google Sheets
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        value={sheetsSpreadsheetId}
                        onChange={(e) => setSheetsSpreadsheetId(e.target.value)}
                        placeholder="Google Spreadsheet ID (uit de URL)"
                        data-testid="spreadsheet-id-input"
                        style={{ ...s.input, height: 44, maxWidth: 360 }}
                      />
                      <button onClick={handleSetSpreadsheet} data-testid="save-spreadsheet-btn" style={{ ...s.btnPrimary, height: 44 }}>
                        Opslaan
                      </button>
                      <button onClick={handleExportAllToSheets} data-testid="export-all-sheets-btn" style={{ ...s.btnPrimary, height: 44, background: '#16a34a' }}>
                        Exporteer alle leads
                      </button>
                    </div>
                    {sheetsMsg && (
                      <div style={{ padding: '10px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, fontSize: 13, color: '#15803d' }}>
                        {sheetsMsg}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[...Array(4)].map((_, i) => <div key={i} style={{ height: 120, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24 }} />)}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e7eb', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={LOGO_URL} alt="Yrvante" style={{ height: 24, opacity: 0.6 }} />
          <span style={{ fontSize: 12, color: '#9ca3af' }}>Yrvante Lead Finder</span>
        </div>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>© {new Date().getFullYear()} Yrvante — Smart Web & Software</span>
        <a href="https://yrvante.com" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'none' }}>
          yrvante.com →
        </a>
      </footer>
    </div>
  );
}
