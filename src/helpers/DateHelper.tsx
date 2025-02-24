
export const getDisplayDateAndTime = (date?: Date) => {

    if(date)
    {
        var dateParts = getDateParts(date);


        const time = dateParts[1];
        const [hours, minutes] = time.split(':');
        const formattedTime = `${hours}:${minutes}`;
        console.log(formattedTime);

        return `${dateParts[0]} @ ${formattedTime}`;
    }

    return '';
}

export const getDisplayDate = (date?: Date) => {

    var formattedDate = date ? getDateParts(date)[0] : "";
    return formattedDate;
}


export const getShortDateFornat = (date: Date) => {

    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',  // "Thu"
        day: '2-digit',     // "20"
        month: 'short'      // "Feb"
    }).format(date);

}


const getDateParts = (date: Date) => {

    var dateParts = new Date(date).toLocaleString("en-GB").split(",");


    // dateParts[1] = dateParts[1].split(":")[1];
    // dateParts[1] = dateParts[1].split(":").slice(0, 2).join(":");

    //2025-02-22T15:27:43.225084

    return dateParts;

}


export const getCalendarDate = (date?: Date) => {

    var formattedDate = getDisplayDate(date);
    var calendarDate = formattedDate !== "" ? formattedDate = formattedDate.split("/").reverse().join("-") : "";

    return calendarDate;
}

export const getDayOfTheWeek = (date: Date) => {

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

    return days[ date.getDay() ];
}

export const dateIsInThePast = (date: Date) => {

    var today = new Date();
    var dateToCheck = new Date(date);

    const result = today > dateToCheck;

    return result;
}

export const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

export const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    result.setHours(9);
    result.setMinutes(0);
    result.setSeconds(0);
    return result;
  }

  export const addHours = (date: Date, hours: number) => {
    var result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }


export const getDayFromDate = (date: Date) => {

    return getCalendarDate(date).split('-')[2]
}

export const dateTimeTryParse = (dateString: string): boolean => {
    // Split the date string into year, month, and day
    const [year, month, day] = dateString.split('-');

    // Create a new Date object with the parsed values
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

    // Check if the parsing was successful
    if (isNaN(parsedDate.getTime())) {
      // Parsing failed, return null or throw an error
      return false;
    }else{
        return true;
    }
}

export const minDate = getCalendarDate(new Date(2022, 12, 1));

const getTomorrow = () => {
    var tomorrow = new Date();
    tomorrow.setDate(new Date().getDate());
    return getCalendarDate(tomorrow);
}

export const maxDate = getTomorrow();



export const disableTyping = (e: any) => {

    const disableTyping = false;

    if (disableTyping) {
         e.preventDefault();
    }

}

export const generateTimeSlots = (
    startTime: string,
    endTime: string,
    intervalMinutes: number
  ): string[] => {
    const timeSlots: string[] = [];
  
    // Convert time strings to Date objects
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
  
    let current = new Date(0, 0, 0, startHours, startMinutes);
    const end = new Date(0, 0, 0, endHours, endMinutes);
  
    while (current < end) {
      const nextSlot = new Date(current.getTime() + intervalMinutes * 60000); // Add interval in ms
      if (nextSlot > end) break;
  
      // Format time as HH:mm
      const formattedTime = current.toTimeString().slice(0, 5);
      timeSlots.push(formattedTime);
  
      current = nextSlot;
    }
  
    return timeSlots;
  }  