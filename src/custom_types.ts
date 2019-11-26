import { Context } from "apollo-server-core";
import { InvoiceDb, ContactDb } from "./db_types";
import DataLoader from "dataloader";

export interface GlobalContext extends Context {
  loaders: {
    invoices: DataLoader<string, InvoiceDb>;
    contacts: DataLoader<string, ContactDb>;
  };
}

export interface DBResultWithMeta<T> {
  items: T[];
  total: number;
}