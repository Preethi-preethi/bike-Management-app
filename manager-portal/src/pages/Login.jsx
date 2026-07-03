import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Wrench, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'radial-gradient(circle at top right, #e8f0fe 0%, #ffffff 50%, #f0fdf4 100%)' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '48px', background: 'rgba(255, 255, 255, 0.95)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.8)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', background: 'linear-gradient(135deg, var(--google-blue), #1a73e8)', color: 'white', padding: '16px', borderRadius: '20px', marginBottom: '20px', boxShadow: '0 8px 16px rgba(66, 133, 244, 0.2)' }}>
            <Wrench size={36} />
          </div>
          <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>Manager Portal</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '15px' }}>Sign in to manage service operations</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="floating-input-group">
            <input 
              type="email" 
              className="floating-input" 
              placeholder=" "
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              required
            />
            <label className="floating-label">Email Address</label>
            <Mail className="input-icon" size={20} />
          </div>
          
          <div className="floating-input-group" style={{ marginBottom: error ? '8px' : '32px' }}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              className="floating-input" 
              placeholder=" "
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              required
              style={{ paddingRight: '48px' }}
            />
            <label className="floating-label">Password</label>
            <Lock className="input-icon" size={20} />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div style={{ 
            overflow: 'hidden', 
            transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out', 
            maxHeight: error ? '60px' : '0px', 
            opacity: error ? 1 : 0,
            marginBottom: error ? '24px' : '0px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--google-red)', background: 'rgba(234, 67, 53, 0.08)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '16px', fontWeight: '700', letterSpacing: '0.5px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
            {!isLoading && <ArrowRight size={20} style={{ marginLeft: '4px' }} />}
          </button>
        </form>
      </div>
    </div>
  );
}
