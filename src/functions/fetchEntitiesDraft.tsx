// import { Person } from "../types/People/Person";

import { GetBusinessDisabledTimeSlotsRequest } from "../types/RequestModels/GetBusinessDisabledTimeSlotsRequest";
import { ReservationRequest } from "../types/Reservation/ReservationRequest";



// const domain = "https://tablebooking-functionapp-prod.azurewebsites.net/api"; 
const domain = "http://localhost:7071/api";

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


async function getData<T>(endpoint: string): Promise<T> {

    const response = await fetch(`${domain}${endpoint}`, getGETOptions())
        .then(response => response.json() as Promise<T>);

    return response;
  }

  async function postData<T>(endpoint: string, data: T): Promise<string> {

    const response = await fetch(`${domain}${endpoint}`, getPOSTOptions(data))
                    .then(response => response.json() as Promise<string>);

    return response;
  }

export const getTestFunction = async () => {

    return getData(`/TestFunction`);
}

export const postReservation = async (reservation: ReservationRequest) => {
    return postData("/PostReservation", reservation);
}

export const postGetBusinessDisabledTimeSlots = async (request: GetBusinessDisabledTimeSlotsRequest) => {

    return postData("/GetBusinessDisabledTimeSlots", request);
}

export const getBusinessInfo = async (businessName: string) => {
    return getData(`/GetBusiness/${businessName}`);
}