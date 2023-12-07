import React from "react";
import { Table } from "flowbite-react";
import MealTableCountRow from "../mealTableZCountRow/MealTableCountRow";
import './MealTableCount.css'

const MealTableCount = ({
  attendanceCount,
  breakfastCount,
  lunchCount,
  snackCount,
  supperCount,
}) => {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell className="count-headcell">Total Program Participants</Table.HeadCell>
        <Table.HeadCell className="count-headcell">Total breakfasts</Table.HeadCell>
        <Table.HeadCell className="count-headcell">Total lunches</Table.HeadCell>
        <Table.HeadCell className="count-headcell">Total snacks</Table.HeadCell>
        <Table.HeadCell className="count-headcell">Total suppers</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <MealTableCountRow
          attendanceCount={attendanceCount}
          breakfastCount={breakfastCount}
          lunchCount={lunchCount}
          snackCount={snackCount}
          supperCount={supperCount}
        />
      </Table.Body>
    </Table>
  );
};

export default MealTableCount;
