import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, Calendar, Wrench, AlertCircle } from 'lucide-react';
import JobCardModal from '../components/JobCardModal';
import BillingModal from '../components/BillingModal';

const initialColumns = {
  'col-1': {
    id: 'col-1',
    title: 'New / Full Checkup',
    taskIds: ['task-1', 'task-2'],
  },
  'col-2': {
    id: 'col-2',
    title: 'Pending Approval',
    taskIds: ['task-3'],
  },
  'col-3': {
    id: 'col-3',
    title: 'In Progress',
    taskIds: ['task-4'],
  },
  'col-4': {
    id: 'col-4',
    title: 'Ready',
    taskIds: [],
  },
};

const initialTasks = {
  'task-1': { id: 'task-1', customer: 'Alice Johnson', bike: 'Yamaha R15', priority: 'High', type: 'General Service', colId: 'col-1' },
  'task-2': { id: 'task-2', customer: 'Bob Brown', bike: 'Honda CBR', priority: 'Medium', type: 'Oil Change', colId: 'col-1' },
  'task-3': { id: 'task-3', customer: 'Charlie Davis', bike: 'Kawasaki Ninja', priority: 'High', type: 'Engine Repair', colId: 'col-2' },
  'task-4': { id: 'task-4', customer: 'Diana Prince', bike: 'Triumph', priority: 'Low', type: 'Chain Lube', colId: 'col-3' },
};

export default function ServiceManagerDashboard() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [columnOrder] = useState(['col-1', 'col-2', 'col-3', 'col-4']);

  const [selectedTask, setSelectedTask] = useState(null);
  const [billingData, setBillingData] = useState(null);

  const openJobCard = (task) => {
    // Find which column this task is currently in to pass it down
    let currentColId = 'col-1';
    for (const col of Object.values(columns)) {
      if (col.taskIds.includes(task.id)) {
        currentColId = col.id;
        break;
      }
    }
    setSelectedTask({ ...task, colId: currentColId });
  };
  const closeJobCard = () => setSelectedTask(null);

  const openBilling = (task, serviceItems) => {
    setSelectedTask(null); // Close job card
    setBillingData({ task, serviceItems });
  };
  const closeBilling = () => setBillingData(null);

  const moveTaskToColumn = (taskId, targetColId) => {
    let sourceColId = null;
    for (const col of Object.values(columns)) {
      if (col.taskIds.includes(taskId)) {
        sourceColId = col.id;
        break;
      }
    }

    if (sourceColId && sourceColId !== targetColId) {
      setColumns(prev => {
        const sourceTaskIds = Array.from(prev[sourceColId].taskIds);
        sourceTaskIds.splice(sourceTaskIds.indexOf(taskId), 1);
        
        const targetTaskIds = Array.from(prev[targetColId].taskIds);
        targetTaskIds.push(taskId);

        return {
          ...prev,
          [sourceColId]: { ...prev[sourceColId], taskIds: sourceTaskIds },
          [targetColId]: { ...prev[targetColId], taskIds: targetTaskIds }
        };
      });
      // Optionally update the selected task state if it's open so the modal refreshes
      setSelectedTask(prev => prev && prev.id === taskId ? { ...prev, colId: targetColId } : prev);
    }
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: { ...prev[taskId], ...updates }
    }));
    // Also update selectedTask if it's currently open
    setSelectedTask(prev => prev && prev.id === taskId ? { ...prev, ...updates } : prev);
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setColumns({ ...columns, [start.id]: { ...start, taskIds: newTaskIds } });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setColumns({ ...columns, [newStart.id]: newStart, [newFinish.id]: newFinish });
    
    // Update task's colId reference
    setTasks(prev => ({
        ...prev,
        [draggableId]: { ...prev[draggableId], colId: newFinish.id }
    }));
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Service Workflow</h1>
        <p style={{ color: 'var(--text-muted)' }}>Drag and drop service requests across the pipeline.</p>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columnOrder.map((colId) => {
            const column = columns[colId];
            const colTasks = column.taskIds.map(taskId => tasks[taskId]);

            return (
              <div key={column.id} style={{ display: 'flex', flexDirection: 'column', width: '320px', minWidth: '320px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{column.title} <span style={{ background: 'var(--bg-card)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', marginLeft: '8px' }}>{colTasks.length}</span></h3>
                  <MoreHorizontal size={18} color="var(--text-muted)" />
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ flex: 1, minHeight: '100px', transition: 'background 0.2s', background: snapshot.isDraggingOver ? 'var(--primary-light)' : 'transparent', borderRadius: 'var(--radius-sm)' }}>
                      {colTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => openJobCard(task)}
                                className="card"
                                style={{
                                padding: '16px',
                                marginBottom: '12px',
                                background: 'var(--bg-card)',
                                boxShadow: snapshot.isDragging ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                                ...provided.draggableProps.style
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span className={`badge ${task.priority === 'High' ? 'badge-danger' : task.priority === 'Medium' ? 'badge-warning' : 'badge-primary'}`}>
                                  {task.priority}
                                </span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>#{task.id.split('-')[1]}</span>
                              </div>
                              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{task.customer}</h4>
                              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Wrench size={14} /> {task.bike}
                              </p>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                  <Calendar size={14} /> Today
                                </div>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: 'var(--primary)' }}>
                                  JD
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>

      {selectedTask && (
        <JobCardModal 
          task={selectedTask} 
          onClose={closeJobCard} 
          onGenerateBill={openBilling} 
          moveTaskToColumn={moveTaskToColumn}
          updateTask={updateTask}
        />
      )}

      {billingData && (
        <BillingModal 
          task={billingData.task} 
          serviceItems={billingData.serviceItems} 
          onClose={closeBilling} 
        />
      )}
    </div>
  );
}
