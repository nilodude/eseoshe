-- public.images definition

-- Drop table

-- DROP TABLE public.images;

CREATE TABLE public.images (
	id int4 NOT NULL,
	title varchar NOT NULL,
	keywords varchar NOT NULL,
	id_collection int4 NULL,
	height int4 NULL,
	width int4 NULL,
	date_publish date NULL,
	download int4 NULL,
	file_name varchar NULL,
	CONSTRAINT images_pkey PRIMARY KEY (id),
	CONSTRAINT images_un UNIQUE (file_name, id)
);


-- public.images foreign keys

ALTER TABLE public.images ADD CONSTRAINT im_col FOREIGN KEY (id_collection) REFERENCES public.collections(id);