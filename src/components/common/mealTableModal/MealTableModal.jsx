import React, { useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import axios from 'axios';
import SignatureComponent from '../signatureComponent/SignatureComponent';

const MealTableModal = ({
  isOpen,
  closeModal,
  formattedData,
  selectedDate,
  selectedTime1,
  selectedTime2,
}) => {
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const signatureComponentRef = useRef(null); // Initialize ref with null

  const [signatureURL, setSignatureURL] = useState('');

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const generateSign = (url) => {
    // Do something with the generated signature URL (url)
    setSignatureURL(url);
    console.log('Generated Signature URL:', url);
  };

  const handleFormSubmit = () => {
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

    console.log(formattedData);
    console.log('Selected Date:', selectedDate.toISOString());
    // Formatear la data para poder enviarla
    console.log('Selected Time 1:', formatTime(selectedTime1));
    console.log('Selected Time 2:', formatTime(selectedTime2));

    if (signatureComponentRef.current) {
      const formattedSign = signatureComponentRef.current.generateSign();
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
        Signature: signatureURL,
      },
    };

    console.log(dataObject);

    // Close the modal
    handleToggleModal();
  };

  return (
    <>
      <Modal show={isOpen} size="xl" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal">
              <b>
                I certify that the information on this form is true and correct
                to the best of my knowledge and that I will claim reimbursement
                only for <span className="underline">eligible</span> meals
                served to <span className="underline">eligible</span> Program
                participants. I understand that misrepresentation may result in
                prosecution under applicable state or federal laws.
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MealTableModal;
