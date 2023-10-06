//!Importante llamar router de express asi como exportarlo al final del archivo
const router = require('express').Router()

//Rutas Disponibles
router.use('/venta', require('./routesV1/ventaRouter'))


//En dado caso que no encuentre la ruta responde error 404
router.use('*', (_req,res)=>res.status(404).json('Ruta No encontrada'))

module.exports = router