const {MongoClient} = require('mongodb')

const url = "mongodb+srv://novanity:novanity_123@novanitydatabase.q8wgs.mongodb.net/proyectos_investigacion?retryWrites=true&w=majority"

const client = new MongoClient(url ,{
    useUnifiedTopology: true,
});

const db = async() => {
    await client.connect();
    return client.db('proyectos_investigacion');
};


module.exports = db;
