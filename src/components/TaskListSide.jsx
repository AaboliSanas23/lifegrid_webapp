import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskAccordion from "../../../../Project1-todo-app-version1/TaskListingPage/TaskAccordion";
import TaskFilter from "../../../../Project1-todo-app-version1/TaskListingPage/TaskFilter";

const TaskListSide = ({
  tasks,
  yearMonthData,
  activeDate,
  setActiveDate,
  editingTask,
  setEditingTask,
  showFilter,
  setShowFilter,
  filters,
  setFilters,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onToggleReminder
}) => {
  const [expandedYears, setExpandedYears] = useState(new Set(['2026']));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const toggleYear = (year) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const yearKeys = Object.keys(yearMonthData).sort((a, b) => b - a);

  return (
    <motion.div
      className="task-list-side"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="task-list-header">
        <div className="header-main">
          <h2>My Tasks & Expenses</h2>
          <div className="current-date">{formatDate(activeDate).full}</div>
        </div>
        
        <TaskFilter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          filters={filters}
          setFilters={setFilters}
          totalTasks={tasks.length}
          filteredTasksCount={tasks.length}
        />
      </div>

      <div className="year-accordions">
        <AnimatePresence mode="popLayout">
          {yearKeys.length > 0 ? (
            yearKeys.map((year) => {
              const yearData = yearMonthData[year];
              const isYearExpanded = expandedYears.has(year);
              const monthKeys = Object.keys(yearData.months).sort((a, b) => {
                const [yearA, monthA] = a.split('-').map(Number);
                const [yearB, monthB] = b.split('-').map(Number);
                if (yearB !== yearA) return yearB - yearA;
                return monthB - monthA;
              });

              return (
                <motion.div
                  key={year}
                  className="year-accordion"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="year-accordion-header"
                    onClick={() => toggleYear(year)}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="year-title-main">
                      <h3>{year}</h3>
                      <div className="year-indicator-main">
                        {isYearExpanded ? '▼' : '▶'}
                      </div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isYearExpanded && (
                      <motion.div
                        className="year-content-main"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {monthKeys.map((monthKey) => {
                          const monthData = yearData.months[monthKey];
                          
                          return (
                            <TaskAccordion
                              key={monthKey}
                              monthData={monthData}
                              activeDate={activeDate}
                              setActiveDate={setActiveDate}
                              editingTask={editingTask}
                              setEditingTask={setEditingTask}
                              onToggleComplete={onToggleComplete}
                              onEditTask={onEditTask}
                              onDeleteTask={onDeleteTask}
                              onToggleReminder={onToggleReminder}
                            />
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="no-tasks-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="no-tasks-icon">📝</div>
              <h3>No tasks found</h3>
              <p>Try adjusting your filters or add new tasks</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskListSide;