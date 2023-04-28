const { response } = require('express');
const Carrito = require('../models/Carrito');


const createCarrito = async (req, res = response) => {
  const { uid } = req;
  try {

    req.body.uiduser = uid;

    const carrito = new Carrito(req.body);

    await carrito.save();

    return res.status(200).json({
      ok: true,
      carrito
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getCarrito = async (req, res=response) => {
  const { uid } = req;
  try {

    req.body.uiduser = uid;

    const carrito = await Carrito.find({ uiduser: uid }).populate('articulo');

    return res.status(200).json({
      ok: true,
      carrito
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const deleteCarrito = async (req, res=response) => {
  const id = req.params.id;

  try {
    const carrito = await Carrito.findByIdAndRemove(id);

    return res.status(200).json({
      ok: true,
      carrito
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

module.exports = {
  createCarrito,
  getCarrito,
  deleteCarrito
}