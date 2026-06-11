import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Admin');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (role === 'Admin') navigate('/admin');
      if (role === 'Manager') navigate('/manager');
      if (role === 'Super Admin') navigate('/superadmin');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, background: 'var(--primary-gradient)', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'white', marginBottom: '24px' }}>
          <div style={{ background: 'white', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wrench size={32} color="var(--primary)" />
          </div>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 800, margin: 0 }}>Velorix</h1>
            <p style={{ opacity: 0.9, margin: 0 }}>Modernize Your Bike Service</p>
          </div>
        </div>

        <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '40px', marginTop: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-main)' }}>Sign In to Portal</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Access your personalized enterprise dashboard.</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Select Demo Role</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Admin', 'Manager', 'Super Admin'].map(r => (
                  <button
                    key={r}
                    type="button"
                    className={`btn ${role === r ? 'btn-primary' : 'btn-outline'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Work Email</label>
              <input type="email" className="input-field" placeholder="name@velorix.com" defaultValue="demo@velorix.com" required />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input type="password" className="input-field" placeholder="••••••••" defaultValue="password" required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In securely'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
