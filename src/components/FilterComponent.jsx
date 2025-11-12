import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FilterComponent = ({ 
  filters, 
  onFilterChange, 
  onDateRangeChange, 
  onClearFilters, 
  onClearDateRange,
  taskStats 
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showYearCalendar, setShowYearCalendar] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showDateRangeCalendar, setShowDateRangeCalendar] = useState({
    start: false,
    end: false
  });

  const yearCalendarRef = useRef(null);
  const monthSelectorRef = useRef(null);
  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);
  const filterRef = useRef(null);

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearCalendarRef.current && !yearCalendarRef.current.contains(event.target)) {
        setShowYearCalendar(false);
      }
      if (monthSelectorRef.current && !monthSelectorRef.current.contains(event.target)) {
        setShowMonthSelector(false);
      }
      if (startCalendarRef.current && !startCalendarRef.current.contains(event.target)) {
        setShowDateRangeCalendar(prev => ({ ...prev, start: false }));
      }
      if (endCalendarRef.current && !endCalendarRef.current.contains(event.target)) {
        setShowDateRangeCalendar(prev => ({ ...prev, end: false }));
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.year || (filters.months && filters.months.length > 0) || filters.dateRange.start || filters.dateRange.end;
  };

  // Generate years (from 2020 to 2030)
  const generateYears = () => {
    const years = [];
    for (let year = 2020; year <= 2030; year++) {
      years.push(year);
    }
    return years;
  };

  // Generate all 12 months
  const generateMonths = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(2024, month, 1);
      months.push({
        value: month.toString(),
        label: date.toLocaleDateString('en-US', { month: 'long' }),
        shortLabel: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return months;
  };

  // Handle month checkbox change
  const handleMonthChange = (monthValue) => {
    const currentMonths = filters.months || [];
    const newMonths = currentMonths.includes(monthValue)
      ? currentMonths.filter(m => m !== monthValue)
      : [...currentMonths, monthValue];
    
    onFilterChange('months', newMonths);
  };

  // Select all months
  const selectAllMonths = () => {
    const allMonths = generateMonths().map(month => month.value);
    onFilterChange('months', allMonths);
  };

  // Clear all months
  const clearAllMonths = () => {
    onFilterChange('months', []);
  };

  // Get selected month labels for display
  const getSelectedMonthLabels = () => {
    if (!filters.months || filters.months.length === 0) return "All Months";
    if (filters.months.length === 12) return "All Months";
    if (filters.months.length === 1) {
      const month = generateMonths().find(m => m.value === filters.months[0]);
      return month?.label || "1 month";
    }
    if (filters.months.length <= 3) {
      return filters.months.map(monthValue => {
        const month = generateMonths().find(m => m.value === monthValue);
        return month?.shortLabel;
      }).join(", ");
    }
    return `${filters.months.length} months selected`;
  };

  // Calendar component for year selection with calendar-style layout
  const YearCalendar = () => {
    const [currentDecade, setCurrentDecade] = useState(filters.year ? Math.floor(filters.year / 10) * 10 : 2020);
    
    const navigateDecade = (direction) => {
      setCurrentDecade(prev => prev + (direction * 10));
    };

    const generateDecadeYears = () => {
      const years = [];
      for (let year = currentDecade - 1; year <= currentDecade + 10; year++) {
        years.push(year);
      }
      return years;
    };

    const isCurrentYear = (year) => {
      const currentYear = new Date().getFullYear();
      return year === currentYear;
    };

    const isSelected = (year) => {
      return filters.year === year.toString();
    };

    return (
      <motion.div 
        ref={yearCalendarRef}
        className="calendar-popup year-calendar"
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          zIndex: 1000,
          marginTop: '0.5rem'
        }}
      >
        <div className="calendar-header">
          <motion.button 
            onClick={() => navigateDecade(-10)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="calendar-nav-btn"
          >
            ‹‹
          </motion.button>
          <span className="calendar-decade-range">
            {currentDecade - 1} - {currentDecade + 10}
          </span>
          <motion.button 
            onClick={() => navigateDecade(10)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="calendar-nav-btn"
          >
            ››
          </motion.button>
        </div>
        
        <div className="calendar-grid years-grid">
          {generateDecadeYears().map(year => (
            <motion.button
              key={year}
              className={`calendar-cell year-cell ${
                isCurrentYear(year) ? 'today' : ''
              } ${isSelected(year) ? 'selected' : ''} ${
                year < currentDecade || year > currentDecade + 9 ? 'other-decade' : ''
              }`}
              onClick={() => {
                onFilterChange('year', year.toString());
                setShowYearCalendar(false);
              }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              {year}
            </motion.button>
          ))}
        </div>
        
        <div className="calendar-footer">
          <motion.button
            className="current-year-btn"
            onClick={() => {
              const currentYear = new Date().getFullYear().toString();
              onFilterChange('year', currentYear);
              setShowYearCalendar(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Current Year
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Month selector with visible checkboxes
  const MonthSelector = () => (
    <motion.div 
      ref={monthSelectorRef}
      className="calendar-popup month-selector"
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
    >
      <div className="month-selector-header">
        <h5>Select Months</h5>
        <div className="month-actions">
          <button 
            onClick={selectAllMonths} 
            className="action-btn"
          >
            All
          </button>
          <button 
            onClick={clearAllMonths} 
            className="action-btn"
          >
            None
          </button>
        </div>
      </div>
      
      <div className="selection-info">
        {filters.months && filters.months.length > 0 ? (
          <span className="selected-count">
            {filters.months.length} month{filters.months.length !== 1 ? 's' : ''} selected
          </span>
        ) : (
          <span>No months selected</span>
        )}
      </div>
      
      <div className="months-grid">
        {generateMonths().map(month => (
          <label 
            key={month.value} 
            className="month-checkbox-label"
          >
            <input
              type="checkbox"
              checked={filters.months?.includes(month.value) || false}
              onChange={() => handleMonthChange(month.value)}
              className="month-checkbox"
            />
            <span className="month-checkbox-custom"></span>
            <span className="month-label">
              {month.label}
            </span>
          </label>
        ))}
      </div>

      <div className="month-selector-footer">
        <button 
          className="apply-months-btn"
          onClick={() => setShowMonthSelector(false)}
        >
          Apply Selection
        </button>
      </div>
    </motion.div>
  );

  // Calendar component for date selection
  const DateCalendar = ({ type, selectedDate, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const calendarRef = type === 'start' ? startCalendarRef : endCalendarRef;
    
    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const generateCalendarDays = () => {
      const days = [];
      const daysInMonth = getDaysInMonth(currentDate);
      const firstDay = getFirstDayOfMonth(currentDate);
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        days.push(date);
      }
      
      return days;
    };

    const navigateMonth = (direction) => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
    };

    const isToday = (date) => {
      const today = new Date();
      return date.getDate() === today.getDate() && 
             date.getMonth() === today.getMonth() && 
             date.getFullYear() === today.getFullYear();
    };

    const isSelected = (date) => {
      if (!selectedDate) return false;
      const compareDate = new Date(selectedDate);
      return date.getDate() === compareDate.getDate() && 
             date.getMonth() === compareDate.getMonth() && 
             date.getFullYear() === compareDate.getFullYear();
    };

    const handleDateSelection = (date) => {
      if (date) {
        onDateSelect(date.toISOString().split('T')[0]);
        setShowDateRangeCalendar(prev => ({ ...prev, [type]: false }));
        
        // If selecting start date and end date is empty, auto-set end date to same day
        if (type === 'start' && !filters.dateRange.end) {
          onDateRangeChange('end', date.toISOString().split('T')[0]);
        }
        // If selecting end date and start date is empty, auto-set start date to same day
        if (type === 'end' && !filters.dateRange.start) {
          onDateRangeChange('start', date.toISOString().split('T')[0]);
        }
      }
    };

    return (
      <motion.div 
        ref={calendarRef}
        className="calendar-popup date-calendar"
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          zIndex: 1000,
          marginTop: '0.5rem'
        }}
      >
        <div className="calendar-header">
          <motion.button 
            onClick={() => navigateMonth(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="calendar-nav-btn"
          >
            ‹
          </motion.button>
          <span className="calendar-month-year">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <motion.button 
            onClick={() => navigateMonth(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="calendar-nav-btn"
          >
            ›
          </motion.button>
        </div>
        
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-grid days-grid">
          {generateCalendarDays().map((date, index) => (
            <motion.button
              key={index}
              className={`calendar-cell day-cell ${
                !date ? 'empty' : ''
              } ${isToday(date) ? 'today' : ''} ${
                isSelected(date) ? 'selected' : ''
              }`}
              onClick={() => handleDateSelection(date)}
              disabled={!date}
              whileHover={date ? { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" } : {}}
              whileTap={date ? { scale: 0.95 } : {}}
            >
              {date ? date.getDate() : ''}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="filter-section" ref={filterRef}>
      <motion.button
        className={`filter-btn ${hasActiveFilters() ? 'active' : ''}`}
        onClick={() => setShowFilter(!showFilter)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="filter-icon">🔍</span>
        Filter
        {hasActiveFilters() && <div className="filter-dot"></div>}
        {filters.months && filters.months.length > 0 && (
          <span className="month-badge">{filters.months.length}</span>
        )}
      </motion.button>

      <AnimatePresence>
        {showFilter && (
          <motion.div
            className="filter-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              zIndex: 1000,
              marginTop: '0.5rem'
            }}
          >
            <div className="filter-header">
              <h4>Filter Tasks</h4>
              {hasActiveFilters() && (
                <motion.button
                  className="clear-filters-btn"
                  onClick={onClearFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All
                </motion.button>
              )}
            </div>
            
            <div className="filter-fields">
              {/* Year Filter with Calendar */}
              <div className="filter-field">
                <label>Year</label>
                <div className="calendar-input-container" style={{ position: 'relative' }}>
                  <motion.button
                    className="calendar-input"
                    onClick={() => {
                      setShowYearCalendar(!showYearCalendar);
                      setShowMonthSelector(false);
                      setShowDateRangeCalendar({ start: false, end: false });
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {filters.year || "Select Year"}
                    <span className="calendar-icon">📅</span>
                  </motion.button>
                  
                  <AnimatePresence>
                    {showYearCalendar && (
                      <YearCalendar />
                    )}
                  </AnimatePresence>
                  
                  {filters.year && (
                    <motion.button 
                      className="clear-field-btn"
                      onClick={() => onFilterChange('year', '')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                  )}
                </div>
              </div>
              
              {/* Month Filter with Checkboxes - MULTIPLE SELECTION */}
              <div className="filter-field">
                <label>Month</label>
                <div className="calendar-input-container" style={{ position: 'relative' }}>
                  <motion.button
                    className={`calendar-input ${filters.months && filters.months.length > 0 ? 'has-selection' : ''}`}
                    onClick={() => {
                      setShowMonthSelector(!showMonthSelector);
                      setShowYearCalendar(false);
                      setShowDateRangeCalendar({ start: false, end: false });
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="month-display">
                      {getSelectedMonthLabels()}
                      {filters.months && filters.months.length > 0 && (
                        <span className="selection-indicator">✓</span>
                      )}
                    </span>
                    <span className="calendar-icon">📅</span>
                  </motion.button>
                  
                  <AnimatePresence>
                    {showMonthSelector && (
                      <MonthSelector />
                    )}
                  </AnimatePresence>
                  
                  {(filters.months && filters.months.length > 0) && (
                    <motion.button 
                      className="clear-field-btn"
                      onClick={clearAllMonths}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                  )}
                </div>
              </div>
              
              {/* Date Range Filter with Calendar */}
              <div className="filter-field">
                <label>Date Range</label>
                <div className="date-range-fields">
                  <div className="calendar-input-container" style={{ position: 'relative' }}>
                    <motion.button
                      className="calendar-input date-input"
                      onClick={() => {
                        setShowDateRangeCalendar(prev => ({ 
                          ...prev, 
                          start: !prev.start,
                          end: false 
                        }));
                        setShowYearCalendar(false);
                        setShowMonthSelector(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {filters.dateRange.start || "Start date"}
                      <span className="calendar-icon">📅</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showDateRangeCalendar.start && (
                        <DateCalendar 
                          type="start"
                          selectedDate={filters.dateRange.start}
                          onDateSelect={(date) => onDateRangeChange('start', date)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <span className="date-range-separator">to</span>
                  
                  <div className="calendar-input-container" style={{ position: 'relative' }}>
                    <motion.button
                      className="calendar-input date-input"
                      onClick={() => {
                        setShowDateRangeCalendar(prev => ({ 
                          ...prev, 
                          end: !prev.end,
                          start: false 
                        }));
                        setShowYearCalendar(false);
                        setShowMonthSelector(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {filters.dateRange.end || "End date"}
                      <span className="calendar-icon">📅</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showDateRangeCalendar.end && (
                        <DateCalendar 
                          type="end"
                          selectedDate={filters.dateRange.end}
                          onDateSelect={(date) => onDateRangeChange('end', date)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <button 
                    className="clear-date-range-btn"
                    onClick={onClearDateRange}
                    type="button"
                  >
                    Clear range
                  </button>
                )}
              </div>
            </div>
            
            <div className="filter-stats">
              <span>Showing {taskStats.filtered} of {taskStats.total} tasks</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterComponent;