const { response } = require('express');
const Direccion = require('../models/Direccion');

const crearDireccion = async (req, res = response) => {
  const { uid } = req;

  try {

    req.body.uiduser = uid;
    const  direccion = new Direccion(req.body);
    
    await direccion.save();

    return res.status(200).json({
      ok: true,
      msg: 'Direccion agregada correctamente'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const getDirecciones = async (req, res = response) => {

  const { uid } = req;
  try {
    
    const direcciones = await Direccion.find({ uiduser: uid});

    return res.status(200).json({
      ok: true,
      direcciones
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const deleteDireccion = async (req, res=response) => {
  const id = req.params.id;
  try {
    await Direccion.findByIdAndRemove(id)

    return res.status(200).json({
      ok: true,
      msg: 'Direccion eliminada correctamente'
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
  crearDireccion,
  getDirecciones,
  deleteDireccion
}