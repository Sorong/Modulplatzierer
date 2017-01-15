package de.solarweb.datamodel;

import com.vividsolutions.jts.geom.Geometry;
import de.solarweb.helper.GeometryConverter;
import de.solarweb.helper.LatitudeLongitude;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * Entitie zur Tabelle berlin_fh_bielefeld_building aus der Datenbank
 */
@Entity
@Table(name = "berlin_fh_bielefeld_buildings")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "tblTetraederBuilding.findAll", query = "SELECT t FROM TblTetraederBuilding t"),
        @NamedQuery(name = "tblTetraederBuildings.findByAddress", query = "SELECT t FROM TblTetraederBuilding t WHERE t.street = ?0 AND t.number = ?1 AND t.plz = ?2")
})
public class TblTetraederBuilding implements Serializable{

    /**
     * Eindeutige ID des Gebäudes
     */
    @Id
    @Basic
    @Column(name = "gid")
    private int gid;

    /**
     * gmlid des Gebäudes
     */
    @Basic
    @Column(name = "gmlid")
    private String gmild;

    /**
     * nr des Gebäudes
     */
    @Basic
    @Column(name = "nr")
    private String nr;

    /**
     * Strasse des Gebäudes
     */
    @Basic
    @Column(name = "street")
    private String street;

    /**
     * Hausnummer des Gebäudes
     */
    @Basic
    @Column(name = "number")
    private String number;

    /**
     * Postleitzahl des Gebäudes
     */
    @Basic
    @Column(name = "plz")
    private double plz;

    /**
     * hid des Gebäudes
     */
    @Basic
    @Column(name = "hid")
    private Integer hid;

    /**
     * Ort des Gebäudes
     */
    @Basic
    @Column(name = "ort")
    private String ort;

    /**
     * Geometry Objekt welcher den Umriss des Gebäudes beinhaltet
     */
    @Basic
    @Column(name = "the_geom")
    private Geometry the_geom;

    /**
     * Zusatzinformationen zu dem Gebäude
     */
    @Basic
    @Column(name = "zusatz")
    private String zusatz;

    /**
     * Ob das Gebäude ein Denkmal ist
     */
    @Basic
    @Column(name = "denkmal")
    private boolean denkmal;

    /**
     *Zusatzinformationen zum Denkmal
     */
    @Basic
    @Column(name = "denkmali")
    private String denkmali;

    /**
     * monument_reason des Gebäudes
     */
    @Basic
    @Column(name = "monument_reason")
    private String monument_reason;

    /**
     * Fläche des Gebäudes
     */
    @Basic
    @Column(name = "area2d")
    private double area2d;

    /**
     * Fläche des Gebäudes
     */
    @Basic
    @Column(name = "area3d")
    private double area3d;

    /**
     * Eignung des Gebäudes für Photovolataik
     */
    @Basic
    @Column(name = "pv")
    private int pv;

    /**
     * Eignung des Gebäudes für Solarthermie
     */
    @Basic
    @Column(name = "st")
    private int st;

    /**
     * gd des Gebäudes
     */
    @Basic
    @Column(name = "gd")
    private Integer gd;

    /**
     * Mitarbeiter, welcher für Scannen des Gebäudes verantwortlich
     */
    @Basic
    @Column(name = "doneby")
    private int doneby;

    /**
     *Zeit zur Kalkulation des Gebäudes
     */
    @Basic
    @Column(name= "calctime")
    private double calctime;

    /**
     * qhint des Gebäudes
     */
    @Basic
    @Column(name = "qhint")
    private Integer qhint;

    /**
     * Haushaltsmitgliederanzahl des Gebäudes
     */
    @Basic
    @Column(name = "household_size")
    private int household_size;

    /**
     * gd_area des Gebäudes
     */
    @Basic
    @Column(name = "gd_area")
    private double gd_area;

    /**
     * rueckhalt des Gebäudes
     */
    @Basic
    @Column(name = "rueckhalt")
    private int rueckhalt;

    /**
     * Geometry Objekt welcher den Umriss des Gebäudes beinhaltet
     */
    @Basic
    @Column(name = "rt_geom")
    private Geometry rt_geom;

    /**
     * Standardkonstrultor
     */
    public TblTetraederBuilding()
    {

    }

    /**
     *Returnt die gid ID des Gebäudes
     * @return Gebäude gid ID
     */
    public int getGid() {
        return gid;
    }

    /**
     * Setzt die Gebäude gid ID
     * @param gid Gebäude gid ID
     */
    public void setGid(int gid) {
        this.gid = gid;
    }

