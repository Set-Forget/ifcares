import React, { useContext } from 'react';
import { Checkbox, Table } from 'flowbite-react';
import './MealTableRow.css';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';

const MealTableRow = ({ student }) => {
  const { selectedCheckboxData, handleCheckboxChange, updateGlobalCount } =
    useContext(MealSiteContext);

  const checkboxState = selectedCheckboxData[student.number] || {
    attendance: false,
    breakfast: false,
    lunch: false,
    snack: false,
    supper: false,
  };

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
        handleCheckboxChange(student.number, resetCheckboxState);
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
    handleCheckboxChange(student.number, newCheckboxState);
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

  return (
    <Table.Row>
      <Table.Cell className="text-black text-base font-semibold leading-relaxed bg-[#FFFFFF] h-11">
        {student.number}
      </Table.Cell>
      <Table.Cell className="text-black text-base font-semibold leading-relaxed bg-[#FFFFFF] h-11">
        {student.name}
      </Table.Cell>

      <Table.Cell className="bg-[#FFFFFF] h-11">
        {/* <input
          type="checkbox"
          checked={checkboxState.attendance}
          className="checkbox checkbox-lg checkbox-primary"
          onChange={(event) =>
            handleLocalCheckboxChange('attendance', event.target.checked)
          }
        /> */}
        <Checkbox
          className="green-checkbox"
          checked={checkboxState.attendance}
          onChange={(event) =>
            handleLocalCheckboxChange('attendance', event.target.checked)
          }
        />
      </Table.Cell>
      <Table.Cell className="bg-[#FFFFFF] h-11">
        <Checkbox
          className="green-checkbox "
          checked={checkboxState.breakfast}
          onChange={(event) =>
            handleLocalCheckboxChange('breakfast', event.target.checked)
          }
          disabled={!checkboxState.attendance}
        />
      </Table.Cell>
      <Table.Cell className="bg-[#FFFFFF] h-11">
        <Checkbox
          className="green-checkbox"
          checked={checkboxState.lunch}
          onChange={(event) =>
            handleLocalCheckboxChange('lunch', event.target.checked)
          }
          disabled={!checkboxState.attendance}
        />
      </Table.Cell>
      <Table.Cell className="bg-[#FFFFFF] h-11">
        <Checkbox
          className="green-checkbox"
          checked={checkboxState.snack}
          onChange={(event) =>
            handleLocalCheckboxChange('snack', event.target.checked)
          }
          disabled={!checkboxState.attendance}
        />
      </Table.Cell>
      <Table.Cell className="bg-[#FFFFFF] h-11">
        <Checkbox
          className="green-checkbox"
          checked={checkboxState.supper}
          onChange={(event) =>
            handleLocalCheckboxChange('supper', event.target.checked)
          }
          disabled={!checkboxState.attendance}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default MealTableRow;
