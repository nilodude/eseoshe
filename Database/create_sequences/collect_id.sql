-- public.collect_id definition

-- DROP SEQUENCE public.collect_id;

CREATE SEQUENCE public.collect_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;