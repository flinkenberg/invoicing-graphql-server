import { MutationResolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";
import { createInvoice } from "./mongodb";

const mutations: MutationResolvers<GlobalContext> = {
  createInvoice: async (_, args) => await createInvoice(args),
};

export default mutations;