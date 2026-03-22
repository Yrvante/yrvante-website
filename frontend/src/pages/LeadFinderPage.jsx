import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Search, Phone, MapPin, ExternalLink, Save, Trash2, Edit2, Check, X, 
  Download, ChevronDown, BarChart3, Users, Lock, ArrowLeft, Loader2, RefreshCw
} from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';
const API = `${API_BASE}/api/admin/leadfinder`;

const statusColors = {
  'nieuw': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  'gebeld': { bg: 'rgba(234, 179, 8, 0.15)', text: '#facc15', border: 'rgba(234, 179, 8, 0.3)' },
  'offerte': { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
  'klant': { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
  'afgewezen': { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' }
};

const s = {
  container: { minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' },
  nav: { position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  navInner: { maxWidth: 1400, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  tabs: { display: 'flex', gap: 8 },
  tab: { padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', border: 'none' },
  tabActive: { background: '#fff', color: '#000' },
  tabInactive: { background: 'transparent', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' },
  main: { maxWidth: 1400, margin: '0 auto', padding: '32px 24px' },
  card: { background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', padding: 24 },
  input: { width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 15, outline: 'none' },
  button: { padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', border: 'none' },
  buttonPrimary: { background: '#fff', color: '#000', border: 'none' },
  buttonSecondary: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' },
  heading: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 },
  label: { fontSize: 13, color: '#9ca3af', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' },
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
        toast.success('Welkom bij Lead Finder!');
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

  if (!isAuthenticated) {
    return (
      <div style={{...s.container, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Toaster position="top-right" theme="dark" />
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{width:'100%',maxWidth:400,padding:24}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <Lock size={48} style={{color:'#9ca3af',marginBottom:16}} />
            <h1 style={{...s.heading,fontSize:28,marginBottom:8}}>Lead Finder</h1>
            <p style={{color:'#9ca3af',fontSize:14}}>Voer het wachtwoord in</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Wachtwoord" style={{...s.input,marginBottom:16}} autoFocus />
            {authError && <p style={{color:'#f87171',fontSize:14,marginBottom:16}}>{authError}</p>}
            <button type="submit" style={{...s.button,...s.buttonPrimary,width:'100%'}}>Inloggen</button>
          </form>
          <div style={{textAlign:'center',marginTop:24}}>
            <a href="/" style={{color:'#9ca3af',fontSize:14,textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}><ArrowLeft size={14} />Terug naar home</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <Toaster position="top-right" theme="dark" />
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <h1 style={{...s.heading,fontSize:20}}>Lead Finder</h1>
            <span style={{fontSize:12,color:'#6b7280',background:'rgba(255,255,255,0.05)',padding:'4px 8px',borderRadius:4}}>by Yrvante</span>
          </div>
          <div style={s.tabs}>
            {['zoeken','leads','dashboard'].map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{...s.tab,...(activeTab===tab?s.tabActive:s.tabInactive)}}>
                {tab==='zoeken'&&<Search size={16}/>}{tab==='leads'&&<Users size={16}/>}{tab==='dashboard'&&<BarChart3 size={16}/>}
                <span style={{marginLeft:6,textTransform:'capitalize'}}>{tab}</span>
              </button>
            ))}
          </div>
          <button onClick={logout} style={{...s.button,...s.buttonSecondary,padding:'8px 16px'}}>Uitloggen</button>
        </div>
      </nav>

      <main style={s.main}>
        <AnimatePresence mode="wait">
          {activeTab==='zoeken'&&(
            <motion.div key="zoeken" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <div style={{textAlign:'center',marginBottom:48}}>
                <h2 style={{...s.heading,fontSize:48,marginBottom:16,lineHeight:0.9}}>
                  <span style={{display:'block'}}>VIND</span><span style={{display:'block'}}>BEDRIJVEN</span>
                  <span style={{display:'block',color:'#6b7280'}}>ZONDER</span><span style={{display:'block',color:'#6b7280'}}>WEBSITE.</span>
                </h2>
              </div>
              <div style={{...s.card,maxWidth:600,margin:'0 auto 32px'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                  <div><label style={s.label}>Branche</label><input value={branche} onChange={e=>setBranche(e.target.value)} placeholder="kapper, restaurant..." style={s.input}/></div>
                  <div><label style={s.label}>Stad</label><input value={stad} onChange={e=>setStad(e.target.value)} placeholder="Amsterdam..." style={s.input}/></div>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                    <input type="checkbox" checked={autoSave} onChange={e=>setAutoSave(e.target.checked)} style={{width:18,height:18}}/>
                    <span style={{fontSize:14,color:'#9ca3af'}}>Auto-opslaan</span>
                  </label>
                  <button onClick={()=>zoekBedrijven(false)} disabled={loading} style={{...s.button,...s.buttonPrimary}}>
                    {loading?<Loader2 size={18} className="animate-spin"/>:<Search size={18}/>}Zoeken
                  </button>
                </div>
              </div>
              {zoekResultaten.length>0&&(
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
                    <p style={{color:'#9ca3af'}}>{totaalGevonden} resultaten</p>
                    <button onClick={exportCSV} style={{...s.button,...s.buttonSecondary,padding:'8px 16px'}}><Download size={16}/>CSV</button>
                  </div>
                  <div style={{display:'grid',gap:12}}>
                    {zoekResultaten.map((lead,i)=>(
                      <div key={lead.place_id||i} style={s.card}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          <div>
                            <h3 style={{fontWeight:600,fontSize:18,marginBottom:8}}>{lead.naam}</h3>
                            <p style={{color:'#9ca3af',fontSize:14,display:'flex',alignItems:'center',gap:6}}><MapPin size={14}/>{lead.adres}</p>
                            {lead.telefoonnummer&&<a href={`tel:${lead.telefoonnummer}`} style={{color:'#60a5fa',fontSize:14,display:'flex',alignItems:'center',gap:6,marginTop:4}}><Phone size={14}/>{lead.telefoonnummer}</a>}
                          </div>
                          <div style={{display:'flex',gap:8}}>
                            <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" style={{...s.button,...s.buttonSecondary,padding:'8px 12px'}}><ExternalLink size={16}/></a>
                            <button onClick={()=>saveLead(lead)} style={{...s.button,...s.buttonPrimary,padding:'8px 12px'}}><Save size={16}/></button>
                          </div>
                        </div>
                        <div style={{display:'flex',gap:8,marginTop:12,paddingTop:12,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                          <a href={`https://www.kvk.nl/zoeken/?q=${encodeURIComponent(lead.naam)}`} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:'#9ca3af',textDecoration:'none'}}>KVK →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam+' '+stad+' facebook')}`} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:'#9ca3af',textDecoration:'none'}}>Facebook →</a>
                          <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.naam+' '+stad+' instagram')}`} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:'#9ca3af',textDecoration:'none'}}>Instagram →</a>
                        </div>
                      </div>
                    ))}
                  </div>
                  {nextPageToken&&<div style={{textAlign:'center',marginTop:24}}><button onClick={()=>zoekBedrijven(true)} disabled={loading} style={{...s.button,...s.buttonSecondary}}>{loading?<Loader2 size={18}/>:<ChevronDown size={18}/>}Laad meer</button></div>}
                </div>
              )}
            </motion.div>
          )}

          {activeTab==='leads'&&(
            <motion.div key="leads" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}>
                <h2 style={{...s.heading,fontSize:24}}>Opgeslagen Leads ({opgeslagenLeads.length})</h2>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={exportCSV} style={{...s.button,...s.buttonSecondary,padding:'8px 16px'}}><Download size={16}/>CSV</button>
                  <button onClick={loadLeads} style={{...s.button,...s.buttonSecondary,padding:'8px 16px'}}><RefreshCw size={16}/></button>
                </div>
              </div>
              {opgeslagenLeads.length===0?(
                <div style={{...s.card,textAlign:'center',padding:48}}><Users size={48} style={{color:'#6b7280',marginBottom:16}}/><p style={{color:'#9ca3af'}}>Nog geen leads</p></div>
              ):(
                <div style={{display:'grid',gap:12}}>
                  {opgeslagenLeads.map(lead=>(
                    <div key={lead.id} style={s.card}>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div style={{flex:1}}>
                          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                            <h3 style={{fontWeight:600,fontSize:18}}>{lead.naam}</h3>
                            <select value={lead.status||'nieuw'} onChange={e=>updateLeadStatus(lead.id,e.target.value)} style={{padding:'4px 8px',borderRadius:6,fontSize:12,border:`1px solid ${statusColors[lead.status||'nieuw'].border}`,background:statusColors[lead.status||'nieuw'].bg,color:statusColors[lead.status||'nieuw'].text,cursor:'pointer'}}>
                              <option value="nieuw">Nieuw</option><option value="gebeld">Gebeld</option><option value="offerte">Offerte</option><option value="klant">Klant</option><option value="afgewezen">Afgewezen</option>
                            </select>
                          </div>
                          <p style={{color:'#9ca3af',fontSize:14,display:'flex',alignItems:'center',gap:6}}><MapPin size={14}/>{lead.adres}</p>
                          {lead.telefoonnummer&&<a href={`tel:${lead.telefoonnummer}`} style={{color:'#60a5fa',fontSize:14,display:'flex',alignItems:'center',gap:6,marginTop:4}}><Phone size={14}/>{lead.telefoonnummer}</a>}
                          <div style={{marginTop:12}}>
                            {editingLead===lead.id?(
                              <div style={{display:'flex',gap:8}}>
                                <input value={editNotitie} onChange={e=>setEditNotitie(e.target.value)} placeholder="Notitie..." style={{...s.input,padding:'8px 12px',fontSize:13}} autoFocus/>
                                <button onClick={()=>updateLeadNotitie(lead.id)} style={{...s.button,...s.buttonPrimary,padding:'8px 12px'}}><Check size={16}/></button>
                                <button onClick={()=>setEditingLead(null)} style={{...s.button,...s.buttonSecondary,padding:'8px 12px'}}><X size={16}/></button>
                              </div>
                            ):(
                              <div onClick={()=>{setEditingLead(lead.id);setEditNotitie(lead.notitie||'')}} style={{fontSize:13,color:lead.notitie?'#d1d5db':'#6b7280',cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
                                <Edit2 size={12}/>{lead.notitie||'Klik voor notitie...'}
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{display:'flex',gap:8}}>
                          <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" style={{...s.button,...s.buttonSecondary,padding:'8px 12px'}}><ExternalLink size={16}/></a>
                          <button onClick={()=>deleteLead(lead.id)} style={{...s.button,padding:'8px 12px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',color:'#f87171'}}><Trash2 size={16}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab==='dashboard'&&(
            <motion.div key="dashboard" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <h2 style={{...s.heading,fontSize:24,marginBottom:24}}>Dashboard</h2>
              {dashboardData&&(
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:32}}>
                  <div style={s.card}><p style={{color:'#9ca3af',fontSize:12,textTransform:'uppercase',marginBottom:8}}>Totaal Leads</p><p style={{...s.heading,fontSize:36}}>{dashboardData.totaal_leads}</p></div>
                  {Object.entries(dashboardData.status_verdeling||{}).map(([status,count])=>(
                    <div key={status} style={s.card}><p style={{color:'#9ca3af',fontSize:12,textTransform:'uppercase',marginBottom:8}}>{status}</p><p style={{...s.heading,fontSize:36,color:statusColors[status]?.text||'#fff'}}>{count}</p></div>
                  ))}
                </div>
              )}
              {dashboardData?.recente_zoekopdrachten?.length>0&&(
                <div style={s.card}><h3 style={{fontWeight:600,marginBottom:16}}>Recente Zoekopdrachten</h3>
                  {dashboardData.recente_zoekopdrachten.slice(0,5).map((z,i)=>(
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}><span>{z.branche} in {z.stad}</span><span style={{color:'#9ca3af'}}>{z.totaal} resultaten</span></div>
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
