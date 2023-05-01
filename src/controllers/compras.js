const { response } = require('express');
const Compra = require('../models/Compra');

const updateCompra = async (req, res = response) => {
  const { uid } = req;

  try {

    const { compras } = req.body;

    const compra = await Compra.find({ uiduser: uid });

    if (compra.length === 0) {

      const newC = {
        uiduser: uid,
        compralist: compras
      }

      const compraNueva = new Compra(newC);

      compraNueva.save();

      return res.status(202).json({
        ok: true,
        msg: 'Compra realizada',
        compraNueva
      })
    }

    const { id, compralist } = compra[0];
    compras.forEach(prod => {
      compralist.push(prod);
    });

    await Compra.findByIdAndUpdate(id, { compralist });

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

module.exports = {
  updateCompra,
  getCompras,
  getDetalle
}