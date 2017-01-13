package de.solarweb.datamodel;

/**
 * Entitie zur Tabelle Dächer aus der Datenbank
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

    /**
     * Id des Daches, wird automatisch generiert
     */
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DachSequence")
    @Id
    @Basic(optional = false)
    @Column(name = "dach_id", nullable = false)
    private Integer dach_id;

    /**
     * Cookie Objekt, steht in einer 1-1 Beziehung zum Dach
     */
    @JoinColumn(name = "cookie_id", nullable = false)
    @OneToOne(optional = false)
    private TblCookie cookie;

    /**
     * Eignung für Photovoltaik, Dummie für Frontend
     */
    @Basic(optional = false)
    @Column
    private Integer pv;

    /**
     * Eignung für Solarthermie, Dummie für Frontend
     */
    @Basic(optional = false)
    @Column
    private Integer st;

    /**
     * Die Neigung des Daches, Dummie für Frontend
     */
    @Basic(optional = false)
    @Column
    private Integer tilt;

    /**
     * Die Einstahlung auf das Dach, Dummie für Frontend
     */
    @Basic(optional = false)
    @Column
    private double global;

    /**
     * Dachteile aus der Tetraederdatenbank können über die
     * gid verküpft werden
     */
    @Basic()
    @Column
    private Integer gid;

    /**
     * Geometry Objekt, welches die Umrisse des Daches bilden
     */
    @Basic
    @Column(name = "the_geom", columnDefinition = "geometry(Multipolygon, 4326")
    private Geometry the_geom;

    /**
     * Standardkonstruktor
     */
    public TblDach(){

    }

    /**
     * Returnt die ID des Daches
     * @return ID des Daches
     */
    public Integer getDach_id() {
        return dach_id;
    }

    /**
     * Setzt die ID des Daches
     * @param dach_id Neue ID des Daches
     */
    public void setDach_id(Integer dach_id) {
        this.dach_id = dach_id;
    }

    /**
     * Returnt die zugehöhrige Cookie Entitie
     * @return Cookie Entitie
     */
    public TblCookie getCookie() {
        return cookie;
    }

    /**
     * Setzt eine Cookie Entitie
     * @param cookie Neue Cookie Entitie
     */
    public void setCookie(TblCookie cookie) {
        this.cookie = cookie;
    }

    /**
     * Returnt die Eignung für Photovoltaik
     * @return Eignung Photovoltaik
     */
    public Integer getPv() {
        return pv;
    }

    /**
     * Setzt die Eignung für Photovolaik
     * @param pv Eignung Votovoltaik
     */
    public void setPv(Integer pv) {
        this.pv = pv;
    }

    /**
     * Returnt die Eignung für Solarthermie
     * @return Eignung Solarthermie
     */
    public Integer getSt() {
        return st;
    }

    /**
     * Setzt die Eignung für Solarthermie
     * @param st Eignung Solarthermie
     */
    public void setSt(Integer st) {
        this.st = st;
    }

    /**
     * Returnt die Neigung des Daches
     * @return Neigung Dach
     */
    public Integer getTilt() {
        return tilt;
    }

    /**
     * Setzt die Neigung des Daches
     * @param tilt Neigung Dach
     */
    public void setTilt(Integer tilt) {
        this.tilt = tilt;
    }

    /**
     * Returnt die gloable Sonneneinstrahlung des Daches
     * @return Gloabler Einstahlungswert
     */
    public double getGlobal() {
        return global;
    }

    /**
     * Setzt die globale Sonneneinstahlung des Daches
     * @param global Globaler Einstahlungswert
     */
    public void setGlobal(double global) {
        this.global = global;
    }

    /**
     * Returnt die gid ID des DAches
     * @return gid ID
     */
    public Integer getGid() {
        return gid;
    }

    /**
     * Setzt eine neue gid ID
     * @param gid gid ID
     */
    public void setGid(Integer gid) {
        this.gid = gid;
    }

    /**
     * Returnt das Geometry Objekt, welches den Umriss des Daches bildet
     * @return Geometry Objekt Umriss
     */
    public Geometry getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt das Geomerty Obejekt, welches den Umriss des Daches bildet
     * @param the_geom Geometry Obejekt Umriss
     */
    public void setThe_geom(Geometry the_geom) {
        this.the_geom = the_geom;
    }

    /**
     * Returnt den Umriss des Daches als Liste von LatitudeLongitude Objekten
     * @return Umriss als Liste von LatitudeLongitude
     */
    public ArrayList<LatitudeLongitude> getThe_geomAsLatlng(){
        return GeometryConverter.geometryToLatLngArray(the_geom);
    }

}

