import queries from "./queries";
import { Resolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";
import mutations from "./mutations";

const resolvers: Resolvers<GlobalContext> = {
  Query: queries,
  Mutation: mutations,
  Contact: {
    id: ({ _id }) => {
      return _id.toString()
    },
  }

}

export default resolvers;