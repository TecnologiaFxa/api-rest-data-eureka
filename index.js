// index.js
const express = require('express');


//Conexión a la base de datos
const sequelize = require('./database/configDatabase')

//Importamos modelos de bases de datos para que el sistema los cree y/o se relacione con ellos
require('./database/models/VentaEurekaModel')

const app = express();

//Invoca las variables de entorno
require ('dotenv').config();

//Permite la entrada de datos vía json a nuestro servidor
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

const puerto = process.env.PORT || 3164;

app.use(express.json());

// Define tus rutas y controladores aquí


//Archivo de rutas del API Version 1
app.use('/api/v1/', require('./router/routerV1')); 

//Se arranca la aplicación adicional se realiza la creación y conexion a la BD
app.listen(puerto, ()=>{
    console.log(`Servidor arrancado en el puerto ${puerto}`)

    sequelize.sync( {force: false} ).then(()=>{
        console.log('Conexion a la bd exitosa');
    }).catch(error=>{
        console.log('Error al conectar la bd: ' + error)
    });
});
