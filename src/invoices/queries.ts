import { QueryResolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";

const queries: QueryResolvers<GlobalContext> = {
  getInvoices: async (_, __, { collections: { invoices } }) => await invoices.find().toArray(),
};

export default queries;