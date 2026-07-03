import React, { useState } from 'react';
import { ArrowRight, Bike, Calendar, MapPin, Wrench, ChevronLeft, User, Phone, CheckCircle, Clock, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function CustomerBooking() {
  const navigate = useNavigate();
  
  const bikeData = {
    "Chetak": ["Chetak 2903", "Chetak URBANE 2024", "Chetak Premium 2024"],
    "Pulsar Series": ["Bajaj Pulsar 125", "Bajaj Pulsar N125", "Bajaj Pulsar 150", "Bajaj Pulsar N160", "Bajaj Pulsar NS160", "Bajaj Pulsar NS200", "Bajaj Pulsar N250", "Bajaj Pulsar NS400Z"],
    "Platina Series": ["Bajaj Platina 100", "Bajaj Platina 110"],
    "CT Series": ["Bajaj CT 110X"],
    "Freedom Series": ["Bajaj Freedom 125 CNG"],
    "Dominar Series": ["Bajaj Dominar 250", "Bajaj Dominar 400"],
    "Avenger Series": ["Bajaj Avenger Street 160", "Bajaj Avenger Cruise 220"]
  };

  const branchData = {
    "Karur District": [
      "Karur (Main) - 5/294, Kovai Main Road",
      "Velayuthampalayam - No. 40, Rajammal Tower, Malaiveethi",
      "Tharagampatti - Veerakumar Complex, Near Lakshmi School",
      "Kulithalai - ACT Nagar, Trichy–Karur Main Road",
      "Aravakurichi - Karur Bypass Road",
      "Thogaimalai - Near Union Office, RA Complex",
      "Krishnarayapuram - 108, Main Road"
    ],
    "Salem District": [
      "Salem Head Office - 248/1, Meyyanoor Main Road",
      "Salem Showroom - Shah Arcade, 2/83, Meyyanoor Main Road",
      "Teevattipatti - Dharmapuri Main Road",
      "Elampillai - Salem Main Road",
      "Hasthampatty (Chetak EV) - No. 320, Kumarasamypatty, Cherry Road"
    ],
    "Thanjavur District": [
      "Thanjavur (Main) - 20/1, Natrajapuram South Colony",
      "Pattukkottai - Thanjavur Main Road, Arunachalam Mill Opposite",
      "Mannargudi - No. 42/2, Nadarajapillai Road",
      "Peravurani - Aavanam Road, Near Sri Dhanvanthiri Hotel",
      "Kumbakonam - Vandipettai, Opposite Indian Oil Petrol Bunk",
      "Orathanadu - Bharathidasan Nagar, Opposite Bharathidasan College Bypass",
      "Thiruvaiyaru - No. 42/45, Kalvi Agraharam Town",
      "Sengipatti - No. 204, Thirumalai Tower"
    ]
  };

  const [step, setStep] = useState(1); // 1: form, 2: success
  const [jobCardNo, setJobCardNo] = useState('');
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
    bikeRegNo: '',
    bikeBrand: '',
    bikeModel: '',
    serviceType: '',
    date: '',
    time: '',
    district: '',
    branch: '',
    complaints: [],
    otherComplaint: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const complaintOptions = ['Engine Noise', 'Brake Issue', 'Oil Leak', 'General Service', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'bikeBrand') updated.bikeModel = '';
      if (name === 'district') updated.branch = '';
      return updated;
    });
  };

  const toggleComplaint = (comp) => {
    if (formData.complaints.includes(comp)) {
      setFormData({ ...formData, complaints: formData.complaints.filter(c => c !== comp) });
    } else {
      setFormData({ ...formData, complaints: [...formData.complaints, comp] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate Job Card No
      const { count: bookingsCount, error: countError } = await supabase
        .from('service_bookings')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const sequence = String((bookingsCount || 0) + 1).padStart(2, '0');
      const generatedJobCardNo = `RJC${day}${month}${year}${sequence}`;

      const { data, error } = await supabase.from('service_bookings').insert([{
        // Mapping form to db fields
        customer_name: formData.customerName,
        customer_phone: formData.phoneNumber,
        registration_no: formData.bikeRegNo,
        bike_brand: formData.bikeBrand,
        bike_model: formData.bikeModel,
        service_type: formData.serviceType,
        location: `${formData.district} - ${formData.branch}`,
        complaints: formData.complaints,
        other_complaint: formData.complaints.includes('Other') ? formData.otherComplaint : null,
        status: 'booked',
        is_walkin: false,
        job_card_no: generatedJobCardNo,
        services: [formData.serviceType],
        logistics_preference: 'Self Drop-off',
        additional_notes: `Preferred Date: ${formData.date} | Preferred Time: ${formData.time}`
      }]);

      if (error) throw error;

      setJobCardNo(generatedJobCardNo);
      setStep(2);
    } catch (error) {
      console.error('Error booking service:', error);
      alert('Failed to book service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestimonialSubmit = async () => {
    try {
      await supabase.from('testimonials').insert([{
        customer_name: formData.customerName,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
    setTestimonialSubmitted(true);
  };

  if (step === 2) {
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
        <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '40%', height: '40%', background: '#60a5fa', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.3 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: '#34d399', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2 }}></div>

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Booking Confirmed!</h1>
          <p style={{ color: '#4b5563', fontSize: '15px', marginBottom: '24px' }}>
            Your bike will be serviced once the Admin approves your booking.
          </p>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px dashed #10b981',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <p style={{ fontSize: '14px', color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Job Card Number
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', letterSpacing: '2px' }}>
              {jobCardNo}
            </h2>
          </div>

          {/* Progress Stepper */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: '#e5e7eb', zIndex: 0 }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, flex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '8px', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)' }}>
                <Check size={24} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>Booked</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, flex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'white', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', marginBottom: '8px' }}>
                <Clock size={24} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>Approved</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, flex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'white', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', marginBottom: '8px' }}>
                <Wrench size={24} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>Received</span>
            </div>
          </div>

          {!testimonialSubmitted ? (
            <div style={{ marginTop: '24px', padding: '24px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'left' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px', textAlign: 'center' }}>
                Rate Your Experience
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', marginBottom: '16px' }}>
                How was your booking experience with Vaibav Bajaj?
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={28} 
                    fill={rating >= star ? '#fbbf24' : 'transparent'} 
                    color={rating >= star ? '#fbbf24' : '#d1d5db'}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onClick={() => setRating(star)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
              <textarea 
                placeholder="Leave a comment about Vaibav Bajaj... (Optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #d1d5db', background: 'white', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '80px', marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => { setTestimonialSubmitted(true); navigate('/'); }}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #d1d5db', background: 'transparent', color: '#4b5563', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Skip
                </button>
                <button 
                  onClick={handleTestimonialSubmit}
                  disabled={rating === 0}
                  style={{ flex: 2, padding: '12px', borderRadius: '12px', border: 'none', background: rating === 0 ? '#9ca3af' : '#111827', color: 'white', fontSize: '15px', fontWeight: 700, cursor: rating === 0 ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
                >
                  Submit Testimonial
                </button>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '24px', padding: '24px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', border: '1px dashed #10b981' }}>
              <CheckCircle size={32} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#059669', marginBottom: '16px' }}>
                Thank You!
              </h3>
              <button 
                onClick={() => navigate('/')}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#111827', color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

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
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontWeight: 600, marginBottom: '24px' }}
        >
          <ChevronLeft size={18} /> Back
        </button>

        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Vaibav Bajaj
          </h1>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
            Service Booking Portal
          </h2>
          <p style={{ color: '#4b5563', fontSize: '15px' }}>
            Schedule a maintenance slot for your Bajaj vehicle.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Customer Name */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" name="customerName" value={formData.customerName} onChange={handleChange} required
                  placeholder="John Doe"
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s' }}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Phone Number *</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required
                  placeholder="+1 234 567 8900"
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* District */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>District *</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <select 
                  name="district" value={formData.district} onChange={handleChange} required
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s', appearance: 'none' }}
                >
                  <option value="" disabled>Select District</option>
                  {Object.keys(branchData).map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Branch */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Branch *</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <select 
                  name="branch" value={formData.branch} onChange={handleChange} required disabled={!formData.district}
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: formData.district ? 'rgba(255, 255, 255, 0.9)' : 'rgba(243, 244, 246, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s', appearance: 'none' }}
                >
                  <option value="" disabled>Select Branch</option>
                  {formData.district && branchData[formData.district].map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Address */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Address (Optional)</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" name="address" value={formData.address} onChange={handleChange}
                placeholder="123 Main St, City"
                style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s' }}
              />
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', margin: '8px 0' }}></div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {/* Bike Reg No */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Reg No *</label>
              <input 
                type="text" name="bikeRegNo" value={formData.bikeRegNo} onChange={handleChange} required
                placeholder="AB 12 CD 3456"
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s' }}
              />
            </div>

            {/* Bike Brand */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Brand *</label>
              <select 
                name="bikeBrand" value={formData.bikeBrand} onChange={handleChange} required
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s', appearance: 'none' }}
              >
                <option value="" disabled>Select Brand</option>
                {Object.keys(bikeData).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Bike Model */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Model *</label>
              <select 
                name="bikeModel" value={formData.bikeModel} onChange={handleChange} required disabled={!formData.bikeBrand}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: formData.bikeBrand ? 'rgba(255, 255, 255, 0.9)' : 'rgba(243, 244, 246, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s', appearance: 'none' }}
              >
                <option value="" disabled>Select Model</option>
                {formData.bikeBrand && bikeData[formData.bikeBrand].map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', margin: '8px 0' }}></div>

          {/* Complaints */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '12px', marginLeft: '4px' }}>Complaints</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {complaintOptions.map(comp => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => toggleComplaint(comp)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: formData.complaints.includes(comp) ? '1px solid #3b82f6' : '1px solid #d1d5db',
                    background: formData.complaints.includes(comp) ? '#eff6ff' : 'white',
                    color: formData.complaints.includes(comp) ? '#2563eb' : '#4b5563',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {comp}
                </button>
              ))}
            </div>
            {formData.complaints.includes('Other') && (
              <textarea
                name="otherComplaint"
                value={formData.otherComplaint}
                onChange={handleChange}
                placeholder="Please describe your complaint..."
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s', marginTop: '12px', minHeight: '80px', resize: 'vertical' }}
              />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {/* Service Type */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Service Type *</label>
              <div style={{ position: 'relative' }}>
                <Wrench size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <select 
                  name="serviceType" value={formData.serviceType} onChange={handleChange} required
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s', appearance: 'none' }}
                >
                  <option value="" disabled>Select a service</option>
                  <option value="General">General</option>
                  <option value="Repair">Repair</option>
                  <option value="Accident">Accident</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Preferred Date *</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="date" name="date" value={formData.date} onChange={handleChange} required
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s' }}
                />
              </div>
            </div>

            {/* Time */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px', marginLeft: '4px' }}>Preferred Time *</label>
              <div style={{ position: 'relative' }}>
                <Clock size={18} color="#6b7280" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="time" name="time" value={formData.time} onChange={handleChange} required
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', color: '#1f2937', outline: 'none', transition: 'all 0.2s' }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} style={{
            width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
            background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
            fontSize: '16px', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
            boxShadow: isLoading ? 'none' : '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'transform 0.2s',
            marginTop: '12px'
          }}>
            {isLoading ? 'Booking...' : 'Confirm Booking'} <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
