import mongodb, { Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_HOST, MONGO_DB, MONGO_USR, MONGO_PSW } = process.env;

const uri = `mongodb+srv://${MONGO_USR}:${MONGO_PSW}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

const MongoClient = mongodb.MongoClient;

export let db: Db;

export async function init(cb: () => void) {
  try {
    const conn = await MongoClient.connect(uri, { useNewUrlParser: true });
    db = conn.db(MONGO_DB);
    if (!db) throw Error;
    console.log(`💽  Connected to mongoDB at ${MONGO_HOST}`)
    cb();
  } catch {
    console.error("Error initializing client.")
  }
}