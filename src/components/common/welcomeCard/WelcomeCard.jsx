import React from 'react';
import { Card } from 'flowbite-react';
import './WelcomeCard.css';

const WelcomeCard = ({ date, siteName }) => {
  // Function to format the date
  const formatDate = (dateStr) => {
    // Correcting the date string format if necessary
    const correctedDateStr = dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00Z`;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const date = new Date(correctedDateStr);
    const dayOfWeek = days[date.getUTCDay()]; // Using getUTCDay() for UTC dates
    const dayOfMonth = date.getUTCDate(); // Using getUTCDate() for UTC dates
    const month = months[date.getUTCMonth()]; // Using getUTCMonth() for UTC dates
  
    // Adding the suffix for the day of the month
    const suffix = (dayOfMonth) => {
      if (dayOfMonth > 3 && dayOfMonth < 21) return 'th';
      switch (dayOfMonth % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };
  
    return `${dayOfWeek}, ${dayOfMonth}${suffix(dayOfMonth)} of ${month}`;
  };

  const formattedDate = formatDate(date);


  return (
    <>
      <div className="welcome-grid-container">
        <Card href="#" className="individual-card">
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {formattedDate} {/* Display the formatted date */}
          </h5>
        </Card>
      </div>
    </>
  );
};

export default WelcomeCard;
