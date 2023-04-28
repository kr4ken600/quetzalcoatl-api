const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validToken');
const { crearTarjeta, getTarjetas, deleteTarjeta } = require('../controllers/tarjetas');

const router = Router();

router.post('/new', [
  check('numeroT', 'El numero es obligatorio').isLength({
    max: 16, min: 16
  }).notEmpty(),
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('fecha', 'La fecha es obligatorio').notEmpty(),
  check('codigoS', 'El codigo es obligatorio').isLength({
    max: 3, min: 3
  }).notEmpty(),
  validate,
  validarJWT
], crearTarjeta);

router.get('/', [
  validarJWT
], getTarjetas)

router.delete('/:id', [
  validarJWT
], deleteTarjeta)

module.exports = router;