import { Table } from "flowbite-react";
import React, { useContext } from "react";
import "./MealTableCountRow.css";
import { MealSiteContext } from "../mealSiteProvider/MealSiteProvider";

const MealTableCountRow = ({
  attendanceCount,
  breakfastCount,
  lunchCount,
  snackCount,
  supperCount,
}) => {

  const { globalCounts } = useContext(MealSiteContext); // Use context

  return (
    <>
      <Table.Row >
        <Table.Cell className="number">{globalCounts.attendance}</Table.Cell>
        <Table.Cell className="number">{globalCounts.breakfast}</Table.Cell>
        <Table.Cell className="number">{globalCounts.lunch}</Table.Cell>
        <Table.Cell className="number">{globalCounts.snack}</Table.Cell>
        <Table.Cell className="number">{globalCounts.supper}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MealTableCountRow;
