package de.solarweb.datamodel;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

import com.vividsolutions.jts.geom.Geometry;
/**
 * Created by Nils on 25.11.16.
 */
@Entity
@Table(name = "berlin_fh_bielefeld_display_aggregate")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "tblDisplayAggregate.findAll", query = "SELECT t FROM TblDisplayAggregate t"),
        @NamedQuery(name = "tblDisplayAggregate.findById", query = "SELECT t FROM TblDisplayAggregate t WHERE t.gid = :id")
})

public class TblDisplayAggregate implements Serializable {

    @Id
    @Basic
    @Column(name = "gid", nullable = false)
    private int gid;

    @Basic
    @Column(name = "building_id")
    private int building_id;

    @Basic
    @Column(name = "globalc")
    private double globalc;

    @Basic
    @Column(name = "the_geom")
    private String the_geom;

    public TblDisplayAggregate(){

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

    public double getGlobalc() {
        return globalc;
    }

    public void setGlobalc(double globalc) {
        this.globalc = globalc;
    }

    public String getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(String the_geom) {
        this.the_geom = the_geom;
    }
}
