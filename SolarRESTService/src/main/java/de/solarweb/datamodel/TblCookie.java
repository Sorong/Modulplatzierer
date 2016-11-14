package de.solarweb.datamodel;

/**
 * Created by Nils on 10.11.16.
 */
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;
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
@Table(name = "tbl_cookie")
@XmlRootElement
public class TblCookie implements Serializable{

    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer cookie_id;

    @OneToMany(mappedBy = "cookie")
    private Collection<TblDach> tblDachCollection;


    public Timestamp getAblaufdatum() {
        return ablaufdatum;
    }

    public void setAblaufdatum(Timestamp ablaufdatum) {
        this.ablaufdatum = ablaufdatum;
    }

    @Basic(optional = false)
    @Column(nullable = false)

    private java.sql.Timestamp ablaufdatum;


    public TblCookie(){

    }

    public TblCookie(Integer id, java.sql.Timestamp date){
        this.cookie_id = id;
        this.ablaufdatum = date;
    }

    public Integer getCookie_id() {
        return cookie_id;
    }

    public void setCookie_id(Integer cookie_id) {
        this.cookie_id = cookie_id;
    }

    public Collection<TblDach> getTblDachCollection() {
        return tblDachCollection;
    }

    public void setTblDachCollection(Collection<TblDach> tblDachCollection) {
        this.tblDachCollection = tblDachCollection;
    }

}
