package de.solarweb.datamodel;

/**
 * Entitie zur Tabelle Solarpanele aus der Datenbank
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

    /**
     * ID des Solarpanels, wird automatisch generiert
     */
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SolarpanelSequence")
    @Id
    @Basic(optional = false)
    @Column(name = "panel_id", nullable = false)
    private Integer panel_id;

    /**
     * Cookie Entitie, steht in einer n-1 Beziehung zum Cookie
     */
    @JoinColumn(name = "cookie_id", nullable = false)
    @ManyToOne(optional = false)
    private TblCookie cookie_id;

    /**
     * Das Masterpanel ist das erste Panel in einem Panelstring, alle Unterpanel haben<br>
     * das selbe Masterpanel gesetzt. Das Masterpanel setzt sich selbst als Masterpanel.
     */
    @JoinColumn(name = "masterpanel_id")
    @ManyToOne
    private TblSolarpanel masterpanel;

    /**
     * Collection von Solarpanelen welche vom Masterpanel gehalten wird. Handelt<br>
     * es sich bei dem Panel um ein Unterpanel ist diese Collection null.
     */
    @OneToMany(mappedBy = "masterpanel")
    private Collection<TblSolarpanel> tblSolarpanelCollection;

    /**
     * Laenge des Solarpanels in Meter
     */
    @Basic(optional = false)
    @Column(name = "laenge",nullable = false)
    private double laenge;

    /**
     * Breite des Solarpanel in Meter
     */
    @Basic(optional = false)
    @Column(name = "breite", nullable = false)
    private double breite;

    /**
     * Neigung des Solarpanels in Grad
     */
    @Basic(optional = false)
    @Column(name = "neigung", nullable = false)
    private int neigung;

    /**
     * Ausrichtung der Himmelsrichtung in Grad
     */
    @Basic(optional = false)
    @Column(name = "ausrichtung", nullable = false)
    private int ausrichtung;

    /**
     * Rahmenbreite in Meter
     */
    @Basic(optional = false)
    @Column(name = "rahmenbreite", nullable = false)
    private double rahmenbreite;

    /**
     * Geometry Objekte welche die Eckpunkte des Solarpanels bilden
     */
    @Basic
    @Column(name = "the_geom", columnDefinition = "geometry(Multipolygon, 4326")
    private Geometry the_geom;


    /**
     * Standardkonstruktor
     */
    public TblSolarpanel(){

    }


    /**
     * Returnt die ID des Solarpanels
     * @return ID des Solarpanels
     */
    public Integer getPanel_id() {
        return panel_id;
    }

    /**
     * Setzt die ID des Solarpanels
     * @param panel_id ID des Solarpanels
     */
    public void setPanel_id(Integer panel_id) {
        this.panel_id = panel_id;
    }

    /**
     * Returnt die zugehöhrige Cookie Entitie
     * @return Cookie Entitie
     */
    public TblCookie getCookie() {
        return cookie_id;
    }

    /**
     * Setzt eine neue Cookie Entitie
     * @param tblCookie Cookie Entitie
     */
    public void setCookie(TblCookie tblCookie) {
        this.cookie_id = tblCookie;
    }

    /**
     * Returnt die Länge des Solarpanels
     * @return Länge Solarpanel
     */
    public double getLaenge() {
        return laenge;
    }

    /**
     * Setzt die Länge des Solarpanels
     * @param laenge Länge Solarpanel
     */
    public void setLaenge(double laenge) {
        this.laenge = laenge;
    }

    /**
     * Returnt die Breite des Solarpanels
     * @return Breite Solarpanel
     */
    public double getBreite() {
        return breite;
    }

    /**
     * Setzt die Breite des Solarpanels
     * @param breite Bereite Solarpanel
     */
    public void setBreite(double breite) {
        this.breite = breite;
    }

    /**
     * Returnt die Neigung des Solarpanels
     * @return Neigung Solarpanel
     */
    public int getNeigung() {
        return neigung;
    }

    /**
     * Setzt die Neigung des Solarpanels
     * @param neigung Neigung Solarpanel
     */
    public void setNeigung(int neigung) {
        this.neigung = neigung;
    }

    /**
     * Returnt die Ausrichtung de Solarpanels
     * @return Ausrichtung Solarpanel
     */
    public int getAusrichtung() {
        return ausrichtung;
    }

    /**
     * Setzt die Ausrichtung des Solarpanels
     * @param ausrichtung Ausrichtung Solarpanel
     */
    public void setAusrichtung(int ausrichtung) {
        this.ausrichtung = ausrichtung;
    }

    /**
     * Returnt die Rahmenbreite des Solarpanels
     * @return Rahmenbreite Solarpanel
     */
    public double getRahmenbreite() {
        return rahmenbreite;
    }

    /**
     * Setzt die Rahmenbreite des Solarpanels
     * @param rahmenbreite Rahmebreite Solarpanel
     */
    public void setRahmenbreite(double rahmenbreite) {
        this.rahmenbreite = rahmenbreite;
    }

    /**
     * Returnt das Geometry Objekt für das Solarpanel
     * @return Geometry Objekt
     */
    public Geometry getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt ein Geometry Objekt für das Solarpanel
     * @param the_geom Geometry Objekt
     */
    public void setThe_geom(Geometry the_geom) {
        this.the_geom = the_geom;
    }

    /**
     * Returnt eine Liste von LatitudeLongitude Objekten welche die Paneleckpunkte makieren
     * @return Liste LatitudeLongitude Objekte
     */
    public ArrayList<LatitudeLongitude> getThe_geomAsLatLng(){
        return GeometryConverter.geometryToLatLngArray(the_geom);
    }

    /**
     * Returnt die zugehöhrige Masterpanel Entitie
     * @return Aktuelles Masterpanel
     */
    public TblSolarpanel getMasterpanel() {
        return masterpanel;
    }

    /**
     * Setzt eine neues Masterpanel Entitie
     * @param masterpanel Neues Masterpanel Entitie
     */
    public void setMasterpanel(TblSolarpanel masterpanel) {
        this.masterpanel = masterpanel;
    }

    /**
     * Returnt eine Collection mit den Unterpaneln des Masterpanels
     * @return Collection Solarpanel
     */
    public Collection<TblSolarpanel> getTblSolarpanelCollection() {
        return tblSolarpanelCollection;
    }

    /**
     * Setzt eine Liste mit Unterpanels
     * @param tblSolarpanelCollection Liste mit Unterpanels
     */
    public void setTblSolarpanelCollection(Collection<TblSolarpanel> tblSolarpanelCollection) {
        this.tblSolarpanelCollection = tblSolarpanelCollection;
    }
}
