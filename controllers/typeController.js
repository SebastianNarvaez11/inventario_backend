const { response } = require("express");
const Type = require("../models/Type");



///////////////// CONTROLADOR LISTAR TIPOS ///////////////////////

const listTypes = async (req, res = response) => {

    const { limite } = req.query

    const types = await Type.find({ deleted: false })
        .select('_id nombre')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(types)
}




///////////////// CONTROLADOR CREAR TIPO ///////////////////////

const createType = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const type = await new Type({ nombre })

    await type.save()

    res.json({ type })
}




///////////////// CONTROLADOR ACTUALIZAR TIPO ///////////////////////

const updateType = async (req, res = response) => {

    const { id } = req.params

    const nombre = req.body.nombre.toUpperCase()

    const type = await Type.findByIdAndUpdate(id, {nombre }, { new: true })


    res.json({ type })
}




///////////////// CONTROLADOR ELIMINAR TIPO ///////////////////////

const deleteType = async (req, res = response) => {

    const { id } = req.params

    const type = await Type.findByIdAndUpdate(id, { deleted: true }, { new: true })

    res.json({ type })
}

module.exports = {
    listTypes, createType, updateType, deleteType
}