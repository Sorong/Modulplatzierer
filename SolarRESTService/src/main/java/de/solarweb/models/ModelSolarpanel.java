package de.solarweb.models;

import de.solarweb.datamodel.TblSolarpanel;
import de.solarweb.helper.LatitudeLongitude;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;


/**
 * Created by Nils on 13.11.16.
 */
@XmlRootElement
public class ModelSolarpanel implements Serializable{

    private int panel_id;
    private double laenge;
    private double breite;
    private int neigung;
    private int ausrichtung;
    private double rahmenbreite;
    private int cookie_id;
    private ArrayList<LatitudeLongitude> the_geom;

    public ModelSolarpanel(){

    }

    public ModelSolarpanel(TblSolarpanel tblSolarpanel){
        this.panel_id = tblSolarpanel.getPanel_id();
        this.laenge = tblSolarpanel.getLaenge();
        this.breite = tblSolarpanel.getBreite();
        this.neigung = tblSolarpanel.getNeigung();
        this.ausrichtung = tblSolarpanel.getAusrichtung();
        this.rahmenbreite = tblSolarpanel.getRahmenbreite();
        this.cookie_id = tblSolarpanel.getCookie().getCookie_id();
        this.the_geom = tblSolarpanel.getThe_geomAsLatLng();
    }



    public int getPanel_id() {
        return panel_id;
    }

    public void setPanel_id(int panel_id) {
        this.panel_id = panel_id;
    }

    public double getLaenge() {
        return laenge;
    }

    public void setLaenge(double laenge) {
        this.laenge = laenge;
    }

    public double getBreite() {
        return breite;
    }

    public void setBreite(double breite) {
        this.breite = breite;
    }

    public int getNeigung() {
        return neigung;
    }

    public void setNeigung(int neigung) {
        this.neigung = neigung;
    }

    public int getAusrichtung() {
        return ausrichtung;
    }

    public void setAusrichtung(int ausrichtung) {
        this.ausrichtung = ausrichtung;
    }

    public double getRahmenbreite() {
        return rahmenbreite;
    }

    public void setRahmenbreite(double rahmenbreite) {
        this.rahmenbreite = rahmenbreite;
    }

    public int getCookie_id() {
        return cookie_id;
    }

    public void setCookie_id(int cookie_id) {
        this.cookie_id = cookie_id;
    }

    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }
}
