const { response } = require("express");
const Unit = require("../models/Unit");



///////////////// CONTROLADOR LISTAR UNIDADES ///////////////////////

const listUnits = async (req, res = response) => {

    const { limite } = req.query

    const units = await Unit.find({ deleted: false })
        .select('_id nombre abreviacion')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(units)
}




///////////////// CONTROLADOR CREAR UNIDAD ///////////////////////

const createUnit = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()
    const abreviacion = req.body.abreviacion

    const unit = await new Unit({ nombre, abreviacion})

    await unit.save()

    res.json({ unit })
}




///////////////// CONTROLADOR ACTUALIZAR UNIDAD ///////////////////////

const updateUnit = async (req, res = response) => {

    const { id } = req.params

    const nombre = req.body.nombre.toUpperCase()
    const abreviacion = req.body.abreviacion

    const unit = await Unit.findByIdAndUpdate(id, {nombre, abreviacion }, { new: true })


    res.json({ unit })
}




///////////////// CONTROLADOR ELIMINAR UNIDAD ///////////////////////

const deleteUnit = async (req, res = response) => {

    const { id } = req.params

    const unit = await Unit.findByIdAndUpdate(id, { deleted: true }, { new: true })

    res.json({ unit })
}

module.exports = {
    listUnits, createUnit, updateUnit, deleteUnit
}