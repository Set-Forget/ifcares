'use client';
import SitesSelect from '@/components/sitesSelect/SitesSelect';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full my-[80px]">
        <div className="flex items-start justify-start w-4/5">
          <Link href="/">
            <button className="text-transform[capitalize] text-white text-sm font-bold bg-[#5D24FF] rounded-[13px] min-w-[140px] min-h-[40px] shadow-none">
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <form action="submit" className="border-2 min-w-[500px] shadow-xl bg-white">
          <div className="w-full flex justify-center mt-10">
            <h2 className="w-4/5 text-xl md:text-2xl self-start not-italic font-extrabold leading-normal">
              Submit a New Request
            </h2>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <div className="w-4/5">
              <SitesSelect />
            </div>
            <div className="w-4/5 mt-10">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Request Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Request Type"
                >
                  <MenuItem value={10}>Sporks</MenuItem>
                  <MenuItem value={20}>Meal Increase</MenuItem>
                  <MenuItem value={30}>Meal Decrese</MenuItem>
                  <MenuItem value={40}>
                    Change approved meal service time
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="w-full flex justify-center my-10">
            <div className="w-4/5 flex items-start">
              <button
                className=" text-white capitalize font-bold w-[115px] h-[40px] text-sm rounded-xl bg-[#5D24FF] shadow-lg"
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

export default page;
