package de.solarweb.datamodel;

/**
 * Created by Nils on 10.11.16.
 */
import com.vividsolutions.jts.geom.Geometry;
import de.solarweb.helper.GeometryConverter;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.logging.Logger;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;


@Entity
@SequenceGenerator(name = "DachSequence", initialValue=0)
@Table(name = "tbl_dach")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "TblDach.findAll", query = "SELECT t FROM TblDach t"),
        @NamedQuery(name = "tblDach.findById", query = "SELECT t FROM TblDach t WHERE t.dach_id = :id")
})
public class TblDach implements Serializable{
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DachSequence")
    @Id
    @Basic(optional = false)
    @Column(name = "dach_id", nullable = false)
    private Integer dach_id;


    @JoinColumn(name = "cookie_id", nullable = false)
    @ManyToOne(optional = false)
    private TblCookie cookie;

    @Basic(optional = false)
    @Column(nullable = false)
    private String strasse;

    @Basic(optional = false)
    @Column(nullable = false)
    private String hausnummer;

    @Basic(optional = false)
    @Column(nullable = false)
    private String plz;

    @Basic(optional = false)
    @Column(nullable = false)
    private int dachneigung;

    @Basic
    @Column(name = "the_geom", columnDefinition = "geometry(Multipolygon, 4326")
    private Geometry the_geom;


    public TblDach(){

    }


    public Integer getDach_id() {
        return dach_id;
    }

    public void setDach_id(Integer dach_id) {
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

    public String getPlz() {
        return plz;
    }

    public void setPlz(String plz) {
        this.plz = plz;
    }

    public int getDachneigung() {
        return dachneigung;
    }

    public void setDachneigung(int dachneigung) {
        this.dachneigung = dachneigung;
    }

    public TblCookie getCookie() {
        return cookie;
    }

    public void setCookie(TblCookie cookie) {
        this.cookie = cookie;
    }

    public Geometry getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(Geometry the_geom) {
        this.the_geom = the_geom;
    }

    public ArrayList<LatitudeLongitude> getThe_geomAsLatlng(){
        return GeometryConverter.geometryToLatLngArray(the_geom);
    }

}

