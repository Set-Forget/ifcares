'use client';
import { API_BASE_URL } from '@/constants';
import axios from 'axios';
import React, { createContext, useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { logErrorMonitoring } from '@/utils';

export const MealSiteContext = createContext();

export const MealSiteProvider = ({ children }) => {
  const [selectedSite, setSelectedSite] = useState('');
  const [siteData, setSiteData] = useState('');

  const [isDataFetched, setIsDataFetched] = useState(false);

  const [lastTimeIn, setLastTimeIn] = useState(null);
  const [lastTimeOut, setLastTimeOut] = useState(null);

  const [studentData, setStudentData] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateCache, setSelectedDateCache] = useState(null);
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

  // if we delete a student, uncheck his checkboxes first
  const updateCountsOnStudentDeletion = (studentId) => {
    const studentCheckboxState = selectedCheckboxData[studentId];
    if (studentCheckboxState) {
      ['attendance', 'breakfast', 'lunch', 'snack', 'supper'].forEach(
        (category) => {
          if (studentCheckboxState[category]) {
            updateGlobalCount(category, false);
          }
        }
      );
    }
  };

  // como hay una saved Meal en el local Storage updateamos los counts.
  // studentData arranca como '' y recién pasa a ser un array cuando responde
  // ?type=studentData, así que esto se llama muchas veces sin roster todavía
  // (el deep link /mealCount?site=&date= setea la fecha en el mismo mount en
  // que dispara el fetch). Sin roster no podemos saber qué alumnos guardados
  // siguen inscriptos, así que devolvemos false y el caller reintenta cuando
  // llega. Recalcula los totales de cero en vez de ir sumando, así reintentar
  // no duplica los counts.
  const updateCountsForSavedMeal = (data) => {
    if (!Array.isArray(studentData) || !data) return false;

    const rosterIds = new Set(studentData.map((student) => student.id));
    const counts = {
      attendance: 0,
      breakfast: 0,
      lunch: 0,
      snack: 0,
      supper: 0,
    };

    Object.keys(data).forEach((studentId) => {
      // Skip if the student does not exist in studentData
      if (!rosterIds.has(studentId)) return;

      const savedCheckboxes = data[studentId];
      if (!savedCheckboxes) return;

      Object.keys(counts).forEach((category) => {
        if (savedCheckboxes[category]) counts[category] += 1;
      });
    });

    setGlobalCounts(counts);
    return true;
  };

  // Modify the function to accept the student's data directly
  const updateCountsOnSavedMealCounts = (studentId, studentData) => {
    // Use the studentData instead of selectedCheckboxData
    if (studentData) {
      ['attendance', 'breakfast', 'lunch', 'snack', 'supper'].forEach(
        (category) => {
          if (studentData[category]) {
            updateGlobalCount(category, true);
          }
        }
      );
    }
  };

  const formatDateForLocalStorage = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };
  // Lee el "Save for Later" del sitio/fecha elegidos, sin tocar estado.
  // localStorage puede tener JSON corrupto (o estar bloqueado en modo
  // incógnito), y eso no puede tumbar la pantalla de meal count.
  const readSavedMealCounts = () => {
    if (!selectedSite || !selectedDate) return false;

    const formattedDate = formatDateForLocalStorage(selectedDate);

    let savedMealCounts = [];
    try {
      savedMealCounts = JSON.parse(localStorage.getItem('savedMealCounts')) || [];
    } catch (error) {
      return false;
    }
    if (!Array.isArray(savedMealCounts)) return false;

    // Find if there's an existing entry for the selected site and date
    const matchingEntry = savedMealCounts.find(
      (item) =>
        item &&
        item.selectedSite === selectedSite &&
        item.selectedDate === formattedDate
    );

    return matchingEntry ? matchingEntry.data : false;
  };

  // funcion que checkea
  const checkSavedMealCounts = () => {
    const savedData = readSavedMealCounts();

    // If a matching entry is found, set the checkbox data
    if (savedData) setSelectedCheckboxData(savedData);

    return savedData;
  };

  // Restaura los counts guardados para el sitio/fecha actual. Se llama tanto
  // al cambiar de fecha como cuando termina de llegar el roster, así que
  // recuerda qué selección ya restauró para no pisar lo que marcó el usuario.
  const countsSyncRef = useRef({ site: null, date: null, restored: false });

  const syncCountsForSelectedDate = () => {
    const dateKey = selectedDate ? formatDateForLocalStorage(selectedDate) : null;
    const lastSync = countsSyncRef.current;
    const isNewSelection =
      lastSync.site !== selectedSite || lastSync.date !== dateKey;

    if (isNewSelection) {
      countsSyncRef.current = {
        site: selectedSite,
        date: dateKey,
        restored: false,
      };
      resetGlobalCounts();
      const savedData = checkSavedMealCounts();
      if (savedData && updateCountsForSavedMeal(savedData)) {
        countsSyncRef.current.restored = true;
      }
      return;
    }

    // Misma selección: sólo nos falta el reintento de cuando el roster llegó
    // después de que se eligió la fecha.
    if (lastSync.restored) return;

    const savedData = readSavedMealCounts();
    if (savedData && updateCountsForSavedMeal(savedData)) {
      countsSyncRef.current.restored = true;
    }
  };

  const topRef = useRef(null); // Create a ref for the top of the component

  const resetAllStates = () => {
    countsSyncRef.current = { site: null, date: null, restored: false };
    setSelectedSite('');
    setSiteData('');
    setIsDataFetched(false);

    setLastTimeIn(null);
    setLastTimeOut(null);

    setStudentData('');
    setSelectedDate(null);
    setSelectedTime1(null);
    setSelectedTime2(null);
    setSelectedCheckboxData({});

    setGlobalCounts({
      attendance: 0,
      breakfast: 0,
      lunch: 0,
      snack: 0,
      supper: 0,
    });

    resetGlobalCounts(); // If this function already resets globalCounts, you can use this alone
    resetSelectedCheckboxData(); // If this function already resets selectedCheckboxData, you can use this alone
    resetSelectedDate(); // If this function already resets selectedDate, you can use this alone
    resetDateValidationError(); // If this function already resets dateValidationError, you can use this alone

    setFormattedData([]);
    setIsModalOpen(false);
    setDateError(false);
    setTime1Error(false);
    setTime2Error(false);
    setDateValidationError('');
  };

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
      if (selectedCheckboxData[student.id]) {
        // Add checkbox values to the array
        validStudentData.push(
          selectedCheckboxData[student.id].attendance,
          selectedCheckboxData[student.id].breakfast,
          selectedCheckboxData[student.id].lunch,
          selectedCheckboxData[student.id].snack,
          selectedCheckboxData[student.id].supper
        );
      } else {
        // If selectedCheckboxData doesn't exist, add false values for checkboxes
        validStudentData.push(false, false, false, false, false);
      }

      return validStudentData;
    });

    // console.log(formattedData)

    setFormattedData(formattedData);

    setIsModalOpen(true);
  };

  const [datesBySite, setDatesBySite] = useState({});

  // //get request
  // useEffect(() => {
  //   const GAS_URL = API_BASE_URL;
  //   axios
  //     .get(GAS_URL + '?type=mealCountDays')
  //     .then((response) => {
  //       // console.log('Data received:', response.data);
  //       // setDatesBySite(response.data);
  //       console.log('mealCountDays')
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       // console.error('Error fetching data:', error);
  //     });
  // }, []);

  const [sitesData, setSitesData] = useState({});
  const [sitesDataLoading, setSitesDataLoading] = useState(false);
  const [sitesDataError, setSitesDataError] = useState(false);

  // Fetch the valid/submitted dates for every site, retrying on failure so a
  // single slow/failed backend response doesn't leave the calendar unusable
  const fetchAllMeals = async () => {
    const MAX_ATTEMPTS = 3;
    const RETRY_DELAYS = [2000, 5000];

    setSitesDataLoading(true);
    setSitesDataError(false);

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const response = await axios.get(API_BASE_URL + '?type=allMeals', {
          timeout: 60 * 1000,
        });
        // Apps Script puede contestar 200 con HTML de error; en ese caso
        // reintentamos en vez de dejar el calendario con un string adentro.
        if (!response.data || typeof response.data !== 'object') {
          throw new Error('allMeals: unexpected response from the backend');
        }
        setSitesData(response.data);
        setDatesBySite(response.data);
        setSitesDataLoading(false);
        return;
      } catch (error) {
        if (attempt === MAX_ATTEMPTS) {
          logErrorMonitoring({
            function_name: 'fetchAllMeals - MealSiteProvider',
            error: error,
            row_error: error?.stack,
          });
          setSitesDataError(true);
          setSitesDataLoading(false);
          return;
        }
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAYS[attempt - 1])
        );
      }
    }
  };

  useEffect(() => {
    fetchAllMeals();
  }, []);

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
        selectedDateCache,
        setSelectedDateCache,
        selectedTime1,
        setSelectedTime1,
        selectedTime2,
        setSelectedTime2,
        selectedCheckboxData,
        setSelectedCheckboxData,
        updateCountsForSavedMeal,
        updateCountsOnSavedMealCounts,
        checkSavedMealCounts,
        syncCountsForSelectedDate,
        handleCheckboxChange,
        updateCountsOnStudentDeletion,
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
        datesBySite,
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
        resetAllStates,
        sitesData,
        sitesDataLoading,
        sitesDataError,
        refetchAllMeals: fetchAllMeals,
      }}
    >
      {children}
    </MealSiteContext.Provider>
  );
};
