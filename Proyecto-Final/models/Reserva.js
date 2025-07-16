const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  habitacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion', required: [true, "La reserva debe tener una habitación asociada"] },
  numeroHabitacion: { type: String, required: true },
  huesped: {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
  },
  fechaEntrada: { type: Date, required: true },
  fechaSalida: { type: Date, required: true },
  noches: { type: Number, required: true },
  precioTotal: { type: Number, required: true },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
  fechaReserva: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reserva', reservaSchema);
