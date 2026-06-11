import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Wrench, LayoutDashboard, Users, ClipboardList, FileText, Send, Building, Bell, Search, UserCircle, Globe } from 'lucide-react';

export default function AppLayout({ role }) {
  const location = useLocation();

  const getLinks = () => {
    switch (role) {
      case 'Admin':
        return [
          { name: 'Overview', path: '/admin', icon: LayoutDashboard },
          { name: 'Service Requests', path: '/admin/requests', icon: ClipboardList },
          { name: 'Users', path: '/admin/users', icon: Users },
        ];
      case 'Manager':
        return [
          { name: 'Workflow', path: '/manager', icon: ClipboardList },
          { name: 'Staff', path: '/manager/staff', icon: Users },
        ];
      case 'Super Admin':
        return [
          { name: 'System Overview', path: '/superadmin', icon: Globe },
          { name: 'Global Settings', path: '/superadmin/settings', icon: Wrench },
          { name: 'Master Users', path: '/superadmin/users', icon: Users },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/" className="sidebar-logo">
          <Wrench size={28} />
          <span>Velorix</span>
        </Link>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase' }}>
          {role} Portal
        </div>
        <nav>
          {getLinks().map(link => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-hover)', padding: '8px 16px', borderRadius: 'var(--radius-full)', width: '300px' }}>
            <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
            <input type="text" placeholder="Search orders, customers..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color="var(--text-muted)" />
              <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <UserCircle size={32} color="var(--primary)" />
              <span style={{ fontWeight: 600, fontSize: '14px' }}>JD Admin</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
