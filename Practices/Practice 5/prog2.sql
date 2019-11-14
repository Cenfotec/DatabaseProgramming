CREATE OR REPLACE FUNCTION Traba (t IN nvarchar2, c IN char) RETURN nvarchar2 IS
    res nvarchar2(10) := '';
    BEGIN
        FOR i IN 1..LENGTH(t)
        LOOP
            IF SUBSTR(t, i , 1) IN ('a', 'e', 'i', 'o', 'u') THEN
                CONCAT(res, c);
            ELSE
                CONCAT(res, SUBSTR(t, i , 1));
            end if;
         end loop;

        RETURN res;
    END;

BEGIN
    SYS.DBMS_OUTPUT.PUT_LINE(TRABA('test', 't'));
end;