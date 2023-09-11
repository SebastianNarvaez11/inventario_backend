const { response } = require("express");
const Compra = require("../models/Compra");
const ItemCompra = require("../models/ItemCompra");
const Material = require("../models/Material");

const listCompras = async (req, res = response) => {

    const { limite = 0 } = req.query

    const compras = await Compra.find({ deleted: false })
        .select('no_factura observacion total proveedor usuario_creador updated created')
        .populate('proveedor', 'nombre')
        .populate('usuario_creador', 'first_name last_name')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(compras)
}


const getCompra = async (req, res = response) => {

    const { id } = req.params

    const compra = await Compra.findById(id)
        .populate('proveedor')
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', populate: { path: 'material', populate: { path: 'marca categoria unidad_medida' } } })

    res.json({ compra })
}



const createCompra = async (req, res = response) => {

    //se crea la compra
    const { observacion, sub_total, descuento, total, proveedor, usuario_creador } = req.body.compra
    const no_factura = String(await Compra.countDocuments() + 1).padStart(5, '0')
    const comp = await new Compra({ no_factura, observacion, sub_total, descuento, total, proveedor, usuario_creador })
    await comp.save()


    await Promise.all(
        req.body.items.map(async item => {
            //se crean los items de compra
            const { material, cantidad, sub_total, descuento, total } = item
            const itm = await new ItemCompra({ material, cantidad, sub_total, descuento, total })
            await itm.save()

            //se añaden los items a la compra
            await Compra.findByIdAndUpdate(comp._id, { $push: { items: itm._id } })

            //se actualiza la existencia del material y la fecha de la ultima compra
            const mat = await Material.findById(material)
            mat.existencia = mat.existencia + itm.cantidad
            mat.ultima_compra = itm.updated
            await mat.save()
        })
    ).catch(error => {
        res.status(500).json({
            errors: [{ msg: error }]
        })
    })


    const compra = await Compra.findById(comp._id)
        .populate('proveedor', 'nombre')
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', select: 'cantidad updated material', populate: { path: 'material', select: 'existencia' } })

    res.json({ compra })
}






const cancelCompra = async (req, res = response) => {

    const { id } = req.params

    await Compra.findByIdAndUpdate(id, { deleted: true })


    await Promise.all(
        req.body.items.map(async item => {
            // se descativan los items de compra
            await ItemCompra.findByIdAndUpdate(item.id, { deleted: true })

            //se actualiza la existencia del material
            const mat = await Material.findById(item.material.id)
            mat.existencia = mat.existencia - item.cantidad
            await mat.save()
        })
    ).catch(error => {
        res.status(500).json({
            errors: [{ msg: error }]
        })
    })

    res.json(200)
}

module.exports = { listCompras, getCompra, createCompra, cancelCompra }