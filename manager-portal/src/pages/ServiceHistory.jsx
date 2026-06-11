import React, { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';

export default function ServiceHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const history = [
    { id: 'INV-2026-001', date: '2026-06-01', customer: 'Emma Watson', bike: 'Royal Enfield Classic', amount: 4500, status: 'approved' },
    { id: 'INV-2026-002', date: '2026-06-02', customer: 'David Beckham', bike: 'Triumph Bonneville', amount: 12000, status: 'approved' },
    { id: 'INV-2026-003', date: '2026-06-04', customer: 'Tony Stark', bike: 'Audi R-Bike', amount: 8500, status: 'pending' },
  ];

  const filteredHistory = history.filter(h => 
    h.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.bike.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Service History & Invoices</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '36px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px' }} 
              placeholder="Search invoices..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline" style={{ padding: '8px 12px' }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Vehicle Info</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((item, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 600, color: 'var(--google-blue)' }}>{item.id}</td>
                <td>{item.date}</td>
                <td style={{ fontWeight: 500 }}>{item.customer}</td>
                <td style={{ color: 'var(--text-muted)' }}>{item.bike}</td>
                <td style={{ fontWeight: 600 }}>₹{item.amount.toLocaleString()}</td>
                <td>
                  <span className={`badge ${item.status === 'approved' ? 'badge-green' : 'badge-yellow'}`}>
                    {item.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '4px 8px' }}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredHistory.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
