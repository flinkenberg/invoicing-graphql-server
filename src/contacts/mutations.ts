import { MutationResolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";
import { createContact } from "./mongodb";

const mutations: MutationResolvers<GlobalContext> = {
  createContact: async (_, args) => await createContact(args),
};

export default mutations;