package de.solarweb.models;

import com.sun.org.apache.xpath.internal.operations.Mod;
import de.solarweb.datamodel.TblCookie;
import de.solarweb.datamodel.TblDach;
import de.solarweb.datamodel.TblSolarpanel;
import org.geolatte.geom.M;

import java.io.Serializable;
import java.util.LinkedList;
import java.sql.Timestamp;

/**
 * Created by Nils on 13.11.16.
 */
public class ModelCookie implements Serializable{

    private int cookie_id;
    private LinkedList<ModelSolarpanel> solarpanelList;
    private Timestamp ablaufdatum;

    public ModelCookie(){

    }

    public ModelCookie(int id, Timestamp time){
        this.cookie_id = id;
        this.ablaufdatum = time;
    }

    public ModelCookie(TblCookie tblCookie){
        this.cookie_id = tblCookie.getCookie_id();
        solarpanelList = new LinkedList<ModelSolarpanel>();
        if(tblCookie.getTblSolarpanelCollection() != null) {
            for (TblSolarpanel tblSolarpanel : tblCookie.getTblSolarpanelCollection()) {
                solarpanelList.add(new ModelSolarpanel(tblSolarpanel));
            }
        }
        this.ablaufdatum = tblCookie.getAblaufdatum();
    }

    public int getCookie_id() {
        return cookie_id;
    }

    public void setCookie_id(int cookie_id) {
        this.cookie_id = cookie_id;
    }

    public LinkedList<ModelSolarpanel> getSolarpanelList() {
        return solarpanelList;
    }

    public void setSolarpanelList(LinkedList<ModelSolarpanel> solarpanelList) {
        this.solarpanelList = solarpanelList;
    }

    public Timestamp getAblaufdatum() {
        return ablaufdatum;
    }

    public void setAblaufdatum(Timestamp ablaufdatum) {
        this.ablaufdatum = ablaufdatum;
    }
}
