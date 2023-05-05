const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({
      ok: false,
      errors: errors.mapped()
    })
  }


  next()
}

const validRoleAdmin = (req, res, next) => {
  const role = req.role;

  if (role !== 'admin') {
    return res.status(404).json({
      ok: false,
      msg: 'Usuario no valido'
    });
  }

  next();
}

module.exports = {
  validate,
  validRoleAdmin
}