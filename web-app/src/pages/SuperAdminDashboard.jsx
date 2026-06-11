import React from 'react';
import { DollarSign, Users, Building, Globe, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const globalRevenueData = [
  { name: 'Jan', value: 340000 },
  { name: 'Feb', value: 410000 },
  { name: 'Mar', value: 380000 },
  { name: 'Apr', value: 520000 },
  { name: 'May', value: 680000 },
  { name: 'Jun', value: 750000 },
];

const branchesPerformanceData = [
  { name: 'New York', revenue: 124500, users: 1200 },
  { name: 'London', revenue: 98000, users: 850 },
  { name: 'Tokyo', revenue: 156000, users: 1400 },
  { name: 'Berlin', revenue: 82000, users: 650 },
];

export default function SuperAdminDashboard() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Global System Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Enterprise-wide metrics, system health, and cross-branch analytics.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-card)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          {['1W', '1M', '3M', 'YTD'].map((t, i) => (
            <button key={t} className="btn" style={{ padding: '6px 16px', background: i === 3 ? 'var(--bg-hover)' : 'transparent', color: i === 3 ? 'var(--text-main)' : 'var(--text-muted)' }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { title: 'Total Revenue', value: '$2.8M', trend: '+15.2%', isUp: true, icon: DollarSign, color: 'var(--primary)' },
          { title: 'Global Users', value: '45,280', trend: '+5.4%', isUp: true, icon: Users, color: 'var(--accent)' },
          { title: 'Active Branches', value: '14', trend: '+1', isUp: true, icon: Building, color: 'var(--success)' },
          { title: 'System Uptime', value: '99.99%', trend: '-0.01%', isUp: false, icon: Globe, color: 'var(--warning)' }
        ].map((m, i) => (
          <div key={i} className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <m.icon color={m.color} size={24} />
              </div>
              <div className={`badge ${m.isUp ? 'badge-success' : 'badge-danger'}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {m.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {m.trend}
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '4px', letterSpacing: '-1px' }}>{m.value}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{m.title}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Global Revenue Trajectory</h2>
            <MoreVertical size={20} color="var(--text-muted)" />
          </div>
          <div className="card-body" style={{ height: '340px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={globalRevenueData}>
                <defs>
                  <linearGradient id="colorValueGlobal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValueGlobal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Top Branches</h2>
            <MoreVertical size={20} color="var(--text-muted)" />
          </div>
          <div className="card-body" style={{ height: '340px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchesPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'var(--bg-hover)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Bar name="Revenue" dataKey="revenue" fill="var(--primary)" barSize={12} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
