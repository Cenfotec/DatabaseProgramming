CREATE OR REPLACE FUNCTION CALCULATE_PHI_2 (iterations NUMBER) RETURN NUMBER IS
    phi number := 1.61;
BEGIN
    FOR i IN 1..iterations
        LOOP
            phi := 1+(1/phi);
        end loop;
    RETURN phi;
end;

SELECT CALCULATE_PHI_2(50) FROM dual;