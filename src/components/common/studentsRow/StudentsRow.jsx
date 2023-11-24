'use client';

import { Table } from 'flowbite-react';
import './StudentsRow.css';
import DeleteModal from '../deleteModal/DeleteModal';
import { useState } from 'react';
import SitesSelect from '../sitesSelect/SitesSelect';
import axios from 'axios';
import SavingModal from '../savingModal/SavingModal';
import { useEffect } from 'react';

export default function StudentsRow({ student, showSiteColumn }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
    name: student.name,
    age: student.age,
    site: student.site,
  });
  const [openModal, setOpenModal] = useState(undefined);

  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (toastType) {
      setOpenModal(toastType);
      // Reset the toast after a delay
      const timer = setTimeout(() => {
        setOpenModal(null);
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastType, toastMessage]);

  // age cell style modifications
  const ageCellStyle = showSiteColumn
    ? "row-style" // Default style class
    : "row-style-big"; // Apply a different style when site column is not shown

  return (
    <>
      <SavingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        loading={loading}
        type={toastType} // Passed to SavingModal
        message={toastMessage} // Passed to SavingModal
      />

      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="row-style">
          {isEditing ? (
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-violet-500 edit-input"
              value={editedStudent.name}
              onChange={(e) =>
                setEditedStudent({ ...editedStudent, name: e.target.value })
              }
            />
          ) : (
            student.name
          )}
        </Table.Cell>
        <Table.Cell className={ageCellStyle}>
          {isEditing ? (
            <input
              type="number"
              // className="border rounded-md px-3 py-2 w-full focus:border-violet-500 focus:outline-none"
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-violet-500 edit-input"
              value={editedStudent.age}
              onChange={(e) =>
                setEditedStudent({ ...editedStudent, age: e.target.value })
              }
            />
          ) : (
            student.age
          )}
        </Table.Cell>
        {showSiteColumn && (
        <Table.Cell className="row-style">
          {isEditing ? (
            <SitesSelect
              isStudentsRow={true}
              className="edit-select"
              selectedSiteValue={editedStudent.site}
              onSiteSelected={(site) =>
                setEditedStudent((prevStudent) => ({
                  ...prevStudent,
                  site: site,
                }))
              }
            />
          ) : (
            student.site
          )}
        </Table.Cell>
        )}
        <Table.Cell>
          <p
            className="font-medium text-violet-500 hover:underline dark:text-violet-500 cursor-pointer"
            onClick={() => {
              if (isEditing) {
                setLoading(true);
                setOpenModal('pop-up');

                const formattedData = {
                  actionType: 'edit',
                  values: [
                    student.name,
                    student.site,
                    editedStudent.name,
                    editedStudent.age,
                    editedStudent.site,
                  ],
                };

                console.log(formattedData);

                const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
                const GAS_URL =
                  'https://script.google.com/macros/s/AKfycbw9BaufYdgz2QPIoOGq-p8dN7G2wCnMAghYN2MJSW2IMZ2pZxSW8nDc6pDh3ZdIc4NI/exec';

                axios
                  .post(PROXY_URL + GAS_URL, JSON.stringify(formattedData), {
                    headers: {
                      'Content-Type': 'application/json',
                      'x-requested-with': 'XMLHttpRequest',
                    },
                  })
                  .then((response) => {
                    if (response.data.result === 'success') {
                      setToastType('success');
                      setToastMessage('Student edited successfully.');
                    } else {
                      setToastType('error');
                      setToastMessage(
                        response.data.message ||
                          'Student could not be updated. Try again later.'
                      );
                    }
                    setLoading(false);
                    setOpenModal(toastType);
                    setTimeout(() => {
                      setOpenModal(null);
                    }, 3000);
                    setTimeout(() => window.location.reload(), 3000);
                    // hacer lo del refresh
                    // Handle successful response
                  })
                  .catch((error) => {
                    setToastType('error');
                    setToastMessage('An error occurred. Try again later.');
                    console.log('error:', error);
                    setLoading(false);
                    setOpenModal('error');
                    setTimeout(() => {
                      setOpenModal(null); // Hide the toast after a few seconds
                    }, 3000);
                    setTimeout(() => window.location.reload(), 3000);
                    // Handle errors
                  });
              }
              setIsEditing(!isEditing);
            }}
          >
            <span className="editing-style">{isEditing ? 'SAVE' : 'EDIT'}</span>
          </p>
        </Table.Cell>
        <Table.Cell>
          <button
            className="font-medium text-red-600 hover:underline dark:text-red-500"
            onClick={() => setShowDeleteModal(true)}
          >
            DELETE
          </button>
        </Table.Cell>
      </Table.Row>
      {showDeleteModal && (
        <DeleteModal
          student={student}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
