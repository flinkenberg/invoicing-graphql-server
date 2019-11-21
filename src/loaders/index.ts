import DataLoader from "dataloader";
import { db } from "../db";
import { InvoiceDb } from "../db_types";


async function batchInvoices(ids: string[]): Promise<InvoiceDb[]> {
  const expenses = await db.collection("invoices").find({ "_id": { $in: ids } }).toArray();
  console.log(`Batched invoices: ${ids}`)
  const idsMap = expenses.reduce((acc, item) => ({ ...acc, [item._id]: item }), {});
  return ids.map(id => idsMap[id]);
}

export default {
  invoicesLoader: () => new DataLoader<string, any>(batchInvoices),
}