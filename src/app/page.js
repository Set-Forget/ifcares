'use client'


import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { Button } from 'flowbite-react';
import useAuth from '../hooks/useAuth';
import WelcomeCard from '../components/welcomeCard/WelcomeCard';
import Link from 'next/link';
import { If, Then } from 'react-if';



const Welcome = () => {
  const { auth } = useAuth();
  const [authData, setAuthData] = useState(null)
  useEffect(() => {
    if (auth) {
      setAuthData(auth)
    }
  }, [auth])
  


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
            className='text-transform[capitalize] font-bold bg-[#5D24FF] rounded-[13px] min-w-[130px] min-h-[40px] shadow-none meal-count-btn welcome-buttons'
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#5D24FF',
              borderRadius: '13px',
              minWidth: '130px',
              minHeight: '40px',
              boxShadow: 'none',
              color: '#FFFFFF'
            }}
          >
            Roster
          </Button>
        </Link>
      </div>
      <div className="welcome-text-container">
        <h3 className="welcome-text">Welcome Back,</h3>
        <If condition={auth != null}>
          <Then>
          <h5 className="full-name-text">{auth.name + ' ' + auth.lastname}</h5>
          </Then>
        </If>
        
      </div>
      <div className="welcome-cards-container">
        <WelcomeCard></WelcomeCard>
      </div>
    </div>
  );
};

export default Welcome;
