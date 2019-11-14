CREATE OR REPLACE PROCEDURE CALCULATE_PHI_COMPARE (iterations NUMBER) IS
    phi_one number;
    phi_two number;
BEGIN
    SELECT CALCULATE_PHI_1 INTO phi_one FROM dual;
    SELECT CALCULATE_PHI_2(iterations) INTO phi_two FROM dual;
    FOR i IN 1..LENGTH(phi_one)
        LOOP
            IF SUBSTR(phi_one, i, 1) != SUBSTR(phi_two, i, 1) THEN
                DBMS_OUTPUT.PUT_LINE('Different at position: ' || i);
                DBMS_OUTPUT.PUT_LINE('Phi #1: ' || phi_one);
                DBMS_OUTPUT.PUT_LINE('Phi #2: ' || phi_two);
                EXIT;
            end if;
        end loop;
end;

BEGIN
    CALCULATE_PHI_COMPARE(50);
end;