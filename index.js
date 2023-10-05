// index.js
const express = require('express');
const sequelize = require('./sequelize'); // Asegúrate de importar la instancia de Sequelize


const app = express();

//Invoca las variables de entorno
require ('dotenv').config();

//Permite la entrada de datos vía json a nuestro servidor
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

const puerto = process.env.PORT || 3164;

app.use(express.json());

// Define tus rutas y controladores aquí


//Se arranca la aplicación adicional se realiza la creación y conexion a la BD
app.listen(puerto, ()=>{
    console.log(`Servidor arrancado en el puerto ${puerto}`)

    sequelize.sync( {force: false} ).then(()=>{
        console.log('Conexion a la bd exitosa');
    }).catch(error=>{
        console.log('Error al conectar la bd: ' + error)
    });
});
