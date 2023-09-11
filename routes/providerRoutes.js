const { Router } = require('express')
const { check } = require('express-validator')
const { listProviders, createProvider, updateProvider, deleteProvider } = require('../controllers/providerController')
const { existProviderNombre, existProviderNit, existProviderlById } = require('../helpers/validator')
const { validacionCampos, existProviderNombreUpdate, existProviderNitUpdate } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')

const router = Router()

router.get('/list', [validarToken], listProviders)

router.post('/create', [
    validarToken,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existProviderNombre),
    check('nit', 'El Nit es obligatorio').notEmpty(),
    check('nit').custom(existProviderNit),
    check('email', 'El correo no es valido').isEmail(),
    validacionCampos
], createProvider)


router.put('/update/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProviderlById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    existProviderNombreUpdate,
    check('nit', 'El Nit es obligatorio').notEmpty(),
    existProviderNitUpdate,
    check('email', 'El correo no es valido').isEmail(),
    validacionCampos
], updateProvider)


router.delete('/delete/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProviderlById),
    validacionCampos
], deleteProvider)

module.exports = router