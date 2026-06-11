import React, { useState } from 'react';
import { X, Wrench, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export default function JobCardModal({ task, onClose, onGenerateBill }) {
  const [completedItems, setCompletedItems] = useState([]);
  const currencySymbol = localStorage.getItem('currencySymbol') || '$';
  
  const serviceItems = [
    { id: 'item1', name: 'Engine Oil Replacement', cost: 45.00 },
    { id: 'item2', name: 'Brake Pad Check & Replace', cost: 120.00 },
    { id: 'item3', name: 'Chain Lubrication & Adjustment', cost: 25.00 },
    { id: 'item4', name: 'General Labor', cost: 80.00 },
  ];

  const toggleItem = (id) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter(i => i !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  const isAllCompleted = completedItems.length === serviceItems.length;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div className="card-header" style={{ background: 'var(--bg-hover)' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Job Card: #{task.id.split('-')[1]}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{task.customer} - {task.bike}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} color="var(--text-muted)" />
          </button>
        </div>

        {/* Body */}
        <div className="card-body" style={{ overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--primary)', fontWeight: 600 }}>
            <Wrench size={20} />
            <span>Service Checklist</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {serviceItems.map(item => {
              const isChecked = completedItems.includes(item.id);
              return (
                <div 
                  key={item.id} 
                  onClick={() => toggleItem(item.id)}
                  style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: '16px', border: `1px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`, 
                    borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    background: isChecked ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isChecked ? 'var(--primary)' : 'transparent' }}>
                      {isChecked && <CheckCircle size={16} color="white" />}
                    </div>
                    <span style={{ fontWeight: 500, color: isChecked ? 'var(--primary-hover)' : 'var(--text-main)' }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{currencySymbol}{item.cost.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button 
            className="btn btn-primary" 
            disabled={!isAllCompleted}
            onClick={() => onGenerateBill(task, serviceItems)}
            style={{ opacity: isAllCompleted ? 1 : 0.5, cursor: isAllCompleted ? 'pointer' : 'not-allowed' }}
          >
            <FileText size={18} /> Generate Automated Bill
          </button>
        </div>
      </div>
    </div>
  );
}
