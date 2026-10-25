import { useState } from 'react';
import type { AppScreen, UserRole } from '../types';

const roles: { name: UserRole; description: string; icon: string }[] = [
  { name: 'Admin', description: 'Full access to all modules (Management Level)', icon: '♛' },
  { name: 'Sales Head', description: 'Manage team, leads and projects', icon: '♟' },
  { name: 'Regional Manager', description: 'Monitor regional sales and projects', icon: '◉' },
  { name: 'Sales Manager', description: 'Manage sales activities and team', icon: '●' },
  { name: 'Sales Representative', description: 'Create and manage leads', icon: '▥' },
  { name: 'Channel Partner', description: 'Partner management and sales', icon: '⇄' },
  { name: 'Customer', description: 'View projects, quotes and track status', icon: '♟' },
];

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [role, setRole] = useState<UserRole>('Admin');
  const [identity, setIdentity] = useState('');
  const [segment, setSegment] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [bill, setBill] = useState(2500);
  const [area, setArea] = useState(400);
  const [offset, setOffset] = useState(90);
  const [estimate, setEstimate] = useState(false);

  function go(next: AppScreen) {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <main className="app-shell">
    {screen === 'welcome' && <section className="welcome screen">
      <div className="hero-sun" aria-hidden="true" />
      <header className="brand brand-on-photo"><div className="brand-mark">☀</div><div className="brand-name"><span>Gen</span>Solar<sup>®</sup></div><p>Powering a Greener Tomorrow</p></header>
      <div className="welcome-copy"><h1>Clean Energy<br />Brighter Future</h1><div className="value-row"><span>♧<small>Solar Solutions</small></span><span>⚙<small>Engineering</small></span><span>▥<small>Business Growth</small></span></div></div>
      <div className="welcome-bottom"><button className="btn btn-primary arrow" onClick={() => go('login')}>Login <span>→</span></button><button className="btn btn-outline" onClick={() => go('calculator')}>Explore GenSolar <span>↗</span></button><div className="benefit-row"><span>ϟ<small>Save Electricity<br />Cost</small></span><span>❧<small>Go Green</small></span><span>⬟<small>Reliable<br />Support</small></span></div></div>
    </section>}

    {screen === 'login' && <section className="screen login-screen">
      <header className="brand"><div className="brand-mark">☀</div><div className="brand-name"><span>Gen</span>Solar<sup>®</sup></div><p>Powering a Greener Tomorrow</p></header>
      <div className="login-card"><button className="back-link" onClick={() => go('welcome')}>← Back</button><h1>Login to GenSolar</h1><p>Enter your mobile number, email or Employee ID to continue</p><label htmlFor="identity">Mobile Number / Email ID / Employee ID</label><input id="identity" value={identity} onChange={e => setIdentity(e.target.value)} placeholder="Enter your details" autoComplete="username" /><button className="btn btn-primary arrow" disabled={!identity.trim()} onClick={() => go('roles')}>Continue <span>→</span></button><div className="divider"><span>or</span></div><button className="btn google-btn" onClick={() => alert('Google sign-in must be connected to the project Firebase provider before it can authenticate users. Use Continue to preview the next screen.')}>🌐 Continue with Google</button></div>
      <div className="feature-row">{[['▦','Project Estimator'],['♟','Lead Management'],['⚙','Engineering Tools'],['▥','Reports & Analytics']].map(([icon,label])=><div key={label}><i>{icon}</i><span>{label}</span></div>)}</div><footer>Solar Energy for a Sustainable Tomorrow</footer>
    </section>}

    {screen === 'roles' && <section className="screen roles-screen"><button className="back-corner" onClick={() => go('login')} aria-label="Back">←</button><h1>Select Your Role</h1><p className="screen-subtitle">Choose your designation to access<br />the relevant features</p><div className="role-list">{roles.map(item=><button className={'role-card '+(role === item.name ? 'selected' : '')} key={item.name} onClick={() => setRole(item.name)} aria-pressed={role === item.name}><span className="role-icon">{item.icon}</span><span className="role-copy"><b>{item.name}</b><small>{item.description}</small></span><span className="radio">{role === item.name ? '●' : ''}</span></button>)}</div><button className="btn btn-primary arrow role-next" onClick={() => go('calculator')}>Next <span>→</span></button></section>}

    {screen === 'calculator' && <section className="screen calculator-screen"><button className="back-link" onClick={() => go('welcome')}>← Back to GenSolar</button><header className="calculator-heading"><div className="brand-name"><span>Gen</span>Solar</div><p>Solar savings estimator</p><h1>What will solar cost, and what will it save?</h1><p>Choose your site details to estimate a rooftop solar system.</p></header><div className="calculator-card"><div className="segment-tabs">{(['Residential','Commercial','Industrial'] as const).map(s=><button key={s} className={segment===s?'active':''} onClick={()=>{setSegment(s);setEstimate(false)}}>{s}</button>)}</div><label htmlFor="monthly-bill">Average monthly electricity bill (₹)</label><input id="monthly-bill" type="number" min="0" value={bill} onChange={e=>{setBill(Math.max(0,Number(e.target.value)));setEstimate(false)}}/><label htmlFor="roof-area">Shadow-free roof area (sq ft)</label><input id="roof-area" type="number" min="0" value={area} onChange={e=>{setArea(Math.max(0,Number(e.target.value)));setEstimate(false)}}/><label htmlFor="offset">Share of usage to cover with solar <b>{offset}%</b></label><input id="offset" type="range" min="50" max="100" step="5" value={offset} onChange={e=>{setOffset(Number(e.target.value));setEstimate(false)}}/><button className="btn btn-primary" onClick={()=>setEstimate(true)}>Calculate estimate</button>{estimate && <div className="estimate-result" role="status"><h2>Indicative estimate</h2><p>Customer segment: <b>{segment}</b></p><p>Target monthly bill offset: <b>₹{Math.round(bill*offset/100).toLocaleString('en-IN')}</b></p><p>Roof area entered: <b>{area.toLocaleString('en-IN')} sq ft</b></p><small>This starter estimate is an input summary, not an engineering quote. Final capacity, costs, subsidy eligibility and payback require verified tariff, site and equipment data.</small></div>}</div></section>}
  </main>;
}
