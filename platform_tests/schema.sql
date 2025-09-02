--
-- PostgreSQL database dump
--


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.account (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    type text,
    provider text,
    "providerAccountId" text,
    refresh_token text,
    access_token text,
    expires_at timestamp without time zone,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public.account OWNER TO pg;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.cart (
    user_id uuid NOT NULL,
    product_id integer NOT NULL,
    color_id integer NOT NULL,
    size_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.cart OWNER TO pg;

--
-- Name: category; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO pg;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: color; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.color (
    id integer NOT NULL,
    hex_value text NOT NULL,
    human_readable_value text NOT NULL
);


ALTER TABLE public.color OWNER TO pg;

--
-- Name: color_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

ALTER TABLE public.color ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.color_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    details text,
    price integer NOT NULL,
    discount integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    photo_url text NOT NULL,
    category_id integer NOT NULL,
    style_id integer,
    fts tsvector GENERATED ALWAYS AS (((setweight(to_tsvector('simple'::regconfig, COALESCE(name, ''::text)), 'A'::"char") || setweight(to_tsvector('english'::regconfig, COALESCE(description, ''::text)), 'B'::"char")) || setweight(to_tsvector('english'::regconfig, COALESCE(details, ''::text)), 'C'::"char"))) STORED
);


ALTER TABLE public.product OWNER TO pg;

--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product_photo; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.product_photo (
    id integer NOT NULL,
    product_id integer NOT NULL,
    url text NOT NULL
);


ALTER TABLE public.product_photo OWNER TO pg;

--
-- Name: item_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

ALTER TABLE public.product_photo ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.item_photo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    paid_at timestamp without time zone
);


