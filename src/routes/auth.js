const { Router } = require('express');
const { crearUser, loginUser,
  revalidToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validToken');

const router = Router();

// Crear Usuario
router.post('/new', [
  check('username', 'El username es obligatorio').notEmpty(),
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({
    min: 6
  }),
  validate
], crearUser);

// Loguear usuario
router.post('/', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({
    min: 6
  }),
  validate
], loginUser);

//Recrear Token
router.get('/renew', [validarJWT], revalidToken);

router.get('/test', (req, res) => {
  return res.json({
    msg: 'Mensaje de prueba'
  });
});


module.exports = router;