const mongoose = require("mongoose");
const Habitacion = require("./models/Habitacion");
const Reserva = require("./models/Reserva");

const habitacionesSeed = [
  {
    numero: 1,
    tipo: "Suite",
    capacidad: 4,
    precioPorNoche: 200.0,
    amenidades: ["WiFi", "TV", "Minibar", "Balcón"],
    disponible: true,
  },
  {
    numero: 2,
    tipo: "Doble",
    capacidad: 2,
    precioPorNoche: 120.0,
    amenidades: ["WiFi", "TV"],
    disponible: true,
  },
  {
    numero: 3,
    tipo: "Individual",
    capacidad: 1,
    precioPorNoche: 80.0,
    amenidades: ["WiFi"],
    disponible: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hotel-reservas");
    await Habitacion.deleteMany();
    await Reserva.deleteMany();
    await Habitacion.insertMany(habitacionesSeed);
    console.log("Habitaciones insertadas correctamente");
    process.exit();
  } catch (error) {
    console.error("Error al insertar las habitaciones:", error);
    process.exit(1);
  }
};

seed();
