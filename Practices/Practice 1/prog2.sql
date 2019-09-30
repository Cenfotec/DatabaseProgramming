DECLARE
	num_one number := &n;
	num_two number := &n;
	exponential number;
BEGIN
	exponential := num_one**num_two;
	dbms_output.put_line('Result: ' || exponential);
END;
/
