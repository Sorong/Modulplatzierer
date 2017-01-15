package de.solarweb.models;

import de.solarweb.datamodel.*;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import java.util.ArrayList;

/**
 * Model, welches vom Restservice als Dach übergeben wird
 */

public class ModelDach implements Serializable {

    /**
     * ID des Daches
     */
    private int dach_id;

    /**
     * Cookie ID, welche dem Dach zugeordnet ist
     */
    private int cookie_id;
    /**
     * Vertices des Dachumrisses als Latitude/Longitude
     */
    private ArrayList<LatitudeLongitude> the_geom;

    /**
     * Eignung des Daches für Photovoltaik, Dummie für Frontend
     */
    private Integer pv;

    /**
     * Eignung des Daches für Solarthermie, Dummie für Frontend
     */
    private Integer st;

    /**
     * Neigung des Daches
     */
    private Integer tilt;

    /**
     * Globale Einstrahlung des Daches, Dummie für Frontend
     */
    private Double global;

    /**
     * gid ID, über welche Dachteile aus der Tetraeder Datenbank referenziert werden können
     */
    private Integer gid;


    /**
     * Standardkonstruktor zur Serialisierung
     */
    public ModelDach() {

    }

    /**
     * Der vom Restserver genutzt Konstrukor. Wrappt das Entitie Objekt TblDach in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblDach Dach Entitie Objekt
     */
    public ModelDach(TblDach tblDach){
        this.dach_id = tblDach.getDach_id();
        this.the_geom = tblDach.getThe_geomAsLatlng();
        this.pv = tblDach.getPv();
        this.st = tblDach.getSt();
        this.tilt = tblDach.getTilt();
        this.global = tblDach.getGlobal();
        this.cookie_id = tblDach.getCookie().getCookie_id();
        this.gid = tblDach.getGid();
    }

    /**
     * Returned die Dach ID des Models
     * @return DachID des Daches
     */
    public int getDach_id() {
        return dach_id;
    }

    /**
     * Setzt die DachID des Models
     * @param dach_id ID des Daches
     */
    public void setDach_id(int dach_id) {
        this.dach_id = dach_id;
    }

    /**
     * Returnt die Cookie ID des zugehöhrigen Cookies
     * @return CookieID des Cookies
     */
    public int getCookie_id() {
        return cookie_id;
    }

    /**
     * Setzt die Cookie ID des zugehöhrigen Cookies
     * @param cookie_id CookieID des Cookies
     */
    public void setCookie_id(int cookie_id) {
        this.cookie_id = cookie_id;
    }

    /**
     * Returnt den pv Wert des Daches, im Moment Dummie
     * @return pv Eignung für Photovolaik
     */
    public Integer getPv() {
        return pv;
    }

    /**
     * Setzrt den pv Wert des Daches, im Moment Dummie
     * @param pv Eignugn für Photovolaik
     */
    public void setPv(Integer pv) {
        this.pv = pv;
    }

    /**
     * Returnt den st Wert des Daches, im Moment Dummie
     * @return Eignung für Solarthermie
     */
    public Integer getSt() {
        return st;
    }

    /**
     * Setzt den st Wert des Daches, im Moment Dummie
     * @param st Eignung für Solarthermie
     */
    public void setSt(Integer st) {
        this.st = st;
    }

    /**
     * Returnt die Neigung des Daches
     * @return Neigung Dach
     */
    public Integer getTilt() {
        return tilt;
    }

    /**
     * Setzt die Neigung des Daches
     * @param tilt Neigung Dach
     */
    public void setTilt(Integer tilt) {
        this.tilt = tilt;
    }

    /**
     * Returnt die gloable Einstrahlung des Daches
     * @return Globale Einstahlung
     */
    public Double getGlobal() {
        return global;
    }

    /**
     * Setzt die gloable Einstrahlung des Daches
     * @param gloabl Globale Einstrahlung
     */
    public void setGlobal(Double gloabl) {
        this.global = gloabl;
    }

    /**
     * Returnt die gid zur Referenzierung von Dachteilen
     * @return Gid für Dachteile
     */
    public Integer getGid() {
        return gid;
    }

    /**
     * Setzt die gid Referenzierung von Dachteilen
     * @param gid Gid für Dachteile
     */
    public void setGid(Integer gid) {
        this.gid = gid;
    }

    /**
     * Returned die Latitiude/Longitude Vertices welche den Dachumriss bilden.
     * @return Liste mit LatitudeLongitude Werten
     */
    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt die the_geom Vertice Liste für den Dachumriss
     * @param the_geom Liste mit LatitudeLongitude Werten
     */
    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }
}
