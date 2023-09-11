const { Schema, model } = require('mongoose')
const moment = require('moment')



const ItemVentaSchema = Schema({

    // Venta: { type: Schema.Types.ObjectId, ref: 'Venta', required: true },
    producto: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sub_total: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })



ItemVentaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('DD-MM-YYYY')
        returnedObject.updated = moment(returnedObject.updated).format('DD-MM-YYYY')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model(' ItemVenta', ItemVentaSchema)