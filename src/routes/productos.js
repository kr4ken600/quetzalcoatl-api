const { Router } = require('express');
const { check } = require('express-validator');
const { validate, validRoleAdmin } = require('../middlewares/validate');
const { validarJWT } = require('../middlewares/validToken');
const { createProducto, getProductos, getVendidos, getFiltro, getProducto, actualziarData } = require('../controllers/productos');

const router = Router();

router.post('/new', [
  check('marca', 'El marca es obligatorio').notEmpty(),
  check('modelo', 'El modelo es obligatorio').notEmpty(),
  check('descripcion', 'El descripcion es obligatorio').notEmpty(),
  check('precio', 'El precio es obligatorio').notEmpty(),
  check('stock', 'El stock es obligatorio').notEmpty(),
  check('categoria', 'La categoria es obligatorio').notEmpty(),
  check('img', 'La img es obligatorio').notEmpty(),
  validate,
  validarJWT,
  validRoleAdmin
], createProducto);

router.post('/update/:id', [
  validarJWT,
  validRoleAdmin
] ,actualziarData);

router.get('/ventas', getVendidos);
router.get('/all', getProductos);
router.get('/:categoria', getFiltro);
router.get('/articulo/:id', getProducto);


module.exports = router;