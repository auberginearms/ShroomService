import { ApolloServer } from "@apollo/server";
import { Pantry } from "pantry-cloud";
import { pantry } from "./pantry.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

type Cordycep {
    cordycepName: String
    cordycepDescription: String
    cordycepImage:String
}
type PageText {
    pageHeader: String
    pageDescription: String 
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    cordyceps: [Cordycep!]!
    getCordycep(cordycepName: String!): Cordycep
    home: PageText!
    contact: PageText!
    about: PageText!
    terms: PageText!
    catalog: PageText
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    home: async () => {
      return await pantry.getBasket("Home");
    },
    contact: async () => {
      return await pantry.getBasket("Contact");
    },
    about: async () => {
      return await pantry.getBasket("About");
    },
    terms: async () => {
      return await pantry.getBasket("Terms");
    },
    catalog: async () => {
      return await pantry.getBasket("Catalog");
    },
    cordyceps: async () => {
      const cordycepBasket = await pantry.getBasket("Cordyceps");
      // console.log(cordycepBasket);

      return cordycepBasket.allCordyceps;
    },
  },
};

//use to retrieve a more specific item with more complicated logic

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
