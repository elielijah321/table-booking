// import { Person } from "../types/People/Person";

import { GetBusinessDisabledTimeSlotsRequest } from "../types/RequestModels/GetBusinessDisabledTimeSlotsRequest";
import { BusinessInfo } from "../types/Reservation/Reservation";
import { ReservationRequest } from "../types/Reservation/ReservationRequest";



const domain = "https://tablebooking-functionapp-prod.azurewebsites.net/api"; 
// const domain = "http://localhost:7071/api";

const getHeaders = () => {
   return  {
        'Content-Type': 'application/json',
    };
}

const getGETOptions = () => {
    return  {
        method: 'GET',
        headers: getHeaders()
    }
}

const getPOSTOptions = (object: any) => {
    return  {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(object)
    }
}

export const getTestFunction = async () => {
    const response = await fetch(`${domain}/TestFunction`, getGETOptions())
        .then(response => response.json() as Promise<string>);

    return response;
}


export const postReservation = async (reservation: ReservationRequest) => {
    const response = await fetch(`${domain}/PostReservation`, getPOSTOptions(reservation)).then(response => response.json() as Promise<string>);

    return response;
}


export const postGetBusinessDisabledTimeSlots = async (request: GetBusinessDisabledTimeSlotsRequest) => {
    const response = await fetch(`${domain}/GetBusinessDisabledTimeSlots`, getPOSTOptions(request)).then(response => response.json() as Promise<string[]>);

    return response;
}

export const getBusinessInfo = async (businessName: string) => {
    const response = fetch(`${domain}/GetBusiness/${businessName}`, getGETOptions())
        .then(response => response.json() as Promise<BusinessInfo>);

    return response;

    // const partSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    // const timeSlots = [
    //     "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", 
    //     "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45",
    //     "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45",
    //     "20:00", "20:15", "20:30", "20:45", "21:00"
    // ];

    // const disabledSlots = ["14:00", "14:15", "14:30", "14:45", "19:30"]; // Example of unavailable slots
    
    // var businessInfo: BusinessInfo = {
    //     businessName: businessName,
    //     businessOfferings: [{
    //         name: "Deposit",
    //         pricePerPerson: 5
    //     }],
    //     partySizes: partSizes,
    //     timeSlots: timeSlots,
    //     disabledSlots: disabledSlots
    // };

    // return businessInfo;
}


// export const getAllPeople = async () => {
//     const response = await fetch(`${domain}/GetAllPeople`, getGETOptions())
//         .then(response => response.json() as Promise<Person[]>);

//     return response;
// }

// export const searchAllPeople = async (searchTerm: string) => {
//     const response = await fetch(`${domain}/GetAllPeople?searchTerm=${searchTerm}`, getGETOptions())
//         .then(response => response.json() as Promise<Person[]>);

//     return response;
// }


// export const getPersonById = async (id: string) => {

//     const response = await fetch(`${domain}/GetPerson/${id}`, getGETOptions())
//         .then(response => response.json() as Promise<Person>);

//     return response;
// }

// export const postPerson = async (_entity: Person) => {
//     const response = await fetch(`${domain}/PostPerson`, getPOSTOptions(_entity));

//     return response;
// }

// export const deletePersonById = async (id: string) => {
//     await fetch(`${domain}/DeletePerson/${id}`, getGETOptions());;
// }