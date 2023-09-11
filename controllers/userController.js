const { response } = require("express");
const bcryptjs = require('bcryptjs')
const User = require("../models/User");



///////////////// CONTROLADOR LISTAR USUARIOS ///////////////////////

const listUsers = async (req, res = response) => {

    const { limite } = req.query

    const users = await User.find({ deleted: false })
        .select('_id username email type first_name last_name is_active')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(users)
}




///////////////// CONTROLADOR CREAR USUARIO ///////////////////////

const createUser = async (req, res = response) => {

    const { first_name, last_name, type, password } = req.body
    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()

    const user = await new User({ username, first_name, last_name, email, type, password })

    //encriptamos contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.json({ user })
}




///////////////// CONTROLADOR ACTUALIZAR USUARIO ///////////////////////

const updateUser = async (req, res = response) => {

    const { id } = req.params

    //capturamos la data
    const { first_name, last_name, type, is_active } = req.body
    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()


    const user = await User.findByIdAndUpdate(id, { username, email, first_name, last_name, type, is_active }, { new: true })


    res.json({ user })
}




///////////////// CONTROLADOR ELIMINAR USUARIO ///////////////////////

const deleteUser = async (req, res = response) => {

    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { deleted: true, is_active: false }, { new: true })

    res.json({ user })
}

module.exports = {
    createUser, listUsers, updateUser, deleteUser
}