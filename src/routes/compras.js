const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validToken');
const { updateCompra, getCompras, getDetalle } = require('../controllers/compras');

const router = Router();

router.post('/update', [
  check('compras', 'El arreglo de compra es obligatorio').notEmpty(),
  validate,
  validarJWT
], updateCompra);

router.get('', [validarJWT], getCompras);

router.get('/:id', [validarJWT], getDetalle);

module.exports = router;