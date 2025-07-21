const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hotel-reservas');
    //await mongoose.connect('mongodb://localhost:27017/hotel-reservas')
    // Si no funciona la linea 5, comentarla y descomentar la linea 6

    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;
