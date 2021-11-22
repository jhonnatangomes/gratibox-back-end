--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

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
-- Name: adresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adresses (
    id integer NOT NULL,
    adress text NOT NULL,
    zipcode text NOT NULL,
    city_id integer NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.adresses OWNER TO postgres;

--
-- Name: adresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adresses_id_seq OWNER TO postgres;

--
-- Name: adresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adresses_id_seq OWNED BY public.adresses.id;


--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO postgres;

--
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- Name: complaints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complaints (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.complaints OWNER TO postgres;

--
-- Name: complaints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.complaints_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.complaints_id_seq OWNER TO postgres;

--
-- Name: complaints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.complaints_id_seq OWNED BY public.complaints.id;


--
-- Name: deliveries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deliveries (
    id integer NOT NULL,
    user_id integer NOT NULL,
    date date NOT NULL,
    review boolean,
    complaint_id integer,
    comments text
);


ALTER TABLE public.deliveries OWNER TO postgres;

--
-- Name: deliveries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deliveries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deliveries_id_seq OWNER TO postgres;

--
-- Name: deliveries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deliveries_id_seq OWNED BY public.deliveries.id;


--
-- Name: delivery_dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_dates (
    id integer NOT NULL,
    plan_id integer NOT NULL,
    date text NOT NULL
);


ALTER TABLE public.delivery_dates OWNER TO postgres;

--
-- Name: delivery_dates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.delivery_dates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.delivery_dates_id_seq OWNER TO postgres;

--
-- Name: delivery_dates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.delivery_dates_id_seq OWNED BY public.delivery_dates.id;


--
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    id integer NOT NULL,
    type text NOT NULL
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plans_id_seq OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plans_id_seq OWNED BY public.plans.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token uuid NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.states (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.states OWNER TO postgres;

--
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.states_id_seq OWNER TO postgres;

--
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_plans (
    id integer NOT NULL,
    user_id integer NOT NULL,
    plan_id integer NOT NULL,
    delivery_date_id integer NOT NULL,
    adress_id integer NOT NULL,
    subscription_date date NOT NULL
);


ALTER TABLE public.users_plans OWNER TO postgres;

--
-- Name: users_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_plans_id_seq OWNER TO postgres;

--
-- Name: users_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_plans_id_seq OWNED BY public.users_plans.id;


--
-- Name: users_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_products (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.users_products OWNER TO postgres;

--
-- Name: users_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_products_id_seq OWNER TO postgres;

--
-- Name: users_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_products_id_seq OWNED BY public.users_products.id;


--
-- Name: adresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adresses ALTER COLUMN id SET DEFAULT nextval('public.adresses_id_seq'::regclass);


--
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- Name: complaints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints ALTER COLUMN id SET DEFAULT nextval('public.complaints_id_seq'::regclass);


--
-- Name: deliveries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries ALTER COLUMN id SET DEFAULT nextval('public.deliveries_id_seq'::regclass);


--
-- Name: delivery_dates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_dates ALTER COLUMN id SET DEFAULT nextval('public.delivery_dates_id_seq'::regclass);


--
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN id SET DEFAULT nextval('public.plans_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: states id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_plans ALTER COLUMN id SET DEFAULT nextval('public.users_plans_id_seq'::regclass);


--
-- Name: users_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_products ALTER COLUMN id SET DEFAULT nextval('public.users_products_id_seq'::regclass);


--
-- Data for Name: adresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adresses (id, adress, zipcode, city_id, state_id) FROM stdin;
1	123	123	1	1
2	Haha	12345678	1	1
3	V`<&8ii=DN	}F/lGRV)`8	2	2
4	hmrpq4up7r	v9ng441jf0	3	3
5	123	1234	1	4
6	123	123	4	4
7	122	1212	5	4
8	123	123	6	4
9	123	123	6	1
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, name) FROM stdin;
1	Sao Luis
2	'kqp,;Qk^W('
3	dly75pizm6
4	sao luis
5	1212
6	123
\.


--
-- Data for Name: complaints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complaints (id, name) FROM stdin;
1	Entrega atrasada
2	Não gostei do que recebi
\.


--
-- Data for Name: deliveries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deliveries (id, user_id, date, review, complaint_id, comments) FROM stdin;
2	1	2021-11-01	\N	\N	\N
3	1	2021-11-08	\N	\N	\N
4	1	2021-11-15	f	1	Atrasou muito cara
\.


--
-- Data for Name: delivery_dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_dates (id, plan_id, date) FROM stdin;
1	2	Dia 01
2	2	Dia 10
3	2	Dia 20
4	1	Segunda
5	1	Quarta
6	1	Sexta
\.


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plans (id, type) FROM stdin;
1	Semanal
2	Mensal
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name) FROM stdin;
1	Chás
2	Incensos
3	Produtos orgânicos
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token) FROM stdin;
1	1	b9a90480-1539-47e6-b8eb-44fb8250fa72
2	1	cb90535a-3c9e-4eed-a456-3dafecc8cfd1
3	1	1637a521-656c-481d-9cc3-729a5c506856
4	1	6ae7aeea-2f64-49ec-bd37-0522d599dcf1
5	1	1ca4ae7f-b364-4e6e-8ef3-77ec0577febb
6	1	1ab909c6-f01f-4b67-b037-7f54c2b76e9d
7	1	1a99055f-3e3c-4b29-9023-fba2cedc2885
8	1	2c0e4cb3-fd11-4732-a6c9-edb145c05370
9	1	1452b328-6424-4736-8721-4646e135f215
10	1	3b650f8c-9c45-4919-ac19-4da59ea89032
11	1	f3c5d265-103a-48fe-ac0b-b27fafcc1409
12	1	12af2f0d-3bb9-4787-9114-325feaba478d
13	1	7dc512d5-678a-4ec9-9dfb-7ac30810377e
14	1	c2e1f585-1c7f-4e2b-a30d-b81c2b4c258b
15	1	92e544f6-ebdd-4e6d-a277-585b0a478c0d
16	1	dcb8b2de-f392-4d6b-ba59-3f16978cafdc
17	1	46985eb2-e3ab-4ae7-8146-9a937e7949dc
18	1	17f72732-f33e-43f5-b34c-08016e0a743c
19	1	9b9708ce-eec0-47e5-90ac-76e8e99b72c3
20	1	38b81f54-5b37-420d-ae14-da643ec28b61
21	2	db0f8637-56ab-4cb5-bb56-65239883c178
22	2	52660d55-4d73-4571-853c-3fcf7f48d0d8
23	2	4354cb15-b552-42dd-a6e2-40bddb6515fa
24	3	3b412844-0496-4307-9058-fb725c6fc9f8
25	1	544a02a0-7357-48ba-9f2c-64b2a8846b13
26	3	0365a4c7-deca-451d-9136-0205970387c6
27	2	27cbc756-252c-4417-afe2-ba6ffd8f5599
28	4	96158f94-9b24-40aa-8fca-fb61864dfc12
29	1	1be5ef3b-44ff-4784-b65e-1d523c829040
30	5	b0979b24-f1b8-4856-912f-77cce0265f4d
31	1	183b8a46-3c47-46a4-8ab0-9ae87e79c41b
32	1	3c0ad0ba-8645-4f63-abbe-35d0604dca02
33	6	16b38053-25ea-4390-8386-1d17ee191efe
34	1	59120b1d-9919-4397-b519-19428010cd3e
35	3	d82c6daf-fbda-404c-9a15-f32fcf171415
36	3	005141b3-ca67-4738-b4a0-532e11e7317a
37	7	4476a8f1-8752-4313-a72b-e35daf554dcb
38	9	be813ab2-1918-411b-bffd-1e4d7774d7cb
39	9	598e3c82-c4d4-4879-a3fc-ae880a2619d9
40	9	06576e79-d1c4-49ca-9d20-652a35c8451d
41	9	97c45904-cade-45de-82b7-fced0abe7883
42	9	d82e053c-ba66-4986-b229-938534b46b1e
43	9	f93cbbc8-508d-4bdd-b263-bfd704224caf
44	9	abe2e814-3080-4aab-812a-3c533ff9ad30
45	1	83e16322-ca75-4356-a2a5-f4795696b748
46	9	fd92f997-edd4-43f4-97a2-0d31d5b54c78
47	9	825cc02a-026c-4dea-b222-4c5d04d84473
48	9	7edfb4ed-29ce-4ec3-a732-97603774fbd1
49	9	23937512-7304-44e2-8fb4-338a1fde042c
50	9	f427290d-996f-4e5f-aaaa-ec3ae5659d55
51	10	d9836073-f253-4189-a9ce-ae7805f0be38
52	11	1bd88db2-9611-4dd3-ad13-aea7162b9345
53	10	f98ee7c2-4092-492c-b6da-2c30c29e9543
54	1	d034af3c-9cf6-421f-a980-c4dc797805c6
55	10	483f89b2-896d-4c95-978d-b46430c13cb7
56	1	9f2e2f01-c5a8-4607-af3e-3520b36e6a33
57	1	6ff8f2e6-deae-411d-82c4-cbafe9734420
58	10	1760cae3-5e9c-458d-a049-29c6e105566d
59	2	5d7f1712-daa4-4cf7-a0a4-268141bc21c3
60	1	be70edba-aebb-41f2-b015-16799468256c
61	3	fa9f7623-acbf-48dc-9fcf-de0952715443
62	1	015d9bc9-9d51-41fa-a4a7-4cf799f8ad52
63	1	36bf4473-8d97-46f6-a49d-12ca41afad8b
\.


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.states (id, name) FROM stdin;
1	MA
2	5`.zaBJ]Vo
3	lkk7fua2n4
4	SP
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	Jhonn	jhonn@teste.com	$2b$10$EPxLJF/0REvC/K2axUXmEuU/SLoV.mGGps3Y7YtIHUXagdNE7OKxm
2	Gomium	jhonn2@teste.com	$2b$10$FSdSaORYLzCllTKWl3FlWOcDexFZr/2T/1zPMsu1BkuKFeZjqC.DO
3	Ashyum	jhonn3@teste.com	$2b$10$zxiSDVh77xAVlnrThVsgY.1pdqfYI7btk2mPmBt1YDlOmZ1ccovuq
4	Coisinha	jhonn4@teste.com	$2b$10$Lmbgu5inSpLDqhbEEsIqDeCZ3mQg1AyhOVg9zVA7PNtopSb1Z3pee
5	hha	jhonn5@teste.com	$2b$10$cnsYyYK69.JUkLb2XQxp5OWxFiXJCPkl5K2wMuXoQmbQuH3DChtmO
6	jhjash	umdois@teste.com	$2b$10$gCZzGmmDEjU7nWBnudLD2uoxO58BVqzXBN49h2oqu1IZIfBVliT/m
7	Lourimar	loura@gomes.com	$2b$10$7FPGaSHHKFtTBkQ96r9er.6bTx.CluJTMLnhAEgY9h1lPbgVrYvSe
8	Gomium	jhonn10@teste.com	$2b$10$phUolJpgfAqAzoGZLneiU.irFTO3Vt8e/R/Bzox40r3UYU1k8jh9S
9	Gomium	jhonn11@teste.com	$2b$10$Q6j6neqSHZQMZiDKdreWuOdCnIY3P5QLfRJIdYu5eqbAo9LEe66vu
10	Atena	atena@teste.com	$2b$10$9Tml9GNAXdOvfZxb9xRk3OY6C9fHXSg7HhybObawERYz6jss660Du
11	mamama	mariana@mariana.com	$2b$10$Mk9ZXDlpGt4o.1kSey1G.epsaPLNj8XXDy2L3Nv4G4ujUWKx3xys2
\.


--
-- Data for Name: users_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_plans (id, user_id, plan_id, delivery_date_id, adress_id, subscription_date) FROM stdin;
8	2	1	5	7	2021-11-21
9	7	1	5	8	2021-11-21
10	9	1	4	8	2021-11-21
13	10	2	1	8	2021-11-21
15	1	1	4	8	2021-11-22
\.


--
-- Data for Name: users_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_products (id, user_id, product_id) FROM stdin;
15	2	2
16	2	1
17	2	3
18	7	2
19	9	1
23	10	1
24	10	3
25	10	2
29	1	3
\.


--
-- Name: adresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adresses_id_seq', 9, true);


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_id_seq', 6, true);


--
-- Name: complaints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.complaints_id_seq', 2, true);


--
-- Name: deliveries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deliveries_id_seq', 4, true);


--
-- Name: delivery_dates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delivery_dates_id_seq', 7, true);


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plans_id_seq', 3, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 6, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 63, true);


--
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.states_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: users_plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_plans_id_seq', 15, true);


--
-- Name: users_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_products_id_seq', 29, true);


--
-- Name: adresses adresses_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adresses
    ADD CONSTRAINT adresses_pk PRIMARY KEY (id);


--
-- Name: cities cities_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pk PRIMARY KEY (id);


--
-- Name: complaints complaints_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_pk PRIMARY KEY (id);


--
-- Name: deliveries deliveries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT deliveries_pk PRIMARY KEY (id);


--
-- Name: delivery_dates delivery_dates_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_dates
    ADD CONSTRAINT delivery_dates_pk PRIMARY KEY (id);


--
-- Name: plans plans_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pk PRIMARY KEY (id);


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: states states_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pk PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users_plans users_plans_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_plans
    ADD CONSTRAINT users_plans_pk PRIMARY KEY (id);


--
-- Name: users_products users_products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_products
    ADD CONSTRAINT users_products_pk PRIMARY KEY (id);


--
-- Name: adresses adresses_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adresses
    ADD CONSTRAINT adresses_fk0 FOREIGN KEY (city_id) REFERENCES public.cities(id);


--
-- Name: adresses adresses_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adresses
    ADD CONSTRAINT adresses_fk1 FOREIGN KEY (state_id) REFERENCES public.states(id);


--
-- Name: deliveries deliveries_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT deliveries_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: deliveries deliveries_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT deliveries_fk1 FOREIGN KEY (complaint_id) REFERENCES public.complaints(id);


--
-- Name: delivery_dates delivery_dates_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_dates
    ADD CONSTRAINT delivery_dates_fk0 FOREIGN KEY (plan_id) REFERENCES public.plans(id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users_plans users_plans_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_plans
    ADD CONSTRAINT users_plans_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users_plans users_plans_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_plans
    ADD CONSTRAINT users_plans_fk1 FOREIGN KEY (plan_id) REFERENCES public.plans(id);


--
-- Name: users_plans users_plans_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_plans
    ADD CONSTRAINT users_plans_fk2 FOREIGN KEY (delivery_date_id) REFERENCES public.delivery_dates(id);


--
-- Name: users_plans users_plans_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_plans
    ADD CONSTRAINT users_plans_fk3 FOREIGN KEY (adress_id) REFERENCES public.adresses(id);


--
-- Name: users_products users_products_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_products
    ADD CONSTRAINT users_products_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users_products users_products_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_products
    ADD CONSTRAINT users_products_fk1 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

