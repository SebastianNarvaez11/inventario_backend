const { Schema, model } = require('mongoose')
const moment = require('moment')



const ItemMaterialSchema = Schema({

    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    cantidad: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })



ItemMaterialSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('DD-MM-YYYY')
        returnedObject.updated = moment(returnedObject.updated).format('DD-MM-YYYY')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model(' ItemMaterial', ItemMaterialSchema)