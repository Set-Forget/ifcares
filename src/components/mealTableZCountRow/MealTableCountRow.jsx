import { Table } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import "./MealTableCountRow.css";
import { MealSiteContext } from "../mealSiteProvider/MealSiteProvider";

const MealTableCountRow = ({
  attendanceCount,
  breakfastCount,
  lunchCount,
  snackCount,
  supperCount,
}) => {

  const { globalCounts, selectedDate, selectedDateCache, resetGlobalCounts } = useContext(MealSiteContext); // Use context

  useEffect(() => {
    if (selectedDate !== selectedDateCache) {
      resetGlobalCounts()
    }
  }, [selectedDate])
  

  return (
    <>
      <Table.Row >
        <Table.Cell className="text-black text-lg font-bold leading-7 bg-[#ffffff] h-14">{globalCounts.attendance}</Table.Cell>
        <Table.Cell className="text-black text-lg font-bold leading-7 bg-[#ffffff] h-14">{globalCounts.breakfast}</Table.Cell>
        <Table.Cell className="text-black text-lg font-bold leading-7 bg-[#ffffff] h-14">{globalCounts.lunch}</Table.Cell>
        <Table.Cell className="text-black text-lg font-bold leading-7 bg-[#ffffff] h-14">{globalCounts.snack}</Table.Cell>
        <Table.Cell className="text-black text-lg font-bold leading-7 bg-[#ffffff] h-14">{globalCounts.supper}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MealTableCountRow;
