const { Schema, model } = require('mongoose');

const TarjetaSchema = Schema({
  uiduser: {
    type: String,
    required: true
  },
  numeroT: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  codigoS: {
    type: String,
    required: true
  },
});

module.exports = model('tarjeta', TarjetaSchema);