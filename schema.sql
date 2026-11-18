--
-- PostgreSQL database dump
--

\restrict bQkHGoQ1tLwejYZzWlOb100nZHV4ZAVfNeOACfA0DsMZ5TDTxqt5bqVakf5KyAi

-- Dumped from database version 16.14 (Debian 16.14-1.pgdg13+1)
-- Dumped by pg_dump version 16.14 (Debian 16.14-1.pgdg13+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alunos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alunos (
    id integer NOT NULL,
    nome character varying(150) NOT NULL,
    email character varying(150) NOT NULL
);


--
-- Name: alunos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.alunos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: alunos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.alunos_id_seq OWNED BY public.alunos.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    conteudo text NOT NULL,
    autor character varying(100) NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: professores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.professores (
    id integer NOT NULL,
    nome character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    senha text NOT NULL
);


--
-- Name: professores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.professores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: professores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.professores_id_seq OWNED BY public.professores.id;


--
-- Name: alunos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alunos ALTER COLUMN id SET DEFAULT nextval('public.alunos_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: professores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.professores ALTER COLUMN id SET DEFAULT nextval('public.professores_id_seq'::regclass);


--
-- Name: alunos alunos_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_email_key UNIQUE (email);


--
-- Name: alunos alunos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: professores professores_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.professores
    ADD CONSTRAINT professores_email_key UNIQUE (email);


--
-- Name: professores professores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.professores
    ADD CONSTRAINT professores_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict bQkHGoQ1tLwejYZzWlOb100nZHV4ZAVfNeOACfA0DsMZ5TDTxqt5bqVakf5KyAi

