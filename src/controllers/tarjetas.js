const { response } = require('express');
const Tarjeta = require('../models/Tarjeta');

const crearTarjeta = async (req, res = response) => {
  const { uid } = req;

  try {

    req.body.uiduser = uid;
    const tarjeta = new Tarjeta(req.body);

    await tarjeta.save();

    return res.status(200).json({
      ok: true,
      msg: 'Tarjeta agregada correctamente'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getTarjetas = async (req, res = response) => {
  const { uid } = req;
  try {

    const tarjetas = await Tarjeta.find({ uiduser: uid });

    return res.status(200).json({
      ok: true,
      tarjetas
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const deleteTarjeta = async (req, res = response) => {
  const id = req.params.id;
  try {
    await Tarjeta.findByIdAndRemove(id)

    return res.status(200).json({
      ok: true,
      msg: 'Tarjeta eliminada correctamente'
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
  crearTarjeta,
  getTarjetas,
  deleteTarjeta
}