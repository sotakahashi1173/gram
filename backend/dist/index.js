"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const app = (0, express_1.default)();
const PORT = 3000;
const server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: schema_1.resolvers });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
});
