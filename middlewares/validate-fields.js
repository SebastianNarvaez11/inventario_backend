const { validationResult } = require('express-validator')
const Client = require('../models/Client')
const Mark = require('../models/Mark')
const Material = require('../models/Material')
const Provider = require('../models/Provider')
const Type = require('../models/Type')
const Unit = require('../models/Unit')
const User = require('../models/User')


// validamos que no exista un usuario con el mismo nombre de usuario
const existUsernameUpdate = async (req, res = response, next) => {

    const { id } = req.params                                   //capturamos el id
    const username = req.body.username.toLowerCase()            //capturamos el nombre
    const user = await User.findOne({ username })               //busqueda por nombre

    if (user && user._id != id) {
        return res.status(400).json({
            errors: [{  msg: `Ya existe un usuario con el nombre de usuario: ${username}` }]
        })
    }

    next()
}



// validamos que no exista un usuario con el mismo correo
const existEmailUpdate = async (req, res = response, next) => {

    const { id } = req.params                                   //capturamos el id
    const email = req.body.email.toLowerCase()                  //capturamos el email
    const user = await User.findOne({ email })                  //busqueda por email

    if (user && user._id != id) {
        return res.status(400).json({
            errors: [{msg: `Ya existe un usuario con ese correo` }]
        })
    }

    next()
}



// validamos que no exista una marca con el mismo nombre
const existMarkNombreUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const nombre = req.body.nombre.toUpperCase()           //capturamos el nombre
    const mark = await Mark.findOne({ nombre })            //busqueda por nombre

    if (mark && mark._id != id) {
        return res.status(400).json({
            errors: [{  msg: `Ya existe una marca con el nombre: ${nombre}`}]
        })
    }

    next()
}


// validamos que no exista un tipo con el mismo nombre
const existTypeNombreUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const nombre = req.body.nombre.toUpperCase()           //capturamos el nombre
    const type = await Type.findOne({ nombre })            //busqueda por nombre

    if (type && type._id != id) {
        return res.status(400).json({
            errors: [{msg: `Ya existe un tipo con el nombre: ${nombre}` }]
        })
    }

    next()
}

// validamos que no exista una unidad con el mismo nombre
const existUnitNombreUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const nombre = req.body.nombre.toUpperCase()           //capturamos el nombre
    const unit = await Unit.findOne({ nombre })            //busqueda por nombre

    if (unit && unit._id != id) {
        return res.status(400).json({
            errors: [{ msg: `Ya existe una unidad con el nombre: ${nombre}` }]
        })
    }

    next()
}


// validamos que no exista un material con el mismo nombre
const existMaterialNombreUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const nombre = req.body.nombre.toUpperCase()           //capturamos el nombre
    const mat = await Material.findOne({ nombre })           //busqueda por nombre

    if (mat && mat._id != id) {
        return res.status(400).json({
            errors: [{ msg: `Ya existe un material con el nombre: ${nombre}` }]
        })
    }

    next()
}


// validamos que no exista un material con el mismo codigo
const existMaterialCodigoUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const codigo = req.body.codigo.toUpperCase()           //capturamos el codigo
    const mat = await Material.findOne({ codigo })            //busqueda por codigo

    if (mat && mat._id != id) {
        return res.status(400).json({
            errors: [{ msg: `El material ${mat.nombre} tiene el mismo codigo: ${codigo}` }]
        })
    }

    next()
}

// validamos que no exista un proveedor con el mismo nit
const existProviderNitUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const nit = req.body.nit                                //capturamos el nit
    const pro = await Provider.findOne({ nit })             //busqueda por nit

    if (pro && pro._id != id) {
        return res.status(400).json({
            errors: [{ msg: `El proveedor ${pro.nombre} tiene el mismo nit: ${nit}` }]
        })
    }

    next()
}


const existProviderNombreUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const nombre = req.body.nombre.toUpperCase()           //capturamos el nombre
    const pro = await Provider.findOne({ nombre })           //busqueda por nombre

    if (pro && pro._id != id) {
        return res.status(400).json({
            errors: [{ msg: `Ya existe un proveedor con el nombre: ${nombre}` }]
        })
    }

    next()
}


// validamos que no exista un proveedor con el mismo nit
const existClientNitUpdate = async (req, res = response, next) => {

    const { id } = req.params                               //capturamos el id
    const nit = req.body.nit                                //capturamos el nit
    const cli = await Client.findOne({ nit })             //busqueda por nit

    if (cli && cli._id != id) {
        return res.status(400).json({
            errors: [{ msg: `El cliente ${cli.nombre} tiene el mismo nit: ${nit}` }]
        })
    }

    next()
}

//middleware que revisa si los checks de la ruta tienen algun error capturado
const validacionCampos = (req, res, next) => {

    //validamos si los middlewares de la ruta encontraron errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next()
}


module.exports = {
    validacionCampos,
    existUsernameUpdate,
    existEmailUpdate,
    existMarkNombreUpdate,
    existTypeNombreUpdate,
    existUnitNombreUpdate,
    existMaterialNombreUpdate,
    existMaterialCodigoUpdate,
    existProviderNitUpdate,
    existProviderNombreUpdate,
    existClientNitUpdate
}