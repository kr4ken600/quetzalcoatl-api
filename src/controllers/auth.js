const { generateJWT } = require('../utils/jwt');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Carrito = require('../models/Carrito');
const Tarjeta = require('../models/Tarjeta');
const Direccion = require('../models/Direccion');
const Compra = require('../models/Compra');


const crearUser = async (req, res = response) => {

  const { username, email, password, role } = req.body;

  try {
    let user = await Usuario.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe"
      })
    }

    const newUser = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    const token = await generateJWT(newUser.id, username)

    await newUser.save();

    return res.status(201).json({
      ok: true,
      uid: newUser.id,
      username,
      role,
      token
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }

}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales invalidas'
      })
    }

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales invalidas'
      })
    }

    const token = await generateJWT(user.id, user.username, user.role);

    return res.json({
      ok: true,
      uid: user.id,
      role: user.role,
      username: user.username,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const revalidToken = async (req, res = response) => {

  const { uid, username, role } = req;

  try {
    const token = await generateJWT(uid, username);

    return res.json({
      ok: true,
      uid: uid,
      role,
      username: username,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

const deleteUser = async (req, res = response) => {
  try {

    const { uid } = req;

    Direccion.deleteMany({ uiduser: uid }).then(d => console.log(d)).catch(err => console.log(err));


    Tarjeta.deleteMany({ uiduser: uid }).then(d => console.log(d)).catch(err => console.log(err));


    Compra.deleteMany({ uiduser: uid }).then(d => console.log(d)).catch(err => console.log(err));


    Carrito.deleteMany({ uiduser: uid }).then(d => console.log(d)).catch(err => console.log(err));

    Usuario.findByIdAndRemove(uid).then(d => console.log(d)).catch(err => console.log(err));

    return res.status(200).json(
      { ok: true, msg: 'Usuario eliminado permanentemente.' }
    )

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}

module.exports = {
  crearUser,
  loginUser,
  revalidToken,
  deleteUser
}