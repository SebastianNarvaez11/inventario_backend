const { Router } = require('express')
const { check } = require('express-validator')
const { listCompras, createCompra, getCompra, cancelCompra } = require('../controllers/compraController')
const { existProviderlById, existUserById, existCompralById } = require('../helpers/validator')
const { validacionCampos } = require('../middlewares/validate-fields')
const { validarToken } = require('../middlewares/validate-token')

const router = Router()

router.get('/list', [validarToken], listCompras)

router.get('/get/:id', [
    validarToken,
    check('id', 'el id de la compra no es valido').isMongoId(),
    check('id').custom(existCompralById),
    validacionCampos
], getCompra)

router.post('/create', [
    validarToken,
    check('compra.proveedor', 'Seleccione un proveedor valido').isMongoId(),
    check('compra.proveedor').custom(existProviderlById),
    check('compra.usuario_creador', 'El usuario creador de la compra no es valido').isMongoId(),
    check('compra.usuario_creador').custom(existUserById),
    validacionCampos
], createCompra)


router.put('/cancel/:id', [
    validarToken,
    check('id', 'el id de la compra no es valido').isMongoId(),
    check('id').custom(existCompralById),
    validacionCampos
], cancelCompra)

module.exports = router