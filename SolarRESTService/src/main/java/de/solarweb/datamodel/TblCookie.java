package de.solarweb.datamodel;

/**
 * Entitie zur Tabelle Dächer aus der Datenbank
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

    /**
     * Id des Cookies, wird automatisch generiert
     */
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CookieSequence")
    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer cookie_id;

    /**
     * Collection von Solarpanelen, welche zum Cookie gehören
     */
    @OneToMany(mappedBy = "cookie_id")
    private Collection<TblSolarpanel> tblSolarpanelCollection;

    /**
     * Dach welches zum Cookie gehört
     */
    @OneToOne(mappedBy = "cookie")
    private TblDach tblDach;

    /**
     * Ablaufdatum des Cookie im UNIX Format
     */
    @Basic(optional = false)
    @Column(nullable = false)
    private java.sql.Timestamp ablaufdatum;

    /**
     * Standardkonstruktor des Cookies
     */
    public TblCookie(){

    }

    /**
     * Returnt die CookieID
     * @return cookie_id
     */
    public Integer getCookie_id() {
        return cookie_id;
    }

    /**
     * Setzt die CookieID
     * @param cookie_id cookieID
     */
    public void setCookie_id(Integer cookie_id) {
        this.cookie_id = cookie_id;
    }

    /**
     * Returnt die Collection mit allen Solarpanelen die zum Cookie gehören
     * @return Collection JPAObjekt Solarpanel
     */
    public Collection<TblSolarpanel> getTblSolarpanelCollection() {
        return tblSolarpanelCollection;
    }

    /**
     * Setzt eine Collection mit Solarpanelen
     * @param tblSolarpanelCollection Collection JPAObejt Solarpanel
     */
    public void setTblSolarpanelCollection(Collection<TblSolarpanel> tblSolarpanelCollection) {
        this.tblSolarpanelCollection = tblSolarpanelCollection;
    }

    /**
     * Returnt das Ablaufdatum des Cookies
     * @return ablaufdatum
     */
    public Timestamp getAblaufdatum() {
        return ablaufdatum;
    }

    /**
     * Setzt das Ablaufdatm des Cookies
     * @param ablaufdatum Ablaufdatum des Cookies
     */
    public void setAblaufdatum(Timestamp ablaufdatum) {
        this.ablaufdatum = ablaufdatum;
    }

    /**
     * Returnt das zum Cookie zugehöhrige Dach
     * @return JPAObjekt des Daches
     */
    public TblDach getTblDach() {
        return tblDach;
    }

    /**
     * Setzt das zum Cookie zugehöhrige Dach
     * @param tblDach JPAObjekt des Daches
     */
    public void setTblDach(TblDach tblDach) {
        this.tblDach = tblDach;
    }
}
