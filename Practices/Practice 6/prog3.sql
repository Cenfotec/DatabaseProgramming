CREATE OR REPLACE PROCEDURE CALCULATE_PHI_FIND_NUM (num NUMBER) IS
    phi number := 1.61;
BEGIN
    SELECT CALCULATE_PHI_1 INTO phi FROM dual;
    FOR i IN 1..LENGTH(phi)
        LOOP
            IF SUBSTR(phi, i, 2) = num THEN
                DBMS_OUTPUT.PUT_LINE('Position: ' || i);
                EXIT;
            end if;
        end loop;
end;

BEGIN
    CALCULATE_PHI_FIND_NUM(33);
end;