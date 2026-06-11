import React from 'react';
import { DollarSign, Users, Building, Activity, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const revenueData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 60000 },
  { name: 'Mar', value: 55000 },
  { name: 'Apr', value: 80000 },
  { name: 'May', value: 110000 },
  { name: 'Jun', value: 124500 },
];

const branchData = [
  { name: 'Week 1', completed: 120, pending: 30 },
  { name: 'Week 2', completed: 150, pending: 40 },
  { name: 'Week 3', completed: 180, pending: 20 },
  { name: 'Week 4', completed: 140, pending: 50 },
];
const COLORS = ['#10b981', '#0ea5e9', '#f59e0b'];

export default function AdminDashboard() {
  const currencySymbol = localStorage.getItem('currencySymbol') || '$';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Company-Wide Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time metrics and operational insights for the entire company.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-card)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          {['1W', '1M', '3M', 'YTD'].map((t, i) => (
            <button key={t} className="btn" style={{ padding: '6px 16px', background: i === 1 ? 'var(--bg-hover)' : 'transparent', color: i === 1 ? 'var(--text-main)' : 'var(--text-muted)' }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { title: 'Total Revenue', value: `${currencySymbol}242.5k`, trend: '+12.5%', isUp: true, icon: DollarSign, color: 'var(--primary)' },
          { title: 'Active Technicians', value: '24', trend: '+2', isUp: true, icon: Users, color: 'var(--accent)' },
          { title: 'Service Efficiency', value: '94%', trend: '+4.1%', isUp: true, icon: Activity, color: 'var(--success)' },
          { title: 'Avg Turnaround', value: '4.2h', trend: '-2.4%', isUp: false, icon: Users, color: 'var(--warning)' }
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
            <h2 className="card-title">Revenue Trajectory</h2>
            <MoreVertical size={20} color="var(--text-muted)" />
          </div>
          <div className="card-body" style={{ height: '340px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickFormatter={v => `${currencySymbol}${v/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} formatter={(value) => [`${currencySymbol}${value}`, 'Revenue']} />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Service Volume</h2>
            <MoreVertical size={20} color="var(--text-muted)" />
          </div>
          <div className="card-body" style={{ height: '340px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'var(--bg-hover)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Bar name="Completed" dataKey="completed" fill="var(--primary)" barSize={8} radius={[4, 4, 0, 0]} />
                  <Bar name="Pending" dataKey="pending" fill="var(--warning)" barSize={8} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--primary)' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Completed Services</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--warning)' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Pending Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
