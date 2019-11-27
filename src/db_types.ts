import { CustomerMin, InvoiceStatus } from "./graphl_types"
import { ObjectID } from "bson";

export interface InvoiceDb {
  _id: ObjectID;
  invoiceNo: string;
  title: string;
  customer: CustomerMin;
  currency: string;
  taxRate: number;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  dueAt: Date;
  issuedAt: Date;
  status: InvoiceStatus;
  notes: string;
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