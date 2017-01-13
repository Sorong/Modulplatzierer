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
     * Strasse des Hauses
     */
    private String strasse;
    /**
     * Hausnummer des Hauses
     */
    private String hausnummer;
    /**
     * Postleitzahl des Hauses
     */
    private String postleitzahl;
    /**
     * Dachneigung des Hauses in Grad
     */
    private int dachneigung;
    /**
     * Vertices des Dachumrisses als Latitude/Longitude
     */
    private ArrayList<LatitudeLongitude> the_geom;


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
        this.strasse = tblDach.getStrasse();
        this.dachneigung = tblDach.getDachneigung();
        this.hausnummer = tblDach.getHausnummer();
        this.postleitzahl = tblDach.getPlz();
        this.the_geom = tblDach.getThe_geomAsLatlng();
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

    /**
     * Returned die Strasse des Models
     * @return strasse
     */
    public String getStrasse() {
        return strasse;
    }

    /**
     * Setzt die Strasse des Models
     * @param strasse Strasse des Daches
     */
    public void setStrasse(String strasse) {
        this.strasse = strasse;
    }

    /**
     * Returned die Hausnummer des Models
     * @return hausnummer
     */
    public String getHausnummer() {
        return hausnummer;
    }

    /**
     * Setzt die Hausnummer des Models
     * @param hausnummer Hausnummer des Daches
     */
    public void setHausnummer(String hausnummer) {
        this.hausnummer = hausnummer;
    }

    /**
     * Returned die Postleitzahl des Models
     * @return Postleitzahl
     */
    public String getPostleitzahl() {
        return postleitzahl;
    }

    /**
     * Setzt die Postleitzahl des Models
     * @param postleitzahl Postleitzahl des Daches
     */
    public void setPostleitzahl(String postleitzahl) {
        this.postleitzahl = postleitzahl;
    }

    /**
     * Returned die Dachneigung des Models
     * @return dachneigung
     */
    public int getDachneigung() {
        return dachneigung;
    }

    /**
     * Setzt die Dachneigung des Models
     * @param dachneigung Neigung des Daches
     */
    public void setDachneigung(int dachneigung) {
        this.dachneigung = dachneigung;
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
