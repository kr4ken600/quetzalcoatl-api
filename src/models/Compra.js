const { Schema, model } = require('mongoose');

const moment = require('moment-timezone');
const dateMexico = moment.tz(Date.now(), 'America/Mexico_City');

const ComrpraSchema = Schema({
  uiduser: {
    type: String,
    required: true
  },
  compralist: [
    {
      cantidad: {
        type: Number,
        required: true
      },
      articulo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
      },
      fecha_compra: {
        type: Date,
        default: dateMexico
      },
      iddireccion: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Direccion'
      },
      idtarjeta: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'tarjeta'
      },
      estatus: {
        type: Boolean,
        required: true,
      }
    }
  ]
});

module.exports = model('Compra', ComrpraSchema);