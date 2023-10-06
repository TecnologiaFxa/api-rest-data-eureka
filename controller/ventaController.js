const { default: axios } = require("axios")
const xml2js = require('xml2js'); // Para convertir la respuesta XML en un objeto JavaScript
const VentaEurekaModel = require("../database/models/VentaEurekaModel");

const ventaController = {

    test: (_req,res)=> res.json({message:"Test Sección venta, salu2"}),

    sincAutomatic: async(_req,res)=>{
        sincData(new Date(), new Date(), "?", res)
    },

    sincManual: async(req,res)=>{
        const {
            fecha_ini, 
            fecha_fin, 
            almacenes
        } = req.query

        sincData(fecha_ini?fecha_fin:new Date(), fecha_fin?fecha_fin:new Date(), almacenes?almacenes:"?", res)
    }

}


const sincData = async(fecha_ini, fecha_fin, almacenes, res) =>{
    try {

        const soapRequestBody = `<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:tem='http://tempuri.org/'>
            <soapenv:Header/>
            <soapenv:Body>
            <tem:ReporteVentasProductosVendidos>
                <!--Optional:-->
                <tem:Authentication>
                    <tem:User>${process.env.EUREKA_USER}</tem:User>
                    <tem:Password>${process.env.EUREKA_PASSWORD}</tem:Password>
                </tem:Authentication>
                <tem:EncabezadoReporteVentasProductosVendidos>
                    <tem:fecha_desde>${formatDateNow(fecha_ini)}</tem:fecha_desde>
                    <tem:fecha_hasta>${formatDateNow(fecha_fin)}</tem:fecha_hasta>
                    <tem:almacen>${almacenes}</tem:almacen>
                </tem:EncabezadoReporteVentasProductosVendidos>
            </tem:ReporteVentasProductosVendidos>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const headers = {
            'Content-Type': 'text/xml',
            'SOAPAction': '', 
        };

        const resultadoVentas = await axios.post('https://eurekapos.kdoslogic.info/API_Webservice/Server.php', soapRequestBody,{headers})

        console.log(resultadoVentas)
        const xmlResponse = resultadoVentas.data;
                xml2js.parseString(xmlResponse, async(error, result) => {
                    if (error) {
                        console.error('Error parsing XML response:', error);
                        res.json("Ocurrio un error al momento de convertir la información")
                    }else {
                        const data = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:TicketResponseReporteVentasProductosVendidos'][0]['ns1:ResultadoTicket'][0]['ns1:Datos'][0]
                        
                        let ventasResult = []

                        if(!data['ns1:ITEM']){
                            res.json("No hay ventas que sincronizar")
                        }else{

                            for (const venta of data['ns1:ITEM']) {
                                let resultCreate = await VentaEurekaModel.upsert({
                                    codigo_interno_venta: `${venta['ns1:Cod_Almacen'][0]}_${venta['ns1:Caja'][0]}_${venta['ns1:Nro_Factura'][0]}_${venta['ns1:Cod_Referencia'][0]}`,
                                    cod_almacen: parseInt(venta['ns1:Cod_Almacen'][0]),
                                    des_almacen: venta['ns1:Des_Almacen'][0].substring(0, 75),
                                    caja: parseInt(venta['ns1:Caja'][0]),
                                    nro_factura: parseInt(venta['ns1:Nro_Factura'][0]),
                                    fecha_movimiento: venta['ns1:Fecha_Movimiento'][0].substring(0, 12),
                                    hora_movimiento: venta['ns1:Hora_Movimiento'][0].substring(0, 10),
                                    ident_vendedor: parseInt(venta['ns1:Ident_Vendedor'][0]),
                                    nombre_vendedor: venta['ns1:Nombre_Vendedor'][0].substring(0, 75),
                                    ident_cliente: venta['ns1:Ident_CLiente'][0].substring(0, 25),
                                    nombres: venta['ns1:Nombres'][0].substring(0, 40),
                                    apellidos: venta['ns1:Apellidos'][0].substring(0, 40),
                                    cod_referencia: venta['ns1:Cod_Referencia'][0].substring(0, 10),
                                    referencia: venta['ns1:Referencia'][0].substring(0, 75),
                                    cod_plu: venta['ns1:Cod_PLU'][0].substring(0, 10),
                                    barra: venta['ns1:Barra'][0].substring(0, 10),
                                    cod_atributo1: parseInt(venta['ns1:Cod_atributo1'][0]),
                                    des_atributo1: venta['ns1:Des_atributo1'][0].substring(0, 35),
                                    cod_linea: parseInt(venta['ns1:Cod_Linea'][0]),
                                    linea: venta['ns1:Linea'][0].substring(0, 35),
                                    cod_atributo2: parseInt(venta['ns1:Cod_atributo2'][0]),
                                    des_atributo2: venta['ns1:des_atributo2'][0].substring(0, 35),
                                    cod_marca: parseInt(venta['ns1:Cod_marca'][0]),
                                    marca: venta['ns1:Marca'][0].substring(0, 35),
                                    cod_proveedor: parseInt(venta['ns1:Cod_proveedor'][0]),
                                    proveedor: venta['ns1:Proveedor'][0].substring(0, 45),
                                    cod_categoria: parseInt(venta['ns1:Cod_Categoria'][0]),
                                    categoria: venta['ns1:Categoria'][0].substring(0, 45),
                                    costo: parseFloat(venta['ns1:Costo'][0]),
                                    costo_ponderado: parseFloat(venta['ns1:Costo_ponderado'][0]),
                                    impuesto: parseFloat(venta['ns1:Impuesto'][0]),
                                    cod_usuario: parseInt(venta['ns1:Cod_Usuario'][0]),
                                    usuario: venta['ns1:Usuario'][0].substring(0, 35),
                                    cod_lista: parseInt(venta['ns1:Cod_Lista'][0]),
                                    des_lista: venta['ns1:des_Lista'][0].substring(0, 45),
                                    estado: venta['ns1:Estado'][0].substring(0, 5),
                                    presentacion: venta['ns1:Presentacion'][0].substring(0, 45),
                                    valor_unitario: parseFloat(venta['ns1:Valor_Unitario'][0]),
                                    cod_unidad_medida: parseInt(venta['ns1:Cod_Unidad_medida'][0]),
                                    des_unidad_medida: venta['ns1:Des_Unidad_medida'][0].substring(0, 35),
                                    cod_tipo_cliente: parseInt(venta['ns1:Cod_tipo_cliente'][0]),
                                    des_tipo_cliente: venta['ns1:Des_tipo_cliente'][0].substring(0, 35),
                                    clasificacion2: parseInt(venta['ns1:Clasificacion2'][0]),
                                    des_clasificacion2: venta['ns1:Des_Clasificacion2'][0].substring(0, 45),
                                    porcentaje_dscto: parseFloat(venta['ns1:porcentaje_Dscto'][0]),
                                    tipo_producto: venta['ns1:Tipo_Producto'][0].substring(0, 15),
                                    total_unidad: parseInt(venta['ns1:Total_unidad'][0]),
                                    total_x_kg: parseInt(venta['ns1:Total_x_kg'][0]),
                                    total_precio_prod: parseFloat(venta['ns1:Total_Precio_prod'][0]),
                                    total_descuento_prod: parseFloat(venta['ns1:Total_Descuento_Prod'][0]),
                                    total_precio_menos_descuento: parseFloat(venta['ns1:Total_Precio_menos_Descuento'][0]),
                                    utilidad_preciocompra: parseFloat(venta['ns1:Utilidad_PrecioCompra'][0]),
                                    utilidad_precioponderado: parseFloat(venta['ns1:Utilidad_PrecioPonderado'][0]),
                                    total_impuestos: parseFloat(venta['ns1:Total_Impuestos'][0]),
                                    total_impuesto_ico: parseFloat(venta['ns1:Total_Impuesto_ICO'][0])


                                })

                                ventasResult.push(resultCreate)
                            }

                            console.log(ventasResult)
                            res.json("Consulta Generada Correctamente")
                        }
                    }
                });

    } catch (error) {
        console.log("«««««««««««« Ocurrio un error »»»»»»»»»»»»»»»»")
        console.log(error)
        res.status(500).json('Ocurrio un error en el servidor')
    }
}

const formatDateNow = (dateToFormat) =>{
    const fechaActual = new Date(dateToFormat);

    const año = fechaActual.getFullYear(); // Obtiene el año (por ejemplo, 2023)
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-11) y lo formatea a dos dígitos
    const dia = String(fechaActual.getDate()).padStart(2, '0'); // Obtiene el día del mes y lo formatea a dos dígitos

    return `${año}/${mes}/${dia}`;
}

module.exports = ventaController