import React from 'react';
import { motion } from 'framer-motion';
// import TaskEditForm from '../components/';

const TaskCard = ({ 
  task, 
  editingTask, 
  setEditingTask, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask 
}) => {
  const calculateTaskProgress = (task) => {
    if (task.completed) return 100;

    const now = new Date();
    const today = new Date().toISOString().split("T")[0];

    if (task.dueDate !== today) return 0;

    const taskStart = new Date(`${task.dueDate}T${task.startTime}`);
    const taskEnd = new Date(`${task.dueDate}T${task.endTime}`);

    if (now < taskStart) return 0;
    if (now > taskEnd) return 100;

    const totalDuration = taskEnd - taskStart;
    const elapsed = now - taskStart;
    return Math.min((elapsed / totalDuration) * 100, 100);
  };

  const calculateTotalBudget = (budgetItems) => {
    return budgetItems.reduce((total, item) => total + parseInt(item.price || 0), 0);
  };

  const taskProgress = calculateTaskProgress(task);
  const isToday = task.dueDate === new Date().toISOString().split("T")[0];

  return (
    <motion.div
      className={`task-card ${task.completed ? "completed" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      layout
    >
      {/* Green Line for Completed Tasks */}
      {task.completed && <div className="completion-line"></div>}

      {/* Task Progress Bar - Only show for today's tasks */}
      {isToday && !task.completed && (
        <div className="task-progress-bar">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${taskProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="progress-time">
            {taskProgress === 100 ? 'Time elapsed' : `${Math.round(taskProgress)}% through task time`}
          </div>
        </div>
      )}

      <div className="task-time">
        {task.startTime} - {task.endTime}
      </div>
      
      <div className="task-content">
        {editingTask && editingTask.id === task.id ? (
          <TaskEditForm
            task={editingTask}
            setTask={setEditingTask}
            onSave={onEditTask}
            onCancel={() => setEditingTask(null)}
          />
        ) : (
          <>
            <div className="task-header">
              <h3 className="task-name">{task.taskName}</h3>
              <div className="task-actions">
                {task.needsBudget && (
                  <motion.span className="budget-badge" whileHover={{ scale: 1.1 }}>
                    💰 Budget
                  </motion.span>
                )}
                <div className="action-buttons">
                  <div className="tooltip-container">
                    <motion.button 
                      onClick={() => onToggleComplete(task.id)}
                      className={`complete-btn ${task.completed ? 'completed' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {task.completed ? '✓' : '○'}
                    </motion.button>
                    <span className="tooltip-text">
                      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </span>
                  </div>
                  
                  <div className="tooltip-container">
                    <motion.button 
                      onClick={() => setEditingTask(task)}
                      className="edit-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✏️
                    </motion.button>
                    <span className="tooltip-text">Edit Task</span>
                  </div>
                  
                  <div className="tooltip-container">
                    <motion.button 
                      onClick={() => onDeleteTask(task.id)}
                      className="delete-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🗑️
                    </motion.button>
                    <span className="tooltip-text">Delete Task</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="task-description">{task.description}</p>
            
            {task.needsBudget && task.budgetItems && task.budgetItems.length > 0 && (
              <motion.div 
                className="budget-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h4>Budget Items:</h4>
                <div className="budget-items">
                  {task.budgetItems.map((item, itemIndex) => (
                    <motion.div 
                      key={itemIndex} 
                      className="budget-item"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="budget-total">
                  Total: ${calculateTotalBudget(task.budgetItems)}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;