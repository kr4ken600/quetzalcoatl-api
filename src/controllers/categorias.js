const { response } = require('express');
const Categoria = require('../models/Categorias');

const getCategoria = async (req, res = response) => {
  try {

    const categorias = await Categoria.find();

    return res.status(200).json({
      ok: true,
      categorias,
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
  const principal = req.params.principal;
  
  try {

    const categoria = await Categoria.find({ principal });

    return res.status(200).json({
      ok: true,
      categoria,
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const createCategoria = async (req, res = response) => {
  try {

    const categoria = new Categoria(req.body);

    await categoria.save();

    return res.status(200).json({
      ok: true,
      categoria
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
  getCategoria,
  createCategoria,
  getFiltro
}