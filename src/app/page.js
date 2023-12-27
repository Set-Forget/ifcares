'use client';

import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { Button } from 'flowbite-react';
import withAuth from '@/hoc/hocauth';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '../constants/index';
import Link from 'next/link';

import axios from 'axios';
import WelcomeCalendar from '@/components/welcomeCalendar/WelcomeCalendar';
import SitesDropdown from '@/components/sitesDropdown/SitesDropdown';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';

const Welcome = () => {
  const { auth } = useAuth();
  const { name, lastname, role, assignedSite } = auth;

  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(
    role === ROLES.Admin ? '' : assignedSite
  );
  const [sitesData, setSitesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //get request
  useEffect(() => {
    setIsLoading(true);
    const GAS_URL =
      'https://script.google.com/macros/s/AKfycbyQPDZEu-vBGvKKJ_kXhy-20mLXy5Pcf9xvz4p3x3MWVR2HHLWWKmdmagLnpAfz7ps1/exec';
    axios
      .get(GAS_URL + '?type=welcomeDates')
      .then((response) => {
        // console.log('Data received:', response.data);
        setSitesData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const GAS_URL =
      'https://script.google.com/macros/s/AKfycbyQPDZEu-vBGvKKJ_kXhy-20mLXy5Pcf9xvz4p3x3MWVR2HHLWWKmdmagLnpAfz7ps1/exec';
    axios
      .get(GAS_URL + '?type=sites')
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="welcome-body">
      <div className="welcome-buttons-container">
        <Link href="/mealCount">
          <Button
            variant="contained"
            className="text-transform[capitalize] font-bold bg-[#3DED97] rounded-[13px] min-w-[130px] min-h-[40px] shadow-none meal-count-btn welcome-buttons"
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#3DED97',
              borderRadius: '13px',
              minWidth: '130px',
              minHeight: '40px',
              boxShadow: 'none',
              color: '#FFFFFF',
            }}
          >
            Meal Count
          </Button>
        </Link>
        <Link href="/home">
          <Button
            variant="contained"
            className="text-transform[capitalize] font-bold bg-[#5D24FF] rounded-[13px] min-w-[130px] min-h-[40px] shadow-none meal-count-btn welcome-buttons"
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#5D24FF',
              borderRadius: '13px',
              minWidth: '130px',
              minHeight: '40px',
              boxShadow: 'none',
              color: '#FFFFFF',
            }}
          >
            Roster
          </Button>
        </Link>
      </div>
      <div className="mb-20">
        <div className="welcome-text-container">
          <h3 className="welcome-text">Welcome Back,</h3>
          <h5 className="full-name-text">{name + ' ' + lastname}</h5>
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96">
          <LoadingSpinner />
          <h2>Loading Dates...</h2>
        </div>
        ) : (
          <>
            <div className="relative w-full flex items-center justify-center">
              {role === ROLES.Admin && (
                <div className="mt-4 flex justify-start relative w-4/5">
                  <SitesDropdown
                    sites={sites}
                    onSiteSelected={setSelectedSite}
                    selectedSite={selectedSite}
                    className="text-base md:text-2xl h-auto md:h-28 relative"
                  />
                </div>
              )}
            </div>
            <div className="welcome-calendar-container">
              {Object.keys(sitesData)
                .filter(
                  (siteName) => !selectedSite || siteName === selectedSite
                )
                .map((siteName) => (
                  <WelcomeCalendar
                    key={siteName}
                    siteName={siteName}
                    siteData={sitesData[siteName]}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withAuth(Welcome);
