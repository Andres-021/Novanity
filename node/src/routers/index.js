const {Router} = require('express');
const router = Router();

//Ruta inicial 
router.get('/', (req, res) =>{
    res.send('Ruta inicial');
})

module.exports = router;