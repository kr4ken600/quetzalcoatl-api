const { Schema, model } = require('mongoose');

const DetalleSchema = Schema({
  idcompra: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Compra'
  },
  iddireccion: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Direccion'
  },
  idtarjeta: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Tarjeta'
  },
  estatus: {
    type: Boolean,
    required: true,
  }
})

module.exports = model('Detalle', DetalleSchema);