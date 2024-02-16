'use client';

import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { Button } from 'flowbite-react';
import useAuth from '../../hooks/useAuth';
import withAuth from '@/hoc/hocauth';

import Link from 'next/link';

import axios from 'axios';
import WelcomeCalendar from '@/components/welcomeCalendar/WelcomeCalendar';
import { API_BASE_URL } from '@/constants';

const Welcome = () => {
  const { auth } = useAuth();
  const { name, lastname } = auth;

  const [sitesData, setSitesData] = useState({});

  //get request
  useEffect(() => {
    const GAS_URL = API_BASE_URL;
    axios
      .get(GAS_URL + '?type=welcomeDates')
      .then((response) => {
        // console.log('Data received:', response.data);
        setSitesData(response.data);
      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="welcome-body">
      <div className="welcome-buttons-container">
        <Link href="/">
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
      <div className="welcome-text-container">
        <h3 className="welcome-text">Welcome Back,</h3>
        <h5 className="full-name-text">{name + ' ' + lastname}</h5>
      </div>
      <div className="welcome-calendar-container">
        {Object.keys(sitesData).map((siteName) => (
          <WelcomeCalendar
            key={siteName}
            siteName={siteName}
            siteData={sitesData[siteName]}
          />
        ))}
      </div>
    </div>
  );
};

export default withAuth(Welcome);
