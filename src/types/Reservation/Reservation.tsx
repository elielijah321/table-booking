export interface Reservation {
    id: string;
    partySize: number;
    reservationDate: Date;
    time: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    notes: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    pricePerItem: number;
    businessId: string;
}


export interface ReservationSuccessModel {
  name: string;
  reservationDate: Date;
  time: string;
  businessName: string;
}

export interface Offering {
  name: string;
  pricePerPerson: number;
  id: string;
}

export interface ReservationInfo {
  businessInfo: BusinessInfo;
  reservation: Reservation;
}

export interface IconProps {
  className?: string;
}

export interface BusinessInfo {
  id: string;
  businessName: string;
  businessType: string;
  email: string;
  address: string;
  phoneNumber: string;
  defaultOfferingName: string;
  defaultOfferingPrice: number;
  businessOfferings: Offering[];
  maxCapacity: number;
  startTime: string;
  endTime: string;
  timeSlots: string[];
  reservations: Reservation[];
}