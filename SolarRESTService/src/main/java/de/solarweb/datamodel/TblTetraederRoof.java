package de.solarweb.datamodel;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.Point;
import de.solarweb.helper.GeometryConverter;
import de.solarweb.helper.LatitudeLongitude;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * Entitie zur Tabelle berlin_fh_bielefeld_roofs aus der Datenbank
 */
@Entity
@Table(name = "berlin_fh_bielefeld_roofs")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "tblTetraederRoof.findById", query = "SELECT t FROM TblTetraederRoof t WHERE t.building_id = :id")
})
public class TblTetraederRoof implements Serializable {

    /**
     * Eindeutige ID des Dacheinheit
     */
    @Id
    @Basic
    @Column(name = "gid")
    private int gid;

    /**
     * ID, welche auf das Gebäude verweist
     */
    @Basic
    @Column(name = "building_id")
    private int building_id;

    /**
     * uid des Dachteils
     */
    @Basic
    @Column(name = "uid")
    private Integer uid;

    /**
     * cid des Dachteils
     */
    @Basic
    @Column(name = "cid")
    private int cid;

    /**
     * Flächeninhalt des Dachteils
     */
    @Basic
    @Column(name = "area3d")
    private double area3d;

    /**
     * Globaler Einstahlungswert des Dachteils
     */
    @Basic
    @Column(name = "global")
    private double global;

    /**
     * Diffuser Einstrahlungswert des Dachteils
     */
    @Basic
    @Column(name = "diffuse")
    private double diffuse;

    /**
     * Direkter Einstahlungswert des Dachteils
     */
    @Basic
    @Column(name = "direct")
    private double direct;

    /**
     * kwhpa des Dachteils
     */
    @Basic
    @Column(name = "kwhpa")
    private double kwhpa;

    /**
     * Ob es einen starken Schatten auf dem Dachteil gibt
     */
    @Basic
    @Column(name = "strongshadow")
    private boolean strongshadow;

    /**
     * directu des Dachteils
     */
    @Basic
    @Column(name = "directu")
    private Double directu;

    /**
     * Naher Verlust des Dachteils
     */
    @Basic
    @Column(name = "nearby_loss")
    private Double nearby_loss;

    /**
     * Ferner Verlust des Dachteils
     */
    @Basic
    @Column(name = "distance_loss")
    private Double distance_loss;

    /**
     * Neigung des Dachteils
     */
    @Basic
    @Column(name = "tilt")
    private double tilt;

    /**
     * Seitenverhältnis des Dachteils
     */
    @Basic
    @Column(name = "aspect")
    private double aspect;

    /**
     * nx des Dachteils
     */
    @Basic
    @Column(name = "nx")
    private double nx;

    /**
     * ny des Dachteils
     */
    @Basic
    @Column(name = "ny")
    private double ny;

    /**
     * nz des Dachteils
     */
    @Basic
    @Column(name = "nz")
    private double nz;

    /**
     * Eignung des Dachteils für Photovoltaik
     */
    @Basic
    @Column(name = "pv")
    private int pv;

    /**
     * Eignung des Dachteils für Solarthermie
     */
    @Basic
    @Column(name = "st")
    private int st;

    /**
     * gd des Dachteils
     */
    @Basic
    @Column(name = "gd")
    private Integer gd;

    /**
     * Ob das Dachteils flach ist
     */
    @Basic
    @Column(name = "flat")
    private boolean flat;

    /**
     * Anzahl von Modulen auf Dachteil
     */
    @Basic
    @Column(name = "mp_panelnumber")
    private Integer mp_panelnumber;

    /**
     * Geomertyobjekt, welches den Umriss des Dachteils bildet
     */
    @Basic
    @Column(name = "the_geom", columnDefinition = "geometry(Multipolygon, 25833")
    private Geometry the_geom;

    /**
     * planp des Dachteils
     */
    @Basic
    @Column(name = "planep", columnDefinition = "geometry(Point, 25833")
    private Point planep;

    /**
     * kwpha des Dachteils
     */
    @Basic
    @Column(name = "kwpha")
    private Double kwpha;

    /**
     * planp des Dachteils
     */
    @Basic
    @Column(name = "planp")
    private String planp;

    /**
     * Standartkonstruktor
     */
    public TblTetraederRoof(){

    }

    /**
     * Returnt die ID des Dachteils
     * @return ID Dachteil
     */
    public int getGid() {
        return gid;
    }

    /**
     * Setzt die ID des Dachteils
     * @param gid ID Dachteils
     */
    public void setGid(int gid) {
        this.gid = gid;
    }

    /**
     * Returnt die ID des zugehöhrigen Gebaudes
     * @return ID Gebäude
     */
    public int getBuilding_id() {
        return building_id;
    }

