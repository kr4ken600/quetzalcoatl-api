const { response } = require('express');
const Producto = require('../models/Producto');
const Categoria = require('../models/Categorias');

const createProducto = async (req, res = response) => {
  try {

    const producto = new Producto(req.body);

    await producto.save();

    return res.status(200).json({
      ok: true,
      producto
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getProductos = async (req, res = response) => {
  try {

    const productos = await Producto.find();

    return res.status(200).json({
      ok: true,
      productos
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getProducto = async (req, res = response) => {
  const id = req.params.id;
  try {

    const producto = await Producto.findById(id);
    return res.status(200).json({
      ok: true,
      producto
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getVendidos = async (req, res = response) => {
  try {

    const consumibles = ['aceites', 'balatas', 'bateria', 'bujias', 'cadenas', 'filtros'];
    const accesorios = ['asientos y parrillas', 'cajas y espejos', 'puños y manubrios'];
    const cascos = ["abatibles", "cerrados", "cross"];
    const llantas = ["camaras", "llantas"];
    const protecciones = ["guantes", "impermeables", "petos"];

    const productos = []

    consumibles.forEach(n => {
      Producto.find({categoria: n}).limit(1).exec().then(d => productos.push({
        principal: 'consumibles',
        productos: d[0]
      }));
    });

    accesorios.forEach(n => {
      Producto.find({categoria: n}).limit(1).exec().then(d => productos.push({
        principal: 'accesorios',
        productos: d[0]
      }));
    });

    cascos.forEach(n => {
      Producto.find({categoria: n}).limit(1).exec().then(d => productos.push({
        principal: 'cascos',
        productos: d[0]
      }));
    });

    llantas.forEach(n => {
      Producto.find({categoria: n}).limit(1).exec().then(d => productos.push({
        principal: 'llantas',
        productos: d[0]
      }));
    });

    protecciones.forEach(n => {
      Producto.find({categoria: n}).limit(1).exec().then(d => productos.push({
        principal: 'protecciones',
        productos: d[0]
      }));
    });



    setTimeout(() => {
      return res.status(200).json({
        ok: true,
        productos
      });
    }, 3000);


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}


const getFiltro = async (req, res = response) => {
  const categoria = req.params.categoria;
  try {

    const productos = await Producto.find({ categoria });

    return res.status(200).json({
      ok: true,
      productos
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const updateStock = async (idProducto, resStok) => {

  try {

    const prod = await Producto.findById(idProducto);
    let newStock = prod.stock - resStok;

    await Producto.findByIdAndUpdate(idProducto, { stock: newStock });

  } catch (error) {
    console.log(error);
    return;
  }
}


const actualziarData = async (req, res = response) => {
  try {
    const id = req.params.id;
    const { producto, stock } = req.body;

    await Producto.findByIdAndUpdate(id, { marca: producto, stock });

    return res.status(200).json({
      ok: true,
      msg: 'Producto Actualizado'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}


module.exports = {
  createProducto,
  getProductos,
  getVendidos,
  getFiltro,
  getProducto,
  updateStock,
  actualziarData
}