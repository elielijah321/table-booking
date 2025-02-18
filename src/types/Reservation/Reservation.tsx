export interface Reservation {
    id: string;
    partySize: number;
    date: Date;
    time: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    notes: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    pricePerItem: number;
}

export interface Offering {
  name: string;
  pricePerPerson: number;
}

export interface RestaurantInfo {
  name: string;
  reservation: Reservation;
  offering: Offering;
}

export interface IconProps {
  className?: string;
}

export interface BusinessInfo {
  id: string;
  businessName: string;
  businessOfferings: Offering[];
  maxCapacity: number;
  timeSlots: string[];
}