const { Router } = require('express')
const { check } = require('express-validator')
const { listClients, createClient, updateClient, deleteClient } = require('../controllers/clientController')
const { existClientNit, existClientlById } = require('../helpers/validator')
const { validacionCampos, existClientNitUpdate } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')


const router = Router()


router.get('/list', [validarToken], listClients)

router.post('/create', [
    validarToken,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nit', 'El Nit es obligatorio').notEmpty(),
    check('nit').custom(existClientNit),
    check('email', 'El correo no es valido').isEmail(),
    validacionCampos
], createClient)

router.put('/update/:id', [
    validarToken,
    check('id', 'No es id valido').isMongoId(),
    check('id').custom(existClientlById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nit', 'El Nit es obligatorio').notEmpty(),
    existClientNitUpdate,
    check('email', 'El correo no es valido').isEmail(),
    validacionCampos
], updateClient)

router.delete('/delete/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existClientlById),
    validacionCampos
], deleteClient)


module.exports = router