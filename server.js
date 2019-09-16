const {GraphQLServer} = require('graphql-yoga');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// ----------------------------------------------------
// GraphQL setup from docs

const Todo = require('./model/todo');

const typeDefs = `
    type Query {
        hello(name: String): String!
        todos: [Todo]
    }
    type Todo {
        id: ID!
        text: String!
        complete: Boolean!
    }
    type Mutation {
        createTodo(text: String!): Todo
        updateTodo(id: ID!, complete: Boolean!): Boolean
        removeTodo(id: ID!): Boolean
    }
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'world'}`,
        todos: () => Todo.find()
    },
    Mutation: {
        createTodo: async (_, { text }) => {
            const todo = new Todo({ text, complete: false });
            await todo.save();
            return todo;
        },
        updateTodo: async (_, { id, complete }) => {
            await Todo.findByIdAndUpdate(id, { complete });
            return true;
        },
        removeTodo: async (_, { id }) => {
            await Todo.findByIdAndRemove(id);
            return true;
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});
connection.once('open', () => {
    server.start(() => console.log('Server running on localhost:4000'));
});

