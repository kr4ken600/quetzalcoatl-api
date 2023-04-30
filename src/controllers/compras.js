const { response } = require('express');
const Compra = require('../models/Compra');
const Detalle = require('../models/Detalle');

const updateCompra = async (req, res = response) => {
  const { uid } = req;

  try {

    const { compras, direccion, tarjeta } = req.body;

    const compra = await Compra.find({ uiduser: uid });

    if (compra.length === 0) {

      const newC = {
        uiduser: uid,
        productos: compras
      }

      const compraNueva = new Compra(newC);

      compraNueva.save();

      createDetalle(compraNueva.id, direccion, tarjeta);

      return res.status(202).json({
        ok: true,
        msg: 'Compra realizada',
        compraNueva
      })
    }

    const { id, productos } = compra[0];
    compras.forEach(prod => {
      productos.push(prod);
    });

    await Compra.findByIdAndUpdate(id, { productos });

    createDetalle(id, direccion, tarjeta);

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

const createDetalle = async (idcompra, iddireccion, idtarjeta) => {
  const detalle = {
    idcompra,
    iddireccion,
    idtarjeta,
    estatus: false,
  }
  try {
    const cDetalle = new Detalle(detalle);

    cDetalle.save();

    console.log('Detalle creado');
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

    const compras = await Compra.find({ uiduser: uid }).populate('productos.articulo');

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

module.exports = {
  updateCompra,
  getCompras
}