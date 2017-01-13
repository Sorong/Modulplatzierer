package de.solarweb.models;

import de.solarweb.datamodel.TblTetraederRoof;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by Nils on 08.12.16.
 */
public class ModelTetraederRoof implements Serializable{

    /**
     * gid des Dachteils
     */
    private int gid;

    /**
     * ID des Gebäudes zum Dachteil
     */
    private int building_id;

    /**
     * uid des Dachteils
     */
    private Integer uid;

    /**
     * cid des Dachteils
     */
    private int cid;

    /**
     * Flächeninhalt des Dachteils
     */
    private double area3d;

    /**
     * Globale Beleuchtung des Dachteils
     */
    private double global;

    /**
     * Diffuse Beleuchtung des Dachteils
     */
    private double diffuse;

    /**
     * Direkte Beleuchtung des Dachteils
     */
    private double direct;

    /**
     * Ertrag des Dachteils in kiloWatt
     */
    private double kwhpa;

    /**
     * Starker Schatten auf dem Dachteil
     */
    private boolean strongshadow;

    /**
     * directu des Dachteils
     */
    private Double directu;

    /**
     * nearbyLoss des Dachteils
     */
    private Double nearbyLoss;

    /**
     * distanceLoss des Dachteils
     */
    private Double distanceLoss;

    /**
     * Neigung des Dachteils
     */
    private double tilt;

    /**
     * Verhältnis des Dachteils
     */
    private double aspect;

    /**
     * nx des Dachteils
     */
    private double nx;

    /**
     * ny des Dachteils
     */
    private double ny;

    /**
     * nz des Dachteils
     */
    private double nz;

    /**
     * Eignung für Photovoltaik des Dachteils
     */
    private int pv;

    /**
     * Eignung für Solartermie des Dachteils
     */
    private int st;

    /**
     * gd des Dachteils
     */
    private Integer gd;

    /**
     * Ob Dachteil flach
     */
    private boolean flat;

    /**
     * Anzahl Panele des Dachteils
     */
    private Integer mp_panelnumber;

    /**
     * Vertices das Dachteiles in Latitude/Longitude
     */
    private ArrayList<LatitudeLongitude> the_geom;

    /**
     * planep des Dachteils
     */
    private LatitudeLongitude planep;

    /**
     * kwpha des Dachteils
     */
    private Double kwpha;

    /**
     * planp des Dachteils
     */
    private String planp;

    /**
     * Standartkonstruktor zur Serialisierung
     */
    public ModelTetraederRoof(){

    }

    /**
     * Der vom Restserver genutzt Konstruktor. Wrappt das JPA Objekt TblTetraederBuilding in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblTetraederRoof JPAObjekt
     */
    public ModelTetraederRoof(TblTetraederRoof tblTetraederRoof) throws Exception{
        this.gid = tblTetraederRoof.getGid();
        this.building_id = tblTetraederRoof.getBuilding_id();
        this.uid = tblTetraederRoof.getUid();
        this.cid = tblTetraederRoof.getCid();
        this.area3d = tblTetraederRoof.getArea3d();
        this.global = tblTetraederRoof.getGlobal();
        this.diffuse = tblTetraederRoof.getDiffuse();
        this.direct = tblTetraederRoof.getDirect();
        this.kwhpa = tblTetraederRoof.getKwhpa();
        this.strongshadow = tblTetraederRoof.isStrongshadow();
        this.directu = tblTetraederRoof.getDirectu();
        this.nearbyLoss = tblTetraederRoof.getNearby_loss();
        this.distanceLoss = tblTetraederRoof.getDistance_loss();
        this.tilt = tblTetraederRoof.getTilt();
        this.aspect = tblTetraederRoof.getAspect();
        this.nx = tblTetraederRoof.getNx();
        this.ny = tblTetraederRoof.getNy();
        this.nz = tblTetraederRoof.getNz();
        this.pv = tblTetraederRoof.getPv();
        this.gd = tblTetraederRoof.getGd();
        this.st = tblTetraederRoof.getSt();
        this.flat = tblTetraederRoof.isFlat();
        this.mp_panelnumber = tblTetraederRoof.getMp_panelnumber();
        this.the_geom = tblTetraederRoof.getThe_geomAsLatlng();
        this.kwpha = tblTetraederRoof.getKwpha();
        this.planp = tblTetraederRoof.getPlanp();
        this.planep = null;
    }

    /**
     * Returnt die gid des Dachteils
     * @return gid
     */
    public int getGid() {
        return gid;
    }

    /**
     * Setzt die gid des Tachteils
     * @param gid Zu setzende gid
     */
    public void setGid(int gid) {
        this.gid = gid;
    }

    /**
     * Returnt die building_id des Dachteils
     * @return building_id
     */
    public int getBuilding_id() {
        return building_id;
    }

    /**
     * Setzt die building_id des Dachteils
     * @param building_id building_id
     */
    public void setBuilding_id(int building_id) {
        this.building_id = building_id;
    }

    /**
     * Returnt die uid des Dachteils
     * @return uid
     */
    public Integer getUid() {
        return uid;
    }

    /**
     * Setzt die uid des Dachteils
     * @param uid uid
     */
    public void setUid(Integer uid) {
        this.uid = uid;
    }

    /**
     * Returnt die cid des Dachteils
     * @return cid
     */
    public int getCid() {
        return cid;
    }

    /**
     * Setzt die cid des Dachteils
     * @param cid cid
     */
    public void setCid(int cid) {
        this.cid = cid;
    }

