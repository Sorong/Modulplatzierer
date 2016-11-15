package de.solarweb.models;

import de.solarweb.datamodel.TblCookie;
import de.solarweb.datamodel.TblDach;

import java.io.Serializable;
import java.util.LinkedList;
import java.sql.Timestamp;

/**
 * Created by Nils on 13.11.16.
 */
public class ModelCookie implements Serializable{

    private int cookie_id;
    private LinkedList<Integer> dach_ids;
    private Timestamp ablaufdatum;

    public ModelCookie(){

    }

    public ModelCookie(TblCookie tblCookie){
        this.cookie_id = tblCookie.getCookie_id();
        dach_ids = new LinkedList<Integer>();
        for(TblDach tblDach : tblCookie.getTblDachCollection()){
            dach_ids.add(tblDach.getDach_id());
        }
        this.ablaufdatum = tblCookie.getAblaufdatum();
    }

    public int getCookie_id() {
        return cookie_id;
    }

    public void setCookie_id(int cookie_id) {
        this.cookie_id = cookie_id;
    }

    public LinkedList<Integer> getDach_ids() {
        return dach_ids;
    }

    public void setDach_ids(LinkedList<Integer> dach_ids) {
        this.dach_ids = dach_ids;
    }

    public Timestamp getAblaufdatum() {
        return ablaufdatum;
    }

    public void setAblaufdatum(Timestamp ablaufdatum) {
        this.ablaufdatum = ablaufdatum;
    }
}
