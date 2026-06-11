import React, { useState } from 'react';
import { Users, Plus, ShieldAlert, CheckCircle2, MoreVertical, X, CalendarClock } from 'lucide-react';

export default function AdminUsers() {
  const [managers, setManagers] = useState([
    { id: 1, name: 'Alex Manager', email: 'alex@company.com', role: 'Manager', status: 'Active', attendance: 'Present' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  // Business logic: Maximum 2 managers allowed
  const MAX_MANAGERS = 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (managers.length >= MAX_MANAGERS) {
      setError(`Limit reached: You can only create up to ${MAX_MANAGERS} manager accounts.`);
      return;
    }
    
    setManagers([
      ...managers, 
      { id: Date.now(), name: formData.name, email: formData.email, role: 'Manager', status: 'Active', attendance: 'Absent' }
    ]);
    setFormData({ name: '', email: '', password: '' });
    setError('');
    setIsModalOpen(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleAttendance = (id) => {
    setManagers(managers.map(mgr => 
      mgr.id === id ? { ...mgr, attendance: mgr.attendance === 'Present' ? 'Absent' : 'Present' } : mgr
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Manage Team</h1>
          <p style={{ color: 'var(--text-muted)' }}>Create and manage credentials for your service managers.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add New Manager
        </button>
      </div>

      {/* Managers List */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Active Credentials ({managers.length}/{MAX_MANAGERS})</h2>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Attendance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
              <tbody>
                {managers.map(mgr => (
                  <tr key={mgr.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary)' }}>
                          {mgr.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{mgr.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{mgr.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{mgr.role}</span>
                    </td>
                    <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`badge ${mgr.attendance === 'Present' ? 'badge-success' : 'badge-danger'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarClock size={14} /> {mgr.attendance}
                      </span>
                      <button 
                        onClick={() => toggleAttendance(mgr.id)} 
                        style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '12px', fontWeight: 600, textDecoration: 'underline' }}
                      >
                        Toggle
                      </button>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontWeight: 500, fontSize: '14px' }}>
                      <CheckCircle2 size={16} /> Active
                    </div>
                  </td>
                    <td>
                      <button className="btn btn-outline" style={{ padding: '6px' }}>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {/* Add Manager Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
            <div className="card-header">
              <h2 className="card-title">Add New Manager</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="var(--text-muted)" />
              </button>
            </div>
            <div className="card-body">
              {managers.length >= MAX_MANAGERS ? (
                <div style={{ background: 'var(--warning)', color: 'white', padding: '16px', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <ShieldAlert size={20} />
                  <div>
                    <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Manager Limit Reached</h4>
                    <p style={{ fontSize: '14px', opacity: 0.9 }}>Your current plan only allows {MAX_MANAGERS} manager credentials.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ background: 'var(--danger)', color: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '14px' }}>
                      {error}
                    </div>
                  )}
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input type="text" name="name" className="input-field" placeholder="Jane Doe" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <input type="email" name="email" className="input-field" placeholder="jane@company.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="input-group" style={{ marginBottom: '24px' }}>
                    <label className="input-label">Temporary Password</label>
                    <input type="password" name="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Plus size={18} /> Create Manager Credential
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