    /**
     * Returnt die gmlid des Gebäudes
     * @return Gebäude gmlid
     */
    public String getGmild() {
        return gmild;
    }

    /**
     * Setzt die gmlid des Gebäudes
     * @param gmild Gebäude gmlid
     */
    public void setGmild(String gmild) {
        this.gmild = gmild;
    }

    /**
     * Returnt die nr des Gebäudes
     * @return Gebäude nr
     */
    public String getNr() {
        return nr;
    }

    /**
     * Setzt die nr des Gebäudes
     * @param nr Gebäude nr
     */
    public void setNr(String nr) {
        this.nr = nr;
    }

    /**
     * Returnt die Strasse des Gebäudes
     * @return Strassenname
     */
    public String getStreet() {
        return street;
    }

    /**
     * Setzt die Strasse des Gebäudes
     * @param street Strassenname
     */
    public void setStreet(String street) {
        this.street = street;
    }

    /**
     * Returnt die Hausnummer des Gebäudes
     * @return Hausnummer
     */
    public String getNumber() {
        return number;
    }

    /**
     * Setzt die Hausnummer des Gebäudes
     * @param number Hausnummer
     */
    public void setNumber(String number) {
        this.number = number;
    }

    /**
     * Returnt die Postleitzahl des Gebäudes
     * @return Postleitzahl
     */
    public double getPlz() {
        return plz;
    }

    /**
     * Setzt die Postleitzahl des Gebäudes
     * @param plz Postleitzahl
     */
    public void setPlz(double plz) {
        this.plz = plz;
    }

    /**
     * Returnt die hid des Gebäudes
     * @return Gebäude hid
     */
    public int getHid() {
        return hid;
    }

    /**
     * Setzt die hid des Gebäudes
     * @param hid Gebäude hid
     */
    public void setHid(int hid) {
        this.hid = hid;
    }

    /**
     * Returnt die Ort des Gebäudes
     * @return Ort
     */
    public String getOrt() {
        return ort;
    }

    /**
     * Setzt den Ort des Gebäudes
     * @param ort Ort
     */
    public void setOrt(String ort) {
        this.ort = ort;
    }

    /**
     * Returnt das Geometryobjekt, welches des Gebäudeumriss bildet
     * @return Geometry Gebäude Umriss
     */
    public Geometry getThe_geom() {
        return the_geom;
    }

    /**
     * Returnt den Gebäudeumriss als Liste von LatitudeLongitude Objekten
     * @return Liste LatitudeLongitude
     * @throws Exception Falls beim konvertieren ein Fehler auftritt
     */
    public ArrayList<LatitudeLongitude> getThe_geomAsLatlng() throws Exception{
        return GeometryConverter.geometryToLatLngArray(25833, the_geom);
    }

    /**
     * Setzt das Geometryobjekt welches den Gebäudeumriss bildet
     * @param geometry Gebäude Umriss
     */
    public void setThe_geom(Geometry geometry) {
        this.the_geom = geometry;
    }

    /**
     * Returnt Zusatzinformationen zum Gebäude
     * @return Zusatzinformationen
     */
    public String getZusatz() {
        return zusatz;
    }

    /**
     * Setzt Zusatzinformationen zum Gebäude
     * @param zusatz Zusatzinformationen
     */
    public void setZusatz(String zusatz) {
        this.zusatz = zusatz;
    }

    /**
     * Gibt an, ob es sich bei Gebäude um ein Denkmal handelt
     * @return Ob Denkmal
     */
    public boolean isDenkmal() {
        return denkmal;
    }

    /**
     * Setzt Information, ob es sich um ein Denkmal handelt
     * @param denkmal Ob Denkmal
     */
    public void setDenkmal(boolean denkmal) {
        this.denkmal = denkmal;
    }

    /**
     * Informationen zum Denkmal
     * @return Denkmalinformationen
     */
    public String getDenkmali() {
        return denkmali;
    }

    /**
     * Setzt Denkmalinformationen
     * @param denkmali Denkmalinformationen
     */
    public void setDenkmali(String denkmali) {
        this.denkmali = denkmali;
    }

    /**
     * Returnt den monument_reason
     * @return Gebäude monument_reason
     */
    public String getMonument_reason() {
        return monument_reason;
    }

    /**
     * Setzt den monument_reason
     * @param text Gebäude monument_reason
     */
    public void setMonument_reason(String text) {
        this.monument_reason = text;
    }

    /**
     * Returnt den Flächeninhalt in 2d des Gebäude
     * @return Flächeninhalt 2d
     */
    public double getArea2d() {
        return area2d;
    }

