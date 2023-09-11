const { response } = require("express");
const Client = require("../models/Client");

const listClients = async (req, res = response) => {

    const { limite = 0 } = req.query

    const clients = await Client.find({ deleted: false })
        .select('_id nombre nit telefono direccion email')
        .sort([['updated', 'descending']])
        .limit(Number(limite))


    res.json(clients)

}



const createClient = async (req, res = response) => {

    const { nit, telefono, email } = req.body
    const nombre = req.body.nombre.toUpperCase()
    const direccion = req.body.direccion.toUpperCase()

    const client = new Client({ nombre, nit, telefono, email, direccion })

    await client.save()

    res.json({ client })
}




const updateClient = async (req, res = response) => {

    const { id } = req.params

    const { nit, telefono, email } = req.body
    const nombre = req.body.nombre.toUpperCase()
    const direccion = req.body.direccion.toUpperCase()

    const client = await Client.findByIdAndUpdate(id, { nombre, nit, telefono, email, direccion }, { new: true })

    res.json({ client })
}



const deleteClient = async (req, res = response) => {

    const { id } = req.params

    const client = await Client.findByIdAndUpdate(id, { deleted: true }, { new: true })

    res.json({ client })
}

module.exports = { listClients, createClient, updateClient, deleteClient }