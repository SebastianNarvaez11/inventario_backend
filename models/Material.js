const { Schema, model } = require('mongoose')
const moment = require('moment')




const MaterialSchema = Schema({

    codigo: { type: String, required: [true, 'El codigo es obligatorio'], unique: [true, 'Ya existe un material con ese codigo'] },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: [true, ['Ya existe un material con este nombre']] },
    precio_unidad: { type: Number, required: [true, 'El precio es obligatorio'] },
    existencia: { type: Number, default: 0 },
    ultima_compra: { type: Date },
    marca: { type: Schema.Types.ObjectId, ref: 'Mark', required: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    unidad_medida: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
    img: { type: String },
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })



MaterialSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('DD-MM-YYYY')
        returnedObject.updated = moment(returnedObject.updated).format('DD-MM-YYYY')
        returnedObject.ultima_compra = moment(returnedObject.ultima_compra).format('DD-MM-YYYY')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Material', MaterialSchema)