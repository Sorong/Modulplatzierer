package de.solarweb.server;


import com.sun.jersey.api.NotFoundException;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;
import de.solarweb.datamodel.*;
import de.solarweb.helper.GeometryConverter;
import de.solarweb.models.*;
import javax.persistence.*;
import javax.transaction.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


/**
 * Restserverklasse, zuständig für das Laden und Speichern von Panels.
 */
@Stateless
@TransactionManagement( TransactionManagementType.BEAN )
@Path("/panel")
public class PanelServer {
    @PersistenceContext(unitName = "SolarPersistence")
    private EntityManager em;
    @Resource
    private UserTransaction utx;

    Logger logger = LoggerFactory.getLogger(PanelServer.class);

    /**
     * Standardkonstuktor
     */
    public PanelServer(){

    }


    /**
     * Nimmt ein ModelPanel entgegen und returned das gepostet Panel.<br>
     * ID des ModelPanels kann beliebig gewählt werden, da diese vom <br>
     * Server generiert wird.
     *
     * @param panel ModelPanel, welches gespeichert werden soll
     * @return ModelPanel, wie es in der Datenbank gespeichert wurde
     */
    @POST
    @Path("/postPanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ModelSolarpanel setPanel(ModelSolarpanel panel){
        TblSolarpanel tblPanel = new TblSolarpanel();
        Geometry the_geom = null;
        try {
            the_geom = GeometryConverter.ArrayLatLngToGeometry(panel.getThe_geom());
        }
        catch (ParseException e){
            logger.error(e.getMessage());
            logger.error("Geometry desd geposten Panels konnte nicht geparsed werden");
            return new ModelSolarpanel();
        }

        try {
            utx.begin();
            tblPanel.setCookie(getCookieById(panel.getCookie_id()));
            tblPanel.setAusrichtung(panel.getAusrichtung());
            tblPanel.setNeigung(panel.getNeigung());
            tblPanel.setBreite(panel.getBreite());
            tblPanel.setLaenge(panel.getLaenge());
            tblPanel.setRahmenbreite(panel.getRahmenbreite());
            tblPanel.setThe_geom(the_geom);
            if(panel.getMasterpanel_id() != -1){
                tblPanel.setMasterpanel(getPanelById(panel.getMasterpanel_id()));
            }
            else{
                tblPanel.setMasterpanel(tblPanel);
            }

            em.persist(tblPanel);
            utx.commit();
        }
        catch (Exception e){
            logger.error(e.getMessage());
            if(e.getClass() == NotFoundException.class){
                logger.error("Zugehoeringes Masterpanel oder Cookie nicht gefunden");
            }
            else{
                logger.error("Das Panel" + panel.getPanel_id() + " konnte nicht gepostet werden");
            }
            return new ModelSolarpanel();
        }
        logger.info("Panel " + tblPanel.getPanel_id() + " geposted");
        return new ModelSolarpanel(tblPanel);
    }


    /**
     * Nimmt ein ModelPanel entgegen und returned das geupdatete Panel.<br>
     *
     * @param panel ModelPanel, welches geupdatet werden soll
     * @return ModelPanel, wie es in der Datenbank gespeichert wurde
     */
    @POST
    @Path("/updatePanel")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ModelSolarpanel updatePanel(ModelSolarpanel panel){
        Query queryPanelById = this.em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", panel.getPanel_id());
        TblSolarpanel tblPanel = (TblSolarpanel) queryPanelById.getSingleResult();
        Geometry the_geom = null;
        try {
            the_geom = GeometryConverter.ArrayLatLngToGeometry(panel.getThe_geom());
        }
        catch (ParseException e){
            logger.error(e.getMessage());
            logger.error("Panel Geometry konnte nicht geparsed werden");
            return new ModelSolarpanel();
        }

        try {
            utx.begin();
            tblPanel.setAusrichtung(panel.getAusrichtung());
            tblPanel.setNeigung(panel.getNeigung());
            tblPanel.setBreite(panel.getBreite());
            tblPanel.setLaenge(panel.getLaenge());
            tblPanel.setRahmenbreite(panel.getRahmenbreite());
            tblPanel.setThe_geom(the_geom);
            if(panel.getMasterpanel_id() != -1){
                tblPanel.setMasterpanel(getPanelById(panel.getMasterpanel_id()));
            }
            tblPanel.setCookie(getCookieById(panel.getCookie_id()));
            em.merge(tblPanel);
            utx.commit();
        }
        catch (Exception e){
            logger.error(e.getMessage());
            if(e.getClass() == NotFoundException.class){
                logger.error("Zugehoeringes Masterpanel oder Cookie nicht gefunden");
            }
            else{
                logger.error("Das Panel" + panel.getPanel_id() + " konnte nicht geupdatet werden");
            }
            return new ModelSolarpanel();
        }
        logger.info("Panel" + panel.getPanel_id() + "geupdated");
        return new ModelSolarpanel(tblPanel);
    }

    /**
     * Nimmt eine ID eines Panels entgegen und löscht das entsprechende Panel.
     * @param id PanelID von dem zu löschenden Panel
     * @return "Deleted", falls Panel gelöscht wurde.
     */
    @GET
    @Path("/removePanel/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String removePanel(@PathParam("id") int id){
        Query queryPanelById = this.em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", id);
        TblSolarpanel tblPanel = (TblSolarpanel) queryPanelById.getSingleResult();
        if(tblPanel == null) {
            return "Not found";
        }
        try{
            utx.begin();
            TblSolarpanel pPanel = em.merge(tblPanel);
            em.remove(pPanel);
            utx.commit();
        }
        catch (Exception e){
            logger.error("Bei dem Versuch das Panel zu loeschen ist ein Fehler aufgetreten");
            logger.error(e.getMessage());
            return "error";
        }

            logger.info("Panel gelöscht");
            return "Deleted";

    }

    /**
     * Sucht in der Datenbank nach einem Cookie zu der übergebenen ID und <br>
     * und returnt das Entitie Obejekt des gefundenen Cookies.
     * @param id CookieID des gesuchten Cookies
     * @return Entitie Objekt des gesuchten Cookies
     * @throws NotFoundException Falls kein Cookie gefunden
     */
    private TblCookie getCookieById(int id) throws NotFoundException {
        Query queryCookieById = em.createNamedQuery("tblCookie.findById");
        queryCookieById.setParameter("id", id);
        List resultCookies = queryCookieById.getResultList();
        if(resultCookies.isEmpty()){
            throw new NotFoundException();
        }
        TblCookie tblCookie = (TblCookie) queryCookieById.getSingleResult();
        return tblCookie;
    }


    /**
     * Sucht in der Datenbank nach einem Panel zu der übergebenen ID und <br>
     * und retured das JPA Objekt des gefundenen Panels.
     * @param id PanelID des gesuchten Panels
     * @return Entitie Objekt des gesuchten Panels
     * @throws NotFoundException Falls kein Panel gefunden
     */
    public TblSolarpanel getPanelById(int id) throws NotFoundException{
        Query queryPanelById = em.createNamedQuery("tblSolarpanel.findById");
        queryPanelById.setParameter("id", id);
        List resultPanels = queryPanelById.getResultList();
        if(resultPanels.isEmpty()){
            throw new NotFoundException();
        }
        TblSolarpanel tblSolarpanel = (TblSolarpanel) queryPanelById.getSingleResult();
        return tblSolarpanel;
    }



}


