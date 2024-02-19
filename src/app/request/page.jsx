'use client';
import SitesSelect from '@/components/sitesSelect/SitesSelect';
import withAuth from '@/hoc/hocauth';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const [requestType, setRequestType] = useState('');
  const [amount, setAmount] = useState('');
  const [time, setTime] = useState(null);
  const [selectedSite, setSelectedSite] = useState('');

  const handleRequestTypeChange = (event) => {
    setRequestType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };

  const handleSiteChange = (site) => {
    setSelectedSite(site);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = {
      requestType,
      amount,
      time: time?.format('HH:mm') || '',
      selectedSite,
    };
    console.log(formData);
  };

  const showNumberInput = ['Sporks', 'Meal Increase', 'Meal Decrease'].includes(
    requestType
  );
  const showTimePicker = requestType === 'Change approved meal service time';
  return (
    <>
      <div className="flex items-center justify-center w-full my-[80px]">
        <div className="flex items-start justify-start w-4/5">
          <Link href="/">
            <button className="text-transform[capitalize] text-black text-sm font-bold bg-[#FACA1F] rounded-[13px] min-w-[140px] min-h-[40px] shadow-none">
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="border-2 min-w-[500px] shadow-xl rounded-2xl bg-white mb-[80px]"
        >
          <div className="w-full flex justify-center mt-10">
            <h2 className="w-4/5 text-xl md:text-2xl self-start not-italic font-extrabold leading-normal">
              Submit a New Request
            </h2>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <div className="w-4/5">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Request Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={requestType}
                  label="Request Type"
                  onChange={handleRequestTypeChange}
                >
                  <MenuItem value={'Sporks'}>Sporks</MenuItem>
                  <MenuItem value={'Meal Increase'}>Meal Increase</MenuItem>
                  <MenuItem value={'Meal Decrese'}>Meal Decrese</MenuItem>
                  <MenuItem value={'Change approved meal service time'}>
                    Change approved meal service time
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            {showNumberInput && (
              <div className="w-4/5 mt-10">
                <TextField
                  fullWidth
                  name="amount"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            )}
            {showTimePicker && (
              <div className="w-4/5 mt-8">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      className="w-full"
                      label="Basic time picker"
                      value={time}
                      onChange={handleTimeChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            )}
            <div className="w-4/5 mt-10">
              <SitesSelect
                onSiteSelected={handleSiteChange}
                selectedSiteValue={selectedSite}
              />
            </div>
          </div>
          <div className="w-full flex justify-center my-10">
            <div className="w-4/5 flex items-start">
              <button
                className=" text-black capitalize font-bold w-[115px] h-[40px] text-sm rounded-xl bg-[#FACA1F] shadow-lg"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default withAuth(page);
