const express = require("express");
const reservasController = require("../controllers/reservasController");

const reservasRoutes = express.Router();

reservasRoutes.get("/", async (req, res) => {
  try {
    const reservas = await reservasController.obtenerReservas();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservasRoutes.post("/", async (req, res) => {
  try {
    const reserva = await reservasController.crearReserva(req.body);
    res.status(201).json({message: "Reserva creada con exito", reserva});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservasRoutes.put("/cancelar/:id", async (req, res) => {
  try {
    const reserva = await reservasController.cancelarReserva(req.params.id);
    res.json({message: "Reserva cancelada con exito", reserva});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservasRoutes.put("/checkin/:id", async (req, res) => {
  try {
    const reserva = await reservasController.checkIn(req.params.id);
    res.json({message: "Reserva confirmada con exito", reserva});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

reservasRoutes.delete("/:id", async (req, res) => {
  try {
    const reserva = await reservasController.borrarReserva(req.params.id);
    res.status(200).json({message: "Reserva eliminada con exito",reserva});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


reservasRoutes.get("/disponibilidad", async (req, res) => {
  try {
    const { fechaEntrada, fechaSalida, tipo } = req.query;
    const habitaciones = await reservasController.consultarDisponibilidad(
      fechaEntrada,
      fechaSalida,
      tipo
    );
    res.json(habitaciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


reservasRoutes.get('/reporte-ocupacion', async (req, res) => {
  try {
    const { mes, anio } = req.query;
    const reporte = await reservasController.reporteOcupacion(Number(mes), Number(anio));
    res.json(reporte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = reservasRoutes;
