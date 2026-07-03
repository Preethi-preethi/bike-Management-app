import React, { useState } from 'react';
import { Search, Eye, FileText } from 'lucide-react';

export default function ServiceHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Pending', 'Approved', 'Paid', 'Rejected'];

  const history = [
    { id: 'INV-2026-001', date: '2026-06-01', customer: 'Emma Watson', bike: 'Royal Enfield Classic', amount: 4500, status: 'approved' },
    { id: 'INV-2026-002', date: '2026-06-02', customer: 'David Beckham', bike: 'Triumph Bonneville', amount: 12000, status: 'paid' },
    { id: 'INV-2026-003', date: '2026-06-04', customer: 'Tony Stark', bike: 'Audi R-Bike', amount: 8500, status: 'pending' },
  ];

  const filteredHistory = history.filter(h => {
    const matchesSearch = h.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          h.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.bike.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || h.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px' }}>Service History & Invoices</h2>
        
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: '44px', paddingRight: '16px', paddingTop: '14px', paddingBottom: '14px', borderRadius: '24px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }} 
            placeholder="Search by ID or customer..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                border: `1px solid ${activeFilter === filter ? 'var(--google-blue)' : '#e2e8f0'}`,
                background: activeFilter === filter ? 'var(--google-blue)' : 'white',
                color: activeFilter === filter ? 'white' : 'var(--text-muted)',
                fontWeight: activeFilter === filter ? '600' : '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden', minHeight: '300px' }}>
        {filteredHistory.length > 0 ? (
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
                    <span className={`badge ${
                      item.status === 'approved' ? 'badge-blue' : 
                      item.status === 'paid' ? 'badge-green' : 
                      item.status === 'rejected' ? 'badge-red' : 
                      'badge-yellow'
                    }`} style={{ textTransform: 'capitalize' }}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '4px 8px' }}>
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-muted)' }}>
            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
              <FileText size={32} color="#94a3b8" />
            </div>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>No invoices found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
