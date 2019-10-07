DECLARE
	nombreEmpleado empleados.nombre%TYPE;
    departamentoEmpleado departamentos.NOMBRE%TYPE;
    salarioEmpleado empleados.SALARIO%TYPE;
    codigoPuestoEmpleado empleados.IDpuesto%TYPE;

BEGIN
	SELECT nombre, departamento, salario, puesto
	INTO nombreEmpleado, departamentoEmpleado, salarioEmpleado, codigoPuestoEmpleado
	FROM (SELECT nombre, salario, departamento, puesto, rownum FROM (SELECT e.nombre, e.salario, d.nombre AS departamento, e.IDPUESTO as puesto FROM empleados e INNER JOIN departamentos d on e.iddep = d.iddep ORDER BY e.nombre ASC) WHERE rownum < 11 ORDER BY rownum DESC) WHERE rownum = 1;
	DBMS_OUTPUT.PUT_LINE(
	    'Nombre: ' || nombreEmpleado ||
	    ' Departamento: ' || departamentoEmpleado ||
	    ' Salario: ' || salarioEmpleado ||
	    ' Puesto: ' || codigoPuestoEmpleado
	    );
END;
/
