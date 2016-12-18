package de.solarweb.models;

import de.solarweb.datamodel.TblTetraederRoof;
import de.solarweb.helper.LatitudeLongitude;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by Nils on 08.12.16.
 */
public class ModelTetraederRoof implements Serializable{

    private int gid;
    private int building_id;
    private Integer uid;
    private int cid;
    private double area3d;
    private double global;
    private double diffuse;
    private double direct;
    private double kwhpa;
    private boolean strongshadow;
    private Double directu;
    private Double nearbyLoss;
    private Double distanceLoss;
    private double tilt;
    private double aspect;
    private double nx;
    private double ny;
    private double nz;
    private int pv;
    private int st;
    private Integer gd;
    private boolean flat;
    private Integer mp_panelnumber;
    private ArrayList<LatitudeLongitude> the_geom;
    private LatitudeLongitude planep;
    private Double kwpha;
    private String planp;

    public ModelTetraederRoof(){

    }

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

    public int getGid() {
        return gid;
    }

    public void setGid(int gid) {
        this.gid = gid;
    }

    public int getBuilding_id() {
        return building_id;
    }

    public void setBuilding_id(int building_id) {
        this.building_id = building_id;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }

    public double getArea3d() {
        return area3d;
    }

    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    public double getGlobal() {
        return global;
    }

    public void setGlobal(double global) {
        this.global = global;
    }

    public double getDiffuse() {
        return diffuse;
    }

    public void setDiffuse(double diffuse) {
        this.diffuse = diffuse;
    }

    public double getKwhpa() {
        return kwhpa;
    }

    public void setKwhpa(double kwhpa) {
        this.kwhpa = kwhpa;
    }

    public boolean isStrongshadow() {
        return strongshadow;
    }

    public void setStrongshadow(boolean strongshadow) {
        this.strongshadow = strongshadow;
    }

    public Double getDirectu() {
        return directu;
    }

    public void setDirectu(Double directu) {
        this.directu = directu;
    }

    public Double getNearbyLoss() {
        return nearbyLoss;
    }

    public void setNearbyLoss(Double nearbyLoss) {
        this.nearbyLoss = nearbyLoss;
    }

    public Double getDistanceLoss() {
        return distanceLoss;
    }

    public void setDistanceLoss(Double distanceLoss) {
        this.distanceLoss = distanceLoss;
    }

    public double getTilt() {
        return tilt;
    }

    public void setTilt(double tilt) {
        this.tilt = tilt;
    }

    public double getAspect() {
        return aspect;
    }

    public void setAspect(double aspect) {
        this.aspect = aspect;
    }

    public double getNx() {
        return nx;
    }

    public void setNx(double nx) {
        this.nx = nx;
    }

    public double getNy() {
        return ny;
    }

    public void setNy(double ny) {
        this.ny = ny;
    }

    public double getNz() {
        return nz;
    }

    public void setNz(double nz) {
        this.nz = nz;
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
