import React, { useState } from 'react';
import { ArrowRight, User, Phone, Mail, Key, CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pilotName: '',
    commsNumber: '',
    accessEmail: '',
    securityKey: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate initialization
    setTimeout(() => {
      alert("Account initialized successfully!");
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      // Light blue/indigo gradient with soft radial glow
      background: 'radial-gradient(circle at top left, #e0e7ff, #ffffff, #c7d2fe)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative background blobs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: '#818cf8', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.4 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: '#60a5fa', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }}></div>

      {/* Main Glassmorphic Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', letterSpacing: '-1px', marginBottom: '8px' }}>
            Vaibav Bajaj
          </h1>
          <p style={{ color: '#4b5563', fontSize: '15px' }}>
            Create your account to access Vaibav Bajaj services.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Full Name */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                name="pilotName"
                value={formData.pilotName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)',
                  background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.5)'}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="tel" 
                name="commsNumber"
                value={formData.commsNumber}
                onChange={handleChange}
                placeholder="+91 9876543210"
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)',
                  background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.5)'}
              />
            </div>
          </div>

          {/* Email Address */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                name="accessEmail"
                value={formData.accessEmail}
                onChange={handleChange}
                placeholder="customer@example.com"
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)',
                  background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.5)'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                name="securityKey"
                value={formData.securityKey}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)',
                  background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.5)'}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={{
            width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Initialize <ArrowRight size={20} />
          </button>
        </form>

        {/* Separator */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
          <span style={{ padding: '0 12px', fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
        </div>

        {/* Booking Link */}
        <button 
          onClick={() => navigate('/booking')} // Assuming a future booking route
          style={{
            width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid rgba(37, 99, 235, 0.2)',
            background: 'rgba(255, 255, 255, 0.8)', color: '#2563eb',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 246, 255, 0.9)'; e.currentTarget.style.border = '2px solid rgba(37, 99, 235, 0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'; e.currentTarget.style.border = '2px solid rgba(37, 99, 235, 0.2)'; }}
        >
          <CalendarClock size={20} /> Book a Service
        </button>

      </div>
    </div>
  );
}
