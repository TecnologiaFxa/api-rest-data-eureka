//Archivo de conexión a la base de datos
const { Sequelize } = require("sequelize");

//Llamamos las variables de entorno donde esta toda la configuracion de la bd
require ('dotenv').config();

//enviamos la informacion como parametros donde el orden es
//?Nombre de la BD
//?Usuario de la BD
//?COntraseña de la BD
//?Un objeto que contiene tanto el host de la base de datos y que dialecto tiene, en este caso mysql
const sequelize = new Sequelize(
    process.env.FXA_DATABASE,
    process.env.FXA_USER_DATABASE,
    process.env.FXA_PASS_DATABASE,
    {
        host: process.env.FXA_HOST_DATABASE,
        dialect: process.env.FXA_DIALECT_DATABASE,
        timezone: process.env.FXA_TIMEZONE_DATABASE,
    }
);

module.exports = sequelize;