const Habitacion = require("../models/Habitacion");

class HabitacionController {
  async obtenerHabitaciones() {
    return await Habitacion.find();
  }

  async obtenerHabitacionPorNumero(numero) {
    const habitacion = await Habitacion.findOne({ numero });
    if (!habitacion) throw new Error("Habitación no encontrada");
    return habitacion;
  }

  async crearHabitacion(data) {
    const {
      numero,
      tipo,
      precioPorNoche,
      capacidad,
      disponible = true,
      amenidades,
    } = data;
    if (!numero || !tipo || !precioPorNoche || !capacidad) {
      throw new Error(
        "Número, tipo y precio por noche, capacidad son obligatorios"
      );
    }

    if (numero < 1 || capacidad < 1) {
      throw new Error("Número de habitación y capacidad deben ser mayores a 0");
    }

    const existeHabitacion = await Habitacion.findOne({ numero });
    if (existeHabitacion) {
      throw new Error("Ya existe una habitación con ese número");
    }

    if (precioPorNoche <= 0) {
      throw new Error("El precio por noche debe ser mayor a 0");
    }

    const habitacion = new Habitacion({
      numero,
      tipo,
      precioPorNoche,
      disponible,
      capacidad,
      amenidades: amenidades || [],
    });

    await habitacion.save();
    return habitacion;
  }

  async actualizarHabitacion(numero, data) {
    const id = await Habitacion.findOne({ numero }).select("_id");
    if (!id) throw new Error("Habitación no encontrada");
    const camposActualizar = {};

    if (data.numero) {
      throw new Error(
        "No se puede actualizar el número de habitación, es inmutable"
      );
    }

    if (data.tipo !== undefined && data.tipo !== null && data.tipo !== "") {
      camposActualizar.tipo = data.tipo;
    }

    if (
      data.precioPorNoche !== undefined &&
      data.precioPorNoche !== null &&
      data.precioPorNoche > 0
    ) {
      camposActualizar.precioPorNoche = data.precioPorNoche;
    }

    if (data.capacidad) {
      if (
        data.capacidad !== undefined &&
        data.capacidad !== null &&
        data.capacidad > 0
      ) {
        camposActualizar.capacidad = data.capacidad;
      }
    }

    if (data.amenidades !== undefined && data.amenidades !== null) {
      camposActualizar.amenidades = data.amenidades;
    }

    if (data.disponible) {
      if (data.disponible === "true" || data.disponible === "false") {
        camposActualizar.disponible = data.disponible;
      } else {
        throw new Error("El campo 'disponible' debe ser un booleano");
      }
    }

    if (Object.keys(camposActualizar).length === 0) {
      throw new Error("No se proporcionaron campos para actualizar");
    }

    const habitacion = await Habitacion.findByIdAndUpdate(
      id,
      camposActualizar,
      {
        new: true,
      }
    );
    if (!habitacion) throw new Error("Habitación no encontrada");
    return habitacion;
  }

  async eliminarHabitacion(numero) {
    const habitacion = await Habitacion.findOne({ numero });
    if (!habitacion) throw new Error("Habitación no encontrada");

    if (habitacion.disponible === false) {
      throw new Error("No se puede eliminar una habitación no disponible");
    }

    const habitacionBorrada = await Habitacion.deleteOne(habitacion);
    if (!habitacionBorrada) throw new Error("Habitación no encontrada");
    return habitacion;
  }
}

module.exports = new HabitacionController();
