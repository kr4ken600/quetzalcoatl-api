const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
  principal: {
    type: String,
    required: true
  },
  subcategorias: [
    {
      nombre: {
        type: String,
        required: true
      }
    }
  ],
});

module.exports = model('Categoria', CategoriaSchema);