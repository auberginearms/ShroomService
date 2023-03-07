import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
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
    catalog: PageText!
  }
`;
const cordyceps = [
  {
    cordycepName: "Cute Cordycep",
    cordycepDescription: "It is cute",
    cordycepImage:
      "https://media.istockphoto.com/id/1298338829/vector/print.jpg?s=612x612&w=0&k=20&c=5md-EbBeSPaEPC2w2CT8GLMqy8FHrgSdCUnkRMVP0Zc=",
  },
  {
    cordycepName: "Angry Cordycep",
    cordycepDescription: "You will get hurt",
    cordycepImage: "https://media.tenor.com/qhpPztDdd7AAAAAC/mad-angry.gif",
  },
  {
    cordycepName: "Dumb Cordycep",
    cordycepDescription: "It doesn't know anything",
    cordycepImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcJ6ngS1sKYrO04DVA5ohDv8XOYSfZecvSQ&usqp=CAU",
  },
  {
    cordycepName: "Cunning Cordycep",
    cordycepDescription: "It will manipulate you",
    cordycepImage:
      "https://static.wikia.nocookie.net/battlefordreamislandfanfiction/images/d/d5/Poison_Mushroom_FOFG.png",
  },
  {
    cordycepName: "Boss Cordycep",
    cordycepDescription: "Don't tell it what to do",
    cordycepImage:
      "https://sdl-stickershop.line.naver.jp/products/0/0/1/1153413/android/stickers/6250916.png;compress=true",
  },
];
const home = {
  pageHeader: "Welcome to Cordycepland",
  pageDescription: "Prepare to be shroomed",
};
const contact = {
  pageHeader: "Contact Us",
  pageDescription: "Using magical shrooms",
};
const about = {
  pageHeader: "About Us",
  pageDescription: "We are now mushrooms too",
};
const terms = {
  pageHeader: "Terms and Conditions",
  pageDescription:
    "You may observe mushrooms with us on the condition that you are a mushroom",
};
const catalog = {
  pageHeader: "Shroomalog",
  pageDescription: "",
};

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    home: () => {
      return home;
    },
    contact: () => {
      return contact;
    },
    about: () => {
      return about;
    },
    terms: () => {
      return terms;
    },
    catalog: () => {
      return catalog;
    },
    cordyceps: () => {
      return cordyceps;
    },
    getCordycep: (_, args) => {
      return cordyceps.find((cordycep) => {
        return cordycep.cordycepName === args.cordycepName;
      });
    },
  },
};
//use to retrieve a more specific item with more complicated logic
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
