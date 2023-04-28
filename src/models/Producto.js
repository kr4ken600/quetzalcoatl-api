const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
  marca:  {
    type: String,
    required: true 
  },
  modelo:  {
    type: String,
    required: true 
  },
  descripcion:  {
    type: String,
    required: true 
  },
  precio:  {
    type: Number,
    required: true 
  },
  stock:  {
    type: Number,
    required: true 
  },
  categoria:  {
    type: String,
    required: true 
  },
  img: {
    type: String,
    required: true
  }
});

module.exports = model('Producto', ProductoSchema);