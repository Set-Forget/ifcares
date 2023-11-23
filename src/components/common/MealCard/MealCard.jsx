import React, { useState, useContext } from 'react';
import { Checkbox } from 'flowbite-react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider'; 
import "./MealCards.css"

const MealCard = ({ student }) => {
  const { selectedCheckboxData, handleCheckboxChange, updateGlobalCount } = useContext(MealSiteContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const checkboxState = selectedCheckboxData[student.number] || {
    attendance: false,
    breakfast: false,
    lunch: false,
    snack: false,
    supper: false,
  };

  const handleLocalCheckboxChange = (category, checked) => {
    const newCheckboxState = {
      ...checkboxState,
      [category]: checked,
    };
    handleCheckboxChange(student.number, newCheckboxState);
    updateGlobalCount(category, checked);
  };

  return (
    <div className="w-full rounded-lg bg-white mb-4 shadow">
      <div className="p-4 bg-[#E8FDF5] text-black rounded-t-lg flex justify-between items-center flex-col">
        <div className='flex justify-between gap-10'>
            <div className='flex flex-col justify-between'>
                <p className="font-bold text-base mb-2">#</p>
                <p className=" text-base mb-1">{student.number}</p>
            </div>
            <div className='flex flex-col justify-between'>
                <p className="font-bold text-sm mb-2">PARTICIPANT'S NAME</p>
                <p className=" text-base mb-1">{student.name}</p>
            </div>
            <div className='flex flex-col justify-between'>
                <p className="font-bold text-base mb-2">AGE</p>
                <p className=" text-base mb-1">({student.age})</p>
            </div>

        </div>
        <button
          className="text-black text-xl focus:outline-none my-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-5 gap-4 p-4 bg-[#E8FDF5]">
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={checkboxState.attendance}
              onChange={(e) => handleLocalCheckboxChange('attendance', e.target.checked)}
            />
            <span className='text-sm'>AT</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={checkboxState.breakfast}
              onChange={(e) => handleLocalCheckboxChange('breakfast', e.target.checked)}
            />
            <span  className='text-sm'>BRK</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={checkboxState.lunch}
              onChange={(e) => handleLocalCheckboxChange('lunch', e.target.checked)}
            />
            <span  className='text-sm'>LU</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={checkboxState.snack}
              onChange={(e) => handleLocalCheckboxChange('snack', e.target.checked)}
            />
            <span  className='text-sm'>SNK</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={checkboxState.supper}
              onChange={(e) => handleLocalCheckboxChange('supper', e.target.checked)}
            />
            <span  className='text-sm'>SUP</span>
          </label>
        </div>
      )}
    </div>
  );
};


export default MealCard;
