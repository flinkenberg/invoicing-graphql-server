import DataLoader from "dataloader";
import { db } from "../../db";
import { InvoiceDb } from "../../db_types";
import { FilterQuery, ObjectID } from "mongodb";
import { QueryGetInvoicesArgs, MutationCreateInvoiceArgs } from "../../graphl_types";
import { DBResultWithMeta } from "../../custom_types";


export async function getInvoices(params: QueryGetInvoicesArgs): Promise<DBResultWithMeta<InvoiceDb>> {
  const { search, searchKey, sortKey } = params;
  const limit = params.limit || 25;
  const offset = params.offset || 0;
  const isDesc = params.isDesc || false;
  let filter: FilterQuery<InvoiceDb> = {};
  if (search && searchKey) {
    if (searchKey === "total") {
    } else if (searchKey === "customer") {
      filter = {
        ...filter,
        "customer.name": {
          $regex: `.*${search}.*`,
          $options: "i"
        }
      }
    } else {
      filter[searchKey] = {
        $regex: `.*${search}.*`,
        $options: "i"
      };
    }
  }
  const cursor = await db.collection("invoices").find(filter)
  if (sortKey) cursor.sort(sortKey, isDesc ? -1 : 1);
  const total = await cursor.count();
  await cursor.skip(offset);
  const items = await cursor.limit(limit).toArray();
  cursor.close();
  return {
    total,
    items,
  };
}

async function batchedInvoices(ids: string[]): Promise<InvoiceDb[]> {
  const objIds = ids.map(ObjectID.createFromHexString);
  const cursor = await db.collection("invoices").find({ "_id": { $in: objIds } });
  const idsMap = new Map<string, InvoiceDb>();
  await cursor.forEach(item => idsMap.set(item._id.toString(), item));
  cursor.close();
  return ids.map(id => idsMap.get(id));
}

export async function createInvoice(args: MutationCreateInvoiceArgs): Promise<InvoiceDb> {
  const invoice = {
    ...args.input,
    createdAt: new Date(),
    status: args.input.status
  };
  const res = await db.collection<Omit<InvoiceDb, "_id">>("invoices").insertOne(invoice);
  return res.ops[0];
}

export const
  invoicesLoader = () => new DataLoader<string, any>(batchedInvoices);