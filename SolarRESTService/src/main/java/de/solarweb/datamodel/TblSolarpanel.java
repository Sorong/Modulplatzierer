package de.solarweb.datamodel;

/**
 * Created by Nils on 10.11.16.
 */
import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "solarpanel", schema = "scltest_sg_we2016_gr2a")
@XmlRootElement
public class TblSolarpanel implements Serializable{

    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer panel_id;

    @JoinColumn(name = "cooke_id", referencedColumnName = "panel_id", nullable = false)
    @ManyToOne(optional = false)
    private TblCookie cookie;

    @JoinColumn(name = "dach_id", referencedColumnName = "panel_id", nullable = false)
    @ManyToOne(optional = false)
    private TblDach dach;

    @JoinColumn(name = "paneltype_id", referencedColumnName = "panel_id", nullable = false)
    @ManyToOne(optional = false)
    private TblPaneltype paneltype;

    @Basic(optional = false)
    @Column(nullable = false)
    private double koord_mittle_lng;

    @Basic(optional = false)
    @Column(nullable = false)
    private double koord_mittle_lat;

    @Basic(optional = false)
    @Column(nullable = false)
    private double laenge;

    @Basic(optional = false)
    @Column(nullable = false)
    private double breite;

    @Basic(optional = false)
    @Column(nullable = false)
    private int neigung;

    @Basic(optional = false)
    @Column(nullable = false)
    private int ausrichtung;

    @Basic(optional = false)
    @Column(nullable = false)
    private double rahmenbreite;



    public TblSolarpanel(){

    }

    public TblSolarpanel(Integer id, double lat, double lng, double laenge, double breite, int neigung, int ausrichtung, double rahmenbreite){
        this.panel_id = id;
        this.koord_mittle_lat = lat;
        this.koord_mittle_lng = lng;
        this.laenge = laenge;
        this.breite = breite;
        this.neigung = neigung;
        this.rahmenbreite = rahmenbreite;
    }

    public Integer getPanel_id() {
        return panel_id;
    }

    public void setPanel_id(Integer panel_id) {
        this.panel_id = panel_id;
    }

    public TblCookie getCookie() {
        return cookie;
    }

    public void setCookie(TblCookie cookie) {
        this.cookie = cookie;
    }

    public TblDach getDach() {
        return dach;
    }

    public void setDach(TblDach dach) {
        this.dach = dach;
    }

    public TblPaneltype getPaneltype() {
        return paneltype;
    }

    public void setPaneltype(TblPaneltype paneltype) {
        this.paneltype = paneltype;
    }

    public double getKoord_mittle_lng() {
        return koord_mittle_lng;
    }

    public void setKoord_mittle_lng(double koord_mittle_lng) {
        this.koord_mittle_lng = koord_mittle_lng;
    }

    public double getKoord_mittle_lat() {
        return koord_mittle_lat;
    }

    public void setKoord_mittle_lat(double koord_mittle_lat) {
        this.koord_mittle_lat = koord_mittle_lat;
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
}
