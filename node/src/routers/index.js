const {Router} = require('express');
const router = Router();

//Ruta inicial 
router.get('/', (req, res) =>{
    res.json({
        message: "Ruta inicial."
    });
})



module.exports = router;