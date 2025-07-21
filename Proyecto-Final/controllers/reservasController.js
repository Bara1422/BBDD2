const Reserva = require("../models/Reserva");
const Habitacion = require("../models/Habitacion");

class ReservasController {
  async consultarDisponibilidad(fechaEntrada, fechaSalida, tipo) {
    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);

    const habitacionesOcupadas = await Reserva.distinct("habitacionId", {
      estado: { $in: ["pendiente", "confirmada"] },
      $or: [{ fechaEntrada: { $lt: salida }, fechaSalida: { $gt: entrada } }],
    });

    const habitacionesDisponibles = await Habitacion.find({
      tipo: tipo,
      disponible: true,
      _id: { $nin: habitacionesOcupadas },
    });

    return habitacionesDisponibles;
  }

  async crearReserva(data) {
    const {
      numeroHabitacion,
      huesped,
      fechaEntrada,
      fechaSalida,
      fechaReserva,
    } = data;

    const habitacion = await Habitacion.findOne({ numero: numeroHabitacion });
    if (!habitacion) throw new Error("Habitación no encontrada");

    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);

    if (salida <= entrada) {
      throw new Error("Fecha de salida debe ser mayor a fecha de entrada");
    }

    const tiempoEstadiaMs = salida - entrada;
    const noches = Math.ceil(tiempoEstadiaMs / (1000 * 60 * 60 * 24));

    const reservasExistentes = await Reserva.find({
      habitacionId: habitacion._id,
      estado: { $in: ["pendiente", "confirmada"] },
      $or: [{ fechaEntrada: { $lt: salida }, fechaSalida: { $gt: entrada } }],
    });

    if (reservasExistentes.length > 0) {
      throw new Error(
        "La habitación no está disponible en las fechas solicitadas"
      );
    }

    const precioTotal = noches * habitacion.precioPorNoche;

    const nuevaReserva = new Reserva({
      habitacionId: habitacion._id,
      numeroHabitacion,
      huesped,
      fechaEntrada: entrada,
      fechaSalida: salida,
      noches,
      precioTotal,
      fechaReserva,
      estado: "pendiente",
    });

    await nuevaReserva.save();

    return nuevaReserva;
  }

  async cancelarReserva(reservaId) {
    const reserva = await Reserva.findById(reservaId);
    if (!reserva) throw new Error("Reserva no encontrada");

    reserva.estado = "cancelada";
    await reserva.save();

    return reserva;
  }

  async checkIn(reservaId) {
    const reserva = await Reserva.findById(reservaId);
    if (!reserva) throw new Error("Reserva no encontrada");

    if (reserva.estado !== "pendiente") {
      throw new Error("Solo se puede hacer check-in en reservas pendientes");
    }

    reserva.estado = "confirmada";
    await reserva.save();

    return reserva;
  }

  async reporteOcupacion(mes, anio) {
    const inicioMes = new Date(anio, mes - 1, 1);
    const finMes = new Date(anio, mes, 0, 23, 59, 59);

    const reservasMes = await Reserva.find({
      estado: "confirmada",
      $or: [
        { fechaEntrada: { $lte: finMes } },
        { fechaSalida: { $gte: inicioMes } },
      ],
    }).populate("habitacionId");

    const totalHabitaciones = await Habitacion.countDocuments();
    if (totalHabitaciones === 0) {
      throw new Error("No hay habitaciones registradas");
    }

    let nochesOcupadas = 0;

    reservasMes.forEach((reserva) => {
      const entrada =
        reserva.fechaEntrada < inicioMes ? inicioMes : reserva.fechaEntrada;
      const salida =
        reserva.fechaSalida > finMes ? finMes : reserva.fechaSalida;

      const diferenciaEnMs = (salida - entrada) / (1000 * 60 * 60 * 24);
      nochesOcupadas += diferenciaEnMs;
    });

    const diasMes = finMes.getDate();

    const porcentajeOcupacion =
      (nochesOcupadas / (totalHabitaciones * diasMes)) * 100;

    return {
      diasMes,
      mes,
      anio,
      nochesOcupadas,
      totalHabitaciones,
      porcentajeOcupacion: porcentajeOcupacion.toFixed(2) + "%",
      mensaje: `Reporte de ocupación para el mes ${mes} del año ${anio} - ${nochesOcupadas} noches ocupadas de ${
        totalHabitaciones * diasMes
      } noches posibles (habitaciones totales * dias del mes).`,
    };
  }

  async obtenerReservas() {
    const reservas = await Reserva.find().populate("habitacionId");
    return reservas;
  }

  async borrarReserva(reservaId) {
    const reserva = await Reserva.findByIdAndDelete(reservaId);
    if (!reserva) throw new Error("Reserva no encontrada");
    return reserva;
  }
}

module.exports = new ReservasController();
