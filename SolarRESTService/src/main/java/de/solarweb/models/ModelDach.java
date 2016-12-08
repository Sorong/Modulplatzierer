package de.solarweb.models;

import de.solarweb.datamodel.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import java.util.ArrayList;

/**
 * Created by Nils on 12.11.16.
 */

public class ModelDach implements Serializable{

    private int dach_id;
    private String strasse;
    private String hausnummer;
    private String postleitzahl;
    private int dachneigung;
    private double koord_dachmitte_lng;
    private double koord_dachmitte_lat;
    private ArrayList<ModelSolarpanel> modelSolarpanelCollection;
    private ModelCookie cookie;

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
        this.modelSolarpanelCollection = new ArrayList<ModelSolarpanel>();
        for(TblSolarpanel tblSolarpanel : tblDach.getTblSolarpanelCollection() ){
            modelSolarpanelCollection.add(new ModelSolarpanel(tblSolarpanel));
        }
        this.cookie = new ModelCookie(tblDach.getCookie());

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

    public ArrayList<ModelSolarpanel> getModelSolarpanelCollection() {
        return modelSolarpanelCollection;
    }

    public void setModelSolarpanelCollection(ArrayList<ModelSolarpanel> modelSolarpanelCollection) {
        this.modelSolarpanelCollection = modelSolarpanelCollection;
    }

    public ModelCookie getCookie() {
        return cookie;
    }

    public void setCookie(ModelCookie cookie) {
        this.cookie = cookie;
    }
}
