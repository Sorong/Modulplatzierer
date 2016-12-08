package de.solarweb.server;


import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.PrecisionModel;
import com.vividsolutions.jts.io.WKTReader;
import de.solarweb.datamodel.*;
import de.solarweb.de.soalarweb.helper.LatitudeLongitude;
import de.solarweb.models.*;


import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.transaction.UserTransaction;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import java.sql.*;
import java.util.Scanner;
import java.util.logging.Logger;


@Stateless
@TransactionManagement( TransactionManagementType.BEAN )
@Path("/server")
public class RESTSever {
    @PersistenceContext(unitName = "SolarPersistence")
    private EntityManager em;
    @Resource
    private UserTransaction utx;

    Logger logger = Logger.getLogger(getClass().getName());


    public RESTSever() throws Exception{
        Class.forName("org.postgresql.Driver");
    }



    @GET
    @Path("/getRoof/{dach_id}")
    @Produces({"application/javascript"})
    public ModelDach getRoof(@PathParam("dach_id") int id){
        TblDach tblDach = getRoofById(id);
        if (tblDach == null){
            new ModelDach();
        }
        logger.warning("Dach mit ID: " + id + "abgerufen");
        return new ModelDach(tblDach);
    }



    @POST
    @Path("/postRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public String setRoof(ModelDach dach) throws Exception{
        logger.warning("Dach gepostet");
        int lastId = this.em.createQuery("select max(u.dach_id) from TblDach u", Integer.class).getSingleResult();
        //Query getCookieById = em.createNamedQuery("tblCookie.findById");
        //getCookieById.setParameter("id", dach.getCookie().getCookie_id());
        //TblCookie tblCookie = (TblCookie) getCookieById.getSingleResult();
        TblDach tblDach = new TblDach();
        tblDach.setDach_id(lastId+1);
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        tblDach.setKoord_dachmitte_lat(dach.getKoord_dachmitte_lat());
        tblDach.setKoord_dachmitte_lng(dach.getKoord_dachmitte_lng());
        //tblDach.setCookie(tblCookie);
        utx.begin();
        em.persist(tblDach);
        utx.commit();
        logger.warning("Dach unter ID: " + lastId+1 +"gespeichert");
        return ""+(lastId+1);
    }

