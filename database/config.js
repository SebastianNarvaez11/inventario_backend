const mongoose = require('mongoose')

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('base de datos online')

    } catch (error) {
        console.log(error)
        throw new Error('Error al lanzar la base de datos')
    }
}


module.exports = {
    dbConnection
}