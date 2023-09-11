const { Schema, model } = require('mongoose')
const moment = require('moment')

// (1, 'Administrador'),
// (2, 'Asistente'),
// (3, 'Contador'))

const UserSchema = Schema({

    username: { type: String, required: [true, 'El nombre de usuario es obligatorio'], unique: [true, [' ya existe un usuario con este nombre de usuario']] },
    first_name: { type: String, required: [true, 'El nombre es obligatorio'] },
    last_name: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, required: [true, 'el correo es obligatorio'], unique: [true, 'ya existe un usuario con este correo'] },
    password: { type: String, required: [true, 'la contraseña es obligatoria'], },
    type: { type: Number, required: true, enum: [1, 2, 3] },
    is_active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })


UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('DD-MM-YYYY')
        returnedObject.updated = moment(returnedObject.updated).format('DD-MM-YYYY')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('User', UserSchema)