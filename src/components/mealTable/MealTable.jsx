import { Table } from 'flowbite-react';
import MealTableRow from '../mealTableRow/MealTableRow';
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import MealTableCount from '../mealTableZCount/MealTableCount';
import './MealTable.css';
import dayjs from 'dayjs';
//date select
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//time select
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import axios from 'axios';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const MealTable = () => {
  const {
    studentData,
    selectedSite,
    lastTimeIn,
    lastTimeOut,
    datesBySite,
    selectedDate,
    setSelectedDate,
    setSelectedDateCache,
    selectedTime1,
    setSelectedTime1,
    selectedTime2,
    setSelectedTime2,
    globalCounts,
    dateError,
    setDateError,
    time1Error,
    setTime1Error,
    time2Error,
    setTime2Error,
    handleNextClick,
    dateValidationError,
    setDateValidationError,
    topRef,
  } = useContext(MealSiteContext);

  const validStudentData = Array.isArray(studentData) ? studentData : [];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (lastTimeIn) {
      const timeInFormatted = formatTimeForPicker(lastTimeIn);
      setSelectedTime1(timeInFormatted);

    }
    if (lastTimeOut) { 
      const timeOutFormatted = formatTimeForPicker(lastTimeOut);
      setSelectedTime2(timeOutFormatted);
    }
  }, [lastTimeIn, lastTimeOut]);

  function formatTimeForPicker(dateTimeStr) {
    // Extract the time part using a regular expression
    const timeMatch = dateTimeStr.match(/\d{2}:\d{2}:\d{2}/);
    if (!timeMatch) return null;

    let [hours, minutes] = timeMatch[0].split(':').map(Number);

    // Create a dayjs object with the time, assuming the date is today
    const date = dayjs().hour(hours).minute(minutes).second(0);

    return date;
  }

  // post request with the dates
  const postSelectedDate = async (date) => {
    setIsLoading(true);
    if (selectedSite && date) {
      setSelectedDate(date);

      const formattedDate = date.toISOString(); // Format the date

      // console.log(formattedDate);
      // console.log(selectedSite);

      const dataObject = {
        actionType: 'dates', // Set the action type for your API
        values: {
          site: selectedSite,
          date: formattedDate,
        },
      };

      const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
      const gasUrl =
        'https://script.google.com/macros/s/AKfycbxwfq6r4ZHfN6x66x2Ew-U16ZWnt0gfrhScaZmsNpyKufbRj2n1Zc3UH8ZEFXbA-F8V/exec';

      try {
        const response = await axios.post(
          PROXY_URL + gasUrl,
          JSON.stringify(dataObject),
          {
            headers: {
              'Content-Type': 'application/json',
              'x-requested-with': 'XMLHttpRequest',
            },
          }
        );

        // Handle the response
        if (response.data.result === 'error') {
          console.log('Error Response:', response.data.message);
          setDateValidationError(response.data.message);
        } else {
          console.log('no error', response.data.array);
          setDateValidationError('');
        }
      } catch (error) {
        // Handle errors
        console.error(error);
        setDateValidationError('Error occurred while validating the date');
      }
    }
    setIsLoading(false);
  };

  const shouldDisableDate = (date) => {
    if (!selectedSite || !datesBySite[selectedSite]) {
      // If no site is selected or if there's no data for the selected site
      return false; // Do not disable any dates
    }

    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const validDatesForSite = Object.keys(datesBySite[selectedSite].validDates);
    return !validDatesForSite.includes(formattedDate);
  };

  useEffect((date) => {
    setSelectedDateCache(date)
  }, [selectedDate])

  return (
    <>
      <div ref={topRef}></div>
      <Table>
        <Table.Head>
          <Table.HeadCell className="text-black text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
            Date
          </Table.HeadCell>
          <Table.HeadCell className="text-black text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
            In
          </Table.HeadCell>
          <Table.HeadCell className="text-black text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
            Out
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <tr>
            <Table.Cell className='bg-[#FFFFFF] h-24'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div
                        className={
                          dateError || dateValidationError ? 'border border-red-500 rounded-md' : ''
                        }
                      >
                        <DatePicker
                          className="w-full"
                          value={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                    
                            setDateError(false); // reset error when a date is selected
                            postSelectedDate(date); // Make the POST request with the new date
                          }}
                          shouldDisableDate={shouldDisableDate}
                          required
                          error={Boolean(dateValidationError)}
                          helperText={dateValidationError}
                          disableFuture
                        />
                      </div>
                      {(dateError || dateValidationError) && (
                        <span style={{ color: 'red' }}>
                          {dateValidationError || 'Date is required'}
                        </span>
                      )}
                    </div>
                    {isLoading && (
                      <LoadingSpinner className="relative left-[10px]" />
                    )}
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </Table.Cell>
            <Table.Cell className='bg-[#FFFFFF] h-24'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <div className="flex flex-col">
                    <div className={time1Error ? 'border border-red-500 rounded-md' : ''}>
                      <TimePicker
                        className="w-full"
                        value={selectedTime1}
                        onChange={(time) => {
                          setSelectedTime1(time);
                          setTime1Error(false); // reset error when a time is selected
                        }}
                        required
                        // minTime={minTime}
                        // maxTime={maxTime}
                      />
                    </div>
                    {time1Error && (
                      <span style={{ color: 'red' }}>Time In is required</span>
                    )}
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </Table.Cell>
            <Table.Cell className='bg-[#FFFFFF] h-24'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <div className="flex flex-col">
                    <div className={time2Error ? 'border border-red-500 rounded-md' : ''}>
                      <TimePicker
                        className="w-full"
                        value={selectedTime2}
                        onChange={(time) => {
                          setSelectedTime2(time);
                          setTime2Error(false); // reset error when a time is selected
                        }}
                        required
                        // minTime={minTime}
                        // maxTime={maxTime}
                      />
                    </div>
                    {time2Error && (
                      <span style={{ color: 'red' }}>Time Out is required</span>
                    )}
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </Table.Cell>
          </tr>
        </Table.Body>
      </Table>

      <br />
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="text-black md:text-base lg:text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
            #
          </Table.HeadCell>
          <Table.HeadCell className="text-black md:text-base lg:text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black">
            Participant's Name
          </Table.HeadCell>
          <Table.HeadCell className="text-black md:text-base lg:text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black w-[150px]">
            At
          </Table.HeadCell>
          <Table.HeadCell className="text-black md:text-base lg:text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black w-[150px]">
            Brk
          </Table.HeadCell>
          <Table.HeadCell className="text-black md:text-base lg:text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black w-[150px]">
            Lu
          </Table.HeadCell>
          <Table.HeadCell className="text-black md:text-base lg:text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black w-[150px]">
            Snk
          </Table.HeadCell>
          <Table.HeadCell className="text-black md:text-base lg:text-lg font-bold leading-relaxed min-h-[85px] bg-[#e8fdf5] border-b-2 border-black w-[150px]">
            Sup
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {validStudentData.map((student) => (
            <MealTableRow student={student} selectedSite={selectedSite} selectedDate={selectedDate} datesBySite={datesBySite} key={student.name} />
          ))}
        </Table.Body>
      </Table>
      <br />

      <MealTableCount
        attendanceCount={globalCounts.attendance}
        breakfastCount={globalCounts.breakfast}
        lunchCount={globalCounts.lunch}
        snackCount={globalCounts.snack}
        supperCount={globalCounts.supper}
      />
      <br />
      <div>
        <Button
          variant="contained"
          style={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            backgroundColor: '#3DED97',
            borderRadius: '13px',
            minWidth: '130px',
            minHeight: '40px',
            boxShadow: 'none',
            marginBottom: '100px',
            marginTop: '10px',
            position: 'relative',
            left: '50%',
            translate: '-50%',
          }}
          onClick={() => handleNextClick(validStudentData)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default MealTable;
