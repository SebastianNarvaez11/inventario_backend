const { Router } = require('express')
const { check } = require('express-validator')
const { listMarks, createMark, updateMark, deleteMark } = require('../controllers/markController')
const { existMarkNombre, existMarkById } = require('../helpers/validator')
const { validacionCampos, existMarkNombreUpdate } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')

const router = Router()

router.get('/list', [validarToken], listMarks)

router.post('/create', [
    validarToken,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existMarkNombre),
    validacionCampos
], createMark)


router.put('/update/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existMarkById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    existMarkNombreUpdate,
    validacionCampos
], updateMark)


router.delete('/delete/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existMarkById),
    validacionCampos
], deleteMark)

module.exports = router