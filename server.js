const GraphQLServer = require('graphql-yoga');
const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// ----------------------------------------------------
// GraphQL setup from docs
const typeDefs = `
    type Query {
        hello(name: String): String!
    }
    type Todo {
        id: ID!
        text: String!
        complete: Boolean!
    }
    type Mutation {
        createTodo(text: String!): Todo
    }
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'world'}`,
    },
}

const server = new GraphQLServer({typeDefs, resolvers});
connection.once('open', () => {
    server.start(() => console.log('Server running on localhost:4000'));
});

