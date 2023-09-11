const { Router } = require('express')
const { check } = require('express-validator')
const { listUnits, createUnit, updateUnit, deleteUnit } = require('../controllers/unitController')
const { existUnitNombre, existUnitById } = require('../helpers/validator')
const { validacionCampos, existUnitNombreUpdate } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')

const router = Router()

router.get('/list', [validarToken], listUnits)

router.post('/create', [
    validarToken,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existUnitNombre),
    check('abreviacion', 'la abreviacion es obligatoria').notEmpty(),
    validacionCampos
], createUnit)


router.put('/update/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUnitById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('abreviacion', 'la abreviacion es obligatoria').notEmpty(),
    existUnitNombreUpdate,
    validacionCampos
], updateUnit)


router.delete('/delete/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUnitById),
    validacionCampos
], deleteUnit)

module.exports = router