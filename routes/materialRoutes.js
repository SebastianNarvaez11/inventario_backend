const { Router } = require('express')
const { check } = require('express-validator')
const { listMaterials, createMaterial, updateMaterial, deleteMaterial } = require('../controllers/materialController')
const { existMaterialNombre, existMaterialCodigo, existMarkById, existTypeById, existUnitById, existMaterialById } = require('../helpers/validator')
const { validacionCampos, existMaterialNombreUpdate, existMaterialCodigoUpdate } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')

const router = Router()

router.get('/list', [validarToken], listMaterials)

router.post('/create', [
    validarToken,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existMaterialNombre),
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    check('codigo').custom(existMaterialCodigo),
    check('precio_unidad', 'El precio es obligatorio').notEmpty(),
    check('precio_unidad', 'El precio debe ser mayor a cero').custom((value) => value > 0),
    check('marca', 'Seleccione una marca valida').isMongoId(),
    check('marca').custom(existMarkById),
    check('categoria', 'Seleccione una categoria valida').isMongoId(),
    check('categoria').custom(existTypeById),
    check('unidad_medida', 'Seleccione una unidad de medida valida').isMongoId(),
    check('unidad_medida').custom(existUnitById),
    validacionCampos
], createMaterial)


router.put('/update/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existMaterialById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    existMaterialNombreUpdate,
    check('codigo', 'El codigo es obligatorio').notEmpty(),
    existMaterialCodigoUpdate,
    check('precio_unidad', 'El precio es obligatorio').notEmpty(),
    check('precio_unidad', 'El precio debe ser mayor a cero').custom((value) => value > 0),
    check('marca', 'Seleccione una marca valida').isMongoId(),
    check('marca').custom(existMarkById),
    check('categoria', 'Seleccione una categoria valida').isMongoId(),
    check('categoria').custom(existTypeById),
    check('unidad_medida', 'Seleccione una unidad de medida valida').isMongoId(),
    check('unidad_medida').custom(existUnitById),
    validacionCampos
], updateMaterial)


router.delete('/delete/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existMaterialById),
    validacionCampos
], deleteMaterial)

module.exports = router