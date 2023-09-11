const { Schema, model } = require('mongoose')




const MarkSchema = Schema({

    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: [true, ['Ya existe una marca con este nombre']] },
    deleted: { type: Boolean, default: false },

},{ timestamps: {createdAt: 'created', updatedAt: 'updated'} })




MarkSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Mark', MarkSchema)