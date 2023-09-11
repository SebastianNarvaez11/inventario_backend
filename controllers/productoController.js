const { response } = require("express");
const ItemMaterial = require("../models/ItemMaterial");
const Material = require("../models/Material");
const Product = require("../models/Product");

const listProducts = async (req, res = response) => {

    const { limite = 0 } = req.query

    const products = await Product.find({ deleted: false, estado: 1 })
        .select('codigo nombre costo_total precio usuario_creador')
        .populate('usuario_creador', 'first_name last_name')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(products)
}



const getProduct = async (req, res = response) => {

    const { id } = req.params

    const product = await Product.findById(id)
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', populate: { path: 'material', populate: { path: 'marca categoria unidad_medida' } } })

    res.json({ product })
}



const createProduct = async (req, res = response) => {

    //se crea el producto
    const { costo_mano_obra, costo_total, precio, usuario_creador } = req.body.producto
    const nombre = req.body.producto.nombre.toUpperCase()
    const codigo = String(await Product.countDocuments() + 1).padStart(5, '0')
    const prod = await new Product({ codigo, nombre, costo_mano_obra, costo_total, precio, usuario_creador })
    await prod.save()


    await Promise.all(
        req.body.items.map(async item => {
            //se crean los items de material
            const { material, cantidad, total } = item
            const itm = await new ItemMaterial({ material: material.id, cantidad, total })
            await itm.save()

            //se añaden los items a la Product
            await Product.findByIdAndUpdate(prod._id, { $push: { items: itm._id } })

            //se actualiza la existencia del material 
            const mat = await Material.findById(material.id)
            mat.existencia = mat.existencia - itm.cantidad
            await mat.save()
        })
    ).catch(error => {
        res.status(500).json({
            errors: [{ msg: error }]
        })
    })


    const product = await Product.findById(prod._id)
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', select: 'cantidad updated material', populate: { path: 'material', select: 'existencia' } })

    res.json({ product })
}




const updateProduct = async (req, res = response) => {

    const { id } = req.params

    //actualizamos el producto
    const { costo_mano_obra, costo_total, precio, usuario_creador } = req.body.producto
    const nombre = req.body.producto.nombre.toUpperCase()
    const product = await Product.findByIdAndUpdate(id, { nombre, costo_mano_obra, costo_total, precio, usuario_creador }, { new: true })
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', select: 'cantidad updated material', populate: { path: 'material', select: 'existencia' } })


    //borramos los items anteriores, actualizamos la existencia de material y guardamos una copia de sus materiales relacionados
    let materiales_old = []
    await Promise.all(
        product.items.map(async item => {

            const itm = await ItemMaterial.findByIdAndDelete(item._id)
            await Product.findByIdAndUpdate(id, { $pull: { items: item._id } })

            const mat = await Material.findById(itm.material._id)
            mat.existencia = mat.existencia + itm.cantidad
            await mat.save()

            materiales_old.push(mat._id)
        })
    )


    //creamos los items nuevos y actualizamos la existencia del material
    let materiales_new = []
    await Promise.all(
        req.body.items.map(async item => {
            const { material, cantidad, total } = item
            const itm = await new ItemMaterial({ material: material.id, cantidad, total })
            await itm.save()

            //se añaden los items a la Product
            await Product.findByIdAndUpdate(id, { $push: { items: itm._id } })

            //se actualiza la existencia del material 
            const mat = await Material.findById(itm.material._id)
            mat.existencia = mat.existencia - itm.cantidad
            await mat.save()

            materiales_new.push(mat._id)
        })
    )

    //filtramos los materiales para no tener repetidos
    let data = materiales_new.concat(materiales_old)

    materiales_new = await Promise.all(
        data.filter((item, index) => {
            return data.indexOf(item) === index;
        })
    )

    console.log(data)
    console.log(materiales_new)

    let materiales = []
    await Promise.all(
        materiales_new.map(async mat => {

            const material = await Material.findById(mat)
                .populate('marca', 'nombre')
                .populate('categoria', 'nombre')
                .populate('unidad_medida', 'nombre')

            console.log(material.nombre)
            materiales.push(material)
        })
    )

    res.json({ product, materiales })

}





const deleteProduct = async (req, res = response) => {

    //se actualiza el producto
    const { id } = req.params
    const prod = await Product.findByIdAndUpdate(id, { deleted: true, estado: 3 })


    await Promise.all(
        prod.items.map(async item => {
            //se actualizan los items de material
            const itm = await ItemMaterial.findByIdAndUpdate(item._id, { deleted: true })

            //se actualiza la existencia del material 
            const mat = await Material.findById(itm.material._id)
            mat.existencia = mat.existencia + itm.cantidad
            await mat.save()
        })
    ).catch(error => {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: error }]
        })
    })


    const product = await Product.findById(id)
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', select: 'cantidad updated material', populate: { path: 'material', select: 'existencia' } })

    res.json({ product })
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct }