import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'flowbite-react';
import MealSiteRow from '../mealSiteRow/MealSiteRow';
import SitesDropdown from '../sitesDropdown/SitesDropdown';
import axios from 'axios';
import './MealSite.css';
import useAuth from '../../hooks/useAuth';
import { API_BASE_URL, ROLES } from '../../constants';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';

import useIsMobile from '../../hooks/useIsMobile';
import MealList from '../mealList/MealList';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import dayjs from 'dayjs';

const MealSite = () => {
  const [sites, setSites] = useState([]);
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState('');

  const {
    selectedSite,
    setSelectedSite,
    selectedDate,
    setSelectedDate,
    setLastTimeIn,
    setLastTimeOut,
    siteData,
    setSiteData,
    selectedCheckboxData,
    setStudentData,
    resetGlobalCounts,
    resetSelectedCheckboxData,
    resetSelectedDate,
    resetDateValidationError,
    isDataFetched,
    setIsDataFetched,
  } = useContext(MealSiteContext);

  const isMobile = useIsMobile();

  const handleSiteChange = (newSite) => {
    setSelectedSite(newSite);
    resetGlobalCounts(); // Reset the counts when the site changes
    resetSelectedCheckboxData();
    resetSelectedDate(); // Reset the date picker value
    resetDateValidationError();
    // setFoundSavedMealCount(false);
    // setAlreadyCounted(false);
  };

  const GAS_URL = API_BASE_URL;

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const { data: sitesData } = await axios.get(GAS_URL + '?type=sites');

        if (auth == null) {
          return;
        }

        if (auth.role === ROLES.Admin) {
          setSites(sitesData);
        } else {
          const userSite = sitesData.find(
            (site) => site.name === auth.assignedSite
          );
          if (userSite) {
            setSites([userSite]);
            handleSiteChange(userSite.name); // Automatically select the site
          }
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    if (auth == null) {
      return;
    }

    if (auth.role === ROLES.Admin || !isDataFetched) {
      fetchSites();
      setIsDataFetched(true); // For admin, consider setting this to false when component unmounts
    }

    // Adding cleanup to reset isDataFetched for admin users
    return () => {
      if (auth == null) {
        return;
      }
      if (auth.role === ROLES.Admin) {
        setIsDataFetched(false);
      }
    };
  }, [auth, isDataFetched, setIsDataFetched]);

  const fetchDataForSelectedSite = (site) => {
    setIsLoading(true);
    // Make an API request with the selected site as a parameter
    axios
      .get(GAS_URL + `?type=siteData&site=${site}`)
      .then((response) => {
        setSiteData(response.data);
        setLastTimeIn(response.data.lastTimeIn);
        setLastTimeOut(response.data.lastTimeOut);
      })
      .catch((error) => {
        console.error('Error fetching site data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // When the selected site changes, fetch data for the new site
  useEffect(() => {
    if (selectedSite) {
      fetchDataForSelectedSite(selectedSite);
    }
  }, [selectedSite]);

  const fetchStudentForSelectedSite = (site) => {
    setIsLoading(true);
    // Make an API request with the selected site as a parameter
    axios
      .get(GAS_URL + `?type=studentData&site=${site}`)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching site data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (selectedSite) {
      fetchStudentForSelectedSite(selectedSite);
    }
  }, [selectedSite]);
  const [dropdownDisabled, setdropdownDisabled] = useState(null);
  useEffect(() => {
    if (auth != null) {
      setdropdownDisabled(auth.role !== ROLES.Admin);
    }
  }, [auth]);

  // capture the values of the parameters in URL
  const [queryParams, setQueryParams] = useState({ site: null, date: null });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const site = searchParams.get('site');
    const date = searchParams.get('date');
    setQueryParams({ site, date });
    // Now you can use queryParams.date and queryParams.site as needed
  }, []);

  function formatDateForPicker(dateStr) {
    return dayjs(dateStr);
  }

  const formatDateForLocalStorage = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  useEffect(() => {
    if (queryParams.site && queryParams.date) {
      // Logic to handle the parameters
      setSelectedSite(queryParams.site);
      let formattedDate = formatDateForPicker(queryParams.date);
      // console.log(formattedDate);
      setSelectedDate(formattedDate);

      // console.log(
      //   `Received date: ${queryParams.date} and site: ${queryParams.site}`
      // );
    }
  }, [queryParams]);

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
    <div className="relative left-1/2 -translate-x-1/2 w-4/5">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex flex-col items-start font-bold gap-2">
          <button
            className="flex items-center gap-2 bg-[#FACA1F] rounded-[13px] px-4 md:px-6 min-h-[40px] shadow-none"
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
        <div className="flex justify-end w-[250px]">
          {isLoading && (
            <div className="mr-4 flex items-center">
              <LoadingSpinner />
            </div>
          )}
          <SitesDropdown
            sites={sites}
            onSiteSelected={handleSiteChange}
            selectedSite={selectedSite}
            additionalStyles={{
              // backgroundColor: '#D3D3D3',
              pointerEvents: dropdownDisabled ? 'none' : 'auto', // Disable pointer events if dropdown is disabled
              // cursor: dropdownDisabled ? 'not-allowed' : 'default',
              // opacity: dropdownDisabled ? 0.4 : 1,
            }}
            disableAllSites={true}
          />
        </div>
      </div>
      <br />
      {isMobile ? (
        <div className="w-full rounded-lg bg-white mb-4 shadow p-4">
          <p className="font-bold text-lg"> Name of Contracting Entity (CE)</p>
          <p className="text-lg">{siteData.name}</p>
          <br />

          <p className="font-bold text-lg">CE ID</p>
          <p className="text-lg">{siteData.ceId}</p>
          <br />

          <p className="font-bold text-lg"> Name of Site</p>
          <p className="text-lg">{siteData.siteName}</p>
          <br />

          <p className="font-bold text-lg">Site #</p>
          <p className="text-lg">{siteData.siteNumber}</p>
          <br />
        </div>
      ) : (
        <table className="w-full table-fixed text-center">
          <thead className="p-6">
            <tr>
              <th className="w-2/5 uppercase text-left text-black text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] px-4 pl-6">
                Name of Contracting Entity (CE)
              </th>
              <th className="uppercase text-black text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] p-4">
                CE ID
              </th>
              <th className="uppercase text-black text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] p-4">
                Name of Site
              </th>
              <th className="uppercase text-black text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] p-4">
                Site #
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <MealSiteRow siteData={siteData} />
          </tbody>
        </table>
      )}

      <br />
      <MealList></MealList>
    </div>
  );
};

export default MealSite;