    /**
     * Returnt die area3d des Dachteils
     * @return area3d
     */
    public double getArea3d() {
        return area3d;
    }

    /**
     * Setzt die area3d des Dachteils
     * @param area3d area3d
     */
    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    /**
     * Returnt die global des Dachteils
     * @return global
     */
    public double getGlobal() {
        return global;
    }

    /**
     * Setzt die global des Dachteils
     * @param global global
     */
    public void setGlobal(double global) {
        this.global = global;
    }

    /**
     * Returnt die diffuse des Dachteils
     * @return diffuse
     */
    public double getDiffuse() {
        return diffuse;
    }

    /**
     * Setzt die diffuse des Dachteils
     * @param diffuse diffuse
     */
    public void setDiffuse(double diffuse) {
        this.diffuse = diffuse;
    }

    /**
     * Returnt die kwhpa des Dachteils
     * @return kwhpa
     */
    public double getKwhpa() {
        return kwhpa;
    }

    /**
     * Setzt die kwhpa des Dachteils
     * @param kwhpa kwhpa
     */
    public void setKwhpa(double kwhpa) {
        this.kwhpa = kwhpa;
    }

    /**
     * Gibt an ob es einen strongshadow gibt
     * @return strongshadow
     */
    public boolean isStrongshadow() {
        return strongshadow;
    }

    /**
     * Setzt den strongshadow im Dachteil
     * @param strongshadow strongshadow
     */
    public void setStrongshadow(boolean strongshadow) {
        this.strongshadow = strongshadow;
    }

    /**
     * Returnt den direct des Dachteils
     * @return directu
     */
    public Double getDirectu() {
        return directu;
    }

    /**
     * Setzt den directu des Dachteils
     * @param directu directu
     */
    public void setDirectu(Double directu) {
        this.directu = directu;
    }

    /**
     * Returnt den nearbyLoss des Dachteils
     * @return nearbyLoss
     */
    public Double getNearbyLoss() {
        return nearbyLoss;
    }

    /**
     * Setzt den nearbyLoss des Dachteils
     * @param nearbyLoss nearbyLoss
     */
    public void setNearbyLoss(Double nearbyLoss) {
        this.nearbyLoss = nearbyLoss;
    }

    /**
     * Returnt den distanceLoss des Dachteils
     * @return distanceLoss
     */
    public Double getDistanceLoss() {
        return distanceLoss;
    }

    /**
     * Setzt die distanceLoss des Dachteils
     * @param distanceLoss distanceLoss
     */
    public void setDistanceLoss(Double distanceLoss) {
        this.distanceLoss = distanceLoss;
    }

    /**
     * Returnt den tilt des Dachteils
     * @return tilt
     */
    public double getTilt() {
        return tilt;
    }

    /**
     * Setzt den tilt des Dachteils
     * @param tilt tilt
     */
    public void setTilt(double tilt) {
        this.tilt = tilt;
    }

    /**
     * Returnt den aspect des Dachteils
     * @return aspect
     */
    public double getAspect() {
        return aspect;
    }

    /**
     * Setzt den aspect des Dachteils
     * @param aspect aspect
     */
    public void setAspect(double aspect) {
        this.aspect = aspect;
    }

    /**
     * Returnt den nx des Dachteils
     * @return nx
     */
    public double getNx() {
        return nx;
    }

    /**
     * Setzt den nx des Dachteils
     * @param nx nx
     */
    public void setNx(double nx) {
        this.nx = nx;
    }

    /**
     * Returnt den ny des Dachteils
     * @return ny
     */
    public double getNy() {
        return ny;
    }

    /**
     * Setzt den ny des Dachteils
     * @param ny ny
     */
    public void setNy(double ny) {
        this.ny = ny;
    }

    /**
     * Returnt den nz des Dachteisl
     * @return nz
     */
    public double getNz() {
        return nz;
    }

    /**
     * Setzt den nz des Dachteils
     * @param nz nz
     */
    public void setNz(double nz) {
        this.nz = nz;
    }

    /**
     * Returnt den pv des Dachteils
     * @return pv
     */
    public int getPv() {
        return pv;
    }

    /**
     * Setzt den pv des Dachteils
     * @param pv pv
     */
    public void setPv(int pv) {
        this.pv = pv;
    }

    public int getSt() {
        return st;
    }

    public void setSt(int st) {
        this.st = st;
    }

    public boolean isFlat() {
        return flat;
    }

    public Integer getGd() {
        return gd;
    }

    public void setGd(Integer gd) {
        this.gd = gd;
    }

    public void setFlat(boolean flat) {
        this.flat = flat;
    }

    public Integer getMp_panelnumber() {
        return mp_panelnumber;
    }

    public void setMp_panelnumber(Integer mp_panelnumber) {
        this.mp_panelnumber = mp_panelnumber;
    }

    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }

    public LatitudeLongitude getPlanep() {
        return planep;
    }

    public void setPlanep(LatitudeLongitude planep) {
        this.planep = planep;
    }

    public Double getKwpha() {
        return kwpha;
    }

    public void setKwpha(Double kwpha) {
        this.kwpha = kwpha;
    }

    public String getPlanp() {
        return planp;
    }

    public void setPlanp(String planp) {
        this.planp = planp;
    }

    public double getDirect() {
        return direct;
    }

    public void setDirect(double direct) {
        this.direct = direct;
    }
}
