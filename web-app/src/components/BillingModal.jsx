import React from 'react';
import { X, CheckCircle, Smartphone, ShieldCheck, Download } from 'lucide-react';

export default function BillingModal({ task, serviceItems, onClose }) {
  const currencySymbol = localStorage.getItem('currencySymbol') || '$';
  const subtotal = serviceItems.reduce((acc, item) => acc + item.cost, 0);
  const gstRate = 0.18; // 18% GST
  const gstAmount = subtotal * gstRate;
  const total = subtotal + gstAmount;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
      <div className="card" style={{ width: '100%', maxWidth: '800px', display: 'flex', overflow: 'hidden' }}>
        
        {/* Left Side: Invoice Summary */}
        <div style={{ flex: 1, padding: '32px', background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '18px', color: 'var(--text-main)' }}>Vaibav Bajaj Service Center</h4>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>Invoice</h2>
              <p style={{ color: 'var(--text-muted)' }}>INV-{Date.now().toString().slice(-6)}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 600 }}>{task.customer}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{task.bike}</p>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: 0 }}>Description</th>
                  <th style={{ textAlign: 'right', paddingRight: 0 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {serviceItems.map(item => (
                  <tr key={item.id}>
                    <td style={{ paddingLeft: 0, padding: '12px 0' }}>{item.name}</td>
                    <td style={{ textAlign: 'right', paddingRight: 0, padding: '12px 0', fontWeight: 500 }}>{currencySymbol}{item.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>GST (18%)</span>
              <span>{currencySymbol}{gstAmount.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, marginTop: '8px', paddingTop: '8px', borderTop: '2px solid var(--border-color)' }}>
              <span>Total Amount</span>
              <span style={{ color: 'var(--primary)' }}>{currencySymbol}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Google Pay Mockup */}
        <div style={{ width: '300px', background: 'var(--bg-hover)', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'white', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <X size={20} color="var(--text-muted)" />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" style={{ height: '32px' }} />
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Mock QR Code */}
            <div style={{ width: '180px', height: '180px', background: `repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)`, opacity: 0.1, borderRadius: '8px', marginBottom: '12px' }}>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Scan with GPay app</p>
          </div>

          <button className="btn" style={{ background: '#1a1a1a', color: 'white', width: '100%', padding: '14px', borderRadius: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <Smartphone size={18} /> Pay {currencySymbol}{total.toFixed(2)}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', marginTop: '24px', fontSize: '12px', fontWeight: 600 }}>
            <ShieldCheck size={14} /> Secured by Velorix Payments
          </div>
        </div>

      </div>
    </div>
  );
}
