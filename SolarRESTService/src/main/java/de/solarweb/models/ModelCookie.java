package de.solarweb.models;

import com.sun.org.apache.xpath.internal.operations.Mod;
import com.sun.research.ws.wadl.Link;
import de.solarweb.datamodel.TblCookie;
import de.solarweb.datamodel.TblDach;
import de.solarweb.datamodel.TblSolarpanel;
import org.geolatte.geom.M;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import java.sql.Timestamp;

/**
 * Model, welches vom Restservice als Cookie übergeben wird
 */
public class ModelCookie implements Serializable{

    /**
     * ID des Cookies
     */
    private int cookie_id;
    /**
     * Liste mit Panelstrings, welche zum Cookie gehören
     */
    private LinkedList<LinkedList<ModelSolarpanel>> solarpanelList;

    /**
     * Vom Benutzer angelegtes Dach
     */
    private ModelDach modelDach;
    /**
     * Ablaufdatum, bevor Cookie gelöscht wird
     */
    private Timestamp ablaufdatum;

    /**
     * Standartkonstruktor zum serializieren
     */
    public ModelCookie(){

    }

    /**
     * Konstruktor, nur genutzt falls der gesuchte Cookie nicht gefunden wird
     * @param id ID des Cookie
     * @param time Ablaufdatum des Cookies
     */
    public ModelCookie(int id, Timestamp time){
        this.cookie_id = id;
        this.ablaufdatum = time;
    }

    /**
     * Der vom Restserver genutzt Konstrukor. Wrappt das JPA Objekt TblCookie in ein <br>
     * Model, welches dann vom Restserver versendet werden kann.
     * @param tblCookie JPAObjekt
     */
    public ModelCookie(TblCookie tblCookie){
        this.cookie_id = tblCookie.getCookie_id();
        solarpanelList = new LinkedList<LinkedList<ModelSolarpanel>>();
        if(tblCookie.getTblSolarpanelCollection() != null) {
            solarpanelList = buildMasterpanelString(tblCookie.getTblSolarpanelCollection());
        }
        this.ablaufdatum = tblCookie.getAblaufdatum();
        if(tblCookie.getTblDach() != null){
            this.modelDach = new ModelDach(tblCookie.getTblDach());
        }

    }

    /**
     * Gibt die CookieID zurück
     * @return CookieID
     */
    public int getCookie_id() {
        return cookie_id;
    }

    /**
     * Setzt die CookieID
     * @param cookie_id CookieID
     */
    public void setCookie_id(int cookie_id) {
        this.cookie_id = cookie_id;
    }

    /**
     * Gibt die Liste mit Panelstrings zurück. Panelstriings Ihrerseits sind<br>
     * eine Liste mit ModelSolarpanel
     * @return Liste mit Listen von ModelSolarpanel
     */
    public LinkedList<LinkedList<ModelSolarpanel>> getSolarpanelList() {
        return solarpanelList;
    }

    public void setSolarpanelList(LinkedList<LinkedList<ModelSolarpanel>> solarpanelList) {
        this.solarpanelList = solarpanelList;
    }

    /**
     * Gibt das Ablaufdatum im UNIX Format zurück.
     * @return Ablaufdatum
     */
    public Timestamp getAblaufdatum() {
        return ablaufdatum;
    }

    /**
     * Setzt das Ablaufdatum im UNIX Format
     * @param ablaufdatum Ablaufdatum des Cookies
     */
    public void setAblaufdatum(Timestamp ablaufdatum) {
        this.ablaufdatum = ablaufdatum;
    }

    /**
     * Returnt das Model des Daches
     * @return ModelDach
     */
    public ModelDach getModelDach() {
        return modelDach;
    }

    /**
     * Setzt das Model des Daches
     * @param modelDach ModelDach
     */
    public void setModelDach(ModelDach modelDach) {
        this.modelDach = modelDach;
    }

    /**
     * Iteriert über die PanelCollection aus der TblCookie und packt alle Panele,
     * welche in einen Panelstring gehören, in eine neue Liste
     * @param panelCollection Liste der Panele
     * @return Liste mit Listen von Panelen
     */
    private LinkedList<LinkedList<ModelSolarpanel>> buildMasterpanelString(Collection<TblSolarpanel> panelCollection){
        LinkedList<LinkedList<ModelSolarpanel>> solarpanelListList= new LinkedList<LinkedList<ModelSolarpanel>>();

        for(TblSolarpanel tblSolarpanel : panelCollection){
            if(tblSolarpanel.getMasterpanel().getPanel_id() == tblSolarpanel.getPanel_id()){
                LinkedList<ModelSolarpanel> solarpanelListTemp = new LinkedList<ModelSolarpanel>();

                for(TblSolarpanel tblSolarpanelInString : tblSolarpanel.getTblSolarpanelCollection()){
                    solarpanelListTemp.add(new ModelSolarpanel(tblSolarpanelInString));
                }

                solarpanelListList.add(solarpanelListTemp);
            }

        }
        return  solarpanelListList;
    }
}
