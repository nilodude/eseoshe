-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id int4 NOT NULL,
	nickname bpchar(1) NOT NULL,
	email bpchar(1) NOT NULL,
	date_register date NOT NULL,
	last_entry date NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);