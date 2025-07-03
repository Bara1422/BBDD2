# Biblioteca Universitaria Extendida

## Grupo 11
1. Ismael Cordoba
2. Mariana Baradad
3. Jesica Pellegrini
4. Francisco Ríos
5. Juan Baranovsky

---

### Creación de Carreras
```cypher
CREATE (carr1: Carrera {nombre: "Ingeniería Química"});
CREATE (carr2: Carrera {nombre: "Abogacía"});
CREATE (carr3: Carrera {nombre: "Arquitectura"});
```

---

### Creación de Estudiantes
```cypher
CREATE (est1: Estudiantes {nombre: "Carlos"});
CREATE (est2: Estudiantes {nombre: "Soledad"});
CREATE (est3: Estudiantes {nombre: "Cristian"});
```

---

### Creación de Categorías
```cypher
CREATE (cat1: Categoria {nombre: "Ingeniería"});
CREATE (cat2: Categoria {nombre: "Derecho"});
CREATE (cat3: Categoria {nombre: "Diseño"});
CREATE (cat4: Categoria {nombre: "Matemáticas"});
```

---

### Creación de Libros
```cypher
CREATE (lib1: Libro {nombre: "Arquitectura gótica"});
CREATE (lib2: Libro {nombre: "Derecho laboral"});
CREATE (lib3: Libro {nombre: "Álgebra avanzada"});
CREATE (lib4: Libro {nombre: "Manual de Fórmulas Técnicas"});
```

---

### Creación de relación Estudiantes - Carreras
```cypher
MATCH (est1: Estudiantes {nombre: "Carlos"}) WITH est1 MATCH (carr1: Carrera {nombre: "Ingeniería Química"}) CREATE (est1)-[:CURSA]->(carr1);
MATCH (est2: Estudiantes {nombre: "Soledad"}) WITH est2 MATCH (carr2: Carrera {nombre: "Abogacía"}) CREATE (est2)-[:CURSA]->(carr2);
MATCH (est3: Estudiantes {nombre: "Cristian"}) WITH est3 MATCH (carr3: Carrera {nombre: "Arquitectura"}) CREATE (est3)-[:CURSA]->(carr3);
```

---


### Creación de relación Libros - Categorías
```cypher
MATCH (lib1: Libro {nombre: "Arquitectura gótica"}) WITH lib1 MATCH (cat3: Categoria {nombre: "Diseño"}) CREATE (lib1)-[:PERTENECE_A]->(cat3);
MATCH (lib2: Libro {nombre: "Derecho laboral"}) WITH lib2 MATCH (cat2: Categoria {nombre: "Derecho"}) CREATE (lib2)-[:PERTENECE_A]->(cat2);
MATCH (lib3: Libro {nombre: "Álgebra avanzada"}) WITH lib3 MATCH (cat4: Categoria {nombre: "Matemáticas"}) CREATE (lib3)-[:PERTENECE_A]->(cat4);
MATCH (lib4: Libro {nombre: "Manual de Fórmulas Técnicas"}) WITH lib4 MATCH (cat1: Categoria {nombre: "Ingeniería"}) CREATE (lib4)-[:PERTENECE_A]->(cat1);
```

---

### Creación de Prestamos de Libros
```cypher
MATCH (est1: Estudiantes {nombre: "Carlos"}) 
WITH est1 
MATCH (lib4: Libro {nombre: "Manual de Fórmulas Técnicas"}) 
CREATE (est1)-[:PRESTAMO {fecha: date("2025-06-30"), estado: "Activo"}]->(lib4);

MATCH (est2: Estudiantes {nombre: "Soledad"}) 
WITH est2 
MATCH (lib2: Libro {nombre: "Derecho laboral"}) 
CREATE (est2)-[:PRESTAMO {fecha: date("2025-06-27"), estado: "Devuelto"}]->(lib2);

MATCH (est3: Estudiantes {nombre: "Cristian"}) 
WITH est3 
MATCH (lib1: Libro {nombre: "Arquitectura gótica"}) 
CREATE (est3)-[:PRESTAMO {fecha: date("2025-06-29"), estado: "Activo"}]->(lib1);

MATCH (est1: Estudiantes {nombre: "Carlos"}) 
WITH est1 
MATCH (lib3: Libro {nombre: "Álgebra avanzada"}) 
CREATE (est1)-[:PRESTAMO {fecha: date("2025-06-05"), estado: "Devuelto"}]->(lib3);

MATCH (est3: Estudiantes {nombre: "Cristian"})
WITH est3
MATCH (lib3: Libro {nombre: "Álgebra avanzada"}) 
CREATE (est3)-[:PRESTAMO {fecha: date("2025-07-01"), estado: "Activo"}]->(lib3);
```

---

### Obtener todos los libros actualmente prestados (estado "Activo")
```cypher
MATCH (e:Estudiantes)-[p:PRESTAMO {estado: "Activo"}]->(l:Libro)
RETURN e.nombre as prestado_a, l.nombre as libro;
```

---

### Listar cuántos libros ha pedido prestado cada estudiante.
```cypher
MATCH (e:Estudiantes)-[p:PRESTAMO]->(l:Libro)
RETURN e.nombre as alumno, count(l) as total_libros_prestados;
```
---
### Mostrar las categorías con más préstamos activos.
```cypher
MATCH (e: Estudiantes)-[p: PRESTAMO {estado: "Activo"}]->(l: Libro)-[pe:PERTENECE_A]->(c:Categoria)
RETURN c.nombre as categoria, count(l) as prestamos_actuales
//ORDER BY prestamos_actuales DESC
//LIMIT 1 
// hay 3 con misma cantidad, si quieren ver una sola, descomentar las 2 lineas de arriba
;
```

---

### Encontrar los estudiantes que no tienen préstamos activos.
```cypher
MATCH (e: Estudiantes)
WHERE NOT (e: Estudiantes)-[:PRESTAMO {estado: "Activo"}]-(:Libro)
RETURN e.nombre;
```