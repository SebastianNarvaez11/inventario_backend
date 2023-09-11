const { Router } = require('express')
const { listVentas, createVenta, cancelVenta } = require('../controllers/ventasController')


const router = Router()


router.get('/list', [], listVentas)

router.post('/create', [], createVenta)

router.put('/delete/:id', [], cancelVenta)


module.exports = router