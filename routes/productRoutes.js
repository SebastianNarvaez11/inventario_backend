const { Router } = require('express')
const { listProducts, createProduct, deleteProduct, updateProduct, getProduct } = require('../controllers/productoController')


const router = Router()


router.get('/list', [], listProducts)

router.get('/get/:id', [], getProduct)

router.post('/create', [], createProduct)

router.put('/update/:id', [], updateProduct)

router.put('/delete/:id', [], deleteProduct)



module.exports = router