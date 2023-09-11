const { Schema, model } = require('mongoose')
const moment = require('moment')



const ItemCompraSchema = Schema({

    // compra: { type: Schema.Types.ObjectId, ref: 'Compra', required: true },
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    cantidad: { type: Number, default: 0 },
    sub_total: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })



ItemCompraSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('DD-MM-YYYY')
        returnedObject.updated = moment(returnedObject.updated).format('DD-MM-YYYY')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model(' ItemCompra', ItemCompraSchema)