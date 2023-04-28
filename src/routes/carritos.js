const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validToken');
const { createCarrito, getCarrito, deleteCarrito } = require('../controllers/carritos');

const router = Router();


router.post('/new', [
  check('cantidad', 'El cantidad es obligatorio').notEmpty(),
  check('articulo', 'El articulo es obligatorio').notEmpty(),
  validate,
  validarJWT
], createCarrito);

router.get('/', [validarJWT], getCarrito);

router.delete('/:id', [validarJWT], deleteCarrito);

module.exports = router;