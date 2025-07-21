const express = require('express');
const bodyParser = require('body-parser');
const conectarDB = require('./config/db');
const habitacionRoutes = require('./routes/habitacion.routes');
const reservasRoutes = require('./routes/reservas.routes');
const app = express();
const PORT = process.env.PORT || 3000;


conectarDB();

app.use(bodyParser.json());



app.use('/habitaciones', habitacionRoutes);
app.use('/reservas', reservasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
