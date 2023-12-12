import React from "react";
import { Table } from "flowbite-react";
import './MealSiteRow.css'

const MealSiteRow = ({ siteData }) => {
  return (
    // if (!siteData) {
    //   return null; // You can render some loading or default content here
    // }

    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="text-black text-base font-semibold leading-6 bg-[#ffffff] h-12">
        {siteData.name}
      </Table.Cell>
      <Table.Cell className="text-black text-base font-semibold leading-6 bg-[#ffffff] h-12">{siteData.ceId}</Table.Cell>
      <Table.Cell className="text-black text-base font-semibold leading-6 bg-[#ffffff] h-12">{siteData.siteName}</Table.Cell>
      <Table.Cell className="text-black text-base font-semibold leading-6 bg-[#ffffff] h-12">{siteData.siteNumber}</Table.Cell>
    </Table.Row>
  );
};

export default MealSiteRow;
