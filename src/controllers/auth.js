const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../utils/jwt');


const crearUser = async (req, res = response) => {

  const { username, email, password } = req.body;

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

    const token = await generateJWT(user.id, user.username);

    return res.json({
      ok: true,
      uid: user.id,
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

  const { uid, username } = req;

  try {
    const token = await generateJWT(uid, username);

    return res.json({
      ok: true,
      uid: uid,
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

module.exports = {
  crearUser,
  loginUser,
  revalidToken
}