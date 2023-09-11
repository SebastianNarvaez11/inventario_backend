const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/User");


const validarToken = async (req = request, res = response, next) => {

    const token = req.header('Authorization')

    //validamos si viene el token
    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la petición'
        })
    }

    //validamos si el token es valido
    try {

        //si el token no es valido, lanza un error y lo capturamos
        const { id } = jwt.verify(token, process.env.SECRET_PRIVATE_TOKEN_KEY)

        //capturamos el User dueño del token
        const user = await User.findById(id)

        //validamos si el User existe
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe'
            })
        }

        //validamos que tenga estado true o delete en false
        if (!user.is_active || user.deleted) {
            return res.status(401).json({
                msg: 'Token no valido - User estado false'
            })
        }

        //colocamos el User autenticado en la request para que los otros middlewares que siguen tengan acceso a el
        req.UserAuth = user

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = {
    validarToken
}