import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function FreeTrialRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    country: 'USA'
  });

  const getCurrencySymbol = (country) => {
    switch(country) {
      case 'India': return '₹';
      case 'UK': return '£';
      case 'Australia': return 'A$';
      case 'Canada': return 'C$';
      case 'Germany':
      case 'France': return '€';
      case 'USA':
      default: return '$';
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currency = getCurrencySymbol(formData.country);
    localStorage.setItem('currencySymbol', currency);
    
    // Simulate API call for registration
    setTimeout(() => {
      // Redirect to the Owner/Admin dashboard
      navigate('/admin');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
      
      {/* Left Side: Branding & Value Prop */}
      <div style={{ flex: 1, background: 'var(--primary-gradient)', padding: '64px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ background: 'white', padding: '12px', borderRadius: '16px' }}>
            <Wrench size={32} color="var(--primary)" />
          </div>
          <span style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>Velorix</span>
        </div>
        
        <h1 style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>
          Accelerate your bike service business.
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '48px', maxWidth: '480px', lineHeight: 1.5 }}>
          Claim your 12-month free trial today. Manage jobs, automate billing, and gain actionable insights all in one premium portal.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { icon: Zap, text: 'Complete work management & job cards' },
            { icon: BarChart3, text: 'Real-time company revenue analytics' },
            { icon: ShieldCheck, text: 'Secure role-based access for your team' }
          ].map((feature, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px' }}>
                <feature.icon size={24} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 500 }}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px' }}>
        <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '48px', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>Create your account</h2>
            <p style={{ color: 'var(--text-muted)' }}>Start your 12-month free trial. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Business Name</label>
              <input 
                type="text" 
                name="businessName"
                className="input-field" 
                placeholder="e.g. Speedster Garage"
                value={formData.businessName}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Owner Full Name</label>
              <input 
                type="text" 
                name="ownerName"
                className="input-field" 
                placeholder="John Doe"
                value={formData.ownerName}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Work Email</label>
              <input 
                type="email" 
                name="email"
                className="input-field" 
                placeholder="john@speedstergarage.com"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Country</label>
              <select 
                name="country" 
                className="input-field" 
                value={formData.country} 
                onChange={handleChange}
              >
                <option value="USA">United States</option>
                <option value="India">India</option>
                <option value="UK">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
            </div>

            <div className="input-group" style={{ marginBottom: '32px' }}>
              <label className="input-label">Password</label>
              <input 
                type="password" 
                name="password"
                className="input-field" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
              Start 12-Month Free Trial <ArrowRight size={20} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Already have an account? <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
