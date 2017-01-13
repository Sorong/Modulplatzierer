package de.solarweb.models;

import de.solarweb.datamodel.TblTetraederBuilding;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by Nils on 06.12.16.
 */
public class ModelTetraederBuilding implements Serializable {

    /**
     * gid des Gebäudes
     */
    private int gid;

    /**
     * gmild des Gebäudes
     */
    private String gmlid;

    /**
     * nr des Gebäudes
     */
    private String nr;

    /**
     * Strasse des Gebäudes
     */
    private String street;

    /**
     * Hausnummer des Gebäudes
     */
    private String number;

    /**
     * Postleitzahl des Gebäudes
     */
    private double plz;

    /**
     * hid (Eindeutige Gebäudenummer) des Gebäudes
     */
    private Integer hid;

    /**
     * Ort des Gebäudes
     */
    private String ort;

    /** Zusätzliche Information des Gebäudes
     *
     */
    private String zusatz;

    /**
     * Gibt an ob das Gebäude denkmalgeschützt ist
     */
    private boolean denkmal;

    /**
     * Denkmalinformationen des Gebäudes
     */
    private String denkmali;

    /**
     * monument_reason des Gebäudes
     */
    private String monument_reason;

    /**
     * Area2D Fläche des Gebäudes
     */
    private double area2d;

    /**
     * Area3D Fläche des Gebäudes
     */
    private double area3d;

    /**
     * Eignung des Gebäudes für Photovoltaik
     */
    private int pv;

    /**
     * Eignung des Gebäudes fü Solarthermie
     */
    private int st;

    /**
     * gd des Gebäudes
     */
    private Integer gd;

    /**
     * ID des Erstellers des Gebäudes?
     */
    private int doneby;

    /**
     * Zeit zur Erstellung des Gebäudes
     */
    private double calctime;

    /**
     * qhint des Gebäudes
     */
    private Integer qhint;

    /**
     * Familienmitglieder des Haushalt
     */
    private int household_size;

    /**
     * gd_area des Gebäudes
     */
    private double gd_area;

    /**
     * Rückhalt des Gebäudes
     */
    private int rueckhalt;

    /**
     * Vertices des Gebäude als Latidue/Longietude Liste
     */
    private ArrayList<LatitudeLongitude> the_geom;

    /**
     * Vertices des Gebäude als Latidue/Longietude Liste
     */
    private ArrayList<LatitudeLongitude> rt_geom;

    /**
     * Standartkonstruktor zur Serialisierung
     */
    public ModelTetraederBuilding(){

    }

    /**
     * /**
     * Der vom Restserver genutzt Konstruktor. Wrappt das JPA Objekt TblTetraederBuilding in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblTetraederBuilding JPAObjekt
     * @throws Exception
     */
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

    /**
     * Returnt die gid des Gebäudes
     * @return gid
     */
    public int getGid() {
        return gid;
    }

    /**
     * Setzt die gid des Gebäudes
     * @param gid
     */
    public void setGid(int gid) {
        this.gid = gid;
    }

    /**
     * Returnt die gmlid des Gebäudes
     * @return gmlid
     */
    public String getGmlid() {
        return gmlid;
    }

    /**
     * Setzt die gmlid des Gebäudes
     * @param gmlid
     */
    public void setGmlid(String gmlid) {
        this.gmlid = gmlid;
    }

    /**
     * Retrunt die nr des Gebäudes
     * @return nr
     */
    public String getNr() {
        return nr;
    }

    /**
     * Setzt die nr des Gebäudes
     * @param nr
     */
    public void setNr(String nr) {
        this.nr = nr;
    }

    /**
     * Returnt die Strasse des Gebäudes
     * @return street
     */
    public String getStreet() {
        return street;
    }

    /**
     * Setzt die Strasse des Gebäudes
     * @param street
     */
    public void setStreet(String street) {
        this.street = street;
    }

    /**
     * Returnt die Hausnummer des Gebäudes
     * @return number
     */
    public String getNumber() {
        return number;
    }

    /**
     * Setzt die Hausnummer des Gebäudes
     * @param number
     */
    public void setNumber(String number) {
        this.number = number;
    }

    /**
     * Returnt die Postleitzahl des Gebäudes
     * @return
     */
    public double getPlz() {
        return plz;
    }

    /**
     * Setzt die Postleitzahl des Gebäudes
     * @param plz
     */
    public void setPlz(double plz) {
        this.plz = plz;
    }

    /**
     * Returnt die hid des Gebäudes
     * @return hid
     */
    public int getHid() {
        return hid;
    }

    /**
     * Setzt die hid des Gebäudes
     * @param hid
     */
    public void setHid(int hid) {
        this.hid = hid;
    }

    /**
     * Returnt den Ort des Gebäudes
     * @return ort
     */
    public String getOrt() {
        return ort;
    }

    /**
     * Setzt den Ort des Gebäudes
     * @param ort
     */
    public void setOrt(String ort) {
        this.ort = ort;
    }

    /**
     * Returnt Zusatzdaten des Gebäudes
     * @return zusatz
     */
    public String getZusatz() {
        return zusatz;
    }

