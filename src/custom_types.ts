import { Context } from "apollo-server-core";
import DataLoader from "dataloader";
import { Collection } from "mongodb";
import { InvoiceDb } from "./db_types";

export interface GlobalContext extends Context {
  collections: {
    invoices: Collection<InvoiceDb>;
  };
  loaders: {
    invoices: DataLoader<string, InvoiceDb>;
  };
}