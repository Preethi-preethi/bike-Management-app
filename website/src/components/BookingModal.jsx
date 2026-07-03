import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User, Phone, MapPin, CheckCircle, Clock, Check, Wrench, Star, Calendar, Bike, Package } from 'lucide-react';

const CustomDropdown = ({ options, value, onChange, icon: Icon, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`} ref={dropdownRef}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full p-3 pl-10 rounded-xl border border-slate-200 bg-white/90 hover:border-accent-neon transition-all cursor-pointer flex items-center justify-between"
      >
        <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <span className={`truncate ${value ? "text-slate-900" : "text-slate-400"}`}>
          {value || placeholder}
        </span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-xl max-h-56 overflow-y-auto animate-fade-in-up origin-top">
          {options.map((opt, idx) => (
            <div 
              key={idx}
              onClick={() => { onChange({ target: { value: opt } }); setIsOpen(false); }}
              className="p-3 hover:bg-slate-50 cursor-pointer text-sm text-slate-700 transition-colors border-b border-slate-50 last:border-0"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function BookingModal({ isOpen, onClose }) {
  const [view, setView] = useState('otp'); // otp, form, success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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

  const complaintOptions = ['Engine Noise', 'Brake Issue', 'Oil Leak', 'General Service', 'Other'];

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
    bikeRegNo: '',
    bikeBrand: '',
    bikeModel: '',
    serviceType: 'General Service',
    date: '',
    time: '',
    district: '',
    branch: '',
    logisticsPreference: 'Self Drop-off',
    complaints: [],
    otherComplaint: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobCardNo, setJobCardNo] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    if (!email.includes('@')) {
      alert("Please enter a valid email.");
      return;
    }
    setIsSending(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    setIsSending(false);
    if (error) {
      alert(`Could not send OTP via Supabase: ${error.message}`);
    } else {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = async () => {
    const cleanOtp = otp.replace(/\s+/g, '');
    let { error } = await supabase.auth.verifyOtp({ email, token: cleanOtp, type: 'email' });
    if (error && error.message.includes("expired")) {
      let res = await supabase.auth.verifyOtp({ email, token: cleanOtp, type: 'signup' });
      if (res.error) res = await supabase.auth.verifyOtp({ email, token: cleanOtp, type: 'magiclink' });
      error = res.error;
    }
    if (error) {
      alert(`Invalid Code: ${error.message}`);
    } else {
      setView('form');
    }
  };

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let targetCompanyId = null;
      const { data: companies } = await supabase.from('companies').select('id').limit(1);
      if (companies && companies.length > 0) targetCompanyId = companies[0].id;
      
      const { count: bookingsCount, error: countError } = await supabase
        .from('service_bookings')
        .select('*', { count: 'exact', head: true });

      const dateObj = new Date();
      const sequence = String((bookingsCount || 0) + 1).padStart(2, '0');
      const generatedJobCardNo = `RJC${String(dateObj.getDate()).padStart(2, '0')}${String(dateObj.getMonth() + 1).padStart(2, '0')}${dateObj.getFullYear()}${sequence}`;

      const { error } = await supabase.from('service_bookings').insert([{
        customer_name: formData.customerName,
        customer_phone: formData.phoneNumber,
        registration_no: formData.bikeRegNo,
        bike_brand: formData.bikeBrand,
        bike_model: formData.bikeModel,
        service_type: formData.serviceType,
        location: `${formData.district} - ${formData.branch}`,
        complaints: formData.complaints,
        other_complaint: formData.complaints.includes('Other') ? formData.otherComplaint : null,
        status: 'pending',
        is_walkin: false,
        job_card_no: generatedJobCardNo,
        services: [formData.serviceType],
        logistics_preference: formData.logisticsPreference,
        additional_notes: `Email: ${email} | Address: ${formData.address} | Preferred Date: ${formData.date} | Preferred Time: ${formData.time}`
      }]);

      if (error) throw error;
      setJobCardNo(generatedJobCardNo);
      setView('success');
    } catch (error) {
      alert('Failed to book service: ' + error.message);
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="glass-panel w-full max-w-2xl bg-white/95 relative z-10 p-6 sm:p-10 max-h-[90vh] overflow-y-auto transform transition-transform duration-300 shadow-2xl border-white/50 animate-fade-in-up rounded-3xl">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {view === 'otp' && (
          <div className="animate-fade-in-up text-center pt-4">
            <h3 className="text-3xl font-space font-bold mb-2">Verify <span className="text-accent-neon">Identity</span></h3>
            <p className="text-slate-500 mb-8">Please enter your email to receive a one-time verification code.</p>
            
            <div className="space-y-4 max-w-md mx-auto text-left">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent-neon transition-all" 
                  placeholder="rider@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent}
                />
              </div>
              
              {otpSent && (
                <div className="animate-fade-in-up">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Verification Code</label>
                  <input 
                    type="text" className="w-full p-4 rounded-xl border border-slate-200 bg-white text-center tracking-[0.5em] font-space text-lg focus:outline-none focus:ring-2 focus:ring-accent-neon" 
                    placeholder="--------" maxLength="8" value={otp} onChange={(e) => setOtp(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-2">Check your email inbox and spam folder.</p>
                </div>
              )}

              {!otpSent ? (
                <button onClick={handleSendOTP} disabled={isSending} className="btn-premium w-full mt-4 py-4 rounded-xl">
                  {isSending ? 'Sending...' : 'Send Code'}
                </button>
              ) : (
                <button onClick={handleVerifyOTP} className="btn-premium w-full mt-4 py-4 rounded-xl">Verify & Continue</button>
              )}
            </div>
          </div>
        )}

        {view === 'form' && (
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-space font-bold mb-2 text-center">Vaibav Bajaj <span className="text-accent-neon">Service</span></h3>
            <p className="text-slate-500 mb-8 text-center">Fill in the details below to schedule your motorcycle service.</p>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="customerName" required className="w-full p-3 pl-10 rounded-xl border border-slate-200 bg-white/90 focus:ring-2 focus:ring-accent-neon outline-none transition-all" placeholder="John Doe" value={formData.customerName} onChange={handleChange} />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="tel" name="phoneNumber" required className="w-full p-3 pl-10 rounded-xl border border-slate-200 bg-white/90 focus:ring-2 focus:ring-accent-neon outline-none transition-all" placeholder="+91 9876543210" value={formData.phoneNumber} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">District *</label>
                  <CustomDropdown 
                    options={Object.keys(branchData)} 
                    value={formData.district} 
                    onChange={(e) => handleChange({ target: { name: 'district', value: e.target.value } })} 
                    icon={MapPin} 
                    placeholder="Select District" 
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Branch *</label>
                  <CustomDropdown 
                    options={formData.district ? branchData[formData.district] : []} 
                    value={formData.branch} 
                    onChange={(e) => handleChange({ target: { name: 'branch', value: e.target.value } })} 
                    icon={MapPin} 
                    placeholder="Select Branch"
                    disabled={!formData.district}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Date *</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input type="date" name="date" required className="w-full p-3 pl-10 rounded-xl border border-slate-200 bg-white/90 focus:ring-2 focus:ring-accent-neon outline-none transition-all text-slate-900" value={formData.date} onChange={handleChange} />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Time *</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input type="time" name="time" required className="w-full p-3 pl-10 rounded-xl border border-slate-200 bg-white/90 focus:ring-2 focus:ring-accent-neon outline-none transition-all text-slate-900" value={formData.time} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-4 mt-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reg No *</label>
                  <div className="relative">
                    <Bike size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="bikeRegNo" required className="w-full p-3 pl-10 rounded-xl border border-slate-200 bg-white/90 uppercase focus:ring-2 focus:ring-accent-neon outline-none transition-all" placeholder="TN 39 XX 0000" value={formData.bikeRegNo} onChange={handleChange} />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brand *</label>
                  <CustomDropdown 
                    options={Object.keys(bikeData)} 
                    value={formData.bikeBrand} 
                    onChange={(e) => handleChange({ target: { name: 'bikeBrand', value: e.target.value } })} 
                    icon={Bike} 
                    placeholder="Select Series" 
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Model *</label>
                  <CustomDropdown 
                    options={formData.bikeBrand ? bikeData[formData.bikeBrand] : []} 
                    value={formData.bikeModel} 
                    onChange={(e) => handleChange({ target: { name: 'bikeModel', value: e.target.value } })} 
                    icon={Bike} 
                    placeholder="Select Model"
                    disabled={!formData.bikeBrand}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Logistics Preference *</label>
                  <CustomDropdown 
                    options={['Self Drop-off', 'Pickup Required']} 
                    value={formData.logisticsPreference} 
                    onChange={(e) => handleChange({ target: { name: 'logisticsPreference', value: e.target.value } })} 
                    icon={Package} 
                    placeholder="Select Preference" 
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Complaints / Issues</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {complaintOptions.map(comp => (
                    <div 
                      key={comp}
                      onClick={() => toggleComplaint(comp)}
                      className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors border ${formData.complaints.includes(comp) ? 'bg-accent-neon text-white border-accent-neon' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      {comp}
                    </div>
                  ))}
                </div>
                {formData.complaints.includes('Other') && (
                  <input type="text" name="otherComplaint" className="w-full p-3 rounded-xl border border-slate-200 bg-white/90" placeholder="Please specify other issues..." value={formData.otherComplaint} onChange={handleChange} />
                )}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-premium w-full mt-6 py-4 rounded-xl font-bold text-lg">
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        )}

        {view === 'success' && (
          <div className="animate-fade-in-up text-center py-6">
            <CheckCircle size={64} className="text-emerald-500 mx-auto mb-4" />
            <h3 className="text-3xl font-space font-bold mb-2">Booking <span className="text-emerald-500">Confirmed</span></h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Your Vaibav Bajaj service request has been recorded. Our team will contact you shortly.</p>

            <div className="flex justify-between items-center mb-8 relative max-w-md mx-auto">
              <div className="absolute top-6 left-10 right-10 h-0.5 bg-slate-200 z-0"></div>
              <div className="flex flex-col items-center z-10 flex-1">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-2 shadow-lg"><Check size={20} /></div>
                <span className="text-xs font-bold text-slate-900">Booked</span>
              </div>
              <div className="flex flex-col items-center z-10 flex-1">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 mb-2"><Clock size={20} /></div>
                <span className="text-xs font-medium text-slate-500">Approved</span>
              </div>
              <div className="flex flex-col items-center z-10 flex-1">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 mb-2"><Wrench size={20} /></div>
                <span className="text-xs font-medium text-slate-500">Received</span>
              </div>
            </div>

            {!testimonialSubmitted ? (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Rate Your Experience</h3>
                <p className="text-sm text-slate-500 mb-4">How was your booking experience with Vaibav Bajaj?</p>
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} size={32} 
                      fill={rating >= star ? '#fbbf24' : 'transparent'} 
                      className={`cursor-pointer transition-transform hover:scale-110 ${rating >= star ? 'text-amber-400' : 'text-slate-300'}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <textarea 
                  placeholder="Leave a comment... (Optional)" value={comment} onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm outline-none resize-none min-h-[80px] mb-4"
                />
                <div className="flex gap-3">
                  <button onClick={() => { setTestimonialSubmitted(true); onClose(); }} className="flex-1 py-3 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-bold hover:bg-slate-100 transition-colors">Skip</button>
                  <button onClick={handleTestimonialSubmit} disabled={rating === 0} className="flex-[2] py-3 rounded-xl border-none bg-slate-900 text-white font-bold disabled:bg-slate-400 hover:bg-slate-800 transition-colors">Submit Testimonial</button>
                </div>
              </div>
            ) : (
              <button onClick={onClose} className="btn-premium max-w-sm w-full py-4 rounded-xl font-bold">Return to Website</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
