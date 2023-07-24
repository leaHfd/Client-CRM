import { Data } from "@angular/router";
import { Lookup } from "app/core/model/lookup.model";
import { RecordStatus } from "./enums";

export interface IUser {
  id?: number;
  privateId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: number;
  recordStatus: RecordStatus;
  statusUpdatedAt?: Data;
  statusUpdatedBy?: number;
  departments: Array<Lookup>;
  userName: string;
  password: string;
  roleId: any;
  createdAt?: Data;
  updatedAt?: Data;
}