    /**
     * Setzt die ID des zugehöhrigen Gebaudes
     * @param building_id ID Gebäude
     */
    public void setBuilding_id(int building_id) {
        this.building_id = building_id;
    }

    /**
     * Returnt die uid des Dachteils
     * @return Uid Dachteil
     */
    public Integer getUid() {
        return uid;
    }

    /**
     * Setzt die uid des Dachteils
     * @param uid Uid Dachteil
     */
    public void setUid(Integer uid) {
        this.uid = uid;
    }

    /**
     * Returnt die cid des Dachteils
     * @return Cid Dachteil
     */
    public int getCid() {
        return cid;
    }

    /**
     * Setzt die cid des Dachteils
     * @param cid Cid Dachteil
     */
    public void setCid(int cid) {
        this.cid = cid;
    }

    /**
     * Returnt den Flächeninhalt des Dachteils
     * @return Flächeninhalt Dachteil
     */
    public double getArea3d() {
        return area3d;
    }

    /**
     * Setzt den Flächeninhalt des Dachteils
     * @param area3d Flächeninhalt Dachteil
     */
    public void setArea3d(double area3d) {
        this.area3d = area3d;
    }

    /**
     * Returnt den globalen Einstahlungswert des Dachteils
     * @return Globaler Einstahlungswert
     */
    public double getGlobal() {
        return global;
    }

    /**
     * Setzt den gloabelen Einstrahlungswert des Dachteils
     * @param global Globaler Einstahlungswert
     */
    public void setGlobal(double global) {
        this.global = global;
    }

    /**
     * Returnt den diffusen Einstahlungswert des Dachteils
     * @return Diffuser Einstahlungswert
     */
    public double getDiffuse() {
        return diffuse;
    }

    /**
     * Setzt den diffusen Einstahlungswert des Dachteils
     * @param diffuse Diffuser Einstahlungswert
     */
    public void setDiffuse(double diffuse) {
        this.diffuse = diffuse;
    }

    /**
     * Returnt den direkten Einstahlungswert des Dachteils
     * @return Direkter Einstahlungswert
     */
    public Double getDirect() {
        return direct;
    }

    /**
     * Setzt den direkten Einstahlungswert des Dachteils
     * @param direct Direkter Einstahlungswert
     */
    public void setDirect(Double direct) {
        this.direct = direct;
    }

    /**
     * Returnt den kwpha Wert des Dachteils
     * @return Kwpha Wert des Dachteils
     */
    public Double getKwpha() {
        return kwpha;
    }

    /**
     * Setzt den kwpha Wert des Daches
     * @param kwpha Kwpha Wert des Daches
     */
    public void setKwpha(Double kwpha) {
        this.kwpha = kwpha;
    }

    /**
     * Gibt an, ob ein starker Schatten auf dem Dachteil liegt
     * @return Ob Starker Schatten
     */
    public boolean isStrongshadow() {
        return strongshadow;
    }

    /**
     * Setzt die Information, ob ein starker Schatten auf dem Dachteil liegt
     * @param strongshadow Starker Schatten Information
     */
    public void setStrongshadow(boolean strongshadow) {
        this.strongshadow = strongshadow;
    }

    /**
     * Returnt den directu Wert des Dachteils
     * @return Directu Wert des Dachteils
     */
    public Double getDirectu() {
        return directu;
    }

    /**
     * Setzt den directu Wert des Dachteils
     * @param directu Directu Wert des Dachteils
     */
    public void setDirectu(Double directu) {
        this.directu = directu;
    }

    /**
     * Returnt den nahen Verlust des Dachteils
     * @return Naher Verlust
     */
    public Double getNearby_loss() {
        return nearby_loss;
    }

    /**
     * Setzt den nahen Verlust des Dachteils
     * @param nearby_loss Naher Verlust
     */
    public void setNearby_loss(Double nearby_loss) {
        this.nearby_loss = nearby_loss;
    }

    /**
     * Returnt die Neigung des Dachteils
     * @return Neigung Dachteil
     */
    public double getTilt() {
        return tilt;
    }

    /**
     * Setzt die Neigung des Dachteils
     * @param tilt Neigung Dachteil
     */
    public void setTilt(double tilt) {
        this.tilt = tilt;
    }

    /**
     * Returnt das Seitenverhältnis des Dachteils
     * @return Seitenverhaltnis Dachteil
     */
    public double getAspect() {
        return aspect;
    }

    /**
     * Setzt das Seitenverhältnis des Dachteils
     * @param aspect Seitenverhaltnis Dachteil
     */
    public void setAspect(double aspect) {
        this.aspect = aspect;
    }

    /**
     * Returnt den nx Wert des Dachteils
     * @return Nx Wert Dachteil
     */
    public double getNx() {
        return nx;
    }

