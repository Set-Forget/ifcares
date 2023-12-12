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
        <Table.HeadCell className="text-black md:text-sm lg:text-lg font-bold leading-relaxed md:max-w-[140px] min-h-[85px] bg-[#A6F7D1] border-b-2 border-black">Total Program Participants</Table.HeadCell>
        <Table.HeadCell className="text-black md:text-sm lg:text-lg font-bold leading-relaxed md:max-w-[140px] min-h-[85px] bg-[#A6F7D1] border-b-2 border-black">Total breakfasts</Table.HeadCell>
        <Table.HeadCell className="text-black md:text-sm lg:text-lg font-bold leading-relaxed md:max-w-[140px] min-h-[85px] bg-[#A6F7D1] border-b-2 border-black">Total lunches</Table.HeadCell>
        <Table.HeadCell className="text-black md:text-sm lg:text-lg font-bold leading-relaxed md:max-w-[140px] min-h-[85px] bg-[#A6F7D1] border-b-2 border-black">Total snacks</Table.HeadCell>
        <Table.HeadCell className="text-black md:text-sm lg:text-lg font-bold leading-relaxed md:max-w-[140px] min-h-[85px] bg-[#A6F7D1] border-b-2 border-black">Total suppers</Table.HeadCell>
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
