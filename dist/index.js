var apolloServer=require('apollo-server'),mongodb=require('mongodb'),dotenv=require('dotenv'),DataLoader=require('dataloader');dotenv.config();
const {
  MONGO_HOST,
  MONGO_DB,
  MONGO_USR,
  MONGO_PSW
} = process.env;
const uri = `mongodb+srv://${MONGO_USR}:${MONGO_PSW}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;
const MongoClient = mongodb.MongoClient;
let db;
async function init(cb) {
  try {
    const conn = await MongoClient.connect(uri, {
      useNewUrlParser: true
    });
    db = conn.db(MONGO_DB);
    if (!db) throw Error;
    console.log(`💽  Connected to mongoDB at ${MONGO_HOST}`);
    cb();
  } catch {
    console.error("Error initializing client.");
  }
}const queries = {
  getInvoices: async (_, __, {
    collections: {
      invoices
    }
  }) => await invoices.find().toArray()
};const resolvers = {
  Query: queries,
  Invoice: {
    id: ({
      _id
    }) => {
      return _id.toString();
    }
  }
};async function batchInvoices(ids) {
  const expenses = await db.collection("invoices").find({
    "_id": {
      $in: ids
    }
  }).toArray();
  console.log(`Batched invoices: ${ids}`);
  const idsMap = expenses.reduce((acc, item) => ({ ...acc,
    [item._id]: item
  }), {});
  return ids.map(id => idsMap[id]);
}

var loaders = {
  invoicesLoader: () => new DataLoader(batchInvoices)
};var typeDefs = "type CustomerMin {\n  id: ID!\n  name: String!\n}\n\ntype Invoice {\n  id: ID!\n  customer: CustomerMin!\n  total: Int!\n  createdAt: Int!\n  status: InvoiceStatus!\n}\n\nenum InvoiceStatus {\n  DUE\n  PAST_DUE\n  PAID\n  UNPAID\n}\n\ntype Query {\n  getInvoices: [Invoice]!\n  _: Boolean\n}\n";
const mergedSchema = apolloServer.makeExecutableSchema({
  typeDefs,
  resolvers: [resolvers]
});
const server = new apolloServer.ApolloServer({
  schema: apolloServer.mergeSchemas({
    schemas: [mergedSchema]
  }),
  context: () => ({
    collections: {
      invoices: db.collection("invoices")
    },
    loaders: {
      invoices: loaders.invoicesLoader()
    }
  }),
  playground: {
    title: "tracker-server GraphQL"
  }
});
init(() => {
  server.listen().then(({
    url
  }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});