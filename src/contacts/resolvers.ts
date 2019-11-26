import queries from "./queries";
import { Resolvers } from "../graphl_types";
import { GlobalContext } from "../custom_types";

const resolvers: Resolvers<GlobalContext> = {
  Query: queries,
  Contact: {
    id: ({ _id }) => {
      return _id.toString()
    },
  }

}

export default resolvers;