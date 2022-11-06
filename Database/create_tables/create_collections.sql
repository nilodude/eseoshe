-- public.collections definition

-- Drop table

-- DROP TABLE public.collections;

CREATE TABLE public.collections (
	id int4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT collections_pkey PRIMARY KEY (id)
);