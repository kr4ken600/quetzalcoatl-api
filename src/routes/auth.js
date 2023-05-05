const { Router } = require('express');
const { crearUser, loginUser,
  revalidToken, deleteUser } = require('../controllers/auth');
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
  check('role', 'El rol es obligatorio').notEmpty(),
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

//Eliminar Usuario
router.delete('/user', [validarJWT], deleteUser);



module.exports = router;