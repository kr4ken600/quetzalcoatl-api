const { response } = require('express');
const Compra = require('../models/Compra');
const Carrito = require('../models/Carrito');
const { updateStock } = require('./productos');

const mongoose = require("mongoose");

const updateCompra = async (req, res = response) => {
  const { uid } = req;

  try {

    const { compras, idcarrito } = req.body;

    const compra = await Compra.find({ uiduser: uid });

    if (compra.length === 0) {

      const newC = {
        uiduser: uid,
        compralist: compras
      }

      const compraNueva = new Compra(newC);

      compraNueva.save();

      if (idcarrito) {

        await Carrito.deleteMany({ uiduser: uid });
      }

      compras.forEach(prod => {
        updateStock(prod.articulo, prod.cantidad);
      })
      return res.status(202).json({
        ok: true,
        msg: 'Compra realizada',
        compraNueva
      })
    }

    const { id, compralist } = compra[0];
    compras.forEach(prod => {
      compralist.push(prod);

      updateStock(prod.articulo, prod.cantidad);
    });

    await Compra.findByIdAndUpdate(id, { compralist });

    if (idcarrito) {
      await Carrito.deleteMany({ uiduser: uid });
    }

    return res.status(202).json({
      ok: true,
      msg: 'Compra realizada',
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getCompras = async (req, res = response) => {
  const { uid } = req;
  try {

    const compras = await Compra.find({ uiduser: uid }).populate('compralist.articulo');

    return res.status(200).json({
      ok: true,
      compras
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getDetalle = async (req, res = response) => {
  const id = req.params.id;
  const { uid } = req;
  try {

    const detalle = await Compra.find({ uiduser: uid }).populate(['compralist.articulo', 'compralist.iddireccion', 'compralist.idtarjeta'])

    const articulo = detalle[0].compralist.filter((art) => art.id === id);


    res.status(201).json({ ok: true, articulo })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getDetalleAdmin = async (req, res = response) => {
  try {

    const detalles = await Compra.find().populate(['compralist.articulo', 'compralist.iddireccion', 'compralist.idtarjeta'])

    res.status(201).json({ ok: true, detalles })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const updateStatus = async (req, res = response) => {
  try {
    const { uid, idprod } = req.body;
    const id = new mongoose.Types.ObjectId(idprod);

    const compras = await Compra.find({ uiduser: uid });

    const detalle = await Compra.aggregate([
      {
        $unwind: "$compralist"
      },
      {
        $match: {
          "compralist._id": id
        }
      }
    ]);

    const art = detalle[0].compralist;
    art.estatus = true;
    const identificador = art.identificador;


    const idCompra = compras[0]._id;

    const result = compras[0].compralist.filter(c => c.identificador !== identificador);

    result.push(art);

    await Compra.findByIdAndUpdate(idCompra, { compralist: result });

    res.status(200).json({
      ok: true,
      msg: 'Compra Actualizada'
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
  updateCompra,
  getCompras,
  getDetalle,
  getDetalleAdmin,
  updateStatus
}