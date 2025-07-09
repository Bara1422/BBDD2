// Creacion de departamentos
CREATE (dep1:Departamento {nombre: "Desarrollo"});
CREATE (dep2:Departamento {nombre: "Recursos Humanos"});
CREATE (dep3:Departamento {nombre: "Finanzas"});

// Creacion de empleados
CREATE (emp1:Empleado {nombre: "Ana"});
CREATE (emp2:Empleado {nombre: "Bruno"});
CREATE (emp3:Empleado {nombre: "Carla"});
CREATE (emp4:Empleado {nombre: "Diego"});

// Creacion de proyectos
CREATE (proy1:Proyecto {nombre: "Sistema Contable"});
CREATE (proy2:Proyecto {nombre: "Bolsa de trabajo"});

// Creacion de relacion PERTENECE_A entre empleados y departamentos
MATCH (emp1:Empleado {nombre: "Ana"}) WITH emp1 MATCH (dep1:Departamento {nombre: "Desarrollo"})
CREATE (emp1)-[:PERTENECE_A]->(dep1);

MATCH (emp2:Empleado {nombre: "Bruno"}) WITH emp2 MATCH (dep2:Departamento {nombre: "Recursos Humanos"})
CREATE (emp2)-[:PERTENECE_A]->(dep2);

MATCH (emp3:Empleado {nombre: "Carla"}) WITH emp3 MATCH (dep3:Departamento {nombre: "Finanzas"})
CREATE (emp3)-[:PERTENECE_A]->(dep3);

MATCH (emp4:Empleado {nombre: "Diego"})WITH emp4 MATCH (dep1:Departamento {nombre: "Desarrollo"})
CREATE (emp4)-[:PERTENECE_A]->(dep1);

// Creacion de relacion LIDERA entre empleados y proyectos
MATCH (emp1:Empleado {nombre: "Ana"}) WITH emp1 MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp1)-[:LIDERA]->(proy1);

MATCH (emp2:Empleado {nombre: "Bruno"}) WITH emp2 MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp2)-[:LIDERA]->(proy2);

MATCH (emp4:Empleado {nombre: "Diego"}) WITH emp4 MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp4)-[:LIDERA]->(proy1);

// Creacion de relacion TRABAJA_EN entre empleados y proyectos
MATCH (emp1:Empleado {nombre: "Ana"}) WITH emp1 MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp1)-[:TRABAJA_EN {horas: 20}]->(proy1);

MATCH (emp4:Empleado {nombre: "Diego"}) WITH emp4 MATCH (proy1:Proyecto {nombre: "Sistema Contable"})
CREATE (emp4)-[:TRABAJA_EN {horas: 10}]->(proy1);

MATCH (emp2:Empleado {nombre: "Bruno"}) WITH emp2 MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp2)-[:TRABAJA_EN {horas: 15}]->(proy2);

MATCH (emp3:Empleado {nombre: "Carla"}) WITH emp3 MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp3)-[:TRABAJA_EN {horas: 25}]->(proy2);

MATCH (emp1:Empleado {nombre: "Ana"}) WITH emp1 MATCH (proy2:Proyecto {nombre: "Bolsa de trabajo"})
CREATE (emp1)-[:TRABAJA_EN {horas: 5}]->(proy2);

// Obtener el nombre del proyecto, su líder y los empleados asignados.
MATCH (lider:Empleado)-[:LIDERA]->(p:Proyecto)
OPTIONAL MATCH (e:Empleado)-[:TRABAJA_EN]->(p:Proyecto)
RETURN p.nombre AS proyecto, collect(DISTINCT lider.nombre) AS lider_lideres, collect(DISTINCT e.nombre) AS empleados_asignados;

// Calcular el total de horas semanales por proyecto.
MATCH (e:Empleado)-[trab:TRABAJA_EN]->(p:Proyecto)
RETURN p.nombre AS proyecto, sum(trab.horas) AS total_horas_semanales;

// Listar los empleados que trabajan en más de un proyecto.
MATCH (e:Empleado)-[:TRABAJA_EN]->(p:Proyecto)
WITH e, count(DISTINCT p) AS cantidad_proyectos
WHERE cantidad_proyectos > 1
RETURN e.nombre AS empleado, cantidad_proyectos;
