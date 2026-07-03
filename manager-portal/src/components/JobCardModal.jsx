import React, { useState } from 'react';
import { X, Wrench, CheckCircle, FileText, Plus, AlertCircle } from 'lucide-react';

export default function JobCardModal({ task, onClose, onGenerateBill, moveTaskToColumn, updateTask }) {
  const [completedItems, setCompletedItems] = useState(task.completedItems || []);
  
  // Base service items for this task. Using task.serviceItems if they exist, otherwise default.
  const [serviceItems, setServiceItems] = useState(task.serviceItems || [
    { id: 'item1', name: 'Engine Oil Replacement', cost: 45.00 },
    { id: 'item2', name: 'Brake Pad Check & Replace', cost: 120.00 },
    { id: 'item3', name: 'Chain Lubrication & Adjustment', cost: 25.00 },
    { id: 'item4', name: 'General Labor', cost: 80.00 },
  ]);

  // Identified additional issues
  const [identifiedIssues, setIdentifiedIssues] = useState(task.identifiedIssues || []);
  const [newIssueName, setNewIssueName] = useState('');
  const [newIssueCost, setNewIssueCost] = useState('');

  const currencySymbol = localStorage.getItem('currencySymbol') || '$';

  const toggleItem = (id) => {
    let newCompleted;
    if (completedItems.includes(id)) {
      newCompleted = completedItems.filter(i => i !== id);
    } else {
      newCompleted = [...completedItems, id];
    }
    setCompletedItems(newCompleted);
    if (updateTask) {
      updateTask(task.id, { completedItems: newCompleted });
    }
  };

  const handleAddIssue = () => {
    if (newIssueName.trim() && newIssueCost) {
      const newIssue = {
        id: `issue-${Date.now()}`,
        name: newIssueName,
        cost: parseFloat(newIssueCost)
      };
      const newIssues = [...identifiedIssues, newIssue];
      setIdentifiedIssues(newIssues);
      if (updateTask) {
        updateTask(task.id, { identifiedIssues: newIssues });
      }
      setNewIssueName('');
      setNewIssueCost('');
    }
  };

  const handleRequestApproval = () => {
    // Transition to Pending Approval (col-2)
    if (moveTaskToColumn) {
      moveTaskToColumn(task.id, 'col-2');
    }
  };

  const handleMarkApproved = () => {
    // Transition to In Progress (col-3)
    if (moveTaskToColumn) {
      // Add the approved issues to the main service items list
      const combinedItems = [...serviceItems, ...identifiedIssues];
      setServiceItems(combinedItems);
      
      if (updateTask) {
        updateTask(task.id, { 
          serviceItems: combinedItems,
          identifiedIssues: [] // Clear them out once approved
        });
      }
      
      moveTaskToColumn(task.id, 'col-3');
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
        <div className="card-body" style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Default Services */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--primary)', fontWeight: 600 }}>
              <Wrench size={20} />
              <span>Service Checklist</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceItems.map(item => {
                const isChecked = completedItems.includes(item.id);
                // Only allow checking if in col-3 (In Progress) or col-4
                const canCheck = task.colId === 'col-3' || task.colId === 'col-4';

                return (
                  <div 
                    key={item.id} 
                    onClick={() => canCheck && toggleItem(item.id)}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      padding: '16px', border: `1px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`, 
                      borderRadius: 'var(--radius-sm)', cursor: canCheck ? 'pointer' : 'default',
                      background: isChecked ? 'var(--primary-light)' : 'transparent',
                      transition: 'all 0.2s',
                      opacity: canCheck ? 1 : 0.7
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

          {/* Phase 1: Full Checkup - Identify Issues */}
          {task.colId === 'col-1' && (
            <div style={{ padding: '16px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} color="var(--google-yellow)" /> Identify Additional Issues
              </h3>
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Issue description..." 
                  value={newIssueName}
                  onChange={(e) => setNewIssueName(e.target.value)}
                  style={{ flex: 1 }}
                />
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="Cost" 
                  value={newIssueCost}
                  onChange={(e) => setNewIssueCost(e.target.value)}
                  style={{ width: '100px' }}
                />
                <button className="btn btn-outline" onClick={handleAddIssue} style={{ padding: '0 16px' }}>
                  <Plus size={18} />
                </button>
              </div>

              {identifiedIssues.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Identified:</h4>
                  {identifiedIssues.map(issue => (
                    <div key={issue.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <span>{issue.name}</span>
                      <span style={{ fontWeight: 600 }}>{currencySymbol}{issue.cost.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Phase 2: Pending Approval - Read Only */}
          {task.colId === 'col-2' && identifiedIssues.length > 0 && (
             <div style={{ padding: '16px', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)' }}>
               <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'var(--primary-hover)' }}>Waiting for Customer Approval</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {identifiedIssues.map(issue => (
                    <div key={issue.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: 'var(--radius-sm)', color: 'black' }}>
                      <span>{issue.name}</span>
                      <span style={{ fontWeight: 600 }}>{currencySymbol}{issue.cost.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
             </div>
          )}

        </div>

        {/* Footer Actions based on Phase */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          
          {task.colId === 'col-1' && (
            <button 
              className="btn btn-primary" 
              onClick={handleRequestApproval}
            >
              Request Approval
            </button>
          )}

          {task.colId === 'col-2' && (
             <button 
              className="btn btn-primary" 
              onClick={handleMarkApproved}
            >
              Mark as Approved (Manual)
            </button>
          )}

          {(task.colId === 'col-3' || task.colId === 'col-4') && (
            <button 
              className="btn btn-primary" 
              disabled={!isAllCompleted}
              onClick={() => onGenerateBill(task, serviceItems)}
              style={{ opacity: isAllCompleted ? 1 : 0.5, cursor: isAllCompleted ? 'pointer' : 'not-allowed' }}
            >
              <FileText size={18} /> Generate Automated Bill
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
