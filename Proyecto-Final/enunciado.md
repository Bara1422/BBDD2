Proyecto 5: Sistema de Reservas de Hotel
Dificultad : ⭐⭐⭐

Descripción
Plataforma para gestionar habitaciones, huéspedes y reservas de un hotel.

Requerimientos

Catálogo de habitaciones con diferentes tipos y precios
Sistema de reservas con fechas de entrada y salida
Gestión de huéspedes y su historial
Control de disponibilidad de habitaciones


Estructura de Datos

// Colección: habitaciones
{
  _id: ObjectId,
  numero: "101",
  tipo: "Suite",
  capacidad: 4,
  precioPorNoche: 150.00,
  amenidades: ["WiFi", "TV", "Minibar", "Balcón"],
  disponible: true
}

// Colección: reservas
{
  _id: ObjectId,
  habitacionId: ObjectId,
  huesped: {
    nombre: "María López",
    email: "maria@email.com",
    telefono: "+1234567890"
  },
  fechaEntrada: ISODate,
  fechaSalida: ISODate,
  noches: 3,
  precioTotal: 450.00,
  estado: "confirmada", // "pendiente", "confirmada", "cancelada"
  fechaReserva: ISODate
}



Funciones a Implementar

consultarDisponibilidad(fechaEntrada, fechaSalida, tipo) - Ver habitaciones disponibles
crearReserva(reserva) - Crear nueva reserva
cancelarReserva(reservaId) - Cancelar reserva existente
checkIn(reservaId) - Registrar entrada del huésped
reporteOcupacion(mes, año) - Reporte de ocupación mensual


Criterios de Evaluación

Correcta implementación de las operaciones CRUD
Uso apropiado de consultas y agregaciones
Manejo de errores y validaciones
Estructura de datos eficiente
Documentación del código


Entrega

Cada proyecto debe incluir:

Código fuente completo
Script de inicialización de la base de datos
Ejemplos de uso de todas las funciones
README con instrucciones de instalación y uso