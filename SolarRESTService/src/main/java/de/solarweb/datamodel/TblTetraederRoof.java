package de.solarweb.datamodel;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.Point;
import de.solarweb.de.soalarweb.helper.GeometryConverter;
import de.solarweb.de.soalarweb.helper.LatitudeLongitude;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.net.Inet4Address;
import java.util.ArrayList;

/**
 * Created by Nils on 26.11.16.
 */
@Entity
@Table(name = "berlin_fh_bielefeld_roofs")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "tblTetraederRoof.findById", query = "SELECT t FROM TblTetraederRoof t WHERE t.building_id = :id")
})
public class TblTetraederRoof implements Serializable {

    @Id
    @Basic
    @Column(name = "gid")
    private int gid;

    @Basic
    @Column(name = "building_id")
    private int building_id;

    @Basic
    @Column(name = "uid")
    private Integer uid;

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
    @Column(name = "kwhpa")
    private double kwhpa;

    @Basic
    @Column(name = "strongshadow")
    private boolean strongshadow;

    @Basic
    @Column(name = "directu")
    private Double directu;

    @Basic
    @Column(name = "nearby_loss")
    private Double nearby_loss;

    @Basic
    @Column(name = "distance_loss")
    private Double distance_loss;

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
    private Integer gd;

    @Basic
    @Column(name = "flat")
    private boolean flat;

    @Basic
    @Column(name = "mp_panelnumber")
    private Integer mp_panelnumber;

    @Basic
    @Column(name = "the_geom", columnDefinition = "geometry(Multipolygon, 25833")
    private Geometry the_geom;

    @Basic
    @Column(name = "planep", columnDefinition = "geometry(Point, 25833")
    private Point planep;

    @Basic
    @Column(name = "kwpha")
    private Double kwpha;


    @Basic
    @Column(name = "planp")
    private String planp;

    public TblTetraederRoof(){

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

    public Double getDirect() {
        return direct;
    }

    public void setDirect(Double direct) {
        this.direct = direct;
    }

    public Double getKwpha() {
        return kwpha;
    }

    public void setKwpha(Double kwpha) {
        this.kwpha = kwpha;
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

    public Double getNearby_loss() {
        return nearby_loss;
    }

    public void setNearby_loss(Double nearby_loss) {
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

    public Integer getGd() {
        return gd;
    }

    public void setGd(Integer gd) {
        this.gd = gd;
    }

    public boolean isFlat() {
        return flat;
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

    public Geometry getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(Geometry the_geom) {
        this.the_geom = the_geom;
    }

    public ArrayList<LatitudeLongitude> getThe_geomAsLatlng() throws Exception{
        GeometryConverter converter = new GeometryConverter();
        return converter.convertGeometry(25833, the_geom);
    }

    public Point getPlannp() {
        return planep;
    }

    public void setPlannp(Point plannp) {
        this.planep = planep;
    }

    public double getKwhpa() {
        return kwhpa;
    }

    public void setKwhpa(double kwhpa) {
        this.kwhpa = kwhpa;
    }

    public Double getDistance_loss() {
        return distance_loss;
    }

    public void setDistance_loss(Double distance_loss) {
        this.distance_loss = distance_loss;
    }

    public String getPlanp() {
        return planp;
    }

    public void setPlanp(String planp) {
        this.planp = planp;
    }
}
