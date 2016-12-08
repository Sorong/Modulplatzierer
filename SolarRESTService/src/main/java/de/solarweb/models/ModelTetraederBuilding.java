package de.solarweb.models;

import de.solarweb.datamodel.TblTetraederBuilding;
import de.solarweb.de.soalarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by Nils on 06.12.16.
 */
public class ModelTetraederBuilding implements Serializable {

    private int gid;
    private String gmlid;
    private String nr;
    private String street;
    private String number;
    private double plz;
    private Integer hid;
    private String ort;
    private String zusatz;
    private boolean denkmal;
    private String denkmali;
    private String monument_reason;
    private double area2d;
    private double area3d;
    private int pv;
    private int st;
    private Integer gd;
    private int doneby;
    private double calctime;
    private Integer qhint;
    private int household_size;
    private double gd_area;
    private int rueckhalt;
    private ArrayList<LatitudeLongitude> the_geom;
    private ArrayList<LatitudeLongitude> rt_geom;

    public ModelTetraederBuilding(){

    }

    public ModelTetraederBuilding(TblTetraederBuilding tblTetraederBuilding) throws Exception{
        this.the_geom = tblTetraederBuilding.getThe_geomAsLatlng();
        this.rt_geom = tblTetraederBuilding.getRt_geomAsLatlng();
        this.gid = tblTetraederBuilding.getGid();
        this.gmlid = tblTetraederBuilding.getGmild();
        this.nr = tblTetraederBuilding.getNr();
        this.street = tblTetraederBuilding.getStreet();
        this.number = tblTetraederBuilding.getNumber();
        this.plz = tblTetraederBuilding.getPlz();
        this.hid = tblTetraederBuilding.getHid();
        this.ort = tblTetraederBuilding.getOrt();
        this.zusatz = tblTetraederBuilding.getZusatz();
        this.denkmal = tblTetraederBuilding.isDenkmal();
        this.denkmali = tblTetraederBuilding.getDenkmali();
        this.monument_reason = tblTetraederBuilding.getMonument_reason();
        this.area2d = tblTetraederBuilding.getArea2d();
        this.area3d = tblTetraederBuilding.getArea3d();
        this.pv = tblTetraederBuilding.getPv();
        this.st = tblTetraederBuilding.getSt();
        this.gd = tblTetraederBuilding.getGd();
        this.doneby = tblTetraederBuilding.getDoneby();
        this.calctime = tblTetraederBuilding.getCalctime();
        this.household_size = tblTetraederBuilding.getHousehold_size();
        this.gd_area = tblTetraederBuilding.getGd_area();
        this.rueckhalt = tblTetraederBuilding.getRueckhalt();

    }

    public int getGid() {
        return gid;
    }

    public void setGid(int gid) {
        this.gid = gid;
    }

    public String getGmlid() {
        return gmlid;
    }

    public void setGmlid(String gmlid) {
        this.gmlid = gmlid;
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

    public void setMonument_reason(String monument_reason) {
        this.monument_reason = monument_reason;
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

    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }

    public ArrayList<LatitudeLongitude> getRt_geom() {
        return rt_geom;
    }

    public void setRt_geom(ArrayList<LatitudeLongitude> rt_geom) {
        this.rt_geom = rt_geom;
    }
}
