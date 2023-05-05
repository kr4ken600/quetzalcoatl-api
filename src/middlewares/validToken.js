const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('x-token')

  if(!token){
    return res.status(401).json({
      ok: false,
      msg: 'error en el token',
    });
  }

  try {
    
    const { uid, username, role } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.username = username;
    req.role = role;

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'token invalido',
    });
  }

  next();
}


module.exports = {
  validarJWT
}