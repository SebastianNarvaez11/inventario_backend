const { Schema, model } = require('mongoose')




const UnitSchema = Schema({

    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: [true, ['Ya existe una unidad de medida con este nombre']] },
    abreviacion: { type: String, required: [true, 'La abreviacion es obligatoria']},
    deleted: { type: Boolean, default: false },

},{ timestamps: {createdAt: 'created', updatedAt: 'updated'} })




UnitSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Unit', UnitSchema)