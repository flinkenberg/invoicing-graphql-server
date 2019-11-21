import { CustomerMin, InvoiceStatus } from "./graphl_types"

export interface InvoiceDb {
  _id: string;
  customer: CustomerMin;
  total: number;
  createdAt: number;
  status: InvoiceStatus;
}