import useIsMobile from '../../hooks/useIsMobile';
import MealTable from '../mealTable/MealTable';
import React, { useContext, useState } from 'react';
import MealTableModal from '../mealTableModal/MealTableModal';
import MealCountMobile from '../mealCountMobile/MealCountMobile';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import MealCard from '../MealCard/MealCard';
import DateTimePickerMobile from '../DateTimePickerMobile/DateTimePickerMobile';
import { Button } from '@mui/material';
import dayjs from 'dayjs';

const MealList = () => {
  const isMobile = useIsMobile();
  const [showMessage, setShowMessage] = useState('');
  const {
    studentData,
    selectedSite,
    datesBySite,
    handleNextClick,
    isModalOpen,
    setIsModalOpen,
    formattedData,
    selectedDate,
    selectedTime1,
    selectedTime2,
    selectedCheckboxData,
  } = useContext(MealSiteContext);

  const validStudentData = Array.isArray(studentData) ? studentData : [];

  // save functionality
  const handleSave = () => {
    if (!selectedSite) {
      setShowMessage('site');
      setTimeout(() => {
        setShowMessage('');
      }, 3000);
      return;
    }
    if (!selectedDate) {
      setShowMessage('date');
      setTimeout(() => {
        setShowMessage('');
      }, 3000);
      return;
    }

    const formattedDate = formatDateForLocalStorage(selectedDate);

    // Retrieve existing data from localStorage
    const savedMealCounts =
      JSON.parse(localStorage.getItem('savedMealCounts')) || [];

    // Find if there's an existing entry for the selected site and date
    const existingIndex = savedMealCounts.findIndex(
      (item) =>
        item.selectedSite === selectedSite &&
        item.selectedDate === formattedDate
    );

    const newEntry = {
      selectedSite,
      selectedDate: formattedDate,
      data: selectedCheckboxData,
    };

    if (existingIndex !== -1) {
      // Replace the existing entry
      savedMealCounts[existingIndex] = newEntry;
    } else {
      // Add the new entry
      savedMealCounts.push(newEntry);
    }

    // Save the updated array back to localStorage
    localStorage.setItem('savedMealCounts', JSON.stringify(savedMealCounts));
    setShowMessage('success');
    setTimeout(() => {
      setShowMessage('');
    }, 3000);
  };

  const formatDateForLocalStorage = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const errorIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );

  const successIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  return (
    <>
      {isMobile ? (
        <>
          <DateTimePickerMobile></DateTimePickerMobile>
          <div className="p-4 bg-[#C7F4DC] text-black rounded-t-lg flex justify-between items-center mb-2">
            <span className="header-item w-1/4 px-2 py-1 font-bold"> # </span>
            <span className="header-item w-2/3 px-2 py-1 font-bold">
              {' '}
              Name of Participant{' '}
            </span>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            {validStudentData.map((student) => (
              <MealCard
                student={student}
                selectedSite={selectedSite}
                selectedDate={selectedDate}
                datesBySite={datesBySite}
                key={student.id}
              />
            ))}
          </div>
          <MealCountMobile></MealCountMobile>
          <div className="flex w-full justify-between items-center mb-10">
            <div className="flex flex-col items-start font-bold gap-2">
              <button
                className="flex items-center gap-2 bg-[#FACA1F] rounded-[13px] px-6 min-h-[40px] shadow-none"
                onClick={handleSave}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="m27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71M12 6h8v4h-8Zm8 20h-8v-8h8Zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26Z"
                  />
                </svg>
                Save
              </button>
              {showMessage && showMessage == 'success' && (
                <span className="absolute mt-12 text-xs text-green-600 flex items-center gap-1">
                  {successIcon} Meal count saved!
                </span>
              )}
              {showMessage && showMessage == 'site' && (
                <span className="absolute mt-12 text-xs text-red-600 flex items-center gap-1">
                  {errorIcon}
                  Select site to save
                </span>
              )}
              {showMessage && showMessage == 'date' && (
                <span className="absolute mt-12 text-xs text-red-600 flex items-center gap-1">
                  {errorIcon}
                  Select date to save
                </span>
              )}
            </div>
            <Button
              variant="contained"
              style={{
                color: '#000000',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                backgroundColor: '#46DC8C',
                borderRadius: '13px',
                minWidth: '140px',
                minHeight: '40px',
                boxShadow: 'none',
              }}
              onClick={() => handleNextClick(validStudentData)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <MealTable studentData={studentData} selectedSite={selectedSite} />
      )}
      {isModalOpen && (
        <MealTableModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          formattedData={formattedData}
          selectedDate={selectedDate}
          selectedTime1={selectedTime1}
          selectedTime2={selectedTime2}
          selectedSite={selectedSite}
        />
      )}
    </>
  );
};

export default MealList;
