const { response } = require("express");
const Provider = require("../models/Provider");



///////////////// CONTROLADOR LISTAR PROVEEDORES ///////////////////////

const listProviders = async (req, res = response) => {

    const { limite } = req.query

    const providers = await Provider.find({ deleted: false })
        .select('_id nombre nit contacto telefono email direccion')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(providers)
}




///////////////// CONTROLADOR CREAR PROVEEDOR ///////////////////////

const createProvider = async (req, res = response) => {

    const { nit, telefono, email } = req.body
    const nombre = req.body.nombre.toUpperCase()
    const direccion = req.body.direccion.toUpperCase()
    const contacto = req.body.contacto.toUpperCase()

    const provider = await new Provider({ nombre, nit, direccion, contacto, telefono, email })

    await provider.save()

    res.json({ provider })
}




// ///////////////// CONTROLADOR ACTUALIZAR PROVEEDOR ///////////////////////

const updateProvider = async (req, res = response) => {

    const { id } = req.params

    const { nit, telefono, email } = req.body
    const nombre = req.body.nombre.toUpperCase()
    const direccion = req.body.direccion.toUpperCase()
    const contacto = req.body.contacto.toUpperCase()

    const provider = await Provider.findByIdAndUpdate(id, { nombre, nit, direccion, contacto, telefono, email }, { new: true })


    res.json({ provider })
}




///////////////// CONTROLADOR ELIMINAR PROVIDER ///////////////////////

const deleteProvider = async (req, res = response) => {

    const { id } = req.params

    const provider = await Provider.findByIdAndUpdate(id, { deleted: true }, { new: true })

    res.json({ provider })
}

module.exports = {
    listProviders, createProvider, updateProvider, deleteProvider
}