import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DatePicker: React.FC<Props> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div>
      <h3>Select Date Range:</h3>
      <ReactDatePicker
        selected={startDate || undefined} 
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate || undefined} 
        endDate={endDate || undefined}     
        placeholderText="Start Date"
      />
      <ReactDatePicker
        selected={endDate || undefined}    
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate || undefined} 
        endDate={endDate || undefined}     
        minDate={startDate || undefined}   
        placeholderText="End Date"
      />
    </div>
  );
};

export default DatePicker;
