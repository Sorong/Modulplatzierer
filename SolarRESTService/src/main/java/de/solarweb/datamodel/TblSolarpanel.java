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
@Table(name = "tbl_solarpanel")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "tblSolarpanel.findAll", query = "SELECT t FROM TblSolarpanel t"),
        @NamedQuery(name = "tblSolarpanel.findById", query = "SELECT t FROM TblSolarpanel t WHERE t.panel_id = :id")
})
public class TblSolarpanel implements Serializable{

    @Id
    @Basic(optional = false)
    @Column(name = "panel_id", nullable = false)
    private Integer panel_id;


    @JoinColumn(name = "dach_id", nullable = false)
    @ManyToOne(optional = false)
    private TblDach dach_id;


    @Basic(optional = false)
    @Column(name = "laenge",nullable = false)
    private double laenge;

    @Basic(optional = false)
    @Column(name = "breite", nullable = false)
    private double breite;

    @Basic(optional = false)
    @Column(name = "neigung", nullable = false)
    private int neigung;

    @Basic(optional = false)
    @Column(name = "ausrichtung", nullable = false)
    private int ausrichtung;

    @Basic(optional = false)
    @Column(name = "rahmenbreite", nullable = false)
    private double rahmenbreite;


    //Oben Links
    @Basic(optional = false)
    @Column(name = "oben_links_lat", nullable = false)
    private double oben_links_lat;

    @Basic(optional = false)
    @Column(name = "oben_links_lng", nullable = false)
    private double oben_links_lng;


    //Oben Rechts
    @Basic(optional = false)
    @Column(name = "oben_rechts_lat", nullable = false)
    private double oben_rechts_lat;

    @Basic(optional = false)
    @Column(name = "oben_rechts_lng", nullable = false)
    private double oben_rechts_lng;


    //Unten Rechts
    @Basic(optional = false)
    @Column(name = "unten_rechts_lat", nullable = false)
    private double unten_rechts_lat;

    @Basic(optional = false)
    @Column(name = "unten_rechts_lng", nullable = false)
    private double unten_rechts_lng;


    //Unten Links
    @Basic(optional = false)
    @Column(name = "unten_links_lat", nullable = false)
    private double unten_links_lat;

    @Basic(optional = false)
    @Column(name = "unten_links_lng", nullable = false)
    private double unten_links_lng;


    public TblSolarpanel(){

    }

    public TblSolarpanel(Integer id, double lat, double lng, double laenge, double breite, int neigung, int ausrichtung, double rahmenbreite){
        this.panel_id = id;
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

    public TblDach getDach() {
        return dach_id;
    }

    public void setDach(TblDach dach) {
        this.dach_id = dach;
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

    public double getOben_links_lat() {
        return oben_links_lat;
    }

    public void setOben_links_lat(double oben_links_lat) {
        this.oben_links_lat = oben_links_lat;
    }

    public double getOben_links_lng() {
        return oben_links_lng;
    }

    public void setOben_links_lng(double oben_links_lng) {
        this.oben_links_lng = oben_links_lng;
    }

    public double getOben_rechts_lat() {
        return oben_rechts_lat;
    }

    public void setOben_rechts_lat(double oben_rechts_lat) {
        this.oben_rechts_lat = oben_rechts_lat;
    }

    public double getOben_rechts_lng() {
        return oben_rechts_lng;
    }

    public void setOben_rechts_lng(double oben_rechts_lng) {
        this.oben_rechts_lng = oben_rechts_lng;
    }

    public double getUnten_recht_lat() {
        return unten_rechts_lat;
    }

    public void setUnten_rechts_lat(double unten_recht_lat) {
        this.unten_rechts_lat = unten_recht_lat;
    }

    public double getUnten_rechts_lng() {
        return unten_rechts_lng;
    }

    public void setUnten_rechts_lng(double unten_rechts_lng) {
        this.unten_rechts_lng = unten_rechts_lng;
    }

    public double getUnten_links_lat() {
        return unten_links_lat;
    }

    public void setUnten_links_lat(double unten_links_lat) {
        this.unten_links_lat = unten_links_lat;
    }

    public double getUnten_links_lng() {
        return unten_links_lng;
    }

    public void setUnten_links_lng(double unten_links_lng) {
        this.unten_links_lng = unten_links_lng;
    }
}
