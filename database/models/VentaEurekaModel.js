//Modelo que contiene todas las bodegas

const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configDatabase');

class VentaEurekaModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos


VentaEurekaModel.init({

    codigo_interno_venta:{
        type: DataTypes.STRING(50),
        primaryKey: true
    },

    cod_almacen: DataTypes.INTEGER,
    des_almacen: DataTypes.STRING(75),
    caja: DataTypes.INTEGER,
    nro_factura: DataTypes.INTEGER,
    fecha_movimiento: DataTypes.STRING(12),
    hora_movimiento: DataTypes.STRING(10),
    ident_vendedor: DataTypes.INTEGER,
    nombre_vendedor: DataTypes.STRING(75),
    ident_cliente: DataTypes.STRING(25),
    nombres: DataTypes.STRING(40),
    apellidos: DataTypes.STRING(40),
    cod_referencia: DataTypes.STRING(10),
    referencia: DataTypes.STRING(75),
    cod_plu: DataTypes.STRING(10),
    barra: DataTypes.STRING(10),
    cod_atributo1: DataTypes.INTEGER,
    des_atributo1: DataTypes.STRING(35),
    cod_linea: DataTypes.INTEGER,
    linea: DataTypes.STRING(35),
    cod_atributo2: DataTypes.INTEGER,
    des_atributo2: DataTypes.STRING(35),
    cod_marca: DataTypes.INTEGER,
    marca: DataTypes.STRING(35),
    cod_proveedor: DataTypes.INTEGER,
    proveedor: DataTypes.STRING(45),
    cod_categoria: DataTypes.INTEGER,
    categoria: DataTypes.STRING(45),
    costo: DataTypes.DOUBLE,
    costo_ponderado: DataTypes.DOUBLE,
    impuesto: DataTypes.DOUBLE,
    cod_usuario: DataTypes.INTEGER,
    usuario: DataTypes.STRING(35),
    cod_lista: DataTypes.INTEGER,
    des_lista: DataTypes.STRING(45),
    estado: DataTypes.STRING(5),
    presentacion: DataTypes.STRING(45),
    valor_unitario: DataTypes.DOUBLE,
    cod_unidad_medida: DataTypes.INTEGER,
    des_unidad_medida: DataTypes.STRING(35),
    cod_tipo_cliente: DataTypes.INTEGER,
    des_tipo_cliente: DataTypes.STRING(35),
    clasificacion2: DataTypes.INTEGER,
    des_clasificacion2: DataTypes.STRING(45),
    porcentaje_dscto: DataTypes.DOUBLE,
    tipo_producto: DataTypes.STRING(15),
    total_unidad: DataTypes.INTEGER,
    total_x_kg: DataTypes.INTEGER,
    total_precio_prod: DataTypes.DOUBLE,
    total_descuento_prod: DataTypes.DOUBLE,
    total_precio_menos_descuento: DataTypes.DOUBLE,
    utilidad_preciocompra: DataTypes.DOUBLE,
    utilidad_precioponderado: DataTypes.DOUBLE,
    total_impuestos: DataTypes.DOUBLE,
    total_impuesto_ico: DataTypes.DOUBLE

},{
    sequelize,
    modelName: 'venta_eureka',
    freezeTableName: true,
    timestamps:true
});


module.exports = VentaEurekaModel