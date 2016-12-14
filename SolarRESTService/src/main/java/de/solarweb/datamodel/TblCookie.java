package de.solarweb.datamodel;

/**
 * Created by Nils on 10.11.16.
 */
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;


@Entity
@SequenceGenerator(name = "CookieSequence", initialValue=0)
@Table(name = "tbl_cookie")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "TblCookie.findAll", query = "SELECT t FROM TblCookie t"),
        @NamedQuery(name = "tblCookie.findById", query = "SELECT t FROM TblCookie t WHERE t.cookie_id = :id")
})

public class TblCookie implements Serializable{

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CookieSequence")
    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer cookie_id;

    @OneToMany(mappedBy = "cookie_id")
    private Collection<TblSolarpanel> tblSolarpanelCollection;


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

    public Collection<TblSolarpanel> getTblSolarpanelCollection() {
        return tblSolarpanelCollection;
    }

    public void setTblSolarpanelCollection(Collection<TblSolarpanel> tblSolarpanelCollection) {
        this.tblSolarpanelCollection = tblSolarpanelCollection;
    }
}
