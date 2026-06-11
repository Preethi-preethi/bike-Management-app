import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Wrench, LayoutDashboard, ClipboardList, Receipt, History, LogOut, Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AppLayout() {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Service Requests', path: '/requests', icon: ClipboardList },
    { name: 'Bill Generation', path: '/billing', icon: Receipt },
    { name: 'Service History', path: '/history', icon: History },
  ];

  return (
    <div className="app-layout">
      {/* Glassmorphic Sidebar */}
      <div className="sidebar glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--google-blue)', color: 'white', padding: '8px', borderRadius: 'var(--radius-md)' }}>
            <Wrench size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.5px' }}>Velorix</h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Manager Portal</span>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {links.map(link => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path} className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={signOut}
          className="nav-item" 
          style={{ marginTop: 'auto', background: 'transparent', border: 'none', width: '100%', cursor: 'pointer', color: 'var(--google-red)' }}
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation */}
        <div className="top-nav glass-panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>{links.find(l => l.path === location.pathname)?.name || 'Portal'}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} color="var(--text-muted)" />
              <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: 'var(--google-red)', borderRadius: '50%' }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>{user?.email}</div>
                <div style={{ fontSize: '12px', color: 'var(--google-green)', fontWeight: 600 }}>● Online</div>
              </div>
              <UserCircle size={32} color="var(--google-blue)" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-container glass-panel" style={{ borderRadius: 'var(--radius-xl)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
