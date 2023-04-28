const { Schema, model } = require('mongoose');

const DireccionSchema = Schema({
  uiduser: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
});

module.exports = model('Direccion', DireccionSchema);