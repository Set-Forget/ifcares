import React, { useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import axios from 'axios';
import SignatureComponent from '../signatureComponent/SignatureComponent';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import ConfirmationToast from '../confirmationToast/ConfirmationToast';
import './MealTableModal.css';

const MealTableModal = ({
  isOpen,
  closeModal,
  formattedData,
  selectedDate,
  selectedTime1,
  selectedTime2,
  selectedSite,
}) => {
  // const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const signatureComponentRef = useRef(null); // Initialize ref with null

  // const [signatureURL, setSignatureURL] = useState('');

  let signData = '';

  const generateSign = (url) => {
    // Do something with the generated signature URL (url)
    signData = url;
    // setSignatureURL(url);
    // console.log('Generated Signature URL:', url);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [toastType, setToastType] = useState(null);

  const handleFormSubmit = () => {
    setIsLoading(true);
    // function to format the date
    const formatTime = (selectedTime) => {
      if (selectedTime) {
        const date = new Date(selectedTime.$d); // Convert Dayjs object to a Date object
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const timeOfDay = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')} ${timeOfDay}`;
        return formattedTime;
      }
      return '';
    };

    // console.log(formattedData);
    // console.log('Selected Date:', selectedDate.toISOString());
    // Formatear la data para poder enviarla
    // console.log('Selected Time 1:', formatTime(selectedTime1));
    // console.log('Selected Time 2:', formatTime(selectedTime2));

    if (signatureComponentRef.current) {
      const formattedSign = signatureComponentRef.current.generateSign();
      console.log(formattedSign);
    }

    const formattedDate = selectedDate.toISOString();
    const formattedTime1 = formatTime(selectedTime1);
    const formattedTime2 = formatTime(selectedTime2);

    const dataObject = {
      actionType: 'mealCount',
      values: {
        data: formattedData,
        date: formattedDate,
        timeIn: formattedTime1,
        timeOut: formattedTime2,
        signature: signData,
        site: selectedSite,
      },
    };

    console.log(dataObject);

    const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
    const gasUrl =
      'https://script.google.com/macros/s/AKfycbxFyiKCuhFppENSt7Ci-7Krt1528K-uzQokdJmGl7GIKOIKJ84MnK2NJWbqd2hgTsC6/exec';

    // Send the axios post request with the dataObject as the request body
    axios
      .post(PROXY_URL + gasUrl, JSON.stringify(dataObject), {
        headers: {
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
        },
      })
      .then((response) => {
        // Handle the response from the GAS web app
        console.log(response.data);
        setToastType('success');
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 4000);
      })
      .catch((error) => {
        // Handle the error from the GAS web app
        console.error(error);
        setToastType('error');
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 4000);
      })
      .finally(() => {
        // Set the loading state back to false once you get a response or an error
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal show={isOpen} size="xl" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body className="modalBody-container">
          {isLoading ? (
            <div className="loadingSpinner-container">
              <LoadingSpinner />
            </div>
          ) : toastType ? (
            <div className="container-confirmationToast">
              <ConfirmationToast type={toastType} />
            </div>
          ) : (
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal">
                <b>
                  I certify that the information on this form is true and
                  correct to the best of my knowledge and that I will claim
                  reimbursement only for{' '}
                  <span className="underline">eligible</span> meals served to{' '}
                  <span className="underline">eligible</span> Program
                  participants. I understand that misrepresentation may result
                  in prosecution under applicable state or federal laws.
                </b>
              </h3>
              <SignatureComponent
                onGenerateSign={generateSign}
                ref={signatureComponentRef}
              />
              <br />
              <br />
              <div className="flex justify-center gap-4">
                <Button color="green" onClick={handleFormSubmit}>
                  SUBMIT
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MealTableModal;
