import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BookingModal({ isOpen, onClose }) {
  const [view, setView] = useState('otp'); // otp, form, success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  // Form State
  const [location, setLocation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bikeBrand, setBikeBrand] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [regNo, setRegNo] = useState('');
  const [bikeYear, setBikeYear] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [notes, setNotes] = useState('');
  const [logistics, setLogistics] = useState('pickup');
  
  const [detectingLoc, setDetectingLoc] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    if (!email.includes('@')) {
      alert("Please enter a valid email.");
      return;
    }
    setIsSending(true);
    
    // Try sending Supabase OTP
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
      }
    });

    setIsSending(false);
    
    if (error) {
      console.error('Supabase OTP Error:', error);
      alert(`Could not send OTP via Supabase: ${error.message}\n\nYou can still use '123456' to bypass.`);
      // We still set otpSent to true so they can use the mock fallback
      setOtpSent(true);
    } else {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = async () => {
    const cleanOtp = otp.replace(/\s+/g, '');
    
    if (cleanOtp === '123456') {
      setView('form');
      return;
    }
    
    let { data, error } = await supabase.auth.verifyOtp({ email, token: cleanOtp, type: 'email' });
    
    // If 'email' fails, try 'signup', then 'magiclink' just once each to avoid rate limits
    if (error && error.message.includes("expired")) {
      let res = await supabase.auth.verifyOtp({ email, token: cleanOtp, type: 'signup' });
      if (res.error) {
        res = await supabase.auth.verifyOtp({ email, token: cleanOtp, type: 'magiclink' });
      }
      error = res.error;
    }

    if (error) {
      alert(`Invalid Code: ${error.message}`);
    } else {
      setView('form');
    }
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLoc(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (data.display_name) {
            setLocation(data.display_name);
          } else {
            setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (e) {
          console.error(e);
          alert("Failed to reverse geocode location.");
        } finally {
          setDetectingLoc(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location. Please type it manually.");
        setDetectingLoc(false);
      }
    );
  };

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    if (selectedServices.length === 0) {
      alert("Please select at least one service option.");
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('service_bookings')
      .insert([
        {
          customer_name: customerName,
          customer_email: email,
          customer_phone: customerPhone,
          location: location,
          bike_brand: bikeBrand,
          bike_model: bikeModel,
          registration_no: regNo,
          bike_year: bikeYear || null,
          services: selectedServices,
          additional_notes: notes,
          logistics_preference: logistics,
          status: 'pending'
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Supabase Insert Error:', error);
      alert(`Failed to submit booking: ${error.message}\n\nPlease make sure you created the 'service_bookings' table in your Supabase dashboard!`);
    } else {
      setView('success');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="glass-panel w-full max-w-2xl bg-white/95 relative z-10 p-6 sm:p-10 max-h-[90vh] overflow-y-auto transform transition-transform duration-300 shadow-2xl border-white/50 animate-fade-in-up">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {view === 'otp' && (
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-space font-bold mb-2">Verify <span className="text-accent-neon">Identity</span></h3>
            <p className="text-slate-500 mb-8">Please enter your email to receive a one-time verification code.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="input-glass" 
                  placeholder="rider@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={otpSent}
                />
              </div>
              
              {otpSent && (
                <div className="animate-fade-in-up">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Verification Code</label>
                  <input 
                    type="text" 
                    className="input-glass text-center tracking-[0.5em] font-space text-lg" 
                    placeholder="--------" 
                    maxLength="8"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-2">Check your email, or use '123456' to bypass if Supabase isn't configured.</p>
                </div>
              )}

              {!otpSent ? (
                <button onClick={handleSendOTP} disabled={isSending} className="btn-premium w-full mt-4">
                  {isSending ? <span className="animate-pulse">Sending...</span> : 'Send Code'}
                </button>
              ) : (
                <button onClick={handleVerifyOTP} className="btn-premium w-full mt-4">Verify & Continue</button>
              )}
            </div>
          </div>
        )}

        {view === 'form' && (
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-space font-bold mb-2">Book <span className="text-accent-neon">Service</span></h3>
            <p className="text-slate-500 mb-8">Fill in the details below to schedule your motorcycle service.</p>
            
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" required className="input-glass" placeholder="John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" required className="input-glass" placeholder="+1 (555) 000-0000" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Location</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    className="input-glass pr-24" 
                    placeholder="Enter your address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button type="button" onClick={detectLocation} className="absolute right-2 top-2 bottom-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    Locate
                  </button>
                </div>
                {detectingLoc && <p className="text-xs text-accent-neon mt-1">Detecting location...</p>}
              </div>

              <div className="border-t border-slate-200 pt-4 mt-4">
                <h4 className="text-lg font-space font-bold mb-4">Bike Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                    <input type="text" required className="input-glass" placeholder="e.g., Bajaj, Ducati" value={bikeBrand} onChange={(e) => setBikeBrand(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                    <input type="text" required className="input-glass" placeholder="e.g., Pulsar NS200" value={bikeModel} onChange={(e) => setBikeModel(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Registration No.</label>
                    <input type="text" required className="input-glass uppercase" placeholder="XX-00-XX-0000" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Year (Optional)</label>
                    <input type="number" className="input-glass" placeholder="2023" min="1990" max="2026" value={bikeYear} onChange={(e) => setBikeYear(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-4">
                <h4 className="text-lg font-space font-bold mb-4">Service Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['General Service', 'Oil Change', 'Brake Pad Replacement', 'Chain Lube & Adjust'].map(s => (
                    <label key={s} className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-accent-neon rounded border-slate-300 focus:ring-accent-neon" 
                        checked={selectedServices.includes(s)}
                        onChange={() => toggleService(s)}
                      />
                      <span className="text-sm font-medium text-slate-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Description</label>
                <textarea className="input-glass min-h-[100px] resize-none" placeholder="Any specific issues or requests..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-4">
                <h4 className="text-lg font-space font-bold mb-4">Logistics</h4>
                <div className="flex gap-4">
                  <label className="flex-1 flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-accent-neon has-[:checked]:bg-accent-neon/5">
                    <input type="radio" name="logistics" value="pickup" className="w-4 h-4 text-accent-neon border-slate-300 focus:ring-accent-neon" checked={logistics === 'pickup'} onChange={(e) => setLogistics(e.target.value)} />
                    <span className="text-sm font-medium text-slate-900">Pickup Required</span>
                  </label>
                  <label className="flex-1 flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-accent-neon has-[:checked]:bg-accent-neon/5">
                    <input type="radio" name="logistics" value="dropoff" className="w-4 h-4 text-accent-neon border-slate-300 focus:ring-accent-neon" checked={logistics === 'dropoff'} onChange={(e) => setLogistics(e.target.value)} />
                    <span className="text-sm font-medium text-slate-900">I'll Drop It Off</span>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-premium w-full mt-6 flex justify-center items-center gap-2">
                {isSubmitting ? <span className="animate-pulse">Processing...</span> : (
                  <>
                    Submit Booking Request
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {view === 'success' && (
          <div className="animate-fade-in-up text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h3 className="text-3xl font-space font-bold mb-4">Request <span className="text-green-500">Confirmed</span></h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Your service request has been safely stored in our secure database. Our team will contact you shortly.</p>
            <button onClick={() => {
              onClose();
              setTimeout(() => setView('otp'), 300);
            }} className="btn-premium w-full">Return to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
