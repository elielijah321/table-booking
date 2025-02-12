import { Person } from "../types/People/Person";



const domain = "https://ojafoodmart-functionapp-dev.azurewebsites.net/api"; 
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



export const getAllPeople = async () => {
    const response = await fetch(`${domain}/GetAllPeople`, getGETOptions())
        .then(response => response.json() as Promise<Person[]>);

    return response;
}

export const searchAllPeople = async (searchTerm: string) => {
    const response = await fetch(`${domain}/GetAllPeople?searchTerm=${searchTerm}`, getGETOptions())
        .then(response => response.json() as Promise<Person[]>);

    return response;
}


export const getPersonById = async (id: string) => {

    const response = await fetch(`${domain}/GetPerson/${id}`, getGETOptions())
        .then(response => response.json() as Promise<Person>);

    return response;
}

export const postPerson = async (_entity: Person) => {
    const response = await fetch(`${domain}/PostPerson`, getPOSTOptions(_entity));

    return response;
}

export const deletePersonById = async (id: string) => {
    await fetch(`${domain}/DeletePerson/${id}`, getGETOptions());;
}