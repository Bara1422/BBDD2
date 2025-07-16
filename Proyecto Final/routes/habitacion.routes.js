const express = require("express");
const habitacionController = require("../controllers/habitacionController");

const habitacionRoutes = express.Router();

habitacionRoutes.get("/", async (req, res) => {
  try {
    const habitaciones = await habitacionController.obtenerHabitaciones();
    res.json(habitaciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

habitacionRoutes.get("/:numero", async (req, res) => {
  try {
    const habitacion = await habitacionController.obtenerHabitacionPorNumero(
      req.params.numero
    );
    res.json(habitacion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

habitacionRoutes.post("/", async (req, res) => {
  try {
    const habitacion = await habitacionController.crearHabitacion(req.body);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

habitacionRoutes.put("/:numero", async (req, res) => {
  try {
    const habitacion = await habitacionController.actualizarHabitacion(
      req.params.numero,
      req.body
    );
    res.json({message: "Habitacion actualizada", habitacion});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

habitacionRoutes.delete("/:numero", async (req, res) => {
  try {
    const habitacion = await habitacionController.eliminarHabitacion(
      req.params.numero
    );
    res.json({ message: "Habitación eliminada", habitacion });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = habitacionRoutes;
