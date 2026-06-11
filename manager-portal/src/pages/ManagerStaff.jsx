import React, { useState } from 'react';
import { Users, UserPlus, MoreVertical, Briefcase, Mail, Phone } from 'lucide-react';

const initialStaff = [
  { id: '1', name: 'John Doe', role: 'Senior Mechanic', email: 'john@velorix.com', phone: '+1 234 567 8900', status: 'Active', tasks: 4 },
  { id: '2', name: 'Jane Smith', role: 'Junior Mechanic', email: 'jane@velorix.com', phone: '+1 234 567 8901', status: 'Active', tasks: 2 },
  { id: '3', name: 'Mike Johnson', role: 'Quality Inspector', email: 'mike@velorix.com', phone: '+1 234 567 8902', status: 'On Leave', tasks: 0 },
];

export default function ManagerStaff() {
  const [staff, setStaff] = useState(initialStaff);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Staff Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your service center staff and assign roles.</p>
        </div>
        <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius-full)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <UserPlus size={18} /> Add Staff
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {staff.map(person => (
          <div key={person.id} className="card" style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold', fontSize: '18px' }}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>{person.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14} /> {person.role}</p>
                </div>
              </div>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreVertical size={20} /></button>
            </div>

            <div style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> {person.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> {person.phone}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span className={`badge ${person.status === 'Active' ? 'badge-primary' : 'badge-warning'}`}>
                {person.status}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>
                {person.tasks} Active Tasks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
