const { response } = require('express');
const Producto = require('../models/Producto');

const createProducto = async (req, res=response) => {
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

const getProductos = async (req, res=response) => {
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

const getProducto = async (req, res=response) => {
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

const getVendidos = async (req, res=response) => {
  try {
    
    const prod1 = await Producto.find({categoria: 'cubiertas'}).limit(1).exec();
    const productos = [prod1, prod1];
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

const getFiltro = async (req, res = response) => {
  const categoria = req.params.categoria;
  try{

    const productos = await Producto.find({categoria});

    return res.status(200).json({
      ok: true,
      productos
    })

  }catch(error){
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
  getProducto
}