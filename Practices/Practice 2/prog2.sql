DECLARE
	numEmpleado empleados.IDemp%TYPE := &idEmpleado;
	nombreEmpleado empleados.nombre%TYPE;
	apellidoEmpleado empleados.apellido%TYPE;
	departamentoEmpleado departamentos.nombre%TYPE;
	salarioEmpleado empleados.salario%TYPE;
	numPuesto puestos.IDpuesto%TYPE;
	
BEGIN
	SELECT e.nombre, e.apellido, d.nombre, e.salario, e.IDpuesto
	INTO nombreEmpleado, apellidoEmpleado, departamentoEmpleado, salarioEmpleado, numPuesto
	FROM empleados e
	INNER JOIN departamentos d ON e.IDdep = d.IDdep
	WHERE e.IDemp = numEmpleado;
	
	DBMS_OUTPUT.PUT_LINE
	(
		'Nombre: ' || nombreEmpleado ||
		' Apellido: ' || apellidoEmpleado ||
		' Departamento: ' || departamentoEmpleado ||
		' Salario: ' || salarioEmpleado ||
		' Puesto: ' || numPuesto
	);
END;
/