    /**
     * Setzt den Flächeninhalt in 2d des Gebäudes
     * @param area2d Flächeninhalt 2d
     */
    public void setArea2d(double area2d) {
        this.area2d = area2d;
    }

    /**
     * Returnt den Flächeninhalt in 3d des Gebäudes
     * @return Flächeninhalt 3d
     */
    public double getArea3d() {
        return area3d;
    }

    /**
     * Setzt den Flächeninhalt in 3d des Gebäudes
     * @param area3d Flächeninhalt in 3d
     */
    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    /**
     * Retunrt die Eignung für Photovoltaik des Gebäudes
     * @return Eignung Photovoltaik
     */
    public int getPv() {
        return pv;
    }

    /**
     * Setzt die Eignung für Photovoltaik des Gebäudes
     * @param pv Eignung Photovoltaik
     */
    public void setPv(int pv) {
        this.pv = pv;
    }

    /**
     * Returnt die Eignung für Solarthermie desd Gebäudes
     * @return Eignung Solarthermie
     */
    public int getSt() {
        return st;
    }

    /**
     * Setzt die Eignung für Solarthermie
     * @param st Eignung Solarthermie
     */
    public void setSt(int st) {
        this.st = st;
    }

    /**
     * Returnt den gd Wert des Gebäudes
     * @return gd Gebäude
     */
    public Integer getGd() {
        return gd;
    }

    /**
     * Setzt den gd Wert des Gebäudes
     * @param gd gd Gebäude
     */
    public void setGd(Integer gd) {
        this.gd = gd;
    }

    /**
     * Returnt die ID des Einsteller des Gebäudes
     * @return Einsteller ID
     */
    public int getDoneby() {
        return doneby;
    }

    /**
     * Setzt die ID des Einstellers des Gebäudes
     * @param doneby Einsteller Id
     */
    public void setDoneby(int doneby) {
        this.doneby = doneby;
    }

    /**
     * Returnt die Kalkulationszeit des Gebäudes
     * @return Kalkulationszeit
     */
    public double getCalctime() {
        return calctime;
    }

    /**
     * Setzt die Kalkulationszeit des Gebäudes
     * @param calctime Kalkulationszeit
     */
    public void setCalctime(double calctime) {
        this.calctime = calctime;
    }

    /**
     * Returnt den qhint des Gebäudes
     * @return qhint Gebäude
     */
    public Integer getQhint() {
        return qhint;
    }

    /**
     * Setzt den qhint des Gebäudes
     * @param qhint qhint Gebäude
     */
    public void setQhint(Integer qhint) {
        this.qhint = qhint;
    }

    /**
     * Returnt die Zahl des Haushaltsangehöhrigen des Gebäudes
     * @return Haushaltsangehöhrige
     */
    public int getHousehold_size() {
        return household_size;
    }

    /**
     * Setzt die Zahl des Haushaltsangehöhrige des Gebäudes
     * @param household_size Haushaltsangehöhrige
     */
    public void setHousehold_size(int household_size) {
        this.household_size = household_size;
    }

    /**
     * Returnt die gd-Fläche des Gebäudes
     * @return gd-Fläche
     */
    public double getGd_area() {
        return gd_area;
    }

    /**
     * Setzt die gd-Fläche des Gebäudes
     * @param gd_area gd-Fläche
     */
    public void setGd_area(double gd_area) {
        this.gd_area = gd_area;
    }

    /**
     * Retunt den Rückhalt des Gebäudes
     * @return Rückhalt
     */
    public int getRueckhalt() {
        return rueckhalt;
    }

    /**
     * Setzt den Rückhalt des Gebäudes
     * @param rueckhalt Rückhalt
     */
    public void setRueckhalt(int rueckhalt) {
        this.rueckhalt = rueckhalt;
    }

    /**
     * Returnt das Geometryobjekt für den Gebäudeumruss
     * @return Geometry Umriss
     */
    public Geometry getRt_geom() {
        return rt_geom;
    }

    /**
     * Returnt den Gebäudeumriss als Liste von LatitudeLongitude Objekten
     * @return Liste LatitudeLongitude
     * @throws Exception Falls beim konvertieren ein Fehler auftritt
     */
    public ArrayList<LatitudeLongitude> getRt_geomAsLatlng() throws Exception{
        return GeometryConverter.geometryToLatLngArray(25833, rt_geom);
    }

    /**
     * Returnt das Geometryobjekt für den Gebäudeumriss
     * @param rt_geom Geometry Umriss
     */
    public void setRt_geom(Geometry rt_geom) {
        this.rt_geom = rt_geom;
    }
}
