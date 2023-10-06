//!Importante llamar router de express asi como exportarlo al final del archivo
const router = require('express').Router()


router.get('/test-venta', (_req,res)=>res.json({message:"Test Sección venta, salu2"}))

router.get('/sinc-aut', (_req,res)=>res.json({message:"Test Sección venta, salu2"}))

router.get('/sinc-man', (_req,res)=>res.json({message:"Test Sección venta, salu2"}))


// Exportamos el modulo para que pueda ser usado en otros archivos
module.exports = router