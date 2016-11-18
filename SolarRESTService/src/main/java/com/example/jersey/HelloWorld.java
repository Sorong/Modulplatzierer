package com.example.jersey;


import com.sun.tools.internal.xjc.model.Model;
import de.solarweb.datamodel.*;
import de.solarweb.models.*;

import javax.persistence.*;
import javax.transaction.SystemException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.transaction.UserTransaction;
import javax.annotation.Resource;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;


@Stateless
@TransactionManagement( TransactionManagementType.BEAN )
@Path("/server")
public class HelloWorld {
    @PersistenceContext(unitName = "SolarPersistence")
    private EntityManager em;
    //EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("SolarPersistence");
    //private EntityManager em = entityManagerFactory.createEntityManager();
    @Resource
    private UserTransaction utx;
    private String dbURL = "jdbc:postgresql://scl1-ifm-min.ad.fh-bielefeld.de/scl";



    public HelloWorld() throws Exception{
        Class.forName("org.postgresql.Driver");
    }

    @GET
    @Path("/hello")
    @Produces(MediaType.TEXT_PLAIN)
    public String getMessage() {
        return "Hello world!";
    }



    @GET
    @Path("/getRoof/{dach_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelDach getRoof(@PathParam("dach_id") int id){
        TblDach tblDach = getRoofById(id);
        if (tblDach == null){
            return null;
        }
        return new ModelDach(tblDach);
    }



    @POST
    @Path("/postRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public String setRoof(ModelDach dach) throws Exception{
        int lastId = this.em.createQuery("select max(u.dach_id) from TblDach u", Integer.class).getSingleResult();
        Query getCookieById = em.createNamedQuery("tblCookie.findById");
        getCookieById.setParameter("id", dach.getCookie().getCookie_id());
        TblCookie tblCookie = (TblCookie) getCookieById.getSingleResult();
        TblDach tblDach = new TblDach();
        tblDach.setDach_id(lastId+1);
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        tblDach.setKoord_dachmitte_lat(dach.getKoord_dachmitte_lat());
        tblDach.setKoord_dachmitte_lng(dach.getKoord_dachmitte_lng());
        tblDach.setCookie(tblCookie);
        utx.begin();
        em.persist(tblDach);
        utx.commit();
        return "ok";
    }

    @POST
    @Path("/updateRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateRoof(ModelDach dach) throws Exception{
        Query getRoofById = em.createNamedQuery("tblDach.findById");
        getRoofById.setParameter("id", dach.getDach_id());
        TblDach tblDach = (TblDach) getRoofById.getSingleResult();
        Query getCookieById = em.createNamedQuery("tblCookie.findById");
        getCookieById.setParameter("id", dach.getCookie().getCookie_id());
        TblCookie tblCookie = (TblCookie) getCookieById.getSingleResult();
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        tblDach.setKoord_dachmitte_lat(dach.getKoord_dachmitte_lat());
        tblDach.setKoord_dachmitte_lng(dach.getKoord_dachmitte_lng());
        tblDach.setCookie(tblCookie);
        utx.begin();
        em.merge(tblDach);
        utx.commit();
        return "ok";
    }


    @GET
    @Path("/getCookie/{cookie}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelCookie getCookie(@PathParam("cookie") int id){
        Query queryCookieById = em.createNamedQuery("tblCookie.findById");
        queryCookieById.setParameter("id", id);
        List resultRoofs = queryCookieById.getResultList();
        if(resultRoofs.isEmpty()){
            return new ModelCookie(new TblCookie(-1, new java.sql.Timestamp(0)));
        }
        TblCookie tblCookie = (TblCookie) queryCookieById.getSingleResult();
        return new ModelCookie(tblCookie);
    }

    @POST
    @Path("/postCookie")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public String postCookie(ModelCookie cookie) throws Exception{
        int lastId = this.em.createQuery("select max(u.cookie_id) from TblCookie u", Integer.class).getSingleResult();
        TblCookie tblCookie = new TblCookie();
        tblCookie.setAblaufdatum(cookie.getAblaufdatum());
        tblCookie.setCookie_id(lastId+1);
        utx.begin();
        em.persist(tblCookie);
        utx.commit();
        return "ok";
    }


    @POST
    @Path("/postPanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public String setPanel(ModelSolarpanel panel) throws Exception{
        TblSolarpanel tblPanel = new TblSolarpanel();
        int lastId = this.em.createQuery("select max(u.panel_id) from TblSolarpanel u", Integer.class).getSingleResult();
        tblPanel.setPanel_id(lastId+1);


        tblPanel.setAusrichtung(panel.getAusrichtung());
        tblPanel.setBreite(panel.getBreite());
        tblPanel.setLaenge(panel.getLaenge());
        tblPanel.setRahmenbreite(panel.getRahmenbreite());

        tblPanel.setOben_links_lat(panel.getObenLinks()[0]);
        tblPanel.setOben_links_lng(panel.getObenLinks()[1]);

        tblPanel.setOben_rechts_lat(panel.getObenRechts()[0]);
        tblPanel.setOben_rechts_lng(panel.getObenRechts()[1]);

        tblPanel.setUnten_rechts_lat(panel.getUntenRechts()[0]);
        tblPanel.setUnten_rechts_lng(panel.getUntenRechts()[1]);

        tblPanel.setUnten_links_lat(panel.getUntenLinks()[0]);
        tblPanel.setUnten_links_lng(panel.getUntenLinks()[1]);

        tblPanel.setDach(getRoofById(panel.getDach_id()));
        utx.begin();
        this.em.persist(tblPanel);
        utx.commit();
        return "ok";
    }


    @POST
    @Path("/updatePanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public String updatePanel(ModelSolarpanel panel) throws Exception{

        Query queryPanelById = this.em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", panel.getPanel_id());
        TblSolarpanel tblPanel = (TblSolarpanel) queryPanelById.getSingleResult();

        utx.begin();
        tblPanel.setAusrichtung(panel.getAusrichtung());
        tblPanel.setBreite(panel.getBreite());
        tblPanel.setLaenge(panel.getLaenge());
        tblPanel.setRahmenbreite(panel.getRahmenbreite());

        tblPanel.setOben_links_lat(panel.getObenLinks()[0]);
        tblPanel.setOben_links_lng(panel.getObenLinks()[1]);

        tblPanel.setOben_rechts_lat(panel.getObenRechts()[0]);
        tblPanel.setOben_rechts_lng(panel.getObenRechts()[1]);

        tblPanel.setUnten_rechts_lat(panel.getUntenRechts()[0]);
        tblPanel.setUnten_rechts_lng(panel.getUntenRechts()[1]);

        tblPanel.setUnten_links_lat(panel.getUntenLinks()[0]);
        tblPanel.setUnten_links_lng(panel.getUntenLinks()[1]);

        tblPanel.setDach(getRoofById(panel.getDach_id()));
        em.merge(tblPanel);

        utx.commit();
        return "ok";
    }

    private TblDach getRoofById(int id){
        Query queryRoofById = em.createNamedQuery("tblDach.findById");
        queryRoofById.setParameter("id", id);
        List resultRoofs = queryRoofById.getResultList();
        if(resultRoofs.isEmpty()){
            return null;
        }
        TblDach tblDach = (TblDach) queryRoofById.getSingleResult();
        return tblDach;
    }
}


