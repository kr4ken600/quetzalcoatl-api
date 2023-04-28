const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validToken');
const { crearDireccion, getDirecciones, deleteDireccion } = require('../controllers/direcciones');

const router = Router();

router.post('/new', [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('direccion', 'La direccion es obligatoria').notEmpty(),
  check('codigo', 'El codigo postal es obligatorio').notEmpty().isLength({
    min: 5, max: 5
  }),
  check('numero', 'El numero telefonico es obligatorio').notEmpty().isLength({
    min: 10, max: 10
  }),
  validate,
  validarJWT
], crearDireccion);

router.get('/', [
  validarJWT
], getDirecciones)

router.delete('/:id', [
  validarJWT
], deleteDireccion)

module.exports = router;