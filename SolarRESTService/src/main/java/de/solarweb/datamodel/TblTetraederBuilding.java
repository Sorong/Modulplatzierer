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
     *
     * @return
     */
    public int getGid() {
        return gid;
    }

    public void setGid(int gid) {
        this.gid = gid;
    }

    public String getGmild() {
        return gmild;
    }

    public void setGmild(String gmild) {
        this.gmild = gmild;
    }

    public String getNr() {
        return nr;
    }

    public void setNr(String nr) {
        this.nr = nr;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public double getPlz() {
        return plz;
    }

    public void setPlz(double plz) {
        this.plz = plz;
    }

    public int getHid() {
        return hid;
    }

    public void setHid(int hid) {
        this.hid = hid;
    }

    public String getOrt() {
        return ort;
    }

    public void setOrt(String ort) {
        this.ort = ort;
    }

    public Geometry getThe_geom() {
        return the_geom;
    }

    public ArrayList<LatitudeLongitude> getThe_geomAsLatlng() throws Exception{
        return GeometryConverter.geometryToLatLngArray(25833, the_geom);
    }

    public void setThe_geom(Geometry geometry) {
        this.the_geom = geometry;
    }

    public String getZusatz() {
        return zusatz;
    }

    public void setZusatz(String zusatz) {
        this.zusatz = zusatz;
    }

    public boolean isDenkmal() {
        return denkmal;
    }

    public void setDenkmal(boolean denkmal) {
        this.denkmal = denkmal;
    }

    public String getDenkmali() {
        return denkmali;
    }

    public void setDenkmali(String denkmali) {
        this.denkmali = denkmali;
    }

    public String getMonument_reason() {
        return monument_reason;
    }

    public void setMonument_reason(String text) {
        this.monument_reason = text;
    }

    public double getArea2d() {
        return area2d;
    }

    public void setArea2d(double area2d) {
        this.area2d = area2d;
    }

    public double getArea3d() {
        return area3d;
    }

    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    public int getPv() {
        return pv;
    }

    public void setPv(int pv) {
        this.pv = pv;
    }

    public int getSt() {
        return st;
    }

    public void setSt(int st) {
        this.st = st;
    }

    public Integer getGd() {
        return gd;
    }

    public void setGd(Integer gd) {
        this.gd = gd;
    }

    public int getDoneby() {
        return doneby;
    }

    public void setDoneby(int doneby) {
        this.doneby = doneby;
    }

    public double getCalctime() {
        return calctime;
    }

    public void setCalctime(double calctime) {
        this.calctime = calctime;
    }

    public Integer getQhint() {
        return qhint;
    }

    public void setQhint(Integer qhint) {
        this.qhint = qhint;
    }

    public int getHousehold_size() {
        return household_size;
    }

    public void setHousehold_size(int household_size) {
        this.household_size = household_size;
    }

    public double getGd_area() {
        return gd_area;
    }

    public void setGd_area(double gd_area) {
        this.gd_area = gd_area;
    }

    public int getRueckhalt() {
        return rueckhalt;
    }

    public void setRueckhalt(int rueckhalt) {
        this.rueckhalt = rueckhalt;
    }

    public Geometry getRt_geom() {
        return rt_geom;
    }

    public ArrayList<LatitudeLongitude> getRt_geomAsLatlng() throws Exception{
        return GeometryConverter.geometryToLatLngArray(25833, rt_geom);
    }

    public void setRt_geom(Geometry rt_geom) {
        this.rt_geom = rt_geom;
    }
}
