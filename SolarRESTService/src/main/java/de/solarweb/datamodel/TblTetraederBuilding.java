package de.solarweb.datamodel;

import com.vividsolutions.jts.geom.Geometry;
import de.solarweb.de.soalarweb.helper.GeometryConverter;
import de.solarweb.de.soalarweb.helper.LatitudeLongitude;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by Nils on 26.11.16.
 */
@Entity
@Table(name = "berlin_fh_bielefeld_buildings")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "tblTetraederBuilding.findAll", query = "SELECT t FROM TblTetraederBuilding t"),
        @NamedQuery(name = "tblTetraederBuildings.findByAddress", query = "SELECT t FROM TblTetraederBuilding t WHERE t.street = ?0 AND t.number = ?1 AND t.plz = ?2")
})
public class TblTetraederBuilding implements Serializable{

    @Id
    @Basic
    @Column(name = "gid")
    private int gid;

    @Basic
    @Column(name = "gmlid")
    private String gmild;

    @Basic
    @Column(name = "nr")
    private String nr;

    @Basic
    @Column(name = "street")
    private String street;

    @Basic
    @Column(name = "number")
    private String number;

    @Basic
    @Column(name = "plz")
    private double plz;

    @Basic
    @Column(name = "hid")
    private Integer hid;

    @Basic
    @Column(name = "ort")
    private String ort;

    @Basic
    @Column(name = "the_geom")
    private Geometry the_geom;

    @Basic
    @Column(name = "zusatz")
    private String zusatz;


    @Basic
    @Column(name = "denkmal")
    private boolean denkmal;

    @Basic
    @Column(name = "denkmali")
    private String denkmali;

    @Basic
    @Column(name = "monument_reason")
    private String monument_reason;

    @Basic
    @Column(name = "area2d")
    private double area2d;

    @Basic
    @Column(name = "area3d")
    private double area3d;

    @Basic
    @Column(name = "pv")
    private int pv;

    @Basic
    @Column(name = "st")
    private int st;

    @Basic
    @Column(name = "gd")
    private Integer gd;

    @Basic
    @Column(name = "doneby")
    private int doneby;

    @Basic
    @Column(name= "calctime")
    private double calctime;

    @Basic
    @Column(name = "qhint")
    private Integer qhint;

    @Basic
    @Column(name = "household_size")
    private int household_size;

    @Basic
    @Column(name = "gd_area")
    private double gd_area;

    @Basic
    @Column(name = "rueckhalt")
    private int rueckhalt;

    @Basic
    @Column(name = "rt_geom")
    private Geometry rt_geom;

    public TblTetraederBuilding()
    {

    }

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
        GeometryConverter converter = new GeometryConverter();
        return converter.convertGeometry(25833, the_geom);
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
        GeometryConverter converter = new GeometryConverter();
        return converter.convertGeometry(25833, rt_geom);
    }

    public void setRt_geom(Geometry rt_geom) {
        this.rt_geom = rt_geom;
    }
}
