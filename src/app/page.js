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
  const [isDownloading, setIsDownloading] = useState(false);

  const GAS_URL =
    'https://script.google.com/macros/s/AKfycbyObcbQlgndbklESWMv9BpiXi3drKdg0l01HOKRfldofXzOAq7HhvxA9NB20GDbp0Z9/exec';

  //get request
  useEffect(() => {
    setIsLoading(true);
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
    axios
      .get(GAS_URL + '?type=sites')
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
      });
  }, []);

  function handleDownload() {
    setIsDownloading(true);
    axios
      .get(GAS_URL + '?type=downloadPdf')
      .then((response) => {
        const data = response.data;

        // Convert base64 to a Blob
        const byteCharacters = atob(data.bytes);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const fileBlob = new Blob([byteArray], { type: data.mimeType });

        // Create a link and trigger download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(fileBlob);
        link.download = data.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDownloading(false);
      })
      .catch((error) => {
        console.error('Download error:', error);
        setIsDownloading(false);
      });
  }

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
        <div className="relative w-full flex items-center justify-center">
          <div className="mt-4 flex justify-end relative w-4/5">
            <div className="flex">
              {isDownloading && (
                <div className="flex flex-col justify-center items-center mr-4">
                  <LoadingSpinner />
                </div>
              )}

              <button
                type="button"
                onClick={handleDownload}
                class="flex items-center justify-center gap-1 text-white text-xs text-transform[capitalize] font-bold bg-[#5D24FF] rounded-[13px] min-w-[75px] min-h-[40px] shadow-none mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Menu
              </button>
            </div>
            {role === ROLES.Admin && (
              <SitesDropdown
                sites={sites}
                onSiteSelected={setSelectedSite}
                selectedSite={selectedSite}
                className="text-base md:text-2xl h-auto md:h-28 relative"
              />
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <LoadingSpinner />
            <h2>Loading Dates...</h2>
          </div>
        ) : (
          <>
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
