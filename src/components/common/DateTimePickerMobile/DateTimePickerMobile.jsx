import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import React, { useState, useContext } from 'react';

const DateTimePickerMobile = ( {}) => {
    const {
        studentData,
        selectedSite,
        selectedDate,
        setSelectedDate,
        selectedTime1,
        setSelectedTime1,
        selectedTime2,
        setSelectedTime2,
        selectedCheckboxData,
        globalCounts,
        formattedData,
        setFormattedData,
        isModalOpen,
        setIsModalOpen,
        dateError,
        setDateError,
        time1Error,
        setTime1Error,
        time2Error,
        setTime2Error,
        handleNextClick
      } = useContext(MealSiteContext);
 
    return (
    <div className="bg-white rounded-lg p-4 shadow mb-4">
      <div className="flex flex-col gap-4">
        {/* Date picker input */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <div className={`flex flex-col ${dateError ? 'input-error' : ''}`}>
              <label htmlFor="date-picker" className="text-gray-700 font-semibold">DATE</label>
              <DatePicker
                id="date-picker"
                value={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date);
                    setDateError(false); // reset error when a date is selected
                  }}
                  required
              />
              {dateError && <span className="text-red-500 text-sm mt-1">Date is required</span>}
            </div>
          </DemoContainer>
        </LocalizationProvider>

        {/* Time picker input for 'IN' */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <div className={`flex flex-col ${time1Error ? 'input-error' : ''}`}>
              <label htmlFor="time-picker-in" className="text-gray-700 font-semibold">IN</label>
              <TimePicker
                id="time-picker-in"
                value={selectedTime1}
                onChange={(time) => {
                    setSelectedTime1(time);
                    setTime1Error(false); // reset error when a time is selected
                  }}
                  required
              />
              {time1Error && <span className="text-red-500 text-sm mt-1">Time In is required</span>}
            </div>
          </DemoContainer>
        </LocalizationProvider>

        {/* Time picker input for 'OUT' */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer  components={['TimePicker']}>
            <div className={`flex flex-col ${time2Error ? 'input-error' : ''}`}>
              <label htmlFor="time-picker-out" className="text-gray-700 font-semibold">OUT</label>
              <TimePicker
                id="time-picker-out"
                value={selectedTime2}
                onChange={(time) => {
                    setSelectedTime2(time);
                    setTime2Error(false); // reset error when a time is selected
                  }}
                  required
              />
              {time2Error && <span className="text-red-500 text-sm mt-1">Time Out is required</span>}
            </div>
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DateTimePickerMobile;
