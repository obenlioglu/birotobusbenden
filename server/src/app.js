const express = require('express');
const prisma = require('./prisma');

require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');

const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({
    playground: true,
    introspection: true,
    typeDefs: importSchema('./src/graphql/schema.graphql'),
    resolvers,
	context: () => ({
        prisma
	})
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 5005 }, () => {
	console.log(`🚀 Server ready at http://localhost:5005${server.graphqlPath}`);
}); 