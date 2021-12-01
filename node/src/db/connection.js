const {MongoClient} = require('mongodb')

const url = "mongodb+srv://novanity:novanity_123@novanitydatabase.q8wgs.mongodb.net/proyectos_investigacion?retryWrites=true&w=majority"

const client = new MongoClient(url ,{
    useUnifiedTopology: true,
});

const db = async() => {
    try{
        await client.connect();
        console.log('Conectado a la base de datos.')
        return client.db('proyectos_investigacion');
    }catch{
        console.log('Error al conectar a la base de datos.')
    }
};


module.exports = db;
