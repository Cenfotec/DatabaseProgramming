DECLARE
	name empleados.nombre%TYPE;
	

BEGIN
	SELECT nombre INTO name FROM (SELECT nombre, rownum FROM (SELECT nombre FROM empleados ORDER BY nombre ASC) WHERE rownum < 11 ORDER BY rownum DESC) WHERE rownum = 1;
	DBMS_OUTPUT.PUT_LINE(name);
END;
/
