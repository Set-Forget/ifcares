import React, { createContext, useState, useRef } from 'react';

export const MealSiteContext = createContext();

export const MealSiteProvider = ({ children }) => {
  const [selectedSite, setSelectedSite] = useState('');
  const [siteData, setSiteData] = useState('');

  const [isDataFetched, setIsDataFetched] = useState(false);

  const [lastTimeIn, setLastTimeIn] = useState(null);
  const [lastTimeOut, setLastTimeOut] = useState(null);

  const [studentData, setStudentData] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime1, setSelectedTime1] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);
  const [selectedCheckboxData, setSelectedCheckboxData] = useState({});
  const [globalCounts, setGlobalCounts] = useState({
    attendance: 0,
    breakfast: 0,
    lunch: 0,
    snack: 0,
    supper: 0,
  });

  const resetGlobalCounts = () => {
    setGlobalCounts({
      attendance: 0,
      breakfast: 0,
      lunch: 0,
      snack: 0,
      supper: 0,
    });
  };

  const resetSelectedCheckboxData = () => {
    setSelectedCheckboxData({});
  };

  const resetSelectedDate = () => {
    setSelectedDate(null);
  };

  const resetDateValidationError = () => {
    setDateValidationError('');
  };

  const [formattedData, setFormattedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [time1Error, setTime1Error] = useState(false);
  const [time2Error, setTime2Error] = useState(false);
  const [dateValidationError, setDateValidationError] = useState('');

  const updateGlobalCount = (category, isChecked) => {
    setGlobalCounts((prevCounts) => ({
      ...prevCounts,
      [category]: isChecked
        ? prevCounts[category] + 1
        : prevCounts[category] - 1,
    }));
  };

  const handleCheckboxChange = (studentNumber, checkboxState) => {
    setSelectedCheckboxData((prevState) => ({
      ...prevState,
      [studentNumber]: checkboxState,
    }));
  };

  const topRef = useRef(null); // Create a ref for the top of the component

  const handleNextClick = (validStudentData) => {
    setDateError(!selectedDate);
    setTime1Error(!selectedTime1);
    setTime2Error(!selectedTime2);

    if (
      dateValidationError ||
      !selectedDate ||
      !selectedTime1 ||
      !selectedTime2
    ) {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Initialize an array to store the formatted data for each student
    const formattedData = validStudentData.map((student) => {
      const validStudentData = [student.number, student.name, student.age];

      // Check if selectedCheckboxData exists for this student
      if (selectedCheckboxData[student.number]) {
        // Add checkbox values to the array
        validStudentData.push(
          selectedCheckboxData[student.number].attendance,
          selectedCheckboxData[student.number].breakfast,
          selectedCheckboxData[student.number].lunch,
          selectedCheckboxData[student.number].snack,
          selectedCheckboxData[student.number].supper
        );
      } else {
        // If selectedCheckboxData doesn't exist, add false values for checkboxes
        validStudentData.push(false, false, false, false, false);
      }

      return validStudentData;
    });

    setFormattedData(formattedData);

    setIsModalOpen(true);
  };

  return (
    <MealSiteContext.Provider
      value={{
        selectedSite,
        setSelectedSite,
        siteData,
        setSiteData,
        isDataFetched,
        setIsDataFetched,
        studentData,
        setStudentData,
        selectedDate,
        setSelectedDate,
        selectedTime1,
        setSelectedTime1,
        selectedTime2,
        setSelectedTime2,
        selectedCheckboxData,
        handleCheckboxChange,
        updateGlobalCount,
        globalCounts,
        resetGlobalCounts,
        resetSelectedCheckboxData,
        resetSelectedDate,
        resetDateValidationError,
        formattedData,
        setFormattedData,
        isModalOpen,
        setIsModalOpen,
        dateError,
        setDateError,
        time1Error,
        setTime1Error,
        time2Error,
        setTime2Error,
        handleNextClick,
        lastTimeIn,
        setLastTimeIn,
        lastTimeOut,
        setLastTimeOut,
        dateValidationError,
        setDateValidationError,
        topRef,
      }}
    >
      {children}
    </MealSiteContext.Provider>
  );
};
