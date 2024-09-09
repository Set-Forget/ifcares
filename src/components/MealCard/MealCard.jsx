import React, { useState, useContext, useMemo, useEffect } from 'react';
import { Checkbox } from 'flowbite-react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import './MealCards.css';

const MealCard = ({ student, selectedSite, selectedDate, datesBySite }) => {
  const {
    selectedCheckboxData,
    handleCheckboxChange,
    updateGlobalCount,
    selectedDateCache,
  } = useContext(MealSiteContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const checkboxState = selectedCheckboxData[student.id] || {
    attendance: false,
    breakfast: false,
    lunch: false,
    snack: false,
    supper: false,
  };
  const [highlightAttendance, setHighlightAttendance] = useState(false);

  const handleLocalCheckboxChange = (category, checked) => {
    if (category === 'attendance') {
      updateCheckboxState(category, checked);
      if (!checked) {
        const resetCheckboxState = {
          attendance: false,
          breakfast: false,
          lunch: false,
          snack: false,
          supper: false,
        };
        handleCheckboxChange(student.id, resetCheckboxState);
        updateGlobalCountsBasedOnAttendance(checkboxState, resetCheckboxState);
      }
    } else {
      if (checkboxState.attendance) {
        updateCheckboxState(category, checked);
      }
    }
  };

  const updateCheckboxState = (category, checked) => {
    const newCheckboxState = {
      ...checkboxState,
      [category]: checked,
    };
    handleCheckboxChange(student.id, newCheckboxState);
    updateGlobalCount(category, checked);
  };

  const updateGlobalCountsBasedOnAttendance = (previousCheckboxState) => {
    ['breakfast', 'lunch', 'snack', 'supper'].forEach((category) => {
      if (previousCheckboxState[category]) {
        updateGlobalCount(category, false);
      }
    });
  };

  // format date from js object to string
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Add this function to get the meal availability for the selected date and site
  const mealAvailability = useMemo(() => {
    const formattedDate = formatDate(selectedDate); // Format the selected date
    const siteData = datesBySite[selectedSite];
    return siteData?.validDates[formattedDate] || {};
  }, [selectedSite, selectedDate, datesBySite]);

  // Use effect to reset the checkboxes when date changes
  useEffect(() => {
    if (selectedDate !== selectedDateCache) {
      // Reset the checkbox state when the selected date changes
      const resetCheckboxState = {
        attendance: false,
        breakfast: false,
        lunch: false,
        snack: false,
        supper: false,
      };
      handleCheckboxChange(student.id, resetCheckboxState);
    }
  }, [selectedDate]);

  // Function to handle clicks on disabled checkboxes
  const handleDisabledCheckboxClick = (e) => {
    // Prevent default checkbox click action
    e.preventDefault();
    // Highlight the attendance checkbox
    setHighlightAttendance(true);
    setTimeout(() => setHighlightAttendance(false), 2000);
  };

  return (
    <div className="w-full rounded-lg bg-white mb-4 shadow">
      <div className="p-4 bg-[#E8FDF5] text-black rounded-t-lg flex justify-between items-center">
        <p className="text-base mb-1 px-2 py-1" style={{ flex: '1 1 0%' }}>
          {student.number}
        </p>
        <p className="text-base mb-1 px-2 py-1" style={{ flex: '2 1 0%' }}>
          {student.name}
        </p>
        <button
          className="text-black text-xl focus:outline-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <FaChevronUp style={{ width: '14px' }} />
          ) : (
            <FaChevronDown style={{ width: '14px' }} />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="flex items-center justify-between p-4 bg-[#E8FDF5]">
          <div className="flex items-center space-x-2">
            <Checkbox
              className={`w-5 h-5 ${
                highlightAttendance
                  ? 'ring-2 ring-inset ring-red-600 transition-all'
                  : ''
              } 
            ${selectedDate === null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              style={{ accentColor: '#6BE3A3' }}
              checked={checkboxState.attendance}
              onChange={(e) =>
                handleLocalCheckboxChange('attendance', e.target.checked)
              }
              disabled={selectedDate === null ? true : false}
            />
            <span className="text-sm">AT</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              onClick={
                !checkboxState.attendance
                  ? handleDisabledCheckboxClick
                  : undefined
              }
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
              <Checkbox
                className={`w-5 h-5 mt-1.5 ${
                  checkboxState.attendance && mealAvailability.brk
                    ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                style={{
                  accentColor: '#6BE3A3',
                  pointerEvents: checkboxState.attendance ? 'auto' : 'none',
                }}
                checked={checkboxState.breakfast}
                onChange={(e) =>
                  handleLocalCheckboxChange('breakfast', e.target.checked)
                }
                disabled={!checkboxState.attendance || !mealAvailability.brk}
              />
            </div>
            <span className="text-sm">BRK</span>
          </div>
          <label className="flex items-center space-x-2">
            <div
              onClick={
                !checkboxState.attendance
                  ? handleDisabledCheckboxClick
                  : undefined
              }
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
              <Checkbox
                className={`mt-1.5 w-5 h-5 ${
                  checkboxState.attendance && mealAvailability.lunch
                    ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                style={{
                  accentColor: '#6BE3A3',
                  pointerEvents: checkboxState.attendance ? 'auto' : 'none',
                }}
                checked={checkboxState.lunch}
                onChange={(e) =>
                  handleLocalCheckboxChange('lunch', e.target.checked)
                }
                disabled={!checkboxState.attendance || !mealAvailability.lunch}
              />
            </div>
            <span className="text-sm">LU</span>
          </label>
          <label className="flex items-center space-x-2">
            <div
              onClick={
                !checkboxState.attendance
                  ? handleDisabledCheckboxClick
                  : undefined
              }
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
              <Checkbox
                className={`mt-1.5 w-5 h-5 ${
                  checkboxState.attendance && mealAvailability.snk
                    ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                style={{
                  accentColor: '#6BE3A3',
                  pointerEvents: checkboxState.attendance ? 'auto' : 'none',
                }}
                checked={checkboxState.snack}
                onChange={(e) =>
                  handleLocalCheckboxChange('snack', e.target.checked)
                }
                disabled={!checkboxState.attendance || !mealAvailability.snk}
              />
            </div>
            <span className="text-sm">SNK</span>
          </label>
          <label className="flex items-center space-x-2">
            <div
              onClick={
                !checkboxState.attendance
                  ? handleDisabledCheckboxClick
                  : undefined
              }
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
              <Checkbox
                className={`mt-1.5 w-5 h-5 ${
                  checkboxState.attendance && mealAvailability.sup
                    ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                style={{
                  accentColor: '#6BE3A3',
                  pointerEvents: checkboxState.attendance ? 'auto' : 'none',
                }}
                checked={checkboxState.supper}
                onChange={(e) =>
                  handleLocalCheckboxChange('supper', e.target.checked)
                }
                disabled={!checkboxState.attendance || !mealAvailability.sup}
              />
            </div>
            <span className="text-sm">SUP</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default MealCard;
