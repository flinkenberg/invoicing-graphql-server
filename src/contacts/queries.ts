import { QueryResolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";
import { getContacts } from "./mongodb";

const queries: QueryResolvers<GlobalContext> = {
  getContacts: async (_, __) => await getContacts(),
  getContact: async (_, args, { loaders }) => await loaders.contacts.load(args.id),
};

export default queries;