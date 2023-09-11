const { response } = require("express");
const Material = require("../models/Material");
const cloudinary = require('cloudinary')
cloudinary.config(process.env.CLOUDINARY_URL)


const listMaterials = async (req, res = response) => {

    const { limite = 0 } = req.query

    const materials = await Material.find({ deleted: false })
        .select('_id codigo nombre precio_unidad existencia ultima_compra marca categoria unidad_medida img')
        .populate('marca', 'nombre')
        .populate('categoria', 'nombre')
        .populate('unidad_medida', 'nombre')
        .sort([['updated', 'descending']])
        .limit(Number(limite))

    res.json(materials)
}



const createMaterial = async (req, res = response) => {

    const { precio_unidad, marca, categoria, unidad_medida } = req.body
    const nombre = req.body.nombre.toUpperCase()
    const codigo = req.body.codigo.toUpperCase()

    const data = { codigo, nombre, precio_unidad, marca, categoria, unidad_medida }

    if (req.files != null && req.files.imagen) {
        const { tempFilePath } = req.files.imagen
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
        data.img = secure_url
    }

    const mat = await new Material(data)

    await mat.save()

    const material = await Material.findById(mat._id)
        .populate('marca', 'nombre')
        .populate('categoria', 'nombre')
        .populate('unidad_medida', 'nombre')

    res.json({ material })

}



const updateMaterial = async (req, res = response) => {

    const { id } = req.params

    const { precio_unidad, marca, categoria, unidad_medida } = req.body
    const nombre = req.body.nombre.toUpperCase()
    const codigo = req.body.codigo.toUpperCase()

    const data = { codigo, nombre, precio_unidad, marca, categoria, unidad_medida }

    if (req.files != null && req.files.imagen) {

        const mat = await Material.findById(id)

        //borramos la imagen anterior si la tiene
        if (mat.img) {
            const nombreArray = mat.img.split('/')               
            const nombre = nombreArray[nombreArray.length - 1]      
            const [public_id] = nombre.split('.')                   
            cloudinary.uploader.destroy(public_id)                   
        }

        //grabamos la nueva imagen
        const { tempFilePath } = req.files.imagen
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
        data.img = secure_url
    }

    const mat = await Material.findByIdAndUpdate(id, data, { new: true })

    const material = await Material.findById(mat._id)
        .populate('marca', 'nombre')
        .populate('categoria', 'nombre')
        .populate('unidad_medida', 'nombre')

    res.json({ material })
}



const deleteMaterial = async (req, res = response) => {

    const { id } = req.params

    const material = await Material.findByIdAndUpdate(id, { deleted: true }, { new: true })

    res.json({ material })
}


module.exports = {
    listMaterials, createMaterial, updateMaterial, deleteMaterial
}