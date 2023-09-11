const { Schema, model } = require('mongoose')
const ItemCompra = require("./ItemCompra");
const moment = require('moment')

const CompraSchema = Schema({

    observacion: { type: String },
    no_factura: { type: String, unique: [true, 'Ya existe una compra con este no. de factura'] },
    sub_total: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    proveedor: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
    usuario_creador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: ItemCompra }],
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })


CompraSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('DD-MM-YYYY')
        returnedObject.updated = moment(returnedObject.updated).format('DD-MM-YYYY')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Compra', CompraSchema)