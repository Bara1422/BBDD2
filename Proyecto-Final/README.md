# Proyecto Final - Bases de Datos II

## 📌 Proyecto seleccionado

**Proyecto 5: Sistema de Reservas de Hotel**  
Plataforma para gestionar habitaciones, huéspedes y reservas de un hotel.

---

## 👥 Integrantes del grupo (Grupo 11)

- Juan Baranovsky
- Ismael Cordoba
- Mariana Baradad
- Jesica Pellegrini
- Francisco Ríos

---

## 💻 Tecnología utilizada

**Node.js con Mongoose (MongoDB)**
**Interface de uso: API**

---

## 🚀 Pasos para ejecutar el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Bara1422/BBDD2.git
   ```

2. **Entrar en la carpeta del proyecto**

   ```bash
   cd Proyecto-Final
   ```

3. **Instalar las dependencias**

   ```bash
   npm install
   ```

4. Cargar datos iniciales de Habitaciones con seed

   ```bash
   npm run seed
   ```

5. Ejecutar la aplicación

   ```bash
   npm run dev
   ```

6. Ejecutar las siguientes peticiones HTTP en Postman

   #### Alternativamente se puede usar el .json API Hotel.postman_collection

   Abrir Postman, hacer click en Import, luego hacer click en files y seleccionar **API Hotel.postman_collection.json**
   Esto deberia importar la colección de la API donde se encuentran todas las peticiones

---

## GET /habitaciones

- Respuesta

```json
[
  {
    "_id": "68783292206b3ae01c4c10af",
    "numero": "1",
    "tipo": "Suite",
    "capacidad": 4,
    "precioPorNoche": 200,
    "amenidades": ["WiFi", "TV", "Minibar", "Balcón"],
    "disponible": true,
    "__v": 0
  },
  {
    "_id": "68783292206b3ae01c4c10b0",
    "numero": "2",
    "tipo": "Doble",
    "capacidad": 2,
    "precioPorNoche": 120,
    "amenidades": ["WiFi", "TV"],
    "disponible": true,
    "__v": 0
  },
  {
    "_id": "68783292206b3ae01c4c10b1",
    "numero": "3",
    "tipo": "Individual",
    "capacidad": 1,
    "precioPorNoche": 80,
    "amenidades": ["WiFi"],
    "disponible": true,
    "__v": 0
  }
]
```

## GET /habitaciones/:numero

- Respuesta

```json
{
  "_id": "68783292206b3ae01c4c10af",
  "numero": "1",
  "tipo": "Suite",
  "capacidad": 4,
  "precioPorNoche": 200,
  "amenidades": ["WiFi", "TV", "Minibar", "Balcón"],
  "disponible": true,
  "__v": 0
}
```

## POST /habitaciones

- body

```json
{
  "numero": 2,
  "tipo": "Simple",
  "precioPorNoche": 122,
  "capacidad": 4,
  "amenidades": ["Wifi", "TV"]
}
```

## PUT /habitaciones/:numero

- body: la consulta puede ser total o parcial para modificar solamente los campos incluidos en el body

```json
{
  "tipo": "Doble",
  "amenidades": ["TV", "Camas Dobles"],
  "capacidad": "5"
}
```

## DELETE /habitaciones/:numero

- Respuesta

```json
{
  "message": "Habitación eliminada",
  "habitacion": {
    "_id": "68783292206b3ae01c4c10b0",
    "numero": "2",
    "tipo": "Doble",
    "capacidad": 2,
    "precioPorNoche": 120,
    "amenidades": ["WiFi", "TV"],
    "disponible": true,
    "__v": 0
  }
}
```

---

## POST /reservas

- Body

```json
{
  "numeroHabitacion": "1",
  "huesped": {
    "nombre": "Lionel Messi",
    "email": "liomessi@email.com",
    "telefono": "234291313"
  },
  "fechaEntrada": "2025-08-24",
  "fechaSalida": "2025-08-28",
  "fechaReserva": "2025-08-13",
  "__v": 0
}
```

- Respuesta

```json
{
  "message": "Reserva creada con exito",
  "reserva": {
    "habitacionId": "68783292206b3ae01c4c10af",
    "numeroHabitacion": "1",
    "huesped": {
      "nombre": "Lionel Messi",
      "email": "liomessi@email.com",
      "telefono": "234291313"
    },
    "fechaEntrada": "2025-08-24T00:00:00.000Z",
    "fechaSalida": "2025-08-28T00:00:00.000Z",
    "noches": 4,
    "precioTotal": 480,
    "estado": "pendiente",
    "fechaReserva": "2025-08-13T00:00:00.000Z",
    "_id": "687832b133d4cf31badb6082",
    "__v": 0
  }
}
```

## GET /reservas

- Respuesta

```json
[
  {
    "huesped": {
      "nombre": "Lionel Messi",
      "email": "liomessi@email.com",
      "telefono": "234291313"
    },
    "_id": "68783bfb067f69e2967adc24",
    "habitacionId": {
      "_id": "68783292206b3ae01c4c10af",
      "numero": "1",
      "tipo": "Suite",
      "capacidad": 4,
      "precioPorNoche": 200,
      "amenidades": ["WiFi", "TV", "Minibar", "Balcón"],
      "disponible": true,
      "__v": 0
    },
    "numeroHabitacion": "1",
    "fechaEntrada": "2025-08-24T00:00:00.000Z",
    "fechaSalida": "2025-08-28T00:00:00.000Z",
    "noches": 4,
    "precioTotal": 800,
    "estado": "pendiente",
    "fechaReserva": "2025-08-13T00:00:00.000Z",
    "__v": 0
  }
]
```

## PUT /reservas/checkin/:\_id

- Respuesta

```json
{
  "message": "Reserva confirmada con exito",
  "reserva": {
    "huesped": {
      "nombre": "Lionel Messi",
      "email": "liomessi@email.com",
      "telefono": "234291313"
    },
    "_id": "68783bfb067f69e2967adc24",
    "habitacionId": "68783292206b3ae01c4c10af",
    "numeroHabitacion": "1",
    "fechaEntrada": "2025-08-24T00:00:00.000Z",
    "fechaSalida": "2025-08-28T00:00:00.000Z",
    "noches": 4,
    "precioTotal": 800,
    "estado": "confirmada",
    "fechaReserva": "2025-08-13T00:00:00.000Z",
    "__v": 0
  }
}
```

## PUT /reservas/cancelar/:\_id

- Respuesta

```json
{
  "message": "Reserva cancelada con exito",
  "reserva": {
    "huesped": {
      "nombre": "Lionel Messi",
      "email": "liomessi@email.com",
      "telefono": "234291313"
    },
    "_id": "68783bfb067f69e2967adc24",
    "habitacionId": "68783292206b3ae01c4c10af",
    "numeroHabitacion": "1",
    "fechaEntrada": "2025-08-24T00:00:00.000Z",
    "fechaSalida": "2025-08-28T00:00:00.000Z",
    "noches": 4,
    "precioTotal": 800,
    "estado": "cancelada",
    "fechaReserva": "2025-08-13T00:00:00.000Z",
    "__v": 0
  }
}
```

## GET /reservas/disponibilidad?fechaEntrada=2025-07-24&fechaSalida=2025-07-27&tipo=Individual

Get de disponibilidad para la fecha entre 2025-07-24 y 2025-07-27 de una habitacion tipo Individual

- Respuesta

```json
[
  {
    "_id": "68783292206b3ae01c4c10b1",
    "numero": "3",
    "tipo": "Individual",
    "capacidad": 1,
    "precioPorNoche": 80,
    "amenidades": ["WiFi"],
    "disponible": true,
    "__v": 0
  }
]
```

## GET /reservas/reporte-ocupacion?mes=08&anio=2025

Get de reporte de ocupación del mes 08 del año 2025
Si siguieron el paso a paso hay que volver a crear una reserva y tambien ejecutar la ruta de checkin para confirmarla

- Respuesta

```json
{
  "diasMes": 31,
  "mes": 8,
  "anio": 2025,
  "nochesOcupadas": 4,
  "totalHabitaciones": 2,
  "porcentajeOcupacion": "6.45%",
  "mensaje": "Reporte de ocupación para el mes 8 del año 2025 - 4 noches ocupadas de 62 noches posibles (habitaciones totales * dias del mes)."
}
```

### 💥 Posible error mongo

en config/db.js modificar la linea

```javascript
await mongoose.connect("mongodb://127.0.0.1:27017/hotel-reservas");
```

por esta otra

```javascript
await mongoose.connect("mongodb://localhost/hotel-reservas");
```

No me funcionaba si no ponia **127.0.0.1**
