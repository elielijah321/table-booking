import { BaseRequestModel } from "../RequestModels/BaseRequestModel";
import { Person } from "./Person";

export interface PersonRequest extends Person, BaseRequestModel { }