    /**
     * Setzt Zusatzdaten des Gebäudes
     * @param zusatz
     */
    public void setZusatz(String zusatz) {
        this.zusatz = zusatz;
    }

    /**
     * Gibt an, ob das Gebäude ein Denkmal ist
     * @return denkmal
     */
    public boolean isDenkmal() {
        return denkmal;
    }

    /**
     * Markiert das Gebäude ein Denkmal ist
     * @param denkmal
     */
    public void setDenkmal(boolean denkmal) {
        this.denkmal = denkmal;
    }

    /**
     * Returnt Zusatzinformationen zum Denkmalschutzt
     * @return denkmali
     */
    public String getDenkmali() {
        return denkmali;
    }

    /**
     * Setzt Zusatzinformationen zum Denkmalschutzt
     * @param denkmali
     */
    public void setDenkmali(String denkmali) {
        this.denkmali = denkmali;
    }

    /**
     * Returnt monument_reason des Gebäudes
     * @return monument_reason
     */
    public String getMonument_reason() {
        return monument_reason;
    }

    /**
     * Setzt monumnet_reason des Gebäudes
     * @param monument_reason
     */
    public void setMonument_reason(String monument_reason) {
        this.monument_reason = monument_reason;
    }

    /**
     * Returnt die area2d des Gebäudes
     * @return area2d
     */
    public double getArea2d() {
        return area2d;
    }

    /**
     * Setzt die area2d des Gebäudes
     * @param area2d
     */
    public void setArea2d(double area2d) {
        this.area2d = area2d;
    }

    /**
     * Returnt die area3d des Gebäudes
     * @return area3d
     */
    public double getArea3d() {
        return area3d;
    }

    /**
     * Setzt die area3d des Gebäudes
     * @param area3d
     */
    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    /**
     * Returnt die pv des Gebäudes
     * @return pv
     */
    public int getPv() {
        return pv;
    }

    /**
     * Setzt die pv des Gebäudes
     * @param pv
     */
    public void setPv(int pv) {
        this.pv = pv;
    }

    /**
     * Returnt die st des Gebäudes
     * @return st
     */
    public int getSt() {
        return st;
    }

    /**
     * Setzt die st des Gebäudes
     * @param st
     */
    public void setSt(int st) {
        this.st = st;
    }

    /**
     * Returnt die gd des Gebäudes
     * @return gd
     */
    public Integer getGd() {
        return gd;
    }

    /**
     * Setzt die gd des Gebäudes
     * @param gd
     */
    public void setGd(Integer gd) {
        this.gd = gd;
    }

    /**
     * Returnt die doneby ID des Gebäudes
     * @return doneby
     */
    public int getDoneby() {
        return doneby;
    }

    /**
     * Setzt die doneby ID des Gebäudes
     * @param doneby
     */
    public void setDoneby(int doneby) {
        this.doneby = doneby;
    }

    /**
     * Returnt die Calculationszeit des Gebäudes
     * @return calctime
     */
    public double getCalctime() {
        return calctime;
    }

    /**
     * Setzt die Calculationszeit des Gebäudes
     * @param calctime
     */
    public void setCalctime(double calctime) {
        this.calctime = calctime;
    }

    /**
     * Retunrt den qhint des Gebäudes
     * @return qhint
     */
    public Integer getQhint() {
        return qhint;
    }

    /**
     * Setzt den qhint des Gebäudes
     * @param qhint
     */
    public void setQhint(Integer qhint) {
        this.qhint = qhint;
    }

    /**
     * Returnt die Haushaltsgröße des Gebäudes
     * @return household_size
     */
    public int getHousehold_size() {
        return household_size;
    }

    /**
     * Setzt die Haushaltsgröße des Gebäudes
     * @param household_size
     */
    public void setHousehold_size(int household_size) {
        this.household_size = household_size;
    }

    /**
     * Returnt die gd_area des Gebäudes
     * @return gd_area
     */
    public double getGd_area() {
        return gd_area;
    }

    /**
     * Setzt die gd_area des Gebäudes
     * @param gd_area
     */
    public void setGd_area(double gd_area) {
        this.gd_area = gd_area;
    }

    /**
     * Returnt den Rückhalt des Gebäudes
     * @return rueckhalt
     */
    public int getRueckhalt() {
        return rueckhalt;
    }

    /**
     * Setzt den Rückhalt des Gebäudes
     * @param rueckhalt
     */
    public void setRueckhalt(int rueckhalt) {
        this.rueckhalt = rueckhalt;
    }

    /**
     * Returnt die ArrayList mit den Latitude/Longitude Koordinaten
     * @return the_geom
     */
    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt die ArrayList mit den Latitude/Longitude Koordinaten
     * @param the_geom
     */
    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }

    /**
     * Returnt die ArrayList mit den Latitude/Longitude Koordinaten
     * @return rt_geom
     */
    public ArrayList<LatitudeLongitude> getRt_geom() {
        return rt_geom;
    }

    /**
     * Setzt die ArrayList mit den Latitude/Longitude Koordinaten
     * @param rt_geom
     */
    public void setRt_geom(ArrayList<LatitudeLongitude> rt_geom) {
        this.rt_geom = rt_geom;
    }
}
