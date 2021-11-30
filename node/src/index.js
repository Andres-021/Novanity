//Aqui haremos uso de express
const app = require('./app');



const main = async() =>{
    app.listen(5000);
    console.log('Server on')
}

main()