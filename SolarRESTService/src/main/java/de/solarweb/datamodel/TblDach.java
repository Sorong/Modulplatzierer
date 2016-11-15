package de.solarweb.datamodel;

/**
 * Created by Nils on 10.11.16.
 */
import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;


@Entity
@Table(name = "tbl_dach")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "TblDach.findAll", query = "SELECT t FROM TblDach t"),
        @NamedQuery(name = "tblDach.findById", query = "SELECT t FROM TblDach t WHERE t.dach_id = :id")
})
public class TblDach implements Serializable{


    @Id
    @Basic(optional = false)
    @Column(name = "dach_id", nullable = false)
    private Integer dach_id;

    @OneToMany(mappedBy = "dach_id")
    private Collection<TblSolarpanel> tblSolarpanelCollection;

    @JoinColumn(name = "cookie_id", nullable = false, insertable=false, updatable=false)
    @ManyToOne(optional = false)
    private TblCookie cookie;


    @Basic(optional = false)
    @Column(nullable = false)
    private String strasse;

    @Basic(optional = false)
    @Column(nullable = false)
    private String hausnummer;

    @Basic(optional = false)
    @Column(nullable = false)
    private String plz;

    @Basic(optional = false)
    @Column(nullable = false)
    private int dachneigung;

    @Basic(optional = false)
    @Column(nullable = false)
    private double koord_dachmitte_lng;

    @Basic(optional = false)
    @Column(nullable = false)
    private double koord_dachmitte_lat;


    public TblDach(){

    }

    public TblDach(Integer id, String strasse, String hausnummer, String plz, int dachneigung, double koord_dachmitte_lng, double koord_dachmitte_lat){
        this.dach_id = id;
        this.strasse = strasse;
        this.hausnummer = hausnummer;
        this.plz = plz;
        this.dachneigung = dachneigung;
        this.koord_dachmitte_lng = koord_dachmitte_lng;
        this.koord_dachmitte_lat = koord_dachmitte_lat;
    }

    public Integer getDach_id() {
        return dach_id;
    }

    public void setDach_id(Integer dach_id) {
        this.dach_id = dach_id;
    }

    public Collection<TblSolarpanel> getTblSolarpanelCollection() {
        return tblSolarpanelCollection;
    }

    public void setTblSolarpanelCollection(Collection<TblSolarpanel> tblSolarpanelCollection) {
        this.tblSolarpanelCollection = tblSolarpanelCollection;
    }

    public String getStrasse() {
        return strasse;
    }

    public void setStrasse(String strasse) {
        this.strasse = strasse;
    }

    public String getHausnummer() {
        return hausnummer;
    }

    public void setHausnummer(String hausnummer) {
        this.hausnummer = hausnummer;
    }

    public String getPlz() {
        return plz;
    }

    public void setPlz(String plz) {
        this.plz = plz;
    }

    public int getDachneigung() {
        return dachneigung;
    }

    public void setDachneigung(int dachneigung) {
        this.dachneigung = dachneigung;
    }

    public double getKoord_dachmitte_lng() {
        return koord_dachmitte_lng;
    }

    public void setKoord_dachmitte_lng(double koord_dachmitte_lng) {
        this.koord_dachmitte_lng = koord_dachmitte_lng;
    }

    public double getKoord_dachmitte_lat() {
        return koord_dachmitte_lat;
    }

    public void setKoord_dachmitte_lat(double koord_dachmitte_lat) {
        this.koord_dachmitte_lat = koord_dachmitte_lat;
    }

    public TblCookie getCookie() {
        return cookie;
    }

    public void setCookie(TblCookie cookie) {
        this.cookie = cookie;
    }
}

