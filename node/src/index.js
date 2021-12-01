//Aqui haremos uso de express
const app = require('./app');

const main = async() =>{
    console.log('Server on')
    return app.listen(5000);
}

main()