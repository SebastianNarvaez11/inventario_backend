const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //iniciar coneccion con la base de datos
        this.conectarDB()

        //middlewares
        this.middlewares()

        //routes
        this.routes()
    }


    async conectarDB() {
        await dbConnection()
    }



    middlewares() {
        //cors
        this.app.use(cors())
        
        //lectura y parseo del body a json
        this.app.use(express.json())

        // FileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }



    routes() {
        //autenticacion
        this.app.use('/api/v1/auth', require('../routes/authRoutes'))
        //usuarios
        this.app.use('/api/v1/users', require('../routes/userRoutes'))
        //marcas
        this.app.use('/api/v1/marks', require('../routes/markRoutes'))
        //tipos
        this.app.use('/api/v1/types', require('../routes/typeRoutes'))
        //tipos**
        this.app.use('/api/v1/units', require('../routes/unitRoutes'))
        //materiales
        this.app.use('/api/v1/materials', require('../routes/materialRoutes'))
        //proveedores
        this.app.use('/api/v1/providers', require('../routes/providerRoutes'))
        //compras
        this.app.use('/api/v1/compras', require('../routes/compraRoutes'))
        //productos
        this.app.use('/api/v1/products', require('../routes/productRoutes'))
        //clientes
        this.app.use('/api/v1/clients', require('../routes/clientRoutes'))
        //ventas
        this.app.use('/api/v1/ventas', require('../routes/ventaRoutes'))
    }


    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Backend Saffiro corriendo en http://localhost:${process.env.PORT}`)
        })
    }
}

module.exports = Server