DECLARE
    numEmpleado EMPLEADOS_COPY.IDEMP%TYPE := &idEmpleado;
    tituloEmpleado puestos.TITULO%TYPE;
    finalCalc number;
    asterisks EMPLEADOS_COPY.RANK%TYPE;
BEGIN
    SELECT TITULO INTO tituloEmpleado FROM EMPLEADOS_COPY e INNER JOIN PUESTOS on puestos.IDPUESTO = e.IDPUESTO
    WHERE e.IDEMP = numEmpleado;

    SELECT
        SUM(
            REGEXP_COUNT(NOMBRE, '([AaEeIiOoUu])', 1, 'i') +
            REGEXP_COUNT(APELLIDO, '([AaEeIiOoUu])', 1, 'i') +
            REGEXP_COUNT(tituloEmpleado, '([AaEeIiOoUu])', 1, 'i')
            )
        INTO finalCalc
    FROM EMPLEADOS_COPY e WHERE e.IDEMP = numEmpleado;

    SELECT RPAD('*', finalCalc, '*') INTO asterisks FROM DUAL;
    UPDATE EMPLEADOS_COPY SET RANK = asterisks WHERE IDEMP = numEmpleado;
END;
