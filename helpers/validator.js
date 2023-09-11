const Client = require("../models/Client")
const Compra = require("../models/Compra")
const Mark = require("../models/Mark")
const Material = require("../models/Material")
const Provider = require("../models/Provider")
const Type = require("../models/Type")
const Unit = require("../models/Unit")
const User = require("../models/User")


const existUsername = async (usn) => {
    const username = usn.toLowerCase()

    const user = await User.findOne({ username })
    if (user) {
        throw new Error(`Ya existe un usuario con el nombre de usuario: ${username}`)
    }

    return true
}


const existEmail = async (e = '') => {
    const email = e.toLowerCase()

    const user = await User.findOne({ email })
    if (user) {
        throw new Error('Ya existe un usuario con ese correo')
    }

    return true
}




const isValidType = async (type) => {
    const types_valid = [1, 2, 3]

    if (!types_valid.includes(type)) {
        throw new Error('El perfil no es valido')
    }

    return true
}



const existUserById = async (id) => {
    const user = await User.findById(id)
    if (!user) {
        throw new Error('No existe usuario con ese id')
    }

    return true
}



const existMarkNombre = async (n) => {
    const nombre = n.toUpperCase()

    const mark = await Mark.findOne({ nombre })
    if (mark) {
        throw new Error(`Ya existe una marca con el nombre: ${n}`)
    }

    return true
}


const existMarkById = async (id) => {
    const mark = await Mark.findById(id)
    if (!mark) {
        throw new Error('No existe una marca con ese id')
    }

    return true
}



const existTypeNombre = async (n) => {
    const nombre = n.toUpperCase()

    const type = await Type.findOne({ nombre })
    if (type) {
        throw new Error(`Ya existe un tipo con el nombre: ${n}`)
    }

    return true
}


const existTypeById = async (id) => {
    const type = await Type.findById(id)
    if (!type) {
        throw new Error('No existe un tipo con ese id')
    }

    return true
}



const existUnitNombre = async (n) => {
    const nombre = n.toUpperCase()

    const unit = await Unit.findOne({ nombre })
    if (unit) {
        throw new Error(`Ya existe una unidad con el nombre: ${n}`)
    }

    return true
}


const existUnitById = async (id) => {
    const unit = await Unit.findById(id)
    if (!unit) {
        throw new Error('No existe una unidad con ese id')
    }

    return true
}


const existMaterialNombre = async (n) => {
    const nombre = n.toUpperCase()

    const material = await Material.findOne({ nombre })
    if (material) {
        throw new Error(`Ya existe un material con el nombre: ${n}`)
    }

    return true
}

const existMaterialCodigo = async (c) => {
    const codigo = c.toUpperCase()

    const material = await Material.findOne({ codigo })
    if (material) {
        throw new Error(`El material ${material.nombre} tiene el mismo codigo: ${c}`)
    }

    return true
}

const existMaterialById = async (id) => {
    const mat = await Material.findById(id)
    if (!mat) {
        throw new Error('No existe un material con ese id')
    }

    return true
}


const existProviderNombre = async (n) => {
    const nombre = n.toUpperCase()

    const provider = await Provider.findOne({ nombre })
    if (provider) {
        throw new Error(`Ya existe un proveedor con el nombre: ${n}`)
    }

    return true
}

const existProviderNit = async (nit) => {

    const provider = await Provider.findOne({ nit })
    if (provider) {
        throw new Error(`Ya existe un proveedor con el nit: ${nit}`)
    }

    return true
}


const existProviderlById = async (id) => {
    const pro = await Provider.findById(id)
    if (!pro) {
        throw new Error('No existe un proveedor con ese id')
    }

    return true
}

const existCompralById = async (id) => {
    const comp = await Compra.findById(id)
    if (!comp) {
        throw new Error('No existe una compra con ese id')
    }

    return true
}


const existClientNit = async (nit) => {

    const client = await Client.findOne({ nit })
    if (client) {
        throw new Error(`Ya existe un cliente con el nit: ${nit}`)
    }

    return true
}


const existClientlById = async (id) => {
    const cli = await Client.findById(id)
    if (!cli) {
        throw new Error('No existe un cliente con ese id')
    }

    return true
}

module.exports = {
    existUsername,
    existEmail,
    isValidType,
    existUserById,
    existMarkNombre,
    existMarkById,
    existTypeNombre,
    existTypeById,
    existUnitNombre,
    existUnitById,
    existMaterialNombre,
    existMaterialCodigo,
    existMaterialById,
    existProviderNombre,
    existProviderNit,
    existProviderlById,
    existCompralById,
    existClientNit,
    existClientlById
}