    /**
     * Setzt den nx Wert des Dachteils
     * @param nx Nx Wert Dachteil
     */
    public void setNx(double nx) {
        this.nx = nx;
    }

    /**
     * Returnt den ny Wert des Dachteils
     * @return Ny Wert Dachteils
     */
    public double getNy() {
        return ny;
    }

    /**
     * Setzt den ny Wert des Dachteils
     * @param ny Ny Wert Dachteil
     */
    public void setNy(double ny) {
        this.ny = ny;
    }

    /**
     * Returnt den nz Wert des Dachteils
     * @return Ny Wert Dachteil
     */
    public double getNz() {
        return nz;
    }

    /**
     * Setzt den nz Wert des Dachteils
     * @param nz Nz Wert Dachteil
     */
    public void setNz(double nz) {
        this.nz = nz;
    }

    /**
     * Returnt die Eignung für Photovoltaik
     * @return Eignung Photovoltaik
     */
    public int getPv() {
        return pv;
    }

    /**
     * Setzt die Eignung für Photovoltaik
     * @param pv Eignung Photovoltaik
     */
    public void setPv(int pv) {
        this.pv = pv;
    }

    /**
     * Returnt die Eignung für Solarthermie
     * @return Eignung Solarthermie
     */
    public int getSt() {
        return st;
    }

    /**
     * Setzt die Eignung für Solartermie
     * @param st Eignung Solarthermie
     */
    public void setSt(int st) {
        this.st = st;
    }

    /**
     * Returnt den gd Wert des DAchteils
     * @return Gd Wert Dachteils
     */
    public Integer getGd() {
        return gd;
    }

    /**
     * Setzt den gd Wert des Dachteils
     * @param gd Gd Wert Dachteils
     */
    public void setGd(Integer gd) {
        this.gd = gd;
    }

    /**
     * Gibt an,ob das Dachteil flach ist
     * @return Ob flach
     */
    public boolean isFlat() {
        return flat;
    }

    /**
     * Setzt die Information ob das DAchteil flach ist
     * @param flat Ob flach
     */
    public void setFlat(boolean flat) {
        this.flat = flat;
    }

    /**
     * Returnt die Anzahl der Panels auf Dachteil
     * @return Panelanzahl
     */
    public Integer getMp_panelnumber() {
        return mp_panelnumber;
    }

    /**
     * Setzt die Anzahl der Panels auf Dachteil
     * @param mp_panelnumber Panelanzahl
     */
    public void setMp_panelnumber(Integer mp_panelnumber) {
        this.mp_panelnumber = mp_panelnumber;
    }

    /**
     * Returnt das Geomertyobejkt welches den Umriss bildet
     * @return Geomertyobjekt Umriss
     */
    public Geometry getThe_geom() {
        return the_geom;
    }

    /**
     * Setzt das Geometryobjekt welches den Umriss bildet
     * @param the_geom Geometryobjekt Umriss
     */
    public void setThe_geom(Geometry the_geom) {
        this.the_geom = the_geom;
    }

    /**
     * Returnt den Umriss des Dachteils als Liste von LatitudeLongitude Objekten
     * @return Liste LatitudeLongitude Objekte
     * @throws Exception Falls Geometryobjekt nicht geparsed werden konnte
     */
    public ArrayList<LatitudeLongitude> getThe_geomAsLatlng() throws Exception{
        return GeometryConverter.geometryToLatLngArray(25833, the_geom);
    }

    /**
     * Returnt planep des Dachteils
     * @return Planep Dachteil
     */
    public Point getPlannp() {
        return planep;
    }

    /**
     * Setzt den planep des Dachteils
     * @param plannp Planep Dachteil
     */
    public void setPlannp(Point plannp) {
        this.planep = planep;
    }

    /**
     * Returnt den kwhpa Wert des Dachteils
     * @return Kwhpa Dachteil
     */
    public double getKwhpa() {
        return kwhpa;
    }

    /**
     * Setzt den kwhpa Wert des Dachteils
     * @param kwhpa Kwhpa Dachteil
     */
    public void setKwhpa(double kwhpa) {
        this.kwhpa = kwhpa;
    }

    /**
     * Returnt den nahen Verlust des Dachteils
     * @return Naher Verlust
     */
    public Double getDistance_loss() {
        return distance_loss;
    }

    /**
     * Setzt den nahen Verlust des Dachteuls
     * @param distance_loss Naher Verlust
     */
    public void setDistance_loss(Double distance_loss) {
        this.distance_loss = distance_loss;
    }

    /**
     * Returnt den planp des Dachteils
     * @return Planp Dachteils
     */
    public String getPlanp() {
        return planp;
    }

    /**
     * Setzt den planp des Dachteils
     * @param planp Planp Dachteil
     */
    public void setPlanp(String planp) {
        this.planp = planp;
    }
}
