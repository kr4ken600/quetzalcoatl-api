const { Schema, model } = require('mongoose');

const moment = require('moment-timezone');
const dateMexico = moment.tz(Date.now(), 'America/Mexico_City');

const ComrpraSchema = Schema({
  uiduser: {
    type: String,
    required: true
  },
  productos: [
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
      }
    }
  ]
});

module.exports = model('Compra', ComrpraSchema);