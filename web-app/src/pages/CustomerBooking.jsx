import React, { useState } from 'react';
import { ArrowRight, Bike, Calendar, MapPin, Wrench, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bikeModel: '',
    serviceType: '',
    date: '',
    location: 'Drop-off'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking
    setTimeout(() => {
      alert("Service booked successfully! We will contact you shortly.");
      navigate('/customer-register');
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at bottom right, #dcfce3, #ffffff, #e0e7ff)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative background blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '40%', height: '40%', background: '#60a5fa', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.3 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: '#34d399', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2 }}></div>

      {/* Main Glassmorphic Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
      }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontWeight: 600, marginBottom: '24px' }}
        >
          <ChevronLeft size={18} /> Back
        </button>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Book a Service
          </h1>
          <p style={{ color: '#4b5563', fontSize: '15px' }}>
            Schedule a maintenance slot for your vehicle.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Bike Model */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Vehicle Model</label>
            <div style={{ position: 'relative' }}>
              <Bike size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                name="bikeModel"
                value={formData.bikeModel}
                onChange={handleChange}
                placeholder="e.g. Yamaha R15"
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.6)'}
              />
            </div>
          </div>

          {/* Service Type */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Service Type</label>
            <div style={{ position: 'relative' }}>
              <Wrench size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <select 
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                  appearance: 'none'
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.6)'}
              >
                <option value="" disabled>Select a service</option>
                <option value="Full Servicing">Full Servicing</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Brake Pad Replacement">Brake Pad Replacement</option>
                <option value="General Checkup">General Checkup</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Preferred Date</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.6)'}
              />
            </div>
          </div>

          {/* Location */}
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Logistics</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <select 
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s',
                  appearance: 'none'
                }}
                onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.6)'}
              >
                <option value="Drop-off">Drop-off at Workshop</option>
                <option value="Home Pickup">Home Pickup</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={{
            width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Confirm Booking <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
