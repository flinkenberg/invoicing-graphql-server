import { QueryResolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";
import { getInvoices } from "./mongodb";

const queries: QueryResolvers<GlobalContext> = {
  getInvoices: async (_, args) => await getInvoices(args),
};

export default queries;