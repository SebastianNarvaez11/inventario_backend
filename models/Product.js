const { Schema, model } = require('mongoose')
const ItemMaterial = require("./ItemMaterial");
const moment = require('moment')


// 1 disponible
// 2 vendido
// 3 no disponible

const ProductSchema = Schema({

    codigo: { type: String, required: [true, 'El codigo es obligatorio'], unique: [true, 'Ya existe un producto con ese codigo'] },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: [true, ['Ya existe un producto con este nombre']] },
    precio: { type: Number, required: [true, 'El precio es obligatorio'], default: 0 },
    costo_mano_obra: { type: Number, required: [true, 'El costo de mano de obra es obligatorio'], default: 0 },
    costo_total: { type: Number, required: [true, 'El costo total es obligatorio'], default: 0 },
    estado: { type: Number, required: true, enum: [1, 2, 3], default: 1 },
    usuario_creador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: ItemMaterial }],
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })




ProductSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('DD-MM-YYYY')
        returnedObject.updated = moment(returnedObject.updated).format('DD-MM-YYYY')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Product', ProductSchema)