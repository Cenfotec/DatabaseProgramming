DECLARE
	num_one number := &n;
	num_two number := &n;
	difference number;
BEGIN
	difference := (num_one**num_two - num_two**num_one);
	dbms_output.put_line('Result: ' || difference);

	/*
	DECLARE
		res_one number;
		res_two number;
		finalSum number;
	BEGIN
		res_one := num_one**2;
		res_two := num_two**2;
		finalSum := res_one + res_two;
		dbms_outiut.put_line('Result: ' || finalSum);
	END;
 	*/
END;
/

