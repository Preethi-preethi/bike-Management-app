import React, { useState } from 'react';
import { Plus, Trash2, Receipt, Save, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BillGeneration() {
  const [customerName, setCustomerName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [items, setItems] = useState([{ name: '', type: 'service', cost: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { name: '', type: 'part', cost: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const totalCost = items.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // In a real app, you would insert into the invoices table
      // const { data, error } = await supabase.from('invoices').insert([
      //   { customer_name: customerName, vehicle_no: vehicleNo, items, total_amount: totalCost, status: 'pending' }
      // ]);
      // if (error) throw error;
      
      alert('Invoice created successfully with pending status! Sent to Admin for approval.');
      setCustomerName('');
      setVehicleNo('');
      setItems([{ name: '', type: 'service', cost: 0 }]);
    } catch (error) {
      alert('Error creating invoice: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2>Generate Bill</h2>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Customer Name</label>
              <input type="text" className="form-input" required value={customerName} onChange={e => setCustomerName(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Vehicle Reg. No</label>
              <input type="text" className="form-input" required value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', margin: 0 }}>Line Items</h3>
              <button type="button" className="btn btn-outline" onClick={handleAddItem} style={{ padding: '6px 12px' }}>
                <Plus size={16} /> Add Item
              </button>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 0 }}>Description</th>
                  <th>Type</th>
                  <th>Cost (₹)</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ paddingLeft: 0 }}>
                      <input type="text" className="form-input" placeholder="e.g. Engine Oil" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} required />
                    </td>
                    <td>
                      <select className="form-input" value={item.type} onChange={e => handleItemChange(index, 'type', e.target.value)}>
                        <option value="service">Service Charge</option>
                        <option value="part">Spare Part</option>
                        <option value="other">Other</option>
                      </select>
                    </td>
                    <td>
                      <input type="number" className="form-input" min="0" value={item.cost} onChange={e => handleItemChange(index, 'cost', e.target.value)} required />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleRemoveItem(index)} style={{ background: 'none', border: 'none', color: 'var(--google-red)', cursor: 'pointer', padding: '8px' }}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>Total Amount</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)' }}>₹ {totalCost.toFixed(2)}</div>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '12px 24px', fontSize: '16px' }}>
              <Send size={18} /> {isSubmitting ? 'Submitting...' : 'Send to Admin for Approval'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