ALTER TABLE public."order" OWNER TO pg;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO pg;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: order_product; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.order_product (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    color_id integer NOT NULL,
    size_id integer NOT NULL,
    price integer NOT NULL,
    discount integer,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.order_product OWNER TO pg;

--
-- Name: passkey; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.passkey (
    cred_id text NOT NULL,
    cred_public_key text,
    internal_user_id uuid NOT NULL,
    webauthn_user_id text,
    counter integer,
    backup_eligible boolean,
    backup_status boolean,
    transports text[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_used timestamp without time zone
);


ALTER TABLE public.passkey OWNER TO pg;

--
-- Name: COLUMN passkey.cred_id; Type: COMMENT; Schema: public; Owner: pg
--

COMMENT ON COLUMN public.passkey.cred_id IS 'base64';


--
-- Name: COLUMN passkey.webauthn_user_id; Type: COMMENT; Schema: public; Owner: pg
--

COMMENT ON COLUMN public.passkey.webauthn_user_id IS 'base64';


--
-- Name: product_color; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.product_color (
    product_id integer NOT NULL,
    color_id integer NOT NULL
);


ALTER TABLE public.product_color OWNER TO pg;

--
-- Name: product_size; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.product_size (
    product_id integer NOT NULL,
    size_id integer NOT NULL
);


ALTER TABLE public.product_size OWNER TO pg;

--
-- Name: review; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.review (
    id integer NOT NULL,
    author_id uuid NOT NULL,
    product_id integer NOT NULL,
    rating integer NOT NULL,
    review text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.review OWNER TO pg;

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

ALTER TABLE public.review ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: size; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.size (
    id integer NOT NULL,
    size text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.size OWNER TO pg;

--
-- Name: size_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

ALTER TABLE public.size ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.size_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: style; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.style (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.style OWNER TO pg;

--
-- Name: style_id_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

ALTER TABLE public.style ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.style_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."user" OWNER TO pg;

--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: account account_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pk PRIMARY KEY (id);


--
-- Name: account account_pk_2; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pk_2 UNIQUE (provider, "providerAccountId");


--
-- Name: cart cart_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pk PRIMARY KEY (user_id, product_id, size_id, color_id, quantity);


--
-- Name: category category_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- Name: color color_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.color
    ADD CONSTRAINT color_pk PRIMARY KEY (id);


--
-- Name: product_color item_color_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_color
    ADD CONSTRAINT item_color_pk PRIMARY KEY (product_id, color_id);


--
-- Name: product_photo item_photo_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_photo
    ADD CONSTRAINT item_photo_pk PRIMARY KEY (id);


--
-- Name: product item_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT item_pk PRIMARY KEY (id);


--
-- Name: product_size item_size_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_size
    ADD CONSTRAINT item_size_pk PRIMARY KEY (product_id, size_id);


--
-- Name: order order_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pk PRIMARY KEY (id);


--
-- Name: order_product order_product_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_pk PRIMARY KEY (order_id, product_id);


--
-- Name: passkey passkey_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.passkey
    ADD CONSTRAINT passkey_pk PRIMARY KEY (cred_id);


--
-- Name: review review_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pk PRIMARY KEY (id);


--
-- Name: size size_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.size
    ADD CONSTRAINT size_pk PRIMARY KEY (id);


--
-- Name: style style_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.style
    ADD CONSTRAINT style_pk PRIMARY KEY (id);


--
-- Name: user users_pk; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: passkey_cred_id_index; Type: INDEX; Schema: public; Owner: pg
--

CREATE INDEX passkey_cred_id_index ON public.passkey USING btree (cred_id);


--
-- Name: passkey_internal_user_id_cred_id_index; Type: INDEX; Schema: public; Owner: pg
--

CREATE INDEX passkey_internal_user_id_cred_id_index ON public.passkey USING btree (internal_user_id, cred_id);


--
-- Name: passkey_webauthn_user_id_cred_id_index; Type: INDEX; Schema: public; Owner: pg
--

CREATE INDEX passkey_webauthn_user_id_cred_id_index ON public.passkey USING btree (webauthn_user_id, cred_id);


--
-- Name: passkey_webauthn_user_id_webauthn_user_id_uindex; Type: INDEX; Schema: public; Owner: pg
--

CREATE UNIQUE INDEX passkey_webauthn_user_id_webauthn_user_id_uindex ON public.passkey USING btree (webauthn_user_id, webauthn_user_id);


--
-- Name: product_fts_gin; Type: INDEX; Schema: public; Owner: pg
--

CREATE INDEX product_fts_gin ON public.product USING gin (fts);


--
-- Name: product_title_trgm_gin; Type: INDEX; Schema: public; Owner: pg
--

CREATE INDEX product_title_trgm_gin ON public.product USING gin (name public.gin_trgm_ops);


--
-- Name: users_username_index; Type: INDEX; Schema: public; Owner: pg
--

CREATE INDEX users_username_index ON public."user" USING btree (username);


--
-- Name: account account_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_fk FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: cart cart_color_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_color_id_fk FOREIGN KEY (color_id) REFERENCES public.color(id);


--
-- Name: cart cart_product_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: cart cart_size_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_size_id_fk FOREIGN KEY (size_id) REFERENCES public.size(id);


--
-- Name: cart cart_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: product item_category_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT item_category_id_fk FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: product_color item_color_color_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_color
    ADD CONSTRAINT item_color_color_id_fk FOREIGN KEY (color_id) REFERENCES public.color(id);


--
-- Name: product_color item_color_item_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_color
    ADD CONSTRAINT item_color_item_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_photo item_photo_item_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_photo
    ADD CONSTRAINT item_photo_item_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_size item_size_item_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_size
    ADD CONSTRAINT item_size_item_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_size item_size_size_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product_size
    ADD CONSTRAINT item_size_size_id_fk FOREIGN KEY (size_id) REFERENCES public.size(id);


--
-- Name: product item_style_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT item_style_id_fk FOREIGN KEY (style_id) REFERENCES public.style(id);


--
-- Name: order_product order_product_color_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_color_id_fk FOREIGN KEY (color_id) REFERENCES public.color(id);


--
-- Name: order_product order_product_order_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_order_id_fk FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: order_product order_product_product_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: order_product order_product_size_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_size_id_fk FOREIGN KEY (size_id) REFERENCES public.size(id);


--
-- Name: order order_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: passkey passkey_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.passkey
    ADD CONSTRAINT passkey_user_id_fk FOREIGN KEY (internal_user_id) REFERENCES public."user"(id);


--
-- Name: review review_product_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_product_id_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: review review_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_user_id_fk FOREIGN KEY (author_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
