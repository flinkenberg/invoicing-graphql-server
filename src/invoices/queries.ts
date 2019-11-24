import { QueryResolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";
import { getInvoices } from "./mongodb";

const queries: QueryResolvers<GlobalContext> = {
  getInvoices: async (_, args) => await getInvoices(args),
  getInvoice: async (_, args, { loaders }) => await loaders.invoices.load(args.id),
};

export default queries;