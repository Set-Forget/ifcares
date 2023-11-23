import React from 'react';
import { Modal } from 'flowbite-react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import './SavingModal.css';
import SavingToast from '../savingToast/SavingToast';

const SavingModal = ({ openModal, setOpenModal, loading, message }) => {
  return (
    <>
      <Modal
        show={!!openModal}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Body className="modal-body">
          {loading && (
            <div className="saving-spinner">
              <LoadingSpinner />
            </div>
          )}
          {openModal === 'success' && <SavingToast type="success" />}
          {openModal === 'error' && (
            <SavingToast type="error" message={message} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SavingModal;
