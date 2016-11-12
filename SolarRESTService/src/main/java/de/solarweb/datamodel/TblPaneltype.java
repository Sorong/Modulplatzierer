package de.solarweb.datamodel;

/**
 * Created by Nils on 10.11.16.
 */import java.io.Serializable;
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
@Table(name = "", schema = "scltest_sg_we2016_gr2a")
@XmlRootElement
public class TblPaneltype implements Serializable{

    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer paneltype_id;

    @OneToMany(mappedBy = "paneltype")
    private Collection<TblSolarpanel> tblSolarpanelCollection;

    @Basic(optional = false)
    @Column(nullable = false)
    private String type_name;

    @Basic(optional = false)
    @Column(nullable = false)
    private double effizienz;

    public TblPaneltype(){

    }

    public TblPaneltype(Integer id, String type_name, double effizienz){
        this.paneltype_id = id;
        this.type_name = type_name;
        this.effizienz = effizienz;
    }

    public Integer getPaneltype_id() {
        return paneltype_id;
    }

    public void setPaneltype_id(Integer paneltype_id) {
        this.paneltype_id = paneltype_id;
    }

    public Collection<TblSolarpanel> getTblSolarpanelCollection() {
        return tblSolarpanelCollection;
    }

    public void setTblSolarpanelCollection(Collection<TblSolarpanel> tblSolarpanelCollection) {
        this.tblSolarpanelCollection = tblSolarpanelCollection;
    }

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }

    public double getEffizienz() {
        return effizienz;
    }

    public void setEffizienz(double effizienz) {
        this.effizienz = effizienz;
    }
}
