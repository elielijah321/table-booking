import React from 'react';
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the datepicker

export interface MyDatePickerProps {
  selectedDate: Date | null; // Optional selected date
  disabledDates: Date[];
  onDateSelect: (date: Date | null) => void; // Optional callback to handle date selection
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({ selectedDate,disabledDates, onDateSelect }) => {
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Disable weekends, past dates, and custom disabled dates
  const isDateDisabled = (date: Date): boolean => {
    // Disable weekends (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();
    
    // Reset the time to midnight to ensure we only compare the date part
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for today

    const selectedDateWithoutTime = new Date(date);
    selectedDateWithoutTime.setHours(0, 0, 0, 0); // Reset time to midnight for the selected date

    // Check if the selected date is in the past, is a weekend, or is a disabled date
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Disable weekends (Sunday = 0, Saturday = 6)
    const isPastDate = selectedDateWithoutTime < today; // Disable past dates

    // Check if the date is in the list of disabled dates
    const isDisabledDate = disabledDates.some(disabledDate => {
      const disabledDateWithoutTime = new Date(disabledDate);
      disabledDateWithoutTime.setHours(0, 0, 0, 0); // Reset time to midnight for the disabled date
      return selectedDateWithoutTime.getTime() === disabledDateWithoutTime.getTime();
    });

    // Return true if the date should be disabled (weekend, past date, or in disabledDates)
    return isWeekend || isPastDate || isDisabledDate;
  };

  // Handle date change and pass it to the parent if a callback is provided
  const handleDateChange = (date: Date | null) => {
    if (onDateSelect) {
      onDateSelect(date); // Pass the selected date to the parent component
      // setSelectedDate(date);

    }
  };

  return (
    <div>
      {/* <DatePicker
        className='form-control'
        selected={selectedDate}
        onChange={handleDateChange} // Use the custom handler
        filterDate={date => !isDateDisabled(date)}  // Invert the logic to disable dates correctly
        placeholderText="Select a date"
        dateFormat="d/MM/yyyy"  // Customize date format as desired


      /> */}
    </div>
  );
};

export default MyDatePicker;
