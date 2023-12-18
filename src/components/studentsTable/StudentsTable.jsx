import React, { useEffect, useState } from "react";
import axios from "axios";

import { Table } from "flowbite-react";
import { Button } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import { useBreakpoint } from "../../hooks/useMediaQuery";

import StudentsRow from "../studentsRow/StudentsRow";
import SitesDropdown from "../sitesDropdown/SitesDropdown";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import Pagination from "../pagination/pagination";
import { ROLES } from "../../constants/index";
import EditModal from "../editModal/editModal";

import "./StudentsTable.css";
import Link from "next/link";
import DeleteModal from "../deleteModal/DeleteModal";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10); // You can adjust this number
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const { isMobile } = useBreakpoint();
  //const isMobile = useIsMobile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openModal, setOpenModal] = useState(undefined);

  let authObj = useAuth();
  let auth = authObj.auth;
  

  const paginate = (pageNumber) => {
    // Calculate the total number of pages based on the filtered students
    const totalNumberOfPages = Math.ceil(
      filteredStudents.length / studentsPerPage
    );

    // Ensures the page number stays within valid bounds
    const newPageNumber = Math.max(1, Math.min(pageNumber, totalNumberOfPages));
    setCurrentPage(newPageNumber);
  };

  const filteredStudents = selectedSite
    ? students.filter((student) => student.site === selectedSite)
    : students;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSite, students]);

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDeleteModalOpen = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    document.body.style.overflow = 'auto'; 
  };

  const handleEdit = async (originalStudent, editedStudentData, onSuccess) => {
    setOpenModal("pop-up");
    setStudentsPerPage(10);
  
    const formattedData = {
      actionType: "edit",
      values: [
        originalStudent.name,
        originalStudent.site,
        editedStudentData.name,
        editedStudentData.age,
        editedStudentData.site,
      ],
    };
  
    console.log(formattedData);
  
    const PROXY_URL = "https://happy-mixed-gaura.glitch.me/";
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbydLMqJketiihQlyAnRZB9IeXXsyqHpJga6K_meVD_YuqKVvr5EVLPgO7xKsEXNFK51/exec";
  
    try {
      const response = await axios.post(PROXY_URL + GAS_URL, JSON.stringify(formattedData), {
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
        },
      });
  
      console.log("success:", response);
      setOpenModal("success");
      setTimeout(() => {
        onSuccess();
      }, 3000);
      window.location.reload()
    } catch (error) {
      console.log("error:", error);
      setOpenModal("error");
      setTimeout(() => {
        setOpenModal(null);
      }, 3000);
      window.location.reload()
    }
  };
  

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxwfq6r4ZHfN6x66x2Ew-U16ZWnt0gfrhScaZmsNpyKufbRj2n1Zc3UH8ZEFXbA-F8V/exec";

  useEffect(() => {
    Promise.all([
      axios.get(GAS_URL + "?type=students"),
      axios.get(GAS_URL + "?type=sites"),
    ])
      .then(([studentsResponse, sitesResponse]) => {
        console.log("Students data:", studentsResponse.data);
        if (auth.role !== ROLES.Admin) {
          const students = studentsResponse.data.filter(
            (item) => item.site === auth.assignedSite
          );
          const sites = sitesResponse.data.filter(
            (item) => item.name === auth.assignedSite
          );
          setStudents(students);
          setSites(sites);
          setLoading(false);
        } else {
          setStudents(studentsResponse.data);
          setSites(sitesResponse.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`bg-gray-100 p-0 m-0 box-border ${
        isDeleteModalOpen ? "modal-open" : ""
      }`}
    >
      <div className="relative left-1/2 -translate-x-1/2 mt-5 mb-12 w-4/5 min-h-[800px] pb-20 table-container">
        <div className="flex w-full justify-between mt-[75px] mb-[30px] min-h-[50px] flex-col md:flex-row items-center">
          {/* This div will be full width on mobile and align the button to the end/right */}
          <div className="w-full flex justify-end md:justify-start md:w-auto -mt-12 md:-mt-[12px]">
            <Link href="/mealCount">
              <Button
                variant="contained"
                className="text-transform[capitalize] font-bold bg-[#3DED97] rounded-[13px] min-w-[130px] min-h-[40px] shadow-none text-base"
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  backgroundColor: "#3DED97",
                  borderRadius: "13px",
                  minWidth: "130px",
                  minHeight: "40px",
                  boxShadow: "none",
                }}
              >
                Meal Count
              </Button>
            </Link>
          </div>
          {/* This div will center the dropdown and button below the Meal Count button on mobile */}
          <div className="flex flex-row justify-center m-auto items-center w-full mt-4 md:justify-end md:mt-0 md:flex-row md:items-center text-base">
            {auth.role !== ROLES.Admin && (
              <h2 className="title pr-10">{auth.assignedSite}</h2>
            )}
            {auth.role === ROLES.Admin && (
              <SitesDropdown
                sites={sites}
                onSiteSelected={setSelectedSite}
                selectedSite={selectedSite}
                className="mb-4 md:mb-0 md:mr-4 text-base md:text-2xl h-auto md:h-28"
              />
            )}
            <Link href="/addStudent">
              <Button
                className="text-transform[capitalize] font-bold bg-[#5D24FF] rounded-[13px] min-w-[130px] min-h-[40px] shadow-none"
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  backgroundColor: "#5D24FF",
                  borderRadius: "13px",
                  minWidth: "130px",
                  minHeight: "40px",
                  boxShadow: "none",
                }}
              >
                Add Student
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center">
            <LoadingSpinner />
            <h2>Loading Students...</h2>
          </div>
        ) : (
          <>
            <div className="sm:block hidden w-full">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell className="uppercase text-gray-600 text-lg font-bold leading-loose min-h-[85px] bg-white border-b-2 border-black w-[350px]">
                    Student Name
                  </Table.HeadCell>
                  <Table.HeadCell className="uppercase text-gray-600 text-lg font-bold leading-loose min-h-[85px] bg-white border-b-2 border-black">
                    Age
                  </Table.HeadCell>
                  {auth.role === ROLES.Admin && (
                    <Table.HeadCell className="uppercase text-gray-600 text-lg font-bold leading-loose min-h-[85px] bg-white border-b-2 border-black">
                      Site
                    </Table.HeadCell>
                  )}
                  {/* Edit cell */}
                  <Table.HeadCell className="text-gray-600 text-sm font-bold leading-loose min-h-[85px] bg-white border-b-2 border-black hidden md:table-cell">
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                  {/* Delete cell */}
                  <Table.HeadCell className="text-gray-600 text-sm font-bold leading-loose min-h-[85px] bg-white border-b-2 border-black hidden md:table-cell">
                    <span className="sr-only">Delete</span>
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                  {currentStudents
                    .filter(
                      (student) =>
                        !selectedSite || student.site === selectedSite
                    )
                    .map((student) => (
                      <StudentsRow
                        student={student}
                        key={student.name}
                        showSiteColumn={auth.role === ROLES.Admin}
                        birthdate={student.birthdate}
                        onDeleteModalOpen={handleDeleteModalOpen}
                        // handleEdit={(editedStudent) => handleEdit(student, editedStudent)}
                      />
                    ))}
                </Table.Body>
              </Table>
            </div>
            <div className="block sm:hidden ">
              {/* Mobile-friendly list */}
              {currentStudents
                .filter(
                  (student) => !selectedSite || student.site === selectedSite
                )
                .map((student) => (
                  <div
                    className="flex flex-col p-4 border-b bg-white rounded-lg mt-2 text-lg"
                    key={student.name}
                  >
                    <span className="font-bold bg-white rounded-lg text-xl">
                      {student.name}
                    </span>
                    <span className="text-lg">Age: {student.age}</span>
                    {auth.role === ROLES.Admin && (
                    <span className="text-lg">Site: {student.site}</span>
                    )}
                    <div className="flex justify-end font-semibold">
                      <Button
                        onClick={() => {
                          console.log("is mobile", isMobile);

                          if (isMobile) {
                            // Abrir editModal
                            console.log("Abrir modal");
                            handleRowClick(student);

                            console.log("isEditModalOpen", isEditModalOpen);
                          }
                          console.log("logeando");
                        }}
                        style={{
                          marginTop: "-65px",
                          fontWeight: "semibold",
                          color: "#5D24FF",
                          fontSize: "1.2rem",
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          if (isMobile) {
                            handleDeleteModalOpen(student);
                          }
                        }}
                        style={{
                          marginTop: "-65px",
                          fontWeight: "semibold",
                          color: "#E02424",
                          fontSize: "1.2rem",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            <Pagination
              studentsPerPage={studentsPerPage}
              totalStudents={filteredStudents.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
        {isEditModalOpen && (
          <EditModal
            student={selectedStudent}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            openModal={openModal}
            sites={sites}
          />
        )}
        {isDeleteModalOpen && (
        <div className="modal-overlay">
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => handleDeleteModalClose()}
            student={selectedStudent}
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsTable;
