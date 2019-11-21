import { ApolloServer, mergeSchemas, makeExecutableSchema } from "apollo-server";
import { init, db } from "./db";
import typeDefs from "./schema.graphql";
import invoicesResolvers from "./invoices/resolvers";
import loaders from "./loaders";
import { GlobalContext } from "./custom_types";
import { InvoiceDb } from "./db_types";

const mergedSchema = makeExecutableSchema({ typeDefs, resolvers: [invoicesResolvers] })

const server = new ApolloServer({
  introspection: true,
  subscriptions: {
    path: "/",
  },
  schema: mergeSchemas({
    schemas: [mergedSchema]
  }),
  context: (): GlobalContext => ({
    collections: {
      invoices: db.collection<InvoiceDb>("invoices"),
    },
    loaders: {
      invoices: loaders.invoicesLoader(),
    },
  }),
  playground: {
    title: "tracker-server GraphQL",
  },
});

init(() => {
  server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
