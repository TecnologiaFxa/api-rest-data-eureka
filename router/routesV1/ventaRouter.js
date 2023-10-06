const ventaController = require('../../controller/ventaController')

//!Importante llamar router de express asi como exportarlo al final del archivo
const router = require('express').Router()


router.get('/test-venta', ventaController.test)

router.get('/sinc-aut', ventaController.sincAutomatic)

router.get('/sinc-man', ventaController.sincManual)


// Exportamos el modulo para que pueda ser usado en otros archivos
module.exports = router