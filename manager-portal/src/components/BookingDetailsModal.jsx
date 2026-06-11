import React from 'react';
import { X, User, Bike, Wrench, Calendar, MapPin, ClipboardList, CheckCircle2 } from 'lucide-react';

export default function BookingDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200 }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div className="card-header" style={{ background: 'var(--bg-hover)' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={20} color="var(--primary)" />
              Booking Details
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{order.id}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={24} color="var(--text-muted)" />
          </button>
        </div>

        {/* Body */}
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ padding: '8px', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary)' }}>
              <User size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Customer</div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>{order.customer}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>+1 (555) 019-2834</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ padding: '8px', background: 'var(--bg-hover)', borderRadius: '8px', color: 'var(--text-main)' }}>
              <Bike size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vehicle</div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>{order.bike}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ padding: '8px', background: 'var(--bg-hover)', borderRadius: '8px', color: 'var(--text-main)' }}>
              <Wrench size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Service Requested</div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>{order.service}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Standard processing time applies.</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                <Calendar size={14} /> Date
              </div>
              <div style={{ fontWeight: 500 }}>{order.date}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                <MapPin size={14} /> Location
              </div>
              <div style={{ fontWeight: 500 }}>{order.location}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-hover)', padding: '16px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assignment Status</div>
              {order.assignedTo ? (
                <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="var(--success)" /> Assigned to {order.assignedTo}
                </div>
              ) : (
                <div style={{ fontWeight: 600, color: 'var(--warning)' }}>Pending Assignment</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
