import { CustomerMin, InvoiceStatus } from "./graphl_types"
import { ObjectID } from "bson";

export interface InvoiceDb {
  _id: ObjectID;
  customer: CustomerMin;
  currency: string;
  tax: number;
  subtotal: number;
  total: number;
  createdAt: Date;
  dueAt: Date;
  status: InvoiceStatus;
}

export interface ContactDb {
  _id: ObjectID;
  name: string;
  street: string;
  postcode: string;
  county: string;
  country: string;
  email: string;
  phone: string;
}