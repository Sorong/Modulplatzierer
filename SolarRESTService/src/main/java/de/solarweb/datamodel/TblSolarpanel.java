package de.solarweb.datamodel;

/**
 * Created by Nils on 10.11.16.
 */
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import de.solarweb.helper.GeometryConverter;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@SequenceGenerator(name = "SolarpanelSequence", initialValue=0)
@Table(name = "tbl_solarpanel")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "tblSolarpanel.findAll", query = "SELECT t FROM TblSolarpanel t"),
        @NamedQuery(name = "tblSolarpanel.findById", query = "SELECT t FROM TblSolarpanel t WHERE t.panel_id = :id")
})
public class TblSolarpanel implements Serializable{

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SolarpanelSequence")
    @Id
    @Basic(optional = false)
    @Column(name = "panel_id", nullable = false)
    private Integer panel_id;


    @JoinColumn(name = "cookie_id", nullable = false)
    @ManyToOne(optional = false)
    private TblCookie cookie_id;

    @JoinColumn(name = "masterpanel_id")
    @ManyToOne
    private TblSolarpanel masterpanel;

    @OneToMany(mappedBy = "masterpanel")
    private Collection<TblSolarpanel> tblSolarpanelCollection;
    
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

    @Basic
    @Column(name = "the_geom", columnDefinition = "geometry(Multipolygon, 4326")
    private Geometry the_geom;

    public TblSolarpanel(){

    }



    public Integer getPanel_id() {
        return panel_id;
    }

    public void setPanel_id(Integer panel_id) {
        this.panel_id = panel_id;
    }

    public TblCookie getCookie() {
        return cookie_id;
    }

    public void setCookie(TblCookie tblCookie) {
        this.cookie_id = tblCookie;
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

    public TblCookie getCookie_id() {
        return cookie_id;
    }

    public void setCookie_id(TblCookie cookie_id) {
        this.cookie_id = cookie_id;
    }

    public Geometry getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(Geometry the_geom) {
        this.the_geom = the_geom;
    }

    public ArrayList<LatitudeLongitude> getThe_geomAsLatLng(){
        return GeometryConverter.geometryToLatLngArray(the_geom);
    }

    public TblSolarpanel getMasterpanel() {
        return masterpanel;
    }

    public void setMasterpanel(TblSolarpanel masterpanel) {
        this.masterpanel = masterpanel;
    }

    public Collection<TblSolarpanel> getTblSolarpanelCollection() {
        return tblSolarpanelCollection;
    }

    public void setTblSolarpanelCollection(Collection<TblSolarpanel> tblSolarpanelCollection) {
        this.tblSolarpanelCollection = tblSolarpanelCollection;
    }
}
