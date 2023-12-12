import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import DeleteToast from '../deleteToast/DeleteToast';

const DeleteModal = ({ onClose, student }) => {
  const [openModal, setOpenModal] = useState('pop-up');
  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState(null);
  const props = { openModal, setOpenModal };

  const handleCloseModal = () => {
    setOpenModal(undefined);
    onClose && onClose();
  };

  const handleDeleteStudent = () => {
    setLoading(true);
    const deleteData = {
      actionType: 'delete',
      values: [student.name, student.site],
    };

    console.log(deleteData);

    const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
    const GAS_DELETE_URL =
      'https://script.google.com/macros/s/AKfycbxwfq6r4ZHfN6x66x2Ew-U16ZWnt0gfrhScaZmsNpyKufbRj2n1Zc3UH8ZEFXbA-F8V/exec';

    axios
      .post(PROXY_URL + GAS_DELETE_URL, JSON.stringify(deleteData), {
        headers: {
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
        },
      })
      .then((response) => {
        console.log('Student deleted successfully:', response.data);
        setLoading(false);
        setToastType('success');
        setTimeout(handleCloseModal, 4000);
        setTimeout(() => window.location.reload(), 4000);
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
        setLoading(false);
        setToastType('error');
        setTimeout(handleCloseModal, 4000);
        setTimeout(() => window.location.reload(), 4000);
      });
  };

  return (
    <>
      <Modal
        show={props.openModal === 'pop-up'}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Footer />
        {toastType ? (
          <div className="flex items-center justify-center h-full mb-8">
            <DeleteToast type={toastType} />
          </div>
        ) : (
          <>
            <Modal.Body className="modal-body">
              <div className="text-center">
                {loading ? (
                  <div className="loading-spinner">
                    <LoadingSpinner />
                    <h2>Deleting {student.name}...</h2>
                  </div>
                ) : (
                  <>
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to <b>delete</b> {student.name}?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button color="failure" onClick={handleDeleteStudent}>
                        Yes, I'm sure
                      </Button>
                      <Button color="gray" onClick={handleCloseModal}>
                        No, cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default DeleteModal;
