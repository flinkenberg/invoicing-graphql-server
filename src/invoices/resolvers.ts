import queries from "./queries";
import mutations from "./mutations";
import { Resolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";

const resolvers: Resolvers<GlobalContext> = {
  Query: queries,
  Mutation: mutations,
  Invoice: {
    id: ({ _id }) => {
      return _id.toString()
    },
    createdAt: ({ createdAt }) => {
      return createdAt.valueOf().toString()
    },
    dueAt: ({ dueAt }) => {
      return dueAt.valueOf().toString()
    },
  }

}

export default resolvers;