import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'flowbite-react';
import MealSiteRow from '../mealSiteRow/MealSiteRow';
import SitesDropdown from '../sitesDropdown/SitesDropdown';
import axios from 'axios';
import './MealSite.css';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../constants';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';

import useIsMobile from '../../hooks/useIsMobile';
import MealList from '../mealList/MealList';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const MealSite = () => {
  const [sites, setSites] = useState([]);
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedSite,
    setSelectedSite,
    setLastTimeIn,
    setLastTimeOut,
    siteData,
    setSiteData,
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
  };

  const GAS_URL =
    'https://script.google.com/macros/s/AKfycbzZxzM5-3lzifGCQ_5128ySAqqE0lQ1uyr032VlXyuFnwYcJMWq30LTrc6ydT5sEXjp/exec';

  // old use effect -->

  // useEffect(() => {
  //   // console.log(selectedSite);
  //   if (selectedSite) {
  //     fetchDataForSelectedSite(selectedSite);
  //     fetchStudentForSelectedSite(selectedSite);
  //   } else {

  //     Promise.all([axios.get(GAS_URL + '?type=sites')])
  //       .then(([sitesResponse]) => {
  //         if (auth.role !== ROLES.Admin) {
  //           console.log('Sites: ', sitesResponse.data);
  //           const sites = sitesResponse.data.filter(
  //             (item) => item.name === auth.assignedSite
  //           );
  //           setSites(sites);

  //         } else {
  //           setSites(sitesResponse.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });
  //   }
  // }, [selectedSite]);

  // --> new useEffect
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
  return (
    <div className="relative left-1/2 -translate-x-1/2 w-4/5">
      <div className="flex items-center">
        <SitesDropdown
          sites={sites}
          onSiteSelected={handleSiteChange}
          selectedSite={selectedSite}
          additionalStyles={{
            border: 'solid 1px #3DED97',
            // backgroundColor: '#D3D3D3',
            pointerEvents: dropdownDisabled ? 'none' : 'auto', // Disable pointer events if dropdown is disabled
            // cursor: dropdownDisabled ? 'not-allowed' : 'default',
            // opacity: dropdownDisabled ? 0.4 : 1,
          }}
          disableAllSites={true}
        />
        {isLoading && (
          <div className='ml-4'>
            <LoadingSpinner />
          </div>
        )}
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
        <Table>
          <Table.Head>
            <Table.HeadCell className="text-black text-base font-semibold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
              Name of Contracting Entity (CE)
            </Table.HeadCell>
            <Table.HeadCell className="text-black text-base font-semibold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
              CE ID
            </Table.HeadCell>
            <Table.HeadCell className="text-black text-base font-semibold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
              Name of Site
            </Table.HeadCell>
            <Table.HeadCell className="text-black text-base font-semibold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
              Site #
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <MealSiteRow siteData={siteData} />
          </Table.Body>
        </Table>
      )}

      <br />
      <MealList></MealList>
    </div>
  );
};

export default MealSite;
