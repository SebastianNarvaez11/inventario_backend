const { response } = require("express");
const Mark = require("../models/Mark");



///////////////// CONTROLADOR LISTAR MARCAS ///////////////////////

const listMarks = async (req, res = response) => {

    const { limite } = req.query

    const marks = await Mark.find({ deleted: false })
        .select('_id nombre')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(marks)
}




///////////////// CONTROLADOR CREAR MARCA ///////////////////////

const createMark = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const mark = await new Mark({ nombre })

    await mark.save()

    res.json({ mark })
}




///////////////// CONTROLADOR ACTUALIZAR MARCA ///////////////////////

const updateMark = async (req, res = response) => {

    const { id } = req.params

    const nombre = req.body.nombre.toUpperCase()

    const mark = await Mark.findByIdAndUpdate(id, {nombre }, { new: true })


    res.json({ mark })
}




///////////////// CONTROLADOR ELIMINAR MARCA ///////////////////////

const deleteMark = async (req, res = response) => {

    const { id } = req.params

    const mark = await Mark.findByIdAndUpdate(id, { deleted: true }, { new: true })

    res.json({ mark })
}

module.exports = {
    listMarks, createMark, updateMark, deleteMark
}