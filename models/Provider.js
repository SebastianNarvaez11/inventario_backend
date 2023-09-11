const { Schema, model } = require('mongoose')

const ProviderSchema = Schema({

    nit: { type: String, required: [true, 'El Nit es obligatorio'], unique: [true, 'Ya existe un proveedor con este nit'] },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: [true, [' ya existe un proveedor con este nombre']] },
    direccion: { type: String },
    contacto: { type: String },
    telefono: { type: String },
    email: { type: String, required: [true, 'el correo es obligatorio']},
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })


ProviderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Provider', ProviderSchema)