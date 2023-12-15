'use client'

import React from 'react';

import MealSite from '../../components/mealSite/MealSite';
import Link from 'next/link';
import { Button } from '@mui/material';
import './MealCount.css';
import withAuth from '@/hoc/hocauth';

const MealCount = () => {
  return (
    <div className="mealCount-body">
      <div className="navigation-container">
        <h2 className="title">Meal Count</h2>
        <Link href="/home">
          <Button
            variant="contained"
            className='text-transform[capitalize] font-bold bg-[#5D24FF] rounded-[13px] min-w-[130px] min-h-[40px] shadow-none meal-count-btn'
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#5D24FF',
              borderRadius: '13px',
              minWidth: '130px',
              minHeight: '40px',
              boxShadow: 'none',
            }}
          >
            Roster
          </Button>
        </Link>
      </div>

      <MealSite />
    </div>
  );
};

export default withAuth(MealCount);
