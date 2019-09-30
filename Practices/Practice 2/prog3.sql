DECLARE
	a number(3);
	e number(3);
	i number(3);
	o number(3);
	u number(3);
BEGIN
	SELECT COUNT(*) INTO a FROM empleados WHERE REGEXP_LIKE(nombre, '([Aa])');
	SELECT COUNT(*) INTO e FROM empleados WHERE REGEXP_LIKE(nombre, '([Ee])');
	SELECT COUNT(*) INTO i FROM empleados WHERE REGEXP_LIKE(nombre, '([Ii])');
	SELECT COUNT(*) INTO o FROM empleados WHERE REGEXP_LIKE(nombre, '([Oo])');
	SELECT COUNT(*) INTO u FROM empleados WHERE REGEXP_LIKE(nombre, '([Uu])');


	DBMS_OUTPUT.PUT_LINE
	(
	'A: ' || a ||
	' E: ' || e ||
	' I: ' || i ||
	' O: ' || o ||
	' U: ' || u
	);
END;
/
