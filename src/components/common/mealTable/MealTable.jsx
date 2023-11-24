import { Table } from 'flowbite-react';
import MealTableRow from '../mealTableRow/MealTableRow';
import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
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

const MealTable = () => {
  const {
    studentData,
    selectedSite,
    lastTimeIn,
    lastTimeOut,
    selectedDate,
    setSelectedDate,
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
    topRef
  } = useContext(MealSiteContext);

  const validStudentData = Array.isArray(studentData) ? studentData : [];

  // const minTime = dayjs().hour(8).minute(5).second(0).millisecond(0);
  // const maxTime = dayjs().hour(19).minute(0).second(0).millisecond(0);

  useEffect(() => {
    if (lastTimeIn) {
      // console.log(lastTimeIn);
      // const timeInFormatted = formatTimeForPicker(lastTimeIn);
      // console.log(timeInFormatted);
      // setSelectedTime1(timeInFormatted);

      const timeInFormatted = formatTimeForPicker(lastTimeIn);
      setSelectedTime1(timeInFormatted);
      console.log(timeInFormatted);
    }
    if (lastTimeOut) {
      // console.log(lastTimeOut);
      // const timeOutFormatted = formatTimeForPicker(lastTimeOut);
      // console.log(timeOutFormatted);
      // setSelectedTime2(timeOutFormatted);
      const timeOutFormatted = formatTimeForPicker(lastTimeOut);
      setSelectedTime2(timeOutFormatted);
      console.log(timeOutFormatted);
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
        'https://script.google.com/macros/s/AKfycbwha1lKdjFTIqLGRHZFWnpivxaFJdBJSkLYqYY0OqTJdRBOU3sl0mB9SKerCMUD-Y5p/exec';

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
  };

  return (
    <>
      <div ref={topRef}></div>
      <Table>
        <Table.Head>
          <Table.HeadCell className="mealTable-headcell">Date</Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell">In</Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell">Out</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Cell>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <div className="dateTimeError-container">
                  <div
                    className={
                      dateError || dateValidationError ? 'input-error' : ''
                    }
                  >
                    <DatePicker
                      className="datepicker-input"
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setDateError(false); // reset error when a date is selected
                        postSelectedDate(date); // Make the POST request with the new date
                      }}
                      required
                      error={Boolean(dateValidationError)}
                      helperText={dateValidationError}
                    />
                  </div>
                  {(dateError || dateValidationError) && (
                    <span style={{ color: 'red' }}>
                      {dateValidationError || 'Date is required'}
                    </span>
                  )}
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </Table.Cell>
          <Table.Cell>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <div className="dateTimeError-container">
                  <div className={time1Error ? 'input-error' : ''}>
                    <TimePicker
                      className="timepicker-input"
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
          <Table.Cell>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <div className="dateTimeError-container">
                  <div className={time2Error ? 'input-error' : ''}>
                    <TimePicker
                      className="timepicker-input"
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
        </Table.Body>
      </Table>

      <br />
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="mealTable-headcell">#</Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell">
            Participant's Name
          </Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell checkbox">
            At
          </Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell checkbox">
            Brk
          </Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell checkbox">
            Lu
          </Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell checkbox">
            Snk
          </Table.HeadCell>
          <Table.HeadCell className="mealTable-headcell checkbox">
            Sup
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {validStudentData.map((student) => (
            <MealTableRow student={student} key={student.name} />
          ))}
        </Table.Body>
      </Table>
      <br />
      <div className="button-container">
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
          }}
          onClick={() => handleNextClick(validStudentData)}
        >
          Next
        </Button>
      </div>
      <br />
      <MealTableCount
        attendanceCount={globalCounts.attendance}
        breakfastCount={globalCounts.breakfast}
        lunchCount={globalCounts.lunch}
        snackCount={globalCounts.snack}
        supperCount={globalCounts.supper}
      />
    </>
  );
};

export default MealTable;
