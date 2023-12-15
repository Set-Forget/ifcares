'use client'


import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { Button } from 'flowbite-react';
import useAuth from '../hooks/useAuth';
import withAuth from '@/hoc/hocauth';
import { useRouter } from 'next/navigation'

import Link from 'next/link';

import axios from 'axios';
import WelcomeCalendar from '../components/welcomeCalendar/WelcomeCalendar';

const Welcome = () => {
  const { auth } = useAuth();
  const { name, lastname } = auth;
  const router = useRouter()

  const [sitesData, setSitesData] = useState({});

  if (true) {
    router.push('/mealCount')
  }

  //get request
  useEffect(() => {
    const GAS_URL =
      'https://script.google.com/macros/s/AKfycbwPMk2ykAjJZ36hAGivOkj7PsrPlmku0JwLsVnXdYyvXKKCBKhbFuoexflNI9hYTm-7/exec';
    axios
      .get(GAS_URL + '?type=welcomeDates')
      .then((response) => {
        console.log('Data received:', response.data);
        setSitesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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