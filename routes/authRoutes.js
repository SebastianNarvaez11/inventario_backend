const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/authController')
const { validacionCampos } = require('../middlewares/validate-fields')


const router = Router()



router.post('/login', [
    check('username', 'El usuario es obligatorio').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validacionCampos
], login)




module.exports = router

