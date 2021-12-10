import {GraphQLServer} from "graphql-yoga"
import resolvers from "./graphql/resolvers/index.js"
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { rule, shield, and, or, not } from "graphql-shield";

//administrar rutas
import { fileURLToPath } from 'url';
import path from "path"
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const checkToken = (req) => {
    let token;
    //const tokenHeader = req.headers['token'];
    try{
        // Verificamos y guardamos el token
        token = jwt.verify(req.request.headers.authorization, process.env.SECRET);
    }catch(e){
        return null;
    }
    return token; // Retornamos el token
}

const isAuthenticated = rule() (async(parent, args, ctx, info) => {
    return ctx.claims.role !==  null;
})

const canAddProjects = rule() (async(parent, args, ctx, info) => {
    return ctx.claims.role ===  'Lider';
})

const isAdmin = rule() (async(parent, args, ctx, info) => {
    return ctx.claims.role ===  'Admin';
})


// Permisos
// const permissions = shield({
//     Query: {
//       users: and(isAuthenticated),
//     },
//     Mutation: {
//       addUser: and(isAuthenticated, canAddUser),
//     },
// });
const permissions = shield({
    Query: {
        usuarios: and(isAuthenticated, isAdmin),
        
    },
    Mutation: {
        editUsuario: and(isAuthenticated),
        createProyecto: and(isAuthenticated, canAddProjects)
    },
});

//configuración del server
export const server = new GraphQLServer({
    typeDefs: path.join(__dirname, "graphql/schema.graphql"),
    resolvers,
    middlewares: [permissions],
    context: (req) => ({
        claims: checkToken(req),
    }),
});
