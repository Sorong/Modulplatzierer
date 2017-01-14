package de.solarweb.models;

import de.solarweb.datamodel.TblSolarpanel;
import de.solarweb.helper.LatitudeLongitude;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;


/**
 * Model, welches vom Restserver als Panel übergeben wird
 */
@XmlRootElement
public class ModelSolarpanel implements Serializable{

    /**
     * PanelId des Solarpanels
     */
    private int panel_id;
    /**
     * MasterID, verweist auf die PanelID des Masterpanels<br>
     * Ist gleich der panel_id wenn das Panel selbst Master ist
     */
    private int masterpanel_id;
    /**
     * Die Länge des Panels in Meter
     */
    private double laenge;
    /**
     * Die Breite des Panels in Meter
     */
    private double breite;
    /**
     * Die Neigung des Panels in Grad
     */
    private int neigung;
    /**
     * Gibt die Ausrichtung in die Himmelsrichtung an in Grad an
     */
    private int ausrichtung;
    /**
     * Gibt die Breite des Rahmen an
     */
    private double rahmenbreite;
    /**
     * Gibt an, zu welchem Cookie das Panel zugeordnet ist
     */
    private int cookie_id;
    /**
     * Liste von Latitude/Longitude Werte, welche die Ecken<br>
     * des Solarpanels bilden
     */
    private ArrayList<LatitudeLongitude> the_geom;

    /**
     * Standardkonstruktor zur Serialiserung
     */
    public ModelSolarpanel(){

    }

    /**
     * Der vom Restserver genutzt Konstruktor. Wrappt das Entitie Objekt TblSolarpanel in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblSolarpanel Entite Objekt Solarpanel
     */
    public ModelSolarpanel(TblSolarpanel tblSolarpanel){
        this.panel_id = tblSolarpanel.getPanel_id();
        if(tblSolarpanel.getMasterpanel() != null) {
            this.masterpanel_id = tblSolarpanel.getMasterpanel().getPanel_id();
        }
        this.laenge = tblSolarpanel.getLaenge();
        this.breite = tblSolarpanel.getBreite();
        this.neigung = tblSolarpanel.getNeigung();
        this.ausrichtung = tblSolarpanel.getAusrichtung();
        this.rahmenbreite = tblSolarpanel.getRahmenbreite();
        this.cookie_id = tblSolarpanel.getCookie().getCookie_id();
        this.the_geom = tblSolarpanel.getThe_geomAsLatLng();
    }

    /**
     * Setzt die ID des Panels
     * @param panel_id ID des Solarpanels
     */
    public void setPanel_id(int panel_id) {
        this.panel_id = panel_id;
    }

    /**
     * Returnt die ID des Panels
     * @return ID des Solarpanels
     */
    public int getPanel_id() {
        return panel_id;
    }

    /**
     * Returnet die ID des Masterpanels
     * @return Masterpanel_id des zugeordneten Masterpanels
     */
    public int getMasterpanel_id() {
        return masterpanel_id;
    }

    /**
     * Setzt die ID des zugeghöhrigen Masterpanels
     * @param masterpanel_id Masterpanel_id des zugeordneten Masterpanels
     */
    public void setMasterpanel_id(int masterpanel_id) {
        this.masterpanel_id = masterpanel_id;
    }

    /**
     * Returnt die Länge des Panels
     * @return Länge des Solarpanels
     */
    public double getLaenge() {
        return laenge;
    }

    /**
     * Setzt die Länge des Masterpanels
     * @param laenge Länge des Solarpanels
     */
    public void setLaenge(double laenge) {
        this.laenge = laenge;
    }

    /**
     * Retrunt die Bereite des Panels
     * @return Breite des Solarpanels
     */
    public double getBreite() {
        return breite;
    }

    /**
     * Setzt die Breite des Panels
     * @param breite Breite des Solarpanels
     */
    public void setBreite(double breite) {
        this.breite = breite;
    }

    /**
     * Retrunt die Neigung des Panels
     * @return Neigung des Solarpanels
     */
    public int getNeigung() {
        return neigung;
    }

    /**
     * Setzt die Neigung des Panels
     * @param neigung Neigung des Solarpanels
     */
    public void setNeigung(int neigung) {
        this.neigung = neigung;
    }

    /**
     * Returnt die Ausrichtung des Panels
     * @return Ausrichtung des Solarpanels
     */
    public int getAusrichtung() {
        return ausrichtung;
    }

    /**
     * Setzt die Ausrichtung des Panels
     * @param ausrichtung Ausrichtung des Solarpanels
     */
    public void setAusrichtung(int ausrichtung) {
        this.ausrichtung = ausrichtung;
    }

    /**
     * Returnt die Rahembreite des Panels
     * @return Rahmenbreite des Solarpanels
     */
    public double getRahmenbreite() {
        return rahmenbreite;
    }

    /**
     * Setzt die Rahmenbreite des Panels
     * @param rahmenbreite Rahmenbreite des Solarpanels
     */
    public void setRahmenbreite(double rahmenbreite) {
        this.rahmenbreite = rahmenbreite;
    }

    /**
     * Returnt die Cookie ID des Panels
     * @return CookieID des zugeordneten Cookies
     */
    public int getCookie_id() {
        return cookie_id;
    }

    /**
     * Setzt die Cookie ID des Panels
     * @param cookie_id CookieID des zugeordneten Cookies
     */
    public void setCookie_id(int cookie_id) {
        this.cookie_id = cookie_id;
    }

    /**
     * Returnt die Arrayliste mit den Latitude/Longitude Werten des Panels
     * @return Liste mit LatitudeLongitude Objekten
     */
    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt die Arrayliste mit den Latitude/Longitude Werten des Panels
     * @param the_geom Liste mit LatitudeLongitude Objekten
     */
    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }
}
