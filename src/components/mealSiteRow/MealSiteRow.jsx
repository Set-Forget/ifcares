import React from "react";
import { Table } from "flowbite-react";
import './MealSiteRow.css'

const MealSiteRow = ({ siteData }) => {
  return (
    // if (!siteData) {
    //   return null; // You can render some loading or default content here
    // }

    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="mealSiteRow-style">
        {siteData.name}
      </Table.Cell>
      <Table.Cell className="mealSiteRow-style">{siteData.ceId}</Table.Cell>
      <Table.Cell className="mealSiteRow-style">{siteData.siteName}</Table.Cell>
      <Table.Cell className="mealSiteRow-style">{siteData.siteNumber}</Table.Cell>
    </Table.Row>
  );
};

export default MealSiteRow;
