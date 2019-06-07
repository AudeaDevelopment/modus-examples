import express from "express";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import resolvers from "./api/resolvers/resolver-merger";
import { userModels } from "./database";

process.env.NODE_MODULES_CACHE = false;
process.env.NPM_CONFIG_PRODUCTION = false;

const corsOpts = `*`;
const { ApolloServer } = require(`apollo-server-express`);

const app = express();
app.use(cors(corsOpts));
dotenv.config();
const userTypesArray = fileLoader(path.join(__dirname, `/api/types`));
const typeDefs = mergeTypes(userTypesArray, { all: true });

const userGQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => userModels,
  tracing: true,
  cacheControl: true,
  engine: false
});

const mongooseConnection = [
  mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    () => console.log(`mongoose connected!`)
  )
];

userGQLServer.applyMiddleware({
  app,
  cors: true,
  mongooseConnection,
  path: `/api/example`
});

app.listen({ port: process.env.PORT || 4321 }, () => {
  console.log(`🚀 Server ready`);
});
