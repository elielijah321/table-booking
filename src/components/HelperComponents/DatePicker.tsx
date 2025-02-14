import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the datepicker

export interface MyDatePickerProps {
  disabledDates: Date[];
  onDateSelect: (date: Date | null) => void; // Optional callback to handle date selection
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({ disabledDates, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Disable weekends, past dates, and custom disabled dates
  const isDateDisabled = (date: Date): boolean => {
    // Disable weekends (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();
    
    // Reset the time to midnight to ensure we only compare the date part
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for today

    const selectedDateWithoutTime = new Date(date);
    selectedDateWithoutTime.setHours(0, 0, 0, 0); // Reset time to midnight for the selected date

    // Check if the selected date is in the past or is a weekend
    const isWeekend = dayOfWeek === 6; // Disable weekends (Sunday = 0, Saturday = 6)
    const isPastDate = selectedDateWithoutTime < today; // Disable past dates

    // Check if the date is in the list of disabled dates
    const isDisabledDate = disabledDates.some(disabledDate => {
      const disabledDateWithoutTime = new Date(disabledDate);
      disabledDateWithoutTime.setHours(0, 0, 0, 0); // Reset time to midnight for the disabled date
      return selectedDateWithoutTime.getTime() === disabledDateWithoutTime.getTime();
    });

    // Return true if the date should be disabled
    return !isWeekend || isPastDate || isDisabledDate;
  };

  // Handle date change and pass it to the parent if a callback is provided
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date); // Pass the selected date to the parent component
    }
  };

  return (
    <div>
      <h2>Pick a Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange} // Use the custom handler
        filterDate={date => !isDateDisabled(date)}  // Invert the logic to disable dates correctly
        placeholderText="Select a date"
      />
    </div>
  );
};

export default MyDatePicker;