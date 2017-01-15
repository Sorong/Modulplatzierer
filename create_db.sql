--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA topology;


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


SET search_path = public, pg_catalog;

--
-- Name: asbinary(geometry); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION asbinary(geometry) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-2.1', 'LWGEOM_asBinary';


--
-- Name: asbinary(geometry, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION asbinary(geometry, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-2.1', 'LWGEOM_asBinary';


--
-- Name: astext(geometry); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION astext(geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-2.1', 'LWGEOM_asText';


--
-- Name: estimated_extent(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION estimated_extent(text, text) RETURNS box2d
    LANGUAGE c IMMUTABLE STRICT SECURITY DEFINER
    AS '$libdir/postgis-2.1', 'geometry_estimated_extent';


--
-- Name: estimated_extent(text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION estimated_extent(text, text, text) RETURNS box2d
    LANGUAGE c IMMUTABLE STRICT SECURITY DEFINER
    AS '$libdir/postgis-2.1', 'geometry_estimated_extent';


--
-- Name: geomfromtext(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION geomfromtext(text) RETURNS geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_GeomFromText($1)$_$;


--
-- Name: geomfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION geomfromtext(text, integer) RETURNS geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_GeomFromText($1, $2)$_$;


--
-- Name: ndims(geometry); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION ndims(geometry) RETURNS smallint
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-2.1', 'LWGEOM_ndims';


--
-- Name: setsrid(geometry, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION setsrid(geometry, integer) RETURNS geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-2.1', 'LWGEOM_set_srid';


--
-- Name: srid(geometry); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION srid(geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-2.1', 'LWGEOM_get_srid';


--
-- Name: st_asbinary(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION st_asbinary(text) RETURNS bytea
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsBinary($1::geometry);$_$;


--
-- Name: st_astext(bytea); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION st_astext(bytea) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsText($1::geometry);$_$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: berlin_fh_bielefeld_buildings; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE berlin_fh_bielefeld_buildings (
    gid integer,
    gmlid character varying(100),
    nr character varying(8),
    street character varying(254),
    number character varying(254),
    plz double precision,
    hid integer,
    ort character varying(50),
    the_geom geometry,
    zusatz character varying(255),
    denkmal boolean,
    denkmali text,
    monument_reason text,
    area2d double precision,
    area3d double precision,
    pv smallint,
    st smallint,
    gd smallint,
    doneby integer,
    calctime double precision,
    qhint integer,
    household_size integer,
    gd_area double precision,
    rueckhalt integer,
    rt_geom geometry,
    CONSTRAINT enforce_dims_rt_geom CHECK ((ndims(rt_geom) = 4)),
    CONSTRAINT enforce_dims_the_geom CHECK ((ndims(the_geom) = 4)),
    CONSTRAINT enforce_geotype_rt_geom CHECK (((geometrytype(rt_geom) = 'MULTIPOLYGON'::text) OR (rt_geom IS NULL))),
    CONSTRAINT enforce_geotype_the_geom CHECK (((geometrytype(the_geom) = 'MULTIPOLYGON'::text) OR (the_geom IS NULL))),
    CONSTRAINT enforce_srid_rt_geom CHECK ((srid(rt_geom) = 900913)),
    CONSTRAINT enforce_srid_the_geom CHECK ((srid(the_geom) = 25833))
);


--
-- Name: berlin_fh_bielefeld_display_aggregate; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE berlin_fh_bielefeld_display_aggregate (
    gid integer NOT NULL,
    building_id integer,
    globalc double precision,
    the_geom geometry,
    CONSTRAINT enforce_dims_the_geom CHECK ((st_ndims(the_geom) = 2)),
    CONSTRAINT enforce_srid_the_geom CHECK ((st_srid(the_geom) = 25833))
);


--
-- Name: berlin_fh_bielefeld_display_aggregate_gid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE berlin_fh_bielefeld_display_aggregate_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: berlin_fh_bielefeld_display_aggregate_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE berlin_fh_bielefeld_display_aggregate_gid_seq OWNED BY berlin_fh_bielefeld_display_aggregate.gid;


--
-- Name: berlin_fh_bielefeld_roofs; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE berlin_fh_bielefeld_roofs (
    gid integer NOT NULL,
    building_id integer,
    uid integer,
    cid integer,
    area3d double precision,
    global double precision,
    diffuse double precision,
    direct double precision,
    kwhpa double precision,
    strongshadow boolean,
    directu double precision,
    nearby_loss double precision,
    distant_loss double precision,
    tilt double precision,
    aspect double precision,
    nx double precision,
    ny double precision,
    nz double precision,
    pv integer,
    st integer,
    gd integer,
    flat boolean,
    mp_panelnumber integer,
    the_geom geometry,
    planep geometry,
    kwpha double precision,
    planp character varying(255),
    distance_loss double precision,
    CONSTRAINT enforce_dims_planep CHECK ((st_ndims(planep) = 3)),
    CONSTRAINT enforce_dims_the_geom CHECK ((st_ndims(the_geom) = 2)),
    CONSTRAINT enforce_geotype_planep CHECK (((geometrytype(planep) = 'POINT'::text) OR (planep IS NULL))),
    CONSTRAINT enforce_geotype_the_geom CHECK (((geometrytype(the_geom) = 'MULTIPOLYGON'::text) OR (the_geom IS NULL))),
    CONSTRAINT enforce_srid_planep CHECK ((st_srid(planep) = 25833)),
    CONSTRAINT enforce_srid_the_geom CHECK ((st_srid(the_geom) = 25833))
);


--
-- Name: berlin_fh_bielefeld_roofs_gid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE berlin_fh_bielefeld_roofs_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: berlin_fh_bielefeld_roofs_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE berlin_fh_bielefeld_roofs_gid_seq OWNED BY berlin_fh_bielefeld_roofs.gid;


--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tbl_cookie; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE tbl_cookie (
    cookie_id integer NOT NULL,
    ablaufdatum date,
    tbldach_dach_id integer
);


--
-- Name: tbl_dach; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE tbl_dach (
    dach_id integer NOT NULL,
    cookie_id integer,
    the_geom geometry(Geometry,4326),
    pv integer,
    st integer,
    tilt integer,
    global double precision,
    gid integer
);


--
-- Name: tbl_solarpanel; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE tbl_solarpanel (
    panel_id integer NOT NULL,
    laenge real,
    breite real,
    neigung integer,
    ausrichtung integer,
    cookie_id integer,
    the_geom geometry(Geometry,4326),
    rahemenbreite double precision,
    rahmenbreite double precision NOT NULL,
    masterpanel_id integer
);


--
-- Name: gid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY berlin_fh_bielefeld_display_aggregate ALTER COLUMN gid SET DEFAULT nextval('berlin_fh_bielefeld_display_aggregate_gid_seq'::regclass);


--
-- Name: gid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY berlin_fh_bielefeld_roofs ALTER COLUMN gid SET DEFAULT nextval('berlin_fh_bielefeld_roofs_gid_seq'::regclass);


--
-- Name: berlin_fh_bielefeld_display_aggregate_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY berlin_fh_bielefeld_display_aggregate
    ADD CONSTRAINT berlin_fh_bielefeld_display_aggregate_pkey PRIMARY KEY (gid);


--
-- Name: berlin_fh_bielefeld_roofs_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY berlin_fh_bielefeld_roofs
    ADD CONSTRAINT berlin_fh_bielefeld_roofs_pkey PRIMARY KEY (gid);


--
-- Name: cookie_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY tbl_cookie
    ADD CONSTRAINT cookie_pkey PRIMARY KEY (cookie_id);


--
-- Name: dach_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY tbl_dach
    ADD CONSTRAINT dach_pkey PRIMARY KEY (dach_id);


--
-- Name: solarpanel_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY tbl_solarpanel
    ADD CONSTRAINT solarpanel_pkey PRIMARY KEY (panel_id);


--
-- Name: uk_82bmbt5mmp960rhj59id6d9ww; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY tbl_dach
    ADD CONSTRAINT uk_82bmbt5mmp960rhj59id6d9ww UNIQUE (cookie_id);


--
-- Name: berlin_fh_bielefeld_buildings_geom; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_buildings_geom ON berlin_fh_bielefeld_buildings USING gist (the_geom);


--
-- Name: berlin_fh_bielefeld_buildings_hid; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_buildings_hid ON berlin_fh_bielefeld_buildings USING btree (hid);


--
-- Name: berlin_fh_bielefeld_buildings_pv; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_buildings_pv ON berlin_fh_bielefeld_buildings USING btree (pv);


--
-- Name: berlin_fh_bielefeld_data_building_id; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_data_building_id ON berlin_fh_bielefeld_roofs USING btree (building_id);


--
-- Name: berlin_fh_bielefeld_display_aggregate_building_id; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_display_aggregate_building_id ON berlin_fh_bielefeld_display_aggregate USING btree (building_id);


--
-- Name: berlin_fh_bielefeld_display_aggregate_geom; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_display_aggregate_geom ON berlin_fh_bielefeld_display_aggregate USING gist (the_geom);


--
-- Name: berlin_fh_bielefeld_display_aggregate_globalc; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_display_aggregate_globalc ON berlin_fh_bielefeld_display_aggregate USING btree (globalc);


--
-- Name: berlin_fh_bielefeld_roofs_building_id; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_roofs_building_id ON berlin_fh_bielefeld_roofs USING btree (building_id);


--
-- Name: berlin_fh_bielefeld_roofs_geom; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_roofs_geom ON berlin_fh_bielefeld_roofs USING gist (the_geom);


--
-- Name: berlin_fh_bielefeld_roofs_global; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_roofs_global ON berlin_fh_bielefeld_roofs USING btree (global);


--
-- Name: berlin_fh_bielefeld_roofs_mp_panelnumber; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_roofs_mp_panelnumber ON berlin_fh_bielefeld_roofs USING btree (mp_panelnumber);


--
-- Name: berlin_fh_bielefeld_roofs_pv; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_roofs_pv ON berlin_fh_bielefeld_roofs USING btree (pv);


--
-- Name: berlin_fh_bielefeld_roofs_st; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_roofs_st ON berlin_fh_bielefeld_roofs USING btree (st);


--
-- Name: berlin_fh_bielefeld_roofs_tilt; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX berlin_fh_bielefeld_roofs_tilt ON berlin_fh_bielefeld_roofs USING btree (tilt);


--
-- Name: fk1x88j5r16r2lvjwbw9b3q55uy; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tbl_solarpanel
    ADD CONSTRAINT fk1x88j5r16r2lvjwbw9b3q55uy FOREIGN KEY (masterpanel_id) REFERENCES tbl_solarpanel(panel_id);


--
-- Name: fk85u5sqjmdodqerqgc8v8pf8l8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tbl_cookie
    ADD CONSTRAINT fk85u5sqjmdodqerqgc8v8pf8l8 FOREIGN KEY (tbldach_dach_id) REFERENCES tbl_dach(dach_id);


--
-- Name: fkawyhio0xraefq8q2u5musivwc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tbl_solarpanel
    ADD CONSTRAINT fkawyhio0xraefq8q2u5musivwc FOREIGN KEY (cookie_id) REFERENCES tbl_cookie(cookie_id);


--
-- Name: fkf977uj3jlninvwr3dyg2bgi7i; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tbl_dach
    ADD CONSTRAINT fkf977uj3jlninvwr3dyg2bgi7i FOREIGN KEY (cookie_id) REFERENCES tbl_cookie(cookie_id);


--
-- Name: tbl_dach_cookie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tbl_dach
    ADD CONSTRAINT tbl_dach_cookie_id_fkey FOREIGN KEY (cookie_id) REFERENCES tbl_cookie(cookie_id) ON DELETE CASCADE;


--
-- Name: tbl_solarpanel_cookie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tbl_solarpanel
    ADD CONSTRAINT tbl_solarpanel_cookie_id_fkey FOREIGN KEY (cookie_id) REFERENCES tbl_cookie(cookie_id) ON DELETE CASCADE;


--
-- Name: tbl_solarpanel_masterpanel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tbl_solarpanel
    ADD CONSTRAINT tbl_solarpanel_masterpanel_id_fkey FOREIGN KEY (masterpanel_id) REFERENCES tbl_solarpanel(panel_id) ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

