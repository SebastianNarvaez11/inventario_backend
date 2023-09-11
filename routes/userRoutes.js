const { Router } = require('express')
const { check } = require('express-validator')
const { getCurrentUser } = require('../controllers/authController')
const { createUser, listUsers, updateUser, deleteUser } = require('../controllers/userController')
const { existUsername, existEmail, isValidType, existUserById } = require('../helpers/validator')
const { validacionCampos, existUsernameUpdate, existEmailUpdate } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')

const router = Router()

router.get('/list', [validarToken], listUsers)

router.get('/current', [validarToken], getCurrentUser)

router.post('/create', [
    validarToken,
    check('username', 'El nombre de usuario es obligatorio').notEmpty(),
    check('username').custom(existUsername),
    check('first_name', 'El nombre es obligatorio').notEmpty(),
    check('last_name', 'El apellido es obligatorio').notEmpty(),
    check('password', 'la contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'el correo no es valido').isEmail(),
    check('email').custom(existEmail),
    check('type').custom(isValidType),
    validacionCampos
], createUser)


router.put('/update/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    check('username', 'El nombre de usuario es obligatorio').notEmpty(),
    existUsernameUpdate,
    check('first_name', 'El nombre es obligatorio').notEmpty(),
    check('last_name', 'El apellido es obligatorio').notEmpty(),
    check('is_active', 'el estado no es valido').isBoolean(),
    check('email', 'el correo no es valido').isEmail(),
    existEmailUpdate,
    check('type').custom(isValidType),
    validacionCampos
], updateUser)


router.delete('/delete/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    validacionCampos
], deleteUser)

module.exports = router