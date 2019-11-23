import { Context } from "apollo-server-core";
import { InvoiceDb } from "./db_types";
import DataLoader from "dataloader";

export interface GlobalContext extends Context {
  loaders: {
    invoices: DataLoader<string, InvoiceDb>;
  };
}

export interface DBResultWithMeta<T> {
  items: T[];
  total: number;
}