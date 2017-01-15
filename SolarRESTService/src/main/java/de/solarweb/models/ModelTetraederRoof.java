package de.solarweb.models;

import de.solarweb.datamodel.TblTetraederRoof;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Model, welches vom Restserver als TetraederRoof Model übergeben wird
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
     * Standardkonstruktor zur Serialisierung
     */
    public ModelTetraederRoof(){

    }

    /**
     * Der vom Restserver genutzt Konstruktor. Wrappt das Entitie Objekt TblTetraederBuilding in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblTetraederRoof Entitie Objekt
     * @throws Exception Falls Geometry Objekt nicht geparset werden konnte
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
     * @return Gid des Dachteils
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
     * @return Building_id des Dachteils
     */
    public int getBuilding_id() {
        return building_id;
    }

    /**
     * Setzt die building_id des Dachteils
     * @param building_id Building_id des Dachteils
     */
    public void setBuilding_id(int building_id) {
        this.building_id = building_id;
    }

    /**
     * Returnt die uid des Dachteils
     * @return Uid des Dachteils
     */
    public Integer getUid() {
        return uid;
    }

    /**
     * Setzt die uid des Dachteils
     * @param uid Uid des Dachteils
     */
    public void setUid(Integer uid) {
        this.uid = uid;
    }

    /**
     * Returnt die cid des Dachteils
     * @return Cid des Dachteils
     */
    public int getCid() {
        return cid;
    }

    /**
     * Setzt die cid des Dachteils
     * @param cid Cid des Dachteils
     */
    public void setCid(int cid) {
        this.cid = cid;
    }

    /**
     * Returnt die area3d des Dachteils
     * @return Area3d des Dachteils
     */
    public double getArea3d() {
        return area3d;
    }

    /**
     * Setzt die area3d des Dachteils
     * @param area3d Area3d des Dachteils
     */
    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    /**
     * Returnt die global des Dachteils
     * @return Global des Dachteils
     */
    public double getGlobal() {
        return global;
    }

    /**
     * Setzt die global des Dachteils
     * @param global Global des Dachteils
     */
    public void setGlobal(double global) {
        this.global = global;
    }

    /**
     * Returnt die diffuse des Dachteils
     * @return Diffuse des Dachteils
     */
    public double getDiffuse() {
        return diffuse;
    }

    /**
     * Setzt die diffuse des Dachteils
     * @param diffuse Diffuse des Dachteils
     */
    public void setDiffuse(double diffuse) {
        this.diffuse = diffuse;
    }

    /**
     * Returnt die kwhpa des Dachteils
     * @return Kwhpa des Dachteils
     */
    public double getKwhpa() {
        return kwhpa;
    }

    /**
     * Setzt die kwhpa des Dachteils
     * @param kwhpa Kwhpa des Dachteils
     */
    public void setKwhpa(double kwhpa) {
        this.kwhpa = kwhpa;
    }

    /**
     * Gibt an ob es einen strongshadow gibt
     * @return Strongshadow des Dachteils
     */
    public boolean isStrongshadow() {
        return strongshadow;
    }

    /**
     * Setzt den strongshadow im Dachteil
     * @param strongshadow Strongshadow des Dachteils
     */
    public void setStrongshadow(boolean strongshadow) {
        this.strongshadow = strongshadow;
    }

    /**
     * Returnt den direct des Dachteils
     * @return Directu des Dachteils
     */
    public Double getDirectu() {
        return directu;
    }

    /**
     * Setzt den directu des Dachteils
     * @param directu Directu des Dachteils
     */
    public void setDirectu(Double directu) {
        this.directu = directu;
    }

    /**
     * Returnt den nearbyLoss des Dachteils
     * @return NearbyLoss des Dachteils
     */
    public Double getNearbyLoss() {
        return nearbyLoss;
    }

    /**
     * Setzt den nearbyLoss des Dachteils
     * @param nearbyLoss NearbyLoss des Dachteils
     */
    public void setNearbyLoss(Double nearbyLoss) {
        this.nearbyLoss = nearbyLoss;
    }

    /**
     * Returnt den distanceLoss des Dachteils
     * @return DistanceLoss des Dachteils
     */
    public Double getDistanceLoss() {
        return distanceLoss;
    }

    /**
     * Setzt die distanceLoss des Dachteils
     * @param distanceLoss DistanceLoss des Dachteils
     */
    public void setDistanceLoss(Double distanceLoss) {
        this.distanceLoss = distanceLoss;
    }

    /**
     * Returnt den tilt des Dachteils
     * @return Tilt des Dachteils
     */
    public double getTilt() {
        return tilt;
    }

    /**
     * Setzt den tilt des Dachteils
     * @param tilt Tilt des Dachteils
     */
    public void setTilt(double tilt) {
        this.tilt = tilt;
    }

    /**
     * Returnt den aspect des Dachteils
     * @return Aspect des Dachteils
     */
    public double getAspect() {
        return aspect;
    }

    /**
     * Setzt den aspect des Dachteils
     * @param aspect Aspect des Dachteils
     */
    public void setAspect(double aspect) {
        this.aspect = aspect;
    }

    /**
     * Returnt den nx des Dachteils
     * @return Nx des Dachteils
     */
    public double getNx() {
        return nx;
    }

    /**
     * Setzt den nx des Dachteils
     * @param nx Nx des Dachteils
     */
    public void setNx(double nx) {
        this.nx = nx;
    }

    /**
     * Returnt den ny des Dachteils
     * @return Ny des Dachteils
     */
    public double getNy() {
        return ny;
    }

    /**
     * Setzt den ny des Dachteils
     * @param ny Ny des Dachteils
     */
    public void setNy(double ny) {
        this.ny = ny;
    }

    /**
     * Returnt den nz des Dachteisl
     * @return Nz des Dachteils
     */
    public double getNz() {
        return nz;
    }

    /**
     * Setzt den nz des Dachteils
     * @param nz Nz des Dachteils
     */
    public void setNz(double nz) {
        this.nz = nz;
    }

    /**
     * Returnt den pv des Dachteils
     * @return Pv des Dachteils
     */
    public int getPv() {
        return pv;
    }

    /**
     * Setzt den pv des Dachteils
     * @param pv Pv des Dachteils
     */
    public void setPv(int pv) {
        this.pv = pv;
    }

    /**
     * Returnt den st des Dachteils
     * @return St des Dachteils
     */
    public int getSt() {
        return st;
    }

    /**
     * Setzt den st des Dachteils
     * @param st St des Dachteils
     */
    public void setSt(int st) {
        this.st = st;
    }

    /**
     * Zeigt an ob das Dachteil falch ist
     * @return Flat des Dachteils
     */
    public boolean isFlat() {
        return flat;
    }

    /**
     * Returnt den gd des Dachteils
     * @return Gd des Dachteils
     */
    public Integer getGd() {
        return gd;
    }

    /**
     * Setzt den gd des Dachteils
     * @param gd Gd des Dachteils
     */
    public void setGd(Integer gd) {
        this.gd = gd;
    }

    /**
     * Setzt den Wert ob das Dachteil flach ist
     * @param flat Flat des Dachteils
     */
    public void setFlat(boolean flat) {
        this.flat = flat;
    }

    /**
     * Returnt den mp_panelnumber des Dachteils
     * @return Mp_panelnumber des Dachteils
     */
    public Integer getMp_panelnumber() {
        return mp_panelnumber;
    }

    /**
     * Setzt den mp_panelnumber des Dachteils
     * @param mp_panelnumber Mp_panelnumber des Dachteils
     */
    public void setMp_panelnumber(Integer mp_panelnumber) {
        this.mp_panelnumber = mp_panelnumber;
    }

    /**
     * Returnt die Latitude/Longitude Werte des Dacheteils
     * @return Liste mit LatitudeLongitude Werten
     */
    public ArrayList<LatitudeLongitude> getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt die Latitude/Longitude Werte des Dachteils
     * @param the_geom Liste mit LatitudeLongitude Werten
     */
    public void setThe_geom(ArrayList<LatitudeLongitude> the_geom) {
        this.the_geom = the_geom;
    }

    /**
     * Returnt den plenep als LatitudeLongitude Objekt
     * @return Planep Objekt des Dachteils
     */
    public LatitudeLongitude getPlanep() {
        return planep;
    }

    /**
     * Setzt das planet LatitudeLongitude Objekt
     * @param planep LatitudeLongitude Objekt
     */
    public void setPlanep(LatitudeLongitude planep) {
        this.planep = planep;
    }

    /**
     * Returnt den kwpha Werte des Dachteils
     * @return Kwpha des Dachteils
     */
    public Double getKwpha() {
        return kwpha;
    }

    /**
     * Setzt den kwpha des Dachteils
     * @param kwpha Kwpha des Dachteils
     */
    public void setKwpha(Double kwpha) {
        this.kwpha = kwpha;
    }

    /**
     * Returnt den planp des Dachteils
     * @return Planp des Dachteils
     */
    public String getPlanp() {
        return planp;
    }

    /**
     * Setzt den planp des Dacheteils
     * @param planp Planp des Dachteils
     */
    public void setPlanp(String planp) {
        this.planp = planp;
    }

    /**
     * Returnt den direct Wert des Dachteils
     * @return Direct des Dachteils
     */
    public double getDirect() {
        return direct;
    }

    /**
     * Setzt den direct Wert des Dachteils
     * @param direct Direct des Dachteils
     */
    public void setDirect(double direct) {
        this.direct = direct;
    }
}
