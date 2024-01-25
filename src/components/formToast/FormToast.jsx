import React from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiX } from 'react-icons/hi';

const FormToast = ({ type, message }) => {
  if (type === 'success') {
    return (
      <div
        id="toast-simple"
        class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow"
        role="alert"
      >
        <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 text-green-500">
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <span class="sr-only">Check icon</span>
        <div class="ps-4 text-sm font-normal">Student Added Successfully!</div>
      </div>
    );
  } else if (type === 'error') {
    let errorMessage = 'Student could not be added. Try again later.';

    // Check for specific error message
    if (message === 'Student already exists') {
      errorMessage = 'Student could not be added. Full name must be unique.';
    }

    return (
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{errorMessage}</div>
        <Toast.Toggle />
      </Toast>
    );
  }
  return null;
};

export default FormToast;
