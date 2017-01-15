package de.solarweb.models;

import de.solarweb.datamodel.TblTetraederBuilding;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Model, welches vom Restserver als TetraederBuilding Model übergeben wird
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
     * Vertices des Gebäude als LatidueLongitude Liste
     */
    private ArrayList<LatitudeLongitude> the_geom;

    /**
     * Vertices des Gebäude als LatidueLongitude Liste
     */
    private ArrayList<LatitudeLongitude> rt_geom;

    /**
     * Standardkonstruktor zur Serialisierung
     */
    public ModelTetraederBuilding(){

    }

    /**
     * /**
     * Der vom Restserver genutzt Konstruktor. Wrappt das Entitie Objekt TblTetraederBuilding in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblTetraederBuilding Entitie Objekt
     * @throws Exception Falls Geometry Objekt nicht geparset werden konnte
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
     * @return Gid des Gebäudes
     */
    public int getGid() {
        return gid;
    }

    /**
     * Setzt die gid des Gebäudes
     * @param gid Gid des Gebäudes
     */
    public void setGid(int gid) {
        this.gid = gid;
    }

    /**
     * Returnt die gmlid des Gebäudes
     * @return Gmlid des Gebäudes
     */
    public String getGmlid() {
        return gmlid;
    }

    /**
     * Setzt die gmlid des Gebäudes
     * @param gmlid Gmild des Gebäudes
     */
    public void setGmlid(String gmlid) {
        this.gmlid = gmlid;
    }

    /**
     * Retrunt die nr des Gebäudes
     * @return Nr des Gebäudes
     */
    public String getNr() {
        return nr;
    }

    /**
     * Setzt die nr des Gebäudes
     * @param nr Nr des Gebäudes
     */
    public void setNr(String nr) {
        this.nr = nr;
    }

    /**
     * Returnt die Strasse des Gebäudes
     * @return Strasse des Gebäudes
     */
    public String getStreet() {
        return street;
    }

    /**
     * Setzt die Strasse des Gebäudes
     * @param street Strasse des Gebäudes
     */
    public void setStreet(String street) {
        this.street = street;
    }

    /**
     * Returnt die Hausnummer des Gebäudes
     * @return number Hausnummer des Gebäudes
     */
    public String getNumber() {
        return number;
    }

    /**
     * Setzt die Hausnummer des Gebäudes
     * @param number Hausnummer des Gebäudes
     */
    public void setNumber(String number) {
        this.number = number;
    }

    /**
     * Returnt die Postleitzahl des Gebäudes
     * @return Postleitzahle des Gebäudes
     */
    public double getPlz() {
        return plz;
    }

    /**
     * Setzt die Postleitzahl des Gebäudes
     * @param plz Postleitzahl des Gebäudes
     */
    public void setPlz(double plz) {
        this.plz = plz;
    }

    /**
     * Returnt die hid des Gebäudes
     * @return Hid des Gebäudes
     */
    public int getHid() {
        return hid;
    }

    /**
     * Setzt die hid des Gebäudes
     * @param hid Hid des Gebäudes
     */
    public void setHid(int hid) {
        this.hid = hid;
    }

    /**
     * Returnt den Ort des Gebäudes
     * @return Ort des Gebäudes
     */
    public String getOrt() {
        return ort;
    }

    /**
     * Setzt den Ort des Gebäudes
     * @param ort Ort des Gebäudes
     */
    public void setOrt(String ort) {
        this.ort = ort;
    }

    /**
     * Returnt Zusatzdaten des Gebäudes
     * @return Zusatzdaten des Gebäudes
     */
    public String getZusatz() {
        return zusatz;
    }

    /**
     * Setzt Zusatzdaten des Gebäudes
     * @param zusatz Zusatzdaten des Gebäudes
     */
    public void setZusatz(String zusatz) {
        this.zusatz = zusatz;
    }

    /**
     * Gibt an, ob das Gebäude ein Denkmal ist
     * @return Ob Gebäude ein Denkmal
     */
    public boolean isDenkmal() {
        return denkmal;
    }

    /**
     * Markiert das Gebäude ein Denkmal ist
     * @param denkmal Ob Gebäude ein Denkmal
     */
    public void setDenkmal(boolean denkmal) {
        this.denkmal = denkmal;
    }

    /**
     * Returnt Zusatzinformationen zum Denkmalschutzt
     * @return Zusatzinformationen zum Denkmal
     */
    public String getDenkmali() {
        return denkmali;
    }

    /**
     * Setzt Zusatzinformationen zum Denkmalschutzt
     * @param denkmali Zusatzinformationen zum Denkmal
     */
    public void setDenkmali(String denkmali) {
        this.denkmali = denkmali;
    }

    /**
     * Returnt monument_reason des Gebäudes
     * @return Monument_reason des Gebäudes
     */
    public String getMonument_reason() {
        return monument_reason;
    }

    /**
     * Setzt monumnet_reason des Gebäudes
     * @param monument_reason Monument_reason des Gebäudes
     */
    public void setMonument_reason(String monument_reason) {
        this.monument_reason = monument_reason;
    }

    /**
     * Returnt die area2d des Gebäudes
     * @return Area2d des Gebäudes
     */
    public double getArea2d() {
        return area2d;
    }

    /**
     * Setzt die area2d des Gebäudes
     * @param area2d Area2d des Gebäudes
     */
    public void setArea2d(double area2d) {
        this.area2d = area2d;
    }

    /**
     * Returnt die area3d des Gebäudes
     * @return Area3d des Gebäudes
     */
    public double getArea3d() {
        return area3d;
    }

    /**
     * Setzt die area3d des Gebäudes
     * @param area3d Area3d des Gebäudes
     */
    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    /**
     * Returnt die Eignung für Photovolataik des Gebäudes
     * @return Eignung Photovolaik
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
     * Returnt die Eignung für Solarthermie des Gebäudes
     * @return Eignung Solarthermie
     */
    public int getSt() {
        return st;
    }

    /**
     * Setzt die Eignung für Solartherime des Gebäudes
     * @param st Eignung Solarthermie
     */
    public void setSt(int st) {
        this.st = st;
    }

    /**
     * Returnt die gd des Gebäudes
     * @return Gd des Gebäudes
     */
    public Integer getGd() {
        return gd;
    }

    /**
     * Setzt die gd des Gebäudes
     * @param gd Gd des Gebäudes
     */
    public void setGd(Integer gd) {
        this.gd = gd;
    }

    /**
     * Returnt die doneby ID des Gebäudes
     * @return Doneby ID des Gebäudes
     */
    public int getDoneby() {
        return doneby;
    }

    /**
     * Setzt die doneby ID des Gebäudes
     * @param doneby Doneby ID des Gebäudes
     */
    public void setDoneby(int doneby) {
        this.doneby = doneby;
    }

    /**
     * Returnt die Kalkulationszeit des Gebäudes
     * @return Kalkulationszeit des Gebäudes
     */
    public double getCalctime() {
        return calctime;
    }

    /**
     * Setzt die Kalkulationszeit des Gebäudes
     * @param calctime Kalkulationszeit des Gebäudes
     */
    public void setCalctime(double calctime) {
        this.calctime = calctime;
    }

    /**
     * Retunrt den qhint des Gebäudes
     * @return Qhint des Gebäudes
     */
    public Integer getQhint() {
        return qhint;
    }

    /**
     * Setzt den qhint des Gebäudes
     * @param qhint Qhint des Gebäudes
     */
    public void setQhint(Integer qhint) {
        this.qhint = qhint;
    }

    /**
     * Returnt die Haushaltsgröße des Gebäudes
     * @return Household_size des Gebäudes
     */
    public int getHousehold_size() {
        return household_size;
    }

    /**
     * Setzt die Haushaltsgröße des Gebäudes
     * @param household_size Haushaltsgröße des Gebäudes
     */
    public void setHousehold_size(int household_size) {
        this.household_size = household_size;
    }

    /**
     * Returnt die gd_area des Gebäudes
     * @return Gd_area des Gebäudes
     */
    public double getGd_area() {
        return gd_area;
    }

    /**
     * Setzt die gd_area des Gebäudes
     * @param gd_area Gd_area des Gebäudes
     */
    public void setGd_area(double gd_area) {
        this.gd_area = gd_area;
    }

    /**
     * Returnt den Rückhalt des Gebäudes
     * @return Rueckhalt des Gebäudes
     */
    public int getRueckhalt() {
        return rueckhalt;
    }

    /**
     * Setzt den Rückhalt des Gebäudes
     * @param rueckhalt Rueckhalt des Gebäudes
     */
    public void setRueckhalt(int rueckhalt) {
        this.rueckhalt = rueckhalt;
    }

    /**
     * Returnt die ArrayList mit den LatitudeLongitude Koordinaten
     * @return Liste mit LatitudeLongitude Objekten
     */
    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt die ArrayList mit den LatitudeLongitude Koordinaten
     * @param the_geom Liste mit LatitudeLongitue Objekten
     */
    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }

    /**
     * Returnt die ArrayList mit den LatitudeLongitude Koordinaten
     * @return Liste mit LatitudeLongitude Objekten
     */
    public ArrayList<LatitudeLongitude> getRt_geom() {
        return rt_geom;
    }

    /**
     * Setzt die ArrayList mit den Latitude/Longitude Koordinaten
     * @param rt_geom Liste mit LatitudeLongitude Objekten
     */
    public void setRt_geom(ArrayList<LatitudeLongitude> rt_geom) {
        this.rt_geom = rt_geom;
    }
}
