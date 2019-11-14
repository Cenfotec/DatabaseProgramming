CREATE OR REPLACE FUNCTION Numletras (t IN nvarchar2, c IN char) RETURN number IS
    res number(10) := 0;
    BEGIN
        FOR i IN 1..LENGTH(t)
        LOOP
            IF SUBSTR(t, i , 1) = c THEN
                res := res + 1;
            end if;
         end loop;

        RETURN res;
    END;

BEGIN
    SYS.DBMS_OUTPUT.PUT_LINE(NUMLETRAS('test', 't'));
end;