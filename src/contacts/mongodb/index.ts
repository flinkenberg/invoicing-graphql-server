import { db } from "../../db";
import { DBResultWithMeta } from "../../custom_types";
import { ContactDb } from "../../db_types";
import { ObjectID } from "bson";
import DataLoader from "dataloader";
import { MutationCreateContactArgs } from "../../graphl_types";


export async function getContacts(): Promise<DBResultWithMeta<ContactDb>> {
  const cursor = await db.collection("contacts").find({});
  const total = await cursor.count();
  await cursor.skip(0);
  const items = await cursor.toArray();
  cursor.close();
  return {
    total,
    items,
  };
}

async function batchedContacts(ids: string[]): Promise<ContactDb[]> {
  const objIds = ids.map(ObjectID.createFromHexString);
  const cursor = await db.collection("contacts").find({ "_id": { $in: objIds } });
  const idsMap = new Map<string, ContactDb>();
  await cursor.forEach(item => idsMap.set(item._id.toString(), item));
  cursor.close();
  return ids.map(id => idsMap.get(id));
}

export async function createContact(args: MutationCreateContactArgs): Promise<ContactDb> {
  const contact = {
    ...args.input,
  };
  const res = await db.collection<Omit<ContactDb, "_id">>("contacts").insertOne(contact);
  return res.ops[0];
}

export const
  contactsLoader = () => new DataLoader<string, any>(batchedContacts);