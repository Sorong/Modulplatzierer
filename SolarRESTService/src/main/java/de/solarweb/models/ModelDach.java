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
     * Eignung des Daches für Solarthermie, Dumme für Frontend
     */
    private Integer st;

    private Integer tilt;

    private Double global;

    private Integer gid;


    /**
     * Standartkonstruktor zur serialiserung
     */
    public ModelDach() {

    }

    /**
     * Der vom Restserver genutzt Konstrukor. Wrappt das JPA Objekt TblDach in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblDach JPAObjekt
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
     * Returned die DachID des Models
     * @return dachID
     */
    public int getDach_id() {
        return dach_id;
    }

    /**
     * Setzt die Dach Id des Models
     * @param dach_id ID des Daches
     */
    public void setDach_id(int dach_id) {
        this.dach_id = dach_id;
    }

    public int getCookie_id() {
        return cookie_id;
    }

    public void setCookie_id(int cookie_id) {
        this.cookie_id = cookie_id;
    }

    /**
     * Returned die Strasse des Models
     * @return strasse
     */

    /**
     * Returnt den pv Wert des Daches, im Moment Dummie
     * @return pv
     */
    public Integer getPv() {
        return pv;
    }

    /**
     * Setzrt den pv Wert des Daches, im Moment Dummie
     * @param pv pv
     */
    public void setPv(Integer pv) {
        this.pv = pv;
    }

    /**
     * Returnt den st Wert des Daches, im Moment Dummie
     * @return st
     */
    public Integer getSt() {
        return st;
    }

    /**
     * Setzt den st Wert des Daches, im Moment Dummie
     * @param st st
     */
    public void setSt(Integer st) {
        this.st = st;
    }

    public Integer getTilt() {
        return tilt;
    }

    public void setTilt(Integer tilt) {
        this.tilt = tilt;
    }

    public Double getGlobal() {
        return global;
    }

    public void setGlobal(Double gloabl) {
        this.global = gloabl;
    }

    public Integer getGid() {
        return gid;
    }

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
