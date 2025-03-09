// import { Person } from "../types/People/Person";

import { GetBusinessDisabledTimeSlotsRequest } from "../types/RequestModels/GetBusinessDisabledTimeSlotsRequest";
import { BusinessInfo, Reservation, ReservationSuccessModel } from "../types/Reservation/Reservation";
import { ReservationRequest } from "../types/Reservation/ReservationRequest";



const domain = "https://carribean-functionapp-dev.azurewebsites.net/api"; 
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



// Businesses
export const getAllBusinessesUrl = `${domain}/GetAllBusinesses`;

export const getAllBusinesses = async () => {

    const response = await fetch(`${domain}/GetAllBusinesses`, getGETOptions())
                                        .then(response => response.json() as Promise<BusinessInfo[]>);


    return response;
}


export const postBusiness = async (business: BusinessInfo) => {
    const response = await fetch(`${domain}/PostBusiness`, getPOSTOptions(business))
                                .then(response => response.json() as Promise<string>);

    return response;
}


// Reservations
export const postReservation = async (reservation: ReservationRequest) => {
    const response = await fetch(`${domain}/PostReservation`, getPOSTOptions(reservation)).then(response => response.json() as Promise<string>);

    return response;
}

export const getAllReservations = async (businessName: string) => {

    const response = await fetch(`${domain}/GetAllReservations/${businessName}`, getGETOptions())
                                        .then(response => response.json() as Promise<Reservation[]>);

    return response;
}

export const postGetBusinessDisabledTimeSlots = async (request: GetBusinessDisabledTimeSlotsRequest) => {
    const response = await fetch(`${domain}/GetBusinessDisabledTimeSlots`, getPOSTOptions(request))
                                    .then(response => response.json() as Promise<string[]>);

    return response;
}

export const getBusinessInfoUrl =  (businessName: string) => {

    return `${domain}/GetBusiness/${businessName}`;

}

export const getBusinessInfo = async (businessName: string) => {

    const response = fetch(`${domain}/GetBusiness/${businessName}`, getGETOptions())
        .then(response => response.json() as Promise<BusinessInfo>);

    return response;
}


export const getStripeCheckoutSession = async (checkoutId: string) => {
    const response = await fetch(`${domain}/GetStripeCheckoutSession/${checkoutId}`, getGETOptions())
        .then(response => response.json() as Promise<ReservationSuccessModel>);

    return response;
}

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