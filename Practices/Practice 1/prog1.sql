DECLARE
	str varchar2(2) := &input;
	num number(2);
	day number(2);
	dayName varchar(20);
	nextWeek date;
BEGIN
	SELECT TO_CHAR(sysdate, 'DD') INTO day FROM dual;
	num := TO_NUMBER(str);
	nextWeek := sysdate + (num+7);

	SELECT TO_CHAR(sysdate + num, 'day') INTO dayName FROM dual;

	dbms_output.put_line('Day name: ' || dayName);
	dbms_output.put_line('Next week: ' || nextWeek);
END;
/
