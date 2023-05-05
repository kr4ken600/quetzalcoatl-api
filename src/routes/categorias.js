const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validate');
const { getCategoria, createCategoria, getFiltro } = require('../controllers/categorias');

const router = Router();

router.get('', getCategoria);

router.get('/:principal', getFiltro);

router.post('/new', [
  check('principal', 'campo requerido').notEmpty(),
  check('subcategoria', 'campo requerido').notEmpty(),
  validate
], createCategoria);


module.exports = router;