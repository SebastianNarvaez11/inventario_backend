const { response } = require("express");
const ItemVenta = require("../models/ItemVenta");
const Product = require("../models/Product");
const Venta = require("../models/Venta");

const listVentas = async (req, res = response) => {

    const { limite = 0 } = req.query

    const ventas = await Venta.find({ deleted: false })
        .select('no_factura observacion total cliente usuario_creador updated created')
        .populate('cliente', 'nombre')
        .populate('usuario_creador', 'first_name last_name')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(ventas)
}



const createVenta = async (req, res = response) => {

    //se crea la venta
    const { observacion, sub_total, descuento, total, cliente, usuario_creador } = req.body.venta
    const no_factura = String(await Venta.countDocuments() + 1).padStart(5, '0')
    const vent = await new Venta({ no_factura, observacion, sub_total, descuento, total, cliente, usuario_creador })
    await vent.save()

    await Promise.all(
        req.body.items.map(async item => {
            //se crean los item de venta
            const { producto, cantidad, sub_total, descuento, total } = item
            const itm = await new ItemVenta({ producto, cantidad, sub_total, descuento, total })
            await itm.save()

            //se añaden los items a la venta
            await Venta.findByIdAndUpdate(vent._id, { $push: { items: itm._id } })

            //se actualiza el estado del producto 
            await Product.findByIdAndUpdate(producto, { estado: 2 })
        })
    ).catch(error => {
        res.status(500).json({
            errors: [{ msg: error }]
        })
    })


    const venta = await Venta.findById(vent._id)
        .populate('cliente', 'nombre')
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', select: 'producto', populate: { path: 'producto' } })

    res.json({ venta })

}



const cancelVenta = async (req, res = response) => {

    const { id } = req.params

    const vent = await Venta.findByIdAndUpdate(id, { deleted: true })
        .populate({ path: 'items', select: 'producto', populate: { path: 'producto' } })


    await Promise.all(
        vent.items.map(async item => {
            // se descativan los items de Venta
            await ItemVenta.findByIdAndUpdate(item._id, { deleted: true })

            //se actualiza el estado del producto
            await Product.findByIdAndUpdate(item.producto._id, { estado: 1 })
        })
    ).catch(error => {
        res.status(500).json({
            errors: [{ msg: error }]
        })
    })

    const venta = await Venta.findById(id)
        .populate('cliente', 'nombre')
        .populate('usuario_creador', 'first_name last_name')
        .populate({ path: 'items', select: 'producto', populate: { path: 'producto', populate: { path: 'usuario_creador' } } })

    res.json({ venta })
}




module.exports = { listVentas, createVenta, cancelVenta }