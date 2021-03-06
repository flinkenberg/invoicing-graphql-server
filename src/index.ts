import { ApolloServer, mergeSchemas, makeExecutableSchema } from "apollo-server";
import { init } from "./db";
import typeDefs from "./schema.graphql";
import invoicesResolvers from "./invoices/resolvers";
import contactsResolvers from "./contacts/resolvers";
import { GlobalContext } from "./custom_types";
import { invoicesLoader } from "./invoices/mongodb";
import { contactsLoader } from "./contacts/mongodb";

const mergedSchema = makeExecutableSchema({ typeDefs, resolvers: [invoicesResolvers, contactsResolvers] })

const server = new ApolloServer({
  introspection: true,
  subscriptions: {
    path: "/",
  },
  schema: mergeSchemas({
    schemas: [mergedSchema]
  }),
  context: (): GlobalContext => ({
    loaders: {
      invoices: invoicesLoader(),
      contacts: contactsLoader(),
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
