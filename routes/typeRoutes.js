const { Router } = require('express')
const { check } = require('express-validator')
const { listTypes, createType, updateType, deleteType } = require('../controllers/typeController')
const { existTypeNombre, existTypeById } = require('../helpers/validator')
const { validacionCampos, existTypeNombreUpdate } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')

const router = Router()


router.get('/list', [validarToken], listTypes)


router.post('/create', [
    validarToken,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existTypeNombre),
    validacionCampos
], createType)


router.put('/update/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existTypeById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    existTypeNombreUpdate,
    validacionCampos
], updateType)


router.delete('/delete/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existTypeById),
    validacionCampos
], deleteType)

module.exports = router