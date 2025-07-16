const mongoose = require("mongoose");

const habitacionSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true, immutable: true },
  tipo: { type: String, required: true },
  capacidad: {
    type: Number,
    required: true,
    min: [1, "La capacidad debe ser mayor a 0"],
  },
  precioPorNoche: {
    type: Number,
    required: true,
    min: [1, "El precio por noche debe ser mayor a 0"],
  },
  amenidades: [String],
  disponible: { type: Boolean, default: true },
});

habitacionSchema.pre("deleteOne", async function (next) {
  try {
    const habitacion = await this.model.findOne(this.getFilter());
    console.log(habitacion)
    if (habitacion) {
      await mongoose
        .model("Reserva")
        .deleteMany({ habitacionId: habitacion._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Habitacion", habitacionSchema);
