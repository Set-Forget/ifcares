import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import DeleteToast from "../deleteToast/DeleteToast";

const DeleteModal = ({ onClose, student }) => {
  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState(null);

  const handleDeleteStudent = () => {
    setLoading(true);
    setLoading(true);
    const deleteData = {
      actionType: "delete",
      values: [student.name, student.site],
    };

    const PROXY_URL = "https://happy-mixed-gaura.glitch.me/";
    const GAS_DELETE_URL =
      "https://script.google.com/macros/s/AKfycbxwfq6r4ZHfN6x66x2Ew-U16ZWnt0gfrhScaZmsNpyKufbRj2n1Zc3UH8ZEFXbA-F8V/exec";

    axios
      .post(PROXY_URL + GAS_DELETE_URL, JSON.stringify(deleteData), {
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
        },
      })
      .then((response) => {
        // console.log("Student deleted successfully:", response.data);
        setLoading(false);
        setToastType("success");
        setTimeout(handleCloseModal, 4000);
        setTimeout(() => window.location.reload(), 4000);
      })
      .catch((error) => {
        // console.error("Error deleting student:", error);
        setLoading(false);
        setToastType("error");
        setTimeout(handleCloseModal, 4000);
        setTimeout(() => window.location.reload(), 4000);
      });

    setTimeout(() => {
      setLoading(false);
      setToastType("success");
      setTimeout(handleCloseModal, 4000);
      setTimeout(() => window.location.reload(), 4000);
    }, 2000);
  };

  const handleCloseModal = () => {
    onClose && onClose();
  };

  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-lg p-8 w-80">
        {toastType ? (
          <div className="flex items-center justify-center mb-8">
            <DeleteToast type={toastType} />
          </div>
        ) : (
          <>
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
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded"
                      onClick={handleDeleteStudent}
                    >
                      Yes, I am sure
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                      onClick={handleCloseModal}
                    >
                      No, cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
