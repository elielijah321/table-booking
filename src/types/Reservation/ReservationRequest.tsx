import { BaseRequestModel } from "../RequestModels/BaseRequestModel";
import { Reservation } from "./Reservation";

export interface ReservationRequest extends Reservation, BaseRequestModel { }