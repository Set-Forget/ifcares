import React, { useContext, useMemo, useEffect, useState } from 'react';
import { Checkbox, Table } from 'flowbite-react';
import './MealTableRow.css';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';

const MealTableRow = ({ student, selectedSite, selectedDate, datesBySite }) => {
  const {
    selectedCheckboxData,
    handleCheckboxChange,
    updateGlobalCount,
    selectedDateCache,
  } = useContext(MealSiteContext);

  const checkboxState = selectedCheckboxData[student.id] || {
    attendance: false,
    breakfast: false,
    lunch: false,
    snack: false,
    supper: false,
  };
  const [highlightAttendance, setHighlightAttendance] = useState(false);

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

  const handleLocalCheckboxChange = (category, checked) => {
    // If trying to update attendance, always allow
    if (category === 'attendance') {
      // Update the state for attendance checkbox
      updateCheckboxState(category, checked);
      // If attendance is unchecked, reset all other checkboxes
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
      // For other categories, check if attendance is true
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

  const updateGlobalCountsBasedOnAttendance = (
    previousCheckboxState,
    resetCheckboxState
  ) => {
    // Loop through each category except 'attendance'
    ['breakfast', 'lunch', 'snack', 'supper'].forEach((category) => {
      // Check if the checkbox was previously checked
      if (previousCheckboxState[category]) {
        // Decrement the global count only if it was checked
        updateGlobalCount(category, false);
      }
    });
  };

  // // Update the local state
  // setCheckboxState(updatedCheckboxState);

  // // Pass the updated state to the parent component
  // onCheckboxChange(student.number, updatedCheckboxState);

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
    <tr>
      <td className="text-black text-base leading-relaxed bg-[#FFFFFF] p-4 text-center">
        {student.number}
      </td>
      <td className="text-black text-base font-medium leading-relaxed bg-[#FFFFFF] p-4 pl-6 text-left">
        {student.name}
      </td>

      <td className="bg-[#FFFFFF] w-[150px] text-center">
        <Checkbox
          className={`green-checkbox w-5 h-5 ${
            highlightAttendance
              ? 'ring-2 ring-inset ring-red-600 transition-all'
              : ''
          } 
          ${
            selectedDate === null ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{ accentColor: '#6BE3A3' }}
          checked={checkboxState.attendance}
          onChange={(event) =>
            handleLocalCheckboxChange('attendance', event.target.checked)
          }
          disabled={selectedDate === null ? true : false}
        />
      </td>
      <td className="bg-[#FFFFFF] w-[150px] text-center">
        <div
          onClick={
            !checkboxState.attendance ? handleDisabledCheckboxClick : undefined
          }
          style={{ display: 'inline-block', width: '100%', height: '100%' }}
        >
          <Checkbox
            className={`green-checkbox w-5 h-5 ${
              checkboxState.attendance && mealAvailability.brk
                ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                : 'cursor-not-allowed'
            }`}
            style={{
              accentColor: '#6BE3A3',
              pointerEvents: checkboxState.attendance ? 'auto' : 'none',
            }}
            checked={checkboxState.breakfast}
            onChange={(event) =>
              handleLocalCheckboxChange('breakfast', event.target.checked)
            }
            disabled={!checkboxState.attendance || !mealAvailability.brk}
          />
        </div>
      </td>
      <td className="bg-[#FFFFFF] w-[150px text-center">
        <div
          onClick={
            !checkboxState.attendance ? handleDisabledCheckboxClick : undefined
          }
          style={{ display: 'inline-block', width: '100%', height: '100%' }}
        >
          <Checkbox
            className={`green-checkbox w-5 h-5 ${
              checkboxState.attendance && mealAvailability.lunch
                ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                : 'cursor-not-allowed'
            }`}
            style={{
              accentColor: '#6BE3A3',
              pointerEvents: checkboxState.attendance ? 'auto' : 'none',
            }}
            checked={checkboxState.lunch}
            onChange={(event) =>
              handleLocalCheckboxChange('lunch', event.target.checked)
            }
            disabled={!checkboxState.attendance || !mealAvailability.lunch}
          />
        </div>
      </td>
      <td className="bg-[#FFFFFF] w-[150px] text-center">
        <div
          onClick={
            !checkboxState.attendance ? handleDisabledCheckboxClick : undefined
          }
          style={{ display: 'inline-block', width: '100%', height: '100%' }}
        >
          <Checkbox
            className={`green-checkbox w-5 h-5 ${
              checkboxState.attendance && mealAvailability.snk
                ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                : 'cursor-not-allowed'
            }`}
            style={{
              accentColor: '#6BE3A3',
              pointerEvents: checkboxState.attendance ? 'auto' : 'none',
            }}
            checked={checkboxState.snack}
            onChange={(event) =>
              handleLocalCheckboxChange('snack', event.target.checked)
            }
            disabled={!checkboxState.attendance || !mealAvailability.snk}
          />
        </div>
      </td>
      <td className="bg-[#FFFFFF] w-[150px] text-center">
        <div
          onClick={
            !checkboxState.attendance ? handleDisabledCheckboxClick : undefined
          }
          style={{ display: 'inline-block', width: '100%', height: '100%' }}
        >
          <Checkbox
            className={`green-checkbox w-5 h-5 ${
              checkboxState.attendance && mealAvailability.sup
                ? 'ring-2 ring-inset ring-[#6BE3A3] cursor-pointer'
                : 'cursor-not-allowed'
            }`}
            style={{
              accentColor: '#6BE3A3',
              pointerEvents: checkboxState.attendance ? 'auto' : 'none',
            }}
            checked={checkboxState.supper}
            onChange={(event) =>
              handleLocalCheckboxChange('supper', event.target.checked)
            }
            disabled={!checkboxState.attendance || !mealAvailability.sup}
          />
        </div>
      </td>
    </tr>
  );
};

export default MealTableRow;
