CREATE OR REPLACE FUNCTION CALCULATE_PHI_1 RETURN NUMBER IS
    phi number;
BEGIN
    phi := ((1 + sqrt(5)) / 2);

    return phi;
end;

SELECT CALCULATE_PHI_1 FROM dual;