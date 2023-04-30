const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validToken');
const { updateCompra, getCompras } = require('../controllers/compras');

const router = Router();

router.post('/update', [
  check('compras', 'El arreglo de compra es obligatorio').notEmpty(),
  check('direccion', 'La direccion es obligatoria').notEmpty(),
  validate,
  validarJWT
], updateCompra);

router.get('', [validarJWT], getCompras);

module.exports = router;