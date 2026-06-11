import React from 'react';
import { ClipboardList, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Active Requests', value: '12', icon: ClipboardList, color: 'var(--google-blue)', bg: 'rgba(66, 133, 244, 0.1)' },
    { label: 'Pending Bills', value: '5', icon: Clock, color: 'var(--google-yellow)', bg: 'rgba(251, 188, 5, 0.1)' },
    { label: 'Completed Today', value: '8', icon: CheckCircle, color: 'var(--google-green)', bg: 'rgba(52, 168, 83, 0.1)' },
    { label: 'Urgent Issues', value: '2', icon: AlertTriangle, color: 'var(--google-red)', bg: 'rgba(234, 67, 53, 0.1)' },
  ];

  return (
    <div>
      <h2>Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: stat.bg, color: stat.color, padding: '16px', borderRadius: 'var(--radius-lg)' }}>
                <Icon size={28} />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '4px' }}>{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card">
        <h3>Recent Activity</h3>
        <p className="text-muted" style={{ marginTop: '8px' }}>Your recent actions will appear here.</p>
        <div style={{ marginTop: '20px', padding: '20px', border: '1px dashed var(--glass-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          No recent activity found.
        </div>
      </div>
    </div>
  );
}
