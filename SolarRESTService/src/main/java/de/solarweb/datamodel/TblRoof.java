package de.solarweb.datamodel;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by Nils on 26.11.16.
 */
@Entity
@Table(name = "berlin_fh_bielefeld_roofs")
@XmlRootElement
public class TblRoof implements Serializable {

    @Id
    @Basic
    @Column(name = "gid")
    private int gid;

    @Basic
    @Column(name = "building_id")
    private int building_id;

    @Basic
    @Column(name = "uid")
    private int uid;

    @Basic
    @Column(name = "cid")
    private int cid;

    @Basic
    @Column(name = "area3d")
    private double area3d;

    @Basic
    @Column(name = "global")
    private double global;

    @Basic
    @Column(name = "diffuse")
    private double diffuse;

    @Basic
    @Column(name = "direct")
    private double direct;

    @Basic
    @Column(name = "kwpha")
    private double kwpha;

    @Basic
    @Column(name = "strongshadow")
    private boolean strongshadow;

    @Basic
    @Column(name = "directu")
    private double directu;

    @Basic
    @Column(name = "nearby_loss")
    private double nearby_loss;

    @Basic
    @Column(name = "tilt")
    private double tilt;

    @Basic
    @Column(name = "aspect")
    private double aspect;

    @Basic
    @Column(name = "nx")
    private double nx;

    @Basic
    @Column(name = "ny")
    private double ny;

    @Basic
    @Column(name = "nz")
    private double nz;

    @Basic
    @Column(name = "pv")
    private int pv;

    @Basic
    @Column(name = "st")
    private int st;

    @Basic
    @Column(name = "gd")
    private int gd;

    @Basic
    @Column(name = "flat")
    private boolean flat;

    @Basic
    @Column(name = "mp_panelnumber")
    private int mp_panelnumber;

    @Basic
    @Column(name = "the_geom")
    private String the_geom;

    @Basic
    @Column(name = "planp")
    private String plannp;

    public TblRoof(){

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

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
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

    public double getDirect() {
        return direct;
    }

    public void setDirect(double direct) {
        this.direct = direct;
    }

    public double getKwpha() {
        return kwpha;
    }

    public void setKwpha(double kwpha) {
        this.kwpha = kwpha;
    }

    public boolean isStrongshadow() {
        return strongshadow;
    }

    public void setStrongshadow(boolean strongshadow) {
        this.strongshadow = strongshadow;
    }

    public double getDirectu() {
        return directu;
    }

    public void setDirectu(double directu) {
        this.directu = directu;
    }

    public double getNearby_loss() {
        return nearby_loss;
    }

    public void setNearby_loss(double nearby_loss) {
        this.nearby_loss = nearby_loss;
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

    public int getGd() {
        return gd;
    }

    public void setGd(int gd) {
        this.gd = gd;
    }

    public boolean isFlat() {
        return flat;
    }

    public void setFlat(boolean flat) {
        this.flat = flat;
    }

    public int getMp_panelnumber() {
        return mp_panelnumber;
    }

    public void setMp_panelnumber(int mp_panelnumber) {
        this.mp_panelnumber = mp_panelnumber;
    }

    public String getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(String the_geom) {
        this.the_geom = the_geom;
    }

    public String getPlannp() {
        return plannp;
    }

    public void setPlannp(String plannp) {
        this.plannp = plannp;
    }
}