    @POST
    @Path("/updateRoof")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateRoof(ModelDach dach) throws Exception{
        Query getRoofById = em.createNamedQuery("tblDach.findById");
        getRoofById.setParameter("id", dach.getDach_id());
        TblDach tblDach = (TblDach) getRoofById.getSingleResult();
        //Query getCookieById = em.createNamedQuery("tblCookie.findById");
        //getCookieById.setParameter("id", dach.getCookie().getCookie_id());
        //TblCookie tblCookie = (TblCookie) getCookieById.getSingleResult();
        tblDach.setHausnummer(dach.getHausnummer());
        tblDach.setPlz(dach.getPostleitzahl());
        tblDach.setStrasse(dach.getStrasse());
        tblDach.setDachneigung(dach.getDachneigung());
        tblDach.setKoord_dachmitte_lat(dach.getKoord_dachmitte_lat());
        tblDach.setKoord_dachmitte_lng(dach.getKoord_dachmitte_lng());
        //tblDach.setCookie(tblCookie);
        utx.begin();
        em.merge(tblDach);
        utx.commit();
        logger.warning("Dach mit ID:" + dach.getDach_id() + "geupdateted");
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
            logger.warning("Kein Cookie gefunden");
            return new ModelCookie(-1, new java.sql.Timestamp(0));
        }
        TblCookie tblCookie = (TblCookie) queryCookieById.getSingleResult();
        logger.warning("Cookie mit ID: " + id + "abgerufen");
        return new ModelCookie(tblCookie);
    }


    @POST
    @Path("/postCookie")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({"application/javascript"})
    public String postCookie(ModelCookie cookie) throws Exception{
        int lastId = this.em.createQuery("select max(u.cookie_id) from TblCookie u", Integer.class).getSingleResult();
        TblCookie tblCookie = new TblCookie();
        tblCookie.setAblaufdatum(cookie.getAblaufdatum());
        tblCookie.setCookie_id(lastId+1);
        utx.begin();
        em.persist(tblCookie);
        utx.commit();
        logger.warning("Cookie angelegt");
        return "" + (lastId + 1);
    }


    @POST
    @Path("/postPanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String setPanel(ModelSolarpanel panel) throws Exception{
        TblSolarpanel tblPanel = new TblSolarpanel();
        int lastId = this.em.createQuery("select max(u.panel_id) from TblSolarpanel u", Integer.class).getSingleResult();
        tblPanel.setPanel_id(lastId+1);


        tblPanel.setAusrichtung(panel.getAusrichtung());
        tblPanel.setNeigung(panel.getNeigung());
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

        tblPanel.setCookie(getCookieById(panel.getCookie_id()));
        utx.begin();
        this.em.persist(tblPanel);
        utx.commit();
        logger.warning("Panel angelegt");
        return "" + (lastId + 1);
    }


    @POST
    @Path("/updatePanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ModelSolarpanel updatePanel(ModelSolarpanel panel) throws Exception{

        Query queryPanelById = this.em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", panel.getPanel_id());
        TblSolarpanel tblPanel = (TblSolarpanel) queryPanelById.getSingleResult();

        utx.begin();
        tblPanel.setAusrichtung(panel.getAusrichtung());
        tblPanel.setNeigung(panel.getNeigung());
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

        tblPanel.setCookie(getCookieById(panel.getCookie_id()));
        em.merge(tblPanel);

        utx.commit();
        logger.warning("Panel geupdated");
        return new ModelSolarpanel(tblPanel);
    }

    @GET
    @Path("/removePanel/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String removePanel(@PathParam("id") int id) throws Exception{
        Query queryPanelById = this.em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", id);
        TblSolarpanel tblPanel = (TblSolarpanel) queryPanelById.getSingleResult();
        if(tblPanel != null) {
            utx.begin();
            TblSolarpanel pPanel = em.merge(tblPanel);
            em.remove(pPanel);
            utx.commit();
            logger.warning("Panel gelöscht");
            return "ok";
        }
        return "Not found";
    }



    @GET
    @Path("/getPredefinedRoof/{street}/{number}/{plz}")
    @Produces(MediaType.APPLICATION_JSON)
    public ModelTetraederBuilding getPredefinedRoof(@PathParam("street") String street,
                                       @PathParam("number") String number, @PathParam("plz") Double plz) throws Exception{
        Query queryTetraederBuilding = em.createNamedQuery("tblTetraederBuildings.findByAddress");
        queryTetraederBuilding.setParameter(0, street);
        queryTetraederBuilding.setParameter(1, number);
        queryTetraederBuilding.setParameter(2, plz);
        List resultBuildings = queryTetraederBuilding.getResultList();
        if(resultBuildings.isEmpty()){
            return new ModelTetraederBuilding();
        }
        TblTetraederBuilding tblTetraederBuilding = (TblTetraederBuilding) resultBuildings.get(0);
        logger.warning("Tetraeder Dach aus Datenbank gelesen");
        return new ModelTetraederBuilding(tblTetraederBuilding);

    }

    @GET
    @Path("/getRoofParts/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<ModelTetraederRoof> getRoofParts(@PathParam("id") int id) throws Exception{
        ArrayList<ModelTetraederRoof> roofPartList = new ArrayList<ModelTetraederRoof>();
        Query queryTetraederRoofParts = em.createNamedQuery("tblTetraederRoof.findById");
        queryTetraederRoofParts.setParameter("id", id);
        List resultParts = queryTetraederRoofParts.getResultList();
        if(resultParts.isEmpty()){
            return null;
        }
        for(Object o : resultParts){
            roofPartList.add(new ModelTetraederRoof((TblTetraederRoof)o));
        }
        logger.warning("Dacheinheiten aus Tetaeder Datenbank gelesen");
        return roofPartList;
    }

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<LatitudeLongitude> test() throws Exception{
        Query q = em.createNamedQuery("tblDisplayAggregate.findById");
        q.setParameter("id", 4720);
        TblTetraederDisplayAggregate display = (TblTetraederDisplayAggregate) q.getSingleResult();
        return display.getGeometryAsPoints();

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

    private TblCookie getCookieById(int id){
        Query queryRoofById = em.createNamedQuery("tblCookie.findById");
        queryRoofById.setParameter("id", id);
        List resultRoofs = queryRoofById.getResultList();
        if(resultRoofs.isEmpty()){
            return null;
        }
        TblCookie tblCookie = (TblCookie) queryRoofById.getSingleResult();
        return tblCookie;
    }
}


