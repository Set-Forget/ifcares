import './Form.css';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import SitesSelect from '../../common/sitesSelect/SitesSelect';
import axios from 'axios';
import LoadingSpinner from '../../common/loadingSpinner/LoadingSpinner';
import { useState } from 'react';
import FormToast from '../../common/formToast/FormToast';

const Form = () => {
  let initialValues = {
    name: '',
    age: '',
    site: '',
  };

  const [submitting, setSubmitting] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const onSubmit = (data) => {
    setSubmitting(true);
    console.log(data);
    const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
    const GAS_URL =
      PROXY_URL +
      'https://script.google.com/macros/s/AKfycbyWz46LKg4f-voX_3_md70ceFv-AZV6Em5QM8UwIg7wR8f9KFXqG1HlQjAyJA6NKiBm/exec';

    const formattedData = {
      actionType: 'add',
      values: [data.name, data.age, data.site],
    };

    console.log(formattedData);

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
          console.log('Data sent successfully');
          setToastType('success');
          setSubmitting(false);
        } else {
          console.error('Error in sending data:', response.data.message);
          setToastType('error');
          setToastMessage(response.data.message)
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
        name: Yup.string().required('Please enter a name.'),
        age: Yup.number().required('Please enter an age.').positive().integer(),
        site: Yup.string().required('Please select a Site.'),
      }),
      onSubmit,
    });

  const handleSiteSelection = (selectedSite) => {
    setFieldValue('site', selectedSite);
  };

  return (
    <div className="body">
      {submitting ? (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <>
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
            <SitesSelect
              onSiteSelected={handleSiteSelection}
              error={!!errors.site}
              helperText={errors.site}
              selectedSiteValue={values.site}
            />
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
              <div className="your-toast-wrapper-class">
                <FormToast type={toastType} message={toastMessage}/>
              </div>
            )}
            {toastType === 'error' && (
              <div className="your-toast-wrapper-class">
                <FormToast type={toastType} message={toastMessage}/>
              </div>
            )}
          </div>

          <div className="button-container">
            <Link to="/home">
              <Button
                variant="contained"
                size="small"
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  width: '80px',
                  height: '31px',
                  fontSize: '13px',
                  background: '#5D24FF',
                  boxShadow: '0px 4px 10px 2px rgba(0, 0, 0, 0.25)',
                }}
              >
                Back
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
