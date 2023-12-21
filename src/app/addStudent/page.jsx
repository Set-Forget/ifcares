'use client'


import './Form.css';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SitesSelect from '../../components/sitesSelect/SitesSelect';
import axios from 'axios';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import React, { useState } from 'react';
import FormToast from '../../components/formToast/FormToast';
import withAuth from '@/hoc/hocauth';
// Date picker imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from 'next/link';

const Form = () => {
  let initialValues = {
    name: '',
    birthdate: null,
    age: '',
    site: '',
    customError: '',
  };

  const [submitting, setSubmitting] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setFieldValue('birthdate', newValue);
    setFieldValue('customError', '');
  };

  const onSubmit = (data) => {
    setSubmitting(true);
    // console.log(data);
    const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
    const GAS_URL =
      PROXY_URL +
      'https://script.google.com/macros/s/AKfycby-a-e3_HPrtTWps2Sa0PAww03XHbqWNX2RHTrRFeZjoLMLIp7GqZXh5mDYKejjgUOh/exec';

    // Format the date
    const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';

    const formattedData = {
      actionType: 'add',
      values: [data.name, data.age, data.site, formattedDate],
    };

    // console.log(formattedData);

    axios
      .post(GAS_URL, JSON.stringify(formattedData), {
        headers: {
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
        },
        mode: 'no-cors',
      })
      .then((response) => {
        if (response.data.result === 'success') {
          // console.log('Data sent successfully');
          setToastType('success');
          setSubmitting(false);
        } else {
          // console.error('Error in sending data:', response.data.message);
          setToastType('error');
          setToastMessage(response.data.message);
          setSubmitting(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setToastType('error');
        setSubmitting(false);
      });
  };

  const { handleSubmit, handleChange, errors, values, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        name: Yup.string()
          .matches(/^[A-Za-z ]+$/, 'Name can only contain letters and spaces.')
          .required('Please enter a name.'),
        birthdate: Yup.date()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          ),
        age: Yup.number().positive().integer().nullable(),
        site: Yup.string().required('Please select a Site.'),
      }).test(
        'birthdateOrAge',
        'Please enter either an age or a birthdate.',
        function (values) {
          const { birthdate, age } = values;
          if (birthdate || age) {
            return true;
          } else {
            return new Yup.ValidationError(
              'Please enter either an age or a birthdate.',
              null,
              'birthdateOrAge'
            );
          }
        }
      ),
      onSubmit,
      validateOnBlur: false,
      validateOnChange: false,
    });

  const handleSiteSelection = (selectedSite) => {
    setFieldValue('site', selectedSite);
  };

  // Function to clear the birthdate component
  const [cleared, setCleared] = React.useState(false);
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <div className="body">
      {submitting ? (
        <div className="loading-spinner">
          <LoadingSpinner />
          <h2>Adding Student...</h2>
        </div>
      ) : (
        <>
          <div className="form-header">
            <div className="button-container">
              <Link href="/home">
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    backgroundColor: '#5D24FF',
                    borderRadius: '13px',
                    minWidth: '130px',
                    minHeight: '40px',
                    boxShadow: 'none',
                  }}
                >
                  Back
                </Button>
              </Link>
            </div>
          </div>
          <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="title">Add a New Student</h2>
            <TextField
              className="text-field"
              name="name"
              label="Full Name"
              variant="outlined"
              type="text"
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <div className="datepicker-container">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Birthdate"
                    className="datepicker-item"
                    value={values.birthdate}
                    onChange={handleDateChange}
                    slotProps={{
                      field: {
                        clearable: true,
                        onClear: () => setCleared(true),
                      },
                    }}
                    disableFuture
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <TextField
              className="text-field"
              name="age"
              label="Age"
              variant="outlined"
              type="number"
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
            />
            {errors.birthdateOrAge && (
              <div className="error-message">{errors.birthdateOrAge}</div>
            )}
            <div className='text-field'>
            <SitesSelect
              onSiteSelected={handleSiteSelection}
              error={!!errors.site}
              helperText={errors.site}
              selectedSiteValue={values.site}
            />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                width: '115px',
                height: '40px',
                fontSize: '14px',
                borderRadius: '13px',
                background: '#5D24FF',
                boxShadow: '0px 4px 10px 2px rgba(0, 0, 0, 0.25)',
              }}
            >
              Submit
            </Button>
          </form>

          <div className="toast-container">
            {toastType === 'success' && (
              <div className="toast-wrapper-class">
                <FormToast type={toastType} message={toastMessage} />
              </div>
            )}
            {toastType === 'error' && (
              <div className="toast-wrapper-class">
                <FormToast type={toastType} message={toastMessage} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(Form);
