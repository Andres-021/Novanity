import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import auth from './auth.js';

//administrar rutas
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





//configuración del server
export const server = new GraphQLServer({
    typeDefs: path.join(__dirname, "graphql/schema.graphql"),
    resolvers,
    middlewares: [auth.checkAuth()], // Autorizacion
    context: (req) => ({
        claims: auth.checkToken(req), // Verificar token o cabezera
    }),
});
