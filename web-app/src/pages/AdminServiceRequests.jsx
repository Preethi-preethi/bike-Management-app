import React, { useState } from 'react';
import { Calendar, MapPin, User, ChevronDown, CheckCircle2 } from 'lucide-react';
import BookingDetailsModal from '../components/BookingDetailsModal';

const initialRequests = [
  { id: 'ORD-8921', customer: 'Michael Scott', bike: 'Harley Davidson Street 750', service: 'Full Servicing', date: 'Oct 24, 2026', location: 'Home Pickup', status: 'Pending', assignedTo: '' },
  { id: 'ORD-8922', customer: 'Pam Beesly', bike: 'Vespa Elettrica', service: 'Battery Check', date: 'Oct 24, 2026', location: 'Drop-off', status: 'Pending', assignedTo: '' },
  { id: 'ORD-8923', customer: 'Jim Halpert', bike: 'Triumph Bonneville', service: 'Brake Pad Replacement', date: 'Oct 25, 2026', location: 'Home Pickup', status: 'Assigned', assignedTo: 'Alex Manager' },
  { id: 'ORD-8924', customer: 'Dwight Schrute', bike: 'Kawasaki Ninja 400', service: 'Chain Adjustment', date: 'Oct 25, 2026', location: 'Drop-off', status: 'Pending', assignedTo: '' }
];

const managers = ['Alex Manager', 'Jane Doe'];

export default function AdminServiceRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAssignManager = (orderId, managerName) => {
    setRequests(requests.map(req => 
      req.id === orderId 
        ? { ...req, assignedTo: managerName, status: 'Assigned' } 
        : req
    ));
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Service Requests</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage incoming customer bookings and assign them to your service managers.</p>
      </div>

      <div className="card">
        <div className="card-header" style={{ background: 'var(--bg-hover)' }}>
          <h2 className="card-title">Recent Bookings</h2>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Order Details</th>
                <th>Service Info</th>
                <th>Date & Location</th>
                <th>Status</th>
                <th>Assign Manager</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(req)}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>{req.id}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <User size={14} /> {req.customer}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{req.service}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{req.bike}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '14px' }}>
                      <Calendar size={14} color="var(--text-muted)" /> {req.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <MapPin size={14} /> {req.location}
                    </div>
                  </td>
                  <td>
                    {req.status === 'Assigned' ? (
                      <span className="badge badge-success" style={{ display: 'inline-flex', gap: '4px' }}>
                        <CheckCircle2 size={14} /> Assigned
                      </span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select 
                      className="input-field" 
                      style={{ padding: '8px 12px', width: '100%', minWidth: '160px', background: req.assignedTo ? 'var(--bg-hover)' : 'white' }}
                      value={req.assignedTo}
                      onChange={(e) => handleAssignManager(req.id, e.target.value)}
                    >
                      <option value="" disabled>Select Manager</option>
                      {managers.map(mgr => (
                        <option key={mgr} value={mgr}>{mgr}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BookingDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}
