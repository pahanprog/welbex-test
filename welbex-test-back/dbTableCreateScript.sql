CREATE TABLE IF NOT EXISTS "table"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    date timestamp with time zone NOT NULL DEFAULT now(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    amount character varying COLLATE pg_catalog."default" NOT NULL,
    distance character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT table_pkey PRIMARY KEY (id)
)