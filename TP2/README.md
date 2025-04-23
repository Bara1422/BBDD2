# TP 2

### ----------Ejercicio 1: CRUD básico----------

1. Crea una base de datos llamada empresa.
```mongodb
use("empresa");
```

2. Agrega una colección empleados con 3 documentos que incluyan nombre, edad y puesto.
```mongodb
db.empleados.insertMany([
  {
    nombre: "Laura Gómez",
    edad: 28,
    puesto: "Analista de datos",
  },
  {
    nombre: "Carlos Ruiz",
    edad: 35,
    puesto: "Desarrollador backend",
  },
  {
    nombre: "María Torres",
    edad: 42,
    puesto: "Gerente de proyectos",
  },
  {
    nombre: "Javier Méndez",
    edad: 30,
    puesto: "Diseñador UX/UI",
  },
  {
    nombre: "Ana López",
    edad: 26,
    puesto: "Marketing digital",
  },
  {
    nombre: "Diego Fernández",
    edad: 40,
    puesto: "Administrador de sistemas",
  },
  {
    nombre: "Sofía Herrera",
    edad: 32,
    puesto: "Scrum Master",
  },
  {
    nombre: "Martín Acosta",
    edad: 29,
    puesto: "QA Tester",
  },
]);
```

3. Actualiza la edad de uno de los empleados.
```mongodb
db.empleados.updateOne({ nombre: "María Torres" }, { $set: { edad: 29 } });

// Agregar puesto pasante
db.empleados.updateOne(
  { nombre: "Carlos Ruiz" },
  { $set: { puesto: "Pasante" } }
);

db.empleados.find();
```

4. Elimina al empleado que tenga el puesto de "pasante".
```mongodb
db.empleados.deleteOne({ puesto: "Pasante" });

db.empleados.find();
```
### ----------Ejercicio 2----------
##### Búsquedas con operadores
Consulta todos los empleados cuya edad esté entre 25 y 40 años. Usa operadores relacionales y lógicos.
```mongodb
db.empleados.find({ edad: { $gt: 25, $lt: 40 } });
```

### ----------Ejercicio 3:----------
##### Uso de proyección 
Recupera los nombres y puestos de todos los empleados, sin mostrar el _id.
```mongodb
db.empleados.find({}, { nombre: 1, puesto: 1, _id: 0 });
```

### ----------Ejercicio 4:----------
##### Documentos embebidos
Agrega un campo direccion que incluya calle, ciudad y codigo_postal.
```mongodb
db.empleados.updateMany(
  {},
  { $set: { direccion: { calle: {}, ciudad: {}, codigo_postal: {} } } }
);
db.empleados.find();
```

### ----------Ejercicio 5:----------
##### Agregación
Dada una colección ventas con campos producto, cantidad y precio_unitario, calcula el total de ventas por producto usando `$group` y `$sum`.

```mongodb
db.ventas.insertMany([
  { producto: "Laptop", cantidad: 2, precio_unitario: 800 },
  { producto: "Mouse", cantidad: 5, precio_unitario: 25 },
  { producto: "Laptop", cantidad: 1, precio_unitario: 800 },
  { producto: "Teclado", cantidad: 3, precio_unitario: 45 },
  { producto: "Mouse", cantidad: 2, precio_unitario: 25 },
  { producto: "Monitor", cantidad: 1, precio_unitario: 300 },
]);

db.ventas.aggregate([
  {
    $group: {
      _id: "$producto",
      total_ventas: {
        $sum: {
          $multiply: ["$cantidad", "$precio_unitario"],
        },
      },
    },
  },
]);
```
### ----------Ejercicio 6:----------
##### Índices 
Crea un índice compuesto sobre los campos apellido y nombre en una colección de clientes.

```mongodb
db.clientes.insertMany([
  { apellido: "Gómez", nombre: "Laura", email: "laura.gomez@email.com" },
  { apellido: "Fernández", nombre: "Carlos", email: "carlos.fernandez@email.com" },
  { apellido: "López", nombre: "Ana", email: "ana.lopez@email.com" },
  { apellido: "García", nombre: "Javier", email: "javier.garcia@email.com" }
])

db.clientes.createIndex({apellido: 1, nombre: 1});
db.clientes.find({}, {apellido: 1});
```


### ----------Ejercicio 7:----------
##### Referencias 
Crea una colección cursos y una colección alumnos. Luego inserta documentos donde los alumnos tengan una lista de id_curso referenciando a los cursos.

```mongodb
db.cursos.insertMany([
    {
        id: 1,
        nombre: "Desarrollo web",
        duracion: 6,
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-06-30"
    },
    {
        id: 2,
        nombre: "Desarrollo movil",
        duracion: 6,
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-06-30"
    },
    {
        id: 3,
        nombre: "Desarrollo backend",
        duracion: 6,
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-06-30"
    }
])

db.alumnos.insertMany([
    {
        id: 1,
        nombre: "Carlos Ruiz",
        edad: 35,
        id_cursos: [1, 2]
    },
    {
        id: 2,
        nombre: "María Torres",
        edad: 42,
        id_cursos: [2, 3]
    },
    {
        id: 3,
        nombre: "Javier Méndez",
        edad: 30,
        id_cursos: [1, 3]
    }
])
```

### ----------Ejercicio 8: ----------
##### Uso de `$lookup` 
Realiza una agregación donde se combinen los datos de alumnos y cursos usando `$lookup`.
```mongodb
db.alumnos.aggregate([
    {
        $lookup: {
          from: "cursos",
          localField: "id_cursos",
          foreignField: "id",
          as: "cursos_insc"
        }
    }
])
```

### ----------Ejercicio 9:----------

##### Replicación y sharding (teórico) 
Describe con tus palabras las ventajas de usar un Replica Set y qué beneficios aporta el sharding en una base de datos de alto volumen.

##### Replica Set: 
1. Tiene una gran disponibilidad ya que al ser un conjunto de nodos, si falla uno, los demás se encargan de mantener la integridad de la base de datos.
2. Tiene una buena buena tolerancia a fallos.

##### Sharding
1. Al dividir la base de datos en partes, se puede distribuir la carga de trabajo entre los nodos.
2. Genera un mayor rendimiento en en las consultas ya que se distribuyen entre los nodos.

### ----------Ejercicio 10::----------

##### Seguridad y backups 
Muestra los pasos para crear un usuario con permisos de lectura y escritura, y los comandos necesarios para hacer backup y restauración de una base de datos.

```mongodb
// Crear usuario con permisos de lectura y escritura
db.createUser({
  user: "userLecturaEscritura",
  pwd: "password",
  roles: [{ role: "readWrite", db: "empresa" }]
});

// Para ver los usuarios de la base de datos
db.getUsers()
```
Para hacer backup de la base de datos ejecutamos el siguiente comando en la consola:

`mongodump --db empresa --out ./backup`


Para hacer una restauracion de la base de datos ejecutamos el siguiente comando:

`mongorestore --db empresa ./backup/empresa`
