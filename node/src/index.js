import { server } from "./server.js";
import "./database.js";
import "dotenv/config";

server.start({ port: process.env.PORT }, ({ port }) => {
  console.log("El servicio está en el puerto", port);
});
console.log("hola");
