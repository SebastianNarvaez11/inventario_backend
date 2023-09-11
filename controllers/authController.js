const { response } = require("express");
const bcryptjs = require('bcryptjs')
const User = require("../models/User");
const { generarJWT } = require("../helpers/generate-token");





const login = async (req, res = response) => {

    const { username, password } = req.body

    try {
        
        const user = await User.findOne({ username })

        //validamos si el username existe
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'usuario / contraseña incorrectos' }]
            })
        }


        //validamos si el User esta activo o eliminado
        if (!user.is_active || user.deleted) {
            return res.status(400).json({
                errors: [{ msg: 'Usuario inactivo, hable con el administrador' }]
            })
        }


        //verificamos contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                errors: [{ msg: 'username / contraseña incorrectos' }]
            })
        }

        //generarmos el token
        const token = await generarJWT(user.id)


        res.json({
            user,
            key: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador - error 500'
        })
    }
}


const getCurrentUser = (req, res = response) => {

    const user = req.UserAuth           //usuario dueño del token, se establece en la validacion del token

    res.json(user)
}


module.exports = {
    login, getCurrentUser
}