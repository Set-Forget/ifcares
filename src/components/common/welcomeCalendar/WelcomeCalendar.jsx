import React from 'react';
import './WelcomeCalendar.css';
import WelcomeCard from '../welcomeCard/WelcomeCard';


const WelcomeCalendar = ({ siteName, siteData }) => {
    
  const renderDates = () => {
    const dates = Object.keys(siteData.validDates || {});
    return dates.map((date, index) => (
      <WelcomeCard key={index} date={date} siteName={siteName} />
    ));
  };
  return (
    <div className="welcome-calendar-body">
      <h3 className='self-start mt-10 mb-4 title'>{siteName}</h3>
      <div className="welcome-calendar-grid">{renderDates()}</div>
    </div>
  );
};

export default WelcomeCalendar;
