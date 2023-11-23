import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


const Input = ({ label, id, value, onChange }) => {
    return (
        <div className="mt-10 space-y-8  sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
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
    )
}
export default function EditModal({student, isOpen, onClose, onSave}) {
    const [editedStudent, setEditedStudent] = useState({ ...student });
    // const [openModal, setOpenModal] = useState(undefined);

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
                                            <Input label="Name" id="name" value={editedStudent.name} onChange={handleChange}></Input>
                                            <Input label="Age" id="age" value={editedStudent.age} onChange={handleChange}></Input>
                                            <Input label="Site" id="site" value={editedStudent.site} onChange={handleChange}></Input>
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 flex gap-10">
                                <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => {
                                            onSave(student, editedStudent);
                                            onClose(); // Cierra EditModal
                                          }}>
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
            </Dialog>
        </Transition.Root>
    )
}
