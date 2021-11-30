import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://novanity:novanity_123@novanitydatabase.q8wgs.mongodb.net/proyectos_investigacion?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => console.log("La base de datos está conectada"))
  .catch((err) => console.log(err));
