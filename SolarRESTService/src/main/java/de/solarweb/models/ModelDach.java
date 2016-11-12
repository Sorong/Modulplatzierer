package de.solarweb.models;

import de.solarweb.datamodel.TblDach;

import java.io.Serializable;

/**
 * Created by Nils on 12.11.16.
 */
public class ModelDach implements Serializable{

    int dach_id;
    String strasse;
    String hausnummer;
    String postleitzahl;
    int dachneigung;
    double koord_dachmitte_lng;
    double koord_dachmitte_lat;

    public ModelDach(){

    }

    public ModelDach(TblDach tblDach){
        this.dach_id = tblDach.getDach_id();
        this.strasse = tblDach.getStrasse();
        this.dachneigung = tblDach.getDachneigung();
        this.hausnummer = tblDach.getHausnummer();
        this.postleitzahl = tblDach.getPlz();
        this.koord_dachmitte_lat = tblDach.getKoord_dachmitte_lat();
        this.koord_dachmitte_lng = tblDach.getKoord_dachmitte_lng();
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

    public double getKoord_dachmitte_lng() {
        return koord_dachmitte_lng;
    }

    public void setKoord_dachmitte_lng(double koord_dachmitte_lng) {
        this.koord_dachmitte_lng = koord_dachmitte_lng;
    }

    public double getKoord_dachmitte_lat() {
        return koord_dachmitte_lat;
    }

    public void setKoord_dachmitte_lat(double koord_dachmitte_lat) {
        this.koord_dachmitte_lat = koord_dachmitte_lat;
    }
}
