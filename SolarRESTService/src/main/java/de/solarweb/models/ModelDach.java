package de.solarweb.models;

import de.solarweb.datamodel.*;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import java.util.ArrayList;

/**
 * Created by Nils on 12.11.16.
 */

public class ModelDach implements Serializable {

    private int dach_id;
    private String strasse;
    private String hausnummer;
    private String postleitzahl;
    private int dachneigung;
    private ArrayList<LatitudeLongitude> the_geom;


    public ModelDach() {

    }

    public ModelDach(TblDach tblDach){
        this.dach_id = tblDach.getDach_id();
        this.strasse = tblDach.getStrasse();
        this.dachneigung = tblDach.getDachneigung();
        this.hausnummer = tblDach.getHausnummer();
        this.postleitzahl = tblDach.getPlz();
        this.the_geom = tblDach.getThe_geomAsLatlng();
    }

    public int getDach_id() {
        return dach_id;
    }

    public void setDach_id(int dach_id) {
        this.dach_id = dach_id;
    }

    public String getStrasse() {
        return strasse;
    }

    public void setStrasse(String strasse) {
        this.strasse = strasse;
    }

    public String getHausnummer() {
        return hausnummer;
    }

    public void setHausnummer(String hausnummer) {
        this.hausnummer = hausnummer;
    }

    public String getPostleitzahl() {
        return postleitzahl;
    }

    public void setPostleitzahl(String postleitzahl) {
        this.postleitzahl = postleitzahl;
    }

    public int getDachneigung() {
        return dachneigung;
    }

    public void setDachneigung(int dachneigung) {
        this.dachneigung = dachneigung;
    }

    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }
}
