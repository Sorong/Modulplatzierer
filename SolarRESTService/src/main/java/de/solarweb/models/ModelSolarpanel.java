package de.solarweb.models;

import de.solarweb.datamodel.TblSolarpanel;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;


/**
 * Created by Nils on 13.11.16.
 */
@XmlRootElement
public class ModelSolarpanel implements Serializable{

    private int panel_id;
    private double[] obenLinks = new double[2];
    private double[] obenRechts = new double[2];
    private double[] untenRechts = new double[2];
    private double[] untenLinks = new double[2];
    private double laenge;
    private double breite;
    private int neigung;
    private int ausrichtung;
    private double rahmenbreite;
    private int dach_id;

    public ModelSolarpanel(){

    }

    public ModelSolarpanel(TblSolarpanel tblSolarpanel){
        this.panel_id = tblSolarpanel.getPanel_id();
        this.laenge = tblSolarpanel.getLaenge();
        this.breite = tblSolarpanel.getBreite();
        this.neigung = tblSolarpanel.getNeigung();
        this.ausrichtung = tblSolarpanel.getAusrichtung();
        this.rahmenbreite = tblSolarpanel.getRahmenbreite();
        this.dach_id = tblSolarpanel.getDach().getDach_id();

        //Oben Links
        obenLinks[0] = tblSolarpanel.getOben_links_lat();
        obenLinks[1] = tblSolarpanel.getOben_links_lng();

        //Oben Rechts
        obenRechts[0] = tblSolarpanel.getOben_rechts_lat();
        obenRechts[1] = tblSolarpanel.getOben_rechts_lng();

        //Unten Rechts
        untenRechts[0] = tblSolarpanel.getUnten_recht_lat();
        untenRechts[1] = tblSolarpanel.getUnten_rechts_lng();

        //UntenLinks
        untenLinks[0] = tblSolarpanel.getUnten_links_lat();
        untenLinks[1] = tblSolarpanel.getUnten_links_lng();
    }

    public ModelSolarpanel(int id, double[] obenLinks, double[] obenRechts,
                           double[] untenRechts, double[] untenLinks,
                           double breite, double laenge, int neigung, int ausrichtung, double rahmenbreite, int dach_id){
        this.panel_id = id;
        this.obenLinks = obenLinks;
        this.obenRechts = obenRechts;
        this.untenRechts = untenRechts;
        this.untenLinks = untenLinks;
        this.breite = breite;
        this.laenge = laenge;
        this.neigung = neigung;
        this.ausrichtung = ausrichtung;
        this.rahmenbreite = rahmenbreite;
        this.dach_id = dach_id;
    }

    public int getPanel_id() {
        return panel_id;
    }

    public void setPanel_id(int panel_id) {
        this.panel_id = panel_id;
    }

    public double[] getObenLinks() {
        return obenLinks;
    }

    public void setObenLinks(double[] obenLinks) {
        this.obenLinks = obenLinks;
    }

    public double[] getObenRechts() {
        return obenRechts;
    }

    public void setObenRechts(double[] obenRechts) {
        this.obenRechts = obenRechts;
    }

    public double[] getUntenRechts() {
        return untenRechts;
    }

    public void setUntenRechts(double[] untenRechts) {
        this.untenRechts = untenRechts;
    }

    public double[] getUntenLinks() {
        return untenLinks;
    }

    public void setUntenLinks(double[] untenLinks) {
        this.untenLinks = untenLinks;
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

    public int getDach_id() {
        return dach_id;
    }

    public void setDach_id(int dach_id) {
        this.dach_id = dach_id;
    }
}
