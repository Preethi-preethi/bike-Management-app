import React, { useState } from 'react';
import { MoreVertical, MessageSquare, Clock, MapPin } from 'lucide-react';

export default function ServiceRequests() {
  const [columns, setColumns] = useState([
    { id: 'pending', title: 'Pending Approval', statusColor: 'var(--google-yellow)', tasks: [
      { id: 1, customer: 'John Doe', bike: 'Yamaha MT-15', issue: 'Oil Change', time: '10:00 AM' }
    ] },
    { id: 'approved', title: 'Approved & Assigned', statusColor: 'var(--google-blue)', tasks: [
      { id: 2, customer: 'Alice Smith', bike: 'Honda CB350', issue: 'Brake Pads', time: '11:30 AM' }
    ] },
    { id: 'in_progress', title: 'In Progress', statusColor: 'var(--google-blue)', tasks: [] },
    { id: 'completed', title: 'Completed', statusColor: 'var(--google-green)', tasks: [] }
  ]);

  const moveTask = (taskId, sourceColId, destColId) => {
    setColumns(prev => {
      const newCols = [...prev];
      const sourceCol = newCols.find(c => c.id === sourceColId);
      const destCol = newCols.find(c => c.id === destColId);
      const taskIndex = sourceCol.tasks.findIndex(t => t.id === taskId);
      const [task] = sourceCol.tasks.splice(taskIndex, 1);
      destCol.tasks.push(task);
      return newCols;
    });
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '24px' }}>Service Board</h2>
      
      <div className="kanban-board">
        {columns.map(col => (
          <div key={col.id} className="kanban-column glass-panel">
            <div className="kanban-col-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: col.statusColor }}></span>
                {col.title} <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>({col.tasks.length})</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '100px' }}>
              {col.tasks.map(task => (
                <div key={task.id} className="glass-card" style={{ padding: '16px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600 }}>{task.bike}</div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><MoreVertical size={16} /></button>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {task.issue}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {task.time}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {col.id !== 'completed' && (
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => moveTask(task.id, col.id, columns[columns.findIndex(c => c.id === col.id) + 1].id)}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {col.tasks.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', border: '1px dashed var(--glass-border)', borderRadius: 'var(--radius-sm)' }}>
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
