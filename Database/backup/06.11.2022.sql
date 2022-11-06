--
-- PostgreSQL database cluster dump
--

-- Started on 2022-11-06 12:28:05

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE joe_backend;
ALTER ROLE joe_backend WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:+lBLJBB2gpUg/KCYlKKw9g==$XdUc/+x4jau6WOyPQg0fiVv0sLt4qUHLmH3ETmKBeao=:FD/3XoYYoM7OxkRJ6bA91hLwualDQL53nC3JXGu17xM=';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:/mxpS+d8sYzHDj1davXETQ==$Je6vbRLqhjXM73WVV6RmsHh5z+pB6vAvhps16X+4ioA=:z0eqTMSUIlk7TXt2TrxF36jO9uCpzJYKOBO/Vk1kxLA=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-06 12:28:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2022-11-06 12:28:09

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-06 12:28:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 218 (class 1259 OID 24630)
-- Name: collect_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collect_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collect_id OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 24576)
-- Name: collections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collections (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.collections OWNER TO postgres;

--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 215
-- Name: COLUMN collections.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.collections.name IS 'Name of collection';


--
-- TOC entry 216 (class 1259 OID 24581)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    title character varying NOT NULL,
    keywords character varying NOT NULL,
    id_collection integer,
    height integer,
    width integer,
    date_publish date,
    download integer,
    file_name character varying
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN images.download; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.images.download IS 'Downloads q-ty';


--
-- TOC entry 217 (class 1259 OID 24629)
-- Name: images_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32787)
-- Name: user_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32768)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nickname character(1) NOT NULL,
    email character(1) NOT NULL,
    date_register date NOT NULL,
    last_entry date NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3335 (class 0 OID 24576)
-- Dependencies: 215
-- Data for Name: collections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collections (id, name) FROM stdin;
1	Backgrounds
2	Trees
3	Animals
4	Lines
5	Flowers
\.


--
-- TOC entry 3336 (class 0 OID 24581)
-- Dependencies: 216
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, title, keywords, id_collection, height, width, date_publish, download, file_name) FROM stdin;
1	Brown, white and black pastel circular drawing, seamless pattern. Tile background	['background', 'circular', 'abstract', 'tile', 'design', 'seamless', 'side', 'white', 'color', 'black', 'pattern', 'yellow', 'colorful', 'texture', 'line', 'modern', 'art', 'wallpaper', 'bright', 'illustration', 'backdrop', 'brown', 'decoration', 'graphic', 'purple', 'light', 'stripe', 'rainbow', 'lines', 'paint', 'geometric', 'decorative', 'element', 'colored', 'pastel', 'retro', 'creative', 'striped', 'template', 'banner', 'shape', 'vibrant', 'style', 'beautiful', 'fashion', 'fabric', 'paper', 'trendy', 'simple']	1	2629	2623	2022-11-01	0	13
2	Multicolored brush strokes. Violet, pink and brown colors. Seamless pattern	['poster', 'stroke', 'paint', 'splash', 'oil', 'damaged', 'element', 'gouache', 'drawn', 'yellow', 'purple neon', 'spotted', 'ornament', 'distressed', 'artistic', 'acrylic', 'drawing', 'decoration', 'multicolor', 'surface', 'color', 'purple', 'seamless', 'seamless background', 'seamless texture', 'seamless pattern', 'brush stroke pattern', 'spray paint', 'background', 'pattern', 'texture', 'watercolor', 'print', 'abstract', 'art', 'design', 'colorful', 'brush', 'bright', 'dye', 'illustration', 'tie', 'neon', 'space', 'ink', 'wallpaper', 'vivid', 'textile', 'style', 'hippie']	2	3000	3000	2022-11-01	0	11.jpg
3	Green, beige, grey and white colored abstract blured brush strokes. Seamless pattern	['abstract', 'abstract background', 'acrylic', 'art', 'artistic', 'background', 'blurred', 'blurred background', 'bright', 'brush', 'brush strokes', 'clean', 'damaged', 'decoration', 'decorative', 'design', 'distressed', 'drawing', 'flow', 'fluid', 'gouache', 'graphic', 'grunge', 'grungy', 'illustration', 'image', 'messy', 'modern', 'nature', 'oil', 'paint', 'paper', 'pattern', 'poster', 'print', 'reflection', 'river', 'seamless background', 'seamless pattern', 'season', 'splash', 'sponge', 'stain', 'stroke', 'structure', 'texture', 'textured', 'wallpaper', 'watercolor', 'white']	2	3000	3000	2022-11-01	0	2.jpg
4	Abstract red brush strokes, heart shapes. White background	['abstract', 'art', 'artistic', 'backdrop', 'background', 'brushstroke', 'colorful', 'concept', 'decor', 'decoration', 'decorative', 'design', 'drawing', 'drawn', 'element', 'fabric', 'fashion', 'february', 'geometric', 'gradient', 'graffiti', 'graphic', 'hand drawn', 'heart', 'heart pattern', 'hearts background', 'illustration', 'love', 'love background', 'ornament', 'ornate', 'painting', 'pattern', 'print', 'red', 'repeat', 'repetition', 'romantic', 'seamless', 'seamless pattern', 'shape', 'sketch', 'style', 'symbol', 'template', 'textile', 'texture', 'valentine', 'wallpaper', 'white']	3	3000	3000	2022-11-01	0	8.jpg
5	Horizontal lines with abstract brush strokes, different colors, isolated. Seamless texture	['paintbrush', 'brushstroke', 'wave', 'creative', 'symmetry', 'craft', 'palette', 'stripe', 'drawn', 'element', 'brush', 'watercolor', 'ink brush stroke', 'curve', 'mosaic', 'shapes', 'ornate', 'paint', 'fractal', 'isolated on white', 'horizontal lines', 'brush strokes', 'seamless background', 'seamless pattern', 'seamless texture', 'pattern', 'design', 'texture', 'background', 'art', 'seamless', 'graphic', 'abstract', 'vector', 'ornament', 'illustration', 'color', 'decoration', 'textile', 'print', 'geometric', 'decorative', 'decor', 'wallpaper', 'blue', 'simple', 'fabric', 'style', 'line', 'hand'] 	4	3000	3000	2022-11-01	0	6.jpg
\.


--
-- TOC entry 3339 (class 0 OID 32768)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, nickname, email, date_register, last_entry) FROM stdin;
\.


--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 218
-- Name: collect_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collect_id', 1, false);


--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 217
-- Name: images_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id', 5, true);


--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 220
-- Name: user_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id', 1, false);


--
-- TOC entry 3185 (class 2606 OID 24580)
-- Name: collections collections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collections
    ADD CONSTRAINT collections_pkey PRIMARY KEY (id);


--
-- TOC entry 3187 (class 2606 OID 24595)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 24628)
-- Name: images images_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_un UNIQUE (file_name, id);


--
-- TOC entry 3191 (class 2606 OID 32774)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3192 (class 2606 OID 24622)
-- Name: images im_col; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT im_col FOREIGN KEY (id_collection) REFERENCES public.collections(id);


--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE collections; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.collections TO joe_backend;


--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE images; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.images TO joe_backend;


--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO joe_backend;


-- Completed on 2022-11-06 12:28:09

--
-- PostgreSQL database dump complete
--

-- Completed on 2022-11-06 12:28:09

--
-- PostgreSQL database cluster dump complete
--

