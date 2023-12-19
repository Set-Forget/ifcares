import React from 'react';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import SavingToast from '../savingToast/SavingToast';

const SavingModal = ({ openModal, setOpenModal, loading, message }) => {
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${openModal ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full" style={{ height: 'auto', minHeight: '100px' }}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {loading && (
              <div className="flex flex-col items-center justify-center">
                <LoadingSpinner />
                <h2 className="mt-2 text-center text-lg font-medium text-gray-900">Editing Student...</h2>
              </div>
            )}
            {openModal === 'success' && <SavingToast type="success" />}
            {openModal === 'error' && <SavingToast type="error" message={message} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingModal;
