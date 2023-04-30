const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConection } = require('./src/db/config');

const port = process.env.PORT || 4000;
const app = express();
dbConection();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./src/routes/auth'));

app.use('/api/address', require('./src/routes/direcciones'));

app.use('/api/tarjet', require('./src/routes/tarjetas'));

app.use('/api/product', require('./src/routes/productos'));

app.use('/api/cat', require('./src/routes/categorias'));

app.use('/api/car', require('./src/routes/carritos'));

app.use('/api/shop', require('./src/routes/compras'));

app.listen(port, () => {
  console.log(`Servidor listo en el PORT: ${port}`);
})