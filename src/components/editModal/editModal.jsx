import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ROLES } from "../../constants/index";
import useAuth from "../../hooks/useAuth";

const Input = ({ label, id, value, onChange }) => {
  return (
    <div className="mt-10 space-y-8  sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:pb-0">
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          {label}
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            value={value}
            onChange={onChange}
            type="text"
            name={id}
            id={id}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

const SelectInput = ({ label, id, value, options, onChange }) => {
  return (
    <div className="mt-10 space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:pb-0">
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          {label}
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <select
            value={value}
            onChange={onChange}
            name={id}
            id={id}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default function EditModal({ student, isOpen, onClose, onSave, sites }) {
  const [editedStudent, setEditedStudent] = useState({ ...student });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // const [openModal, setOpenModal] = useState(undefined);

  const optionsFromAPI = sites.map((option) => ({
    label: option.name,
    value: option.name,
    key: option.spreadSheetId,
  }));

  let authObj = useAuth();
  let auth = authObj.auth;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed flex items-center justify-center inset-0 z-10 overflow-y-auto">
          <div className="flex justify-center p-4 text-center sm:items-center justify-center sm:p-0 w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <form>
                      <Input
                        label="Name"
                        id="name"
                        value={editedStudent.name}
                        onChange={handleChange}
                      ></Input>
                      <Input
                        label="Age"
                        id="age"
                        value={editedStudent.age}
                        onChange={handleChange}
                      ></Input>
                      {auth.role === ROLES.Admin && (
                        <SelectInput
                          label="Site"
                          id="site"
                          value={editedStudent.site}
                          options={optionsFromAPI}
                          onChange={handleChange}
                        />
                      )}
                    </form>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex gap-10">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      setLoading(true);
                      onSave(student, editedStudent, () => {
                        setLoading(false);
                        setSuccessMessage(true);
                        onClose(); // Cierra EditModal
                      });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <div>
          {/* Mostrar el mensaje de éxito */}
          {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                {" "}
                Student data has been updated.
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  onClick={() => setSuccessMessage(false)}
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.435a1 1 0 0 1-1.4-1.428l2.93-2.436-2.93-2.435a1 1 0 0 1 1.4-1.428L10 8.586l2.93-2.435a1 1 0 0 1 1.414 1.428L11.414 10l2.934 2.849a1 1 0 0 1 0 1.414z" />
                </svg>
              </span>
            </div>
          )}

          {/* Mostrar el spinner de carga si loading es true */}
          {loading && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            </div>
          )}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
