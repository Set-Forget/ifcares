import useIsMobile from "../../../hooks/useIsMobile";
import MealTable from "../mealTable/MealTable";
import React, { useState, useContext } from 'react';
import MealTableCount from "../mealTableZCount/MealTableCount";
import MealTableModal from "../mealTableModal/MealTableModal";
import MealCountMobile from "../mealCountMobile/MealCountMobile";
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import MealCard from "../MealCard/MealCard";
import DateTimePickerMobile from "../DateTimePickerMobile/DateTimePickerMobile"
import { Button } from '@mui/material';

const MealList = () => {
  const isMobile = useIsMobile();
  const {
    studentData,
    selectedSite,
    handleNextClick,
    isModalOpen,
    setIsModalOpen,
    formattedData,
    selectedDate,
    selectedTime1,
    selectedTime2,
  } = useContext(MealSiteContext);

  const validStudentData = Array.isArray(studentData) ? studentData : [];

  return (
    <>
      {isMobile ? (
        <>
          <DateTimePickerMobile></DateTimePickerMobile>
          <div className="flex flex-col gap-10 justify-center items-center w-full">
            {validStudentData.map((student) => (
              <MealCard student={student} key={student.name} />
            ))}
          </div>
          <MealCountMobile></MealCountMobile>
          <div className="button-container my-4">
            <Button
              variant="contained"
              style={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                backgroundColor: '#3DED97',
                borderRadius: '13px',
                minWidth: '130px',
                minHeight: '40px',
                boxShadow: 'none',
              }}
              onClick={() => handleNextClick(validStudentData)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <MealTable studentData={studentData} selectedSite={selectedSite} />
      )}
      {isModalOpen && (
        <MealTableModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          formattedData={formattedData}
          selectedDate={selectedDate}
          selectedTime1={selectedTime1}
          selectedTime2={selectedTime2}
          selectedSite={selectedSite}
        />
      )}
    </>
  )

}

export default MealList;