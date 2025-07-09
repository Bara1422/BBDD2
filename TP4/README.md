## Grupo 11
1. Ismael Cordoba
2. Mariana Baradad
3. Jesica Pellegrini
4. Francisco Ríos
5. Juan Baranovsky

---

# Biblioteca Universitaria Extendida

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

### Creación de relación CURSA entre estudiantes y carreras
```cypher
MATCH (est1: Estudiantes {nombre: "Carlos"}) 
WITH est1 
MATCH (carr1: Carrera {nombre: "Ingeniería Química"}) 
CREATE (est1)-[:CURSA]->(carr1);

MATCH (est2: Estudiantes {nombre: "Soledad"}) 
WITH est2 
MATCH (carr2: Carrera {nombre: "Abogacía"}) 
CREATE (est2)-[:CURSA]->(carr2);

MATCH (est3: Estudiantes {nombre: "Cristian"}) 
WITH est3 
MATCH (carr3: Carrera {nombre: "Arquitectura"}) 
CREATE (est3)-[:CURSA]->(carr3);
```

---


### Creación de relación PERTENECE_A entre libros y categorias
```cypher
MATCH (lib1: Libro {nombre: "Arquitectura gótica"}) 
WITH lib1 
MATCH (cat3: Categoria {nombre: "Diseño"}) 
CREATE (lib1)-[:PERTENECE_A]->(cat3);

MATCH (lib2: Libro {nombre: "Derecho laboral"}) 
WITH lib2 
MATCH (cat2: Categoria {nombre: "Derecho"}) 
CREATE (lib2)-[:PERTENECE_A]->(cat2);

MATCH (lib3: Libro {nombre: "Álgebra avanzada"}) 
WITH lib3 
MATCH (cat4: Categoria {nombre: "Matemáticas"}) 
CREATE (lib3)-[:PERTENECE_A]->(cat4);

MATCH (lib4: Libro {nombre: "Manual de Fórmulas Técnicas"}) 
WITH lib4 
MATCH (cat1: Categoria {nombre: "Ingeniería"}) 
CREATE (lib4)-[:PERTENECE_A]->(cat1);
```

---

### Creación de  la relación PRESTAMO entre estudiantes y libros
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

# Sistema de Gestión de Proyectos


### Creación de departamentos
```cypher
CREATE (dep1:Departamento {nombre: "Desarrollo"});
CREATE (dep2:Departamento {nombre: "Recursos Humanos"});
CREATE (dep3:Departamento {nombre: "Finanzas"});
```

### Creación de empleados
```cypher
CREATE (emp1:Empleado {nombre: "Ana"});
CREATE (emp2:Empleado {nombre: "Bruno"});
CREATE (emp3:Empleado {nombre: "Carla"});
CREATE (emp4:Empleado {nombre: "Diego"});
```

### Creación de proyectos
```cypher
CREATE (proy1:Proyecto {nombre: "Sistema Contable"});
CREATE (proy2:Proyecto {nombre: "Bolsa de trabajo"});
```

### Creación de relación PERTENECE_A entre empleados y departamentos
```cypher
MATCH (emp1:Empleado {nombre: "Ana"}) 
WITH emp1 
MATCH (dep1:Departamento {nombre: "Desarrollo"})
CREATE (emp1)-[:PERTENECE_A]->(dep1);

MATCH (emp2:Empleado {nombre: "Bruno"}) 
WITH emp2 
MATCH (dep2:Departamento {nombre: "Recursos Humanos"})
CREATE (emp2)-[:PERTENECE_A]->(dep2);

MATCH (emp3:Empleado {nombre: "Carla"}) 
WITH emp3 
MATCH (dep3:Departamento {nombre: "Finanzas"})
CREATE (emp3)-[:PERTENECE_A]->(dep3);

MATCH (emp4:Empleado {nombre: "Diego"})
WITH emp4 
MATCH (dep1:Departamento {nombre: "Desarrollo"})
CREATE (emp4)-[:PERTENECE_A]->(dep1);
```

### Creación de relacion LIDERA entre empleados y proyectos
```cypher
MATCH (emp1:Empleado {nombre: "Ana"}) 
WITH emp1 
MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp1)-[:LIDERA]->(proy1);

MATCH (emp2:Empleado {nombre: "Bruno"}) 
WITH emp2 
MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp2)-[:LIDERA]->(proy2);

MATCH (emp4:Empleado {nombre: "Diego"}) 
WITH emp4 
MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp4)-[:LIDERA]->(proy1);
```


### Creación de relacion TRABAJA_EN entre empleados y proyectos
```cypher
MATCH (emp1:Empleado {nombre: "Ana"}) 
WITH emp1 
MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp1)-[:TRABAJA_EN {horas: 20}]->(proy1);

MATCH (emp4:Empleado {nombre: "Diego"}) 
WITH emp4 
MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp4)-[:TRABAJA_EN {horas: 10}]->(proy1);

MATCH (emp2:Empleado {nombre: "Bruno"}) 
WITH emp2 
MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp2)-[:TRABAJA_EN {horas: 15}]->(proy2);

MATCH (emp3:Empleado {nombre: "Carla"}) 
WITH emp3 
MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp3)-[:TRABAJA_EN {horas: 25}]->(proy2);

MATCH (emp1:Empleado {nombre: "Ana"}) 
WITH emp1 
MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp1)-[:TRABAJA_EN {horas: 5}]->(proy2);
```

### Obtener el nombre del proyecto, su líder y los empleados asignados.
```cypher
MATCH (lider:Empleado)-[:LIDERA]->(p:Proyecto)
OPTIONAL MATCH (e:Empleado)-[:TRABAJA_EN]->(p:Proyecto)
RETURN p.nombre AS proyecto, collect(DISTINCT lider.nombre) AS lider_lideres, collect(DISTINCT e.nombre) AS empleados_asignados;
```

### Calcular el total de horas semanales por proyecto.
```cypher
MATCH (e:Empleado)-[trab:TRABAJA_EN]->(p:Proyecto)
RETURN p.nombre AS proyecto, sum(trab.horas) AS total_horas_semanales;
```

### Listar los empleados que trabajan en más de un proyecto.
```cypher
MATCH (e:Empleado)-[:TRABAJA_EN]->(p:Proyecto)
WITH e, count(DISTINCT p) AS cantidad_proyectos
WHERE cantidad_proyectos > 1
RETURN e.nombre AS empleado, cantidad_proyectos;
```