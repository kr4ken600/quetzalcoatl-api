const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({
  uiduser: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  articulo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Producto'
  }
});

module.exports = model('Carrito', CarritoSchema);